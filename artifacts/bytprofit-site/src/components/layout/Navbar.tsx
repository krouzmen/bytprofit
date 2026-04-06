import { Link, useRoute } from "wouter";
import { Menu, X, Hammer } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { href: "/", label: "Úvod" },
  { href: "/services", label: "Služby" },
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
        <motion.div
          layoutId="nav-indicator"
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
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
        "block text-lg font-medium px-4 py-3 rounded-lg transition-colors",
        isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:bg-muted"
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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-background/80 backdrop-blur-md border-border/50 py-3 shadow-sm"
          : "bg-background border-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-primary text-primary-foreground p-2 rounded-xl group-hover:scale-105 transition-transform duration-300 shadow-md shadow-primary/20">
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
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
          >
            Nezávazná poptávka
          </Link>
        </nav>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-3 text-foreground rounded-lg active:bg-muted transition-colors"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <div className="px-4 pt-2 pb-6 flex flex-col gap-1">
              {navLinks.map((link) => (
                <MobileNavItem
                  key={link.href}
                  href={link.href}
                  label={link.label}
                  onClose={() => setIsOpen(false)}
                />
              ))}
              <Link
                href="/quote"
                onClick={() => setIsOpen(false)}
                className="mt-4 px-4 py-3 text-center bg-primary text-primary-foreground rounded-xl font-semibold shadow-md shadow-primary/25 active:opacity-80 transition-opacity"
              >
                Nezávazná poptávka
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
