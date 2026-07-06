'use client'

import Image from 'next/image'
import { Plus } from 'lucide-react'
import { Reveal } from '@/components/reveal'

type Project = {
  name: string
  index: string
  description: string
  features: string[]
  stack: string[]
  image: string
  alt: string
  video?: string
}

const projects: Project[] = [
  {
    name: 'AI Invoice Processing System',
    index: '01',
    description:
      'An intelligent automation platform built using n8n, OCR.space, Google Sheets, and AI to extract invoice information automatically while dramatically reducing manual work.',
    features: [
      'Automatic invoice data extraction with OCR',
      'AI-powered field detection and validation',
      'Google Sheets sync for instant record keeping',
      'End-to-end n8n workflow automation',
    ],
    stack: ['n8n', 'OCR.space', 'Google Sheets', 'AI', 'Webhooks'],
    image: '/images/project-pulseboard.png',
    alt: 'AI Invoice Processing System dashboard shown on laptop and phone mockups',
  },
  {
    name: 'Medical AI Triage Assistant',
    index: '02',
    description:
      'An AI-powered healthcare assistant designed to analyze symptoms, prioritize cases, and assist medical decision making using cloud-native architecture.',
    features: [
      'Symptom analysis with AI reasoning',
      'Case prioritization for faster triage',
      'Decision support for medical staff',
      'Cloud-native, scalable architecture',
    ],
    stack: ['Python', 'FastAPI', 'AI', 'Cloud', 'React'],
    image: '/images/project-neuraflow.png',
    alt: 'Medical AI Triage Assistant interface shown on laptop and phone mockups',
  },
  {
    name: 'Duck Hunter: Definitive Edition',
    index: '03',
    description:
      'A browser-based game rebuilt with modern JavaScript architecture, modular systems, optimized rendering, advanced game state management, and polished gameplay mechanics.',
    features: [
      'Modern modular JavaScript architecture',
      'Optimized rendering pipeline',
      'Advanced game state management',
      'Polished gameplay mechanics',
    ],
    stack: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Vite'],
    image: '/images/project-relay.png',
    alt: 'Duck Hunter: Definitive Edition game shown on laptop and phone mockups',
    video: '/videos/demoduck.webm',
  },
]

export function Projects() {
  return (
    <section id="work" className="relative px-4 py-24 md:py-32">
      <Reveal>
        <p className="text-center font-mono text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground">
          [ Crafting Modern Experiences ]
        </p>
        <h2 className="headline-giant mt-4 text-balance text-center text-5xl uppercase text-foreground md:text-8xl">
          Venture{' '}
          <span className="font-serif normal-case italic font-normal text-accent">
            Showcase
          </span>
        </h2>
        <p className="mt-6 text-center font-mono text-xs uppercase tracking-[0.35em] text-muted-foreground">
          /Scroll to explore
        </p>
      </Reveal>

      <div className="mx-auto mt-24 flex max-w-7xl flex-col gap-16 md:gap-32">
        {projects.map((project, i) => (
          <Reveal key={project.name}>
            <article className="grid items-center gap-10 lg:grid-cols-2">
              <div className={i % 2 === 1 ? 'lg:order-2' : undefined}>
                <div className="flex items-baseline gap-4">
                  <span
                    className="h-1.5 w-8 self-center bg-accent"
                    aria-hidden="true"
                  />
                  <h3 className="text-3xl font-bold text-foreground md:text-4xl">
                    {project.name}
                  </h3>
                  <span className="font-mono text-xs tracking-[0.3em] text-muted-foreground">
                    [{project.index}/03]
                  </span>
                </div>
                <p className="mt-6 leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
                <ul className="mt-8 flex flex-col gap-3">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-3 text-sm text-foreground"
                    >
                      <Plus
                        className="size-3.5 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
                <ul className="mt-8 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <li
                      key={tech}
                      className="border-2 border-border bg-card px-4 py-1.5 font-mono text-xs font-medium text-foreground"
                    >
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              <div
                className={`brutal-shadow-accent group relative overflow-hidden border-2 border-foreground/40 ${
                  i % 2 === 1 ? 'lg:order-1' : ''
                }`}
              >
                {project.video ? (
                  <video
                    src={project.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                ) : (
                  <Image
                    src={project.image || '/placeholder.svg'}
                    alt={project.alt}
                    width={880}
                    height={660}
                    className="size-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                  />
                )}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
