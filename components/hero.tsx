'use client'

import dynamic from 'next/dynamic'
import { motion, useReducedMotion } from 'motion/react'
import { MapPin, Sparkles, ArrowDown } from 'lucide-react'
import { StaggerWords } from '@/components/reveal'

const Hero3D = dynamic(() => import('@/components/hero-3d'), { ssr: false })

export function Hero() {
  const reduce = useReducedMotion()

  return (
    <section
      id="top"
      className="blueprint-grid relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-4"
    >
      {/* Ambient orbs */}
      <div
        aria-hidden="true"
        className="animate-drift absolute -left-40 top-1/4 size-[32rem] rounded-full bg-accent/10 blur-[120px]"
      />
      <div
        aria-hidden="true"
        className="animate-drift-slow absolute -right-40 bottom-1/4 size-[28rem] rounded-full bg-accent/5 blur-[100px]"
      />

      {/* Cinematic 3D centerpiece */}
      {!reduce && <Hero3D />}

      <div className="relative z-10 flex flex-col items-center text-center">
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.1 }}
          className="mb-4 flex items-center gap-2.5 font-mono text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground"
        >
          <span className="relative flex size-2.5" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping bg-accent opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex size-2.5 bg-accent" />
          </span>
          Available for Work
        </motion.p>
        <motion.p
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-6 border-2 border-border px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground"
        >
          [ Full Stack &middot; AI &middot; Cloud Engineer ]
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, scale: 0.96, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="headline-giant text-[clamp(5rem,22vw,17rem)] uppercase text-foreground"
        >
          Aadi
        </motion.h1>

        <p className="mt-6 font-mono text-sm uppercase tracking-[0.35em] text-muted-foreground md:text-base">
          <StaggerWords text="Building intelligent products that are" />
        </p>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-2 font-serif text-3xl sm:text-5xl italic text-foreground md:text-7xl"
        >
          fast, scalable &amp;{' '}
          <span className="brutal-underline">memorable.</span>
        </motion.p>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#work"
            className="brutal-shadow-accent border-2 border-foreground bg-primary px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="brutal-hover border-2 border-border bg-card px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider text-foreground"
          >
            Get In Touch
          </a>
        </motion.div>
      </div>

      {/* Corner labels */}
      <div className="absolute bottom-8 left-6 hidden flex-col items-start gap-1 font-mono md:flex lg:left-12">
        <MapPin className="mb-1 size-4 text-accent" aria-hidden="true" />
        <p className="text-xs font-semibold uppercase tracking-widest text-foreground">
          /Based in Raipur,
        </p>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          India
        </p>
      </div>
      <div className="absolute bottom-8 right-6 hidden flex-col items-end gap-1 font-mono md:flex lg:right-12">
        <Sparkles className="mb-1 size-4 text-accent" aria-hidden="true" />
        <p className="text-xs font-semibold uppercase tracking-widest text-foreground">
          /AI Engineer,
        </p>
        <p className="text-xs uppercase tracking-widest text-muted-foreground">
          Cloud &amp; Automation
        </p>
      </div>

      <motion.a
        href="#about"
        aria-label="Scroll to about section"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground"
        animate={reduce ? undefined : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ArrowDown className="size-5" />
      </motion.a>
    </section>
  )
}
