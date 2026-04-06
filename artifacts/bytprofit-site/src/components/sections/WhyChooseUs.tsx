import { motion } from "framer-motion";
import { SITE_CONTENT } from "@/content";
import { CheckCircle2 } from "lucide-react";

export function WhyChooseUs() {
  const { why, company } = SITE_CONTENT;

  return (
    <section className="py-24 md:py-32 bg-secondary text-secondary-foreground overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">{why.title}</h2>
            <p className="text-xl text-secondary-foreground/80 mb-10 leading-relaxed max-w-lg">
              {company.description}
            </p>

            <div className="grid sm:grid-cols-2 gap-8">
              {why.items.map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="flex flex-col gap-3"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-6 w-6 text-primary shrink-0" />
                    <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  </div>
                  <p className="text-secondary-foreground/70 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative h-[600px] rounded-3xl overflow-hidden shadow-2xl"
          >
            <img 
              src="/images/craftsman.png" 
              alt="Craftsman working" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-2xl">
              <p className="text-lg font-medium text-white">"Real expertise you can rely on."</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
