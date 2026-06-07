import { FadeIn } from "@/components/motion";
import { type ReactNode } from "react";

export function Section({
  id,
  eyebrow,
  title,
  children,
  aside,
}: {
  id: string;
  eyebrow?: string;
  title?: string;
  children: ReactNode;
  aside?: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28 py-20 md:py-28" aria-labelledby={`${id}-title`}>
      <div className="mx-auto max-w-5xl px-6 md:px-10">
        <div className="grid gap-10 md:grid-cols-[1fr_11rem] md:gap-16">
          <div>
            {(eyebrow || title) && (
              <FadeIn>
                <header className="mb-10 max-w-2xl">
                  {eyebrow && <p className="eyebrow mb-3">{eyebrow}</p>}
                  {title && (
                    <h2
                      id={`${id}-title`}
                      className="font-serif text-3xl font-light tracking-tight text-text md:text-4xl"
                    >
                      {title}
                    </h2>
                  )}
                </header>
              </FadeIn>
            )}
            {children}
          </div>

          {aside && (
            <aside className="hidden md:block">
              <FadeIn delay={0.15}>
                <div className="sticky top-32 font-mono text-[0.68rem] leading-relaxed tracking-wide text-text-faint">
                  {aside}
                </div>
              </FadeIn>
            </aside>
          )}
        </div>
      </div>
    </section>
  );
}
