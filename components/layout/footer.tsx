import Image from 'next/image'
import Link from 'next/link'

// Social icon SVGs inlined so fill="currentColor" responds to CSS `color`
function IconInstagram() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M9.75 0C7.82164 0 5.93657 0.571828 4.33319 1.64317C2.72982 2.71451 1.48013 4.23726 0.742179 6.01884C0.00422452 7.80042 -0.188858 9.76082 0.187348 11.6521C0.563554 13.5434 1.49215 15.2807 2.85571 16.6443C4.21928 18.0079 5.95656 18.9365 7.84787 19.3127C9.73919 19.6889 11.6996 19.4958 13.4812 18.7578C15.2627 18.0199 16.7855 16.7702 17.8568 15.1668C18.9282 13.5634 19.5 11.6784 19.5 9.75C19.4973 7.16498 18.4692 4.68661 16.6413 2.85872C14.8134 1.03084 12.335 0.00272983 9.75 0ZM9.75 18C8.11831 18 6.52326 17.5161 5.16655 16.6096C3.80984 15.7031 2.75242 14.4146 2.128 12.9071C1.50358 11.3996 1.3402 9.74085 1.65853 8.1405C1.97685 6.54016 2.76259 5.07015 3.91637 3.91637C5.07016 2.76259 6.54017 1.97685 8.14051 1.65852C9.74085 1.34019 11.3997 1.50357 12.9071 2.12799C14.4146 2.75242 15.7031 3.80984 16.6096 5.16655C17.5161 6.52325 18 8.1183 18 9.75C17.9975 11.9373 17.1275 14.0343 15.5809 15.5809C14.0343 17.1275 11.9373 17.9975 9.75 18ZM6.75 9.75C6.75 10.3796 6.94812 10.9933 7.31628 11.5041C7.68444 12.0149 8.20399 12.3969 8.80132 12.5961C9.39866 12.7952 10.0435 12.8013 10.6445 12.6135C11.2455 12.4258 11.7722 12.0537 12.15 11.55C12.2695 11.3909 12.4473 11.2857 12.6443 11.2577C12.8413 11.2296 13.0413 11.281 13.2005 11.4005C13.3596 11.5199 13.4648 11.6977 13.4928 11.8947C13.5208 12.0917 13.4695 12.2918 13.35 12.4509C12.7832 13.2063 11.9931 13.7642 11.0916 14.0456C10.1902 14.327 9.223 14.3176 8.32713 14.0189C7.43126 13.7201 6.65208 13.1471 6.09995 12.381C5.54781 11.6148 5.25071 10.6944 5.25071 9.75C5.25071 8.80563 5.54781 7.88519 6.09995 7.11904C6.65208 6.35289 7.43126 5.77986 8.32713 5.48111C9.223 5.18236 10.1902 5.17302 11.0916 5.45443C11.9931 5.73583 12.7832 6.29371 13.35 7.04906C13.4092 7.12786 13.4522 7.21753 13.4767 7.31296C13.5012 7.4084 13.5067 7.50772 13.4928 7.60527C13.4789 7.70281 13.446 7.79667 13.3958 7.88147C13.3456 7.96628 13.2793 8.04037 13.2005 8.09953C13.1217 8.15869 13.032 8.20175 12.9366 8.22625C12.8411 8.25075 12.7418 8.25621 12.6443 8.24232C12.5467 8.22844 12.4529 8.19548 12.3681 8.14532C12.2833 8.09516 12.2092 8.02879 12.15 7.95C11.7722 7.44628 11.2455 7.0742 10.6445 6.88646C10.0435 6.69872 9.39866 6.70484 8.80132 6.90395C8.20399 7.10306 7.68444 7.48507 7.31628 7.99587C6.94812 8.50667 6.75 9.12035 6.75 9.75Z" fill="currentColor" />
    </svg>
  )
}

function IconTikTok() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <path d="M13 0C10.4288 0 7.91543 0.762437 5.77759 2.1909C3.63975 3.61935 1.97351 5.64968 0.989572 8.02512C0.0056327 10.4006 -0.251811 13.0144 0.249797 15.5362C0.751405 18.0579 1.98953 20.3743 3.80762 22.1924C5.6257 24.0105 7.94208 25.2486 10.4638 25.7502C12.9856 26.2518 15.5995 25.9944 17.9749 25.0104C20.3503 24.0265 22.3807 22.3603 23.8091 20.2224C25.2376 18.0846 26 15.5712 26 13C25.9964 9.5533 24.6256 6.24882 22.1884 3.81163C19.7512 1.37445 16.4467 0.00363977 13 0ZM14 23.9538V16H17C17.2652 16 17.5196 15.8946 17.7071 15.7071C17.8946 15.5196 18 15.2652 18 15C18 14.7348 17.8946 14.4804 17.7071 14.2929C17.5196 14.1054 17.2652 14 17 14H14V11C14 10.4696 14.2107 9.96086 14.5858 9.58579C14.9609 9.21071 15.4696 9 16 9H18C18.2652 9 18.5196 8.89464 18.7071 8.70711C18.8946 8.51957 19 8.26522 19 8C19 7.73478 18.8946 7.48043 18.7071 7.29289C18.5196 7.10536 18.2652 7 18 7H16C14.9391 7 13.9217 7.42143 13.1716 8.17157C12.4214 8.92172 12 9.93913 12 11V14H9.00001C8.73479 14 8.48044 14.1054 8.2929 14.2929C8.10536 14.4804 8.00001 14.7348 8.00001 15C8.00001 15.2652 8.10536 15.5196 8.2929 15.7071C8.48044 15.8946 8.73479 16 9.00001 16H12V23.9538C9.181 23.6964 6.56971 22.3622 4.7093 20.2287C2.8489 18.0952 1.8826 15.3266 2.0114 12.4988C2.1402 9.67098 3.35419 7.00169 5.40085 5.04613C7.44751 3.09057 10.1693 1.9993 13 1.9993C15.8307 1.9993 18.5525 3.09057 20.5992 5.04613C22.6458 7.00169 23.8598 9.67098 23.9886 12.4988C24.1174 15.3266 23.1511 18.0952 21.2907 20.2287C19.4303 22.3622 16.819 23.6964 14 23.9538Z" fill="currentColor" />
    </svg>
  )
}

function IconFacebook() {
  // Facebook "f" glyph in a rounded square — distinct from the LinkedIn "in" glyph
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <path d="M22.667 0H3.333C1.492 0 0 1.492 0 3.333V22.667C0 24.508 1.492 26 3.333 26H13V16H10V12.5H13V10C13 7.515 14.985 5.5 17.5 5.5H21V9H18.5C17.672 9 17 9.672 17 10.5V12.5H21L20.5 16H17V26H22.667C24.508 26 26 24.508 26 22.667V3.333C26 1.492 24.508 0 22.667 0Z" fill="currentColor" />
    </svg>
  )
}

function IconLinkedIn() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <path d="M24 0H2C1.46957 0 0.960859 0.210714 0.585786 0.585786C0.210714 0.960859 0 1.46957 0 2V24C0 24.5304 0.210714 25.0391 0.585786 25.4142C0.960859 25.7893 1.46957 26 2 26H24C24.5304 26 25.0391 25.7893 25.4142 25.4142C25.7893 25.0391 26 24.5304 26 24V2C26 1.46957 25.7893 0.960859 25.4142 0.585786C25.0391 0.210714 24.5304 0 24 0ZM24 24H2V2H24V24ZM9 11V19C9 19.2652 8.89464 19.5196 8.70711 19.7071C8.51957 19.8946 8.26522 20 8 20C7.73478 20 7.48043 19.8946 7.29289 19.7071C7.10536 19.5196 7 19.2652 7 19V11C7 10.7348 7.10536 10.4804 7.29289 10.2929C7.48043 10.1054 7.73478 10 8 10C8.26522 10 8.51957 10.1054 8.70711 10.2929C8.89464 10.4804 9 10.7348 9 11ZM20 14.5V19C20 19.2652 19.8946 19.5196 19.7071 19.7071C19.5196 19.8946 19.2652 20 19 20C18.7348 20 18.4804 19.8946 18.2929 19.7071C18.1054 19.5196 18 19.2652 18 19V14.5C18 13.837 17.7366 13.2011 17.2678 12.7322C16.7989 12.2634 16.163 12 15.5 12C14.837 12 14.2011 12.2634 13.7322 12.7322C13.2634 13.2011 13 13.837 13 14.5V19C13 19.2652 12.8946 19.5196 12.7071 19.7071C12.5196 19.8946 12.2652 20 12 20C11.7348 20 11.4804 19.8946 11.2929 19.7071C11.1054 19.5196 11 19.2652 11 19V11C11.0012 10.7551 11.0923 10.5191 11.256 10.3369C11.4197 10.1546 11.6446 10.0388 11.888 10.0114C12.1314 9.98392 12.3764 10.0468 12.5765 10.188C12.7767 10.3292 12.918 10.539 12.9738 10.7775C13.6502 10.3186 14.4389 10.0526 15.2552 10.0081C16.0714 9.96368 16.8844 10.1424 17.6067 10.5251C18.329 10.9078 18.9335 11.48 19.3551 12.1803C19.7768 12.8806 19.9997 13.6825 20 14.5ZM9.5 7.5C9.5 7.79667 9.41203 8.08668 9.2472 8.33335C9.08238 8.58003 8.84811 8.77229 8.57403 8.88582C8.29994 8.99935 7.99834 9.02906 7.70736 8.97118C7.41639 8.9133 7.14912 8.77044 6.93934 8.56066C6.72956 8.35088 6.5867 8.08361 6.52882 7.79264C6.47094 7.50166 6.50065 7.20006 6.61418 6.92597C6.72771 6.65189 6.91997 6.41762 7.16665 6.2528C7.41332 6.08797 7.70333 6 8 6C8.39782 6 8.77936 6.15804 9.06066 6.43934C9.34196 6.72064 9.5 7.10218 9.5 7.5Z" fill="currentColor" />
    </svg>
  )
}

const socialLinks = [
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/songcrymusic?igsh=NTc4MTIwNjQ2YQ==',
    Icon: IconInstagram,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@songcrymusic?_r=1&_t=ZP-93oAI22lOJz',
    Icon: IconTikTok,
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/profile.php?id=61586988044690&mibextid=wwXIfr',
    Icon: IconFacebook,
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/company/songcry/',
    Icon: IconLinkedIn,
  },
]

// Server component — hovers handled entirely via CSS classes (no JS event handlers needed)
export default function Footer() {
  return (
    <footer className="site-footer">
      {/* ── Zone A: Columns row ── */}
      <div className="footer-columns">
        {/* Left: logo lockup */}
        <Link href="/" className="footer-logo-link">
          <Image
            src="/framer/footer-logo.png"
            alt="Songcry"
            width={301}
            height={103}
            className="footer-logo-img"
          />
        </Link>

        {/* Right group: Contact Us + Company */}
        <div className="footer-right-cols">
          {/* Contact Us column */}
          <div>
            <h3 className="footer-col-heading">Contact Us</h3>
            <a
              href="mailto:support@songcry.app"
              className="footer-link footer-email"
            >
              Support@songcry.app
            </a>
          </div>

          {/* Company column */}
          <div>
            <h3 className="footer-col-heading">Company</h3>
            <nav aria-label="Company links">
              <ul className="footer-company-links">
                <li>
                  <Link href="/legal/terms-of-use" className="footer-link">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link href="/legal/privacy" className="footer-link">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/legal/community-guidelines" className="footer-link">
                    Community Guidelines
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      {/* ── Zone B: Bottom bar ── */}
      <div className="footer-bottom">
        <p className="footer-copyright">
          Copyright 2025 Songcry. All rights reserved
        </p>

        {/* Social icons */}
        <div className="footer-socials">
          {socialLinks.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Songcry on ${label}`}
              className="footer-social-icon"
            >
              <Icon />
            </a>
          ))}
        </div>
      </div>

      {/* Scoped CSS — server-safe (no JS required) */}
      <style>{`
        .site-footer {
          /* Framer look: a clean, VISIBLE grid/tile pattern with a CONTROLLED,
             subtle purple/pink wash (concentrated low-centre + softly behind the
             logo), over a gentle vertical lift to #101010. */
          background:
            repeating-linear-gradient(0deg, rgba(255,255,255,0.055) 0 1px, transparent 1px 64px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.055) 0 1px, transparent 1px 64px),
            radial-gradient(50% 70% at 50% 102%, rgba(196, 44, 176, 0.22), transparent 60%),
            radial-gradient(40% 60% at 16% 96%, rgba(190, 48, 175, 0.14), transparent 60%),
            linear-gradient(0deg, rgb(8, 7, 7) 0%, rgb(16, 16, 16) 100%);
          padding: 64px 64px 24px;
        }

        /* ── Columns row ── */
        .footer-columns {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          justify-content: space-between;
          gap: 32px;
          margin-bottom: 56px;
        }

        .footer-logo-link {
          display: inline-block;
          text-decoration: none;
          flex-shrink: 0;
        }

        .footer-logo-img {
          width: 301px;
          height: 103px;
          display: block;
        }

        .footer-right-cols {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          gap: 96px;
        }

        /* ── Column headings ── */
        .footer-col-heading {
          font-family: var(--font-albert);
          font-size: var(--fs-footer-h);
          font-weight: 600;
          line-height: var(--lh-footer-h);
          color: #fff;
          margin: 0;
        }

        /* ── Links (Contact + Company) ── */
        .footer-link {
          font-family: var(--font-albert);
          font-size: var(--fs-footer-link);
          font-weight: 400;
          color: var(--text-muted);
          text-decoration: none;
          transition: color 200ms ease;
          display: inline-block;
        }
        .footer-link:hover {
          color: #ffffff;
        }

        .footer-email {
          font-family: var(--font-inter);
          letter-spacing: -0.31px;
          line-height: 24px;
          margin-top: 21px;
        }

        .footer-company-links {
          list-style: none;
          margin: 21px 0 0 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 0;
        }
        .footer-company-links li {
          line-height: 31px;
        }

        /* ── Bottom bar ── */
        .footer-bottom {
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
        }

        .footer-copyright {
          font-family: var(--font-albert);
          font-size: 20px;
          font-weight: 400;
          line-height: 24px;
          color: var(--text-dim);
          margin: 0;
        }

        /* ── Social icons ── */
        .footer-socials {
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: 32px;
        }

        .footer-social-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-dim);
          transition: color 200ms ease;
          text-decoration: none;
          width: 32px;
          height: 32px;
          flex-shrink: 0;
        }
        .footer-social-icon:hover {
          color: #ffffff;
        }

        /* ── Tablet: 818–1199px ── */
        @media (max-width: 1199px) {
          .site-footer {
            padding: 64px 48px 24px;
          }
        }

        /* ── Phone: ≤817px ── */
        @media (max-width: 817px) {
          .site-footer {
            padding: 64px 24px 24px;
          }

          .footer-columns {
            flex-direction: column;
            align-items: flex-start;
            gap: 32px;
            margin-bottom: 32px;
          }

          .footer-logo-img {
            width: 200px !important;
            height: 68px !important;
          }

          .footer-right-cols {
            flex-direction: column;
            gap: 32px;
            width: 100%;
          }

          .footer-bottom {
            flex-direction: column;
            align-items: center;
            gap: 32px;
          }

          /* Socials appear above copyright on phone */
          .footer-socials {
            order: -1;
          }

          .footer-copyright {
            text-align: center;
          }
        }
      `}</style>
    </footer>
  )
}
