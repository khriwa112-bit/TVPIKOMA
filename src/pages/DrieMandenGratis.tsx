import { useState, useEffect } from "react";
import { Check, MessageCircle, Gift, Zap, Shield } from "lucide-react";

const WHATSAPP_NUMBER = "447449708976";

const getTimeUntilMidnight = () => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diff = Math.floor((midnight.getTime() - now.getTime()) / 1000);
  return { hours: Math.floor(diff / 3600), minutes: Math.floor((diff % 3600) / 60), seconds: diff % 60 };
};

export default function DrieMandenGratis() {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight);
  const [selectedDevices, setSelectedDevices] = useState<"1" | "2" | "3" | "4">("1");

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeUntilMidnight()), 1000);
    return () => clearInterval(timer);
  }, []);

  const prices: Record<string, number> = { "1": 78.00, "2": 124.99, "3": 179.99, "4": 199.99 };
  const price = prices[selectedDevices];
  const monthlyPrice = (price / 12).toFixed(2).replace(".", ",");

  const openWhatsApp = () => {
    const msg = `[tvpikoma] Hallo, ik wil de *🎁 12+3 MAANDEN GRATIS* actie bestellen. ${selectedDevices} scherm(en), €${price.toFixed(2).replace(".", ",")} totaal.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Promo banner */}
      <div className="bg-amber-400 text-green-900 py-2.5 px-4 text-center font-bold text-sm">
        🎁 Beperkte aanbieding: Krijg 3 maanden GRATIS bij 12 maanden abonnement!
      </div>

      {/* Header */}
      <header className="bg-white border-b border-green-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="text-2xl font-extrabold text-green-900 tracking-tight">tvpikoma</a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Activeer Nu
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-green-900 via-green-800 to-green-700 text-white py-16 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-400 text-green-900 text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          <Gift className="w-4 h-4" /> Tijdelijke Actie
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4">
          Krijg <span className="text-amber-400">3 Maanden Gratis</span>
        </h1>
        <p className="text-green-200 text-lg sm:text-xl max-w-xl mx-auto mb-3">
          Bestel vandaag 12 maanden en kijk <strong className="text-white">15 maanden</strong> voor de prijs van 12.
        </p>
        <p className="text-amber-300 font-bold text-base mb-10">Activeer vandaag &amp; kijk direct</p>

        {/* Countdown */}
        <div className="inline-block bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-8 py-6 shadow-md">
          <p className="text-[11px] font-bold uppercase tracking-widest text-green-300 mb-4 flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse inline-block" />
            Aanbieding eindigt vandaag om middernacht
          </p>
          <div className="flex items-center justify-center gap-4">
            {[{ val: timeLeft.hours, label: "UREN" }, { val: timeLeft.minutes, label: "MIN" }, { val: timeLeft.seconds, label: "SEC" }].map((u, i) => (
              <div key={i} className="flex items-center gap-4">
                <div className="text-center">
                  <div className="bg-white/20 border border-white/30 rounded-xl w-16 h-16 flex items-center justify-center">
                    <span className="text-3xl font-black text-white">{u.val.toString().padStart(2, "0")}</span>
                  </div>
                  <span className="text-[9px] text-green-300 tracking-widest mt-1 block">{u.label}</span>
                </div>
                {i < 2 && <span className="text-2xl font-black text-white/40 mb-5">:</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Offer card */}
      <section className="max-w-2xl mx-auto px-4 py-12">

        <div className="rounded-2xl border-2 border-amber-400 bg-gradient-to-b from-amber-50 to-white shadow-xl overflow-hidden">
          <div className="bg-amber-400 py-3 text-center">
            <span className="text-green-900 font-extrabold uppercase tracking-widest text-sm">🎁 12 + 3 MAANDEN GRATIS — PREMIUM VIP+</span>
          </div>

          <div className="p-8">
            {/* Device picker */}
            <div className="mb-8">
              <label className="text-xs font-bold text-green-600 uppercase tracking-widest block mb-3">Aantal gelijktijdige schermen:</label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {(["1", "2", "3", "4"] as const).map((dev) => (
                  <button key={dev} onClick={() => setSelectedDevices(dev)}
                    className={`py-4 rounded-2xl font-bold text-sm transition-all cursor-pointer border-2 ${
                      selectedDevices === dev
                        ? "bg-green-600 border-green-600 text-white shadow-md"
                        : "bg-white border-green-200 text-green-600 hover:border-green-400"
                    }`}>
                    {dev} {Number(dev) > 1 ? "schermen" : "scherm"}
                  </button>
                ))}
              </div>
            </div>

            {/* Price display */}
            <div className="text-center mb-8">
              <p className="text-green-500 text-sm mb-1">Slechts</p>
              <div className="text-6xl font-black text-green-900 mb-1">€{price.toFixed(2).replace(".", ",")}</div>
              <p className="text-green-600 text-sm">eenmalig · <strong>15 maanden</strong> totaal</p>
              <p className="text-amber-600 font-bold mt-1">= €{monthlyPrice}/maand — goedkoopste deal!</p>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
              {[
                "15 maanden (12 kopen, 3 gratis)",
                "+80.000 Kanalen + Netflix",
                "4K / 8K / HDR kwaliteit",
                "+200.000 Films & Series",
                "RTL, NPO, ESPN, Ziggo, Viaplay",
                "Alle Sport PPV Events",
                "VIP 24/7 WhatsApp Support",
                "Alle apparaten ondersteund",
                "VPN Inbegrepen",
                "Dagelijkse content-updates",
              ].map(f => (
                <div key={f} className="flex items-start gap-2 text-sm text-green-900">
                  <Check className="w-4 h-4 mt-0.5 shrink-0 stroke-[3] text-green-600" />{f}
                </div>
              ))}
            </div>

            <button onClick={openWhatsApp}
              className="w-full py-4 rounded-xl bg-green-900 hover:bg-green-800 text-amber-400 font-extrabold text-base uppercase tracking-wide transition-all cursor-pointer shadow-lg">
              🎁 Activeer 3 Maanden Gratis →
            </button>
            <p className="text-center text-xs text-green-400 mt-3">Direct actief · Geen contract · Anoniem</p>
          </div>
        </div>

        {/* Trust icons */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-center text-xs text-green-700">
          <div className="bg-green-50 border border-green-100 rounded-xl py-4 px-2">
            <Zap className="w-5 h-5 mx-auto mb-1 text-amber-500" />
            <span className="font-bold block">Direct actief</span>
            <span className="text-green-400">binnen 3 minuten</span>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-xl py-4 px-2">
            <Shield className="w-5 h-5 mx-auto mb-1 text-green-600" />
            <span className="font-bold block">100% veilig</span>
            <span className="text-green-400">anoniem betalen</span>
          </div>
          <div className="bg-green-50 border border-green-100 rounded-xl py-4 px-2">
            <MessageCircle className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
            <span className="font-bold block">24/7 Support</span>
            <span className="text-green-400">via WhatsApp</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-green-300 text-center text-xs py-6 mt-4">
        <p>© 2025 tvpikoma · Premium IPTV voor NL &amp; BE</p>
      </footer>
    </div>
  );
}
