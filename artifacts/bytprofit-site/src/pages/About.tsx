import { motion } from "framer-motion";
import { Award, Target, Users, ThumbsUp, CheckCircle2, TrendingUp } from "lucide-react";
import { useContent } from "@/hooks/useContent";

const ABOUT_DEFAULTS: Record<string, string> = {
  about_hero_title1: "Investiční byt",
  about_hero_title2: "připravíme rychle.",
  about_hero_p1: "BytProfit vznikl před více než 12 lety se zaměřením na jedinou věc — rychlé a cenově výhodné rekonstrukce bytů před prodejem nebo pronájmem.",
  about_hero_p2: "Pracujeme primárně s investory, developery a realitními makléři, kteří potřebují byt připravit rychle a efektivně. Víme, na čem záleží a co naopak není třeba přehánět.",
  about_hero_p3: "Za dobu naší existence jsme zrekonstruovali přes 350 bytů v Karlových Varech, Plzni a okolí. Každý projekt dokončujeme v dohodnutém termínu a za dohodnutou cenu — bez výmluv a překvapení.",
  about_hero_quote: "Rekonstrukce, která zvyšuje hodnotu vašeho bytu.",
  about_forwhom1_title: "Investoři a flippeři",
  about_forwhom1_desc: "Koupili jste byt k prodeji se ziskem? Připravíme ho rychle a efektivně tak, aby zaujal co nejvíce kupců a dosáhl nejvyšší ceny.",
  about_forwhom2_title: "Pronajímatelé",
  about_forwhom2_desc: "Chcete byt pronajímat za vyšší nájem a lepším nájemníkům? Rekonstruovaný byt přitáhne spolehlivé nájemce a dovolí vám navýšit nájemné.",
  about_forwhom3_title: "Realitní makléři",
  about_forwhom3_desc: "Spolupracujeme s makléři, kteří potřebují byt rychle připravit k prodeji. Rychlost, kvalita a spolehlivost — to je naše vizitka.",
  about_value1_title: "Výnosnost",
  about_value1_desc: "Každá investice do rekonstrukce by se vám měla vrátit. Navrhujeme jen to, co má smysl.",
  about_value2_title: "Rychlost",
  about_value2_desc: "Čas jsou peníze. Dokončujeme v termínu, aby váš byt mohl co nejdříve vydělávat.",
  about_value3_title: "Partnerství",
  about_value3_desc: "S investory spolupracujeme dlouhodobě. Váš úspěch je i náš úspěch.",
  about_value4_title: "Poctivost",
  about_value4_desc: "Férová cena, žádné vícepráce navíc, jasná smlouva a splněné slovo.",
};

const VALUE_ICONS = [
  <TrendingUp className="w-8 h-8" />,
  <Target className="w-8 h-8" />,
  <Users className="w-8 h-8" />,
  <ThumbsUp className="w-8 h-8" />,
];

export default function About() {
  const c = useContent("about", ABOUT_DEFAULTS);

  const forWhom = [
    { icon: "🏦", title: c.about_forwhom1_title, desc: c.about_forwhom1_desc },
    { icon: "🔑", title: c.about_forwhom2_title, desc: c.about_forwhom2_desc },
    { icon: "🤝", title: c.about_forwhom3_title, desc: c.about_forwhom3_desc },
  ];

  const values = [
    { icon: VALUE_ICONS[0], title: c.about_value1_title, desc: c.about_value1_desc },
    { icon: VALUE_ICONS[1], title: c.about_value2_title, desc: c.about_value2_desc },
    { icon: VALUE_ICONS[2], title: c.about_value3_title, desc: c.about_value3_desc },
    { icon: VALUE_ICONS[3], title: c.about_value4_title, desc: c.about_value4_desc },
  ];

  return (
    <div className="min-h-screen pt-28 bg-background">
      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-6xl font-display font-bold text-foreground mb-6">
              {c.about_hero_title1}<br />
              <span className="text-primary">{c.about_hero_title2}</span>
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">{c.about_hero_p1}</p>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">{c.about_hero_p2}</p>
            <p className="text-lg text-muted-foreground leading-relaxed">{c.about_hero_p3}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative rounded-3xl overflow-hidden shadow-2xl h-[500px]"
          >
            <img
              src="https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop"
              alt="Rekonstrukce investičního bytu"
              className="w-full h-full object-cover"
              onError={(e) => { (e.target as HTMLImageElement).src = ""; }}
            />
            <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 p-8">
              <p className="text-white font-medium text-lg">„{c.about_hero_quote}"</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* For whom */}
      <section className="bg-muted/40 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Pro koho pracujeme</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {forWhom.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border rounded-2xl p-8 shadow-sm"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="text-xl font-bold text-foreground mb-3">{item.title}</h4>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-secondary text-secondary-foreground py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-display font-bold text-white mb-4">Naše hodnoty</h2>
            <p className="text-secondary-foreground/70 max-w-2xl mx-auto text-lg">
              Principy, které řídí každou naši zakázku.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center hover:bg-white/10 transition-colors"
              >
                <div className="w-16 h-16 bg-primary/20 text-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                  {v.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
                <p className="text-secondary-foreground/60">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* What we arrange */}
      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">Co vše za vás zařídíme</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Kompletní servis od vyklizení až po předání klíčů — vy jen schválíte výsledek.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { title: "Vyklizení bytu", desc: "Odvoz starého nábytku, odpadu a nepotřebných věcí. Začínáme od nuly." },
              { title: "Malování a štukování", desc: "Oprava stěn, štukování, vyrovnání a nový nátěr v moderních barvách." },
              { title: "Nové podlahy", desc: "Vinyl, laminát, dlažba nebo parkety — rychle a za rozumnou cenu." },
              { title: "Nová koupelna", desc: "Kompletní rekonstrukce koupelny včetně obkladů, sanity a instalatérských prací." },
              { title: "Nová kuchyň", desc: "Kuchyňská linka na míru nebo standardizovaná sestava — záleží na vašem rozpočtu." },
              { title: "Elektroinstalace", desc: "Nové rozvody, zásuvky, osvětlení — vše s revizní zprávou." },
              { title: "Koordinace řemesel", desc: "Elektrikář, instalatér, malíř, podlahář — vše koordinujeme sami." },
              { title: "Předání na klíč", desc: "Byt předáme čistý, uklizený a připravený k focení nebo nastěhování." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4 bg-card border border-border rounded-2xl p-6"
              >
                <CheckCircle2 className="w-6 h-6 text-primary shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
