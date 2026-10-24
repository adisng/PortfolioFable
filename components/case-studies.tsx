'use client'

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react'
import { useState, useEffect, useCallback, useRef } from 'react'
import { ChevronLeft, ChevronRight, ExternalLink, GitBranch } from 'lucide-react'
import { CaseStudy3DBackground } from './case-studies-3d'

const projects = [
  {
    id: "01",
    name: "EmotiSense",
    tag: "ML · Computer Vision · Full Stack",
    role: "Solo",
    timeline: "1 day",
    problem: "Facial expression recognition systems typically sacrifice either accuracy or transparency — most force confident predictions even on ambiguous inputs, and none surface their own limitations to the user.",
    approach: "Built a two-stage fine-tuning pipeline on EfficientNetB0 — frozen backbone first, then unfreezing the top 40 layers at 1/10th learning rate to adapt ImageNet features without destroying them. MediaPipe handles face detection upstream so the classifier only ever sees clean face crops. Tackled a 16:1 class imbalance with focal loss, inverse-frequency class weighting, and minority oversampling — monitored with balanced accuracy and macro F1, not raw accuracy which flatters imbalanced data.",
    challenges: "Class imbalance was the core problem — raw accuracy was misleading at every step. Uncertainty-aware output required designing a confidence threshold system that gracefully surfaces 'unsure' states instead of forcing a wrong label. Deploying a TensorFlow model on Render with acceptable cold-start latency required careful model quantization.",
    outcome: "Live real-time expression classification across 7 categories. Full session analytics with SQLite, per-session emotion timelines. Model limitations visible in the UI — no inflated accuracy claims. If rebuilt: would explore MobileNetV3 for faster inference.",
    stack: ["Python", "FastAPI", "TensorFlow", "MediaPipe", "OpenCV", "React"],
    live: "https://emotisense-henna.vercel.app/",
    github: "",
    three: "icosahedron" as const
  },
  {
    id: "02",
    name: "AutoLeads v2",
    tag: "Automation · AI · n8n",
    role: "Solo",
    timeline: "—",
    problem: "Manual lead generation for local businesses is slow, inconsistent, and doesn't scale — scraping Google Maps by hand and tracking outreach in spreadsheets creates chaos at volume.",
    approach: "n8n orchestrates the entire pipeline via three webhooks: search trigger, leads feed, and contacted status update. Google Maps data flows into per-city Google Sheets created dynamically via Sheets API batchUpdate. FastAPI handles the backend logic. WhatsApp outreach is triggered automatically post-qualification. Deduplication is scoped to city sheets to prevent double-outreach.",
    challenges: "Dynamic sheet creation per city required careful batchUpdate sequencing — sheets had to be created before data was written or the whole pipeline would fail silently. Deduplication logic across async webhook calls needed idempotency guarantees.",
    outcome: "Fully automated lead pipeline from search to outreach. Scales across cities without manual intervention. Slim field output keeps Sheets readable for non-technical users.",
    stack: ["n8n", "FastAPI", "Google Maps API", "Google Sheets API", "WhatsApp", "Webhooks"],
    live: "",
    github: "",
    three: "network" as const
  },
  {
    id: "03",
    name: "House Edge",
    tag: "3D · Game · React Three Fiber",
    role: "Solo",
    timeline: "—",
    problem: "Browser-based card games are almost universally flat and lifeless — standard DOM rendering can't deliver the cinematic feel of a real casino table.",
    approach: "Built entirely on React Three Fiber with Framer Motion handling UI transitions. Custom dealer persona with a low-poly 3D character, bat-swing animation, and a cinematic intro camera sequence implemented as an additive state machine. Card textures upgraded from 256×358 to 512×716 with anisotropic filtering. Mobile camera rig required a custom k-clamp reduction to prevent over-rotation on narrow viewports.",
    challenges: "Camera rig behaviour on mobile was the hardest problem — the default OrbitControls damping felt wrong on touch. Card texture aliasing at oblique angles required anisotropic filtering tuned per device pixel ratio.",
    outcome: "Live at blackjackv5.vercel.app. Full cinematic blackjack experience in the browser with a custom 3D dealer character. If rebuilt: would use instanced geometry for the card deck to cut draw calls.",
    stack: ["React Three Fiber", "Framer Motion", "Next.js", "TypeScript", "Three.js"],
    live: "https://blackjackv5.vercel.app",
    github: "",
    three: "card" as const
  },
  {
    id: "04",
    name: "Duck Hunter: Definitive Edition",
    tag: "Game Dev · Canvas · Vanilla JS",
    role: "Solo",
    timeline: "—",
    problem: "The original Duck Hunt experience hasn't been faithfully rebuilt for the browser with modern architecture — existing clones are throwaway demos with no polish or extensibility.",
    approach: "Ported from a Python/Pygame prototype to HTML5 Canvas + vanilla JavaScript with no framework dependencies. Modular architecture with separated game state, rendering, and input layers. Character selection carousel with drag/swipe navigation, CSS custom properties per character, and prefers-reduced-motion support. 26 Playwright smoke tests pass. Premium indie aesthetic inspired by Firewatch and Linear.",
    challenges: "Porting Pygame's game loop model to requestAnimationFrame required rethinking the update/render separation entirely. Character carousel drag/swipe needed to feel native on both mouse and touch without a library.",
    outcome: "All 26 Playwright tests passing. Modular codebase extensible for new characters and game modes. If rebuilt: would use OffscreenCanvas for the background render layer to free up the main thread.",
    stack: ["JavaScript", "HTML5 Canvas", "CSS3", "Vite", "Playwright"],
    live: "",
    github: "",
    three: "parallax" as const
  }
]

const sections = [
  { label: "THE PROBLEM", key: "problem" },
  { label: "APPROACH & METHODOLOGY", key: "approach" },
  { label: "KEY ENGINEERING CHALLENGES", key: "challenges" },
  { label: "OUTCOME", key: "outcome" },
]

function BrutalButton({
  children,
  href,
  disabled = false,
  onClick,
  className = "",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: string; disabled?: boolean }) {
  const [hovered, setHovered] = useState(false)

  const Content = () => (
    <span className="relative z-10 flex items-center gap-2">
      {children}
      {href && <ExternalLink className="size-3.5" aria-hidden="true" />}
    </span>
  )

  const commonStyles = `
    relative z-10 inline-flex items-center justify-center gap-2
    border-2 border-current bg-transparent
    font-mono text-xs font-medium uppercase tracking-widest
    px-6 py-3 rounded-none
    transition-all duration-150 ease-out
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
    disabled:opacity-40 disabled:pointer-events-none
    ${hovered ? 'bg-current text-background' : ''}
  `

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${commonStyles} ${className}`}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        {...props}
      >
        <Content />
      </a>
    )
  }

  return (
    <button
      className={`${commonStyles} ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      <Content />
    </button>
  )
}

function ArrowButton({
  direction,
  onClick,
  disabled,
}: { direction: 'left' | 'right'; onClick: () => void; disabled: boolean }) {
  const [hovered, setHovered] = useState(false)

  return (
    <button
      className={`
        fixed top-1/2 z-50 -translate-y-1/2
        flex h-16 w-16 items-center justify-center
        border-2 border-current bg-transparent
        rounded-none
        transition-all duration-150 ease-out
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background
        disabled:opacity-40 disabled:pointer-events-none
        ${direction === 'left' ? 'left-6' : 'right-6'}
        ${hovered ? 'translate-x-[2px] border-[1px] border-current' : ''}
        ${direction === 'left' && hovered ? '-translate-x-1' : ''}
        ${direction === 'right' && hovered ? 'translate-x-1' : ''}
      `}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={direction === 'left' ? 'Previous case study' : 'Next case study'}
    >
      {direction === 'left' ? (
        <ChevronLeft className="size-6" aria-hidden="true" />
      ) : (
        <ChevronRight className="size-6" aria-hidden="true" />
      )}
    </button>
  )
}

function SectionLabel({ index, delay }: { index: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground/60"
    >
      /{index.toString().padStart(2, '0')} {sections[index - 1].label}
    </motion.div>
  )
}

function ProjectPanel({ project, index, isActive }: { project: typeof projects[0]; index: number; isActive: boolean }) {
  const panelX = useMotionValue(0)
  const panelOpacity = useMotionValue(1)

  return (
    <motion.div
      style={{ x: panelX, opacity: panelOpacity }}
      className="relative flex h-[100vh] w-[100vw] flex-col overflow-hidden"
      data-index={index}
    >
      <CaseStudy3DBackground type={project.three} />

      <div className="relative z-10 flex h-full w-full flex-col">
        <div className="fixed left-6 top-6 z-20 flex items-center gap-3">
          <span className="font-mono text-xs font-medium uppercase tracking-[0.4em] text-foreground">
            [ CASE STUDIES ]
          </span>
          <span className="h-px w-16 bg-border" aria-hidden="true" />
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {project.id} / {projects.length.toString().padStart(2, '0')}
          </span>
        </div>

        <main className="flex-1 flex items-start justify-center px-6 md:px-12 py-16">
          <div className="grid w-full max-w-7xl gap-8 lg:grid-cols-[40%_60%]">
            <div className="flex flex-col justify-between space-y-8">
              <div>
                <div className="flex flex-wrap items-baseline gap-3 mb-6">
                  <h1 className="text-6xl font-bold tracking-tighter text-foreground">
                    {project.name}
                  </h1>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-xs">
                  {project.tag}
                </p>
              </div>

              <div className="border-t border-white/10 pt-8 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/60">/ROLE</span>
                    <p className="mt-1 text-foreground">{project.role}</p>
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/60">/TIMELINE</span>
                    <p className="mt-1 text-foreground">{project.timeline}</p>
                  </div>
                  <div className="lg:col-span-2">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground/60">/TYPE</span>
                    <p className="mt-1 text-foreground">{project.tag}</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/10 pt-8 flex flex-wrap gap-4">
                {project.live && (
                  <BrutalButton href={project.live}>
                    VIEW LIVE
                  </BrutalButton>
                )}
                {project.github && (
<BrutalButton href={project.github}>
                  <GitBranch className="size-3.5" aria-hidden="true" />
                  GITHUB
                  </BrutalButton>
                )}
              </div>
            </div>

            <div className="space-y-8">
              {sections.map((section, i) => (
                <div key={section.key} className="border-t border-white/10 pt-8 first:border-none first:pt-0">
                  <SectionLabel index={i + 1} delay={isActive ? i * 0.08 : 0} />
                  <p className="mt-4 text-muted-foreground leading-relaxed text-base md:text-lg">
                    {project[section.key as keyof typeof project]}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </main>

        <div className="fixed bottom-6 left-1/2 z-20 -translate-x-1/2 flex items-center gap-4">
          <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
            {project.id} / {projects.length.toString().padStart(2, '0')}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

export function CaseStudies() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const isAnimating = useRef(false)

  const goTo = useCallback((index: number) => {
    if (isAnimating.current || index < 0 || index >= projects.length) return
    isAnimating.current = true
    setCurrentIndex(index)
    setTimeout(() => { isAnimating.current = false }, 400)
  }, [])

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo])
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') goNext()
      if (e.key === 'ArrowLeft') goPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [goNext, goPrev])

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return
    const deltaX = e.touches[0].clientX - touchStart
    if (Math.abs(deltaX) > 50) {
      if (deltaX > 0) goPrev()
      else goNext()
      setTouchStart(null)
    }
  }

  const handleTouchEnd = () => setTouchStart(null)

  return (
    <section
      id="case-studies"
      className="relative overflow-hidden"
      style={{ height: '100vh' }}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={containerRef}
        className="flex h-full w-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)`, transition: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1)' }}
      >
        {projects.map((project, index) => (
          <ProjectPanel
            key={project.id}
            project={project}
            index={index}
            isActive={index === currentIndex}
          />
        ))}
      </div>

      <ArrowButton direction="left" onClick={goPrev} disabled={currentIndex === 0} />
      <ArrowButton direction="right" onClick={goNext} disabled={currentIndex === projects.length - 1} />
    </section>
  )
}