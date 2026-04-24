import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ProgressChart } from "../components/ProgressChart";
import { theme } from "../theme";
import { ESMCheckIn, MindfulnessSession } from "../types/models";

export function ProgressDashboardScreen({
  checkIns,
  sessions,
  stats,
}: {
  checkIns: ESMCheckIn[];
  sessions: MindfulnessSession[];
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
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Progress dashboard</Text>
      <View style={styles.grid}>
        <View style={styles.card}>
          <Text style={styles.bigValue}>{stats.checkInsCompleted}</Text>
          <Text style={styles.label}>check-ins completos</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.bigValue}>{stats.mindfulnessSessionsCompleted}</Text>
          <Text style={styles.label}>sessões completas</Text>
        </View>
      </View>

      <ProgressChart label="Stress médio recente" values={checkIns.slice(0, 6).map((item) => item.stress / 2)} />
      <ProgressChart label="Foco médio recente" values={checkIns.slice(0, 6).map((item) => item.focus / 2)} />

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Most effective practices</Text>
        {stats.mostEffectivePractices.map((item) => (
          <Text key={item.practice} style={styles.itemText}>
            {item.practice}: {item.score.toFixed(1)}
          </Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Best times of day</Text>
        {stats.bestTimes.map(([label, count]) => (
          <Text key={label} style={styles.itemText}>
            {label}: {count}
          </Text>
        ))}
      </View>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Weekly reflection summary</Text>
        <Text style={styles.itemText}>{stats.weeklyReflection}</Text>
      </View>
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
  grid: {
    flexDirection: "row",
    gap: 10,
  },
  card: {
    flex: 1,
    padding: 18,
    borderRadius: 22,
    backgroundColor: theme.colors.card,
  },
  bigValue: {
    fontSize: 32,
    fontWeight: "800",
    color: theme.colors.ink,
  },
  label: {
    marginTop: 6,
    color: theme.colors.muted,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: theme.colors.ink,
    marginBottom: 10,
  },
  itemText: {
    color: theme.colors.muted,
    lineHeight: 20,
  },
});
