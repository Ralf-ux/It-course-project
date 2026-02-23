import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ValueSectionProps {
  className?: string;
}

export default function ValueSection({ className = '' }: ValueSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const topRightCardRef = useRef<HTMLDivElement>(null);
  const bottomRightCardRef = useRef<HTMLDivElement>(null);
  const bottomLeftCardRef = useRef<HTMLDivElement>(null);
  const bottomCenterCardRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const topRightCard = topRightCardRef.current;
    const bottomRightCard = bottomRightCardRef.current;
    const bottomLeftCard = bottomLeftCardRef.current;
    const bottomCenterCard = bottomCenterCardRef.current;

    if (!section || !text || !topRightCard || !bottomRightCard || !bottomLeftCard || !bottomCenterCard) return;

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
        .fromTo(text, { x: '-50vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo(topRightCard, { x: '60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.05)
        .fromTo(bottomRightCard, { x: '60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.1)
        .fromTo(bottomLeftCard, { y: '60vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.08)
        .fromTo(bottomCenterCard, { y: '60vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.12);

      // SETTLE (30%-70%): Hold positions

      // EXIT (70%-100%)
      scrollTl
        .fromTo(text, { x: 0, opacity: 1 }, { x: '-18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(topRightCard, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(bottomRightCard, { x: 0, opacity: 1 }, { x: '18vw', opacity: 0, ease: 'power2.in' }, 0.72)
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
      {/* Left Text Block */}
      <div
        ref={textRef}
        className="absolute left-[6vw] top-[18vh] w-[34vw] max-w-[500px] z-10"
      >
        <span className="font-mono-label text-[#A6B0C5] mb-6 block">
          WHY PULSE GEAR HUB
        </span>
        <h2 className="text-[clamp(32px,3.6vw,52px)] font-bold text-white leading-[1.15] mb-6">
          Built for your everyday.
        </h2>
        <p className="text-[#A6B0C5] text-lg leading-relaxed mb-8 max-w-[400px]">
          From early meetings to late-night streams, we stock the accessories
          that keep up with your rhythm—tested, warrantied, and ready to work.
        </p>
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <button className="btn-primary flex items-center gap-2">
            Meet the team
            <ArrowRight size={18} />
          </button>
          <button className="link-underline flex items-center gap-1 py-3">
            Read our story
            <ChevronDown size={16} className="rotate-[-90deg]" />
          </button>
        </div>
      </div>

      {/* Top Right Card (Laptop) */}
      <div
        ref={topRightCardRef}
        className="absolute right-[6vw] top-[14vh] w-[40vw] h-[34vh] max-w-[550px] card-rounded overflow-hidden card-shadow hidden lg:block"
      >
        <img
          src="/images/stack_laptop_01.jpg"
          alt="Laptop"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Bottom Right Card (Phone) */}
      <div
        ref={bottomRightCardRef}
        className="absolute right-[6vw] top-[52vh] w-[40vw] h-[34vh] max-w-[550px] card-rounded overflow-hidden card-shadow hidden lg:block"
      >
        <img
          src="/images/stack_phone_01.jpg"
          alt="Smartphone"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Bottom Left Small Card */}
      <div
        ref={bottomLeftCardRef}
        className="absolute left-[6vw] bottom-[10vh] w-[28vw] h-[34vh] max-w-[380px] card-rounded overflow-hidden card-shadow hidden lg:block"
      >
        <img
          src="/images/tile_laptop_large.jpg"
          alt="Workspace"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Bottom Center Small Card */}
      <div
        ref={bottomCenterCardRef}
        className="absolute left-[36vw] bottom-[10vh] w-[26vw] h-[34vh] max-w-[350px] card-rounded overflow-hidden card-shadow hidden lg:block"
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
