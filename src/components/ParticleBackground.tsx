'use client'

import { useEffect, useRef } from 'react'

type Dot = {
  x: number; y: number
  vx: number; vy: number
  r: number; a: number
  rgb: string
  waveAmp: number; waveFreq: number; wavePhase: number; waveAxis: 0 | 1
}

const COLORS = ['255,255,255', '232,228,220', '184,168,138', '138,154,130']
const MOUSE_RADIUS = 150
const FORCE = 0.28
const MAX_SPEED = 2.8
const DAMPEN = 0.97
const CONNECT_DIST = 88
const WAVE_FRAC = 0.18
const SCROLL_MULT_DESKTOP = 0.028
const SCROLL_MULT_MOBILE = 0.0003
const SCROLL_DECAY = 0.94

export function ParticleBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const isMobile = window.innerWidth < 768
    const COUNT = isMobile ? 110 : 260
    const SCROLL_MULT = isMobile ? SCROLL_MULT_MOBILE : SCROLL_MULT_DESKTOP

    let W = 0, H = 0, mouseX = -9999, mouseY = -9999, raf = 0, frame = 0
    let lastScrollY = window.scrollY, scrollVY = 0

    function resize() {
      W = canvas!.width = window.innerWidth
      H = canvas!.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const dots: Dot[] = Array.from({ length: COUNT }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
      r: Math.random() * 1.5 + 0.4,
      a: Math.random() * 0.18 + 0.12,
      rgb: COLORS[Math.floor(Math.random() * COLORS.length)],
      waveAmp: i < COUNT * WAVE_FRAC ? Math.random() * 28 + 8 : 0,
      waveFreq: Math.random() * 0.008 + 0.002,
      wavePhase: Math.random() * Math.PI * 2,
      waveAxis: Math.random() > 0.5 ? 0 : 1,
    }))

    function onMove(e: MouseEvent) { mouseX = e.clientX; mouseY = e.clientY }
    function onLeave() { mouseX = -9999; mouseY = -9999 }
    function onScroll() {
      const delta = window.scrollY - lastScrollY
      scrollVY += delta * SCROLL_MULT
      lastScrollY = window.scrollY
    }
    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)
    window.addEventListener('scroll', onScroll, { passive: true })

    function tick() {
      ctx!.clearRect(0, 0, W, H)
      frame++

      scrollVY *= SCROLL_DECAY

      // connection lines
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dx = dots[i].x - dots[j].x
          const dy = dots[i].y - dots[j].y
          const d2 = dx * dx + dy * dy
          if (d2 < CONNECT_DIST * CONNECT_DIST) {
            const t = 1 - Math.sqrt(d2) / CONNECT_DIST
            ctx!.beginPath()
            ctx!.moveTo(dots[i].x, dots[i].y)
            ctx!.lineTo(dots[j].x, dots[j].y)
            ctx!.strokeStyle = `rgba(184,168,138,${t * 0.055})`
            ctx!.lineWidth = 0.5
            ctx!.stroke()
          }
        }
      }

      for (const d of dots) {
        d.vy += scrollVY

        const dx = d.x - mouseX
        const dy = d.y - mouseY
        const dist = Math.hypot(dx, dy)
        if (dist < MOUSE_RADIUS && dist > 0) {
          const f = ((MOUSE_RADIUS - dist) / MOUSE_RADIUS) * FORCE
          d.vx += (dx / dist) * f
          d.vy += (dy / dist) * f
        }

        d.vx *= DAMPEN
        d.vy *= DAMPEN

        const speed = Math.hypot(d.vx, d.vy)
        if (speed > MAX_SPEED) {
          d.vx = (d.vx / speed) * MAX_SPEED
          d.vy = (d.vy / speed) * MAX_SPEED
        }

        d.x = (d.x + d.vx + W) % W
        d.y = (d.y + d.vy + H) % H

        const waveOffset = d.waveAmp * Math.sin(frame * d.waveFreq + d.wavePhase)
        const drawX = d.waveAxis === 0 ? d.x + waveOffset * 0.25 : d.x
        const drawY = d.waveAxis === 1 ? d.y + waveOffset * 0.25 : d.y

        ctx!.beginPath()
        ctx!.arc(drawX, drawY, d.r, 0, Math.PI * 2)
        ctx!.fillStyle = `rgba(${d.rgb},${d.a})`
        ctx!.fill()
      }

      raf = requestAnimationFrame(tick)
    }
    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{ position: 'fixed', inset: 0, zIndex: -1, pointerEvents: 'none' }}
    />
  )
}
