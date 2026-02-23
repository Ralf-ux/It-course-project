import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ShowcaseSectionProps {
  className?: string;
}

export default function ShowcaseSection({ className = '' }: ShowcaseSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const bottomLeftCardRef = useRef<HTMLDivElement>(null);
  const bottomCenterCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const leftCard = leftCardRef.current;
    const rightCard = rightCardRef.current;
    const bottomLeftCard = bottomLeftCardRef.current;
    const bottomCenterCard = bottomCenterCardRef.current;

    if (!section || !leftCard || !rightCard || !bottomLeftCard || !bottomCenterCard) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0%-30%)
      scrollTl
        .fromTo(leftCard, { x: '-70vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo(rightCard, { x: '70vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo(bottomLeftCard, { y: '60vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1)
        .fromTo(bottomCenterCard, { y: '60vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.14);

      // SETTLE (30%-70%): Hold positions

      // EXIT (70%-100%)
      scrollTl
        .fromTo(leftCard, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(rightCard, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7)
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
      {/* Left Large Card (Laptop) */}
      <div
        ref={leftCardRef}
        className="absolute left-4 sm:left-8 md:left-[6vw] top-[8vh] sm:top-[10vh] md:top-[14vh] w-[calc(100%-2rem)] sm:w-[calc(48%-1rem)] md:w-[42vw] h-[38vh] sm:h-[55vh] md:h-[72vh] max-w-[580px] card-rounded overflow-hidden card-shadow"
      >
        <img
          src="/images/tile_laptop_large.jpg"
          alt="Laptops"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6">
          <span className="font-mono-label text-white/80 text-[10px] sm:text-xs">LAPTOPS</span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-8 md:left-8 md:right-8">
          <h3 className="text-[clamp(18px,4vw,36px)] md:text-[clamp(24px,2.5vw,36px)] font-bold text-white leading-tight">
            Power that moves with you.
          </h3>
        </div>
      </div>

      {/* Right Large Card (Accessories) */}
      <div
        ref={rightCardRef}
        className="absolute right-4 sm:right-8 md:right-[6vw] top-[48vh] sm:top-[10vh] md:top-[14vh] w-[calc(100%-2rem)] sm:w-[calc(48%-1rem)] md:w-[42vw] h-[38vh] sm:h-[55vh] md:h-[72vh] max-w-[580px] card-rounded overflow-hidden card-shadow"
      >
        <img
          src="/images/tile_accessories_large.jpg"
          alt="Accessories"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute top-3 left-3 sm:top-4 sm:left-4 md:top-6 md:left-6">
          <span className="font-mono-label text-white/80 text-[10px] sm:text-xs">ACCESSORIES</span>
        </div>
        <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 md:bottom-8 md:left-8 md:right-8">
          <h3 className="text-[clamp(18px,4vw,36px)] md:text-[clamp(24px,2.5vw,36px)] font-bold text-white leading-tight">
            Add-ons that actually add up.
          </h3>
        </div>
      </div>

      {/* Bottom Left Small Card */}
      <div
        ref={bottomLeftCardRef}
        className="absolute left-4 sm:left-8 md:left-[6vw] bottom-[6vh] sm:bottom-[8vh] md:bottom-[10vh] w-[calc(48%-1rem)] sm:w-[calc(45%-1rem)] md:w-[28vw] h-[24vh] sm:h-[26vh] md:h-[34vh] max-w-[380px] card-rounded overflow-hidden card-shadow hidden sm:block"
      >
        <img
          src="/images/hero_laptop.jpg"
          alt="Workspace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Bottom Center Small Card */}
      <div
        ref={bottomCenterCardRef}
        className="absolute right-4 sm:left-[calc(50%+0.5rem)] md:left-[36vw] bottom-[6vh] sm:bottom-[8vh] md:bottom-[10vh] w-[calc(48%-1rem)] sm:w-[calc(45%-1rem)] md:w-[26vw] h-[24vh] sm:h-[26vh] md:h-[34vh] max-w-[350px] card-rounded overflow-hidden card-shadow hidden sm:block"
      >
        <img
          src="/images/hero_phone.jpg"
          alt="Smartphone"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
    </section>
  );
}
