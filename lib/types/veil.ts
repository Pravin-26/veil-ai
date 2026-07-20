export type QuestionnaireAnswers = Record<string, string>;

export type VeilPersona = {
  summary: string;
  conversationStyle: string;
  interests: string[];
  values: string[];
  relationshipGoals: string[];
  lifestylePreferences: string[];
  preferredDateStyles: string[];
  conversationTopics: string[];
  boundaries: string[];
};
