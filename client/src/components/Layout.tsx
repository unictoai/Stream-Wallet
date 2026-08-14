// Midnight Ticket Stub: asymmetric cinema layout with persistent desktop rail and compact mobile dock.
import { Link, useLocation } from "wouter";
import { Bookmark, Compass, Home, Search, Ticket } from "lucide-react";
import { BrandMark } from "@/components/BrandMark";

const navItems = [{ href: "/", label: "Home", icon: Home }, { href: "/#explore", label: "Explore", icon: Compass }, { href: "/#wallet", label: "My wallet", icon: Bookmark }];

export function Layout({ children }: { children: React.ReactNode }) {
  const [location] = useLocation();
  return <div className="app-shell"><aside className="side-rail"><Link href="/" className="brand-lockup" aria-label="Stream-Wallet home"><BrandMark /><span><strong>STREAM</strong><em>WALLET</em></span></Link><div className="rail-kicker"><Ticket size={13} /> Cinema program</div><div className="rail-ticket"><span>PROGRAM 01</span><strong>Open film shelf</strong><small>Pick a title · keep moving</small></div><nav className="side-nav" aria-label="Primary navigation">{navItems.map((item) => { const Icon = item.icon; const active = item.href === "/" ? location === "/" : location.includes(item.href.replace("/#", "")); return <Link key={item.href} href={item.href} className={active ? "side-nav__link is-active" : "side-nav__link"}><Icon size={17} /> {item.label}</Link>; })}</nav><div className="rail-footer"><div className="source-stamp">RIGHTS-AWARE DEMO</div><p>Metadata, not a movie library.</p></div></aside><div className="mobile-topbar"><Link href="/" className="brand-lockup"><BrandMark compact /><span><strong>STREAM</strong><em>WALLET</em></span></Link><Link href="/#explore" className="icon-button" aria-label="Search catalog"><Search size={19} /></Link></div><main className="main-stage">{children}</main><nav className="mobile-dock" aria-label="Mobile navigation">{navItems.map((item) => { const Icon = item.icon; return <Link key={item.href} href={item.href} className="mobile-dock__link"><Icon size={18} /><span>{item.label}</span></Link>; })}</nav></div>;
}
