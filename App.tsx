import { StatusBar } from "expo-status-bar";
import React, { useEffect, useMemo, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CharacterCompanion } from "./src/components/CharacterCompanion";
import { mockCheckIns, mockRecommendations, mockSessions, mockUserProfile, practices } from "./src/data/mockData";
import { AIExplanationScreen } from "./src/screens/AIExplanationScreen";
import { AmbientSoundsScreen } from "./src/screens/AmbientSoundsScreen";
import { BreathingPracticeScreen } from "./src/screens/BreathingPracticeScreen";
import { ESMCheckInScreen } from "./src/screens/ESMCheckInScreen";
import { HomeDashboardScreen } from "./src/screens/HomeDashboardScreen";
import { NotificationPreferencesScreen } from "./src/screens/NotificationPreferencesScreen";
import { OnboardingScreen } from "./src/screens/OnboardingScreen";
import { ProgressDashboardScreen } from "./src/screens/ProgressDashboardScreen";
import { RecommendedPracticeScreen } from "./src/screens/RecommendedPracticeScreen";
import { SettingsScreen } from "./src/screens/SettingsScreen";
import { StretchLibraryScreen } from "./src/screens/StretchLibraryScreen";
import { theme } from "./src/theme";
import {
  ESMCheckIn,
  MindfulnessSession,
  PracticeDefinition,
  Recommendation,
  ReminderSettingsValue,
  ScreenRoute,
  UserProfile,
} from "./src/types/models";
import {
  applyFeedbackToPracticeWeights,
  buildWeeklyReflection,
  createRecommendation,
  detectPossibleFlowState,
  defaultCheckInValues,
  getBestPracticeTimes,
  getMostEffectivePractices,
  getStateSummary,
} from "./src/utils/personalization";
import { clearAllStoredData, loadAppState, saveAppState } from "./src/utils/storage";

const tabRoutes: Array<{ key: ScreenRoute; label: string }> = [
  { key: "home", label: "Home" },
  { key: "checkin", label: "Check-in" },
  { key: "practice", label: "Prática" },
  { key: "progress", label: "Progresso" },
  { key: "settings", label: "Ajustes" },
];

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [route, setRoute] = useState<ScreenRoute>("onboarding");
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [checkIns, setCheckIns] = useState<ESMCheckIn[]>([]);
  const [sessions, setSessions] = useState<MindfulnessSession[]>([]);
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [activeRecommendation, setActiveRecommendation] = useState<Recommendation | null>(null);
  const [activePractice, setActivePractice] = useState<PracticeDefinition | null>(null);

  useEffect(() => {
    async function bootstrap() {
      const stored = await loadAppState();

      if (stored.profile) {
        setProfile(stored.profile);
        setCheckIns(stored.checkIns);
        setSessions(stored.sessions);
        setRecommendations(stored.recommendations);
        setActiveRecommendation(stored.recommendations[0] ?? null);
        setRoute("home");
      } else {
        setProfile(mockUserProfile);
        setCheckIns(mockCheckIns);
        setSessions(mockSessions);
        setRecommendations(mockRecommendations);
        setActiveRecommendation(mockRecommendations[0] ?? null);
        setRoute("onboarding");
      }

      setIsReady(true);
    }

    bootstrap();
  }, []);

  useEffect(() => {
    if (!isReady || !profile) {
      return;
    }

    saveAppState({
      profile,
      checkIns,
      sessions,
      recommendations,
    });
  }, [isReady, profile, checkIns, sessions, recommendations]);

  const dashboardStats = useMemo(() => {
    const averageStress = checkIns.length
      ? Math.round(checkIns.reduce((sum, item) => sum + item.stress, 0) / checkIns.length)
      : 0;
    const averageFocus = checkIns.length
      ? Math.round(checkIns.reduce((sum, item) => sum + item.focus, 0) / checkIns.length)
      : 0;

    return {
      checkInsCompleted: checkIns.length,
      mindfulnessSessionsCompleted: sessions.length,
      averageStress,
      averageFocus,
      mostEffectivePractices: getMostEffectivePractices(sessions),
      bestTimes: getBestPracticeTimes(sessions),
      flowMoments: checkIns.filter(detectPossibleFlowState).length,
      weeklyReflection: buildWeeklyReflection(checkIns, sessions),
    };
  }, [checkIns, sessions]);

  const handleFinishOnboarding = (nextProfile: UserProfile) => {
    setProfile(nextProfile);
    setRoute("home");
  };

  const handleSubmitCheckIn = (checkIn: ESMCheckIn) => {
    const recommendation = createRecommendation(checkIn, sessions, profile);

    setCheckIns((current) => [checkIn, ...current]);
    setRecommendations((current) => [recommendation, ...current]);
    setActiveRecommendation(recommendation);

    if (recommendation.recommendedPractice) {
      const foundPractice = practices.find((practice) => practice.type === recommendation.recommendedPractice);
      setActivePractice(foundPractice ?? practices[0]);
    }

    setRoute("recommended");
  };

  const handleStartRecommendedPractice = () => {
    if (!activeRecommendation) {
      return;
    }

    const foundPractice = practices.find((practice) => practice.type === activeRecommendation.recommendedPractice);
    setActivePractice(foundPractice ?? practices[0]);
    setRoute("breathing");
  };

  const handleCompleteSession = (session: MindfulnessSession) => {
    setSessions((current) => [session, ...current]);
    setProfile((current) => (current ? applyFeedbackToPracticeWeights(current, session) : current));
    setRoute("progress");
  };

  const handleSelectPractice = (practice: PracticeDefinition) => {
    setActivePractice(practice);
    setRoute("practice");
  };

  const handleUpdateReminderSettings = (settings: ReminderSettingsValue) => {
    setProfile((current) => (current ? { ...current, reminderSettings: settings } : current));
  };

  const handleDeleteAllData = async () => {
    await clearAllStoredData();
    setProfile(mockUserProfile);
    setCheckIns([]);
    setSessions([]);
    setRecommendations([]);
    setActiveRecommendation(null);
    setActivePractice(null);
    setRoute("onboarding");
  };

  if (!isReady || !profile) {
    return null;
  }

  const currentRecommendation = activeRecommendation ?? recommendations[0] ?? null;
  const recommendedPractice =
    activePractice ??
    practices.find((practice) => practice.type === currentRecommendation?.recommendedPractice) ??
    practices[0];

  const showTabs = !["onboarding", "recommended", "breathing", "notifications", "ai-explanation"].includes(route);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />
      <View style={styles.appShell}>
        <View style={styles.headerCard}>
          <View style={styles.headerCopy}>
            <Text style={styles.eyebrow}>Mindfulness adaptativo</Text>
            <Text style={styles.title}>Mindfulness com Leticia</Text>
            <Text style={styles.subtitle}>{getStateSummary(checkIns[0])}</Text>
          </View>
          <CharacterCompanion mood={checkIns[0]?.mood ?? 3} />
        </View>

        <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
          {route === "onboarding" && <OnboardingScreen profile={profile} onFinish={handleFinishOnboarding} />}
          {route === "home" && (
            <HomeDashboardScreen
              profile={profile}
              stats={dashboardStats}
              latestRecommendation={currentRecommendation}
              onStartCheckIn={() => setRoute("checkin")}
              onOpenRecommendation={() => setRoute("recommended")}
              onOpenAIExplanation={() => setRoute("ai-explanation")}
            />
          )}
          {route === "checkin" && <ESMCheckInScreen initialValues={defaultCheckInValues()} onSubmit={handleSubmitCheckIn} />}
          {route === "recommended" && currentRecommendation && (
            <RecommendedPracticeScreen
              recommendation={currentRecommendation}
              practice={recommendedPractice}
              onStartPractice={handleStartRecommendedPractice}
              onBackHome={() => setRoute("home")}
            />
          )}
          {route === "practice" && (
            <RecommendedPracticeScreen
              recommendation={currentRecommendation}
              practice={recommendedPractice}
              onStartPractice={() => setRoute("breathing")}
              onBackHome={() => setRoute("home")}
            />
          )}
          {route === "breathing" && (
            <BreathingPracticeScreen
              profile={profile}
              practice={recommendedPractice}
              soundPreference={profile.soundPreference}
              preState={checkIns[0]}
              onComplete={handleCompleteSession}
              onOpenAmbientSounds={() => setRoute("ambient")}
            />
          )}
          {route === "ambient" && (
            <AmbientSoundsScreen
              selectedSound={profile.soundPreference}
              onSelectSound={(sound) => setProfile({ ...profile, soundPreference: sound })}
              onBack={() => setRoute("breathing")}
            />
          )}
          {route === "stretches" && (
            <StretchLibraryScreen
              stretches={practices.filter((practice) => practice.category === "stretch")}
              onSelectPractice={handleSelectPractice}
            />
          )}
          {route === "progress" && <ProgressDashboardScreen checkIns={checkIns} sessions={sessions} stats={dashboardStats} />}
          {route === "settings" && (
            <SettingsScreen
              profile={profile}
              onOpenNotifications={() => setRoute("notifications")}
              onOpenAIExplanation={() => setRoute("ai-explanation")}
              onOpenStretches={() => setRoute("stretches")}
              onDeleteAllData={handleDeleteAllData}
            />
          )}
          {route === "notifications" && (
            <NotificationPreferencesScreen
              settings={profile.reminderSettings}
              onChange={handleUpdateReminderSettings}
              onBack={() => setRoute("settings")}
            />
          )}
          {route === "ai-explanation" && (
            <AIExplanationScreen
              profile={profile}
              latestRecommendation={currentRecommendation}
              onBack={() => setRoute("home")}
            />
          )}
        </ScrollView>

        {showTabs && (
          <View style={styles.tabBar}>
            {tabRoutes.map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[styles.tabButton, route === tab.key && styles.tabButtonActive]}
                onPress={() => setRoute(tab.key)}
              >
                <Text style={[styles.tabLabel, route === tab.key && styles.tabLabelActive]}>{tab.label}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  appShell: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  headerCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
    padding: 18,
    borderRadius: 28,
    backgroundColor: theme.colors.card,
    shadowColor: "#5f6d7a",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 16 },
    shadowRadius: 32,
    elevation: 10,
  },
  headerCopy: {
    flex: 1,
  },
  eyebrow: {
    fontSize: 12,
    textTransform: "uppercase",
    letterSpacing: 1.6,
    color: theme.colors.muted,
    marginBottom: 4,
  },
  title: {
    fontSize: 28,
    fontFamily: theme.fonts.display,
    color: theme.colors.ink,
  },
  subtitle: {
    marginTop: 6,
    color: theme.colors.muted,
    fontSize: 14,
    lineHeight: 20,
  },
  content: {
    flex: 1,
    marginTop: 14,
  },
  contentContainer: {
    paddingBottom: 20,
  },
  tabBar: {
    flexDirection: "row",
    gap: 10,
    paddingVertical: 12,
    marginBottom: 8,
  },
  tabButton: {
    flex: 1,
    borderRadius: 18,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: theme.colors.card,
  },
  tabButtonActive: {
    backgroundColor: theme.colors.primarySoft,
  },
  tabLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: theme.colors.muted,
  },
  tabLabelActive: {
    color: theme.colors.ink,
  },
});
