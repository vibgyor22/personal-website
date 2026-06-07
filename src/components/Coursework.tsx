"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

type CourseworkData =
  | {
      semesters: { term: string; courses: string[] }[];
    }
  | {
      foundation: string[];
      diploma: string[];
    }
  | {
      preparatory: string;
      core: string[];
      optional: string[];
      dissertation: string;
    };

export function CourseworkToggle({
  label,
  data,
}: {
  label: string;
  data: CourseworkData;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-6 border-t border-line-soft pt-5">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="group flex w-full items-center justify-between text-left"
      >
        <span className="font-mono text-[0.72rem] uppercase tracking-[0.14em] text-text-muted transition-colors group-hover:text-accent">
          {open ? "−" : "+"} {label}
        </span>
        <span className="font-mono text-[0.65rem] text-text-faint">
          {open ? "collapse" : "expand"}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="pt-5">
              {"semesters" in data && (
                <div className="space-y-6">
                  {data.semesters.map((sem) => (
                    <div key={sem.term}>
                      <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-text-faint">
                        {sem.term}
                      </p>
                      <ul className="space-y-1.5">
                        {sem.courses.map((c) => (
                          <li
                            key={c}
                            className="font-serif text-[0.95rem] text-text-muted"
                          >
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}

              {"foundation" in data && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-text-faint">
                      Foundation
                    </p>
                    <ul className="space-y-1.5">
                      {data.foundation.map((c) => (
                        <li key={c} className="font-serif text-[0.95rem] text-text-muted">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-text-faint">
                      Diploma
                    </p>
                    <ul className="space-y-1.5">
                      {data.diploma.map((c) => (
                        <li key={c} className="font-serif text-[0.95rem] text-text-muted">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}

              {"preparatory" in data && (
                <div className="space-y-6">
                  <p className="font-serif text-[0.95rem] text-text-muted">
                    {data.preparatory}
                  </p>
                  <div>
                    <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-text-faint">
                      Core modules
                    </p>
                    <ul className="space-y-1.5">
                      {data.core.map((c) => (
                        <li key={c} className="font-serif text-[0.95rem] text-text-muted">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 font-mono text-[0.68rem] uppercase tracking-[0.12em] text-text-faint">
                      Optional modules
                    </p>
                    <ul className="space-y-1.5">
                      {data.optional.map((c) => (
                        <li key={c} className="font-serif text-[0.95rem] text-text-muted">
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <p className="font-serif text-[0.95rem] italic text-text-faint">
                    {data.dissertation}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
