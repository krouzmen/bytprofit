import { Link, useRoute } from "wouter";
import { Menu, X, Hammer } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Úvod" },
  { href: "/services", label: "Služby" },
  { href: "/truhlarstvi", label: "Truhlářství" },
  { href: "/about", label: "O nás" },
];

function DesktopNavItem({ href, label }: { href: string; label: string }) {
  const [isActive] = useRoute(href);
  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-semibold transition-colors duration-200 relative py-1",
        isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
      )}
    >
      {label}
      {isActive && (
        <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
      )}
    </Link>
  );
}

function MobileNavItem({ href, label, onClose }: { href: string; label: string; onClose: () => void }) {
  const [isActive] = useRoute(href);
  return (
    <Link
      href={href}
      onClick={onClose}
      className={cn(
        "block text-lg font-semibold px-4 py-4 rounded-xl transition-colors",
        isActive ? "bg-primary/10 text-primary" : "text-foreground active:bg-muted"
      )}
    >
      {label}
    </Link>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
          scrolled
            ? "bg-background/95 border-border/50 py-3 shadow-sm"
            : "bg-background border-transparent py-5"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group" onClick={() => setIsOpen(false)}>
            <div className="bg-primary text-primary-foreground p-2 rounded-xl shadow-md shadow-primary/20">
              <Hammer className="w-5 h-5" />
            </div>
            <span className="font-display font-bold text-2xl tracking-tight text-foreground">
              Byt<span className="text-primary">Profit</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <DesktopNavItem key={link.href} href={link.href} label={link.label} />
            ))}
            <Link
              href="/quote"
              className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/25 hover:opacity-90 active:opacity-80 transition-opacity"
            >
              Nezávazná poptávka
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            type="button"
            className="md:hidden p-3 -mr-1 text-foreground rounded-xl active:bg-muted transition-colors"
            onClick={() => setIsOpen((v) => !v)}
            aria-label={isOpen ? "Zavřít menu" : "Otevřít menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Nav — rendered outside header to avoid z-index/overflow issues */}
      {isOpen && (
        <div className="fixed inset-x-0 top-[64px] z-40 md:hidden bg-background border-b border-border shadow-xl">
          <div className="px-4 pt-3 pb-6 flex flex-col gap-1 max-h-[calc(100vh-64px)] overflow-y-auto">
            {navLinks.map((link) => (
              <MobileNavItem
                key={link.href}
                href={link.href}
                label={link.label}
                onClose={() => setIsOpen(false)}
              />
            ))}
            <div className="pt-2">
              <Link
                href="/quote"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-4 text-center text-lg font-bold bg-primary text-primary-foreground rounded-xl shadow-md active:opacity-80 transition-opacity"
              >
                Nezávazná poptávka
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-30 md:hidden bg-black/20"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
