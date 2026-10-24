import { Analytics } from '@vercel/analytics/next'
import Script from 'next/script'
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
  metadataBase: new URL('https://www.aadisng.in'),
  title: 'Aditya Singh | Full Stack Software Engineer',
  description:
    'Full Stack Software Engineer specializing in AI, Cloud, Automation, and modern web applications.',
  alternates: {
    canonical: 'https://www.aadisng.in',
  },
  openGraph: {
    title: 'Aditya Singh | Full Stack Software Engineer',
    description:
      'Full Stack Software Engineer specializing in AI, Cloud, Automation, and modern web applications.',
    url: 'https://www.aadisng.in',
    type: 'website',
    siteName: 'AADI — Aditya Singh',
    images: [
      {
        url: '/images/portrait.jpg',
        width: 960,
        height: 1280,
        alt: 'Aditya Singh | Full Stack Software Engineer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aditya Singh | Full Stack Software Engineer',
    description:
      'Full Stack Software Engineer specializing in AI, Cloud, Automation, and modern web applications.',
    images: ['/images/portrait.jpg'],
  },
}

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Aditya Singh',
  alternateName: 'AADI',
  url: 'https://www.aadisng.in',
  image: 'https://www.aadisng.in/images/portrait.jpg',
  sameAs: [
    'https://github.com/adisng',
    'https://www.linkedin.com/in/patialapapi03',
  ],
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
        <Script
          id="person-jsonld"
          type="application/ld+json"
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
