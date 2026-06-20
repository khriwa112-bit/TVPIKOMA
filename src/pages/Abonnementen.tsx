import { useState, useEffect } from "react";
import { Check, MessageCircle } from "lucide-react";
import { PRICING_MAPPING } from "../data";
import { BillingPeriod } from "../types";

const WHATSAPP_NUMBER = "447449708976";

const periods: { id: BillingPeriod; label: string; sub: string; bonus?: boolean }[] = [
  { id: "3_months",         label: "3 Maanden",    sub: "€11,99/maand" },
  { id: "6_months",         label: "6 Maanden",    sub: "€9,99/maand" },
  { id: "12_months",        label: "12 Maanden",   sub: "€7,50/maand" },
  { id: "12_plus_3_months", label: "12+3 Maanden", sub: "€5,20/maand", bonus: true },
];

const vipPrices: Record<BillingPeriod, Record<string, number>> = {
  "3_months":         { "1": 34.99, "2": 49.99, "3": 69.99, "4": 89.99 },
  "6_months":         { "1": 44.99, "2": 79.99, "3": 99.99, "4": 139.99 },
  "12_months":        { "1": 69.99, "2": 89.99, "3": 109.99, "4": 129.99 },
  "12_plus_3_months": { "1": 78.00, "2": 124.99, "3": 179.99, "4": 199.99 },
};
const normalPrices: Record<BillingPeriod, Record<string, number>> = {
  "3_months":         { "1": 24.99, "2": 39.99, "3": 49.99, "4": 57.99 },
  "6_months":         { "1": 34.99, "2": 49.99, "3": 69.99, "4": 89.99 },
  "12_months":        { "1": 54.99, "2": 69.99, "3": 84.99, "4": 99.99 },
  "12_plus_3_months": { "1": 69.99, "2": 99.99, "3": 139.99, "4": 179.99 },
};

export default function Abonnementen() {
  const [selectedPeriod, setSelectedPeriod] = useState<BillingPeriod>("12_plus_3_months");
  const [selectedDevices, setSelectedDevices] = useState<"1" | "2" | "3" | "4">("1");

  useEffect(() => {
    document.title = "tvpikoma Abonnementen – Kies het beste IPTV pakket | Vanaf €5/maand";
    document.querySelector('meta[name="description"]')?.setAttribute("content",
      "Bekijk alle tvpikoma IPTV abonnementen. Kies het beste pakket voor jouw situatie – Basis of Premium VIP+. Prijzen vanaf €5/maand. Direct actief na betaling."
    );
    document.querySelector('link[rel="canonical"]')?.setAttribute("href", "https://tivipikoma.com/abonnementen");
    return () => {
      document.title = "tvpikoma | #1 IPTV Nederland – 80.000+ Kanalen, 4K & Onbeperkt Kijken";
      document.querySelector('meta[name="description"]')?.setAttribute("content",
        "tvpikoma is de #1 IPTV provider van Nederland. Geniet van 80.000+ kanalen, 200.000+ films & series in 4K/8K kwaliteit."
      );
      document.querySelector('link[rel="canonical"]')?.setAttribute("href", "https://tivipikoma.com/");
    };
  }, []);

  const periodInfo = PRICING_MAPPING[selectedPeriod];

  const openWhatsApp = (plan: "VIP" | "Basis", price: number) => {
    const periodLabel = periods.find(p => p.id === selectedPeriod)?.label ?? selectedPeriod;
    const msg = `[tvpikoma] Hallo, ik wil het *${plan === "VIP" ? "✦ Premium VIP+" : "Basis"}* pakket bestellen. ${periodLabel}, ${selectedDevices} scherm(en), €${price.toFixed(2).replace(".", ",")}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const vipPrice = vipPrices[selectedPeriod][selectedDevices];
  const normalPrice = normalPrices[selectedPeriod][selectedDevices];

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* Top bar */}
      <div className="bg-green-900 text-white py-3 px-4 text-center">
        <span className="text-sm font-semibold">📺 tvpikoma — Premium IPTV voor Nederland &amp; België</span>
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
            <MessageCircle className="w-4 h-4" /> Bestel via WhatsApp
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-gradient-to-b from-green-900 to-green-700 text-white py-16 px-4 text-center">
        <span className="text-xs uppercase font-bold tracking-widest bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-5 inline-block text-emerald-300">IPTV ABONNEMENTEN</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Onze Abonnementen</h1>
        <p className="text-green-200 text-lg max-w-xl mx-auto mb-2">Kies het beste IPTV pakket voor jouw situatie.</p>
        <p className="text-amber-400 font-bold text-base">Vanaf €5/maand &mdash; Direct actief na betaling</p>
      </section>

      {/* Configurator */}
      <section className="max-w-4xl mx-auto px-4 py-12">

        <div className="bg-white border border-green-100 rounded-2xl p-6 sm:p-8 shadow-md mb-10">

          {/* Period tabs */}
          <div className="mb-6">
            <label className="text-xs font-bold text-green-600 uppercase tracking-widest block mb-3">1. Kies de abonnementsduur:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {periods.map((p) => (
                <button key={p.id} onClick={() => setSelectedPeriod(p.id)}
                  className={`relative py-4 px-2 rounded-2xl text-center font-bold text-sm transition-all cursor-pointer border-2 overflow-hidden ${
                    selectedPeriod === p.id
                      ? p.bonus ? "bg-amber-400 border-amber-400 text-green-900 shadow-lg" : "bg-green-600 border-green-600 text-white shadow-md"
                      : "bg-white border-green-200 text-green-600 hover:border-green-400"
                  }`}>
                  {p.bonus && (
                    <span className="absolute top-1.5 right-1.5 bg-green-900 text-amber-400 text-[8px] font-black px-1.5 py-0.5 rounded-full">-50%</span>
                  )}
                  <span className="block font-extrabold">{p.label}</span>
                  <span className={`text-[10px] font-semibold block mt-0.5 ${selectedPeriod === p.id ? (p.bonus ? "text-green-800" : "text-green-200") : "text-green-400"}`}>{p.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Device selector */}
          <div>
            <label className="text-xs font-bold text-green-600 uppercase tracking-widest block mb-3">2. Aantal gelijktijdige schermen:</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {(["1", "2", "3", "4"] as const).map((dev) => (
                <button key={dev} onClick={() => setSelectedDevices(dev)}
                  className={`py-4 rounded-2xl font-bold text-sm transition-all cursor-pointer border-2 ${
                    selectedDevices === dev
                      ? "bg-green-600 border-green-600 text-white shadow-md"
                      : "bg-white border-green-200 text-green-600 hover:border-green-400"
                  }`}>
                  {dev} {Number(dev) > 1 ? "Apparaten" : "Apparaat"}
                </button>
              ))}
            </div>
          </div>

          <p className="text-center text-xs text-green-400 mt-5">Geen contract · Opzegging niet nodig · Anoniem</p>
        </div>

        {/* Price cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* VIP */}
          <div className="rounded-2xl border border-amber-300 bg-gradient-to-b from-amber-400 to-amber-300 p-8 flex flex-col shadow-xl">
            <div className="flex justify-center mb-4">
              <span className="bg-green-900 text-amber-400 text-[10px] font-extrabold px-5 py-1.5 rounded-full uppercase tracking-widest">BESTE DEAL</span>
            </div>
            <h2 className="text-2xl font-extrabold text-green-900 mb-1">✦ PREMIUM VIP +</h2>
            <p className="text-green-800/70 text-xs uppercase tracking-widest mb-4">{periods.find(p => p.id === selectedPeriod)?.label?.toUpperCase()}</p>
            <div className="text-5xl font-black font-display text-green-900 mb-1">€{vipPrice.toFixed(2).replace(".", ",")}</div>
            <p className="text-green-800/60 text-xs mb-6">eenmalig · {periodInfo.months + periodInfo.bonusMonths} maanden totaal</p>
            <div className="flex flex-col gap-2 mb-6 flex-1">
              {["SD/HD/FULL HD/4K/8K/HDR-VR", "+80.000 Kanalen + Netflix", "RTL, NPO, ZIGGO, SBS, ESPN, Viaplay", "+200.000 Films & Series", "Alle Sport PPV Events", "VIP 24/7 Support", "VPN Inbegrepen"].map(f => (
                <div key={f} className="flex items-start gap-2 text-xs text-green-900">
                  <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 stroke-[3]" />{f}
                </div>
              ))}
            </div>
            <button onClick={() => openWhatsApp("VIP", vipPrice)}
              className="w-full py-3.5 rounded-xl bg-green-900 hover:bg-green-800 text-amber-400 font-bold text-sm uppercase tracking-wide transition-all cursor-pointer shadow-lg">
              Bestel Nu via WhatsApp →
            </button>
          </div>

          {/* Basis */}
          <div className="rounded-2xl border border-green-200 bg-gradient-to-b from-green-50 to-white p-8 flex flex-col shadow-sm">
            <h2 className="text-2xl font-extrabold text-green-900 mb-1 mt-2">Basis</h2>
            <p className="text-green-600 text-xs uppercase tracking-widest mb-4">{periods.find(p => p.id === selectedPeriod)?.label?.toUpperCase()}</p>
            <div className="text-5xl font-black font-display text-green-900 mb-1">€{normalPrice.toFixed(2).replace(".", ",")}</div>
            <p className="text-green-500 text-xs mb-6">eenmalig · {periodInfo.months} maanden</p>
            <div className="flex flex-col gap-2 mb-6 flex-1">
              {["SD/HD/FULL HD Kwaliteit", "+50.000 Kanalen + Netflix", "RTL, NPO, ZIGGO, SBS, ESPN", "+140.000 Films & Series", "24/7 Support NL & BE", "AntiFreeze Technologie", "VPN Inbegrepen"].map(f => (
                <div key={f} className="flex items-start gap-2 text-xs text-green-800">
                  <Check className="w-3.5 h-3.5 mt-0.5 shrink-0 stroke-[3] text-green-500" />{f}
                </div>
              ))}
            </div>
            <button onClick={() => openWhatsApp("Basis", normalPrice)}
              className="w-full py-3.5 rounded-xl bg-green-50 hover:bg-green-100 border border-green-300 text-green-800 font-bold text-sm uppercase tracking-wide transition-all cursor-pointer">
              Bestel Nu via WhatsApp →
            </button>
          </div>
        </div>

        {/* Trust row */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs text-green-600">
          {["✅ Direct actief", "🔒 100% anoniem", "📱 Alle apparaten", "💬 24/7 support"].map(t => (
            <div key={t} className="bg-green-50 border border-green-100 rounded-xl py-3 px-2 font-semibold">{t}</div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-green-300 text-center text-xs py-6 mt-8">
        <p>© 2025 tvpikoma · Premium IPTV voor NL &amp; BE</p>
      </footer>
    </div>
  );
}
