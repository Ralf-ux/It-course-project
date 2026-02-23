import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  className?: string;
}

export default function HeroSection({ className = '' }: HeroSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const bottomLeftCardRef = useRef<HTMLDivElement>(null);
  const bottomCenterCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const rightCard = rightCardRef.current;
    const bottomLeftCard = bottomLeftCardRef.current;
    const bottomCenterCard = bottomCenterCardRef.current;

    if (!section || !text || !rightCard || !bottomLeftCard || !bottomCenterCard) return;

    const ctx = gsap.context(() => {
      // Auto-play entrance animation on load
      const loadTl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      loadTl
        .fromTo(text, { x: -40, opacity: 0 }, { x: 0, opacity: 1, duration: 1 }, 0)
        .fromTo(
          rightCard,
          { x: 120, opacity: 0, scale: 0.98 },
          { x: 0, opacity: 1, scale: 1, duration: 1 },
          0.1
        )
        .fromTo(
          bottomLeftCard,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.3
        )
        .fromTo(
          bottomCenterCard,
          { y: 80, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8 },
          0.4
        );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([text, rightCard, bottomLeftCard, bottomCenterCard], {
              opacity: 1,
              x: 0,
              y: 0,
            });
          },
        },
      });

      // ENTRANCE (0%-30%): Hold position (entrance handled by load animation)
      // SETTLE (30%-70%): Static
      // EXIT (70%-100%): Elements exit
      scrollTl
        .fromTo(text, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(
          rightCard,
          { x: 0, opacity: 1 },
          { x: '18vw', opacity: 0, ease: 'power2.in' },
          0.7
        )
        .fromTo(
          bottomLeftCard,
          { y: 0, opacity: 1 },
          { y: '16vh', opacity: 0, ease: 'power2.in' },
          0.75
        )
        .fromTo(
          bottomCenterCard,
          { y: 0, opacity: 1 },
          { y: '16vh', opacity: 0, ease: 'power2.in' },
          0.8
        );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`pinned-section relative w-screen h-screen section-dark overflow-hidden ${className}`}
    >
      {/* Left Text Block */}
      <div
        ref={textRef}
        className="absolute left-4 sm:left-8 md:left-[6vw] top-[8vh] sm:top-[12vh] md:top-[18vh] w-[calc(100%-2rem)] sm:w-[calc(50%-2rem)] md:w-[34vw] max-w-[500px] z-10"
      >
        <span className="font-mono-label text-[#A6B0C5] mb-3 md:mb-6 block">
          PULSE GEAR HUB
        </span>
        <h1 className="text-[clamp(32px,7vw,64px)] md:text-[clamp(36px,4.5vw,64px)] font-bold text-white leading-[1.1] mb-3 md:mb-6">
          Your tech.
          <br />
          Your pulse.
        </h1>
        <p className="text-[#A6B0C5] text-sm sm:text-base md:text-lg leading-relaxed mb-4 md:mb-8 max-w-[400px]">
          Quality accessories, reliable service, and smart pricing—built for how
          you work and play.
        </p>
        <div className="flex flex-col sm:flex-row items-start gap-2 md:gap-4">
          <button className="btn-primary flex items-center gap-2 text-sm md:text-base whitespace-nowrap">
            Explore the collection
            <ArrowRight size={16} className="sm:w-[18px] sm:h-[18px]" />
          </button>
          <button className="link-underline flex items-center gap-1 py-2 md:py-3 text-sm md:text-base">
            View services
            <ChevronDown size={14} className="rotate-[-90deg] sm:w-4 sm:h-4" />
          </button>
        </div>
      </div>

      {/* Right Featured Card (Headphones) */}
      <div
        ref={rightCardRef}
        className="absolute right-4 sm:right-8 md:right-[6vw] top-[52vh] sm:top-[35vh] md:top-[14vh] w-[calc(100%-2rem)] sm:w-[calc(48%-2rem)] md:w-[40vw] h-[42vh] sm:h-[58vh] md:h-[72vh] max-w-[550px] card-rounded overflow-hidden card-shadow bg-white"
      >
        <img
          src="/images/hero_headphones.jpg"
          alt="Premium Headphones"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      {/* Bottom Left Small Card (Laptop) */}
      <div
        ref={bottomLeftCardRef}
        className="absolute left-4 sm:left-8 md:left-[6vw] bottom-[8vh] md:bottom-[10vh] w-[calc(45%-1rem)] sm:w-[28vw] h-[28vh] md:h-[34vh] max-w-[380px] card-rounded overflow-hidden card-shadow hidden md:block"
      >
        <img
          src="/images/hero_laptop.jpg"
          alt="Laptop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Bottom Center Small Card (Phone) */}
      <div
        ref={bottomCenterCardRef}
        className="absolute left-[calc(50%+1rem)] sm:left-[36vw] bottom-[8vh] md:bottom-[10vh] w-[calc(45%-1rem)] sm:w-[26vw] h-[28vh] md:h-[34vh] max-w-[350px] card-rounded overflow-hidden card-shadow hidden md:block"
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
