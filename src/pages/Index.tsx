import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ExperienceSection from "@/components/ExperienceSection";
import EducationSection from "@/components/EducationSection";
import BookingSection from "@/components/BookingSection";
import ContactSection from "@/components/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <EducationSection />
      <BookingSection />
      <ContactSection />
      <footer className="py-8 text-center text-xs text-muted-foreground border-t border-border/30">
        © {new Date().getFullYear()} Idderf Salem. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
