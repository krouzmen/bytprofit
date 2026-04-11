import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, TreePine, Sofa, DoorOpen, BookOpen, ChefHat, Bed } from "lucide-react";

const products = [
  {
    icon: <Sofa className="w-7 h-7" />,
    title: "Obývací nábytek",
    desc: "Pohovky, vitríny, TV stěny, police a skříně do obývacích pokojů — vše na míru dle přání zákazníka.",
  },
  {
    icon: <ChefHat className="w-7 h-7" />,
    title: "Kuchyňský nábytek",
    desc: "Kuchyňské linky, ostrůvky, jídelní stoly a lavice. Masivní dřevo i moderní povrchy.",
  },
  {
    icon: <Bed className="w-7 h-7" />,
    title: "Ložnicový nábytek",
    desc: "Postele, noční stolky, komody a šatní skříně. Kvalitní spánek i elegantní styl.",
  },
  {
    icon: <DoorOpen className="w-7 h-7" />,
    title: "Dveře a zárubně",
    desc: "Interiérové dřevěné dveře, posuvné dveře a vestavěné skříně. Přesné provedení, dokonalý spoj.",
  },
  {
    icon: <BookOpen className="w-7 h-7" />,
    title: "Pracovní a kancelářský nábytek",
    desc: "Pracovní stoly, knihovny, vestavěné regály — funkční řešení pro domácí kanceláře i firmy.",
  },
  {
    icon: <TreePine className="w-7 h-7" />,
    title: "Zahradní a venkovní nábytek",
    desc: "Zahradní lavičky, posezení, pergoly a truhlíky z odolného dřeva. Krása i trvanlivost.",
  },
];

const woods = ["Dub", "Buk", "Borovice", "Smrk", "Ořech", "Jasan", "Třešeň"];

export default function Truhlarstvi() {
  return (
    <div className="min-h-screen pt-20 bg-background">

      {/* Hero */}
      <section className="relative bg-secondary text-white py-20 overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)",
            backgroundSize: "20px 20px",
          }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full text-sm font-medium mb-6"
          >
            🪑 Truhlářství Podkrušnohoří
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6 leading-tight"
          >
            Nábytek z masivu —<br className="hidden sm:block" />
            <span className="text-primary">přímo z Podkrušnohoří</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Truhlářská dílna z Podkrušnohoří s dlouholetou tradicí. Vyrábíme veškerý
            nábytek z přírodního dřeva na míru — od kuchyní po ložnice, od kanceláří
            po zahrady. Každý kus je originál.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
            >
              Nezávazná poptávka <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="tel:+420724496091"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/15 text-white font-semibold rounded-xl hover:bg-white/25 transition-colors"
            >
              📞 +420 724 496 091
            </a>
          </motion.div>
        </div>
      </section>

      {/* Products grid */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">Co vyrábíme</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Zakázkový nábytek všech druhů. Pracujeme s přírodním dřevem a klademe
            důraz na precizní řemeslo a dlouhou životnost.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="bg-card border border-border/50 rounded-2xl p-7 hover:border-primary/40 hover:shadow-lg hover:shadow-black/5 transition-all duration-300 group"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                {p.icon}
              </div>
              <h3 className="text-lg font-bold mb-2">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
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
              Tradiční řemeslo<br />
              <span className="text-primary">z Podkrušnohoří</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Naše truhlárna sídlí v srdci Podkrušnohoří — regionu s bohatou tradicí
              zpracování dřeva. Vyrábíme nábytek s vášní pro materiál a poctivým
              přístupem ke každé zakázce.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Každý kus nábytku vyrábíme ručně podle individuálních požadavků zákazníka.
              Používáme výhradně prověřené dřevo z udržitelných zdrojů a ekologické
              povrchové úpravy šetrné k životnímu prostředí.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Spolupracujeme s <strong>BytProfit</strong> na rekonstrukcích investičních
              bytů v Karlových Varech, Plzni a okolí — dodáváme kuchyně, vestavěné
              skříně a veškerý nábytek na míru přímo do vašeho bytu.
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
            Máte zájem o nábytek na míru?
          </h2>
          <p className="text-white/75 mb-8 leading-relaxed">
            Pošlete nám nezávaznou poptávku nebo zavolejte. Rádi vám poradíme
            s výběrem materiálu, designem a termínem dodání.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/30 hover:opacity-90 transition-opacity"
            >
              Odeslat poptávku <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="mailto:bytprofit@gmail.com"
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-white/15 text-white font-semibold rounded-xl hover:bg-white/25 transition-colors"
            >
              ✉️ bytprofit@gmail.com
            </a>
          </div>
        </div>
      </section>

    </div>
  );
}
