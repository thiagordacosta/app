import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { PracticeCard } from "../components/PracticeCard";
import { theme } from "../theme";
import { PracticeDefinition } from "../types/models";

export function StretchLibraryScreen({
  stretches,
  onSelectPractice,
}: {
  stretches: PracticeDefinition[];
  onSelectPractice: (practice: PracticeDefinition) => void;
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Stretch library</Text>
      <Text style={styles.copy}>Alongamentos de mesa para pescoço, ombros, punhos, coluna, costas e olhos.</Text>
      {stretches.map((practice) => (
        <PracticeCard key={practice.type} practice={practice} onPress={() => onSelectPractice(practice)} />
      ))}
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
  copy: {
    color: theme.colors.muted,
    lineHeight: 20,
  },
});
