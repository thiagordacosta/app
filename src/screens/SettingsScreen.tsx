import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";
import { UserProfile } from "../types/models";

export function SettingsScreen({
  profile,
  onOpenNotifications,
  onOpenAIExplanation,
  onOpenStretches,
  onDeleteAllData,
}: {
  profile: UserProfile;
  onOpenNotifications: () => void;
  onOpenAIExplanation: () => void;
  onOpenStretches: () => void;
  onDeleteAllData: () => void;
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Settings</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Privacy-first design</Text>
        <Text style={styles.copy}>
          Dados emocionais ficam locais por padrão. Este app é para bem-estar e autoconsciência, não diagnóstico ou terapia.
        </Text>
      </View>

      <TouchableOpacity style={styles.card} onPress={onOpenNotifications}>
        <Text style={styles.sectionTitle}>Notification preferences</Text>
        <Text style={styles.copy}>{profile.reminderSettings.promptsPerDay} prompts por dia configurados.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={onOpenAIExplanation}>
        <Text style={styles.sectionTitle}>AI personalization explanation</Text>
        <Text style={styles.copy}>Veja como ESM, regras e feedback geram sugestões adaptativas.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={onOpenStretches}>
        <Text style={styles.sectionTitle}>Stretch library</Text>
        <Text style={styles.copy}>Alongamentos e micro pausas físicas para escritório.</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.deleteButton} onPress={onDeleteAllData}>
        <Text style={styles.deleteLabel}>Delete all local data</Text>
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
  card: {
    padding: 18,
    borderRadius: 22,
    backgroundColor: theme.colors.card,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: theme.colors.ink,
  },
  copy: {
    marginTop: 8,
    color: theme.colors.muted,
    lineHeight: 20,
  },
  deleteButton: {
    paddingVertical: 16,
    borderRadius: 20,
    backgroundColor: "#fff3f3",
    alignItems: "center",
  },
  deleteLabel: {
    color: theme.colors.danger,
    fontWeight: "700",
  },
});
