'use client'

import dynamic from 'next/dynamic'
import { Award, ExternalLink, ShieldCheck } from 'lucide-react'
import { Reveal } from '@/components/reveal'

const CertificationBadge3D = dynamic(
  () => import('@/components/certification-badge-3d'),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-72 w-full items-center justify-center font-mono text-xs uppercase tracking-widest text-muted-foreground/60 sm:h-80">
        Loading 3D Badge...
      </div>
    ),
  }
)

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
      <section className="mx-auto max-w-4xl px-4 py-16 sm:py-24 md:py-32">
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

        {/* Floating Independent 3D Certification Showcase */}
        <Reveal delay={0.1}>
          <div className="mt-16 grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
            {/* Free-floating 3D Interactive Canvas (No container box) */}
            <div className="relative order-1 flex items-center justify-center lg:col-span-4">
              <CertificationBadge3D className="h-56 w-full sm:h-64" scale={1.25} />
            </div>

            {/* Certification Details */}
            <div className="order-2 flex flex-col justify-center lg:col-span-8">
              <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent">
                <span className="inline-flex items-center gap-1.5 border border-accent/40 bg-accent/10 px-2.5 py-1 font-semibold">
                  <ShieldCheck className="size-3.5 text-accent" /> Official Certification
                </span>
                <span className="border border-border bg-secondary px-2.5 py-1 text-muted-foreground">
                  Amazon Web Services
                </span>
              </div>

              <h3 className="mt-4 font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
                AWS Certified Cloud Practitioner
              </h3>

              <p className="mt-4 leading-relaxed text-muted-foreground sm:text-base">
                Validated foundational understanding of AWS cloud concepts, global infrastructure, security, core services (Compute, Storage, Networking, Databases), and cloud economics.
              </p>

              <div className="mt-6 flex flex-wrap gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                <span className="border border-border bg-secondary/60 px-3 py-1">Cloud Architecture</span>
                <span className="border border-border bg-secondary/60 px-3 py-1">AWS Core Services</span>
                <span className="border border-border bg-secondary/60 px-3 py-1">Security &amp; IAM</span>
                <span className="border border-border bg-secondary/60 px-3 py-1">Cloud Economics</span>
              </div>

              <div className="mt-8 flex items-center gap-4">
                <a
                  href="https://www.credly.com/badges/cafdd014-7583-4124-bb34-db9745ea2adf/public_url"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="brutal-shadow-accent inline-flex items-center gap-2 border-2 border-foreground bg-primary px-6 py-3.5 font-mono text-xs font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                >
                  Verify on Credly <ExternalLink className="size-3.5" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
