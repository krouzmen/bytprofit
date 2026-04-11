import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Loader2, Sofa, ArrowLeft } from "lucide-react";
import { Link } from "wouter";

const furnitureTypes = [
  "Obývací nábytek",
  "Ložnicový nábytek",
  "Pracovní / kancelářský nábytek",
  "Zahradní a venkovní nábytek",
  "Jiný typ nábytku",
];

const budgetRanges = [
  "Do 10 000 Kč",
  "10 000–30 000 Kč",
  "30 000–70 000 Kč",
  "70 000–150 000 Kč",
  "Nad 150 000 Kč",
  "Nevím — rád/a se poradím",
];

type FormState = {
  name: string;
  email: string;
  furnitureType: string[];
  dimensions: string;
  budget: string;
  message: string;
};

const EMPTY: FormState = {
  name: "",
  email: "",
  furnitureType: [],
  dimensions: "",
  budget: "",
  message: "",
};

type FieldErrors = Partial<Record<keyof FormState, string>>;

function validate(f: FormState): FieldErrors {
  const e: FieldErrors = {};
  if (f.name.trim().length < 2) e.name = "Zadejte jméno (min. 2 znaky)";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email)) e.email = "Zadejte platný e-mail";
  if (f.furnitureType.length === 0) e.furnitureType = "Vyberte alespoň jeden typ nábytku";
  if (f.dimensions.trim().length < 10) e.dimensions = "Popište prosím podrobněji (min. 10 znaků)";
  return e;
}

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-1.5">{label}</label>
      {children}
      {error && <p className="mt-1 text-xs text-destructive font-medium">{error}</p>}
    </div>
  );
}

const inputCls =
  "w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition";

export default function FurnitureQuote() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serverError, setServerError] = useState(false);

  const set = (k: keyof FormState, v: string) =>
    setForm((f) => ({ ...f, [k]: v }));

  const toggleType = (t: string) => {
    setForm((f) => ({
      ...f,
      furnitureType: f.furnitureType.includes(t)
        ? f.furnitureType.filter((x) => x !== t)
        : [...f.furnitureType, t],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);
    setServerError(false);
    try {
      const body = new URLSearchParams({
        "form-name": "poptavka-nabytku",
        name: form.name,
        email: form.email,
        furnitureType: form.furnitureType.join(", "),
        dimensions: form.dimensions,
        budget: form.budget,
        message: form.message,
      });
      const res = await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString(),
      });
      if (!res.ok && import.meta.env.PROD) throw new Error(`HTTP ${res.status}`);
      setSuccess(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      console.error(err);
      setServerError(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        <AnimatePresence mode="wait">
          {success ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="inline-flex p-5 bg-green-100 text-green-700 rounded-full mb-6">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h1 className="text-3xl font-display font-bold mb-4">Poptávka odeslána!</h1>
              <p className="text-muted-foreground mb-8 leading-relaxed max-w-md mx-auto">
                Děkujeme za váš zájem. Ozveme se vám do 24 hodin s podrobnostmi
                a případnými dotazy k vaší zakázce.
              </p>
              <Link
                href="/truhlarstvi"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:opacity-90 transition-opacity"
              >
                <ArrowLeft className="w-4 h-4" /> Zpět na Truhlářství
              </Link>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="text-center mb-10">
                <div className="inline-flex p-3 bg-primary/10 text-primary rounded-2xl mb-4">
                  <Sofa className="w-8 h-8" />
                </div>
                <h1 className="text-4xl md:text-5xl font-display font-bold text-foreground mb-3">
                  Poptávka nábytku
                </h1>
                <p className="text-muted-foreground max-w-lg mx-auto leading-relaxed">
                  Popište, co potřebujete — ozveme se do 24 hodin s návrhem a cenou.
                  Nezávazně a zdarma.
                </p>
              </div>

              <div className="bg-card rounded-3xl p-6 md:p-10 shadow-xl shadow-black/5 border border-border">
                <form
                  name="poptavka-nabytku"
                  data-netlify="true"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  <input type="hidden" name="form-name" value="poptavka-nabytku" />

                  {/* Name + Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Field label="Jméno a příjmení *" error={errors.name}>
                      <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={(e) => set("name", e.target.value)}
                        placeholder="Jan Novák"
                        className={inputCls}
                      />
                    </Field>
                    <Field label="E-mail *" error={errors.email}>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={(e) => set("email", e.target.value)}
                        placeholder="jan@email.cz"
                        className={inputCls}
                      />
                    </Field>
                  </div>

                  {/* Furniture type checkboxes */}
                  <Field label="Typ nábytku * (možno vybrat více)" error={errors.furnitureType}>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {furnitureTypes.map((t) => {
                        const active = form.furnitureType.includes(t);
                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => toggleType(t)}
                            className={`px-4 py-2 rounded-xl text-sm font-semibold border transition-all ${
                              active
                                ? "bg-primary text-white border-primary shadow-md shadow-primary/20"
                                : "bg-background border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
                            }`}
                          >
                            {t}
                          </button>
                        );
                      })}
                    </div>
                    <input
                      type="hidden"
                      name="furnitureType"
                      value={form.furnitureType.join(", ")}
                    />
                  </Field>

                  {/* Dimensions / description */}
                  <Field label="Popis a přibližné rozměry *" error={errors.dimensions}>
                    <textarea
                      name="dimensions"
                      value={form.dimensions}
                      onChange={(e) => set("dimensions", e.target.value)}
                      rows={4}
                      placeholder="Např.: Šatní skříň 220 × 60 × 240 cm s posuvnými dveřmi, 4 police, 1 tyč na věšáky."
                      className={`${inputCls} resize-none leading-relaxed`}
                    />
                  </Field>

                  {/* Budget */}
                  <Field label="Odhadovaný rozpočet">
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={(e) => set("budget", e.target.value)}
                      className={inputCls}
                    >
                      <option value="">— Vyberte rozpočet (nepovinné) —</option>
                      {budgetRanges.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </Field>

                  {/* Extra notes */}
                  <Field label="Dodatečné poznámky">
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={(e) => set("message", e.target.value)}
                      rows={3}
                      placeholder="Cokoliv dalšího — termín, doručení, kombinace materiálů, foto inspirace…"
                      className={`${inputCls} resize-none leading-relaxed`}
                    />
                  </Field>

                  {serverError && (
                    <p className="text-sm text-destructive font-medium text-center">
                      Odesílání selhalo. Zkuste prosím znovu nebo napište na bytprofit@gmail.com.
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-bold text-lg rounded-2xl shadow-lg shadow-primary/25 hover:opacity-90 disabled:opacity-60 transition-all"
                  >
                    {submitting ? (
                      <><Loader2 className="w-5 h-5 animate-spin" /> Odesílám…</>
                    ) : (
                      "Odeslat poptávku"
                    )}
                  </button>

                  <p className="text-xs text-muted-foreground text-center">
                    Odesláním formuláře souhlasíte se zpracováním osobních údajů za účelem odpovědi na vaši poptávku.
                  </p>
                </form>
              </div>

              <div className="text-center mt-6">
                <Link
                  href="/truhlarstvi"
                  className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Zpět na Truhlářství
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
