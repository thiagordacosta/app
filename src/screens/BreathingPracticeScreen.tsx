import React, { useMemo, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { BreathingTimer } from "../components/BreathingTimer";
import { theme } from "../theme";
import { AmbientSound, ESMCheckIn, MindfulnessSession, PracticeDefinition, UserProfile } from "../types/models";

export function BreathingPracticeScreen({
  profile,
  practice,
  soundPreference,
  preState,
  onComplete,
  onOpenAmbientSounds,
}: {
  profile: UserProfile;
  practice: PracticeDefinition;
  soundPreference: AmbientSound;
  preState?: ESMCheckIn;
  onComplete: (session: MindfulnessSession) => void;
  onOpenAmbientSounds: () => void;
}) {
  const [duration, setDuration] = useState(practice.durations[0] ?? 1);
  const [feedback, setFeedback] = useState<"yes" | "somewhat" | "no" | null>(null);

  const pattern = useMemo(() => {
    return practice.breathingPattern ?? { inhale: 4, exhale: 6 };
  }, [practice]);

  const handleFinish = () => {
    if (!feedback) {
      setFeedback("somewhat");
    }
  };

  const submitSession = (nextFeedback: "yes" | "somewhat" | "no") => {
    setFeedback(nextFeedback);
    onComplete({
      id: `session-${Date.now()}`,
      timestamp: new Date().toISOString(),
      practiceType: practice.type,
      duration,
      sound: soundPreference,
      preState,
      postFeedback:
        nextFeedback === "yes"
          ? "Ajudou bastante."
          : nextFeedback === "somewhat"
            ? "Ajudou um pouco."
            : "Não ajudou desta vez.",
      effectivenessScore: nextFeedback === "yes" ? 5 : nextFeedback === "somewhat" ? 3 : 1,
    });
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{practice.title}</Text>
      <Text style={styles.copy}>
        {practice.instructions.join(" ")} A IA ajustará futuras recomendações com base no seu feedback.
      </Text>

      <View style={styles.durationRow}>
        {practice.durations.map((option) => (
          <TouchableOpacity
            key={`${practice.type}-${option}`}
            style={[styles.durationChip, duration === option && styles.durationChipActive]}
            onPress={() => setDuration(option)}
          >
            <Text style={styles.durationLabel}>{option < 1 ? "30s" : `${option} min`}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.soundCard} onPress={onOpenAmbientSounds}>
        <Text style={styles.soundLabel}>Som ambiente</Text>
        <Text style={styles.soundValue}>{soundPreference}</Text>
      </TouchableOpacity>

      <BreathingTimer
        minutes={duration}
        inhale={pattern.inhale}
        hold={pattern.hold}
        exhale={pattern.exhale}
        holdAfter={pattern.holdAfter}
        onComplete={handleFinish}
      />

      <View style={styles.feedbackCard}>
        <Text style={styles.feedbackTitle}>Did this help you feel better, calmer, or more focused?</Text>
        <View style={styles.feedbackRow}>
          <TouchableOpacity style={styles.feedbackChip} onPress={() => submitSession("yes")}>
            <Text style={styles.feedbackText}>Sim</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedbackChip} onPress={() => submitSession("somewhat")}>
            <Text style={styles.feedbackText}>Mais ou menos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.feedbackChip} onPress={() => submitSession("no")}>
            <Text style={styles.feedbackText}>Não</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.footerText}>Dados emocionais ficam salvos localmente por padrão neste protótipo.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 14,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: theme.colors.ink,
  },
  copy: {
    color: theme.colors.muted,
    lineHeight: 20,
  },
  durationRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  durationChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
    backgroundColor: theme.colors.card,
  },
  durationChipActive: {
    backgroundColor: theme.colors.primarySoft,
  },
  durationLabel: {
    color: theme.colors.ink,
    fontWeight: "700",
  },
  soundCard: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  soundLabel: {
    color: theme.colors.muted,
  },
  soundValue: {
    color: theme.colors.ink,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  feedbackCard: {
    padding: 18,
    borderRadius: 22,
    backgroundColor: theme.colors.card,
    gap: 12,
  },
  feedbackTitle: {
    color: theme.colors.ink,
    fontWeight: "700",
    lineHeight: 20,
  },
  feedbackRow: {
    flexDirection: "row",
    gap: 8,
  },
  feedbackChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: theme.colors.primarySoft,
    alignItems: "center",
  },
  feedbackText: {
    color: theme.colors.ink,
    fontWeight: "700",
  },
  footerText: {
    color: theme.colors.muted,
    fontSize: 12,
    lineHeight: 18,
  },
});
