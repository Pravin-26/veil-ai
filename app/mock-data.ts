import type { VeilPersona } from "../lib/types/veil";

export type Question = {
  id: string;
  eyebrow: string;
  question: string;
  options: { label: string; detail: string; icon: string }[];
};

export const questions: Question[] = [
  { id: "goal", eyebrow: "01 — Intentions", question: "What are you hoping to find right now?", options: [{ label: "A lasting partnership", detail: "I’m open to something meaningful.", icon: "✦" }, { label: "A genuine connection", detail: "I want to see where chemistry leads.", icon: "♡" }, { label: "New people & possibility", detail: "I’m keeping things light and curious.", icon: "◌" }] },
  { id: "interests", eyebrow: "02 — Your spark", question: "What tends to light you up?", options: [{ label: "Food, art & cities", detail: "A gallery, a tiny restaurant, a new neighborhood.", icon: "◐" }, { label: "Outdoors & movement", detail: "A trail, a long walk, something active.", icon: "⌁" }, { label: "Ideas & making", detail: "Books, side projects, creative rabbit holes.", icon: "✎" }] },
  { id: "values", eyebrow: "03 — Values", question: "Which quality anchors a great relationship?", options: [{ label: "Kindness", detail: "The way someone treats people matters.", icon: "♡" }, { label: "Honesty", detail: "Realness is always attractive.", icon: "◇" }, { label: "Growth", detail: "I value learning together over perfection.", icon: "↗" }] },
  { id: "date", eyebrow: "04 — First impressions", question: "Your ideal first date has…", options: [{ label: "A little adventure", detail: "A market, a walk, then somewhere unexpected.", icon: "⌁" }, { label: "Easy conversation", detail: "Coffee that turns into dinner.", icon: "☕" }, { label: "A shared experience", detail: "A show, a class, a great meal.", icon: "✦" }] },
  { id: "communication", eyebrow: "05 — Connection", question: "How do you like to communicate?", options: [{ label: "Warm & direct", detail: "I say what I mean with care.", icon: "→" }, { label: "Playful & expressive", detail: "I love a good tangent and a voice note.", icon: "~" }, { label: "Thoughtful & intentional", detail: "I prefer depth over constant check-ins.", icon: "◌" }] },
  { id: "energy", eyebrow: "06 — Social rhythm", question: "After a full week, you recharge by…", options: [{ label: "Seeing my favorite people", detail: "Connection gives me energy.", icon: "☼" }, { label: "A mix of both", detail: "Plans, then a little quiet.", icon: "◐" }, { label: "Taking a breather", detail: "A slow night resets me.", icon: "☾" }] },
  { id: "lifestyle", eyebrow: "07 — Everyday life", question: "Your ideal weekend is…", options: [{ label: "Loosely planned", detail: "A few anchors, room for serendipity.", icon: "⌁" }, { label: "Spontaneous", detail: "The best plans happen at noon.", icon: "↗" }, { label: "Cozy & restorative", detail: "A good meal, a book, no alarm.", icon: "☾" }] },
  { id: "spontaneity", eyebrow: "08 — The plot twist", question: "How do you feel about a last-minute plan?", options: [{ label: "Usually yes", detail: "Surprise me—I’m in.", icon: "↗" }, { label: "Give me a little notice", detail: "I love a plan with breathing room.", icon: "◇" }, { label: "It depends on the plan", detail: "Make it a good one.", icon: "✦" }] },
  { id: "partner", eyebrow: "09 — Your person", question: "What do you value most in a partner?", options: [{ label: "Emotional intelligence", detail: "Someone curious about their inner world.", icon: "♡" }, { label: "A sense of humor", detail: "Life should have more laughing.", icon: "~" }, { label: "Quiet confidence", detail: "Someone grounded in who they are.", icon: "◇" }] },
  { id: "topics", eyebrow: "10 — Conversation", question: "You can talk for hours about…", options: [{ label: "Big ideas", detail: "Culture, purpose, and the strange stuff.", icon: "✎" }, { label: "Stories & people", detail: "The tiny details that make a life.", icon: "◐" }, { label: "Travel & taste", detail: "Where to go and what to eat there.", icon: "⌁" }] },
];

export const defaultAnswers = Object.fromEntries(questions.map((question) => [question.id, question.options[0].label]));

export const demoPersona: VeilPersona = {
  summary: "A profile-based persona representing someone who stated a desire for a lasting partnership, enjoys food, art, and cities, and values kindness.",
  conversationStyle: "Inferred from the selected communication preference: likely warm and direct in conversation.",
  interests: ["Food, art & cities"],
  values: ["Kindness"],
  relationshipGoals: ["A lasting partnership"],
  lifestylePreferences: ["Loosely planned weekends", "Usually open to spontaneous plans"],
  preferredDateStyles: ["A little adventure"],
  conversationTopics: ["Big ideas"],
  boundaries: [],
};

export const dateMessages = [
  [
    "Anaya",
    "This feels like exactly the kind of place where a good conversation can happen.",
  ],
  [
    "Your Veil",
    "Definitely. I like places where the conversation matters more than the noise.",
  ],
  [
    "Anaya",
    "Same. I usually remember the conversation more than what I actually ordered.",
  ],
  [
    "Your Veil",
    "That sounds familiar. Though a really good coffee earns bonus points.",
  ],
  [
    "Anaya",
    "Important question then: are you loyal to one favorite place, or always looking for somewhere new?",
  ],
  [
    "Your Veil",
    "Usually somewhere new. Especially if there is a bookstore or a neighborhood worth wandering afterward.",
  ],
  [
    "Anaya",
    "That might be my ideal kind of plan. Something simple with room for an unexpected detour.",
  ],
  [
    "Your Veil",
    "I like that. Plans that feel easy but still leave room for surprises.",
  ],
  [
    "Anaya",
    "What is something that instantly makes you feel at home in a city?",
  ],
  [
    "Your Veil",
    "Good coffee, kind people, and a street that has more stories than it shows at first glance.",
  ],
] as const;

export const match = {
  name: "Anaya",
  age: 29,
  city: "New York",
  avatar: "/avatars/anaya.png",
  shared: ["Travel", "Coffee", "Books"],
  dateTime: "Tonight at 8:00 PM",
};

const preferenceMatches: Record<string, string> = {
  goal: "A lasting partnership",
  interests: "Food, art & cities",
  values: "Kindness",
  date: "A little adventure",
  communication: "Warm & direct",
  energy: "A mix of both",
  lifestyle: "Loosely planned",
  spontaneity: "Usually yes",
  partner: "Emotional intelligence",
  topics: "Big ideas",
};

/** A transparent mock score: it changes as the stated demo preferences change. */
export function getRequirementMatchSignal(answers: Record<string, string>) {
  const matchedPreferences = Object.entries(preferenceMatches).filter(([key, value]) => answers[key] === value).length;
  return 65 + Math.round((matchedPreferences / Object.keys(preferenceMatches).length) * 19);
}
