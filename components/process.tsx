'use client'

import { Reveal } from '@/components/reveal'

const steps = [
  {
    index: '01',
    title: 'Discovery',
    description:
      'Deep-dive into your goals, users, and constraints so we solve the right problem.',
  },
  {
    index: '02',
    title: 'Design',
    description:
      'Wireframes and high-fidelity prototypes that make the product tangible before a line of code.',
  },
  {
    index: '03',
    title: 'Development',
    description:
      'Iterative builds with weekly demos — you see progress, not promises.',
  },
  {
    index: '04',
    title: 'Testing',
    description:
      'Performance, accessibility, and edge-case hardening across devices.',
  },
  {
    index: '05',
    title: 'Launch',
    description:
      'Zero-drama deployments with monitoring, analytics, and rollback plans in place.',
  },
  {
    index: '06',
    title: 'Optimization',
    description:
      'Post-launch iteration driven by real usage data, not guesswork.',
  },
]

export function Process() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-4 py-24 md:py-32">
      <Reveal>
        <p className="font-mono text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground">
          [ How I Work ]
        </p>
        <h2 className="headline-giant mt-4 max-w-2xl text-balance text-5xl uppercase text-foreground md:text-7xl">
          A proven{' '}
          <span className="font-serif normal-case italic font-normal text-accent">
            process
          </span>
        </h2>
      </Reveal>

      <ol className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, i) => (
          <Reveal key={step.index} delay={(i % 3) * 0.08}>
            <li className="glass brutal-hover h-full p-8">
              <p className="font-mono text-4xl font-black text-accent">
                {step.index}/
              </p>
              <h3 className="mt-4 text-xl font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}
