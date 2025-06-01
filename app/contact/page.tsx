"use client"

import { ContactHeroSection } from "@/components/contact-hero-section"
import { ContactFormSection } from "@/components/contact-form-section"
import { ContactMapSection } from "@/components/contact-map-section"
import { ContactInfoSection } from "@/components/contact-info-section"
import { ParallaxBreadcrumb } from "@/components/parallax-breadcrumb"
import { PageTransition } from "@/components/page-transition"

export default function ContactPage() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white dark:bg-gray-900">
        <ParallaxBreadcrumb
          items={[
            { label: "Home", href: "/" },
            { label: "Contact", href: "/contact" },
          ]}
        />

        <ContactHeroSection />
        <ContactInfoSection />
        <ContactFormSection />
        <ContactMapSection />
      </div>
    </PageTransition>
  )
}
