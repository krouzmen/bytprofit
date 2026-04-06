import { SITE_CONTENT } from "@/content";

export function Footer() {
  const { footer, company } = SITE_CONTENT;

  return (
    <footer className="bg-secondary text-secondary-foreground py-12 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6 text-center">
        <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-primary font-bold text-2xl font-display mx-auto mb-6">
          bP
        </div>
        <p className="text-xl font-bold text-white mb-2">{company.name}</p>
        <p className="text-secondary-foreground/60 mb-8">{company.tagline}</p>
        <div className="h-px w-full max-w-sm mx-auto bg-white/10 mb-8" />
        <p className="text-secondary-foreground/50 text-sm">
          {footer.copyright}
        </p>
      </div>
    </footer>
  );
}
