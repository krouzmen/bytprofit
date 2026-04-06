import { SITE_CONTENT } from "@/content";
import { Link } from "wouter";

export function Header() {
  const { company } = SITE_CONTENT;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border transition-all duration-300">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center text-primary-foreground font-bold text-xl font-display group-hover:bg-secondary transition-colors">
            bP
          </div>
          <span className="text-2xl font-bold text-secondary font-display tracking-tight">
            {company.name}
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium text-secondary/80 hover:text-primary transition-colors">
            Services
          </button>
          <button onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-medium text-secondary/80 hover:text-primary transition-colors">
            Gallery
          </button>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="px-6 py-2.5 rounded-full bg-secondary text-secondary-foreground font-medium hover:bg-primary transition-colors">
            Get a Quote
          </button>
        </nav>
      </div>
    </header>
  );
}
