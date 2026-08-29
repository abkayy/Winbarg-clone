import { HeroIntroSection } from "@/components/home/HeroIntroSection/HeroIntroSection";
import { HeroVisualSection } from "@/components/home/HeroVisualSection/HeroVisualSection";
import { ExpertiseOverviewSection } from "@/components/home/ExpertiseOverviewSection/ExpertiseOverviewSection";
import { QualityHighlightsSection } from "@/components/home/QualityHighlightsSection/QualityHighlightsSection";
import { ProjectsShowcaseSection } from "@/components/home/ProjectsShowcaseSection/ProjectsShowcaseSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-white relative overflow-hidden">
      <HeroIntroSection />
      <HeroVisualSection />
      <ExpertiseOverviewSection />
      <QualityHighlightsSection />
      <ProjectsShowcaseSection />
    </div>
  );
}
