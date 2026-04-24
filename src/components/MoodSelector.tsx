import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MoodValue } from "../types/models";

const options: Array<{ value: MoodValue; emoji: string; label: string }> = [
  { value: 1, emoji: "😣", label: "Muito baixo" },
  { value: 2, emoji: "😕", label: "Baixo" },
  { value: 3, emoji: "😐", label: "Neutro" },
  { value: 4, emoji: "🙂", label: "Bem" },
  { value: 5, emoji: "😌", label: "Muito bem" },
];

export function MoodSelector({ value, onChange }: { value: MoodValue; onChange: (value: MoodValue) => void }) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>Humor atual</Text>
      <View style={styles.row}>
        {options.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[styles.item, value === option.value && styles.itemActive]}
            onPress={() => onChange(option.value)}
          >
            <Text style={styles.emoji}>{option.emoji}</Text>
            <Text style={styles.caption}>{option.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 10,
  },
  label: {
    fontWeight: "700",
    color: "#27313a",
  },
  row: {
    flexDirection: "row",
    gap: 8,
  },
  item: {
    flex: 1,
    padding: 10,
    borderRadius: 16,
    backgroundColor: "#fffaf5",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(76, 104, 122, 0.14)",
  },
  itemActive: {
    backgroundColor: "#dff4ed",
  },
  emoji: {
    fontSize: 24,
  },
  caption: {
    marginTop: 6,
    fontSize: 11,
    textAlign: "center",
    color: "#6e7b86",
  },
});
