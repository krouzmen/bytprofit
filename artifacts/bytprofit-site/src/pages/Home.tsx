import { Link } from "wouter";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, TrendingUp } from "lucide-react";
import { useListServices } from "@workspace/api-client-react";
import { useContent } from "@/hooks/useContent";

const HOME_DEFAULTS: Record<string, string> = {
  home_hero_badge: "Rekonstrukce investičních bytů — Praha a okolí",
  home_hero_title1: "Levně. Rychle.",
  home_hero_title2: "Připraveno k prodeji.",
  home_hero_subtitle: "Specializujeme se na rychlé a cenově výhodné rekonstrukce investičních bytů před prodejem nebo pronájmem. Vyklizení, malování, podlahy, koupelna, kuchyně, elektrika — vše na klíč.",
  home_stat1_value: "350+", home_stat1_label: "Zrekonstruovaných bytů",
  home_stat2_value: "3–6", home_stat2_label: "Týdnů na realizaci",
  home_stat3_value: "98%", home_stat3_label: "Spokojených investorů",
  home_stat4_value: "15+", home_stat4_label: "Let zkušeností",
  home_usecases_title: "Rekonstrukce, která se vyplatí",
  home_usecases_subtitle: "Pracujeme s investory, majiteli bytů a realitními makléři. Víme, co trh chce — a doručíme to rychle a za rozumnou cenu.",
  home_usecase1_title: "Před prodejem",
  home_usecase1_desc: "Byt po rekonstrukci se prodá rychleji a za výrazně vyšší cenu. Investice do renovace se vám mnohonásobně vrátí.",
  home_usecase1_cta: "Chci prodat",
  home_usecase2_title: "Před pronájmem",
  home_usecase2_desc: "Rekonstruovaný byt získá vyššího nájemníka za vyšší nájemné. Méně starostí, vyšší výnos.",
  home_usecase2_cta: "Chci pronajímat",
  home_why_title: "Rekonstrukce investičního bytu bez starostí",
  home_why_subtitle: "Specializujeme se výhradně na investiční byty. Víme, co je důležité — rychlost, cena a výsledek, který osloví kupce nebo nájemníky. Žádné zbytečné nadstandardy, jen to, co zvyšuje hodnotu nemovitosti.",
  home_feature1_title: "Zvýšíme hodnotu vašeho bytu",
  home_feature1_desc: "Kvalitní rekonstrukce před prodejem nebo pronájmem výrazně zvyšuje cenu nemovitosti a zkracuje dobu prodeje.",
  home_feature2_title: "Hotovo za 3–6 týdnů",
  home_feature2_desc: "Rychlá realizace bez zbytečných průtahů. Koordinujeme všechny řemeslníky najednou, aby práce šla hladce a rychle.",
  home_feature3_title: "Pevná cena předem",
  home_feature3_desc: "Žádná překvapení na faktuře. Domluvíme se na ceně a rozsahu předem — a tu cenu dodržíme.",
  home_cta_title: "Chcete byt připravit k prodeji nebo pronájmu?",
  home_cta_subtitle: "Kontaktujte nás — přijedeme se podívat a připravíme vám nezávaznou kalkulaci zdarma.",
  home_cta_phone: "+420 731 599 333",
  home_cta_button: "Poslat poptávku online — zdarma a nezávazně",
};

const FEATURE_ICONS = [
  <TrendingUp className="w-6 h-6 text-primary" />,
  <Clock className="w-6 h-6 text-primary" />,
  <ShieldCheck className="w-6 h-6 text-primary" />,
];

export default function Home() {
  const c = useContent("home", HOME_DEFAULTS);
  const { data: services, isLoading } = useListServices();
  const featuredServices = services?.filter(s => s.featured).slice(0, 3) || [];

  const stats = [
    { value: c.home_stat1_value, label: c.home_stat1_label },
    { value: c.home_stat2_value, label: c.home_stat2_label },
    { value: c.home_stat3_value, label: c.home_stat3_label },
    { value: c.home_stat4_value, label: c.home_stat4_label },
  ];

  const features = [
    { icon: FEATURE_ICONS[0], title: c.home_feature1_title, description: c.home_feature1_desc },
    { icon: FEATURE_ICONS[1], title: c.home_feature2_title, description: c.home_feature2_desc },
    { icon: FEATURE_ICONS[2], title: c.home_feature3_title, description: c.home_feature3_desc },
  ];

  const useCases = [
    { icon: "🏦", title: c.home_usecase1_title, desc: c.home_usecase1_desc, cta: c.home_usecase1_cta },
    { icon: "🔑", title: c.home_usecase2_title, desc: c.home_usecase2_desc, cta: c.home_usecase2_cta },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-secondary">
          <img
            src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
            alt="Rekonstrukce investičního bytu"
            className="w-full h-full object-cover opacity-30 mix-blend-overlay"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/80 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/90 text-sm font-medium mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            {c.home_hero_badge}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold text-white mb-6 leading-tight"
          >
            {c.home_hero_title1}<br />
            <span className="text-primary">{c.home_hero_title2}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            {c.home_hero_subtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link
              href="/quote"
              className="w-full sm:w-auto px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Nezávazná poptávka zdarma
              <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/services"
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-md rounded-xl font-bold text-lg border border-white/20 transition-all duration-300 flex items-center justify-center"
            >
              Co nabízíme
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-border relative z-20 -mt-8 mx-4 sm:mx-8 lg:mx-auto max-w-5xl rounded-2xl shadow-xl p-8 lg:p-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-4xl md:text-5xl font-display font-extrabold text-secondary mb-2">{stat.value}</div>
              <div className="text-sm font-medium text-muted-foreground uppercase tracking-wider">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 bg-background">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">Pro koho to děláme</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-secondary mb-4">{c.home_usecases_title}</h3>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">{c.home_usecases_subtitle}</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {useCases.map((uc, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-card border border-border rounded-2xl p-8 shadow-lg hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="text-4xl mb-4">{uc.icon}</div>
                <h4 className="text-2xl font-bold text-foreground mb-3">{uc.title}</h4>
                <p className="text-muted-foreground leading-relaxed mb-6">{uc.desc}</p>
                <Link
                  href="/quote"
                  className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all"
                >
                  {uc.cta} <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-muted/40 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">Naše služby</h2>
            <h3 className="text-4xl md:text-5xl font-display font-bold text-secondary">Co vše zajistíme</h3>
          </div>

          {isLoading ? (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-80 bg-muted animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              {featuredServices.map((service, i) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                  className="bg-card rounded-2xl p-8 shadow-lg shadow-black/5 border border-border/50 hover:shadow-xl hover:border-primary/30 hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <span className="text-2xl">{service.icon}</span>
                  </div>
                  <h4 className="text-xl font-bold mb-3">{service.name}</h4>
                  <p className="text-muted-foreground mb-6 line-clamp-3">{service.shortDescription}</p>
                  <Link
                    href={`/quote?service=${service.slug}`}
                    className="inline-flex items-center text-primary font-semibold hover:text-primary/80"
                  >
                    Poslat poptávku <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12">
            <Link href="/services" className="inline-flex px-6 py-3 border-2 border-secondary text-secondary rounded-xl font-bold hover:bg-secondary hover:text-white transition-colors">
              Zobrazit všechny služby
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-secondary text-secondary-foreground overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-primary font-bold tracking-wider uppercase text-sm mb-3">Proč BytProfit</h2>
              <h3 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{c.home_why_title}</h3>
              <p className="text-secondary-foreground/70 text-lg mb-8 leading-relaxed">{c.home_why_subtitle}</p>

              <div className="space-y-6">
                {features.map((feature, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + (i * 0.1) }}
                    className="flex gap-4"
                  >
                    <div className="bg-secondary-foreground/5 p-3 rounded-xl h-fit border border-secondary-foreground/10">
                      {feature.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg mb-1">{feature.title}</h4>
                      <p className="text-secondary-foreground/60">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                {["Vyklizení bytu", "Malování", "Nové podlahy", "Štukování stěn", "Nová koupelna", "Nová kuchyň", "Elektroinstalace", "Koordinace na klíč"].map(item => (
                  <div key={item} className="flex items-center gap-2 text-white/80 text-sm bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-primary shrink-0" /> {item}
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden shadow-2xl h-[600px]"
            >
              <img
                src={`${import.meta.env.BASE_URL}images/hero-bg.png`}
                alt="Rekonstrukce investičního bytu"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border-4 border-white/10 rounded-2xl z-10 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-primary relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6">{c.home_cta_title}</h2>
          <p className="text-white/90 text-xl mb-4">{c.home_cta_subtitle}</p>
          <p className="text-white/75 text-lg mb-10">
            Zavolejte nám: <a href={`tel:${c.home_cta_phone.replace(/\s/g, "")}`} className="font-bold underline underline-offset-4">{c.home_cta_phone}</a>
          </p>
          <Link
            href="/quote"
            className="inline-flex px-10 py-5 bg-white text-primary rounded-xl font-bold text-xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
          >
            {c.home_cta_button}
          </Link>
        </div>
      </section>
    </div>
  );
}
