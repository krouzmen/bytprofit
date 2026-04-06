import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, HardHat } from "lucide-react";
import { useCreateQuote } from "@workspace/api-client-react";
import { Link } from "wouter";

const quoteSchema = z.object({
  firstName: z.string().min(2, "Jméno je povinné"),
  lastName: z.string().min(2, "Příjmení je povinné"),
  email: z.string().email("Zadejte platnou e-mailovou adresu"),
  phone: z.string().min(9, "Zadejte platné telefonní číslo"),
  serviceType: z.string().min(1, "Vyberte prosím typ služby"),
  propertyType: z.string().min(1, "Vyberte prosím typ bytu"),
  description: z.string().min(10, "Popište prosím rozsah prací podrobněji"),
  budget: z.string().optional(),
  timeline: z.string().optional(),
  address: z.string().optional(),
});

type QuoteFormValues = z.infer<typeof quoteSchema>;

const serviceTypes = [
  "Vyklizení bytu",
  "Malování a štukování stěn",
  "Nové podlahy",
  "Rekonstrukce koupelny",
  "Rekonstrukce kuchyně",
  "Elektroinstalace",
  "Vodoinstalace",
  "Kompletní rekonstrukce na klíč (vše výše)",
  "Jiné / kombinace služeb",
];

const purposeTypes = [
  "Příprava k prodeji",
  "Příprava k pronájmu",
  "Obojí — ještě se rozhoduji",
];

const propertyTypes = [
  "Byt v panelovém domě",
  "Byt v cihlovém domě",
  "Mezonet",
  "Atypický byt",
  "Jiné",
];

const budgetRanges = [
  "Do 100 000 Kč",
  "100 000–250 000 Kč",
  "250 000–500 000 Kč",
  "500 000–1 000 000 Kč",
  "Nad 1 000 000 Kč",
  "Nevím — potřebuji poradit",
];

const timelines = [
  "Co nejdříve (do 2 týdnů)",
  "Do 1 měsíce",
  "1–3 měsíce",
  "Jsem flexibilní",
];

export default function QuoteRequest() {
  const [isSuccess, setIsSuccess] = useState(false);
  const createQuoteMutation = useCreateQuote();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<QuoteFormValues>({
    resolver: zodResolver(quoteSchema),
  });

  const onSubmit = async (data: QuoteFormValues) => {
    try {
      await createQuoteMutation.mutateAsync({ data });
      setIsSuccess(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error("Chyba při odesílání poptávky", error);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background relative">
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `url(${import.meta.env.BASE_URL}images/pattern.png)` }} />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">
        
        <AnimatePresence mode="wait">
          {!isSuccess ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="text-center mb-10">
                <div className="inline-flex p-3 bg-primary/10 text-primary rounded-2xl mb-4">
                  <HardHat className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-4">
                  Nezávazná poptávka zdarma
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Vyplňte formulář a my se vám ozveme do 24 hodin. Domluvíme si prohlídku a připravíme cenovou kalkulaci přesně pro váš byt.
                </p>
              </div>

              <div className="bg-card rounded-3xl p-6 md:p-10 shadow-xl shadow-black/5 border border-border">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  
                  {/* Personal Info */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 border-b border-border pb-2">1. Kontaktní údaje</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Jméno *</label>
                        <input 
                          {...register("firstName")}
                          className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                          placeholder="Jan"
                        />
                        {errors.firstName && <p className="text-destructive text-sm mt-1">{errors.firstName.message}</p>}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Příjmení *</label>
                        <input 
                          {...register("lastName")}
                          className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                          placeholder="Novák"
                        />
                        {errors.lastName && <p className="text-destructive text-sm mt-1">{errors.lastName.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">E-mail *</label>
                        <input 
                          type="email"
                          {...register("email")}
                          className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                          placeholder="jan.novak@email.cz"
                        />
                        {errors.email && <p className="text-destructive text-sm mt-1">{errors.email.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Telefon *</label>
                        <input 
                          type="tel"
                          {...register("phone")}
                          className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                          placeholder="+420 724 496 091"
                        />
                        {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Project Details */}
                  <div>
                    <h3 className="text-xl font-bold mb-4 border-b border-border pb-2">2. Detaily rekonstrukce</h3>
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      
                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Co potřebujete udělat? *</label>
                        <select 
                          {...register("serviceType")}
                          className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none"
                        >
                          <option value="">Vyberte typ prací...</option>
                          {serviceTypes.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        {errors.serviceType && <p className="text-destructive text-sm mt-1">{errors.serviceType.message}</p>}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Účel rekonstrukce *</label>
                        <select 
                          {...register("propertyType")}
                          className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none"
                        >
                          <option value="">Vyberte účel...</option>
                          {purposeTypes.map(p => <option key={p} value={p}>{p}</option>)}
                          <option disabled>──────────</option>
                          {propertyTypes.map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        {errors.propertyType && <p className="text-destructive text-sm mt-1">{errors.propertyType.message}</p>}
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-semibold text-foreground">Adresa bytu</label>
                        <input 
                          {...register("address")}
                          className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all"
                          placeholder="Ulice, číslo popisné, Karlovy Vary"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Přibližný rozpočet</label>
                        <select 
                          {...register("budget")}
                          className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none"
                        >
                          <option value="">Vyberte rozpočet...</option>
                          {budgetRanges.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-semibold text-foreground">Kdy chcete začít?</label>
                        <select 
                          {...register("timeline")}
                          className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all appearance-none"
                        >
                          <option value="">Vyberte termín...</option>
                          {timelines.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <label className="text-sm font-semibold text-foreground">Popis stavu a požadavků *</label>
                        <textarea 
                          {...register("description")}
                          rows={4}
                          className="w-full px-4 py-3 rounded-xl bg-background border-2 border-border focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all resize-y"
                          placeholder="Popište aktuální stav bytu, co konkrétně potřebujete udělat a případné zvláštní požadavky..."
                        />
                        {errors.description && <p className="text-destructive text-sm mt-1">{errors.description.message}</p>}
                      </div>

                    </div>
                  </div>

                  {createQuoteMutation.isError && (
                    <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm font-medium">
                      Odeslání poptávky se nezdařilo. Zkuste to prosím znovu nebo nás kontaktujte telefonicky na <a href="tel:+420724496091" className="font-bold">+420 724 496 091</a>.
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={createQuoteMutation.isPending}
                    className="w-full py-4 bg-primary text-primary-foreground text-lg font-bold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
                  >
                    {createQuoteMutation.isPending ? (
                      <>
                        <Loader2 className="w-6 h-6 animate-spin" />
                        Odesílám...
                      </>
                    ) : (
                      "Odeslat poptávku — zdarma a nezávazně"
                    )}
                  </button>
                  <p className="text-center text-sm text-muted-foreground mt-4">
                    Vaše údaje jsou v bezpečí a budou použity pouze pro kontaktování ohledně vaší poptávky. Ozveme se do 24 hodin.
                  </p>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-3xl p-12 text-center shadow-2xl border border-border mt-10"
            >
              <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-4xl font-display font-bold text-foreground mb-4">Poptávka přijata!</h2>
              <p className="text-xl text-muted-foreground mb-2 max-w-lg mx-auto">
                Děkujeme. Ozveme se vám do 24 hodin s návrhem termínu prohlídky a předběžnou kalkulací.
              </p>
              <p className="text-muted-foreground mb-8">
                Nebo nás kontaktujte přímo: <a href="tel:+420724496091" className="text-primary font-bold">+420 724 496 091</a>
              </p>
              <Link 
                href="/"
                className="inline-flex px-8 py-4 bg-secondary text-white rounded-xl font-bold hover:bg-secondary/90 transition-colors"
              >
                Zpět na úvod
              </Link>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
