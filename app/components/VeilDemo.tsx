"use client";
import { calculateMatchSignal, type DatingProfile } from "@/lib/matching";
import { useEffect, useState } from "react";
import { dateMessages, defaultAnswers, demoPersona, getRequirementMatchSignal, questions } from "../mock-data";
import type { VeilPersona } from "../../lib/types/veil";
import VirtualDateMatchCard from "./VirtualDateMatchCard";
import { Button, Eyebrow } from "./VeilUI";

type Stage = "landing" | "onboarding" | "creatingPersona" | "personaError" | "persona" | "match" | "date" | "report" | "reveal";

function Mark() { return <div className="grid size-9 place-items-center rounded-full border border-violet-200/25 bg-violet-300/10 text-lg text-violet-100">v</div>; }
function Shell({ children }: { children: React.ReactNode }) { return <main className="relative min-h-screen overflow-hidden bg-[#0c0715] text-[#f8f4ff]"><div className="pointer-events-none absolute left-[-18rem] top-[-12rem] size-[42rem] rounded-full bg-violet-700/20 blur-3xl" /><div className="pointer-events-none absolute bottom-[-18rem] right-[-16rem] size-[46rem] rounded-full bg-fuchsia-700/15 blur-3xl" />{children}</main>; }
function Topbar({ onHome }: { onHome: () => void }) { return <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-6 py-6"><button onClick={onHome} className="flex items-center gap-3"><Mark /><span className="font-serif text-2xl tracking-tight">Veil</span></button><span className="hidden text-xs tracking-[.2em] text-violet-200/55 sm:block">CONNECTION, WITH INTENTION</span></header>; }

export default function VeilDemo() {
  const [stage, setStage] = useState<Stage>("landing"); const [step, setStep] = useState(0); const [answers, setAnswers] = useState<Record<string, string>>({}); const [persona, setPersona] = useState<VeilPersona | null>(null); const [personaError, setPersonaError] = useState(""); const [visibleMessages, setVisibleMessages] = useState(0); const [mutual, setMutual] = useState(false);
  useEffect(() => { if (stage !== "date") return; const interval = window.setInterval(() => setVisibleMessages((n) => { if (n >= dateMessages.length) { window.clearInterval(interval); return n; } return n + 1; }), 5000); return () => window.clearInterval(interval); }, [stage]);
  const begin = (demo = false) => { setAnswers(demo ? defaultAnswers : {}); setPersona(demo ? demoPersona : null); setPersonaError(""); setStep(0); setStage(demo ? "persona" : "onboarding"); };
  const createPersona = async () => {
    setStage("creatingPersona");
    setPersonaError("");
    try {
      const response = await fetch("/api/persona", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ answers }) });
      const payload: unknown = await response.json();
      if (!response.ok || !payload || typeof payload !== "object" || !("persona" in payload)) throw new Error(payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string" ? payload.error : "Unable to create your Veil.");
      setPersona(payload.persona as VeilPersona);
      setStage("persona");
    } catch (error) {
      setPersonaError(error instanceof Error ? error.message : "Unable to create your Veil.");
      setStage("personaError");
    }
  };
const question = questions[step];
const answer = answers[question?.id];

const currentUserProfile: DatingProfile = {
  relationshipGoal:
    answers.relationshipGoal ?? "Long-term relationship",

  values: [
    answers.values ?? "Personal growth",
    "Curiosity",
    "Warmth",
  ],

  interests: [
    answers.interests ?? "Coffee",
    "Travel",
    "Books",
  ],

  lifestyle: [
    answers.lifestyle ?? "Balanced",
    answers.socialEnergy ?? "Small social circles",
  ],

  communicationStyle: [
    answers.communicationStyle ?? "Thoughtful",
    "Open communication",
  ],

  idealDates: [
    answers.idealDate ?? "Coffee and conversation",
    "Walking",
  ],
};

const matchedProfile: DatingProfile = {
  relationshipGoal: "Long-term relationship",

  values: [
    "Personal growth",
    "Curiosity",
    "Warmth",
  ],

  interests: [
    "Coffee",
    "Travel",
    "Books",
    "Photography",
  ],

  lifestyle: [
    "Balanced",
    "Small social circles",
    "Weekend exploration",
  ],

  communicationStyle: [
    "Thoughtful",
    "Open communication",
    "Humorous",
  ],

  idealDates: [
    "Coffee and conversation",
    "Walking",
    "Museum",
  ],
};

const matchResult = calculateMatchSignal(
  currentUserProfile,
  matchedProfile
);

const requirementSignal = matchResult.score;

const currentDateIndex = Math.max(visibleMessages - 1, 0);

const currentMessage =
  visibleMessages > 0
    ? dateMessages[
        Math.min(currentDateIndex, dateMessages.length - 1)
      ]
    : null;

const currentSpeaker = currentMessage?.[0] ?? "";

const rohanAvatar =
  currentDateIndex <= 1
    ? "/avatars/rohan-neutral.png"
    : currentDateIndex <= 4
    ? "/avatars/rohan-smile.png"
    : currentDateIndex <= 7
    ? "/avatars/rohan-thoughtful.png"
    : "/avatars/rohan-smile.png";

const anayaAvatar =
  currentDateIndex <= 1
    ? "/avatars/anaya-neutral.png"
    : currentDateIndex <= 5
    ? "/avatars/anaya-smile.png"
    : "/avatars/anaya-warm.png";

return <Shell>

<Topbar onHome={() => setStage("landing")} />
    {stage === "landing" && <section className="relative mx-auto grid min-h-[calc(100vh-88px)] max-w-6xl items-center gap-12 px-6 pb-20 lg:grid-cols-[1.05fr_.95fr]"><div><Eyebrow>AN AI-ASSISTED DATING EXPERIENCE</Eyebrow><h1 className="mt-5 max-w-xl font-serif text-5xl leading-[.98] tracking-tight sm:text-7xl">Let your AI <em className="font-normal text-violet-300">break</em> the ice.</h1><p className="mt-7 max-w-lg text-lg leading-8 text-white/65">Veil lets two profile-based AI personas share a low-stakes first conversation—then gives you both a thoughtful place to begin.</p><div className="mt-9 flex flex-wrap gap-3"><Button onClick={() => begin()}>Create Your Veil <span className="ml-2">→</span></Button><Button secondary onClick={() => begin(true)}>Try Demo</Button></div><p className="mt-5 text-xs text-white/35">Private by design. You decide what your Veil knows.</p></div><div className="relative mx-auto w-full max-w-md"><div className="rounded-[2rem] border border-white/12 bg-white/[.06] p-5 shadow-2xl backdrop-blur"><div className="rounded-[1.5rem] bg-gradient-to-br from-violet-300/25 via-[#311a53] to-[#1a1029] p-7"><div className="flex items-center justify-between text-xs text-white/55"><span>THE VEIL ROOM</span><span>● LIVE</span></div><div className="mt-14 space-y-4"><div className="mr-8 rounded-2xl rounded-bl-sm bg-white/12 p-4 text-sm text-white/80">What kind of evening makes you lose track of time?</div><div className="ml-8 rounded-2xl rounded-br-sm bg-violet-300 p-4 text-sm text-[#190b2b]">One that leaves room for a lovely surprise.</div></div><div className="mt-12 flex items-center gap-3"><div className="size-9 rounded-full bg-fuchsia-300/40" /><div><p className="text-sm">Two stories, gently introduced</p><p className="text-xs text-white/50">No swiping required</p></div></div></div></div></div></section>}
    {stage === "onboarding" && <section className="relative mx-auto max-w-3xl px-6 py-10 sm:py-16"><div className="mb-10 flex items-center justify-between"><Eyebrow>Creating your Veil</Eyebrow><span className="text-sm text-white/45">{step + 1} / {questions.length}</span></div><div className="h-px overflow-hidden bg-white/10"><div className="h-full bg-gradient-to-r from-violet-400 to-fuchsia-300 transition-all" style={{ width: `${((step + 1) / questions.length) * 100}%` }} /></div><div className="mt-12"><Eyebrow>{question.eyebrow}</Eyebrow><h2 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">{question.question}</h2><p className="mt-4 text-white/55">Choose the answer that feels most true today.</p><div className="mt-8 grid gap-3">{question.options.map((option) => <button key={option.label} onClick={() => setAnswers({ ...answers, [question.id]: option.label })} className={`flex items-center gap-4 rounded-2xl border p-5 text-left transition ${answer === option.label ? "border-violet-300 bg-violet-300/15" : "border-white/10 bg-white/[.035] hover:border-white/25"}`}><span className="grid size-10 place-items-center rounded-full bg-white/8 text-lg text-violet-200">{option.icon}</span><span><b className="block text-sm">{option.label}</b><span className="mt-1 block text-sm text-white/50">{option.detail}</span></span><span className={`ml-auto size-4 rounded-full border ${answer === option.label ? "border-violet-200 bg-violet-300 shadow-[0_0_15px_#c4b5fd]" : "border-white/25"}`} /></button>)}</div><div className="mt-9 flex justify-between"><Button secondary onClick={() => step === 0 ? setStage("landing") : setStep(step - 1)}>Back</Button><Button disabled={!answer} onClick={() => step === questions.length - 1 ? void createPersona() : setStep(step + 1)}>Continue <span className="ml-2">→</span></Button></div></div></section>}
    {stage === "creatingPersona" && <section className="relative mx-auto flex min-h-[calc(100vh-88px)] max-w-3xl items-center justify-center px-6 pb-16 text-center"><div className="animate-[fadeIn_.45s_ease-out]"><div className="mx-auto grid size-16 place-items-center rounded-full border border-violet-200/30 bg-violet-300/15 text-2xl text-violet-100">✦</div><Eyebrow><span className="mt-7 block">A thoughtful reflection</span></Eyebrow><h2 className="mt-4 font-serif text-5xl">Creating your Veil...</h2><p className="mx-auto mt-5 max-w-md leading-7 text-white/60">We&apos;re shaping a profile-based persona from the preferences you chose to share.</p></div></section>}
    {stage === "personaError" && <section className="relative mx-auto flex min-h-[calc(100vh-88px)] max-w-3xl items-center justify-center px-6 pb-16 text-center"><div><Eyebrow>Persona unavailable</Eyebrow><h2 className="mt-4 font-serif text-5xl">We couldn&apos;t create your Veil.</h2><p className="mx-auto mt-5 max-w-md leading-7 text-white/60">{personaError}</p><div className="mt-8 flex flex-wrap justify-center gap-3"><Button secondary onClick={() => { setStep(questions.length - 1); setStage("onboarding"); }}>Review answers</Button><Button onClick={() => { setPersona(demoPersona); setStage("persona"); }}>Continue with Demo Persona <span className="ml-2">→</span></Button></div></div></section>}
    {stage === "persona" && <section className="relative mx-auto grid min-h-[calc(100vh-88px)] max-w-5xl items-center gap-12 px-6 pb-16 md:grid-cols-2"><div><Eyebrow>Your introduction</Eyebrow><h2 className="mt-4 font-serif text-5xl sm:text-6xl">Meet your <em className="font-normal text-violet-300">Veil.</em></h2><p className="mt-6 max-w-md leading-7 text-white/60">Your Veil is a profile-based AI persona. It only represents information you choose to provide.</p><div className="mt-8"><Button onClick={() => setStage("match")}>Find My Match <span className="ml-2">→</span></Button></div></div><div className="rounded-[2rem] border border-violet-200/20 bg-gradient-to-br from-violet-300/20 to-white/[.03] p-7 shadow-2xl"><div className="flex items-start justify-between"><div className="grid size-16 place-items-center rounded-full bg-gradient-to-br from-violet-300 to-fuchsia-300 font-serif text-3xl text-[#1b0c2e]">V</div><span className="rounded-full border border-violet-200/25 px-3 py-1 text-[10px] tracking-widest text-violet-200">PROFILE-BASED</span></div><h3 className="mt-8 font-serif text-3xl">Your Veil</h3><p className="mt-2 text-sm leading-6 text-white/60">{persona?.summary ?? demoPersona.summary}</p><p className="mt-4 text-xs leading-5 text-violet-100/70">Built from the preferences you chose to share.</p><div className="mt-7"><Eyebrow>Conversation style</Eyebrow><p className="mt-2 text-sm leading-6 text-white/65">{persona?.conversationStyle ?? demoPersona.conversationStyle}</p></div><div className="mt-7 flex flex-wrap gap-2">{[...(persona?.interests ?? demoPersona.interests), ...(persona?.values ?? demoPersona.values), ...(persona?.preferredDateStyles ?? demoPersona.preferredDateStyles)].slice(0, 5).map((item) => <span key={item} className="rounded-full bg-white/10 px-3 py-2 text-xs text-white/75">{item}</span>)}</div><div className="mt-10 border-t border-white/10 pt-5 text-xs leading-5 text-white/45">A reflection of what you shared—not a replacement for you.</div></div></section>}
    {stage === "match" && <section className="relative mx-auto max-w-4xl px-6 py-12 sm:py-20"><VirtualDateMatchCard onStartDate={() => { setVisibleMessages(0); setStage("date"); }} /></section>}
   {stage === "date" && (
  <section className="relative mx-auto flex min-h-[calc(100vh-88px)] max-w-5xl flex-col px-6 pb-12">
    <div className="pt-8 text-center">
      <Eyebrow>The Veil room</Eyebrow>

      <h2 className="mt-3 font-serif text-4xl">
        A first conversation, gently held.
      </h2>

      <p className="mt-3 text-xs text-white/45">
        AI-generated simulation based on user-provided profiles.
      </p>
    </div>

    <div className="relative mt-8 h-[560px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#100918] shadow-2xl">
      {/* Rohan */}
      <div className="absolute bottom-0 left-0 h-full w-1/2">
        <img
          src={rohanAvatar}
          alt="Rohan's Veil"
          className={`h-full w-full object-cover object-center transition-all duration-700 ${
            currentSpeaker === "Your Veil"
              ? "scale-[1.03] brightness-110"
              : "brightness-75"
          }`}
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/40" />

        <div className="absolute bottom-5 left-5 rounded-2xl border border-white/10 bg-black/45 px-4 py-3 backdrop-blur">
          <p className="text-xs uppercase tracking-[0.2em] text-violet-200">
            Your Veil
          </p>
          <p className="mt-1 font-serif text-xl">Rohan</p>
        </div>
      </div>

      {/* Anaya */}
      <div className="absolute bottom-0 right-0 h-full w-1/2">
        <img
          src={anayaAvatar}
          alt="Anaya"
          className={`h-full w-full object-cover object-center transition-all duration-700 ${
            currentSpeaker === "Anaya"
              ? "scale-[1.03] brightness-110"
              : "brightness-75"
          }`}
        />

        <div className="absolute inset-0 bg-gradient-to-l from-black/10 via-transparent to-black/40" />

        <div className="absolute bottom-5 right-5 rounded-2xl border border-white/10 bg-black/45 px-4 py-3 text-right backdrop-blur">
          <p className="text-xs uppercase tracking-[0.2em] text-fuchsia-200">
            Anaya
          </p>
          <p className="mt-1 font-serif text-xl">Anaya</p>
        </div>
      </div>

      {/* Current message */}
{currentMessage && (
  <div
    key={visibleMessages}
    className={`absolute top-[58%] z-20 w-[300px] max-w-[30%] animate-[fadeIn_.8s_ease-out] rounded-3xl border p-5 shadow-2xl backdrop-blur-md ${
  currentSpeaker === "Your Veil"
    ? "left-[30%] border-violet-200/20 bg-violet-300/95 text-[#210d35]"
    : "right-[30%] border-fuchsia-200/20 bg-[#211a25]/95 text-white"
}`}
  >
    <p className="text-[10px] font-bold uppercase tracking-[0.2em]">
      {currentSpeaker === "Your Veil"
        ? "Rohan's Veil"
        : "Anaya"}
    </p>

    <p className="mt-2 text-sm leading-6">
      {currentMessage[1]}
    </p>
  </div>
)}

      {visibleMessages < dateMessages.length && (
        <div className="absolute bottom-5 left-1/2 z-20 -translate-x-1/2">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-black/55 px-4 py-2 text-xs text-white/75 backdrop-blur-md">
            <span className="size-2 animate-pulse rounded-full bg-violet-300" />
            Virtual date in progress...
          </div>
        </div>
      )}
    </div>

    {visibleMessages >= dateMessages.length && (
      <div
        role="status"
        className="mt-6 rounded-2xl border border-emerald-300/25 bg-emerald-300/10 p-5 text-center animate-[fadeIn_.45s_ease-out]"
      >
        <p className="text-sm font-semibold text-emerald-100">
          ✦ Virtual Date Report ready
        </p>

        <h3 className="mt-2 font-serif text-2xl">
          Your Veils are back.
        </h3>

        <p className="mt-2 text-sm text-white/55">
          They found a few threads worth holding onto.
        </p>

        <div className="mt-5">
          <Button onClick={() => setStage("report")}>
            View Virtual Date Report <span className="ml-2">→</span>
          </Button>
        </div>
      </div>
    )}
  </section>
)}
    {stage === "report" && <section className="relative mx-auto max-w-5xl px-6 py-10 sm:py-16"><div className="text-center"><Eyebrow>Compatibility exploration</Eyebrow><h2 className="mt-3 font-serif text-5xl">Worth <em className="font-normal text-violet-300">Exploring.</em></h2><p className="mt-4 text-white/55">Not a verdict. A few inviting places to begin.</p></div><div className="mx-auto mt-8 max-w-xl rounded-[2rem] border border-violet-200/20 bg-gradient-to-br from-violet-300/15 to-fuchsia-300/5 p-6 text-center"><Eyebrow>Requirement Match Signal</Eyebrow><p className="mt-3 font-serif text-6xl text-violet-100">{requirementSignal}%</p><p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/65">Based on the relationship goals, values, lifestyle, interests, and first-date preferences you stated, this is a promising connection worth exploring.</p><p className="mx-auto mt-4 max-w-md text-xs leading-5 text-white/42">This is an explainable preference-based match signal calculated from your stated relationship goals, values, interests, lifestyle, communication style, and date preferences. It is not a scientific compatibility score and does not predict real-world chemistry or relationship success.</p></div><div className="mx-auto mt-6 grid max-w-3xl gap-3 sm:grid-cols-2 md:grid-cols-3">
  {[
    ["Relationship goals", matchResult.breakdown.relationshipGoals],
    ["Values", matchResult.breakdown.values],
    ["Interests", matchResult.breakdown.interests],
    ["Lifestyle", matchResult.breakdown.lifestyle],
    ["Communication", matchResult.breakdown.communication],
    ["Date preferences", matchResult.breakdown.datePreferences],
  ].map(([label, value]) => (
    <div
      key={label as string}
      className="rounded-2xl border border-white/10 bg-white/[.04] p-4 text-center"
    >
      <p className="text-xs text-white/45">
        {label}
      </p>

      <p className="mt-2 text-2xl font-semibold text-violet-200">
        {Math.round((value as number) * 100)}%
      </p>
    </div>
  ))}
</div><div className="mt-10 grid gap-4 md:grid-cols-2"><ReportCard title="Areas of alignment" items={["Both prefer meaningful conversation over performative small talk.", "Food, neighborhood wandering, and unplanned discovery feel like shared joy.", "You each value warmth paired with clear communication."]} /><ReportCard title="Differences worth discussing" items={["Anaya may lean a little more spontaneous; you appreciate some gentle structure", "Your social rhythms could be different—an easy early conversation to have."]} /><ReportCard title="Conversation starters" items={["What is the best tiny restaurant you’ve found lately?", "Which creative hobby would you happily teach someone?", "What does a really good weekend look like to you?"]} /><ReportCard title="Explore on a real first date" items={["How each of you makes room for connection in a busy week.", "What curiosity and care look like when things are not effortless."]} /></div><p className="mx-auto mt-8 max-w-3xl text-center text-xs leading-6 text-white/42">This report is an AI-generated exploration based on information provided by both users. Real-world chemistry can only be discovered by the people themselves.</p><div className="mt-8 text-center"><Button onClick={() => setStage("reveal")}>Lift the Veil <span className="ml-2">→</span></Button></div></section>}
    {stage === "reveal" && (
  <section className="relative mx-auto flex min-h-[calc(100vh-88px)] max-w-3xl items-center justify-center px-6 pb-16 text-center">
    {!mutual ? (
      <div>
        <Eyebrow>The moment of choice</Eyebrow>

        <h2 className="mt-5 font-serif text-5xl leading-tight sm:text-6xl">
          Would you like to meet the person behind the Veil?
        </h2>

        <p className="mx-auto mt-6 max-w-lg text-white/60">
          There&apos;s no right answer. A good connection starts with choosing what feels right to you.
        </p>

        <div className="mt-9 flex flex-wrap justify-center gap-3">
          <Button secondary onClick={() => setStage("landing")}>
            Stay Veiled
          </Button>

          <Button onClick={() => setMutual(true)}>
            I&apos;m Curious <span className="ml-2">→</span>
          </Button>
        </div>
      </div>
    ) : (
      <div className="animate-[fadeIn_.6s_ease-out]">
        <div className="mx-auto flex justify-center gap-5">
          <div className="text-center">
            <img
              src="/avatars/rohan.png"
              alt="Rohan"
              className="mx-auto size-24 rounded-full object-cover ring-2 ring-violet-300/40"
            />
            <p className="mt-3 text-sm text-white/60">You</p>
          </div>

          <div className="text-center">
            <img
              src="/avatars/anaya.png"
              alt="Anaya"
              className="mx-auto size-24 rounded-full object-cover ring-2 ring-fuchsia-300/40"
            />
            <p className="mt-3 text-sm text-white/60">Anaya</p>
          </div>
        </div>

        <Eyebrow>
          <span className="mt-8 block">The signal returned</span>
        </Eyebrow>

        <h2 className="mt-4 font-serif text-6xl text-violet-200 sm:text-7xl">
          It&apos;s mutual.
        </h2>

        <p className="mt-5 font-serif text-3xl">
          Meet Anaya, 29.
        </p>

        <p className="mx-auto mt-4 max-w-md text-white/60">
          Ceramicist, film photographer, believer in long dinners and the right kind of detour.
        </p>

        <div className="mt-12 border-t border-white/10 pt-7 font-serif text-2xl text-white/80">
          The Veil lifts here. The rest is yours.
        </div>

        <div className="mt-8">
          <Button secondary onClick={() => setStage("landing")}>
            Return home
          </Button>
        </div>
      </div>
    )}
    </section>
)}
</Shell>;
}

function ReportCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[.045] p-6">
      <Eyebrow>{title}</Eyebrow>

      <ul className="mt-4 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className="flex gap-3 text-sm leading-6 text-white/68"
          >
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-violet-300" />
            {item}
          </li>
        ))}
      </ul>
    </article>
  );
}