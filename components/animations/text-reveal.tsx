"use client"

import { useRef, useEffect, type ReactNode } from "react"

interface TextRevealProps {
  children: ReactNode
  className?: string
  threshold?: number
  delay?: number
  duration?: number
  staggerDelay?: number
  once?: boolean
}

export default function TextReveal({
  children,
  className = "",
  threshold = 0.1,
  delay = 0,
  duration = 800,
  staggerDelay = 50,
  once = true,
}: TextRevealProps) {
  const textRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const textElement = textRef.current
    if (!textElement) return

    // Split text into words and wrap each in a span
    const processTextNodes = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const words = node.textContent?.split(/\s+/) || []
        const fragment = document.createDocumentFragment()

        words.forEach((word, index) => {
          const wordSpan = document.createElement("span")
          wordSpan.textContent = word + " "
          wordSpan.style.display = "inline-block"
          wordSpan.style.opacity = "0"
          wordSpan.style.transform = "translateY(20px)"
          wordSpan.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${
            delay + index * staggerDelay
          }ms, transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1) ${delay + index * staggerDelay}ms`
          fragment.appendChild(wordSpan)
        })

        node.parentNode?.replaceChild(fragment, node)
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        Array.from(node.childNodes).forEach(processTextNodes)
      }
    }

    Array.from(textElement.childNodes).forEach(processTextNodes)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const wordSpans = textElement.querySelectorAll("span")
            wordSpans.forEach((span) => {
              span.style.opacity = "1"
              span.style.transform = "translateY(0)"
            })

            if (once) {
              observer.unobserve(entry.target)
            }
          } else if (!once) {
            const wordSpans = textElement.querySelectorAll("span")
            wordSpans.forEach((span) => {
              span.style.opacity = "0"
              span.style.transform = "translateY(20px)"
            })
          }
        })
      },
      { threshold },
    )

    observer.observe(textElement)

    return () => {
      observer.disconnect()
    }
  }, [threshold, delay, duration, staggerDelay, once])

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  )
}
