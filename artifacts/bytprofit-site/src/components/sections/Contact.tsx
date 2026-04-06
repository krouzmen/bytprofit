import { motion } from "framer-motion";
import { SITE_CONTENT } from "@/content";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Contact() {
  const { contact } = SITE_CONTENT;

  return (
    <section id="contact" className="py-24 md:py-32 bg-card">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-5xl mx-auto bg-background rounded-3xl overflow-hidden shadow-sm border border-border flex flex-col md:flex-row">
          
          <div className="md:w-1/2 p-10 md:p-16 bg-primary text-primary-foreground flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-4">{contact.title}</h2>
              <p className="text-primary-foreground/80 text-lg mb-10 leading-relaxed">
                {contact.subtitle}
              </p>
              
              <div className="space-y-8">
                <a 
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`} 
                  className="flex items-center gap-5 group hover:opacity-80 transition-opacity"
                >
                  <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Phone className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/70 font-medium uppercase tracking-wider mb-1">Call Us</p>
                    <p className="text-2xl font-bold">{contact.phone}</p>
                  </div>
                </a>

                <a 
                  href={`mailto:${contact.email}`} 
                  className="flex items-center gap-5 group hover:opacity-80 transition-opacity"
                >
                  <div className="h-14 w-14 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                    <Mail className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm text-primary-foreground/70 font-medium uppercase tracking-wider mb-1">Email Us</p>
                    <p className="text-xl font-bold">{contact.email}</p>
                  </div>
                </a>
              </div>
            </motion.div>
          </div>

          <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-card">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <h3 className="text-2xl font-bold text-secondary mb-6">Send us a message</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary">Name</label>
                    <input type="text" className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-secondary">Phone</label>
                    <input type="tel" className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="+420..." />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary">Email</label>
                  <input type="email" className="w-full h-12 px-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all" placeholder="john@example.com" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-secondary">Message</label>
                  <textarea className="w-full h-32 p-4 rounded-lg border border-border bg-background focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all resize-none" placeholder="Tell us about your project..."></textarea>
                </div>
                <Button size="lg" className="w-full h-14 text-lg font-semibold mt-4">
                  Request a Quote
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  {contact.callToAction}
                </p>
              </form>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
