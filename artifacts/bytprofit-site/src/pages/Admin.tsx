import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Eye, EyeOff, Star, StarOff, Settings, CheckCircle2,
  Pencil, X, Save, ChevronDown, ChevronUp, Loader2,
  LayoutTemplate, Wrench, FileText, Home, Info, Upload
} from "lucide-react";
import {
  useListAllServices, useUpdateService,
  useListContent, useUpdateContent
} from "@workspace/api-client-react";
import type { Service, SiteContent } from "@workspace/api-client-react";

function PublishButton() {
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">("idle");
  const [msg, setMsg] = useState("");

  const handlePublish = async () => {
    setState("loading");
    try {
      const res = await fetch("/api/admin/publish", { method: "POST" });
      const data = await res.json();
      if (data.success) {
        setMsg(data.message);
        setState("done");
      } else {
        setMsg(data.error ?? "Chyba při publikování.");
        setState("error");
      }
    } catch {
      setMsg("Nepodařilo se připojit k serveru.");
      setState("error");
    }
    setTimeout(() => setState("idle"), 5000);
  };

  return (
    <div className="flex items-center gap-3">
      <button
        onClick={handlePublish}
        disabled={state === "loading"}
        className="flex items-center gap-2 px-5 py-2.5 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm"
      >
        {state === "loading" ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
        {state === "loading" ? "Publikuji…" : "Publikovat na web"}
      </button>
      {msg && (
        <span className={`text-sm font-medium ${state === "error" ? "text-destructive" : "text-green-700"}`}>
          {msg}
        </span>
      )}
    </div>
  );
}

// ─── Services tab ────────────────────────────────────────────────────────────

type EditState = { name: string; icon: string; shortDescription: string; description: string };

function ServiceCard({ service, onToggle, isPending }: {
  service: Service;
  onToggle: (id: number, field: "active" | "featured", value: boolean) => void;
  isPending: boolean;
}) {
  const updateService = useUpdateService();
  const [expanded, setExpanded] = useState(false);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [edit, setEdit] = useState<EditState>({ name: service.name, icon: service.icon, shortDescription: service.shortDescription, description: service.description });

  const handleEdit = () => { setEdit({ name: service.name, icon: service.icon, shortDescription: service.shortDescription, description: service.description }); setEditing(true); setExpanded(true); };
  const handleCancel = () => { setEditing(false); };
  const handleSave = async () => {
    setSaving(true);
    try {
      await updateService.mutateAsync({ id: service.id, data: { name: edit.name, icon: edit.icon, shortDescription: edit.shortDescription, description: edit.description } });
      setSaved(true); setEditing(false); setTimeout(() => setSaved(false), 2500);
    } finally { setSaving(false); }
  };

  return (
    <motion.div layout className={`bg-card border rounded-2xl overflow-hidden transition-all duration-200 ${service.active ? "border-border shadow-sm" : "border-border/40 opacity-60"} ${saved ? "border-green-400 shadow-green-100 shadow-md" : ""}`}>
      <div className="flex items-center gap-4 p-5">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 ${service.active ? "bg-primary/10" : "bg-muted"}`}>{editing ? edit.icon : service.icon}</div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-foreground">{service.name}</span>
            {saved && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Uloženo</span>}
            {service.featured && service.active && !saved && <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-medium">Na úvodní stránce</span>}
            {!service.active && <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full font-medium">Skrytá</span>}
          </div>
          <p className="text-sm text-muted-foreground truncate mt-0.5">{service.shortDescription}</p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button onClick={handleEdit} title="Upravit texty" className="p-2.5 rounded-xl border border-border bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:border-primary/30 hover:text-primary transition-all duration-200"><Pencil className="w-4 h-4" /></button>
          {service.active && <button onClick={() => onToggle(service.id, "featured", !service.featured)} disabled={isPending} title={service.featured ? "Odebrat z úvodní stránky" : "Zobrazit na úvodní stránce"} className={`p-2.5 rounded-xl border transition-all duration-200 ${service.featured ? "bg-amber-50 border-amber-200 text-amber-600 hover:bg-amber-100" : "bg-muted border-border text-muted-foreground hover:border-amber-300 hover:text-amber-500"}`}>{service.featured ? <Star className="w-4 h-4 fill-current" /> : <StarOff className="w-4 h-4" />}</button>}
          <button onClick={() => onToggle(service.id, "active", !service.active)} disabled={isPending} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border font-semibold text-sm transition-all duration-200 ${service.active ? "bg-green-50 border-green-200 text-green-700 hover:bg-red-50 hover:border-red-200 hover:text-red-600" : "bg-muted border-border text-muted-foreground hover:bg-green-50 hover:border-green-200 hover:text-green-700"}`}>
            {service.active ? <><Eye className="w-4 h-4" /><span className="hidden sm:inline">Aktivní</span></> : <><EyeOff className="w-4 h-4" /><span className="hidden sm:inline">Skrytá</span></>}
          </button>
          <button onClick={() => { setExpanded(v => !v); if (editing) setEditing(false); }} className="p-2.5 rounded-xl border border-border bg-muted/50 text-muted-foreground hover:bg-muted transition-all duration-200">{expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}</button>
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
            <div className="border-t border-border bg-muted/20 p-5 space-y-4">
              {editing ? (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Název služby</label>
                      <input type="text" value={edit.name} onChange={e => setEdit(s => ({ ...s, name: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Ikona</label>
                      <input type="text" value={edit.icon} onChange={e => setEdit(s => ({ ...s, icon: e.target.value }))} className="w-20 px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-xl text-center focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Krátký popis</label>
                    <input type="text" value={edit.shortDescription} onChange={e => setEdit(s => ({ ...s, shortDescription: e.target.value }))} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Dlouhý popis</label>
                    <textarea value={edit.description} onChange={e => setEdit(s => ({ ...s, description: e.target.value }))} rows={4} className="w-full px-4 py-2.5 rounded-xl border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none leading-relaxed" />
                  </div>
                  <div className="flex gap-3 pt-1">
                    <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground rounded-xl font-semibold text-sm hover:bg-primary/90 disabled:opacity-50 transition-all duration-200 shadow-md shadow-primary/20">
                      {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                      {saving ? "Ukládám..." : "Uložit změny"}
                    </button>
                    <button onClick={handleCancel} disabled={saving} className="flex items-center gap-2 px-5 py-2.5 bg-muted text-muted-foreground rounded-xl font-semibold text-sm hover:bg-muted/80 disabled:opacity-50 transition-all duration-200 border border-border"><X className="w-4 h-4" />Zrušit</button>
                  </div>
                </>
              ) : (
                <div className="space-y-3">
                  <div><p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Krátký popis</p><p className="text-sm text-foreground">{service.shortDescription}</p></div>
                  <div><p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">Dlouhý popis</p><p className="text-sm text-foreground leading-relaxed">{service.description}</p></div>
                  <button onClick={handleEdit} className="flex items-center gap-2 text-sm text-primary font-semibold hover:underline"><Pencil className="w-3.5 h-3.5" /> Upravit texty</button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Content editor tab ───────────────────────────────────────────────────────

const PAGE_LABELS: Record<string, { label: string; icon: React.ReactNode }> = {
  home: { label: "Úvodní stránka", icon: <Home className="w-4 h-4" /> },
  about: { label: "O nás", icon: <Info className="w-4 h-4" /> },
};

function ContentBlock({ block, onSaved }: { block: SiteContent; onSaved: () => void }) {
  const updateContent = useUpdateContent();
  const [value, setValue] = useState(block.value);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const dirty = value !== block.value;

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateContent.mutateAsync({ id: block.id, data: { value } });
      setSaved(true); onSaved(); setTimeout(() => setSaved(false), 2500);
    } finally { setSaving(false); }
  };

  return (
    <div className={`bg-card border rounded-xl p-4 transition-all duration-200 ${saved ? "border-green-400" : dirty ? "border-primary/40" : "border-border"}`}>
      <label className="block text-xs font-semibold text-muted-foreground mb-2">{block.label}</label>
      {block.type === "textarea" ? (
        <textarea value={value} onChange={e => setValue(e.target.value)} rows={3} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition resize-none leading-relaxed" />
      ) : (
        <input type="text" value={value} onChange={e => setValue(e.target.value)} className="w-full px-3 py-2 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition" />
      )}
      <div className="flex items-center gap-2 mt-2">
        {dirty && (
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-primary-foreground rounded-lg text-xs font-semibold hover:bg-primary/90 disabled:opacity-50 transition-all">
            {saving ? <Loader2 className="w-3 h-3 animate-spin" /> : <Save className="w-3 h-3" />}
            {saving ? "Ukládám…" : "Uložit"}
          </button>
        )}
        {dirty && !saving && (
          <button onClick={() => setValue(block.value)} className="flex items-center gap-1.5 px-3 py-1.5 bg-muted text-muted-foreground rounded-lg text-xs font-semibold hover:bg-muted/80 transition-all border border-border">
            <X className="w-3 h-3" /> Zrušit
          </button>
        )}
        {saved && <span className="text-xs text-green-700 font-medium flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Uloženo</span>}
      </div>
    </div>
  );
}

function ContentTab() {
  const { data: content, isLoading, error, refetch } = useListContent();
  const [activePage, setActivePage] = useState<string>("home");

  const pages = Array.from(new Set(content?.map(c => c.page) ?? [])).filter(p => PAGE_LABELS[p]);
  const blocks = content?.filter(c => c.page === activePage) ?? [];

  return (
    <div>
      {/* Page selector */}
      <div className="flex gap-2 mb-6 flex-wrap">
        {(pages.length ? pages : ["home", "about"]).map(page => (
          <button
            key={page}
            onClick={() => setActivePage(page)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-semibold text-sm transition-all duration-200 ${
              activePage === page
                ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                : "bg-card border-border text-muted-foreground hover:border-primary/40 hover:text-foreground"
            }`}
          >
            {PAGE_LABELS[page]?.icon}
            {PAGE_LABELS[page]?.label ?? page}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="space-y-3">
          {[1,2,3,4,5].map(i => <div key={i} className="h-20 bg-muted animate-pulse rounded-xl" />)}
        </div>
      ) : error ? (
        <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-2xl p-6 text-center">
          <p className="font-medium">Nepodařilo se načíst obsah. Zkuste obnovit stránku.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {blocks.map(block => (
            <motion.div key={block.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
              <ContentBlock block={block} onSaved={refetch} />
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Admin page ──────────────────────────────────────────────────────────

type Tab = "services" | "content";

export default function Admin() {
  const [tab, setTab] = useState<Tab>("services");
  const { data: services, isLoading, error, refetch } = useListAllServices();
  const updateService = useUpdateService();

  const handleToggle = useCallback(
    async (id: number, field: "active" | "featured", value: boolean) => {
      await updateService.mutateAsync({ id, data: { [field]: value } });
      refetch();
    },
    [updateService, refetch]
  );

  return (
    <div className="min-h-screen pt-28 pb-24 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between gap-4 mb-2 flex-wrap">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 text-primary rounded-xl">
                <Settings className="w-6 h-6" />
              </div>
              <h1 className="text-3xl font-display font-bold text-foreground">Administrace</h1>
            </div>
            <PublishButton />
          </div>
          <p className="text-muted-foreground">Spravujte obsah webu — texty, služby a nastavení stránek. Po úpravách klikněte <strong>Publikovat na web</strong>.</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-muted/50 p-1.5 rounded-2xl w-fit">
          {([
            { id: "services", label: "Služby", icon: <Wrench className="w-4 h-4" /> },
            { id: "content", label: "Stránky", icon: <FileText className="w-4 h-4" /> },
          ] as { id: Tab; label: string; icon: React.ReactNode }[]).map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                tab === t.id
                  ? "bg-background text-foreground shadow-sm border border-border"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {tab === "services" ? (
            <motion.div key="services" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              {isLoading ? (
                <div className="space-y-4">{[1,2,3,4,5].map(i => <div key={i} className="h-24 bg-muted animate-pulse rounded-2xl" />)}</div>
              ) : error ? (
                <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-2xl p-6 text-center"><p className="font-medium">Nepodařilo se načíst služby.</p></div>
              ) : (
                <div className="space-y-3">
                  {services?.map((service, i) => (
                    <motion.div key={service.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                      <ServiceCard service={service} onToggle={handleToggle} isPending={updateService.isPending} />
                    </motion.div>
                  ))}
                </div>
              )}

              <div className="mt-8 bg-muted/50 border border-border rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p><strong className="text-foreground">Tužka</strong> — otevře editor pro název, ikonu a popis.</p>
                    <p><strong className="text-foreground">Hvězdička</strong> — zobrazí službu na úvodní stránce jako doporučenou.</p>
                    <p><strong className="text-foreground">Aktivní / Skrytá</strong> — zákazníci vidí jen aktivní služby.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div key="content" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}>
              <ContentTab />
              <div className="mt-8 bg-muted/50 border border-border rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <LayoutTemplate className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p>Upravte text libovolného pole a klikněte <strong className="text-foreground">Uložit</strong> — změna se projeví na webu okamžitě.</p>
                    <p>Přepínání mezi <strong className="text-foreground">Úvodní stránkou</strong> a <strong className="text-foreground">O nás</strong> probíhá pomocí tlačítek nahoře.</p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
