import { useEffect, useRef, useState, type ElementType, type ReactNode } from 'react'

type Props = {
  children: ReactNode
  /** Stagger position within a group. Each step adds 60ms. */
  index?: number
  /** Distance travelled on entry, in px. */
  y?: number
  className?: string
  as?: ElementType
}

/**
 * Scroll-entry reveal.
 *
 * Why it exists: the page is long and image-led, and a section that fades up
 * as it arrives tells the reader where the next unit of content begins.
 *
 * How it works: one IntersectionObserver per element, disconnected the moment
 * the element has been seen, so nothing observes anything after first paint
 * of that section. No scroll listener, no animation library, and the movement
 * itself is a CSS transition on transform and opacity (see index.css).
 *
 * Under prefers-reduced-motion the element mounts visible and the observer is
 * never created.
 */
export function Reveal({
  children,
  index = 0,
  y = 24,
  className = '',
  as: Tag = 'div',
}: Props) {
  const ref = useRef<HTMLElement>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (
      typeof window === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
      !('IntersectionObserver' in window)
    ) {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setShown(true)
        observer.disconnect()
      },
      { threshold: 0.15, rootMargin: '0px 0px -80px 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <Tag
      ref={ref}
      data-shown={shown}
      style={
        {
          '--reveal-y': `${y}px`,
          '--reveal-delay': `${index * 60}ms`,
        } as React.CSSProperties
      }
      className={`reveal ${className}`}
    >
      {children}
    </Tag>
  )
}
