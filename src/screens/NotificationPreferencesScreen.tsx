import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ReminderSettings } from "../components/ReminderSettings";
import { theme } from "../theme";
import { ReminderSettingsValue } from "../types/models";

export function NotificationPreferencesScreen({
  settings,
  onChange,
  onBack,
}: {
  settings: ReminderSettingsValue;
  onChange: (settings: ReminderSettingsValue) => void;
  onBack: () => void;
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Notification preferences</Text>
      <Text style={styles.copy}>Configure prompts 3–8 vezes por dia, com intervalos randomizados ou fixos.</Text>
      <ReminderSettings settings={settings} onChange={onChange} />
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
  copy: {
    color: theme.colors.muted,
    lineHeight: 20,
  },
  link: {
    color: theme.colors.ink,
    fontWeight: "700",
    textAlign: "center",
  },
});
