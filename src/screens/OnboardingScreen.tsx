import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";
import { UserProfile } from "../types/models";

export function OnboardingScreen({ profile, onFinish }: { profile: UserProfile; onFinish: (profile: UserProfile) => void }) {
  const [name, setName] = useState(profile.name);

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Um companion de mindfulness com ESM e personalização adaptativa.</Text>
      <Text style={styles.copy}>
        O MVP faz micro check-ins, detecta padrões e recomenda a pausa mais útil com base no seu estado.
      </Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} placeholder="Seu nome" />
      <TouchableOpacity style={styles.button} onPress={() => onFinish({ ...profile, name: name || profile.name })}>
        <Text style={styles.buttonLabel}>Começar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    padding: 20,
    borderRadius: 28,
    backgroundColor: theme.colors.card,
    gap: 14,
  },
  title: {
    fontSize: 28,
    lineHeight: 34,
    color: theme.colors.ink,
    fontWeight: "800",
  },
  copy: {
    color: theme.colors.muted,
    lineHeight: 22,
  },
  input: {
    padding: 14,
    borderRadius: 18,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  button: {
    paddingVertical: 14,
    alignItems: "center",
    borderRadius: 18,
    backgroundColor: theme.colors.primary,
  },
  buttonLabel: {
    color: "#fff",
    fontWeight: "700",
  },
});
