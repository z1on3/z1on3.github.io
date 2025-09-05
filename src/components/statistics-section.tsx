'use client'

import { Card, CardContent } from "@/components/ui/card"
import { statistics } from "@/data/statistics"
import { Globe, Users, Briefcase, Smartphone } from "lucide-react"
import { useEffect, useRef, useState } from "react"

function AnimatedCounter({ end, duration = 2000 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationId: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationId = requestAnimationFrame(animate)
      }
    }

    animationId = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationId)
  }, [isVisible, end, duration])

  return <span ref={ref}>{count}</span>
}

export function StatisticsSection() {
  return (
    <section className="py-20" style={{background: 'linear-gradient(to right, #222831, #31363F, #222831)', color: '#EEEEEE'}}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statistics.map((stat) => (
            <Card key={stat.id} className="text-center hover:opacity-90 transition-all duration-300" style={{backgroundColor: 'rgba(118, 171, 174, 0.1)', borderColor: 'rgba(118, 171, 174, 0.3)'}}>
              <CardContent className="p-6">
                <div className="text-4xl mb-4" style={{color: '#76ABAE'}}>
                  {stat.icon === 'Globe' && <Globe size={48} />}
                  {stat.icon === 'Users' && <Users size={48} />}
                  {stat.icon === 'Briefcase' && <Briefcase size={48} />}
                  {stat.icon === 'Smartphone' && <Smartphone size={48} />}
                </div>
                <div className="text-3xl md:text-4xl font-bold mb-2" style={{color: '#FFFFFF'}}>
                  <AnimatedCounter end={stat.value} />
                  {stat.suffix && <span>{stat.suffix}</span>}
                </div>
                <div className="text-sm md:text-base uppercase tracking-wide" style={{color: '#76ABAE'}}>
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}