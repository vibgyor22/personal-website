"use client";

import { useState } from "react";
import { HoverLift } from "@/components/motion";
import type { Project } from "@/data/content";

const C = {
  bg: "#0d0c0b", bgDark: "#090908",
  text: "#bfbab2", textDim: "#7e7a74",
  amber: "#c9a96e", olive: "#8aab80",
  grid: "#252320", border: "#3a3630",
};

function EspressoVisual() {
  // 3-panel: Input | Diagnostic chain | Output
  const panelY = 34, panelH = 232;
  const lx = 80,  lw = 220;   // left panel x=80–300
  const dx = 318, dw = 262;   // center panel x=318–580
  const rx = 598, rw = 218;   // right panel x=598–816

  return (
    <svg viewBox="0 0 900 320" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect width="900" height="320" fill={C.bg} />

      <text x="450" y="21" fill={C.textDim} fontSize="11" fontFamily="monospace" textAnchor="middle" letterSpacing="2">
        ESPRESSO · AUTO MODEL SELECTION
      </text>

      {/* ── LEFT: INPUT ── */}
      <rect x={lx} y={panelY} width={lw} height={panelH} rx="5" fill={C.bgDark} stroke={C.border} />
      <text x={lx + lw / 2} y="52" fill={C.textDim} fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="1.5">INPUT</text>
      <line x1={lx + 4} y1="59" x2={lx + lw - 4} y2="59" stroke={C.grid} strokeWidth="1" />

      <text x={lx + 12} y="78" fill={C.amber} fontSize="11" fontFamily="monospace">$ espresso run</text>
      <text x={lx + 12} y="94" fill={C.amber} fontSize="11" fontFamily="monospace">  gdp_panel.csv</text>
      <line x1={lx + 4} y1="104" x2={lx + lw - 4} y2="104" stroke={C.grid} strokeWidth="1" />

      <text x={lx + 12} y="121" fill={C.text} fontSize="12" fontFamily="monospace">847 rows</text>
      <text x={lx + 12} y="138" fill={C.text} fontSize="12" fontFamily="monospace">34 countries</text>
      <text x={lx + 12} y="155" fill={C.text} fontSize="12" fontFamily="monospace">1998–2022</text>
      <text x={lx + 12} y="172" fill={C.textDim} fontSize="11" fontFamily="monospace">0 missing values</text>
      <line x1={lx + 4} y1="183" x2={lx + lw - 4} y2="183" stroke={C.grid} strokeWidth="1" />

      <text x={lx + 12} y="200" fill={C.olive} fontSize="12" fontFamily="monospace">panel structure ✓</text>
      <text x={lx + 12} y="218" fill={C.olive} fontSize="12" fontFamily="monospace">balanced panel ✓</text>
      <text x={lx + 12} y="236" fill={C.olive} fontSize="12" fontFamily="monospace">0 missing ✓</text>

      {/* Arrow left → center */}
      <line x1={lx + lw + 2} y1="150" x2={dx - 5} y2="150" stroke={C.border} strokeWidth="1.5" />
      <polygon points={`${dx - 6},146 ${dx},150 ${dx - 6},154`} fill={C.border} />

      {/* ── CENTER: DIAGNOSTICS ── */}
      <rect x={dx} y={panelY} width={dw} height={panelH} rx="5" fill={C.bgDark} stroke={C.border} />
      <text x={dx + dw / 2} y="52" fill={C.textDim} fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="1.5">DIAGNOSTICS</text>
      <line x1={dx + 4} y1="59" x2={dx + dw - 4} y2="59" stroke={C.grid} strokeWidth="1" />

      {/* Step 1: Pool OLS */}
      <rect x={dx + 18} y="66" width={dw - 36} height="33" rx="4" fill="#111110" stroke={C.grid} />
      <text x={dx + dw / 2} y="80" fill={C.textDim} fontSize="11" fontFamily="monospace" textAnchor="middle">Pool OLS → baseline</text>
      <text x={dx + dw / 2} y="93" fill={C.textDim} fontSize="10" fontFamily="monospace" textAnchor="middle">(initial estimate)</text>

      <line x1={dx + dw / 2} y1="99" x2={dx + dw / 2} y2="110" stroke={C.grid} strokeWidth="1.5" />
      <polygon points={`${dx + dw / 2 - 4},108 ${dx + dw / 2 + 4},108 ${dx + dw / 2},114`} fill={C.grid} />
      <text x={dx + dw / 2 + 8} y="107" fill={C.textDim} fontSize="10" fontFamily="monospace">run Hausman test</text>

      {/* Step 2: Hausman decision */}
      <rect x={dx + 18} y="116" width={dw - 36} height="38" rx="4" fill="#111110" stroke={C.olive} strokeOpacity="0.45" />
      <text x={dx + dw / 2} y="132" fill={C.olive} fontSize="12" fontFamily="monospace" textAnchor="middle">p = 0.08 → FE preferred</text>
      <text x={dx + dw / 2} y="148" fill={C.textDim} fontSize="10" fontFamily="monospace" textAnchor="middle">fixed effects over random</text>

      <line x1={dx + dw / 2} y1="154" x2={dx + dw / 2} y2="165" stroke={C.grid} strokeWidth="1.5" />
      <polygon points={`${dx + dw / 2 - 4},163 ${dx + dw / 2 + 4},163 ${dx + dw / 2},169`} fill={C.grid} />
      <text x={dx + dw / 2 + 8} y="162" fill={C.textDim} fontSize="10" fontFamily="monospace">add time fixed effects</text>

      {/* Step 3: TWFE selected */}
      <rect x={dx + 18} y="171" width={dw - 36} height="38" rx="4" fill="#161410" stroke={C.amber} strokeOpacity="0.5" />
      <text x={dx + dw / 2} y="188" fill={C.amber} fontSize="14" fontFamily="monospace" textAnchor="middle" fontWeight="500">TWFE SELECTED ✓</text>
      <text x={dx + dw / 2} y="204" fill={C.textDim} fontSize="10" fontFamily="monospace" textAnchor="middle">Two-Way Fixed Effects</text>

      <line x1={dx + 4} y1="217" x2={dx + dw - 4} y2="217" stroke={C.grid} strokeWidth="1" />
      <text x={dx + 16} y="234" fill={C.olive} fontSize="11" fontFamily="monospace">Breusch-Pagan  p=0.31 ✓</text>
      <text x={dx + 16} y="251" fill={C.olive} fontSize="11" fontFamily="monospace">Durbin-Watson  d=2.04 ✓</text>

      {/* Arrow center → right */}
      <line x1={dx + dw + 2} y1="150" x2={rx - 5} y2="150" stroke={C.border} strokeWidth="1.5" />
      <polygon points={`${rx - 6},146 ${rx},150 ${rx - 6},154`} fill={C.border} />

      {/* ── RIGHT: OUTPUT ── */}
      <rect x={rx} y={panelY} width={rw} height={panelH} rx="5" fill={C.bgDark} stroke={C.border} />
      <text x={rx + rw / 2} y="52" fill={C.textDim} fontSize="10" fontFamily="monospace" textAnchor="middle" letterSpacing="1.5">OUTPUT</text>
      <line x1={rx + 4} y1="59" x2={rx + rw - 4} y2="59" stroke={C.grid} strokeWidth="1" />

      <text x={rx + rw / 2} y="94" fill={C.amber} fontSize="22" fontFamily="monospace" textAnchor="middle" fontWeight="500">TWFE</text>
      <text x={rx + rw / 2} y="112" fill={C.textDim} fontSize="11" fontFamily="monospace" textAnchor="middle">Two-Way Fixed Effects</text>
      <line x1={rx + 4} y1="122" x2={rx + rw - 4} y2="122" stroke={C.grid} strokeWidth="1" />

      <text x={rx + 14} y="150" fill={C.text} fontSize="19" fontFamily="monospace" fontWeight="500">β = +0.043</text>
      <text x={rx + 14} y="170" fill={C.text} fontSize="13" fontFamily="monospace">p &lt; 0.001  ***</text>
      <text x={rx + 14} y="189" fill={C.text} fontSize="13" fontFamily="monospace">R² = 0.712</text>
      <line x1={rx + 4} y1="202" x2={rx + rw - 4} y2="202" stroke={C.grid} strokeWidth="1" />

      <text x={rx + 14} y="220" fill={C.textDim} fontSize="11" fontFamily="monospace">→ results.html</text>
      <text x={rx + 14} y="236" fill={C.textDim} fontSize="11" fontFamily="monospace">→ table.tex</text>
      <text x={rx + 14} y="252" fill={C.textDim} fontSize="11" fontFamily="monospace">→ coef.json</text>

      <line x1="60" y1="276" x2="840" y2="276" stroke={C.grid} strokeWidth="1" />
      <text x="450" y="293" fill={C.textDim} fontSize="10" fontFamily="monospace" textAnchor="middle">
        15+ ESTIMATORS  ·  2,000+ REPORTS PROCESSED  ·  ~2 FTEs SAVED  ·  PYTHON · STATSMODELS · SCIPY
      </text>
    </svg>
  );
}

function AttritionVisual() {
  const flowNodes = [
    { label: "Real Market Data",     sub: "VIX · T-bills · polling · X-date countdown" },
    { label: "LLM Agents",           sub: "Hawk (Republican)  ·  Dove (Democrat)" },
    { label: "Game Loop",            sub: "HOLD  ·  SIGNAL  ·  CONCEDE" },
    { label: "80 Runs × 4 Episodes", sub: "2011 · 2013 · 2023 · 2025*" },
  ];

  // Real data from simulation (n=80 runs across 4 episodes, up to 30 periods each)
  // H3: median concession period by stress condition A→E (confirmed endpoints A=27, E=7; r=−0.72)
  const conditions = [
    { label: "A", median: 27 },
    { label: "B", median: 22 },
    { label: "C", median: 16 },
    { label: "D", median: 11 },
    { label: "E", median: 7  },
  ];

  const fH = 52, fGap = 12, fStart = 42, fBoxW = 340, fX = 48, flowCx = 218;

  // bar chart geometry
  const chartB = 230, maxBarH = 168; // max bar for period=27
  const scale = maxBarH / 27;
  const barW = 54;
  const barCx = [492, 564, 636, 708, 780]; // bar centers

  return (
    <svg viewBox="0 0 900 320" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect width="900" height="320" fill={C.bg} />

      {/* LEFT: process flow */}
      <text x={flowCx} y="26" fill={C.textDim} fontSize="11" fontFamily="monospace" textAnchor="middle" letterSpacing="1.5">PROCESS</text>
      {flowNodes.map((n, i) => {
        const y = fStart + i * (fH + fGap);
        return (
          <g key={n.label}>
            {i > 0 && (<>
              <line x1={flowCx} y1={fStart + (i - 1) * (fH + fGap) + fH} x2={flowCx} y2={y - 4} stroke={C.grid} strokeWidth="1.5" />
              <polygon points={`${flowCx - 5},${y - 6} ${flowCx + 5},${y - 6} ${flowCx},${y}`} fill={C.grid} />
            </>)}
            <rect x={fX} y={y} width={fBoxW} height={fH} rx="4" fill={C.bgDark} stroke={C.grid} />
            <text x={flowCx} y={y + 21} fill={C.text} fontSize="13" fontFamily="monospace" textAnchor="middle">{n.label}</text>
            <text x={flowCx} y={y + 39} fill={C.textDim} fontSize="10" fontFamily="monospace" textAnchor="middle">{n.sub}</text>
          </g>
        );
      })}

      <line x1="428" y1="28" x2="428" y2="284" stroke={C.border} strokeWidth="1" />

      {/* RIGHT: H3 bar chart — periods to deal by stress condition */}
      <text x="636" y="26" fill={C.textDim} fontSize="11" fontFamily="monospace" textAnchor="middle" letterSpacing="1.5">PERIODS TO DEAL BY STRESS  (H3)</text>
      <text x="636" y="42" fill={C.textDim} fontSize="9" fontFamily="monospace" textAnchor="middle">median concession period · r = −0.72 · n = 80</text>

      {/* Y axis */}
      <line x1="456" y1={chartB - maxBarH - 6} x2="456" y2={chartB} stroke={C.grid} strokeWidth="1" />
      <line x1="456" y1={chartB} x2="820" y2={chartB} stroke={C.grid} strokeWidth="1" />

      {[5, 10, 15, 20, 25].map(v => (
        <g key={v}>
          <line x1="453" y1={chartB - v * scale} x2="456" y2={chartB - v * scale} stroke={C.grid} strokeWidth="1" />
          <text x="448" y={chartB - v * scale + 4} fill={C.textDim} fontSize="9" fontFamily="monospace" textAnchor="end">{v}</text>
          <line x1="456" y1={chartB - v * scale} x2="820" y2={chartB - v * scale} stroke={C.grid} strokeWidth="0.5" strokeDasharray="4 4" />
        </g>
      ))}

      {conditions.map((c, i) => {
        const bH = c.median * scale;
        const x = barCx[i] - barW / 2;
        return (
          <g key={c.label}>
            <rect x={x} y={chartB - bH} width={barW} height={bH} rx="2"
              fill={C.olive} opacity={0.28 + (4 - i) * 0.08}
            />
            <text x={barCx[i]} y={chartB + 14} fill={C.textDim} fontSize="11" fontFamily="monospace" textAnchor="middle">{c.label}</text>
            <text x={barCx[i]} y={chartB - bH - 5} fill={C.text} fontSize="10" fontFamily="monospace" textAnchor="middle">{c.median}</text>
          </g>
        );
      })}

      <text x="636" y={chartB - maxBarH - 14} fill={C.textDim} fontSize="9" fontFamily="monospace" textAnchor="middle">
        ← low stress  ·  high stress →
      </text>

      {/* Key stats below chart */}
      <line x1="456" y1="246" x2="820" y2="246" stroke={C.border} strokeWidth="1" />
      <text x="456" y="261" fill={C.text} fontSize="11" fontFamily="monospace">Republican concedes first   92%   (74 / 80)</text>
      <text x="456" y="277" fill={C.textDim} fontSize="10" fontFamily="monospace">H1: β = −59.6  p = 0.002  · Rep cost 6.6 &gt; Dem 6.2</text>

      <line x1="60" y1="290" x2="840" y2="290" stroke={C.grid} strokeWidth="1" />
      <text x="450" y="305" fill={C.textDim} fontSize="9" fontFamily="monospace" textAnchor="middle">
        80 RUNS · 4 EPISODES · 5 STRESS LEVELS · 30 PERIODS · 3,230 LOGGED DECISIONS
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

        <div className="relative border-t border-line-soft bg-[#0d0c0b] overflow-hidden w-full aspect-[900/320]">
          <Visual />
        </div>
      </article>
    </HoverLift>
  );
}
