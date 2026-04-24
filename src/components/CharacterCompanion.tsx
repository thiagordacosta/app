import React from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../theme";

export function CharacterCompanion({ mood }: { mood: number }) {
  const faceColor = mood <= 2 ? theme.colors.peach : theme.colors.primarySoft;

  return (
    <View style={styles.wrap}>
      <View style={[styles.face, { backgroundColor: faceColor }]}>
        <View style={styles.eyeRow}>
          <View style={styles.eye} />
          <View style={styles.eye} />
        </View>
        <View style={[styles.smile, mood <= 2 && styles.softSmile]} />
      </View>
      <View style={styles.body} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: "center",
  },
  face: {
    width: 72,
    height: 72,
    borderRadius: 36,
    alignItems: "center",
    justifyContent: "center",
  },
  eyeRow: {
    flexDirection: "row",
    gap: 14,
    marginBottom: 10,
  },
  eye: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: theme.colors.ink,
  },
  smile: {
    width: 24,
    height: 12,
    borderBottomWidth: 3,
    borderColor: theme.colors.ink,
    borderRadius: 16,
  },
  softSmile: {
    width: 18,
  },
  body: {
    width: 54,
    height: 40,
    borderRadius: 18,
    backgroundColor: theme.colors.sky,
    marginTop: -8,
  },
});
