'use client'

import { Reveal } from '@/components/reveal'

type Entry = {
  period: string
  title: string
  company: string
  description: string
}

const education: Entry[] = [
  {
    period: '2025 — 2027',
    title: 'Master of Computer Applications',
    company: 'MATS University, Raipur',
    description:
      'Deepening expertise in software engineering, AI systems, and cloud architecture while building AI-native products alongside coursework.',
  },
  {
    period: '2022 — 2025',
    title: 'Bachelor of Computer Applications',
    company: 'St. Vincent Pallotti College, Raipur',
    description:
      'Built a strong foundation in programming, databases, and web development — and shipped complete digital products from idea to deployment.',
  },
]

const credentials: Entry[] = [
  {
    period: 'Certification',
    title: 'AWS Certified Cloud Practitioner',
    company: 'Amazon Web Services',
    description:
      'Validated knowledge of AWS cloud concepts, core services, security, architecture, and pricing.',
  },
]

function Timeline({ entries }: { entries: Entry[] }) {
  return (
    <ol className="relative mt-16 flex flex-col gap-12 border-l-2 border-border pl-8">
      {entries.map((entry, i) => (
        <Reveal key={entry.title} delay={i * 0.06}>
          <li className="relative">
            <span
              aria-hidden="true"
              className="absolute -left-[2.45rem] top-1.5 size-3 border-2 border-accent bg-background"
            />
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              /{entry.period}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-foreground">
              {entry.title}
            </h3>
            <p className="mt-1 font-serif text-lg italic text-muted-foreground">
              {entry.company}
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              {entry.description}
            </p>
          </li>
        </Reveal>
      ))}
    </ol>
  )
}

export function Experience() {
  return (
    <>
      <section className="mx-auto max-w-4xl px-4 py-24 md:py-32">
        <Reveal>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground">
            [ The Journey ]
          </p>
          <h2 className="headline-giant mt-4 text-5xl uppercase text-foreground md:text-7xl">
            Education{' '}
            <span className="font-serif normal-case italic font-normal text-accent">
              so far
            </span>
          </h2>
        </Reveal>
        <Timeline entries={education} />
      </section>

      <section className="mx-auto max-w-4xl px-4 pb-24 md:pb-32">
        <Reveal>
          <p className="font-mono text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground">
            [ Verified ]
          </p>
          <h2 className="headline-giant mt-4 text-5xl uppercase text-foreground md:text-7xl">
            Credentials{' '}
            <span className="font-serif normal-case italic font-normal text-accent">
              &amp; certifications
            </span>
          </h2>
        </Reveal>
        <Timeline entries={credentials} />
      </section>
    </>
  )
}
