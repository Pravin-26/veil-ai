import type { ReactNode } from "react";

export function Button({ children, onClick, secondary = false, disabled = false }: { children: ReactNode; onClick: () => void; secondary?: boolean; disabled?: boolean }) {
  return <button disabled={disabled} onClick={onClick} className={`rounded-full px-6 py-3.5 text-sm font-semibold transition ${secondary ? "border border-white/15 bg-white/5 text-white hover:bg-white/10" : "bg-gradient-to-r from-violet-400 to-fuchsia-300 text-[#170b27] shadow-[0_10px_35px_rgba(181,129,255,.25)] hover:brightness-110 disabled:opacity-50"}`}>{children}</button>;
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="text-[11px] font-semibold uppercase tracking-[.22em] text-violet-300">{children}</p>;
}
