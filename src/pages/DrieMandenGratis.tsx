import { useState, useEffect } from "react";
import { Check, MessageCircle, Gift, Zap, Shield, Tv, Star } from "lucide-react";

const WHATSAPP_NUMBER = "447449708976";

const getTimeUntilMidnight = () => {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  const diff = Math.floor((midnight.getTime() - now.getTime()) / 1000);
  return { hours: Math.floor(diff / 3600), minutes: Math.floor((diff % 3600) / 60), seconds: diff % 60 };
};

const prices: Record<string, { now: number; was: number }> = {
  "1": { now: 78.00,  was: 149.88 },
  "2": { now: 124.99, was: 239.88 },
  "3": { now: 179.99, was: 329.88 },
  "4": { now: 199.99, was: 419.88 },
};

const features = [
  { label: "15 maanden (12 kopen, 3 gratis)", highlight: true },
  { label: "+80.000 Live kanalen & Netflix" },
  { label: "4K / 8K / HDR — Ultra scherp" },
  { label: "+200.000 Films & Series (VOD)" },
  { label: "RTL, NPO, ESPN, Ziggo, Viaplay" },
  { label: "Alle Sport PPV Events inbegrepen" },
  { label: "VIP 24/7 WhatsApp Support" },
  { label: "Alle apparaten ondersteund" },
  { label: "VPN + AntiFreeze Pro inbegrepen" },
  { label: "Dagelijkse content-updates" },
];

export default function DrieMandenGratis() {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight);
  const [selectedDevices, setSelectedDevices] = useState<"1" | "2" | "3" | "4">("1");

  useEffect(() => {
    document.title = "tvpikoma – 3 Maanden Gratis IPTV | Activeer Vandaag & Kijk Direct";
    document.querySelector('meta[name="description"]')?.setAttribute("content",
      "Krijg 3 maanden gratis bij tvpikoma! Bestel 12 maanden en kijk 15 maanden voor de prijs van 12. Activeer vandaag en kijk direct. Slechts €5,20/maand."
    );
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", "https://tivipikoma.com/3maanden-Gratis");
    return () => {
      document.title = "tvpikoma | #1 IPTV Nederland – 80.000+ Kanalen, 4K & Onbeperkt Kijken";
      document.querySelector('meta[name="description"]')?.setAttribute("content",
        "tvpikoma is de #1 IPTV provider van Nederland. Geniet van 80.000+ kanalen, 200.000+ films & series in 4K/8K kwaliteit."
      );
      document.querySelector('link[rel="canonical"]')?.setAttribute("href", "https://tivipikoma.com/");
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeUntilMidnight()), 1000);
    return () => clearInterval(timer);
  }, []);

  const { now: price, was: originalPrice } = prices[selectedDevices];
  const monthlyPrice = (price / 12).toFixed(2).replace(".", ",");
  const savingsAmount = (originalPrice - price).toFixed(2).replace(".", ",");
  const savingsPct = Math.round(((originalPrice - price) / originalPrice) * 100);

  const openWhatsApp = () => {
    (window as any).gtag?.('event', 'conversion', { 'send_to': 'AW-18248577419/JxmtCMb6zcIcEIvjzP1D' });
    const msg = `[tvpikoma] Hallo, ik wil de *🎁 12+3 MAANDEN GRATIS* actie bestellen. ${selectedDevices} scherm(en), €${price.toFixed(2).replace(".", ",")} totaal.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="min-h-screen bg-gray-950 font-sans">

      {/* Promo banner */}
      <div className="bg-amber-400 text-green-900 py-2.5 px-4 text-center font-bold text-sm tracking-wide">
        🎁 Beperkte aanbieding — Krijg 3 maanden GRATIS bij 12 maanden abonnement!
      </div>

      {/* Header */}
      <header className="bg-gray-950 border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <a href="/" className="text-2xl font-extrabold text-white tracking-tight">
            tvpikoma
          </a>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}`}
            target="_blank" rel="noopener noreferrer"
            onClick={() => (window as any).gtag?.('event', 'conversion', { 'send_to': 'AW-18248577419/JxmtCMb6zcIcEIvjzP1D' })}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Activeer Nu
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-950 to-green-950 text-white py-14 px-4 text-center">
        <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-extrabold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          <Gift className="w-3.5 h-3.5" /> Tijdelijke Actie
        </div>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight mb-4 leading-tight">
          Krijg <span className="text-amber-400">3 Maanden</span><br className="sm:hidden" /> Gratis
        </h1>
        <p className="text-green-300 text-base sm:text-lg max-w-lg mx-auto mb-2">
          Bestel vandaag 12 maanden en kijk <strong className="text-white">15 maanden</strong> voor de prijs van 12.
        </p>
        <p className="text-amber-400 font-bold text-sm mb-10">Activeer vandaag &amp; kijk direct — binnen 3 minuten</p>

        {/* Countdown */}
        <div className="inline-block bg-white/5 border border-white/10 rounded-2xl px-8 py-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-green-400 mb-4 flex items-center justify-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
            Aanbieding eindigt vandaag om middernacht
          </p>
          <div className="flex items-center justify-center gap-3">
            {[{ val: timeLeft.hours, label: "UREN" }, { val: timeLeft.minutes, label: "MIN" }, { val: timeLeft.seconds, label: "SEC" }].map((u, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="text-center">
                  <div className="bg-white/10 border border-white/20 rounded-xl w-16 h-16 flex items-center justify-center">
                    <span className="text-3xl font-black text-white tabular-nums">{u.val.toString().padStart(2, "0")}</span>
                  </div>
                  <span className="text-[9px] text-green-400 tracking-widest mt-1.5 block">{u.label}</span>
                </div>
                {i < 2 && <span className="text-xl font-black text-white/30 mb-5">:</span>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pack card */}
      <section className="max-w-xl mx-auto px-4 pb-16 -mt-2">

        <div className="rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border border-amber-400/30">

          {/* Card header strip */}
          <div className="bg-gradient-to-r from-amber-400 to-yellow-300 px-6 py-4 flex items-center justify-between">
            <div>
              <p className="text-green-900 font-extrabold text-base uppercase tracking-widest leading-none">✦ Premium VIP+</p>
              <p className="text-green-800/70 text-xs font-bold mt-0.5">12 + 3 Maanden Gratis</p>
            </div>
            <div className="bg-green-900 text-amber-400 text-xs font-extrabold px-3 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1">
              <Star className="w-3 h-3 fill-amber-400" /> Beste deal
            </div>
          </div>

          {/* Card body — dark */}
          <div className="bg-gradient-to-b from-green-950 to-gray-950 px-6 pt-7 pb-8">

            {/* Device picker */}
            <div className="mb-7">
              <p className="text-[10px] font-bold text-green-400 uppercase tracking-widest mb-3">Aantal gelijktijdige schermen</p>
              <div className="grid grid-cols-4 gap-2">
                {(["1", "2", "3", "4"] as const).map((dev) => (
                  <button key={dev} onClick={() => setSelectedDevices(dev)}
                    className={`py-3 rounded-xl font-bold text-sm transition-all cursor-pointer border flex flex-col items-center gap-1 ${
                      selectedDevices === dev
                        ? "bg-amber-400 border-amber-400 text-green-900 shadow-lg shadow-amber-400/20"
                        : "bg-white/5 border-white/10 text-white/60 hover:border-white/30 hover:text-white"
                    }`}>
                    <Tv className={`w-4 h-4 ${selectedDevices === dev ? "text-green-900" : "text-white/40"}`} />
                    <span className="text-xs font-extrabold">{dev}x</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Price block */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-7 text-center">
              <div className="flex items-center justify-center gap-3 mb-1">
                <span className="text-white/40 line-through text-lg font-semibold">€{originalPrice.toFixed(2).replace(".", ",")}</span>
                <span className="bg-red-500 text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full">-{savingsPct}%</span>
              </div>
              <div className="text-5xl sm:text-6xl font-black font-display text-white mb-1 tabular-nums">
                €<span className="text-amber-400">{price.toFixed(2).replace(".", ",")}</span>
              </div>
              <p className="text-green-400 text-xs mb-2">eenmalig · 15 maanden totaal</p>
              <div className="inline-flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/20 text-amber-300 text-xs font-bold px-3 py-1 rounded-full">
                <Gift className="w-3 h-3" /> €{savingsAmount} bespaard · slechts €{monthlyPrice}/maand
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-2 mb-7">
              {features.map((f) => (
                <div key={f.label}
                  className={`flex items-center gap-3 px-3 py-2 rounded-xl ${f.highlight ? "bg-amber-400/10 border border-amber-400/20" : ""}`}>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${f.highlight ? "bg-amber-400" : "bg-green-700/40"}`}>
                    <Check className={`w-3 h-3 stroke-[3] ${f.highlight ? "text-green-900" : "text-green-400"}`} />
                  </div>
                  <span className={`text-sm ${f.highlight ? "text-amber-300 font-bold" : "text-white/80"}`}>{f.label}</span>
                </div>
              ))}
            </div>

            {/* CTA */}
            <button onClick={openWhatsApp}
              className="w-full py-4 rounded-2xl bg-amber-400 hover:bg-yellow-300 text-green-900 font-extrabold text-base uppercase tracking-wide transition-all cursor-pointer shadow-lg shadow-amber-400/20 hover:shadow-amber-400/40 hover:scale-[1.02] active:scale-[0.98]">
              🎁 Activeer 3 Maanden Gratis →
            </button>
            <p className="text-center text-xs text-white/30 mt-3">Direct actief · Geen contract · Anoniem betalen</p>
          </div>
        </div>

        {/* Trust row */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center text-xs">
          {[
            { icon: <Zap className="w-5 h-5 text-amber-400" />, title: "Direct actief", sub: "binnen 3 minuten" },
            { icon: <Shield className="w-5 h-5 text-green-400" />, title: "100% veilig", sub: "anoniem betalen" },
            { icon: <MessageCircle className="w-5 h-5 text-emerald-400" />, title: "24/7 Support", sub: "via WhatsApp" },
          ].map((t) => (
            <div key={t.title} className="bg-white/5 border border-white/10 rounded-xl py-4 px-2">
              <div className="flex justify-center mb-1">{t.icon}</div>
              <span className="font-bold text-white block">{t.title}</span>
              <span className="text-white/40">{t.sub}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 text-white/30 text-center text-xs py-6">
        © 2025 tvpikoma · Premium IPTV voor NL &amp; BE
      </footer>
    </div>
  );
}
