import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CursorOrb() {
  const orbRef = useRef(null);
  const dotRef = useRef(null);

  useEffect(() => {
    // Skip on touch devices
    if (window.matchMedia('(hover: none)').matches) return;

    const orb = orbRef.current;
    const dot = dotRef.current;
    if (!orb || !dot) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // Show cursor
    orb.style.opacity = '0';
    dot.style.opacity = '0';

    const onMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      gsap.to(orb, { opacity: 1, duration: 0.4 });
      gsap.to(dot, { opacity: 1, duration: 0.2 });
    };

    // Smooth follow for orb (laggy = aesthetic)
    gsap.ticker.add(() => {
      gsap.to(orb, {
        x: mouseX - 200,
        y: mouseY - 200,
        duration: 0.9,
        ease: 'power2.out',
        overwrite: 'auto',
      });
      // Dot follows exactly
      gsap.to(dot, {
        x: mouseX - 4,
        y: mouseY - 4,
        duration: 0.15,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    });

    // Scale up on hoverable elements
    const onEnterLink = () => {
      gsap.to(orb, { scale: 1.6, opacity: 0.5, duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    };
    const onLeaveLink = () => {
      gsap.to(orb, { scale: 1, opacity: 1, duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    };

    document.addEventListener('mousemove', onMove);
    document.querySelectorAll('a, button, [role="listitem"]').forEach(el => {
      el.addEventListener('mouseenter', onEnterLink);
      el.addEventListener('mouseleave', onLeaveLink);
    });

    return () => {
      document.removeEventListener('mousemove', onMove);
      gsap.ticker.remove(() => {});
    };
  }, []);

  return (
    <>
      {/* Soft glow orb (lagging) */}
      <div
        ref={orbRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle at center, rgba(37,188,189,0.07) 0%, transparent 65%)',
          pointerEvents: 'none',
          zIndex: 9998,
          willChange: 'transform',
          mixBlendMode: 'normal',
        }}
      />
      {/* Precise dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--teal)',
          pointerEvents: 'none',
          zIndex: 9999,
          willChange: 'transform',
          mixBlendMode: 'normal',
        }}
      />
    </>
  );
}
