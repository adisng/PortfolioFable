'use client'

import { Reveal } from '@/components/reveal'

const groups: { name: string; items: string[] }[] = [
  {
    name: 'Frontend',
    items: [
      'React',
      'Next.js',
      'TypeScript',
      'JavaScript',
      'Tailwind CSS',
      'Three.js',
      'React Three Fiber',
      'GSAP',
      'Framer Motion',
      'HTML5',
      'CSS3',
      'Vite',
      'WordPress',
    ],
  },
  {
    name: 'Backend',
    items: [
      'Python',
      'FastAPI',
      'Node.js',
      'Express',
      'REST APIs',
      'Authentication',
      'JWT',
    ],
  },
  {
    name: 'Databases',
    items: ['PostgreSQL', 'MongoDB', 'SQLite', 'Redis'],
  },
  {
    name: 'AI',
    items: [
      'OpenAI',
      'Google Gemini',
      'LangChain',
      'RAG',
      'OCR',
      'Whisper',
      'Prompt Engineering',
      'AI Agents',
    ],
  },
  {
    name: 'Automation',
    items: [
      'n8n',
      'API Integrations',
      'Webhooks',
      'Google Sheets',
      'OCR.space',
      'Email Automation',
    ],
  },
  {
    name: 'Cloud',
    items: ['AWS', 'Docker', 'Linux', 'GitHub Actions', 'Vercel', 'Netlify'],
  },
]

export function Skills() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-24 md:py-32">
      <Reveal>
        <p className="text-center font-mono text-xs font-medium uppercase tracking-[0.4em] text-muted-foreground">
          [ Technical Arsenal ]
        </p>
        <h2 className="headline-giant mt-4 text-balance text-center text-5xl uppercase text-foreground md:text-7xl">
          The Magic{' '}
          <span className="font-serif normal-case italic font-normal text-accent">
            Behind
          </span>
        </h2>
      </Reveal>

      <div className="mt-16 flex flex-col gap-10">
        {groups.map((group, gi) => (
          <Reveal key={group.name} delay={gi * 0.08}>
            <div className="flex flex-col items-center gap-4">
              <h3 className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
                /{group.name}
              </h3>
              <ul className="flex flex-wrap justify-center gap-3">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="brutal-hover border-2 border-border bg-card px-5 py-2.5 font-mono text-sm font-medium text-foreground"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
