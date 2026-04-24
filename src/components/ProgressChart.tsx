import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

export function ProgressChart({ label, values }: { label: string; values: number[] }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.row}>
        {values.map((value, index) => (
          <View key={`${label}-${index}`} style={styles.barWrap}>
            <View style={[styles.bar, { height: 18 + value * 10 }]} />
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  label: {
    fontWeight: "700",
    color: theme.colors.ink,
    marginBottom: 12,
  },
  row: {
    flexDirection: "row",
    gap: 8,
    alignItems: "flex-end",
  },
  barWrap: {
    flex: 1,
    height: 88,
    justifyContent: "flex-end",
  },
  bar: {
    borderRadius: 999,
    backgroundColor: theme.colors.primary,
  },
});
