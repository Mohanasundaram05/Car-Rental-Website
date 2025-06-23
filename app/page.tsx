import { ParallaxHeroSection } from "@/components/parallax-hero-section"
import { ParallaxCarShowcase } from "@/components/parallax-car-showcase"
import { PopularCarsSection } from "@/components/popular-cars-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { CTASection } from "@/components/cta-section"
import { ParallaxPageIndicator } from "@/components/parallax-page-indicator"

const sections = [
  { id: "hero", name: "Home" },
  { id: "featured", name: "Featured" },
  { id: "popular", name: "Popular Cars" },
  { id: "how-it-works", name: "How It Works" },
  { id: "testimonials", name: "Reviews" },
  { id: "cta", name: "Get Started" },
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <ParallaxPageIndicator sections={sections} />

      <section id="hero">
        <ParallaxHeroSection />
      </section>

      <section id="featured">
        <ParallaxCarShowcase />
      </section>

      <section id="popular">
        <PopularCarsSection />
      </section>

      <section id="how-it-works">
        <HowItWorksSection />
      </section>

      <section id="testimonials">
        <TestimonialsSection />
      </section>

      <section id="cta">
        <CTASection />
      </section>
    </div>
  )
}
