import { motion } from "framer-motion";
import { SITE_CONTENT } from "@/content";
import { Button } from "@/components/ui/button";

export function Hero() {
  const { hero, company } = SITE_CONTENT;

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="/images/hero-bg.png"
          alt="Modern flat interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/90 via-secondary/70 to-transparent" />
      </div>

      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary-foreground mb-6 backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              {company.tagline}
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight leading-[1.1] mb-6">
              {hero.headline}
            </h1>
            
            <p className="text-xl md:text-2xl text-white/90 mb-10 max-w-2xl font-light leading-relaxed">
              {hero.subheadline}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="text-lg px-8 h-14 font-semibold" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                {hero.ctaButton}
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8 h-14 font-semibold bg-white/10 text-white border-white/20 hover:bg-white/20 hover:text-white" onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}>
                Our Services
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
