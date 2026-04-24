import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { PracticeCard } from "../components/PracticeCard";
import { theme } from "../theme";
import { PracticeDefinition, Recommendation } from "../types/models";

export function RecommendedPracticeScreen({
  recommendation,
  practice,
  onStartPractice,
  onBackHome,
}: {
  recommendation: Recommendation | null;
  practice: PracticeDefinition;
  onStartPractice: () => void;
  onBackHome: () => void;
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Recomendação personalizada</Text>
      <Text style={styles.copy}>{recommendation?.detectedState ?? "Estado atual detectado pela IA."}</Text>

      <PracticeCard practice={practice} reason={recommendation?.reason} />

      <View style={styles.metaCard}>
        <Text style={styles.metaLabel}>Confiança da recomendação</Text>
        <Text style={styles.metaValue}>{Math.round((recommendation?.confidenceScore ?? 0.7) * 100)}%</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={onStartPractice}>
        <Text style={styles.buttonLabel}>Iniciar prática</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onBackHome}>
        <Text style={styles.link}>Voltar ao dashboard</Text>
      </TouchableOpacity>
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
  metaCard: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: theme.colors.cardAlt,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  metaLabel: {
    color: theme.colors.muted,
  },
  metaValue: {
    color: theme.colors.ink,
    fontWeight: "800",
  },
  button: {
    paddingVertical: 16,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
  },
  buttonLabel: {
    color: "#fff",
    fontWeight: "700",
  },
  link: {
    color: theme.colors.ink,
    fontWeight: "700",
    textAlign: "center",
  },
});
