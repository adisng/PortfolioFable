'use client'

import {
  Bot,
  Layers,
  Workflow,
  Cloud,
  Boxes,
  Gauge,
} from 'lucide-react'
import { Reveal } from '@/components/reveal'

const services = [
  {
    icon: Layers,
    title: 'Full Stack Development',
    description:
      'Complete web applications from database to polished frontend — architecture, APIs, auth, and UI.',
  },
  {
    icon: Bot,
    title: 'AI Integration',
    description:
      'LLMs, RAG pipelines, and AI agents embedded into products so software understands, not just responds.',
  },
  {
    icon: Workflow,
    title: 'Workflow Automation',
    description:
      'n8n pipelines, API integrations, and intelligent automations that eliminate repetitive manual work.',
  },
  {
    icon: Cloud,
    title: 'Cloud Infrastructure',
    description:
      'Resilient, observable deployments on AWS, Docker, and Vercel with CI/CD baked in.',
  },
  {
    icon: Boxes,
    title: 'Custom SaaS Development',
    description:
      'Scalable multi-tenant products from zero to launch — billing, dashboards, and everything between.',
  },
  {
    icon: Gauge,
    title: 'Performance Optimization',
    description:
      'Core Web Vitals audits and fixes that make existing products feel instant.',
  },
]

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-4 py-24 md:py-32">
      <Reveal>
        <p className="font-mono text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground">
          [ What I Offer ]
        </p>
        <h2 className="headline-giant mt-4 max-w-2xl text-balance text-5xl uppercase text-foreground md:text-7xl">
          Premium{' '}
          <span className="font-serif normal-case italic font-normal text-accent">
            offerings
          </span>
        </h2>
      </Reveal>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.title} delay={(i % 3) * 0.08}>
            <article className="glass brutal-hover group h-full p-8">
              <div className="flex items-center justify-between">
                <div className="flex size-12 items-center justify-center border-2 border-border bg-secondary text-accent transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-foreground">
                  <service.icon className="size-5" aria-hidden="true" />
                </div>
                <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
                  {String(i + 1).padStart(2, '0')}/
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-foreground">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {service.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
