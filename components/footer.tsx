'use client'

import { ArrowUp, Mail } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from '@/components/brand-icons'

const columns = [
  {
    title: 'General',
    links: [
      { label: 'Home', href: '#top' },
      { label: 'About', href: '#about' },
      { label: 'Work', href: '#work' },
    ],
  },
  {
    title: 'Explore',
    links: [
      { label: 'Services', href: '#services' },
      { label: 'Process', href: '#process' },
      { label: 'Contact', href: '#contact' },
    ],
  },
  {
    title: 'Projects',
    links: [
      { label: 'AI Invoice Processing', href: '#work' },
      { label: 'Medical AI Triage', href: '#work' },
      { label: 'Duck Hunter', href: '#work' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-4 pb-8 pt-12">
      <div className="glass p-8 md:p-12">
        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <p className="headline-giant text-5xl uppercase text-foreground">
              Aadi
            </p>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Building intelligent products, scalable cloud systems, AI-powered
              applications, and premium digital experiences &mdash; software
              that is fast, scalable, and memorable.
            </p>
          </div>
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-8 sm:grid-cols-3"
          >
            {columns.map((column) => (
              <div key={column.title}>
                <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                  /{column.title}
                </h3>
                <ul className="mt-4 flex flex-col gap-3">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-foreground transition-colors hover:text-accent"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-between gap-6 border-t-2 border-border pt-8">
          <div>
            <p className="text-sm font-semibold text-foreground">
              &copy; {new Date().getFullYear()} Aditya Singh
            </p>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              /Built with Next.js, Tailwind &amp; Motion
            </p>
          </div>
          <div className="flex items-center gap-3">
            {[
              {
                icon: GithubIcon,
                label: 'GitHub',
                href: 'https://github.com/adisng',
                target: '_blank',
                rel: 'noopener noreferrer',
              },
              {
                icon: LinkedinIcon,
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/in/patialapapi03',
                target: '_blank',
                rel: 'noopener noreferrer',
              },
              {
                icon: Mail,
                label: 'Email',
                href: 'mailto:singh09aaditya@gmail.com',
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={'target' in social ? social.target : undefined}
                rel={'rel' in social ? social.rel : undefined}
                aria-label={social.label}
                className="flex size-11 items-center justify-center border-2 border-border bg-secondary text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                <social.icon className="size-4" aria-hidden="true" />
              </a>
            ))}
            <a
              href="#top"
              aria-label="Back to top"
              className="brutal-hover flex size-11 items-center justify-center border-2 border-border text-foreground"
            >
              <ArrowUp className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
