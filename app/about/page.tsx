"use client"
import { AboutHeroSection } from "@/components/about-hero-section"
import { MissionVisionValues } from "@/components/mission-vision-values"
import { TeamSection } from "@/components/team-section"
import { ContactFormSection } from "@/components/contact-form-section"
import { ScrollReveal } from "@/components/scroll-reveal"

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <AboutHeroSection />

      {/* Mission, Vision, Values */}
      <ScrollReveal>
        <MissionVisionValues />
      </ScrollReveal>

      {/* Team Section */}
      <ScrollReveal>
        <TeamSection />
      </ScrollReveal>

      {/* Contact Form Section */}
      <ScrollReveal>
        <ContactFormSection />
      </ScrollReveal>
    </div>
  )
}
