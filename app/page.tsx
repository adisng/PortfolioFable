import dynamic from 'next/dynamic'
import { SiteNav } from '@/components/site-nav'
import { CursorGlow } from '@/components/cursor-glow'
import { Hero } from '@/components/hero'
import { Bento } from '@/components/bento'

const Skills = dynamic(() => import('@/components/skills').then(m => ({ default: m.Skills })))
const Projects = dynamic(() => import('@/components/projects').then(m => ({ default: m.Projects })))
const Services = dynamic(() => import('@/components/services').then(m => ({ default: m.Services })))
const Experience = dynamic(() => import('@/components/experience').then(m => ({ default: m.Experience })))
const Process = dynamic(() => import('@/components/process').then(m => ({ default: m.Process })))
const Contact = dynamic(() => import('@/components/contact').then(m => ({ default: m.Contact })))
const Footer = dynamic(() => import('@/components/footer').then(m => ({ default: m.Footer })))

export default function Page() {
  return (
    <>
      <CursorGlow />
      <SiteNav />
      <main>
        <Hero />
        <Bento />
        <Skills />
        <Projects />
        <Services />
        <Experience />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
