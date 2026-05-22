import { Mail, Phone, MapPin } from 'lucide-react';

const SocialIcons = {
  Instagram: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
    </svg>
  ),
  Linkedin: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  Youtube: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-1.96C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.54C5.12 20 12 20 12 20s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  ),
  Facebook: () => (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
};

const links = {
  Network: ['Directory', 'Events', 'Jobs Board', 'Mentorship', 'Stories'],
  Programs: ['Working BBA', 'Venture Builder', 'Enterprise Leadership', 'Family Business'],
  Community: ['Founders Club', 'The Green Room', 'Regen', 'Jamboree', '#Karo'],
};

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <img src="/logo.png" alt="Let's Enterprise" className="footer__logo" />
            <p className="footer__tagline">
              India's first Working BBA.<br />
              Where work is the curriculum.
            </p>
            <div className="footer__socials">
              {[
                { Icon: SocialIcons.Instagram, label: 'Instagram' },
                { Icon: SocialIcons.Linkedin, label: 'LinkedIn' },
                { Icon: SocialIcons.Youtube, label: 'YouTube' },
                { Icon: SocialIcons.Facebook, label: 'Facebook' },
              ].map(({ Icon, label }) => (
                <a key={label} href="#" className="footer__social" aria-label={label}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title} className="footer__col">
              <h4 className="footer__col-title">{title}</h4>
              <ul className="footer__col-links">
                {items.map(item => (
                  <li key={item}>
                    <a href="#" className="footer__link">{item}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="footer__col">
            <h4 className="footer__col-title">Contact</h4>
            <div className="footer__contact">
              <div className="footer__contact-item">
                <Phone size={13} />
                <span>+91 84472 84008</span>
              </div>
              <div className="footer__contact-item">
                <Mail size={13} />
                <span>alumni@letsenterprise.in</span>
              </div>
              <div className="footer__contact-item">
                <MapPin size={13} />
                <span>44, Range Hill Rd, Pune, MH</span>
              </div>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copy">© 2026 Let's Enterprise. All rights reserved.</p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__link">Privacy Policy</a>
            <a href="#" className="footer__link">Terms of Use</a>
          </div>
        </div>
      </div>

      <style>{`
        .footer {
          background: var(--navy);
          padding: 72px 0 32px;
        }
        .footer__top {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
          gap: 40px;
          padding-bottom: 56px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
          margin-bottom: 32px;
        }
        .footer__logo {
          height: 28px;
          width: auto;
          filter: brightness(0) invert(1);
          margin-bottom: 16px;
          opacity: 0.9;
        }
        .footer__tagline {
          font-size: 14px;
          line-height: 1.7;
          color: rgba(255,255,255,0.5);
          margin-bottom: 24px;
        }
        .footer__socials {
          display: flex;
          gap: 8px;
        }
        .footer__social {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: rgba(255,255,255,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255,255,255,0.5);
          transition: all 0.15s;
        }
        .footer__social:hover {
          background: var(--teal);
          color: white;
        }
        .footer__col-title {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: rgba(255,255,255,0.3);
          margin-bottom: 16px;
        }
        .footer__col-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .footer__link {
          font-size: 14px;
          color: rgba(255,255,255,0.55);
          transition: color 0.15s;
        }
        .footer__link:hover {
          color: white;
        }
        .footer__contact {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer__contact-item {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 13px;
          color: rgba(255,255,255,0.5);
          line-height: 1.5;
        }
        .footer__contact-item svg {
          flex-shrink: 0;
          margin-top: 2px;
          color: var(--teal);
        }
        .footer__bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .footer__copy {
          font-size: 13px;
          color: rgba(255,255,255,0.3);
        }
        .footer__bottom-links {
          display: flex;
          gap: 24px;
        }
        @media (max-width: 1024px) {
          .footer__top {
            grid-template-columns: 1fr 1fr;
          }
          .footer__brand { grid-column: 1/-1; }
        }
        @media (max-width: 600px) {
          .footer__top {
            grid-template-columns: 1fr 1fr;
            gap: 32px;
          }
          .footer__bottom {
            flex-direction: column;
            gap: 16px;
            text-align: center;
          }
        }
      `}</style>
    </footer>
  );
}
