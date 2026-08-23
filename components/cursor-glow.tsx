'use client'

import { useEffect } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
} from 'motion/react'

export function CursorGlow() {
  const x = useMotionValue(-400)
  const y = useMotionValue(-400)
  const sx = useSpring(x, { stiffness: 120, damping: 25 })
  const sy = useSpring(y, { stiffness: 120, damping: 25 })

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX - 200)
      y.set(e.clientY - 200)
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])


  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 hidden size-[400px] rounded-full md:block"
      style={{
        x: sx,
        y: sy,
        background:
          'radial-gradient(circle, color-mix(in srgb, var(--accent) 9%, transparent) 0%, transparent 65%)',
      }}
    />
  )
}
