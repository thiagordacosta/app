import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PracticeCard } from "../components/PracticeCard";
import { ProgressChart } from "../components/ProgressChart";
import { theme } from "../theme";
import { Recommendation, UserProfile } from "../types/models";

export function HomeDashboardScreen({
  profile,
  stats,
  latestRecommendation,
  onStartCheckIn,
  onOpenRecommendation,
  onOpenAIExplanation,
}: {
  profile: UserProfile;
  stats: {
    checkInsCompleted: number;
    mindfulnessSessionsCompleted: number;
    averageStress: number;
    averageFocus: number;
    flowMoments: number;
    weeklyReflection: string;
    mostEffectivePractices: Array<{ practice: string; score: number }>;
    bestTimes: Array<[string, number]>;
  };
  latestRecommendation: Recommendation | null;
  onStartCheckIn: () => void;
  onOpenRecommendation: () => void;
  onOpenAIExplanation: () => void;
}) {
  return (
    <View style={styles.wrap}>
      <View style={styles.hero}>
        <Text style={styles.eyebrow}>Hoje</Text>
        <Text style={styles.title}>Olá, {profile.name}. Sua IA está acompanhando humor, foco e energia ao longo do dia.</Text>
        <Text style={styles.copy}>Check-ins rápidos alimentam recomendações melhores e mais contextuais.</Text>
      </View>

      <View style={styles.grid}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.checkInsCompleted}</Text>
          <Text style={styles.statLabel}>check-ins</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.mindfulnessSessionsCompleted}</Text>
          <Text style={styles.statLabel}>sessões</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.averageStress}</Text>
          <Text style={styles.statLabel}>estresse médio</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats.flowMoments}</Text>
          <Text style={styles.statLabel}>momentos de flow</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.primaryButton} onPress={onStartCheckIn}>
        <Text style={styles.primaryLabel}>Responder check-in ESM agora</Text>
      </TouchableOpacity>

      {latestRecommendation ? (
        <PracticeCard
          practice={{
            type: latestRecommendation.recommendedPractice,
            title: "Prática recomendada agora",
            category: "awareness",
            description: latestRecommendation.reason,
            instructions: [],
            durations: [],
          }}
          reason={`Estado detectado: ${latestRecommendation.detectedState}`}
          onPress={onOpenRecommendation}
        />
      ) : null}

      <ProgressChart label="Tendência de humor" values={[2, 3, 4, 3, 4, 5]} />
      <ProgressChart label="Tendência de foco" values={[3, 4, 4, 5, 4, 5]} />

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Weekly reflection summary</Text>
        <Text style={styles.cardCopy}>{stats.weeklyReflection}</Text>
        <TouchableOpacity onPress={onOpenAIExplanation}>
          <Text style={styles.link}>Como a IA usa meus dados</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 14,
  },
  hero: {
    padding: 18,
    borderRadius: 28,
    backgroundColor: theme.colors.card,
  },
  eyebrow: {
    color: theme.colors.muted,
    textTransform: "uppercase",
    fontSize: 12,
    letterSpacing: 1.6,
  },
  title: {
    marginTop: 8,
    fontSize: 28,
    lineHeight: 34,
    color: theme.colors.ink,
    fontWeight: "800",
  },
  copy: {
    marginTop: 8,
    color: theme.colors.muted,
    lineHeight: 21,
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  statCard: {
    width: "48%",
    padding: 16,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
  },
  statValue: {
    fontSize: 28,
    fontWeight: "800",
    color: theme.colors.ink,
  },
  statLabel: {
    marginTop: 4,
    color: theme.colors.muted,
  },
  primaryButton: {
    paddingVertical: 16,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
  },
  primaryLabel: {
    color: "#fff",
    fontWeight: "700",
  },
  card: {
    padding: 18,
    borderRadius: 22,
    backgroundColor: theme.colors.card,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: theme.colors.ink,
  },
  cardCopy: {
    marginTop: 8,
    color: theme.colors.muted,
    lineHeight: 20,
  },
  link: {
    marginTop: 12,
    color: theme.colors.ink,
    fontWeight: "700",
  },
});
