/**
 * GSAP animation system — full cinematic motion.
 *
 * Hero  : coordinated gsap.timeline() entrance sequence
 *          + ambient glow pulse/float
 *          + multi-layer parallax (background moves slower = depth)
 *
 * Sections : ScrollTrigger-based reveals (manifesto, offer, stories)
 *
 * Rules:
 *  • No SplitType / DOM insertion — all targets are React-rendered nodes
 *  • CSS opacity:0 on above-fold elements; GSAP fromTo() animates to opacity:1
 *  • below-fold gsap.from() is fine (not visible until ScrollTrigger fires)
 */
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─ Easing tokens ─────────────────────────── */
const EXPO   = 'expo.out';
const BACK   = 'back.out(1.6)';
const P3     = 'power3.out';
const P2     = 'power2.out';
const SINE   = 'sine.inOut';

export default function useAnimations(view) {
  useEffect(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());
    if (view !== 'home') return;

    const raf = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {

        /* ══════════════════════════════════════════
           HERO — entrance timeline
        ══════════════════════════════════════════ */
        const tl = gsap.timeline({ defaults: { ease: P3 } });

        // 1. Eyebrow slides up (CSS opacity:0 → 1)
        tl.fromTo('[data-anim="eyebrow"]',
          { y: 24 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.15
        );

        // 2. Headline line-clip reveals (yPercent 110 → 0 through overflow:hidden mask)
        tl.from('.hero__line-inner', {
          yPercent: 115,
          duration: 1.2,
          ease: EXPO,
          stagger: 0.18,
        }, 0.3);

        // 3. Rule draws left → right
        tl.to('[data-anim="rule"]', {
          scaleX: 1,
          duration: 1.0,
          ease: EXPO,
          transformOrigin: 'left center',
        }, 0.78);

        // 4. Sub paragraph
        tl.fromTo('[data-anim="sub"]',
          { y: 28 },
          { opacity: 1, y: 0, duration: 0.85 },
          0.88
        );

        // 5. Buttons — spring scale pop
        tl.fromTo('.hero__btn',
          { y: 32, scale: 0.88 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: BACK, stagger: 0.14 },
          1.02
        );

        // 6. Stats bar
        tl.fromTo('[data-anim="stats"]',
          { y: 24 },
          { opacity: 1, y: 0, duration: 0.8 },
          1.18
        );

        // 7. Stats counter
        document.querySelectorAll('.hero__stat-num').forEach((el, i) => {
          const target = parseInt(el.dataset.count, 10);
          const suffix = el.dataset.suffix || '';
          if (!target) return;
          const obj = { val: 0 };
          tl.to(obj, {
            val: target,
            duration: 1.6,
            ease: P2,
            onUpdate() {
              el.textContent = Math.floor(obj.val) + suffix;
            },
          }, 1.32 + i * 0.05);
        });

        /* ── Spotlight glow entrance ── */
        tl.fromTo('.hero__spotlight',
          { opacity: 0, scale: 0.7 },
          { opacity: 1, scale: 1, duration: 1.4, ease: P2 },
          0.1
        );

        /* ══════════════════════════════════════════
           AMBIENT — continuous glow animations
           (run forever independently of scroll)
        ══════════════════════════════════════════ */

        // Teal orb — slow float up-right
        gsap.to('.hero__glow--teal', {
          x: 60, y: -50,
          duration: 7,
          ease: SINE,
          yoyo: true,
          repeat: -1,
        });

        // Blue orb — slow float opposite
        gsap.to('.hero__glow--blue', {
          x: -50, y: 60,
          duration: 9,
          ease: SINE,
          yoyo: true,
          repeat: -1,
          delay: 1.5,
        });

        // Violet accent — subtle drift
        gsap.to('.hero__glow--violet', {
          x: 40, y: 30,
          duration: 11,
          ease: SINE,
          yoyo: true,
          repeat: -1,
          delay: 3,
        });

        // Spotlight — breathe (pulse)
        gsap.to('.hero__spotlight', {
          scale: 1.18,
          opacity: 0.85,
          duration: 4,
          ease: SINE,
          yoyo: true,
          repeat: -1,
          delay: 1.4,
        });

        // Accent glow on "born." — pulse
        gsap.to('.hero__accent-glow', {
          opacity: 0.6,
          scale: 1.3,
          duration: 2.5,
          ease: SINE,
          yoyo: true,
          repeat: -1,
          delay: 2,
        });

        /* ══════════════════════════════════════════
           PARALLAX — multi-layer scroll depth
           Background moves SLOWER than scroll
           = appears to be further away
        ══════════════════════════════════════════ */
        const heroTrigger = {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.8,
        };

        // Far layer — teal glow (slowest, 25% of scroll speed)
        gsap.to('.hero__glow--teal', {
          y: '-=180',
          ease: 'none',
          scrollTrigger: { ...heroTrigger, scrub: 3 },
        });

        // Mid layer — blue glow (35% of scroll)
        gsap.to('.hero__glow--blue', {
          y: '-=140',
          ease: 'none',
          scrollTrigger: { ...heroTrigger, scrub: 2.5 },
        });

        // Violet near-far (50%)
        gsap.to('.hero__glow--violet', {
          y: '-=100',
          ease: 'none',
          scrollTrigger: { ...heroTrigger, scrub: 2 },
        });

        // Spotlight (60%)
        gsap.to('.hero__spotlight', {
          y: '-=120',
          opacity: 0,
          ease: 'none',
          scrollTrigger: { ...heroTrigger, scrub: 1.5 },
        });

        // Grid — slightly faster than text = depth
        gsap.to('.hero__grid', {
          y: '-=80',
          ease: 'none',
          scrollTrigger: { ...heroTrigger, scrub: 1.2 },
        });

        // Text layer (inner) — slides up naturally but slightly restrained
        // This makes text feel "closer" than the pure-dark background
        gsap.to('[data-parallax="text"]', {
          y: '-=60',
          ease: 'none',
          scrollTrigger: { ...heroTrigger, scrub: 0.8 },
        });

        /* ══════════════════════════════════════════
           MANIFESTO — ScrollTrigger reveals
        ══════════════════════════════════════════ */
        gsap.fromTo('.manifesto__label',
          { x: -28, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.75, ease: P3,
            scrollTrigger: { trigger: '.manifesto__label', start: 'top 86%' },
          }
        );

        gsap.from('.manifesto__text .line-inner', {
          yPercent: 112, duration: 1.1, ease: EXPO, stagger: 0.12,
          scrollTrigger: { trigger: '.manifesto__text', start: 'top 83%' },
        });

        gsap.from('.manifesto__item', {
          opacity: 0, y: 40, duration: 0.85, ease: P3, stagger: 0.13,
          scrollTrigger: { trigger: '.manifesto__grid', start: 'top 88%' },
        });

        /* ══════════════════════════════════════════
           WHAT WE OFFER — ScrollTrigger reveals
        ══════════════════════════════════════════ */
        gsap.fromTo('.offer__header-label',
          { x: -28, opacity: 0 },
          {
            x: 0, opacity: 1, duration: 0.75, ease: P3,
            scrollTrigger: { trigger: '.offer__header', start: 'top 86%' },
          }
        );

        gsap.from('.offer__title .line-inner', {
          yPercent: 112, duration: 1.0, ease: EXPO, stagger: 0.1,
          scrollTrigger: { trigger: '.offer__title', start: 'top 83%' },
        });

        gsap.from('.offer__row', {
          opacity: 0, y: 52, duration: 0.9, ease: P3, stagger: 0.1,
          scrollTrigger: { trigger: '.offer__list', start: 'top 86%' },
        });

        /* ══════════════════════════════════════════
           STORIES — ScrollTrigger reveals
        ══════════════════════════════════════════ */
        gsap.from('.stories .section-header > *', {
          opacity: 0, y: 32, duration: 0.8, ease: P3, stagger: 0.1,
          scrollTrigger: { trigger: '.stories .section-header', start: 'top 86%' },
        });

        gsap.from('.story-quote', {
          opacity: 0, y: 60, duration: 0.9, ease: P3, stagger: 0.14,
          scrollTrigger: { trigger: '.stories__quotes', start: 'top 86%' },
        });

      }); // end ctx

      return () => ctx.revert();
    }); // end rAF

    return () => {
      cancelAnimationFrame(raf);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [view]);
}
