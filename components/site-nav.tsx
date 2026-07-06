'use client'

import { useState } from 'react'
import { motion } from 'motion/react'
import { Menu, X } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'

const links = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
]

export function SiteNav() {
  const [open, setOpen] = useState(false)

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2"
    >
      <nav
        aria-label="Main navigation"
        className="glass flex items-center justify-between bg-background/95 py-2 pl-5 pr-2 backdrop-blur-sm"
      >
        <a
          href="#top"
          className="font-mono text-sm font-bold uppercase tracking-widest text-foreground"
        >
          [AADI]
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="px-4 py-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="brutal-shadow-accent hidden border-2 border-foreground bg-primary px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 sm:inline-flex"
          >
            Contact
          </a>
          <button
            type="button"
            className="flex size-10 items-center justify-center border-2 border-border text-foreground md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? 'Close menu' : 'Open menu'}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.ul
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mt-3 flex flex-col gap-1 bg-background/95 p-3 backdrop-blur-sm md:hidden"
        >
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              >
                {link.label}
              </a>
            </li>
          ))}
          <li className="mt-2 px-1">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="brutal-shadow-accent flex w-full items-center justify-center border-2 border-foreground bg-primary px-5 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-primary-foreground"
            >
              Contact
            </a>
          </li>
        </motion.ul>
      )}
    </motion.header>
  )
}
