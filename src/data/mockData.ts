import { ESMCheckIn, PracticeDefinition, Recommendation, UserProfile, MindfulnessSession } from "../types/models";

const defaultPracticeWeights = {
  "guided-breathing": 1,
  "body-scan": 1,
  "mindful-pause": 1,
  grounding: 1,
  "desk-stretches": 1,
  "focus-reset": 1,
  "self-compassion": 1,
  "pre-flow-ritual": 1,
  "recovery-break": 1,
};

export const mockUserProfile: UserProfile = {
  id: "user-leticia-01",
  name: "Thiago",
  preferredPracticeDuration: 3,
  reminderSettings: {
    promptsPerDay: 5,
    preferredStartHour: 9,
    preferredEndHour: 19,
    quietHoursStart: 22,
    quietHoursEnd: 7,
    workdaysOnly: true,
    randomizedPrompts: true,
    fixedReminders: false,
    notificationTone: "soft-bell",
  },
  soundPreference: "rain",
  onboardingGoals: ["ansiedade", "foco", "performance"],
  mindfulnessExperience: "iniciante",
  baselineStress: 7,
  practiceWeights: defaultPracticeWeights,
};

export const mockCheckIns: ESMCheckIn[] = [
  {
    id: "esm-1",
    timestamp: new Date().toISOString(),
    mood: 2,
    stress: 8,
    energy: 3,
    focus: 4,
    activity: "Entre reuniões",
    socialContext: "Sozinho",
    challengeLevel: 8,
    skillLevel: 6,
    wantsPracticeNow: true,
  },
  {
    id: "esm-2",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    mood: 3,
    stress: 6,
    energy: 5,
    focus: 5,
    activity: "Trabalho profundo",
    socialContext: "Equipe remota",
    challengeLevel: 7,
    skillLevel: 7,
    wantsPracticeNow: false,
  },
];

export const mockSessions: MindfulnessSession[] = [
  {
    id: "session-1",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    practiceType: "guided-breathing",
    duration: 3,
    sound: "rain",
    preState: mockCheckIns[1],
    postFeedback: "Me senti mais calmo e menos reativo.",
    effectivenessScore: 4,
  },
  {
    id: "session-2",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 32).toISOString(),
    practiceType: "focus-reset",
    duration: 1,
    sound: "forest",
    preState: mockCheckIns[1],
    postFeedback: "Ajudou no foco antes de voltar para a planilha.",
    effectivenessScore: 5,
  },
];

export const mockRecommendations: Recommendation[] = [
  {
    id: "rec-1",
    timestamp: new Date().toISOString(),
    detectedState: "Estresse alto com energia baixa",
    recommendedPractice: "grounding",
    reason: "Uma pausa de 3 minutos com grounding tende a reduzir sobrecarga e estabilizar a atenção.",
    confidenceScore: 0.86,
  },
];

export const practices: PracticeDefinition[] = [
  {
    type: "guided-breathing",
    title: "Guided breathing",
    category: "breath",
    description: "Respiração guiada com timer visual e ritmo simples.",
    instructions: [
      "Sente-se com os pés apoiados.",
      "Inspire pelo nariz com suavidade.",
      "Expire mais devagar do que inspirou.",
    ],
    durations: [0.5, 1, 3, 5],
    breathingPattern: { inhale: 4, exhale: 6 },
  },
  {
    type: "body-scan",
    title: "Body scan",
    category: "awareness",
    description: "Percorra o corpo com atenção gentil.",
    instructions: [
      "Perceba testa, mandíbula e ombros.",
      "Observe áreas de tensão sem tentar consertar tudo agora.",
      "Respire em direção ao ponto mais tenso.",
    ],
    durations: [1, 3, 5],
  },
  {
    type: "mindful-pause",
    title: "Mindful pause",
    category: "awareness",
    description: "Uma pausa rápida para sair do piloto automático.",
    instructions: [
      "Pare por alguns instantes.",
      "Nomeie mentalmente o que está acontecendo agora.",
      "Escolha o próximo passo com mais intenção.",
    ],
    durations: [0.5, 1, 3],
  },
  {
    type: "grounding",
    title: "Grounding exercise",
    category: "recovery",
    description: "Traga atenção ao ambiente e ao corpo para reduzir overload.",
    instructions: [
      "Observe 5 coisas que você vê.",
      "Perceba 4 sensações físicas.",
      "Respire de forma estável antes de seguir.",
    ],
    durations: [1, 3, 5],
  },
  {
    type: "desk-stretches",
    title: "Desk-friendly stretches",
    category: "stretch",
    description: "Alongamentos curtos para tensão de escritório.",
    instructions: [
      "Solte o pescoço com movimentos curtos.",
      "Gire os ombros para trás.",
      "Alongue punhos e parte alta das costas.",
    ],
    durations: [1, 3, 5],
  },
  {
    type: "focus-reset",
    title: "Focus reset",
    category: "focus",
    description: "Recupere clareza atencional antes de uma tarefa exigente.",
    instructions: [
      "Expire lentamente por 3 ciclos.",
      "Escolha uma única prioridade.",
      "Volte para a tarefa com uma intenção clara.",
    ],
    durations: [0.5, 1, 3],
    breathingPattern: { inhale: 3, exhale: 6, hold: 3 },
  },
  {
    type: "self-compassion",
    title: "Self-compassion break",
    category: "recovery",
    description: "Uma intervenção curta para regular autocrítica e desgaste.",
    instructions: [
      "Reconheça que este é um momento difícil.",
      "Lembre-se de que sobrecarga faz parte da experiência humana.",
      "Escolha uma frase gentil para si mesmo.",
    ],
    durations: [1, 3, 5],
  },
  {
    type: "pre-flow-ritual",
    title: "Pre-flow focus ritual",
    category: "focus",
    description: "Ritual breve antes de entrar em foco profundo.",
    instructions: [
      "Defina o bloco de trabalho.",
      "Feche distrações visíveis.",
      "Faça 3 respirações profundas antes de começar.",
    ],
    durations: [0.5, 1, 3],
  },
  {
    type: "recovery-break",
    title: "Recovery break after stress",
    category: "recovery",
    description: "Pausa restaurativa depois de um momento tenso.",
    instructions: [
      "Afaste-se do gatilho por alguns minutos.",
      "Respire e solte o corpo.",
      "Observe se o ritmo interno desacelerou.",
    ],
    durations: [1, 3, 5],
    breathingPattern: { inhale: 4, hold: 7, exhale: 8 },
  },
];
