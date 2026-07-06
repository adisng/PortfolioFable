import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Archivo, Instrument_Serif } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import './globals.css'

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-archivo',
  weight: ['300', '400', '500', '600', '700', '800', '900'],
})

const instrument = Instrument_Serif({
  subsets: ['latin'],
  variable: '--font-instrument',
  weight: '400',
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  title: 'Aditya Singh | Full Stack Software Engineer',
  description:
    'Full Stack Software Engineer specializing in AI, Cloud, Automation, and modern web applications.',
  generator: 'v0.app',
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Aditya Singh | Full Stack Software Engineer',
    description:
      'Full Stack Software Engineer specializing in AI, Cloud, Automation, and modern web applications.',
    type: 'website',
    siteName: 'AADI — Aditya Singh',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Singh | Full Stack Software Engineer',
    description:
      'Full Stack Software Engineer specializing in AI, Cloud, Automation, and modern web applications.',
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Aditya Singh',
  alternateName: 'AADI',
  jobTitle: 'Full Stack Software Engineer',
  description:
    'Full Stack Software Engineer specializing in AI, Cloud, Automation, and modern web applications.',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Raipur',
    addressCountry: 'IN',
  },
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'MATS University',
    },
    {
      '@type': 'CollegeOrUniversity',
      name: 'St. Vincent Pallotti College',
    },
  ],
  hasCredential: {
    '@type': 'EducationalOccupationalCredential',
    name: 'AWS Certified Cloud Practitioner',
  },
  knowsAbout: [
    'Full Stack Development',
    'AI Engineering',
    'Cloud Architecture',
    'Workflow Automation',
    'React',
    'Python',
  ],
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#F7F4EC' },
    { media: '(prefers-color-scheme: dark)', color: '#0D0D0D' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`bg-background ${archivo.variable} ${instrument.variable}`}
    >
      <body className="grain font-sans antialiased">
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          {children}
        </ThemeProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
