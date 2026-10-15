import { HeroSection } from "@/components/sections/hero-section";
import { CapabilitiesSection } from "@/components/sections/capabilities-section";
import { FeaturedProjects } from "@/components/sections/featured-projects";
import { ProjectGrid } from "@/components/sections/project-grid";
import { ApproachSection } from "@/components/sections/approach-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function HomePage() {
  return (
    <main id="main" className="relative">
      <HeroSection />
      <CapabilitiesSection />
      <FeaturedProjects />
      <ProjectGrid />
      <ApproachSection />
      <AboutSection />
      <ContactSection />
    </main>
  );
}
