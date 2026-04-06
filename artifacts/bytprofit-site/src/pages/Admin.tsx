import { Link } from "wouter";
import { ServerOff, ArrowLeft } from "lucide-react";

export default function Admin() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-muted rounded-2xl mb-6">
          <ServerOff className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-3xl font-display font-bold text-foreground mb-4">
          Administrace není dostupná
        </h1>
        <p className="text-muted-foreground text-lg mb-2">
          Administrační panel vyžaduje připojení k backend serveru.
        </p>
        <p className="text-muted-foreground mb-8">
          Tato funkce je dostupná pouze ve vývojovém prostředí s aktivním API serverem.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-semibold hover:opacity-90 transition-opacity"
        >
          <ArrowLeft className="w-4 h-4" />
          Zpět na hlavní stránku
        </Link>
      </div>
    </div>
  );
}
