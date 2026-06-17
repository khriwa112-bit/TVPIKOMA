import { Mail, Phone, ShieldCheck } from "lucide-react";

interface FooterProps {
  onScrollTo: (selector: string) => void;
  onOpenReseller: () => void;
}

export default function Footer({ onScrollTo, onOpenReseller }: FooterProps) {
  return (
    <footer className="bg-gradient-to-br from-green-900 via-green-800 to-emerald-900 border-t-2 border-green-700 text-green-300 py-14 md:py-20" id="main-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">

          {/* Brand */}
          <div className="md:col-span-4 flex flex-col items-start gap-5">
            <div className="cursor-pointer" onClick={() => onScrollTo("#hero-section")}>
              <span className="text-3xl font-extrabold font-display tracking-tight text-white">tvpikoma</span>
            </div>
            <p className="text-sm text-green-300 leading-relaxed max-w-sm">
              De meest stabiele IPTV provider van Nederland en België. Live TV, sport en VOD op al je apparaten.
            </p>
            <div className="flex items-center gap-2.5 mt-1">
              <span className="relative flex h-2.5 w-2.5 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 font-sans">All Services Operational 100%</span>
            </div>
          </div>

          {/* Pakketten */}
          <div className="md:col-span-2 flex flex-col items-start gap-4">
            <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-widest font-sans">Pakketten</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              {["3 Maanden Pakket","6 Maanden Pakket","12+3 Maanden Deal","1 Maand Proef"].map(l => (
                <button key={l} onClick={() => onScrollTo("#pricing-section")}
                  className="hover:text-amber-400 transition-colors text-left text-green-300">{l}</button>
              ))}
            </div>
          </div>

          {/* Installatie */}
          <div className="md:col-span-3 flex flex-col items-start gap-4">
            <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-widest font-sans">Installatie</h4>
            <div className="flex flex-col gap-2.5 text-sm">
              {["Samsung & LG Smart TV","Amazon Fire TV Stick","Apple TV / iOS","Formuler & Android Box"].map(l => (
                <button key={l} onClick={() => onScrollTo("#setup-section")}
                  className="hover:text-amber-400 transition-colors text-left text-green-300">{l}</button>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 flex flex-col items-start gap-4">
            <h4 className="text-xs font-extrabold text-amber-400 uppercase tracking-widest font-sans">Contact</h4>
            <div className="flex flex-col gap-3 text-sm">
              <button onClick={onOpenReseller}
                className="flex items-center gap-2 text-amber-400 hover:text-amber-300 font-bold transition-colors text-left">
                <ShieldCheck className="w-4 h-4 shrink-0" /> Wordt een Reseller
              </button>
              <a href="https://wa.me/447449708976" target="_blank" rel="noreferrer"
                className="flex items-center gap-2 text-green-300 hover:text-amber-400 transition-colors">
                <Phone className="w-4 h-4 shrink-0" /> WhatsApp 24/7 Support
              </a>
              <div className="flex items-center gap-2 text-green-400 text-sm">
                <Mail className="w-4 h-4 shrink-0" /><span>support@tivipikoma.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-green-700/60 pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs text-green-500">
            &copy; {new Date().getFullYear()} tvpikoma Premium IPTV. Alle rechten voorbehouden.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] uppercase font-sans tracking-widest text-green-500 font-bold mr-1">Veilig Betalen:</span>
            {["iDEAL","Bancontact","PayPal","VISA / MC"].map(p => (
              <span key={p} className="text-amber-400 font-bold text-[10px] px-2.5 py-1 rounded-lg bg-white/5 border border-white/10">{p}</span>
            ))}
          </div>
        </div>

      </div>
    </footer>
  );
}
