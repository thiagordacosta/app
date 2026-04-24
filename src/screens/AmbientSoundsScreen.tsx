import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";
import { AmbientSound } from "../types/models";

const sounds: AmbientSound[] = ["rain", "forest", "ocean", "wind", "river", "silence"];

export function AmbientSoundsScreen({
  selectedSound,
  onSelectSound,
  onBack,
}: {
  selectedSound: AmbientSound;
  onSelectSound: (sound: AmbientSound) => void;
  onBack: () => void;
}) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Ambient sounds</Text>
      <Text style={styles.copy}>Escolha o contexto sonoro para a pausa. O MVP salva a preferência e usa isso nas próximas sessões.</Text>
      {sounds.map((sound) => (
        <TouchableOpacity
          key={sound}
          style={[styles.soundCard, selectedSound === sound && styles.soundCardActive]}
          onPress={() => onSelectSound(sound)}
        >
          <Text style={styles.soundTitle}>{sound}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity onPress={onBack}>
        <Text style={styles.link}>Voltar para a prática</Text>
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
  soundCard: {
    padding: 16,
    borderRadius: 20,
    backgroundColor: theme.colors.card,
  },
  soundCardActive: {
    backgroundColor: theme.colors.primarySoft,
  },
  soundTitle: {
    color: theme.colors.ink,
    fontWeight: "700",
    textTransform: "capitalize",
  },
  link: {
    marginTop: 8,
    color: theme.colors.ink,
    fontWeight: "700",
  },
});
