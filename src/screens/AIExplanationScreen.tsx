import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";
import { Recommendation, UserProfile } from "../types/models";

export function AIExplanationScreen({
  profile,
  latestRecommendation,
  onBack,
}: {
  profile: UserProfile;
  latestRecommendation: Recommendation | null;
  onBack: () => void;
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>How personalization works</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>1. Perfil inicial</Text>
        <Text style={styles.copy}>
          Baseline atual: estresse {profile.baselineStress}/10, experiência {profile.mindfulnessExperience}, objetivos{" "}
          {profile.onboardingGoals.join(", ")}.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>2. Personalização dinâmica</Text>
        <Text style={styles.copy}>
          A IA usa check-ins ESM, contexto e feedback para adaptar duração, técnica, intensidade e linguagem.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>3. Evolução longitudinal</Text>
        <Text style={styles.copy}>
          Práticas avaliadas como úteis ganham mais peso em estados parecidos no futuro.
        </Text>
      </View>

      {latestRecommendation ? (
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Exemplo atual</Text>
          <Text style={styles.copy}>
            Estado detectado: {latestRecommendation.detectedState}. Sugestão: {latestRecommendation.recommendedPractice}.
          </Text>
        </View>
      ) : null}

      <TouchableOpacity onPress={onBack}>
        <Text style={styles.link}>Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 12,
  },
  title: {
    fontSize: 24,
    fontWeight: "800",
    color: theme.colors.ink,
  },
  card: {
    padding: 18,
    borderRadius: 22,
    backgroundColor: theme.colors.card,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: theme.colors.ink,
  },
  copy: {
    marginTop: 8,
    color: theme.colors.muted,
    lineHeight: 20,
  },
  link: {
    color: theme.colors.ink,
    fontWeight: "700",
    textAlign: "center",
  },
});
