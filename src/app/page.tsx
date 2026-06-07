import { Navigation } from "@/components/Navigation";
import { Section } from "@/components/Section";
import { CourseworkToggle } from "@/components/Coursework";
import { ProjectCard } from "@/components/ProjectCard";
import { ResearchCard } from "@/components/ResearchCard";
import { FadeIn, HoverLift, Stagger, StaggerItem } from "@/components/motion";
import {
  profile,
  intro,
  work,
  projects,
  research,
  education,
  internships,
  clubs,
  debating,
  achievements,
  skills,
} from "@/data/content";

export default function Home() {
  return (
    <>
      <Navigation />

      <main>
        {/* About */}
        <section
          id="about"
          className="scroll-mt-28 px-6 pb-16 pt-36 md:px-10 md:pb-24 md:pt-44"
        >
          <div className="mx-auto max-w-5xl">
            <FadeIn>
              <h1 className="max-w-3xl font-serif text-[clamp(2.2rem,5.5vw,3.8rem)] font-light leading-[1.1] tracking-tight text-text">
                {intro.greeting}
              </h1>
            </FadeIn>

            <FadeIn delay={0.1}>
              <div className="prose-notebook mt-10 max-w-2xl space-y-4">
                <p>{intro.current}</p>
                <p>{intro.background}</p>
                <p>{intro.cambridge}</p>
                <p className="text-text-muted">{intro.future}</p>
              </div>
            </FadeIn>

            <FadeIn delay={0.18}>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 font-mono text-[0.72rem] uppercase tracking-[0.14em]">
                <a href={profile.github} className="link-quiet" target="_blank" rel="noreferrer">
                  github
                </a>
                <a href={profile.linkedin} className="link-quiet" target="_blank" rel="noreferrer">
                  linkedin
                </a>
                <a href={`mailto:${profile.email}`} className="link-quiet">
                  email
                </a>
                <a href="/personal-website/resume.pdf" target="_blank" rel="noreferrer" className="link-quiet">
                  resume
                </a>
              </div>
            </FadeIn>
          </div>
        </section>

        <div className="section-rule mx-auto max-w-5xl" />

        {/* Work */}
        <Section id="work" eyebrow="Current role" title={work.title}>
          <FadeIn>
            <div className="prose-notebook mb-4 max-w-2xl">
              <p>
                <strong>{work.company}</strong> · {work.location}
                <br />
                <span className="font-mono text-[0.8rem] text-text-muted">
                  {work.role} · {work.period}
                </span>
              </p>
              <p className="mt-4 text-text-muted">{work.promoted}</p>
              <p className="mt-4">{work.narrative}</p>
            </div>
          </FadeIn>

          <Stagger className="mt-10 space-y-10">
            {work.areas.map((area) => (
              <StaggerItem key={area.title}>
                <HoverLift>
                  <article className="max-w-2xl">
                    <h3 className="font-serif text-xl text-text">{area.title}</h3>
                    <p className="mt-3 font-serif text-[1.02rem] leading-relaxed text-text-muted">
                      {area.body}
                    </p>
                  </article>
                </HoverLift>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        <div className="section-rule mx-auto max-w-5xl" />

        {/* Education */}
        <Section id="education" eyebrow="Education" title="Education">
          <Stagger className="space-y-16">
            {education.map((school) => (
              <StaggerItem key={school.institution}>
                <article className="max-w-2xl">
                  <div className="mb-4">
                    <h3 className="font-serif text-2xl text-text">
                      {school.institution}
                    </h3>
                    <p className="mt-1 font-mono text-[0.72rem] uppercase tracking-[0.1em] text-text-muted">
                      {school.degree} · {school.period}
                    </p>
                    {school.note && (
                      <p className="mt-1 font-mono text-[0.68rem] text-text-faint">
                        {school.note}
                      </p>
                    )}
                  </div>

                  {school.narrative && (
                    <p className="font-serif text-[1.02rem] leading-relaxed text-text">
                      {school.narrative}
                    </p>
                  )}
                  {"whatStudy" in school && school.whatStudy && (
                    <p className="mt-4 font-serif text-[1.02rem] leading-relaxed text-text-muted">
                      {school.whatStudy}
                    </p>
                  )}
                  {school.plannedClubs && (
                    <div className="mt-4">
                      <p className="font-serif text-[0.95rem] text-text-faint mb-2">Clubs and activities</p>
                      <p className="font-serif text-[1.02rem] leading-relaxed text-text-muted">
                        {school.plannedClubs.join(" · ")}
                      </p>
                    </div>
                  )}

                  <CourseworkToggle label="View coursework" data={school.coursework} />
                </article>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn delay={0.1}>
            <div className="mt-16 max-w-2xl space-y-8">
              <div>
                <p className="eyebrow mb-4">Skills</p>
                <p className="font-serif text-text-muted">
                  {skills.technical.join(" · ")}
                </p>
              </div>
              <div>
                <p className="eyebrow mb-4">Certifications</p>
                <ul className="space-y-2">
                  {skills.certifications.map((cert) => (
                    <li
                      key={cert}
                      className="font-serif text-[0.98rem] text-text-muted"
                    >
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeIn>
        </Section>

        <div className="section-rule mx-auto max-w-5xl" />

        {/* Projects */}
        <Section id="projects" eyebrow="Projects" title="Projects">
          <FadeIn>
            <p className="mb-10 max-w-2xl font-serif text-text-muted">
              Things I&apos;ve built — with code, dashboards, and real outputs.
            </p>
          </FadeIn>
          <Stagger className="space-y-8">
            {projects.map((project) => (
              <StaggerItem key={project.slug}>
                <ProjectCard project={project} />
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        <div className="section-rule mx-auto max-w-5xl" />

        {/* Research */}
        <Section id="research" eyebrow="Research" title="Research">
          <FadeIn>
            <p className="mb-10 max-w-2xl font-serif text-text-muted">
              Papers and studies I&apos;ve written — explained in plain terms.
            </p>
          </FadeIn>
          <Stagger className="space-y-8">
            {research.map((paper) => (
              <StaggerItem key={paper.slug}>
                <ResearchCard paper={paper} />
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        <div className="section-rule mx-auto max-w-5xl" />

        {/* Internships */}
        <Section id="internships" eyebrow="Internships" title="Internships">
          <Stagger className="space-y-12">
            {internships.map((item) => (
              <StaggerItem key={item.org}>
                <HoverLift>
                  <article className="max-w-2xl">
                    <h3 className="font-serif text-xl text-text">{item.org}</h3>
                    <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-text-faint">
                      {item.role} · {item.location} · {item.period}
                    </p>
                    <p className="mt-4 font-serif text-[1.02rem] leading-relaxed text-text-muted">
                      {item.narrative}
                    </p>
                  </article>
                </HoverLift>
              </StaggerItem>
            ))}
          </Stagger>
        </Section>

        <div className="section-rule mx-auto max-w-5xl" />

        {/* Leadership */}
        <Section id="leadership" eyebrow="Leadership" title="Leadership & Activities">
          <Stagger className="space-y-10">
            {clubs.map((club) => (
              <StaggerItem key={club.name}>
                <HoverLift>
                  <article className="max-w-2xl">
                    <h3 className="font-serif text-xl text-text">{club.name}</h3>
                    <p className="mt-1 font-mono text-[0.68rem] uppercase tracking-[0.1em] text-text-faint">
                      {club.role}
                    </p>
                    <p className="mt-4 font-serif text-[1.02rem] leading-relaxed text-text-muted">
                      {club.narrative}
                    </p>
                  </article>
                </HoverLift>
              </StaggerItem>
            ))}
          </Stagger>

          <FadeIn delay={0.1}>
            <div className="mt-14 max-w-2xl">
              <p className="eyebrow mb-4">Other achievements</p>
              <ul className="space-y-3">
                {achievements.map((a) => (
                  <li
                    key={a}
                    className="font-serif text-[0.98rem] leading-relaxed text-text-muted"
                  >
                    — {a}
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </Section>

        <div className="section-rule mx-auto max-w-5xl" />

        {/* Debating */}
        <Section id="debating" eyebrow="Debating" title={debating.title}>
          <FadeIn>
            <div className="prose-notebook mb-10 max-w-2xl space-y-4">
              {debating.narrative.split('\n').map((para, i) => (
                <p key={i} className="font-serif text-[1.02rem] leading-relaxed text-text-muted">
                  {para}
                </p>
              ))}
            </div>
          </FadeIn>

          <FadeIn delay={0.12}>
            <ul className="mt-10 max-w-2xl space-y-3">
              {debating.achievements.map((a) => (
                <li
                  key={a}
                  className="font-serif text-[0.98rem] leading-relaxed text-text-muted"
                >
                  — {a}
                </li>
              ))}
            </ul>
          </FadeIn>
        </Section>

        {/* Footer */}
        <footer className="border-t border-line-soft px-6 py-20 md:px-10">
          <div className="mx-auto flex max-w-5xl flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="font-serif text-2xl text-text">{profile.name}</p>
              <p className="mt-2 font-mono text-[0.72rem] text-text-faint">
                {profile.email}
              </p>
            </div>
            <div className="flex gap-6 font-mono text-[0.72rem] uppercase tracking-[0.12em]">
              <a href={profile.github} className="link-quiet" target="_blank" rel="noreferrer">
                github
              </a>
              <a href={profile.linkedin} className="link-quiet" target="_blank" rel="noreferrer">
                linkedin
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
