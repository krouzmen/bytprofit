import { motion } from "framer-motion";
import { SITE_CONTENT } from "@/content";
import { Hammer, Wrench, Droplets, PaintRoller, Zap, Home } from "lucide-react";

const icons = [
  Home,
  Wrench,
  Droplets,
  Hammer,
  Zap,
  PaintRoller
];

export function Services() {
  const { services } = SITE_CONTENT;

  return (
    <section id="services" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-24">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold text-secondary mb-6"
          >
            {services.title}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground"
          >
            {services.subtitle}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.items.map((item, index) => {
            const Icon = icons[index % icons.length];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative bg-card p-8 rounded-2xl border border-border hover:border-primary/50 transition-colors duration-300 shadow-sm hover:shadow-md"
              >
                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                  <Icon className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-bold text-secondary mb-4">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
