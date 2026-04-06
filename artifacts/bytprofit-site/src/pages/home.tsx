import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Contact } from "@/components/sections/Contact";
import { motion } from "framer-motion";

function GallerySection() {
  return (
    <section id="gallery" className="py-24 bg-background">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">Our Work</h2>
          <p className="text-xl text-muted-foreground">See the transformations we've brought to life.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden aspect-video relative group"
          >
            <img src="/images/kitchen-reno.png" alt="Kitchen Renovation" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
              <h3 className="text-2xl font-bold text-white">Kitchen Renovation</h3>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="rounded-2xl overflow-hidden aspect-video relative group"
          >
            <img src="/images/bathroom-reno.png" alt="Bathroom Renovation" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-8">
              <h3 className="text-2xl font-bold text-white">Bathroom Remodeling</h3>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background pt-20">
      <Header />
      <main>
        <Hero />
        <Services />
        <WhyChooseUs />
        <GallerySection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
