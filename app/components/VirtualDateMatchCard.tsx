"use client";

import { useState } from "react";
import Image from "next/image";
import { match } from "../mock-data";
import { Button, Eyebrow } from "./VeilUI";

type MatchStage = "matched" | "dateScheduled" | "reportReady";

type Props = {
  onStartDate?: () => void;
};

export default function VirtualDateMatchCard({ onStartDate }: Props) {
  const [stage, setStage] = useState<MatchStage>("matched");
  const startDate = () => {
    if (onStartDate) {
      onStartDate();
      return;
    }
    setStage("reportReady");
  };

  return <div className="mx-auto max-w-3xl">
    <div className="text-center">
      <Eyebrow>Veil match</Eyebrow>
      <h2 className="mt-4 font-serif text-5xl sm:text-6xl">You matched with<br /><em className="font-normal text-violet-300">someone new.</em></h2>
      <p className="mx-auto mt-5 max-w-xl text-white/60">Your stated preferences suggest there may be enough alignment to explore a conversation.</p>
    </div>
    <section className="mt-10 overflow-hidden rounded-[2rem] border border-white/12 bg-white/[.055] shadow-2xl">
      <div className="grid md:grid-cols-[240px_1fr]">
        <div className="relative min-h-72 bg-gradient-to-br from-violet-300/30 to-fuchsia-300/20">
          <Image src={match.avatar} alt={`${match.name} profile`} fill sizes="(min-width: 768px) 240px, 100vw" className="object-cover mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0715] via-transparent to-transparent" />
          <div className="absolute bottom-5 left-5"><h3 className="font-serif text-3xl">{match.name}, {match.age}</h3><p className="mt-1 text-sm text-white/70">{match.city}</p></div>
        </div>
        <div className="p-6 sm:p-8"><Eyebrow>Shared interests</Eyebrow>
          <div className="mt-4 flex flex-wrap gap-2">{match.shared.map((interest) => <span key={interest} className="rounded-full border border-white/10 bg-white/[.06] px-3 py-2 text-xs text-white/80">{interest}</span>)}</div>
          {stage === "matched" && <div className="mt-8"><div className="rounded-2xl border border-violet-400/20 bg-violet-400/10 p-5"><p className="text-sm text-violet-200">Your Veils are ready to meet.</p><h4 className="mt-2 font-serif text-2xl">Schedule a virtual date</h4><p className="mt-2 text-sm leading-6 text-white/60">Your profile-based AI personas will have a short simulated conversation using only the preferences both users shared.</p></div><div className="mt-5"><Button onClick={() => setStage("dateScheduled")}>Schedule Virtual Date <span className="ml-2">→</span></Button></div></div>}
          {stage === "dateScheduled" && <div className="mt-8"><div className="rounded-2xl border border-white/10 bg-white/[.04] p-5"><Eyebrow>Virtual date scheduled</Eyebrow><p className="mt-3 font-serif text-3xl">{match.dateTime}</p><p className="mt-3 text-sm leading-6 text-white/60">When it&apos;s complete, you&apos;ll receive an in-app notification that your Virtual Date Report is ready.</p></div><div className="mt-5"><Button onClick={startDate}>Begin AI Virtual Date <span className="ml-2">→</span></Button></div></div>}
          {stage === "reportReady" && <div className="mt-8 rounded-2xl border border-emerald-300/25 bg-emerald-300/10 p-5" role="status"><p className="text-sm font-semibold text-emerald-100">✦ Virtual Date Report ready</p><p className="mt-2 text-sm leading-6 text-white/65">Your Veils found meaningful alignment. Continue the full Veil journey from the home screen to view the conversation and report.</p></div>}
        </div>
      </div>
    </section>
  </div>;
}
