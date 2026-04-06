import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Settings2 } from "lucide-react";
import { useListServices } from "@workspace/api-client-react";

export default function Services() {
  const { data: services, isLoading, error } = useListServices();

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      {/* Header */}
      <div className="bg-secondary text-white py-16 mb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-display font-bold mb-6"
          >
            Naše služby pro investiční byty
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/80 max-w-2xl mx-auto"
          >
            Vše, co potřebujete k přípravě bytu na prodej nebo pronájem — rychle, levně a profesionálně.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="h-[400px] bg-muted animate-pulse rounded-2xl" />
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="inline-flex bg-destructive/10 text-destructive p-4 rounded-full mb-4">
              <Settings2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Nepodařilo se načíst služby</h3>
            <p className="text-muted-foreground">Zkuste prosím obnovit stránku.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services?.map((service, i) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-card flex flex-col rounded-2xl overflow-hidden shadow-lg shadow-black/5 border border-border/50 hover:shadow-xl hover:border-primary/40 transition-all duration-300 group"
              >
                <div className="p-8 flex-1">
                  <div className="w-16 h-16 bg-muted text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300 text-3xl">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-foreground">{service.name}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="p-6 pt-0 mt-auto">
                  <Link 
                    href={`/quote?service=${service.slug}`}
                    className="w-full py-3.5 px-4 bg-muted text-foreground hover:bg-primary hover:text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-all duration-200"
                  >
                    Poslat poptávku
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-16 bg-primary/5 border border-primary/20 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
            Chcete kompletní rekonstrukci na klíč?
          </h3>
          <p className="text-muted-foreground text-lg mb-6 max-w-xl mx-auto">
            Zajistíme vše najednou — od vyklizení po čistý, připravený byt. Kontaktujte nás a domluvíme si prohlídku zdarma.
          </p>
          <Link 
            href="/quote"
            className="inline-flex px-8 py-4 bg-primary text-primary-foreground rounded-xl font-bold text-lg shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
          >
            Nezávazná poptávka zdarma
          </Link>
        </div>
      </div>
    </div>
  );
}
