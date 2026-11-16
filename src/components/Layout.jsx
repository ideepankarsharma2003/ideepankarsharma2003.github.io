import { useEffect, useRef, useState } from "react";
import ThemeToggle from "./ThemeToggle.jsx";

const links = [
  ["About", "/index.html#about"],
  ["Films", "/index.html#curiosity"],
  ["Journal", "/blog.html"],
  ["Community", "/index.html#connection"],
  ["Work", "/work.html"],
];

export function Header({ active }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const button = useRef(null);
  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === "Escape" && menuOpen) {
        setMenuOpen(false);
        button.current?.focus();
      }
    }
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="sq-header sq-glass">
        <div className="sq-wrap sq-header-inner">
          <a
            className="sq-brand"
            href="/"
            aria-label="SIDEQUEST, Deepankar Sharma home"
          >
            <img
              src="/assets/img/sidequest/favicon.svg"
              width="31"
              height="31"
              alt=""
            />
            <span>
              SIDEQUEST<small>DEEPANKAR SHARMA</small>
            </span>
          </a>
          <nav
            className={`sq-nav${menuOpen ? " is-open" : ""}`}
            id="site-nav"
            aria-label="Main navigation"
          >
            {links.map(([name, href]) => (
              <a
                key={name}
                href={href}
                aria-current={active === name ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {name}
              </a>
            ))}
          </nav>
          <div className="sq-header-actions">
            <ThemeToggle />
            <button
              ref={button}
              className="sq-menu-button"
              type="button"
              aria-label={menuOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={menuOpen}
              aria-controls="site-nav"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? "CLOSE" : "MENU"}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}

export function Footer() {
  return (
    <footer className="sq-footer" id="contact">
      <div className="sq-wrap">
        <p className="eyebrow">A question, a thought, a hello</p>
        <h2>
          Say hello.
          <br />
          <em>Swap a story.</em>
        </h2>
        <a className="btn-primary" href="mailto:deepankarsharma2003@gmail.com">
          Send me a note ↗
        </a>
        <div className="sq-footer-contacts">
          <div>
            <p>Email</p>
            <a href="mailto:deepankarsharma2003@gmail.com">
              deepankarsharma2003@gmail.com
            </a>
          </div>
          <div>
            <p>Call or WhatsApp</p>
            <a
              href="https://wa.me/919639102301"
              target="_blank"
              rel="noopener noreferrer"
            >
              +91 96391 02301 ↗
            </a>
          </div>
          <div>
            <p>LinkedIn</p>
            <a
              href="https://www.linkedin.com/in/ideepankarsharma2003/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Let’s connect ↗
            </a>
          </div>
          <div>
            <p>GitHub</p>
            <a
              href="https://github.com/ideepankarsharma2003"
              target="_blank"
              rel="noopener noreferrer"
            >
              Explore the code ↗
            </a>
          </div>
        </div>
        <div className="sq-footer-links">
          <a href="/work.html">All projects ↗</a>
          <a href="/blog.html">The journal ↗</a>
          <a href="/resume.html">Resume ↗</a>
          <a href="/write.html">Writing desk ↗</a>
          <a
            href="https://www.objectorientedteens.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            My studio ↗
          </a>
        </div>
        <p className="sq-footer-wordmark" aria-hidden="true">
          SIDEQUEST
        </p>
        <div className="sq-footer-bottom">
          <span>© 2026 Deepankar Sharma</span>
          <span>From Uttarakhand. Still exploring.</span>
          <a href="#main">Back to top ↑</a>
        </div>
      </div>
    </footer>
  );
}
