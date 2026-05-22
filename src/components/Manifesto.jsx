export default function Manifesto() {
  return (
    <section className="manifesto">
      <div className="container manifesto__inner">
        <div className="manifesto__label">
          <span className="manifesto__label-dash" />
          <span>About the Network</span>
        </div>

        <p className="manifesto__text">
          <span className="line-clip"><span className="line-inner">We don't hand you a degree.</span></span>
          <span className="line-clip"><span className="line-inner">We hand you{' '}<em className="manifesto__em">experience.</em></span></span>
        </p>

        <div className="manifesto__grid">
          <div className="manifesto__item">
            <span className="manifesto__item-num">01</span>
            <p className="manifesto__item-text">
              Every LE graduate has a portfolio of real work — not a transcript of grades.
            </p>
          </div>
          <div className="manifesto__item">
            <span className="manifesto__item-num">02</span>
            <p className="manifesto__item-text">
              400+ alumni across India's top startups, family businesses, and new ventures.
            </p>
          </div>
          <div className="manifesto__item">
            <span className="manifesto__item-num">03</span>
            <p className="manifesto__item-text">
              A network that opens doors — because every member vouches for the work.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        .manifesto {
          background: white;
          padding: 120px 0;
          border-top: 1px solid var(--border);
        }
        .manifesto__inner {
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .manifesto__label {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--teal);
          margin-bottom: 56px;
          opacity: 0;
          /* GSAP animates entrance */
        }
        .manifesto__label-dash {
          display: inline-block;
          width: 28px; height: 1px;
          background: var(--teal);
          flex-shrink: 0;
        }
        .manifesto__text {
          font-size: clamp(36px, 5vw, 68px);
          font-weight: 900;
          line-height: 1.08;
          letter-spacing: -0.04em;
          color: var(--navy);
          max-width: 820px;
          margin-bottom: 80px;
          /* GSAP animates .line-inner children */
        }
        .manifesto__em {
          font-style: italic;
          color: var(--teal);
        }
        .manifesto__grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 0;
          border-top: 1px solid var(--border);
        }
        .manifesto__item {
          padding: 40px 40px 40px 0;
          border-right: 1px solid var(--border);
          display: flex;
          flex-direction: column;
          gap: 16px;
          /* GSAP ScrollTrigger handles entrance */
        }
        .manifesto__item:last-child { border-right: none; padding-right: 0; }
        .manifesto__item:not(:first-child) { padding-left: 40px; }
        .manifesto__item-num {
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: var(--teal);
        }
        .manifesto__item-text {
          font-size: 15px;
          line-height: 1.7;
          color: var(--text-muted);
          max-width: 280px;
        }
        @media (max-width: 768px) {
          .manifesto { padding: 80px 0; }
          .manifesto__grid { grid-template-columns: 1fr; }
          .manifesto__item {
            padding: 32px 0 !important;
            border-right: none;
            border-bottom: 1px solid var(--border);
          }
          .manifesto__item:last-child { border-bottom: none; }
        }
        @media (max-width: 480px) {
          .manifesto__text { margin-bottom: 48px; }
        }
      `}</style>
    </section>
  );
}
