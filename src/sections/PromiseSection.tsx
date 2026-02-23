import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface PromiseSectionProps {
  className?: string;
}

export default function PromiseSection({ className = '' }: PromiseSectionProps) {
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
          end: '+=140%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0%-30%)
      scrollTl
        .fromTo(text, { x: '-50vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0)
        .fromTo(topRightCard, { x: '60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.05)
        .fromTo(bottomRightCard, { x: '60vw', opacity: 0 }, { x: 0, opacity: 1, ease: 'none' }, 0.1)
        .fromTo(bottomLeftCard, { y: '60vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.12)
        .fromTo(bottomCenterCard, { y: '60vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.14);

      // SETTLE (30%-70%): Hold positions

      // EXIT (70%-100%)
      scrollTl
        .fromTo(text, { opacity: 1 }, { opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(topRightCard, { y: 0, opacity: 1 }, { y: '10vh', opacity: 0, ease: 'power2.in' }, 0.7)
        .fromTo(bottomRightCard, { y: 0, opacity: 1 }, { y: '10vh', opacity: 0, ease: 'power2.in' }, 0.72)
        .fromTo(bottomLeftCard, { y: 0, opacity: 1 }, { y: '10vh', opacity: 0, ease: 'power2.in' }, 0.75)
        .fromTo(bottomCenterCard, { y: 0, opacity: 1 }, { y: '10vh', opacity: 0, ease: 'power2.in' }, 0.78);
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`pinned-section relative w-screen h-screen section-light overflow-hidden ${className}`}
    >
      {/* Left Text Block */}
      <div
        ref={textRef}
        className="absolute left-[6vw] top-[18vh] w-[34vw] max-w-[500px] z-10"
      >
        <span className="font-mono-label text-gray-500 mb-6 block">
          OUR PROMISE
        </span>
        <h2 className="text-[clamp(32px,3.6vw,52px)] font-bold text-gray-900 leading-[1.15] mb-6">
          Quality you can trust.
        </h2>
        <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-[400px]">
          We source genuine products, verify specs, and stand behind every sale
          with clear warranties and local support.
        </p>
        <div className="flex flex-col sm:flex-row items-start gap-4">
          <button className="bg-[#2F6BFF] text-white px-6 py-3 rounded-full font-medium transition-all duration-300 hover:bg-[#1a5aee] hover:scale-105 flex items-center gap-2">
            See how we source
            <ArrowRight size={18} />
          </button>
          <button className="relative text-gray-600 hover:text-gray-900 transition-colors flex items-center gap-1 py-3">
            Read FAQs
            <ChevronDown size={16} className="rotate-[-90deg]" />
          </button>
        </div>
      </div>

      {/* Top Right Card */}
      <div
        ref={topRightCardRef}
        className="absolute right-[6vw] top-[14vh] w-[40vw] h-[34vh] max-w-[550px] card-rounded overflow-hidden card-shadow hidden lg:block"
      >
        <img
          src="/images/light_phone_top.jpg"
          alt="Phone"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>

      {/* Bottom Right Card */}
      <div
        ref={bottomRightCardRef}
        className="absolute right-[6vw] top-[52vh] w-[40vw] h-[34vh] max-w-[550px] card-rounded overflow-hidden card-shadow hidden lg:block"
      >
        <img
          src="/images/light_phone_bottom.jpg"
          alt="Phone"
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
          src="/images/feature_laptop_04.jpg"
          alt="Laptop"
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
          src="/images/feature_earbuds_04.jpg"
          alt="Headphones"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
      </div>
    </section>
  );
}
