import { Link } from "wouter";
import { Hammer, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground p-1.5 rounded-lg">
                <Hammer className="w-5 h-5" />
              </div>
              <span className="font-display font-bold text-2xl tracking-tight">
                Byt<span className="text-primary">Profit</span>
              </span>
            </div>
            <p className="text-secondary-foreground/70 leading-relaxed">
              Profesionální rekonstrukce bytů na klíč. Realizujeme vše od koupelny po kompletní rekonstrukci — s pečlivostí, kvalitou a transparentní komunikací.
            </p>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Rychlé odkazy</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-secondary-foreground/70 hover:text-white transition-colors">Úvod</Link></li>
              <li><Link href="/services" className="text-secondary-foreground/70 hover:text-white transition-colors">Naše služby</Link></li>
              <li><Link href="/about" className="text-secondary-foreground/70 hover:text-white transition-colors">O nás</Link></li>
              <li><Link href="/quote" className="text-secondary-foreground/70 hover:text-white transition-colors">Poptávka zdarma</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Služby</h3>
            <ul className="space-y-3 text-secondary-foreground/70">
              <li>Rekonstrukce koupelny</li>
              <li>Rekonstrukce kuchyně</li>
              <li>Kompletní rekonstrukce bytu</li>
              <li>Podlahy a malíři</li>
            </ul>
          </div>

          <div>
            <h3 className="font-display font-semibold text-lg mb-4">Kontakt</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-secondary-foreground/70">
                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <span>Karlovy Vary, Plzeň a okolí</span>
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/70">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+420 731 599 333</span>
              </li>
              <li className="flex items-center gap-3 text-secondary-foreground/70">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>info@bytprofit.cz</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-secondary-foreground/50 text-sm">
            © {new Date().getFullYear()} BytProfit — Rekonstrukce bytů. Všechna práva vyhrazena.
          </p>
          <div className="flex gap-4 text-sm text-secondary-foreground/50">
            <span className="hover:text-white cursor-pointer transition-colors">Zásady ochrany soukromí</span>
            <span className="hover:text-white cursor-pointer transition-colors">Obchodní podmínky</span>
            <Link href="/admin" className="hover:text-white transition-colors">Správa</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
