import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './sections/Navigation';
import HeroSection from './sections/HeroSection';
import ValueSection from './sections/ValueSection';
import ShowcaseSection from './sections/ShowcaseSection';
import CatalogSection from './sections/CatalogSection';
import FeatureSection from './sections/FeatureSection';
import PromiseSection from './sections/PromiseSection';
import ContactSection from './sections/ContactSection';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for all ScrollTriggers to be created
    const timeout = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      // Build ranges and snap targets from pinned sections
      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      // Global snap configuration
      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            // Check if within any pinned range (with buffer)
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            
            if (!inPinned) return value; // Flowing section: free scroll

            // Find nearest pinned center
            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timeout);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative">
      <Navigation />
      
      {/* Section 1: Hero */}
      <HeroSection className="z-10" />
      
      {/* Section 2: Value Proposition */}
      <ValueSection className="z-20" />
      
      {/* Section 3: Laptops & Accessories Showcase */}
      <ShowcaseSection className="z-30" />
      
      {/* Section 4: Catalog Grid */}
      <CatalogSection className="z-40" />
      
      {/* Section 5: Work Smart */}
      <FeatureSection
        className="z-50"
        leftImage="/images/feature_laptop_01.jpg"
        rightImage="/images/feature_phone_01.jpg"
        leftLabel="LAPTOPS"
        leftHeadline="Work smart."
        rightLabel="PHONES"
        rightHeadline="Stay connected."
      />
      
      {/* Section 6: Create & Communicate */}
      <FeatureSection
        className="z-60"
        leftImage="/images/feature_earbuds_01.jpg"
        rightImage="/images/feature_phone_02.jpg"
        leftLabel="AUDIO"
        leftHeadline="Create in focus."
        rightLabel="PHONES"
        rightHeadline="Communicate clearly."
      />
      
      {/* Section 7: Power & Performance */}
      <FeatureSection
        className="z-70"
        leftImage="/images/feature_laptop_02.jpg"
        rightImage="/images/feature_phone_03.jpg"
        leftLabel="LAPTOPS"
        leftHeadline="Power through."
        rightLabel="PHONES"
        rightHeadline="Performance in your palm."
      />
      
      {/* Section 8: Sound & Style */}
      <FeatureSection
        className="z-80"
        leftImage="/images/feature_earbuds_02.jpg"
        rightImage="/images/feature_phone_04.jpg"
        leftLabel="AUDIO"
        leftHeadline="Sound with style."
        rightLabel="PHONES"
        rightHeadline="Designed to match you."
      />
      
      {/* Section 9: Focus & Flow */}
      <FeatureSection
        className="z-90"
        leftImage="/images/feature_laptop_03.jpg"
        rightImage="/images/hero_phone.jpg"
        leftLabel="LAPTOPS"
        leftHeadline="Focus without friction."
        rightLabel="PHONES"
        rightHeadline="Everything within reach."
      />
      
      {/* Section 10: Listen & Live */}
      <FeatureSection
        className="z-[100]"
        leftImage="/images/feature_earbuds_03.jpg"
        rightImage="/images/grid_phone_tall.jpg"
        leftLabel="AUDIO"
        leftHeadline="Listen louder."
        rightLabel="PHONES"
        rightHeadline="Live sharper."
      />
      
      {/* Section 11: Promise (Light Section) */}
      <PromiseSection className="z-[110]" />
      
      {/* Section 12: Contact */}
      <ContactSection className="z-[120]" />
    </div>
  );
}

export default App;
