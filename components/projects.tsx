'use client'

import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'

type Project = {
  id: string
  name: string
  descriptor: string
  type: string
  tags: string[]
  role: string
  timeline: string
  live?: string
  github?: string
  stack: string[]
  problem: string
  approach: string
  challenges: string
  outcome: string
  image?: { src: string; alt: string }
  images?: { src: string; alt: string }[]
  video?: { src: string; label: string }
}

const projects: Project[] = [
  {
    id: '01',
    name: 'EmotiSense',
    descriptor: 'Real-time facial expression estimator & telemetry',
    type: 'ML',
    tags: ['ML', 'Computer Vision', 'Full Stack'],
    role: 'Solo',
    timeline: '1 Day',
    live: 'https://emotisense-henna.vercel.app/',
    stack: ['Python', 'FastAPI', 'TensorFlow', 'MediaPipe', 'OpenCV', 'React'],
    images: [
      {
        src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-08-23%20at%2004.04.45-XJo4fa5d3sKyxrPjEYuiOMXsNZ9arp.png',
        alt: 'EmotiSense model telemetry dashboard',
      },
      {
        src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-08-23%20at%2004.04.28-RGRsAP5DAgOcU0hmZGJN8orS8QGece.png',
        alt: 'EmotiSense real-time emotion dashboard',
      },
    ],
    problem:
      'Facial expression recognition systems typically sacrifice either accuracy or transparency — most force confident predictions even on ambiguous inputs, and none surface their own limitations to the user.',
    approach:
      'Built a two-stage fine-tuning pipeline on EfficientNetB0 — frozen backbone first, then unfreezing the top 40 layers at 1/10th learning rate. MediaPipe handles face detection upstream so the classifier only sees clean face crops. Tackled a 16:1 class imbalance with focal loss, inverse-frequency class weighting, and minority oversampling.',
    challenges:
      'Class imbalance was the core problem — raw accuracy was misleading. Uncertainty-aware output required a confidence threshold system that surfaces unsure states instead of forcing a wrong label. Deploying TensorFlow on Render with acceptable cold-start latency required model quantization.',
    outcome:
      'Live real-time expression classification across 7 categories with session analytics and visible model limitations.',
  },
  {
    id: '02',
    name: 'AutoLeads v2',
    descriptor: 'Automated lead generation pipeline & CRM integration',
    type: 'Automation',
    tags: ['n8n', 'AI', 'FastAPI'],
    role: 'Solo',
    timeline: '—',
    stack: ['n8n', 'FastAPI', 'Google Maps API', 'Google Sheets API', 'WhatsApp', 'Webhooks'],
    image: {
      src: '/images/project-pulseboard.png',
      alt: 'AutoLeads v2 dashboard interface',
    },
    problem:
      'Manual lead generation for local businesses is slow, inconsistent, and does not scale — scraping Google Maps by hand and tracking outreach in spreadsheets creates chaos at volume.',
    approach:
      'n8n orchestrates the entire pipeline via three webhooks: search trigger, leads feed, and contacted status update. Google Maps data flows into per-city Google Sheets created dynamically via Sheets API batchUpdate. FastAPI handles backend logic and WhatsApp outreach is triggered post-qualification.',
    challenges:
      'Dynamic sheet creation per city required careful batchUpdate sequencing. Deduplication logic across async webhook calls needed idempotency guarantees.',
    outcome:
      'Fully automated lead pipeline from search to outreach. Scales across cities without manual intervention.',
  },
  {
    id: '03',
    name: 'House Edge',
    descriptor: 'Cinematic browser-based blackjack with interactive 3D dealer',
    type: '3D · Game',
    tags: ['React Three Fiber', 'Next.js', 'TypeScript'],
    role: 'Solo',
    timeline: '—',
    live: 'https://blackjackv5.vercel.app',
    stack: ['React Three Fiber', 'Framer Motion', 'Next.js', 'TypeScript', 'Three.js'],
    image: {
      src: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202026-08-24%20at%2005.36.03-zFDVKh9dLiqQlLpYHbBuZABMHx4x2a.png',
      alt: 'House Edge cinematic blackjack table',
    },
    problem:
      'Browser-based card games are almost universally flat and lifeless — standard DOM rendering cannot deliver the cinematic feel of a real casino table.',
    approach:
      'Built entirely on React Three Fiber with Framer Motion handling UI transitions. Custom dealer persona with a low-poly 3D character, bat-swing animation, and cinematic intro camera sequence. Mobile camera rig uses a custom clamp to prevent over-rotation on narrow viewports.',
    challenges:
      'Camera rig behaviour on mobile was the hardest problem. Card texture aliasing at oblique angles required anisotropic filtering tuned per device pixel ratio.',
    outcome:
      'Live cinematic blackjack in the browser with a custom 3D dealer character.',
  },
  {
    id: '04',
    name: 'Duck Hunter: Definitive Edition',
    descriptor: 'Retro arcade game faithfully rebuilt in HTML5 Canvas',
    type: 'Game Dev',
    tags: ['Canvas', 'Vanilla JS', 'Vite'],
    role: 'Solo',
    timeline: '—',
    stack: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Vite', 'Playwright'],
    video: {
      src: '/videos/demoduck.webm',
      label: 'Duck Hunter gameplay demo',
    },
    problem:
      'The original Duck Hunt experience has not been faithfully rebuilt for the browser with modern architecture — existing clones are throwaway demos with no polish or extensibility.',
    approach:
      'Ported from a Python/Pygame prototype to HTML5 Canvas and vanilla JavaScript. Modular architecture separates game state, rendering, and input layers, with drag/swipe navigation and reduced-motion support.',
    challenges:
      'Porting Pygame’s game loop to requestAnimationFrame required rethinking update/render separation. Character carousel drag/swipe needed to feel native on mouse and touch.',
    outcome:
      'All 26 Playwright tests passing. Modular codebase extensible for new characters and game modes.',
  },
]

export function Projects() {
  const [active, setActive] = useState<Project | null>(null)

  const open = (project: Project) => setActive(project)
  const close = useCallback(() => setActive(null), [])
  const move = useCallback(
    (step: number) => {
      if (!active) return
      const next =
        (projects.findIndex((item) => item.id === active.id) +
          step +
          projects.length) %
        projects.length
      setActive(projects[next])
    },
    [active]
  )

  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
      if (active && event.key === 'ArrowRight') move(1)
      if (active && event.key === 'ArrowLeft') move(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [active, close, move])

  return (
    <section
      id="work"
      className="border-t border-border bg-background py-16 md:py-24"
      aria-label="Projects"
    >
      <header className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <p className="font-mono text-xs uppercase tracking-[0.4em] text-accent">
          [ Work ]
        </p>
        <h2 className="mt-3 text-balance font-serif text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Projects
        </h2>
        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Every project is a complete product — architecture, decisions, and outcomes.
        </p>
      </header>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpen={open}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && (
          <CaseStudyOverlay
            project={active}
            onClose={close}
            onMove={move}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function ProjectCard({
  project,
  onOpen,
}: {
  project: Project
  onOpen: (project: Project) => void
}) {
  return (
    <article
      onClick={() => onOpen(project)}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpen(project)
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open ${project.name} case study`}
      className="group flex flex-col justify-between overflow-hidden border-2 border-border bg-card text-left transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-[6px_6px_0px_0px_var(--accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      <div>
        {/* Top Header bar */}
        <div className="flex items-center justify-between border-b-2 border-border px-4 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
          <span className="font-bold text-accent">/{project.id}</span>
          <span className="border border-border bg-secondary px-2 py-0.5 text-[10px] font-semibold text-foreground">
            [ {project.type} ]
          </span>
        </div>

        {/* Media Preview Box */}
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b-2 border-border bg-secondary">
          {project.images?.length ? (
            <img
              src={project.images[0].src}
              alt={project.images[0].alt}
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : project.image ? (
            <img
              src={project.image.src}
              alt={project.image.alt}
              loading="lazy"
              className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : project.video ? (
            <video
              src={project.video.src}
              aria-label={project.video.label}
              muted
              autoPlay
              loop
              playsInline
              className="size-full object-cover"
            />
          ) : (
            <div className="size-full blueprint-grid opacity-60" />
          )}
        </div>

        {/* Card Body */}
        <div className="p-5">
          <h3 className="font-serif text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-accent">
            {project.name}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground md:text-sm">
            {project.descriptor}
          </p>

          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="border border-border bg-secondary/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
              >
                {tag}
              </span>
            ))}
            {project.tags.length > 3 && (
              <span className="border border-border bg-secondary/60 px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                +{project.tags.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer */}
      <div className="mx-5 mb-5 border-t border-border pt-4">
        <div className="flex items-center justify-between font-mono text-xs uppercase tracking-wider text-muted-foreground transition-colors group-hover:text-accent">
          <span>View case study</span>
          <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  )
}

function CaseStudyOverlay({
  project,
  onClose,
  onMove,
}: {
  project: Project
  onClose: () => void
  onMove: (step: number) => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 overflow-y-auto bg-background/95 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.name} case study`}
    >
      <div className="grid min-h-screen lg:grid-cols-[38%_62%]">
        {/* Left Column / Sidebar */}
        <aside className="flex min-h-0 flex-col justify-between border-b-2 border-border p-6 md:p-10 lg:sticky lg:top-0 lg:h-screen lg:border-b-0 lg:border-r-2">
          <div>
            <div className="flex items-center justify-between font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <span>
                [ Work ] &nbsp; {project.id} / {projects.length.toString().padStart(2, '0')}
              </span>
              <button
                onClick={onClose}
                aria-label="Close case study"
                className="flex size-10 items-center justify-center border-2 border-border bg-card text-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <X className="size-5" />
              </button>
            </div>

            <h2 className="mt-8 font-serif text-3xl font-bold tracking-tight text-foreground md:text-5xl">
              {project.name}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground md:text-base">
              {project.descriptor}
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-widest text-accent">
              {project.tags.join(' · ')}
            </p>

            <dl className="mt-8 border-t-2 border-border font-mono text-xs uppercase tracking-widest">
              <Meta label="Role" value={project.role} />
              <Meta label="Timeline" value={project.timeline} />
              <Meta label="Type" value={project.type} />
            </dl>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.live && (
                <a
                  href={project.live}
                  target="_blank"
                  rel="noreferrer"
                  className="brutal-shadow-accent inline-flex items-center gap-2 border-2 border-foreground bg-primary px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                >
                  View live <ExternalLink className="size-3.5" />
                </a>
              )}
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 border-2 border-border bg-card px-6 py-3 font-mono text-xs font-bold uppercase tracking-widest text-foreground transition-colors hover:border-accent hover:text-accent"
                >
                  GitHub <ExternalLink className="size-3.5" />
                </a>
              )}
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="hidden items-center justify-between border-t-2 border-border pt-6 font-mono text-xs uppercase tracking-widest text-muted-foreground lg:flex">
            <button
              onClick={() => onMove(-1)}
              className="flex items-center gap-2 transition-colors hover:text-accent"
            >
              <ChevronLeft className="size-4" /> Previous
            </button>
            <button
              onClick={() => onMove(1)}
              className="flex items-center gap-2 transition-colors hover:text-accent"
            >
              Next <ChevronRight className="size-4" />
            </button>
          </div>
        </aside>

        {/* Right Column / Content */}
        <main className="p-6 md:p-12">
          {/* Media preview inside modal */}
          <div className="mb-10 overflow-hidden border-2 border-border bg-secondary">
            {project.images?.length ? (
              <div className="flex snap-x overflow-x-auto">
                {project.images.map((preview) => (
                  <img
                    key={preview.src}
                    src={preview.src}
                    alt={preview.alt}
                    className="max-h-[460px] w-full shrink-0 snap-center object-contain"
                  />
                ))}
              </div>
            ) : project.image ? (
              <img
                src={project.image.src}
                alt={project.image.alt}
                className="max-h-[460px] w-full object-contain"
              />
            ) : project.video ? (
              <video
                src={project.video.src}
                aria-label={project.video.label}
                muted
                autoPlay
                loop
                playsInline
                className="max-h-[460px] w-full object-contain"
              />
            ) : null}
          </div>

          <CaseBlock label="The Problem" text={project.problem} />
          <CaseBlock label="Approach & Methodology" text={project.approach} />
          <CaseBlock label="Key Engineering Challenges" text={project.challenges} />
          <CaseBlock label="Outcome" text={project.outcome} />

          <div className="mt-12 border-t-2 border-border pt-6">
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
              / Tech Stack
            </p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <li
                  key={item}
                  className="border-2 border-border bg-secondary/50 px-3 py-1.5 font-mono text-xs uppercase tracking-widest text-foreground"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Mobile Bottom Navigation */}
          <div className="mt-12 grid grid-cols-2 gap-3 border-t-2 border-border pt-6 lg:hidden">
            <button
              onClick={() => onMove(-1)}
              className="flex items-center justify-center gap-2 border-2 border-border py-3 font-mono text-xs uppercase tracking-widest text-foreground"
            >
              <ChevronLeft className="size-4" /> Prev
            </button>
            <button
              onClick={() => onMove(1)}
              className="flex items-center justify-center gap-2 border-2 border-border py-3 font-mono text-xs uppercase tracking-widest text-foreground"
            >
              Next <ChevronRight className="size-4" />
            </button>
          </div>
        </main>
      </div>
    </motion.div>
  )
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 border-b border-border py-3">
      <dt className="text-muted-foreground">/ {label}</dt>
      <dd className="font-bold text-foreground text-right">{value}</dd>
    </div>
  )
}

function CaseBlock({ label, text }: { label: string; text: string }) {
  return (
    <section className="mb-10 border-t-2 border-border pt-6">
      <h3 className="font-mono text-xs uppercase tracking-[0.3em] text-accent">
        / {label}
      </h3>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted-foreground md:text-base">
        {text}
      </p>
    </section>
  )
}
