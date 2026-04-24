import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";
import { PracticeDefinition } from "../types/models";

export function PracticeCard({
  practice,
  reason,
  onPress,
}: {
  practice: PracticeDefinition;
  reason?: string;
  onPress?: () => void;
}) {
  return (
    <TouchableOpacity activeOpacity={0.9} style={styles.card} onPress={onPress}>
      <Text style={styles.eyebrow}>{practice.category}</Text>
      <Text style={styles.title}>{practice.title}</Text>
      <Text style={styles.description}>{practice.description}</Text>
      {reason ? <Text style={styles.reason}>{reason}</Text> : null}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: 22,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  eyebrow: {
    textTransform: "uppercase",
    color: theme.colors.muted,
    fontSize: 12,
    letterSpacing: 1.2,
  },
  title: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: "800",
    color: theme.colors.ink,
  },
  description: {
    marginTop: 8,
    color: theme.colors.muted,
    lineHeight: 20,
  },
  reason: {
    marginTop: 12,
    color: theme.colors.ink,
    lineHeight: 20,
  },
});
