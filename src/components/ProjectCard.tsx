"use client";

import { useState } from "react";
import { HoverLift } from "@/components/motion";
import type { Project } from "@/data/content";

const C = {
  bg: "#0d0c0b", bgDark: "#090908",
  text: "#8a8580", textDim: "#565250",
  amber: "#c9a96e", olive: "#8aab80",
  grid: "#1e1d1b", border: "#2e2b27",
};

// Full-width landscape charts (viewBox 900×320), content in x=80–820 for mobile safety.
// preserveAspectRatio="xMidYMid meet" fills the container, only far edges cropped on small screens.

function EspressoVisual() {
  const [hov, setHov] = useState<number | null>(null);
  const stages = [
    { label: "load",     sub: "CSV + question" },
    { label: "profile",  sub: "types · missing · outliers" },
    { label: "select",   sub: "15+ estimators" },
    { label: "estimate", sub: "statsmodels · scipy" },
    { label: "export",   sub: "HTML · LaTeX · JSON" },
  ];
  const cx = [130, 258, 386, 514, 642];

  return (
    <svg viewBox="0 0 900 320" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect width="900" height="320" fill={C.bg} />

      <text x="450" y="22" fill={C.textDim} fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="2">
        HOW ESPRESSO WORKS
      </text>

      {/* horizontal pipeline */}
      {stages.map((s, i) => {
        const x = cx[i], isH = hov === i, isLast = i === stages.length - 1;
        return (
          <g key={s.label}>
            {i > 0 && (
              <>
                <line x1={cx[i - 1] + 56} y1="72" x2={x - 56} y2="72" stroke={C.grid} strokeWidth="1.5" />
                <polygon points={`${x - 58},68 ${x - 52},72 ${x - 58},76`} fill={C.grid} />
              </>
            )}
            <rect x={x - 56} y="48" width="112" height="48" rx="5"
              fill={isH ? "#111010" : C.bgDark}
              stroke={isLast ? C.amber : isH ? C.border : C.grid}
              strokeOpacity={isLast ? 0.55 : 1}
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ cursor: "default" }}
            />
            <text x={x} y="70" fill={isLast ? C.amber : isH ? "#d4cfc8" : "#9c9790"} fontSize="11" fontFamily="monospace" textAnchor="middle" style={{ pointerEvents: "none" }}>{s.label}</text>
            <text x={x} y="86" fill={isH ? C.text : C.textDim} fontSize="8.5" fontFamily="monospace" textAnchor="middle" style={{ pointerEvents: "none" }}>{s.sub}</text>
          </g>
        );
      })}

      {/* terminal block */}
      <rect x="80" y="114" width="660" height="152" rx="5" fill={C.bgDark} stroke={C.border} />
      <circle cx="98" cy="127" r="4" fill={C.grid} />
      <circle cx="114" cy="127" r="4" fill={C.grid} />
      <circle cx="130" cy="127" r="4" fill={C.grid} />

      <text x="96" y="148" fill={C.textDim} fontSize="9" fontFamily="monospace">$ espresso run gdp_panel.csv</text>
      <text x="96" y="164" fill={C.textDim} fontSize="8.5" fontFamily="monospace">↳  847 rows · 34 countries · 1998–2022 · 0 missing</text>
      <text x="96" y="181" fill={C.amber} fontSize="9.5" fontFamily="monospace">◈  Panel OLS · TWFE selected</text>
      <text x="96" y="200" fill="#d4cfc8" fontSize="13" fontFamily="monospace" fontWeight="500">β = +0.043     p &lt; 0.001     R² = 0.712</text>
      <text x="96" y="218" fill={C.textDim} fontSize="8.5" fontFamily="monospace">Hausman p=0.08 ✓   Breusch–Pagan p=0.31 ✓   Durbin–Watson d=2.04 ✓</text>
      <text x="96" y="235" fill={C.textDim} fontSize="8.5" fontFamily="monospace">→  results.html   ·   table.tex   ·   coef.json</text>
      <rect x="294" y="226" width="6" height="11" fill={C.textDim} opacity="0.8" />

      {/* right panel: estimator list */}
      <line x1="762" y1="114" x2="762" y2="266" stroke={C.border} strokeWidth="1" />
      <text x="782" y="130" fill={C.textDim} fontSize="9" fontFamily="monospace" letterSpacing="1.5">MODELS</text>
      {[
        { n: "OLS / WLS / GLS",  w: 78 },
        { n: "DiD · TWFE",       w: 62 },
        { n: "Panel FE / RE",    w: 68 },
        { n: "IV / 2SLS",        w: 48 },
        { n: "ARIMA / SARIMA",   w: 58 },
        { n: "Quantile Reg.",    w: 54 },
        { n: "VAR · Granger",    w: 46 },
      ].map((e, i) => (
        <g key={e.n}>
          <rect x="782" y={142 + i * 18} width={e.w} height="12" rx="2" fill={C.olive} opacity="0.18" />
          <text x="782" y={152 + i * 18} fill={C.textDim} fontSize="8" fontFamily="monospace">{e.n}</text>
        </g>
      ))}

      {/* footer */}
      <line x1="60" y1="280" x2="840" y2="280" stroke={C.grid} strokeWidth="1" />
      <text x="450" y="296" fill={C.textDim} fontSize="8" fontFamily="monospace" textAnchor="middle">
        15+ ESTIMATORS  ·  2,000+ REPORTS PROCESSED  ·  ~2 FTEs SAVED  ·  PYTHON · STATSMODELS · SCIPY · HOVER STAGES
      </text>
    </svg>
  );
}

function AttritionVisual() {
  const [hovEp, setHovEp] = useState<number | null>(null);

  const flowNodes = [
    { label: "Real Market Data",     sub: "VIX · T-bills · polling · X-date countdown" },
    { label: "LLM Agents",           sub: "Hawk (Republican)  ·  Dove (Democrat)" },
    { label: "Game Loop",            sub: "HOLD  ·  SIGNAL FLEXIBILITY  ·  CONCEDE" },
    { label: "80 Runs × 4 Episodes", sub: "2011 · 2013 · 2023 · 2025 (counterfactual)" },
  ];

  const scale = 310 / 142;
  const eps = [
    { y: "2011",  d: 78,  v: "48",  w: Math.round(78  * scale), col: C.olive, op: 0.55, out: "Budget Control Act" },
    { y: "2013",  d: 21,  v: "22",  w: Math.round(21  * scale), col: C.olive, op: 0.35, out: "Continuing Resolution" },
    { y: "2023",  d: 98,  v: "31",  w: Math.round(98  * scale), col: C.olive, op: 0.65, out: "Fiscal Responsibility Act" },
    { y: "2025*", d: 142, v: "55+", w: 310,                      col: C.amber, op: 0.2,  out: "Default (simulated)" },
  ];
  const fH = 52, fGap = 12, fStart = 42, fBoxW = 340, fX = 48, cx = 218;
  const barX = 520, barH = 32, barGap = 18;

  return (
    <svg viewBox="0 0 900 320" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect width="900" height="320" fill={C.bg} />

      {/* left: process flow */}
      <text x={cx} y="26" fill={C.textDim} fontSize="9.5" fontFamily="monospace" textAnchor="middle" letterSpacing="1.5">PROCESS</text>

      {flowNodes.map((n, i) => {
        const y = fStart + i * (fH + fGap);
        return (
          <g key={n.label}>
            {i > 0 && (
              <>
                <line x1={cx} y1={fStart + (i - 1) * (fH + fGap) + fH} x2={cx} y2={y - 4} stroke={C.grid} strokeWidth="1.5" />
                <polygon points={`${cx - 5},${y - 6} ${cx + 5},${y - 6} ${cx},${y}`} fill={C.grid} />
              </>
            )}
            <rect x={fX} y={y} width={fBoxW} height={fH} rx="4" fill={C.bgDark} stroke={C.grid} />
            <text x={cx} y={y + 20} fill="#a09890" fontSize="11" fontFamily="monospace" textAnchor="middle">{n.label}</text>
            <text x={cx} y={y + 38} fill={C.textDim} fontSize="8.5" fontFamily="monospace" textAnchor="middle">{n.sub}</text>
          </g>
        );
      })}

      {/* divider */}
      <line x1="428" y1="28" x2="428" y2="280" stroke={C.border} strokeWidth="1" />

      {/* right: results */}
      <text x="660" y="26" fill={C.textDim} fontSize="9.5" fontFamily="monospace" textAnchor="middle" letterSpacing="1.5">CONCESSION DELAY BY EPISODE</text>

      <line x1={barX} y1="38" x2={barX} y2="268" stroke={C.grid} strokeWidth="1" />

      {eps.map((ep, i) => {
        const y = 42 + i * (barH + barGap);
        const isH = hovEp === i;
        return (
          <g key={ep.y}>
            <text x={barX - 8} y={y + 20} fill={isH ? C.text : C.textDim} fontSize="9" fontFamily="monospace" textAnchor="end">{ep.y}</text>
            <rect x={barX} y={y} width={ep.w} height={barH} rx="2"
              fill={ep.col} opacity={isH ? Math.min(ep.op * 1.9, 0.9) : ep.op}
              onMouseEnter={() => setHovEp(i)} onMouseLeave={() => setHovEp(null)}
              style={{ cursor: "default", transition: "opacity 0.2s" }}
            />
            {ep.y === "2025*" && (
              <line x1={barX + ep.w} y1={y + 16} x2={barX + ep.w + 18} y2={y + 16} stroke={C.amber} strokeWidth="1" strokeDasharray="3 2" opacity="0.35" />
            )}
            <text x={barX + ep.w + (ep.y === "2025*" ? 24 : 8)} y={y + 20} fill={isH ? C.text : C.textDim} fontSize="9" fontFamily="monospace">
              {ep.d}d · VIX {ep.v}
            </text>
            {isH && <text x={barX} y={y - 3} fill={C.text} fontSize="8" fontFamily="monospace">{ep.out}</text>}
          </g>
        );
      })}

      <line x1="60" y1="280" x2="840" y2="280" stroke={C.grid} strokeWidth="1" />
      <text x="450" y="296" fill={C.textDim} fontSize="8" fontFamily="monospace" textAnchor="middle">
        80 SIMULATION RUNS  ·  ALESINA–DRAZEN (1991)  ·  REAL VIX / T-BILL / POLLING DATA  ·  COX HAZARD + OLS
      </text>
    </svg>
  );
}

const visuals: Record<string, () => React.JSX.Element> = {
  espresso: EspressoVisual,
  attrition: AttritionVisual,
};

export function ProjectCard({ project }: { project: Project }) {
  const Visual = visuals[project.theme] ?? EspressoVisual;

  return (
    <HoverLift>
      <article className="overflow-hidden rounded-xl border border-line bg-bg-elevated">
        <div className="p-6 md:p-8">
          <h3 className="font-serif text-2xl text-text">{project.title}</h3>

          <div className="mt-4 flex flex-wrap gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer"
                className="rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-accent transition-colors hover:bg-accent/20">
                View on GitHub →
              </a>
            )}
            {project.site && (
              <a href={project.site} target="_blank" rel="noreferrer"
                className="rounded-full border border-line px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-text-muted transition-colors hover:border-accent/40 hover:text-accent">
                Live site →
              </a>
            )}
          </div>

          <p className="mt-5 font-serif text-[1.02rem] leading-relaxed text-text-muted">{project.summary}</p>

          <ul className="mt-5 space-y-3">
            {project.bullets.map((b) => (
              <li key={b} className="font-serif text-[0.95rem] leading-relaxed text-text-muted">
                <span className="mr-2 text-text-faint">—</span>{b}
              </li>
            ))}
          </ul>

          {project.stats && (
            <div className="mt-6 flex flex-wrap gap-3">
              {project.stats.map((s) => (
                <div key={s.label} className="rounded-lg border border-line-soft bg-surface px-3 py-2">
                  <p className="font-mono text-[0.6rem] uppercase tracking-[0.1em] text-text-faint">{s.label}</p>
                  <p className="mt-0.5 font-mono text-sm text-text">{s.value}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* full-width chart panel — height tracks aspect ratio 900:320 so meet has no letterbox */}
        <div className="relative border-t border-line-soft bg-[#0d0c0b] overflow-hidden h-48 sm:h-56 md:h-72 lg:h-96 xl:h-[440px]">
          <Visual />
        </div>
      </article>
    </HoverLift>
  );
}
