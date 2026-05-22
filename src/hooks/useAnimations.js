/**
 * GSAP animation system.
 * All targets are pre-existing React DOM nodes (no SplitType / DOM insertion).
 *
 * Approach for above-fold elements (Hero):
 *   – CSS sets opacity:0 to prevent FOUC
 *   – We use gsap.fromTo({ y: offset }, { opacity:1, y:0 }) so GSAP reads
 *     the current CSS opacity (0) as the "from" and animates to opacity:1
 *
 * Approach for below-fold elements (ScrollTrigger):
 *   – gsap.from({ opacity:0, y:offset }) is fine; they aren't visible before trigger
 *
 * Line-clip reveals (hero/manifesto/offer titles):
 *   – overflow:hidden on .hero-v2__line-clip / .line-clip acts as the mask
 *   – gsap.from({ yPercent:110 }) slides text into view from below
 */
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EXPO = 'expo.out';
const P3   = 'power3.out';
const P2   = 'power2.out';

export default function useAnimations(view) {
  useEffect(() => {
    ScrollTrigger.getAll().forEach(t => t.kill());
    if (view !== 'home') return;

    // Wait one rAF so React finishes painting
    const raf = requestAnimationFrame(() => {
      const ctx = gsap.context(() => {

        /* ── HERO ── above-fold, all use fromTo / to ──── */

        // Eyebrow: CSS opacity:0  →  animate y + opacity
        gsap.fromTo('.hero-v2__eyebrow',
          { y: 20 },
          { opacity: 1, y: 0, duration: 0.9, ease: P3, delay: 0.1 }
        );

        // Headline line-clip reveal (overflow:hidden mask)
        gsap.from('.hero-v2__line-inner', {
          yPercent: 110,
          duration: 1.15,
          ease: EXPO,
          stagger: 0.16,
          delay: 0.25,
        });

        // Divider draw
        gsap.fromTo('.hero-v2__divider',
          { scaleX: 0 },
          { scaleX: 1, duration: 1.0, ease: EXPO, delay: 0.6, transformOrigin: 'left center' }
        );

        // Sub paragraph: CSS opacity:0
        gsap.fromTo('.hero-v2__sub',
          { y: 28 },
          { opacity: 1, y: 0, duration: 0.9, ease: P3, delay: 0.72 }
        );

        // Actions: CSS opacity:0
        gsap.fromTo('.hero-v2__actions',
          { y: 24 },
          { opacity: 1, y: 0, duration: 0.85, ease: P3, delay: 0.84 }
        );

        // Stats bar: CSS opacity:0
        gsap.fromTo('.hero-v2__stats-bar',
          { y: 20 },
          { opacity: 1, y: 0, duration: 0.8, ease: P3, delay: 0.92 }
        );

        // Stats counter
        document.querySelectorAll('.hero-v2__stat-value').forEach(el => {
          const raw    = el.textContent.trim();
          const num    = parseFloat(raw.replace(/[^0-9.]/g, ''));
          const suffix = raw.replace(/[0-9.]/g, '');
          if (!isNaN(num) && num > 0) {
            const obj = { val: 0 };
            gsap.to(obj, {
              val: num,
              duration: 1.8,
              ease: P2,
              delay: 1.1,
              onUpdate() {
                el.textContent = Math.floor(obj.val) + suffix;
              },
            });
          }
        });

        // Parallax blobs (scrub)
        gsap.to('.hero-v2__blob--1', {
          y: -140, ease: 'none',
          scrollTrigger: {
            trigger: '.hero-v2', start: 'top top', end: 'bottom top', scrub: 2,
          },
        });
        gsap.to('.hero-v2__blob--2', {
          y: 90, ease: 'none',
          scrollTrigger: {
            trigger: '.hero-v2', start: 'top top', end: 'bottom top', scrub: 1.4,
          },
        });

        /* ── MANIFESTO ── ScrollTrigger ──────────────── */

        // Label: CSS opacity:0
        gsap.fromTo('.manifesto__label',
          { x: -24 },
          {
            opacity: 1, x: 0, duration: 0.75, ease: P3,
            scrollTrigger: { trigger: '.manifesto__label', start: 'top 85%' },
          }
        );

        // Big text line-clip
        gsap.from('.manifesto__text .line-inner', {
          yPercent: 110, duration: 1.1, ease: EXPO, stagger: 0.12,
          scrollTrigger: { trigger: '.manifesto__text', start: 'top 82%' },
        });

        // Three items
        gsap.from('.manifesto__item', {
          opacity: 0, y: 36, duration: 0.82, ease: P3, stagger: 0.12,
          scrollTrigger: { trigger: '.manifesto__grid', start: 'top 88%' },
        });

        /* ── WHAT WE OFFER ── ScrollTrigger ─────────── */

        gsap.fromTo('.offer__header-label',
          { x: -24 },
          {
            opacity: 1, x: 0, duration: 0.75, ease: P3,
            scrollTrigger: { trigger: '.offer__header', start: 'top 85%' },
          }
        );

        gsap.from('.offer__title .line-inner', {
          yPercent: 110, duration: 1.0, ease: EXPO, stagger: 0.1,
          scrollTrigger: { trigger: '.offer__title', start: 'top 82%' },
        });

        gsap.from('.offer__row', {
          opacity: 0, y: 48, duration: 0.85, ease: P3, stagger: 0.1,
          scrollTrigger: { trigger: '.offer__list', start: 'top 85%' },
        });

        /* ── STORIES ── ScrollTrigger ────────────────── */

        gsap.from('.stories .section-header > *', {
          opacity: 0, y: 28, duration: 0.8, ease: P3, stagger: 0.1,
          scrollTrigger: { trigger: '.stories .section-header', start: 'top 85%' },
        });

        gsap.from('.story-quote', {
          opacity: 0, y: 56, duration: 0.9, ease: P3, stagger: 0.13,
          scrollTrigger: { trigger: '.stories__quotes', start: 'top 85%' },
        });

      });

      return () => ctx.revert();
    });

    return () => {
      cancelAnimationFrame(raf);
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, [view]);
}
