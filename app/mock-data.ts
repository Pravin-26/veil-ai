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

export const dateMessages = [
  ["Mara", "I saw you make a mean mushroom risotto. Is that a comfort-food skill or a dinner-party flex?"],
  ["Your Veil", "Definitely comfort food first, but I won’t deny enjoying the dramatic stirring part."],
  ["Mara", "Good answer. I’m partial to recipes that make the kitchen smell like you’re somewhere else."],
  ["Your Veil", "Exactly. I’d take a small restaurant with one perfect dish over somewhere flashy any day."],
  ["Mara", "That feels like a very strong first-date philosophy. Add a neighborhood walk afterward?"],
  ["Your Veil", "Yes—especially if there’s an unplanned bookstore or a place for dessert involved."],
  ["Mara", "I’m hearing equal parts thoughtful and game for a detour. That’s a lovely combination."],
  ["Your Veil", "And I’m hearing someone who knows a good evening doesn’t need to be overproduced."],
] as const;

export const match = {
  name: "Maya",
  age: 27,
  city: "New York",
  avatar: "/avatars/maya.png",
  interests: ["Travel", "Coffee", "Books"],
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
