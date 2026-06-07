"use client";

import { useState } from "react";
import { HoverLift } from "@/components/motion";
import type { ResearchItem } from "@/data/content";

const C = {
  bg: "#0d0c0b", bgDark: "#090908",
  text: "#bfbab2", textDim: "#7e7a74",
  amber: "#c9a96e", olive: "#8aab80",
  grid: "#252320", border: "#3a3630",
};

function CalorieChart() {
  const [hov, setHov] = useState<number | null>(null);

  const data = [
    { cls: "I",    v: 81 }, { cls: "II",   v: 85 }, { cls: "III",  v: 83 },
    { cls: "IV",   v: 89 }, { cls: "V",    v: 86 }, { cls: "VI",   v: 91 },
    { cls: "VII",  v: 88 }, { cls: "VIII", v: 93 }, { cls: "IX",   v: 90 },
    { cls: "X",    v: 94 }, { cls: "XI",   v: 95 },
  ];

  const cL = 88, cR = 520, cB = 258, cT = 50;
  const h = cB - cT;
  const pitch = (cR - cL) / data.length;
  const barW = pitch * 0.62;
  const toY = (v: number) => cB - ((v - 70) / 30) * h;
  const adequateY = toY(90);

  return (
    <svg viewBox="0 0 900 320" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect width="900" height="320" fill={C.bg} />

      <text x="300" y="24" fill={C.textDim} fontSize="12" fontFamily="monospace" textAnchor="middle" letterSpacing="1.5">
        CALORIE ADEQUACY BY INCOME CLASS
      </text>
      <text x="300" y="40" fill={C.textDim} fontSize="10" fontFamily="monospace" textAnchor="middle">
        hover each bar · rural India · NSSO household survey
      </text>

      {/* axes */}
      <line x1={cL} y1={cT} x2={cL} y2={cB} stroke={C.grid} strokeWidth="1" />
      <line x1={cL} y1={cB} x2={cR} y2={cB} stroke={C.grid} strokeWidth="1" />

      {[75, 80, 85, 90, 95, 100].map((v) => (
        <g key={v}>
          <line x1={cL - 5} y1={toY(v)} x2={cL} y2={toY(v)} stroke={C.grid} strokeWidth="1" />
          <text x={cL - 9} y={toY(v) + 4} fill={C.textDim} fontSize="11" fontFamily="monospace" textAnchor="end">{v}</text>
          <line x1={cL} y1={toY(v)} x2={cR} y2={toY(v)} stroke={C.grid} strokeWidth="0.5" strokeDasharray="4 4" />
        </g>
      ))}

      {/* adequacy threshold — label on left side to avoid overlap with stats box */}
      <line x1={cL} y1={adequateY} x2={cR} y2={adequateY} stroke={C.olive} strokeWidth="1.5" strokeDasharray="8 4" opacity="0.7" />
      <text x={cL + 8} y={adequateY - 7} fill={C.olive} fontSize="11" fontFamily="monospace">90% adequacy threshold</text>

      {/* bars */}
      {data.map((d, i) => {
        const x = cL + i * pitch + pitch * 0.19;
        const barH = ((d.v - 70) / 30) * h;
        const y = cB - barH;
        const isH = hov === i;
        return (
          <g key={d.cls}>
            <rect x={x} y={y} width={barW} height={barH} rx="2"
              fill={C.amber} opacity={isH ? 0.9 : 0.30 + i * 0.04}
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ cursor: "default", transition: "opacity 0.15s" }}
            />
            <text x={x + barW / 2} y={cB + 15} fill={isH ? C.text : C.textDim} fontSize="11" fontFamily="monospace" textAnchor="middle" style={{ pointerEvents: "none" }}>{d.cls}</text>
            {isH && (
              <g style={{ pointerEvents: "none" }}>
                <rect x={x + barW / 2 - 22} y={y - 28} width="44" height="22" rx="3" fill={C.bgDark} stroke={C.border} />
                <text x={x + barW / 2} y={y - 12} fill={C.amber} fontSize="13" fontFamily="monospace" textAnchor="middle">{d.v}%</text>
              </g>
            )}
          </g>
        );
      })}

      {/* correlation stat box */}
      <rect x="548" y="46" width="262" height="172" rx="6" fill={C.bgDark} stroke={C.border} />
      <text x="679" y="72" fill={C.textDim} fontSize="11" fontFamily="monospace" textAnchor="middle">PEARSON CORRELATION</text>
      <text x="638" y="134" fill={C.amber} fontSize="52" fontFamily="monospace" textAnchor="middle" fontWeight="500">0.21</text>
      <text x="679" y="162" fill={C.text} fontSize="12" fontFamily="monospace" textAnchor="middle">income ≠ food security</text>
      <text x="679" y="178" fill={C.textDim} fontSize="11" fontFamily="monospace" textAnchor="middle">only 4% of variance explained</text>
      <text x="679" y="194" fill={C.textDim} fontSize="11" fontFamily="monospace" textAnchor="middle">by income level alone</text>

      <line x1="60" y1="278" x2="840" y2="278" stroke={C.grid} strokeWidth="1" />
      <text x="450" y="296" fill={C.textDim} fontSize="10" fontFamily="monospace" textAnchor="middle">
        11 INCOME CLASSES · NSSO HOUSEHOLD SURVEY · RURAL INDIA · SRCC ECONOMICS JOURNAL 2022
      </text>
    </svg>
  );
}

function DemocracyChart() {
  const [hov, setHov] = useState<number | null>(null);

  const pts = [
    { d: 1.8, c: 9.2, n: "Saudi Arabia" }, { d: 2.3, c: 7.5, n: "Russia" },
    { d: 2.5, c: 8.9, n: "UAE" },          { d: 3.0, c: 7.0, n: "Egypt" },
    { d: 3.5, c: 6.2, n: "China" },        { d: 4.0, c: 5.8, n: "Indonesia" },
    { d: 4.5, c: 6.4, n: "Turkey" },       { d: 5.0, c: 5.1, n: "Brazil" },
    { d: 5.5, c: 4.7, n: "Argentina" },    { d: 6.0, c: 5.0, n: "S. Africa" },
    { d: 6.5, c: 4.2, n: "India" },        { d: 7.0, c: 3.9, n: "Mexico" },
    { d: 7.5, c: 4.3, n: "France" },       { d: 8.0, c: 3.5, n: "UK" },
    { d: 8.5, c: 3.7, n: "Japan" },        { d: 9.0, c: 3.1, n: "Germany" },
    { d: 9.5, c: 2.8, n: "Sweden" },       { d: 9.8, c: 2.5, n: "Norway" },
  ];

  const cL = 88, cR = 600, cB = 258, cT = 50;
  const toX = (d: number) => cL + ((d - 1) / 9) * (cR - cL);
  const toY = (c: number) => cB - (c / 12) * (cB - cT);
  const ry1 = toY(7.046), ry2 = toY(2.96);

  return (
    <svg viewBox="0 0 900 320" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect width="900" height="320" fill={C.bg} />

      <text x="344" y="24" fill={C.textDim} fontSize="12" fontFamily="monospace" textAnchor="middle" letterSpacing="1.5">
        CO₂ PER CAPITA vs DEMOCRACY INDEX
      </text>
      <text x="344" y="40" fill={C.textDim} fontSize="10" fontFamily="monospace" textAnchor="middle">
        hover data points for countries · ~160 nation-states
      </text>

      {/* CI shading */}
      <polygon
        points={`${cL},${ry1 - 24} ${cR},${ry2 - 10} ${cR},${ry2 + 10} ${cL},${ry1 + 24}`}
        fill={C.olive} opacity="0.08"
      />

      {/* axes */}
      <line x1={cL} y1={cB} x2={cR} y2={cB} stroke={C.grid} strokeWidth="1" />
      <line x1={cL} y1={cT} x2={cL} y2={cB} stroke={C.grid} strokeWidth="1" />

      {[2, 4, 6, 8, 10].map((v) => (
        <g key={v}>
          <line x1={toX(v)} y1={cB} x2={toX(v)} y2={cB + 5} stroke={C.grid} strokeWidth="1" />
          <text x={toX(v)} y={cB + 17} fill={C.textDim} fontSize="11" fontFamily="monospace" textAnchor="middle">{v}</text>
          <line x1={toX(v)} y1={cT} x2={toX(v)} y2={cB} stroke={C.grid} strokeWidth="0.5" strokeDasharray="4 4" />
        </g>
      ))}
      {[2, 4, 6, 8].map((v) => (
        <g key={v}>
          <line x1={cL - 5} y1={toY(v)} x2={cL} y2={toY(v)} stroke={C.grid} strokeWidth="1" />
          <text x={cL - 9} y={toY(v) + 4} fill={C.textDim} fontSize="11" fontFamily="monospace" textAnchor="end">{v}t</text>
        </g>
      ))}
      <text x="344" y={cB + 32} fill={C.textDim} fontSize="11" fontFamily="monospace" textAnchor="middle">EIU Democracy Index →</text>

      {/* regression line */}
      <line x1={cL} y1={ry1} x2={cR} y2={ry2} stroke={C.olive} strokeWidth="2" opacity="0.8" />

      {/* scatter */}
      {pts.map((p, i) => {
        const px = toX(p.d), py = toY(p.c), isH = hov === i;
        const tipLeft = px > 460;
        return (
          <g key={i}>
            <circle cx={px} cy={py} r={isH ? 8 : 6}
              fill={C.amber} opacity={hov === null ? 0.75 : isH ? 1 : 0.2}
              stroke={C.bg} strokeWidth="0.8"
              onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}
              style={{ cursor: "crosshair", transition: "r 0.12s, opacity 0.12s" }}
            />
            {isH && (
              <g style={{ pointerEvents: "none" }}>
                <rect x={tipLeft ? px - 130 : px + 10} y={py - 36} width={120} height={36} rx="3" fill={C.bgDark} stroke={C.border} />
                <text x={tipLeft ? px - 70 : px + 70} y={py - 20} fill={C.amber} fontSize="11" fontFamily="monospace" textAnchor="middle">{p.n}</text>
                <text x={tipLeft ? px - 70 : px + 70} y={py - 6}  fill={C.text} fontSize="10" fontFamily="monospace" textAnchor="middle">idx {p.d} · {p.c}t CO₂</text>
              </g>
            )}
          </g>
        );
      })}

      {/* results box */}
      <rect x="618" y="46" width="218" height="144" rx="6" fill={C.bgDark} stroke={C.border} />
      <text x="727" y="70" fill={C.textDim} fontSize="11" fontFamily="monospace" textAnchor="middle">OLS RESULTS</text>
      <line x1="624" y1="76" x2="830" y2="76" stroke={C.grid} strokeWidth="1" />
      <text x="632" y="97" fill={C.text} fontSize="12" fontFamily="monospace">democracy_idx</text>
      <text x="828" y="97" fill={C.amber} fontSize="14" fontFamily="monospace" textAnchor="end">−0.454 **</text>
      <text x="632" y="118" fill={C.text} fontSize="12" fontFamily="monospace">R² = 0.664</text>
      <text x="828" y="118" fill={C.text} fontSize="12" fontFamily="monospace" textAnchor="end">n ≈ 160</text>
      <line x1="624" y1="126" x2="830" y2="126" stroke={C.grid} strokeWidth="1" />
      <text x="632" y="144" fill={C.textDim} fontSize="11" fontFamily="monospace">sig. 5% · clean diagnostics</text>
      <text x="632" y="160" fill={C.textDim} fontSize="11" fontFamily="monospace">World Bank + EIU data</text>
      <text x="632" y="176" fill={C.textDim} fontSize="11" fontFamily="monospace">higher dem → lower CO₂</text>

      <line x1="60" y1="292" x2="840" y2="292" stroke={C.grid} strokeWidth="1" />
      <text x="450" y="308" fill={C.textDim} fontSize="10" fontFamily="monospace" textAnchor="middle">
        WORLD BANK CO₂ DATA · EIU DEMOCRACY INDEX · OLS REGRESSION · ALL DIAGNOSTICS CLEAN · 2023
      </text>
    </svg>
  );
}

function InterstellarChart() {
  const [hovT, setHovT] = useState<number | null>(null);

  const ts = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
  const pA = [100, 103, 97, 108, 102, 112, 106, 115, 109, 117, 113];
  const pB = [100, 101, 98, 104, 100, 107, 102, 108, 104, 110, 106];

  const cL = 88, cR = 572, cB = 255, cT = 50;
  const toX = (t: number) => cL + (t / 100) * (cR - cL);
  const toY = (p: number) => cB - ((p - 96) / 22) * (cB - cT);

  const pathA = ts.map((t, i) => `${i === 0 ? "M" : "L"}${toX(t)},${toY(pA[i])}`).join(" ");
  const pathB = ts.map((t, i) => `${i === 0 ? "M" : "L"}${toX(t)},${toY(pB[i])}`).join(" ");
  const gapD = ts.map((t, i) => `${i === 0 ? "M" : "L"}${toX(t)},${toY(pA[i])}`).join(" ")
    + " " + [...ts].reverse().map((t, i) => `L${toX(t)},${toY(pB[ts.length - 1 - i])}`).join(" ") + " Z";

  return (
    <svg viewBox="0 0 900 320" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      <rect width="900" height="320" fill={C.bg} />

      <text x="330" y="24" fill={C.textDim} fontSize="12" fontFamily="monospace" textAnchor="middle" letterSpacing="1.5">
        PRICE DIVERGENCE UNDER INFORMATION DELAY
      </text>
      <text x="330" y="40" fill={C.textDim} fontSize="10" fontFamily="monospace" textAnchor="middle">
        hover to inspect the gap · both assets identical · info delay creates persistent price dispersion
      </text>

      {/* axes */}
      <line x1={cL} y1={cT} x2={cL} y2={cB} stroke={C.grid} strokeWidth="1" />
      <line x1={cL} y1={cB} x2={cR} y2={cB} stroke={C.grid} strokeWidth="1" />

      {[98, 100, 102, 104, 106, 108, 110, 112, 114].map((v) => (
        <g key={v}>
          <line x1={cL - 5} y1={toY(v)} x2={cL} y2={toY(v)} stroke={C.grid} strokeWidth="1" />
          <text x={cL - 9} y={toY(v) + 4} fill={C.textDim} fontSize="11" fontFamily="monospace" textAnchor="end">{v}</text>
          <line x1={cL} y1={toY(v)} x2={cR} y2={toY(v)} stroke={C.grid} strokeWidth="0.5" strokeDasharray="4 4" />
        </g>
      ))}
      {[0, 25, 50, 75, 100].map((t) => (
        <g key={t}>
          <line x1={toX(t)} y1={cB} x2={toX(t)} y2={cB + 5} stroke={C.grid} strokeWidth="1" />
          <text x={toX(t)} y={cB + 18} fill={C.textDim} fontSize="11" fontFamily="monospace" textAnchor="middle">t={t}</text>
        </g>
      ))}

      <path d={gapD} fill={C.olive} opacity="0.14" />
      <path d={pathA} fill="none" stroke={C.amber} strokeWidth="2.5" opacity="0.9" />
      <path d={pathB} fill="none" stroke={C.olive} strokeWidth="2.5" opacity="0.72" />

      {ts.map((t, i) => (
        <rect key={i} x={toX(t) - 26} y={cT} width="52" height={cB - cT}
          fill="transparent" onMouseEnter={() => setHovT(i)} onMouseLeave={() => setHovT(null)} style={{ cursor: "crosshair" }} />
      ))}

      {hovT !== null && (
        <g style={{ pointerEvents: "none" }}>
          <line x1={toX(ts[hovT])} y1={cT} x2={toX(ts[hovT])} y2={cB} stroke={C.border} strokeWidth="1.5" strokeDasharray="5 3" />
          <circle cx={toX(ts[hovT])} cy={toY(pA[hovT])} r="6" fill={C.amber} stroke={C.bg} strokeWidth="1.5" />
          <circle cx={toX(ts[hovT])} cy={toY(pB[hovT])} r="6" fill={C.olive} stroke={C.bg} strokeWidth="1.5" />
          <rect
            x={toX(ts[hovT]) > 440 ? toX(ts[hovT]) - 136 : toX(ts[hovT]) + 10}
            y={toY(pA[hovT]) - 44} width="126" height="42" rx="3"
            fill={C.bgDark} stroke={C.border}
          />
          <text x={toX(ts[hovT]) > 440 ? toX(ts[hovT]) - 73 : toX(ts[hovT]) + 73} y={toY(pA[hovT]) - 27} fill={C.amber} fontSize="12" fontFamily="monospace" textAnchor="middle">A: {pA[hovT]}</text>
          <text x={toX(ts[hovT]) > 440 ? toX(ts[hovT]) - 73 : toX(ts[hovT]) + 73} y={toY(pA[hovT]) - 10} fill={C.olive} fontSize="12" fontFamily="monospace" textAnchor="middle">B: {pB[hovT]}  Δ={pA[hovT] - pB[hovT]}</text>
        </g>
      )}

      {/* legend — positioned in the right panel x=592–820 */}
      <line x1="592" y1="66" x2="618" y2="66" stroke={C.amber} strokeWidth="2.5" />
      <text x="626" y="71" fill={C.text} fontSize="12" fontFamily="monospace">Market A (instant info)</text>
      <line x1="592" y1="88" x2="618" y2="88" stroke={C.olive} strokeWidth="2.5" />
      <text x="626" y="93" fill={C.text} fontSize="12" fontFamily="monospace">Market B (delayed info)</text>

      {/* key findings box */}
      <rect x="592" y="110" width="208" height="136" rx="5" fill={C.bgDark} stroke={C.border} />
      <text x="696" y="132" fill={C.textDim} fontSize="11" fontFamily="monospace" textAnchor="middle">KEY FINDINGS</text>
      <line x1="598" y1="138" x2="794" y2="138" stroke={C.grid} strokeWidth="1" />
      <text x="608" y="157" fill={C.text} fontSize="12" fontFamily="monospace">Gap persists at equilibrium</text>
      <text x="608" y="176" fill={C.text} fontSize="12" fontFamily="monospace">Info lag → priced risk factor</text>
      <text x="608" y="195" fill={C.text} fontSize="12" fontFamily="monospace">Volatility-driven premium</text>
      <text x="608" y="214" fill={C.textDim} fontSize="10" fontFamily="monospace">Cointegration · SSRN 2024</text>
      <text x="608" y="230" fill={C.textDim} fontSize="10" fontFamily="monospace">hover to see gap</text>

      <line x1="60" y1="278" x2="840" y2="278" stroke={C.grid} strokeWidth="1" />
      <text x="450" y="296" fill={C.textDim} fontSize="10" fontFamily="monospace" textAnchor="middle">
        THEORETICAL ASSET PRICING MODEL · COINTEGRATION TESTS · VOLATILITY-DRIVEN RISK PREMIUM · SSRN 2024
      </text>
    </svg>
  );
}

const charts: Record<string, () => React.JSX.Element> = {
  calorie: CalorieChart,
  "democracy-regression": DemocracyChart,
  interstellar: InterstellarChart,
};

export function ResearchCard({ paper }: { paper: ResearchItem }) {
  const Chart = charts[paper.visual];

  return (
    <HoverLift>
      <article className="overflow-hidden rounded-xl border border-line bg-bg-elevated">
        <div className="p-6 lg:p-8">
          <h3 className="font-serif text-xl text-text">
            {paper.link ? (
              <a href={paper.link} target="_blank" rel="noreferrer" className="link-quiet">{paper.title}</a>
            ) : paper.title}
          </h3>
          <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-text-faint">
            {paper.journal} · {paper.year}
          </p>

          <p className="mt-5 font-serif text-[1.05rem] leading-relaxed text-text">{paper.intro}</p>

          <div className="mt-5 space-y-3">
            {paper.story.map((para, i) => (
              <p key={i} className="font-serif text-[0.98rem] leading-relaxed text-text-muted">{para}</p>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            {paper.link && (
              <a href={paper.link} target="_blank" rel="noreferrer"
                className="inline-block rounded-full border border-accent/40 bg-accent/10 px-4 py-2 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-accent transition-colors hover:bg-accent/20">
                Read full paper →
              </a>
            )}
            <div className="flex flex-wrap gap-3">
              {paper.findings.map((f) => (
                <div key={f.label} className="rounded border border-line-soft bg-surface px-3 py-1.5">
                  <span className="font-mono text-[0.6rem] uppercase tracking-[0.08em] text-text-faint">{f.label} </span>
                  <span className="font-mono text-[0.8rem] font-medium text-accent">{f.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative border-t border-line-soft bg-[#0d0c0b] overflow-hidden w-full aspect-[900/320]">
          <Chart />
        </div>
      </article>
    </HoverLift>
  );
}
