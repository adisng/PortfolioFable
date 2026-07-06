'use client'

import Image from 'next/image'
import { useState } from 'react'
import { ArrowUpRight, Copy, Check } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { Reveal } from '@/components/reveal'

const stats = [
  { value: 'AWS', label: 'Certified Cloud Practitioner' },
  { value: 'MCA', label: 'MATS University, Raipur' },
  { value: 'AI', label: 'Agents, RAG & automation' },
  { value: 'SaaS', label: 'Scalable full stack apps' },
]

export function Bento() {
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    await navigator.clipboard.writeText('singh09aaditya@gmail.com')
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="about" className="mx-auto max-w-7xl px-4 py-16 md:py-24">
      <div className="grid gap-4 lg:grid-cols-3">

        {/* Profile card */}
        <Reveal>
          <article className="glass flex flex-col p-4 lg:p-6">
            <p className="mb-3 font-mono text-xs tracking-[0.3em] text-muted-foreground">01/</p>
            <h2 className="text-3xl font-bold tracking-wide text-foreground">
              Aditya <span className="font-serif italic text-muted-foreground">Singh</span>
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">Raipur, India</p>
            <div className="relative mt-6 aspect-[3/4] w-full overflow-hidden border-2 border-border">
              <Image src="/images/portrait.jpg" alt="Portrait of Aditya Singh" width={960} height={1280} className="h-auto w-full transition-transform duration-700 hover:scale-105" />
            </div>
            <div className="mt-6 flex items-center justify-center gap-3">
              <a href="https://github.com/adisng" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile" className="flex size-11 items-center justify-center border-2 border-border bg-secondary text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground">
                <GithubIcon className="size-4" />
              </a>
              <a href="https://www.linkedin.com/in/patialapapi03" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile" className="flex size-11 items-center justify-center border-2 border-border bg-secondary text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground">
                <LinkedinIcon className="size-4" />
              </a>
            </div>
          </article>
        </Reveal>

        {/* About + Connect column */}
        <div className="flex flex-col gap-4 lg:col-span-2">

          {/* About card */}
          <Reveal delay={0.1}>
            <article className="glass p-4 lg:p-6">
              <p className="font-mono text-xs font-medium uppercase tracking-[0.3em] text-muted-foreground">02/ About Me</p>
              <h3 className="mt-4 text-2xl font-bold text-foreground">
                Complete products, <span className="font-serif italic font-normal text-muted-foreground">idea to deployment.</span>
              </h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                I&apos;m an MCA student and Full Stack Software Engineer passionate about building AI-native products, cloud applications, intelligent automation, and immersive digital experiences. Rather than simply writing code, I enjoy building complete digital products &mdash; combining clean architecture, exceptional performance, and thoughtful design.
              </p>
              <p className="mt-4 leading-relaxed text-muted-foreground">
                I thrive at the intersection of engineering and creativity &mdash; whether that&apos;s designing scalable backend systems, crafting pixel-perfect interfaces, or wiring up AI agents that actually solve real problems.
              </p>
            </article>
          </Reveal>

          {/* Stats + Connect row */}
          <div className="grid gap-4 sm:grid-cols-2">

            {/* Stats card */}
            <Reveal delay={0.15}>
              <article className="glass grid grid-cols-2 gap-px bg-border p-0">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col justify-center bg-card p-4">
                    <p className="text-2xl font-black text-foreground">{stat.value}</p>
                    <p className="mt-1 font-mono text-[10px] uppercase leading-tight tracking-wider text-muted-foreground">{stat.label}</p>
                  </div>
                ))}
              </article>
            </Reveal>

            {/* Connect card */}
            <Reveal delay={0.2}>
              <article className="glass flex flex-col p-4 lg:p-6">
                <span className="inline-flex w-fit items-center gap-2 border-2 border-accent bg-secondary px-3 py-1.5 font-mono text-xs font-medium uppercase tracking-wider text-foreground">
                  <span className="size-2 rounded-full bg-accent" aria-hidden="true" />
                  Available for work
                </span>
                <h3 className="mt-4 text-xl font-bold uppercase leading-tight text-foreground">
                  Let&apos;s build something{' '}
                  <span className="font-serif normal-case italic font-normal text-muted-foreground">that actually works.</span>
                </h3>
                <button type="button" onClick={copyEmail} className="mt-4 flex items-center gap-2 break-all text-left font-serif text-base italic text-foreground transition-colors hover:text-accent">
                  {copied ? <Check className="size-4 shrink-0 text-accent" aria-hidden="true" /> : <Copy className="size-4 shrink-0" aria-hidden="true" />}
                  singh09aaditya@gmail.com
                </button>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  {copied ? '[ Copied ]' : '[ Tap to copy ]'}
                </p>
                <a href="#contact" className="brutal-shadow-accent mt-4 flex items-center justify-center gap-2 border-2 border-foreground bg-primary py-3 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5">
                  Connect Now <ArrowUpRight className="size-4" />
                </a>
              </article>
            </Reveal>

          </div>
        </div>

      </div>
    </section>
  )
}
