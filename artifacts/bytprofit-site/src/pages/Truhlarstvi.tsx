import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const woods = ["Dub", "Buk", "Borovice", "Smrk", "Ořech", "Jasan", "Třešeň"];

const DEFAULTS = {
  truhlarstvi_hero_badge: "Truhlářství Podkrušnohoří",
  truhlarstvi_hero_title1: "Nábytek z masivu —",
  truhlarstvi_hero_title2: "přímo z Podkrušnohoří",
  truhlarstvi_hero_desc:
    "Truhlářská dílna z Podkrušnohoří s dlouholetou tradicí. Vyrábíme veškerý nábytek z přírodního dřeva na míru — od kuchyní po ložnice, od kanceláří po zahrady. Každý kus je originál.",
  truhlarstvi_products_title: "Co vyrábíme",
  truhlarstvi_products_desc:
    "Zakázkový nábytek všech druhů. Pracujeme s přírodním dřevem a klademe důraz na precizní řemeslo a dlouhou životnost.",
  truhlarstvi_prod1_icon: "🛋️",
  truhlarstvi_prod1_title: "Obývací nábytek",
  truhlarstvi_prod1_desc:
    "Pohovky, vitríny, TV stěny, police a skříně do obývacích pokojů — vše na míru dle přání zákazníka.",
  truhlarstvi_prod2_icon: "🛏️",
  truhlarstvi_prod2_title: "Ložnicový nábytek",
  truhlarstvi_prod2_desc:
    "Postele, noční stolky, komody a šatní skříně. Kvalitní spánek i elegantní styl.",
  truhlarstvi_prod3_icon: "📚",
  truhlarstvi_prod3_title: "Pracovní a kancelářský nábytek",
  truhlarstvi_prod3_desc:
    "Pracovní stoly, knihovny, vestavěné regály — funkční řešení pro domácí kanceláře i firmy.",
  truhlarstvi_prod4_icon: "🌿",
  truhlarstvi_prod4_title: "Zahradní a venkovní nábytek",
  truhlarstvi_prod4_desc:
    "Zahradní lavičky, posezení, pergoly a truhlíky z odolného dřeva. Krása i trvanlivost.",
  truhlarstvi_about_title1: "Tradiční řemeslo",
  truhlarstvi_about_title2: "z Podkrušnohoří",
  truhlarstvi_about_p1:
    "Naše truhlárna sídlí v srdci Podkrušnohoří — regionu s bohatou tradicí zpracování dřeva. Vyrábíme nábytek s vášní pro materiál a poctivým přístupem ke každé zakázce.",
  truhlarstvi_about_p2:
    "Každý kus nábytku vyrábíme ručně podle individuálních požadavků zákazníka. Používáme výhradně prověřené dřevo z udržitelných zdrojů a ekologické povrchové úpravy šetrné k životnímu prostředí.",
  truhlarstvi_about_p3:
    "Spolupracujeme s BytProfit na rekonstrukcích investičních bytů v Karlových Varech, Plzni a okolí — dodáváme kuchyně, vestavěné skříně a veškerý nábytek na míru přímo do vašeho bytu.",
  truhlarstvi_cta_title: "Máte zájem o nábytek na míru?",
  truhlarstvi_cta_desc:
    "Pošlete nám nezávaznou poptávku. Rádi vám poradíme s výběrem materiálu, designem a termínem dodání.",
};

export default function Truhlarstvi() {
  const c = useContent("truhlarstvi", DEFAULTS);

  const products = [
    { icon: c.truhlarstvi_prod1_icon, title: c.truhlarstvi_prod1_title, desc: c.truhlarstvi_prod1_desc },
    { icon: c.truhlarstvi_prod2_icon, title: c.truhlarstvi_prod2_title, desc: c.truhlarstvi_prod2_desc },
    { icon: c.truhlarstvi_prod3_icon, title: c.truhlarstvi_prod3_title, desc: c.truhlarstvi_prod3_desc },
    { icon: c.truhlarstvi_prod4_icon, title: c.truhlarstvi_prod4_title, desc: c.truhlarstvi_prod4_desc },
  ];

  return (
    <div className="min-h-screen pt-20 bg-background">

      {/* Hero with furniture background image */}
      <section className="relative text-white py-20 overflow-hidden min-h-[480px] flex items-center">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/images/craftsman.png)" }}
        />
        <div className="absolute inset-0 bg-secondary/80" />
        <div className="relative w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
          >
            🪑 {c.truhlarstvi_hero_badge}
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight"
          >
            {c.truhlarstvi_hero_title1}
            <br className="hidden sm:block" />
            <span className="text-primary">{c.truhlarstvi_hero_title2}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/85 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {c.truhlarstvi_hero_desc}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <Link
              href="/poptavka-nabytku"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
            >
              Nezávazná poptávka nábytku <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
            {c.truhlarstvi_products_title}
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            {c.truhlarstvi_products_desc}
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border/50 rounded-2xl p-7 hover:border-primary/40 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5 group-hover:bg-primary transition-colors duration-300 text-3xl">
                {p.icon}
              </div>
              <h3 className="text-base font-bold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* CTA below grid */}
        <div className="text-center mt-12">
          <Link
            href="/poptavka-nabytku"
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-secondary text-white font-bold rounded-xl hover:opacity-90 transition-opacity shadow-md"
          >
            Poptat nábytek na míru <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Wood types strip */}
      <section className="bg-muted/50 border-y border-border py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-6">
            Pracujeme s těmito druhy dřeva
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {woods.map((w) => (
              <span
                key={w}
                className="px-5 py-2 bg-background border border-border rounded-full text-sm font-semibold text-foreground shadow-sm"
              >
                🌳 {w}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Story / about */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
              {c.truhlarstvi_about_title1}
              <br />
              <span className="text-primary">{c.truhlarstvi_about_title2}</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {c.truhlarstvi_about_p1}
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              {c.truhlarstvi_about_p2}
            </p>
            <p className="text-muted-foreground leading-relaxed">
              {c.truhlarstvi_about_p3}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { value: "15+", label: "let zkušeností" },
              { value: "500+", label: "zakázek ročně" },
              { value: "100%", label: "přírodní materiály" },
              { value: "7", label: "druhů dřeva" },
            ].map((s, i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-6 text-center shadow-sm"
              >
                <div className="text-3xl font-display font-extrabold text-primary mb-1">
                  {s.value}
                </div>
                <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-secondary text-white py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            {c.truhlarstvi_cta_title}
          </h2>
          <p className="text-white/75 mb-8 leading-relaxed">
            {c.truhlarstvi_cta_desc}
          </p>
          <Link
            href="/poptavka-nabytku"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-white font-bold text-lg rounded-xl shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
          >
            Odeslat poptávku nábytku <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

    </div>
  );
}
