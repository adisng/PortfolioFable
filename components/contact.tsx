'use client'

import { useState } from 'react'
import type { FormEvent } from 'react'
import { ArrowUpRight, Check, Download, Mail, MapPin } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'
import { Reveal } from '@/components/reveal'

export function Contact() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="contact" className="relative overflow-hidden px-4 py-24 md:py-32">
      <div
        aria-hidden="true"
        className="animate-drift absolute right-0 top-0 size-96 rounded-full bg-accent/10 blur-[120px]"
      />

      <div className="relative mx-auto max-w-5xl">
        <Reveal>
          <h2 className="headline-giant text-balance text-6xl uppercase text-foreground md:text-[7rem]">
            Let&apos;s create{' '}
            <span className="font-serif normal-case italic font-normal text-muted-foreground">
              something real.
            </span>
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-muted-foreground">
            Have a product in mind, or want to explore what AI can do for your
            business? Tell me about it &mdash; I reply within 24 hours.
          </p>

          <ul className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4">
            <li>
              <a
                href="mailto:singh09aaditya@gmail.com"
                className="flex items-center gap-2 font-mono text-sm text-foreground transition-colors hover:text-accent"
              >
                <Mail className="size-4 text-accent" aria-hidden="true" />
                singh09aaditya@gmail.com
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/patialapapi03"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-sm text-foreground transition-colors hover:text-accent"
              >
                <LinkedinIcon className="size-4 text-accent" />
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/adisng"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 font-mono text-sm text-foreground transition-colors hover:text-accent"
              >
                <GithubIcon className="size-4 text-accent" />
                GitHub
              </a>
            </li>
            <li className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
              <MapPin className="size-4 text-accent" aria-hidden="true" />
              Raipur, India
            </li>
            <li>
              <a
                href="/resume.pdf"
                download="Aditya-Singh-Resume.pdf"
                className="flex items-center gap-2 font-mono text-sm text-muted-foreground underline decoration-accent decoration-2 underline-offset-4 transition-colors hover:text-accent"
              >
                <Download className="size-4 text-accent" aria-hidden="true" />
                Resume
              </a>
            </li>
          </ul>
        </Reveal>

        <Reveal delay={0.15}>
          {sent ? (
            <div className="glass mt-12 flex items-center gap-4 p-8">
              <span className="flex size-12 items-center justify-center border-2 border-foreground bg-accent text-accent-foreground">
                <Check className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-lg font-bold text-foreground">
                  Message sent
                </p>
                <p className="text-sm text-muted-foreground">
                  Thanks for reaching out &mdash; I&apos;ll get back to you
                  within 24 hours.
                </p>
              </div>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="glass mt-12 grid gap-6 p-8 md:grid-cols-2 md:p-10"
            >
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="name"
                  className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground"
                >
                  /Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  autoComplete="name"
                  className="border-2 border-input bg-secondary px-5 py-4 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                  placeholder="Jane Doe"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground"
                >
                  /Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  className="border-2 border-input bg-secondary px-5 py-4 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                  placeholder="jane@company.com"
                />
              </div>
              <div className="flex flex-col gap-2 md:col-span-2">
                <label
                  htmlFor="message"
                  className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground"
                >
                  /Project details
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="resize-none border-2 border-input bg-secondary px-5 py-4 text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none"
                  placeholder="Tell me about your project, timeline, and goals..."
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-4 md:col-span-2">
                <p className="flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  <span className="size-2 bg-accent" aria-hidden="true" />
                  Currently available for new projects
                </p>
                <button
                  type="submit"
                  className="brutal-shadow-accent flex items-center gap-2 border-2 border-foreground bg-primary px-8 py-4 font-mono text-sm font-bold uppercase tracking-wider text-primary-foreground transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
                >
                  Send Message <ArrowUpRight className="size-4" />
                </button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  )
}
