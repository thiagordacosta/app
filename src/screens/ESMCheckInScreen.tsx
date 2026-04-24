import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { CheckInSlider } from "../components/CheckInSlider";
import { MoodSelector } from "../components/MoodSelector";
import { theme } from "../theme";
import { ESMCheckIn } from "../types/models";

export function ESMCheckInScreen({ initialValues, onSubmit }: { initialValues: ESMCheckIn; onSubmit: (value: ESMCheckIn) => void }) {
  const [value, setValue] = useState<ESMCheckIn>(initialValues);

  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>Experience Sampling Method check-in</Text>
      <Text style={styles.copy}>Check-in rápido para registrar seu estado emocional, cognitivo e contextual.</Text>

      <MoodSelector value={value.mood} onChange={(mood) => setValue({ ...value, mood })} />
      <CheckInSlider label="Stress" value={value.stress} onChange={(stress) => setValue({ ...value, stress })} />
      <CheckInSlider label="Energy" value={value.energy} onChange={(energy) => setValue({ ...value, energy })} />
      <CheckInSlider label="Focus" value={value.focus} onChange={(focus) => setValue({ ...value, focus })} />
      <CheckInSlider
        label="Challenge"
        value={value.challengeLevel}
        onChange={(challengeLevel) => setValue({ ...value, challengeLevel })}
      />
      <CheckInSlider label="Skill" value={value.skillLevel} onChange={(skillLevel) => setValue({ ...value, skillLevel })} />

      <TextInput style={styles.input} value={value.activity} onChangeText={(activity) => setValue({ ...value, activity })} placeholder="Atividade atual" />
      <TextInput
        style={styles.input}
        value={value.socialContext}
        onChangeText={(socialContext) => setValue({ ...value, socialContext })}
        placeholder="Contexto social"
      />

      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.choice, value.wantsPracticeNow && styles.choiceActive]}
          onPress={() => setValue({ ...value, wantsPracticeNow: true })}
        >
          <Text style={styles.choiceLabel}>Quero uma pausa agora</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.choice, !value.wantsPracticeNow && styles.choiceActive]}
          onPress={() => setValue({ ...value, wantsPracticeNow: false })}
        >
          <Text style={styles.choiceLabel}>Agora não</Text>
        </TouchableOpacity>
      </View>

      {value.stress >= 9 ? (
        <View style={styles.notice}>
          <Text style={styles.noticeText}>
            Se esse nível de sofrimento estiver intenso ou persistente, considere buscar apoio profissional qualificado.
          </Text>
        </View>
      ) : null}

      <TouchableOpacity style={styles.button} onPress={() => onSubmit({ ...value, timestamp: new Date().toISOString() })}>
        <Text style={styles.buttonLabel}>Gerar recomendação</Text>
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
    marginBottom: 4,
  },
  input: {
    padding: 14,
    borderRadius: 18,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.line,
  },
  row: {
    flexDirection: "row",
    gap: 10,
  },
  choice: {
    flex: 1,
    padding: 14,
    borderRadius: 18,
    backgroundColor: theme.colors.card,
    alignItems: "center",
  },
  choiceActive: {
    backgroundColor: theme.colors.primarySoft,
  },
  choiceLabel: {
    color: theme.colors.ink,
    fontWeight: "700",
    textAlign: "center",
  },
  notice: {
    padding: 14,
    borderRadius: 18,
    backgroundColor: "#fff3f3",
  },
  noticeText: {
    color: theme.colors.danger,
    lineHeight: 20,
  },
  button: {
    paddingVertical: 16,
    borderRadius: 20,
    backgroundColor: theme.colors.primary,
    alignItems: "center",
  },
  buttonLabel: {
    color: "#fff",
    fontWeight: "700",
  },
});
