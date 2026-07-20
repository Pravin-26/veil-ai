export type DatingProfile = {
  relationshipGoal: string;
  values: string[];
  interests: string[];
  lifestyle: string[];
  communicationStyle: string[];
  idealDates: string[];
};

function normalize(items: string[]): Set<string> {
  return new Set(
    items.map((item) => item.trim().toLowerCase()).filter(Boolean)
  );
}

export function jaccardSimilarity(
  first: string[],
  second: string[]
): number {
  const setA = normalize(first);
  const setB = normalize(second);

  if (setA.size === 0 && setB.size === 0) {
    return 1;
  }

  const intersection = [...setA].filter((item) =>
    setB.has(item)
  ).length;

  const union = new Set([...setA, ...setB]).size;

  return union === 0 ? 0 : intersection / union;
}

function relationshipGoalCompatibility(
  firstGoal: string,
  secondGoal: string
): number {
  const a = firstGoal.trim().toLowerCase();
  const b = secondGoal.trim().toLowerCase();

  if (a === b) {
    return 1;
  }

  if (
    a.includes("long-term") &&
    b.includes("meaningful")
  ) {
    return 0.75;
  }

  if (
    b.includes("long-term") &&
    a.includes("meaningful")
  ) {
    return 0.75;
  }

  return 0.3;
}

export type MatchResult = {
  score: number;
  signal: "Strong" | "Promising" | "Worth Exploring" | "Limited";
  breakdown: {
    relationshipGoals: number;
    values: number;
    interests: number;
    lifestyle: number;
    communication: number;
    datePreferences: number;
  };
};

export function calculateMatchSignal(
  profileA: DatingProfile,
  profileB: DatingProfile
): MatchResult {
  const breakdown = {
    relationshipGoals: relationshipGoalCompatibility(
      profileA.relationshipGoal,
      profileB.relationshipGoal
    ),

    values: jaccardSimilarity(
      profileA.values,
      profileB.values
    ),

    interests: jaccardSimilarity(
      profileA.interests,
      profileB.interests
    ),

    lifestyle: jaccardSimilarity(
      profileA.lifestyle,
      profileB.lifestyle
    ),

    communication: jaccardSimilarity(
      profileA.communicationStyle,
      profileB.communicationStyle
    ),

    datePreferences: jaccardSimilarity(
      profileA.idealDates,
      profileB.idealDates
    ),
  };

  const weightedScore =
    breakdown.relationshipGoals * 0.3 +
    breakdown.values * 0.25 +
    breakdown.interests * 0.15 +
    breakdown.lifestyle * 0.1 +
    breakdown.communication * 0.1 +
    breakdown.datePreferences * 0.1;

  const score = Math.round(weightedScore * 100);

  let signal: MatchResult["signal"];

  if (score >= 80) {
    signal = "Strong";
  } else if (score >= 65) {
    signal = "Promising";
  } else if (score >= 45) {
    signal = "Worth Exploring";
  } else {
    signal = "Limited";
  }

  return {
    score,
    signal,
    breakdown,
  };
}