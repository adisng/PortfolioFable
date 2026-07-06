import { SiteNav } from '@/components/site-nav'
import { CursorGlow } from '@/components/cursor-glow'
import { Hero } from '@/components/hero'
import { Bento } from '@/components/bento'
import { Skills } from '@/components/skills'
import { Projects } from '@/components/projects'
import { Services } from '@/components/services'
import { Experience } from '@/components/experience'
import { Process } from '@/components/process'
import { Contact } from '@/components/contact'
import { Footer } from '@/components/footer'

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
