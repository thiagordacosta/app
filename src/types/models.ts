export type MoodValue = 1 | 2 | 3 | 4 | 5;
export type PracticeType =
  | "guided-breathing"
  | "body-scan"
  | "mindful-pause"
  | "grounding"
  | "desk-stretches"
  | "focus-reset"
  | "self-compassion"
  | "pre-flow-ritual"
  | "recovery-break";

export type AmbientSound = "rain" | "forest" | "ocean" | "wind" | "river" | "silence";
export type ScreenRoute =
  | "onboarding"
  | "home"
  | "checkin"
  | "recommended"
  | "practice"
  | "breathing"
  | "ambient"
  | "stretches"
  | "progress"
  | "settings"
  | "notifications"
  | "ai-explanation";

export interface ReminderSettingsValue {
  promptsPerDay: number;
  preferredStartHour: number;
  preferredEndHour: number;
  quietHoursStart: number;
  quietHoursEnd: number;
  workdaysOnly: boolean;
  randomizedPrompts: boolean;
  fixedReminders: boolean;
  notificationTone: "soft-bell" | "wood" | "none";
}

export interface UserProfile {
  id: string;
  name: string;
  preferredPracticeDuration: number;
  reminderSettings: ReminderSettingsValue;
  soundPreference: AmbientSound;
  onboardingGoals: string[];
  mindfulnessExperience: "iniciante" | "intermediario" | "avancado";
  baselineStress: number;
  practiceWeights: Record<PracticeType, number>;
}

export interface ESMCheckIn {
  id: string;
  timestamp: string;
  mood: MoodValue;
  stress: number;
  energy: number;
  focus: number;
  activity: string;
  socialContext: string;
  challengeLevel: number;
  skillLevel: number;
  wantsPracticeNow: boolean;
}

export interface MindfulnessSession {
  id: string;
  timestamp: string;
  practiceType: PracticeType;
  duration: number;
  sound: AmbientSound;
  preState?: ESMCheckIn;
  postFeedback: string;
  effectivenessScore: number;
}

export interface Recommendation {
  id: string;
  timestamp: string;
  detectedState: string;
  recommendedPractice: PracticeType;
  reason: string;
  confidenceScore: number;
}

export interface PracticeDefinition {
  type: PracticeType;
  title: string;
  category: "breath" | "awareness" | "stretch" | "recovery" | "focus";
  description: string;
  instructions: string[];
  durations: number[];
  breathingPattern?: {
    inhale: number;
    hold?: number;
    exhale: number;
    holdAfter?: number;
  };
}

export interface AppStorageShape {
  profile: UserProfile | null;
  checkIns: ESMCheckIn[];
  sessions: MindfulnessSession[];
  recommendations: Recommendation[];
}
