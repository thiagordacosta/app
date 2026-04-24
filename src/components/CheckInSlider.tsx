import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { theme } from "../theme";

interface CheckInSliderProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function CheckInSlider({ label, value, onChange }: CheckInSliderProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
      </View>
      <View style={styles.track}>
        {Array.from({ length: 10 }).map((_, index) => {
          const point = index + 1;
          const active = point <= value;
          return (
            <Text
              key={`${label}-${point}`}
              style={[styles.dot, active && styles.dotActive]}
              onPress={() => onChange(point)}
            >
              ●
            </Text>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 14,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  label: {
    color: theme.colors.ink,
    fontWeight: "700",
  },
  value: {
    color: theme.colors.muted,
  },
  track: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dot: {
    color: "#c4ced6",
    fontSize: 20,
  },
  dotActive: {
    color: theme.colors.primary,
  },
});
