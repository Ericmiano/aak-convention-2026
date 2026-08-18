/**
 * Coastal Civic Modernism: a Convention-only shell using a structural span mark,
 * editorial rails, and a direct, always-accessible registration action.
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { assets, eventData } from "@/data/conventionData";

const navItems = [
  ["/programme", "Programme"],
  ["/theme", "Theme"],
  ["/speakers", "Speakers"],
  ["/experience", "Experience"],
  ["/venue", "Venue"],
] as const;

export function StructuralMark({ className = "" }: { className?: string }) {
  return <img className={`structural-mark ${className}`} src={assets.mark} alt="" aria-hidden="true" />;
}

export function ConventionHeader() {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="brand-lockup" aria-label="AAK Annual Convention 2026 home" onClick={() => setMenuOpen(false)}>
          <StructuralMark />
          <span><b>AAK</b><i>Annual Convention<br />2026</i></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([href, label]) => <Link key={href} href={href} className={location === href ? "active" : ""}>{label}</Link>)}
        </nav>
        <div className="header-actions">
          <a className="register-link" href={eventData.registrationUrl} target="_blank" rel="noreferrer">Register <ArrowUpRight size={14} /></a>
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}<span className="sr-only">Menu</span></button>
        </div>
      </div>
      <nav id="mobile-navigation" className={`mobile-nav ${menuOpen ? "is-open" : ""}`} aria-label="Mobile navigation">
        {navItems.map(([href, label], index) => <Link key={href} href={href} onClick={() => setMenuOpen(false)}><span>0{index + 1}</span>{label}</Link>)}
        <Link href="/register" onClick={() => setMenuOpen(false)}><span>06</span>Registration</Link>
      </nav>
    </header>
  );
}

export function ConventionFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand"><StructuralMark /><p>AAK Annual<br />Convention 2026</p></div>
        <div><p className="eyebrow">The Convention</p><p className="footer-statement">16—19 September<br />Diani, Kenya</p></div>
        <div><p className="eyebrow">Secretariat</p><a href={`mailto:${eventData.contact.email}`}>{eventData.contact.email}</a><a href={`tel:${eventData.contact.phone.replace(/\s/g, "")}`}>{eventData.contact.phone}</a></div>
        <div><p className="eyebrow">Association</p><a href={eventData.contact.official} target="_blank" rel="noreferrer">AAK official website <ArrowUpRight size={13} /></a><a href="/register">Registration information</a></div>
      </div>
      <div className="footer-bottom"><span>© 2026 Architectural Association of Kenya</span><span>Privacy / Terms</span></div>
    </footer>
  );
}

export function PageFrame({ children }: { children: React.ReactNode }) {
  return <><ConventionHeader /><main>{children}</main><ConventionFooter /></>;
}
