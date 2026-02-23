import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ContactSectionProps {
  className?: string;
}

export default function ContactSection({ className = '' }: ContactSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const cards = cardsRef.current;
    const footer = footerRef.current;

    if (!section || !heading || !cards || !footer) return;

    const ctx = gsap.context(() => {
      // Flowing section - simple fade/slide up animations
      gsap.fromTo(
        heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        cards.children,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      gsap.fromTo(
        footer,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: footer,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full min-h-screen section-dark py-20 lg:py-32 ${className}`}
    >
      <div className="w-full px-6 lg:px-[6vw]">
        {/* Heading Block */}
        <div ref={headingRef} className="max-w-[640px] mb-16">
          <h2 className="text-[clamp(36px,4vw,56px)] font-bold text-white leading-[1.1] mb-6">
            Let's build your setup.
          </h2>
          <p className="text-[#A6B0C5] text-lg leading-relaxed">
            Tell us what you need. We'll recommend the right gear, delivery
            options, and support plan.
          </p>
        </div>

        {/* Contact Cards */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {/* Email Card */}
          <div className="card-rounded bg-[#151a25] border border-white/10 p-8 hover:border-[#2F6BFF]/50 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-[#2F6BFF]/20 flex items-center justify-center mb-6">
              <Mail className="text-[#2F6BFF]" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Request a quote
            </h3>
            <p className="text-[#A6B0C5] mb-6">
              Send us your requirements and we'll get back to you within 24
              hours.
            </p>
            <a
              href="mailto:hello@pulsegearhub.cm"
              className="flex items-center gap-2 text-[#2F6BFF] font-medium group-hover:gap-3 transition-all"
            >
              hello@pulsegearhub.cm
              <ArrowRight size={18} />
            </a>
          </div>

          {/* WhatsApp Card */}
          <div className="card-rounded bg-[#151a25] border border-white/10 p-8 hover:border-[#2F6BFF]/50 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-[#2F6BFF]/20 flex items-center justify-center mb-6">
              <Phone className="text-[#2F6BFF]" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              WhatsApp us
            </h3>
            <p className="text-[#A6B0C5] mb-6">
              Quick questions? Message us directly for instant support.
            </p>
            <a
              href="https://wa.me/237600000000"
              className="flex items-center gap-2 text-[#2F6BFF] font-medium group-hover:gap-3 transition-all"
            >
              +237 6XX XXX XXX
              <ArrowRight size={18} />
            </a>
          </div>

          {/* Location Card */}
          <div className="card-rounded bg-[#151a25] border border-white/10 p-8 hover:border-[#2F6BFF]/50 transition-colors group">
            <div className="w-12 h-12 rounded-full bg-[#2F6BFF]/20 flex items-center justify-center mb-6">
              <MapPin className="text-[#2F6BFF]" size={24} />
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Visit our store
            </h3>
            <p className="text-[#A6B0C5] mb-6">
              Come see our products in person at our Yaoundé location.
            </p>
            <span className="flex items-center gap-2 text-[#2F6BFF] font-medium">
              Yaoundé, Cameroon
              <ArrowRight size={18} />
            </span>
          </div>
        </div>

        {/* Footer */}
        <footer
          ref={footerRef}
          className="border-t border-white/10 pt-12"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <span className="font-['Space_Grotesk'] text-xl font-bold text-white">
                Pulse Gear Hub
              </span>
            </div>
            
            <div className="flex items-center gap-8">
              <a href="#" className="text-[#A6B0C5] hover:text-white transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-[#A6B0C5] hover:text-white transition-colors text-sm">
                Terms of Service
              </a>
              <a href="#" className="text-[#A6B0C5] hover:text-white transition-colors text-sm">
                Support
              </a>
            </div>
            
            <p className="text-[#A6B0C5] text-sm">
              © {new Date().getFullYear()} Pulse Gear Hub. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    </section>
  );
}
