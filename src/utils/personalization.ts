import { ESMCheckIn, MindfulnessSession, PracticeType, Recommendation, UserProfile } from "../types/models";

function id(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 9)}`;
}

export function defaultCheckInValues(): ESMCheckIn {
  return {
    id: id("esm"),
    timestamp: new Date().toISOString(),
    mood: 3,
    stress: 5,
    energy: 5,
    focus: 5,
    activity: "Trabalhando",
    socialContext: "Sozinho",
    challengeLevel: 5,
    skillLevel: 5,
    wantsPracticeNow: true,
  };
}

export function detectPossibleFlowState(checkIn: ESMCheckIn) {
  return checkIn.challengeLevel >= 7 && checkIn.skillLevel >= 7 && checkIn.focus >= 7;
}

function scorePractice(type: PracticeType, sessions: MindfulnessSession[], profile: UserProfile | null) {
  const weight = profile?.practiceWeights[type] ?? 1;
  const recent = sessions.filter((session) => session.practiceType === type).slice(0, 5);
  const effectiveness = recent.length
    ? recent.reduce((sum, item) => sum + item.effectivenessScore, 0) / recent.length
    : 3;

  return weight + effectiveness / 5;
}

function chooseWithWeights(
  primary: PracticeType,
  fallback: PracticeType,
  sessions: MindfulnessSession[],
  profile: UserProfile | null,
) {
  const primaryScore = scorePractice(primary, sessions, profile);
  const fallbackScore = scorePractice(fallback, sessions, profile);

  return primaryScore >= fallbackScore ? primary : fallback;
}

export function createRecommendation(
  checkIn: ESMCheckIn,
  sessions: MindfulnessSession[],
  profile: UserProfile | null,
): Recommendation {
  // Transparent rule layer for the MVP.
  // This is the first personalization pass before any ML model is added.
  let detectedState = "Estado geral";
  let recommendedPractice: PracticeType = "mindful-pause";
  let reason = "Uma pausa curta ajuda a recuperar presença sem gerar mais carga.";
  let confidenceScore = 0.62;

  if (detectPossibleFlowState(checkIn)) {
    detectedState = "Possível flow state";
    recommendedPractice = "pre-flow-ritual";
    reason = "Você parece em flow. A IA evita interromper e sugere um ritual leve para sustentar foco sem quebrar o ritmo.";
    confidenceScore = 0.79;
  } else if (checkIn.stress >= 7 && checkIn.energy <= 4) {
    detectedState = "Estresse alto com energia baixa";
    recommendedPractice = chooseWithWeights("grounding", "body-scan", sessions, profile);
    reason = "Grounding ou body scan tendem a regular overload quando o sistema está cansado e sob pressão.";
    confidenceScore = 0.88;
  } else if (checkIn.stress >= 7 && checkIn.focus <= 4) {
    detectedState = "Estresse alto com foco baixo";
    recommendedPractice = chooseWithWeights("guided-breathing", "recovery-break", sessions, profile);
    reason = "Uma respiração 4-6 de 1 minuto costuma reduzir reatividade e recuperar foco mínimo.";
    confidenceScore = 0.84;
  } else if (checkIn.energy <= 4 && checkIn.stress <= 4) {
    detectedState = "Energia baixa sem estresse elevado";
    recommendedPractice = chooseWithWeights("desk-stretches", "mindful-pause", sessions, profile);
    reason = "Quando a energia cai, uma prática corporal curta pode restaurar presença melhor do que ficar parado.";
    confidenceScore = 0.74;
  } else if (checkIn.focus <= 4 && checkIn.challengeLevel >= 7) {
    detectedState = "Demanda alta com foco baixo";
    recommendedPractice = chooseWithWeights("focus-reset", "pre-flow-ritual", sessions, profile);
    reason = "A IA identifica alta exigência com baixa clareza e sugere reset atencional.";
    confidenceScore = 0.81;
  } else if (checkIn.mood <= 2 && checkIn.stress >= 8) {
    detectedState = "Sobrecarga emocional";
    recommendedPractice = chooseWithWeights("self-compassion", "grounding", sessions, profile);
    reason = "Quando humor e estresse estão muito pressionados, gentileza e grounding costumam funcionar melhor.";
    confidenceScore = 0.87;
  } else if (!checkIn.wantsPracticeNow) {
    detectedState = "Sem abertura para pausa agora";
    recommendedPractice = "mindful-pause";
    reason = "A sugestão é mínima e respeita seu momento atual.";
    confidenceScore = 0.58;
  }

  return {
    id: id("rec"),
    timestamp: new Date().toISOString(),
    detectedState,
    recommendedPractice,
    reason,
    confidenceScore,
  };
}

export function applyFeedbackToPracticeWeights(profile: UserProfile, session: MindfulnessSession): UserProfile {
  const adjustment = session.effectivenessScore >= 4 ? 0.15 : -0.08;

  return {
    ...profile,
    practiceWeights: {
      ...profile.practiceWeights,
      [session.practiceType]: Math.max(0.5, profile.practiceWeights[session.practiceType] + adjustment),
    },
  };
}

export function getMostEffectivePractices(sessions: MindfulnessSession[]) {
  const grouped = new Map<string, { total: number; count: number }>();

  sessions.forEach((session) => {
    const current = grouped.get(session.practiceType) ?? { total: 0, count: 0 };
    grouped.set(session.practiceType, {
      total: current.total + session.effectivenessScore,
      count: current.count + 1,
    });
  });

  return [...grouped.entries()]
    .map(([practice, values]) => ({
      practice,
      score: values.total / values.count,
    }))
    .sort((left, right) => right.score - left.score)
    .slice(0, 3);
}

export function getBestPracticeTimes(sessions: MindfulnessSession[]) {
  const counts = { Manhã: 0, Tarde: 0, Noite: 0 };

  sessions.forEach((session) => {
    const hour = new Date(session.timestamp).getHours();
    if (hour < 12) {
      counts["Manhã"] += 1;
    } else if (hour < 18) {
      counts["Tarde"] += 1;
    } else {
      counts["Noite"] += 1;
    }
  });

  return Object.entries(counts).sort((left, right) => right[1] - left[1]);
}

export function buildWeeklyReflection(checkIns: ESMCheckIn[], sessions: MindfulnessSession[]) {
  const recentCheckIns = checkIns.slice(0, 7);
  const recentSessions = sessions.slice(0, 7);

  const averageStress = recentCheckIns.length
    ? recentCheckIns.reduce((sum, item) => sum + item.stress, 0) / recentCheckIns.length
    : 0;
  const averageFocus = recentCheckIns.length
    ? recentCheckIns.reduce((sum, item) => sum + item.focus, 0) / recentCheckIns.length
    : 0;

  return `Nesta semana, o sistema observou ${recentSessions.length} práticas, estresse médio ${averageStress.toFixed(
    1,
  )} e foco médio ${averageFocus.toFixed(1)}.`;
}

export function getStateSummary(checkIn?: ESMCheckIn) {
  if (!checkIn) {
    return "A IA aprende com check-ins leves para sugerir a melhor pausa no melhor momento.";
  }

  if (detectPossibleFlowState(checkIn)) {
    return "Seu estado atual sugere flow. Vamos preservar esse momento com intervenções mínimas.";
  }

  if (checkIn.stress >= 7) {
    return "O sistema detecta tensão alta. Uma pausa curta e precisa pode ajudar agora.";
  }

  if (checkIn.focus <= 4) {
    return "Sua atenção parece mais dispersa. Podemos orientar uma prática curta para recentrar.";
  }

  return "Seu estado atual parece estável. A IA segue ajustando o ritmo com base no seu contexto.";
}
