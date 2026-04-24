import React from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import { theme } from "../theme";
import { ReminderSettingsValue } from "../types/models";
import { CheckInSlider } from "./CheckInSlider";

interface ReminderSettingsProps {
  settings: ReminderSettingsValue;
  onChange: (next: ReminderSettingsValue) => void;
}

export function ReminderSettings({ settings, onChange }: ReminderSettingsProps) {
  return (
    <View style={styles.wrap}>
      <CheckInSlider
        label="Prompts por dia"
        value={settings.promptsPerDay}
        onChange={(value) => onChange({ ...settings, promptsPerDay: Math.max(3, Math.min(8, value)) })}
      />

      <View style={styles.toggleCard}>
        <Text style={styles.label}>Randomized prompts</Text>
        <Switch value={settings.randomizedPrompts} onValueChange={(value) => onChange({ ...settings, randomizedPrompts: value })} />
      </View>

      <View style={styles.toggleCard}>
        <Text style={styles.label}>Workdays only</Text>
        <Switch value={settings.workdaysOnly} onValueChange={(value) => onChange({ ...settings, workdaysOnly: value })} />
      </View>

      <View style={styles.toggleCard}>
        <Text style={styles.label}>Fixed reminders</Text>
        <Switch value={settings.fixedReminders} onValueChange={(value) => onChange({ ...settings, fixedReminders: value })} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    gap: 12,
  },
  toggleCard: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.line,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: {
    color: theme.colors.ink,
    fontWeight: "700",
  },
});
