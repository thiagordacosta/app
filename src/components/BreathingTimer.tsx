import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { theme } from "../theme";

interface BreathingTimerProps {
  minutes: number;
  inhale: number;
  exhale: number;
  hold?: number;
  holdAfter?: number;
  onComplete: () => void;
}

export function BreathingTimer({ minutes, inhale, exhale, hold, holdAfter, onComplete }: BreathingTimerProps) {
  const totalSeconds = Math.round(minutes * 60);
  const [secondsLeft, setSecondsLeft] = useState(totalSeconds);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    setSecondsLeft(totalSeconds);
    setRunning(false);
  }, [totalSeconds]);

  useEffect(() => {
    if (!running) {
      return;
    }

    const timer = setInterval(() => {
      setSecondsLeft((current) => {
        if (current <= 1) {
          clearInterval(timer);
          setRunning(false);
          onComplete();
          return 0;
        }
        return current - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [running, onComplete]);

  const pattern = [inhale, hold, exhale, holdAfter].filter(Boolean).join("-");
  const progress = ((totalSeconds - secondsLeft) / totalSeconds) * 100;

  return (
    <View style={styles.card}>
      <View style={styles.orbWrap}>
        <View style={[styles.orb, { transform: [{ scale: running ? 1 + (progress % 25) / 100 : 1 }] }]}>
          <Text style={styles.timerText}>
            {String(Math.floor(secondsLeft / 60)).padStart(2, "0")}:{String(secondsLeft % 60).padStart(2, "0")}
          </Text>
          <Text style={styles.pattern}>{pattern}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={() => setRunning((current) => !current)}>
        <Text style={styles.buttonLabel}>{running ? "Pausar" : "Iniciar prática"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 18,
    borderRadius: 24,
    backgroundColor: theme.colors.card,
    borderWidth: 1,
    borderColor: theme.colors.line,
    alignItems: "center",
  },
  orbWrap: {
    padding: 18,
  },
  orb: {
    width: 180,
    height: 180,
    borderRadius: 90,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.colors.primarySoft,
  },
  timerText: {
    fontSize: 30,
    fontWeight: "800",
    color: theme.colors.ink,
  },
  pattern: {
    marginTop: 8,
    color: theme.colors.muted,
  },
  button: {
    marginTop: 12,
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 18,
    backgroundColor: theme.colors.primary,
  },
  buttonLabel: {
    color: "#fff",
    fontWeight: "700",
  },
});
