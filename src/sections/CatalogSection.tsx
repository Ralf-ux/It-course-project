import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface CatalogSectionProps {
  className?: string;
}

export default function CatalogSection({ className = '' }: CatalogSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const centerCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const bottomLeftCardRef = useRef<HTMLDivElement>(null);
  const bottomCenterCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftCard = leftCardRef.current;
    const centerCard = centerCardRef.current;
    const rightCard = rightCardRef.current;
    const bottomLeftCard = bottomLeftCardRef.current;
    const bottomCenterCard = bottomCenterCardRef.current;

    if (!section || !leftCard || !centerCard || !rightCard || !bottomLeftCard || !bottomCenterCard) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0%-30%)
      scrollTl
        .fromTo(leftCard, { y: '80vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo(centerCard, { y: '80vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.06)
        .fromTo(rightCard, { y: '80vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.12)
        .fromTo(bottomLeftCard, { x: '-30vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.12)
        .fromTo(bottomCenterCard, { x: '30vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.14);

      // SETTLE (30%-70%): Hold positions

      // EXIT (70%-100%)
      scrollTl
        .fromTo(leftCard, { y: 0, opacity: 1 }, { y: '-14vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(centerCard, { y: 0, opacity: 1 }, { y: '-14vh', opacity: 0, ease: 'power2.in' }, 0.72)
        .fromTo(rightCard, { y: 0, opacity: 1 }, { y: '-14vh', opacity: 0, ease: 'power2.in' }, 0.74)
        .fromTo(bottomLeftCard, { y: 0, opacity: 1 }, { y: '16vh', opacity: 0, ease: 'power2.in' }, 0.75)
        .fromTo(bottomCenterCard, { y: 0, opacity: 1 }, { y: '16vh', opacity: 0, ease: 'power2.in' }, 0.78);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`pinned-section relative w-screen h-screen section-dark overflow-hidden ${className}`}
    >
      {/* Left Tall Card (Laptop) */}
      <div
        ref={leftCardRef}
        className="absolute left-2 sm:left-4 md:left-[6vw] top-[6vh] sm:top-[10vh] md:top-[14vh] w-[calc(32%-0.5rem)] sm:w-[30vw] md:w-[28vw] h-[45vh] sm:h-[60vh] md:h-[72vh] max-w-[400px] card-rounded overflow-hidden card-shadow"
      >
        <img
          src="/images/grid_laptop_tall.jpg"
          alt="Laptops"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-6 md:left-6">
          <span className="font-mono-label text-white/80 text-[9px] sm:text-[10px] md:text-xs">LAPTOPS</span>
        </div>
      </div>

      {/* Center Tall Card (Phone) */}
      <div
        ref={centerCardRef}
        className="absolute left-[calc(33.33%+0.15rem)] sm:left-[calc(33.33%+0.25rem)] md:left-[36vw] top-[6vh] sm:top-[10vh] md:top-[14vh] w-[calc(32%-0.5rem)] sm:w-[30vw] md:w-[28vw] h-[45vh] sm:h-[60vh] md:h-[72vh] max-w-[400px] card-rounded overflow-hidden card-shadow"
      >
        <img
          src="/images/grid_phone_tall.jpg"
          alt="Phones"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-6 md:left-6">
          <span className="font-mono-label text-white/80 text-[9px] sm:text-[10px] md:text-xs">PHONES</span>
        </div>
      </div>

      {/* Right Tall Card (Audio) */}
      <div
        ref={rightCardRef}
        className="absolute right-2 sm:right-4 md:right-[6vw] top-[6vh] sm:top-[10vh] md:top-[14vh] w-[calc(32%-0.5rem)] sm:w-[30vw] md:w-[28vw] h-[45vh] sm:h-[60vh] md:h-[72vh] max-w-[400px] card-rounded overflow-hidden card-shadow"
      >
        <img
          src="/images/grid_earbuds_tall.jpg"
          alt="Audio"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-2 left-2 sm:top-3 sm:left-3 md:top-6 md:left-6">
          <span className="font-mono-label text-white/80 text-[9px] sm:text-[10px] md:text-xs">AUDIO</span>
        </div>
      </div>

      {/* Bottom Left Small Card */}
      <div
        ref={bottomLeftCardRef}
        className="absolute left-2 sm:left-4 md:left-[6vw] bottom-[6vh] sm:bottom-[8vh] md:bottom-[10vh] w-[calc(48%-0.5rem)] sm:w-[calc(45%-1rem)] md:w-[28vw] h-[22vh] sm:h-[25vh] md:h-[34vh] max-w-[380px] card-rounded overflow-hidden card-shadow hidden sm:block"
      >
        <img
          src="/images/stack_laptop_01.jpg"
          alt="Workspace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Bottom Center Small Card with CTA */}
      <div
        ref={bottomCenterCardRef}
        className="absolute right-2 sm:left-[calc(50%+0.5rem)] md:left-[36vw] bottom-[6vh] sm:bottom-[8vh] md:bottom-[10vh] w-[calc(48%-0.5rem)] sm:w-[calc(45%-1rem)] md:w-[26vw] h-[22vh] sm:h-[25vh] md:h-[34vh] max-w-[350px] card-rounded overflow-hidden card-shadow hidden sm:flex flex-col items-center justify-center bg-[#0B0F17] border border-white/10"
      >
        <button className="flex items-center gap-2 text-white font-medium hover:text-[#2F6BFF] transition-colors text-xs sm:text-sm md:text-base px-3 sm:px-4">
          Browse all categories
          <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>
      </div>
    </section>
  );
}
