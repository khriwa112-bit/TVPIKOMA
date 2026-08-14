import { useState, useEffect } from "react";
import { PRICING_MAPPING } from "../data";
import { BillingPeriod } from "../types";
import { useWhatsAppNumber } from "../../contexts/WhatsAppContext";

export default function PricingCalculator() {
  const WHATSAPP_NUMBER = useWhatsAppNumber();
  const [selectedPlan, setSelectedPlan] = useState<"Basis" | "VIP">("Basis");

  const getTimeUntilMidnight = () => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);
    const diff = Math.floor((midnight.getTime() - now.getTime()) / 1000);
    return { hours: Math.floor(diff / 3600), minutes: Math.floor((diff % 3600) / 60), seconds: diff % 60 };
  };
  const [timeLeft, setTimeLeft] = useState(getTimeUntilMidnight);
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(getTimeUntilMidnight()), 1000);
    return () => clearInterval(timer);
  }, []);
  const [selectedDevices, setSelectedDevices] = useState<"1"|"2"|"3"|"4">("1");

  const vipPrices: Record<BillingPeriod, Record<string, number>> = {
    "3_months":        { "1": 34.99, "2": 49.99, "3": 69.99, "4": 89.99 },
    "6_months":        { "1": 44.99, "2": 79.99, "3": 99.99, "4": 139.99 },
    "12_months":       { "1": 69.99, "2": 89.99, "3": 109.99, "4": 129.99 },
    "12_plus_3_months":{ "1": 78.00, "2": 124.99, "3": 179.99, "4": 199.99 },
  };
  const normalPrices: Record<BillingPeriod, Record<string, number>> = {
    "3_months":        { "1": 25, "2": 39.99, "3": 49.99, "4": 57.99 },
    "6_months":        { "1": 35, "2": 49.99, "3": 69.99, "4": 89.99 },
    "12_months":       { "1": 54.99, "2": 69.99, "3": 84.99, "4": 99.99 },
    "12_plus_3_months":{ "1": 49, "2": 99.99, "3": 139.99, "4": 179.99 },
  };

  const periods = [
    { id:"3_months" as BillingPeriod, label:"3 Maanden", sub:"€11,99/maand" },
    { id:"6_months" as BillingPeriod, label:"6 Maanden", sub:"€9,99/maand" },
    { id:"12_plus_3_months" as BillingPeriod, label:"15 Maanden", sub:"€5,20/maand!", bonus:true },
  ];

  const startCheckout = (plan: "VIP" | "Basis", price: number, periodLabel: string) => {
    const msg = `[tvpikoma] Hallo, ik wil het *${plan === "VIP" ? "✦ Premium VIP+" : "Basis"}* pakket bestellen. ${periodLabel}, ${selectedDevices} scherm(en), €${price.toFixed(2).replace(".", ",")}.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

  const vipFeatures = [
    "SD/HD/FULL HD/4K/8K/HDR-VR",
    "+80.000 Kanalen + Netflix",
    "RTL, NPO, ZIGGO, SBS, ESPN, Viaplay, VTM",
    "+200.000 Films & Series",
    "Dagelijkse Updates",
    "Alle Sport PPV Events",
    "VIP 24/7 Support",
    "Enterprise Anti-Freeze PRO",
    "Persoonlijke VIP Manager",
    "Alle Apparaten",
    "VPN Inbegrepen",
    "Exclusieve VIP Content",
    "Videoland, Netflix, Amazon, HBO, Apple TV, Hulu",
  ];

  const basisFeatures = [
    "SD/HD/FULL HD Kwaliteit",
    "+25.000 Kanalen + Netflix",
    "RTL, NPO, ZIGGO, SBS, ESPN, Viaplay",
    "+140.000 Films & Series",
    "Wekelijkse Updates",
    "24/7 Support NL & BE",
    "100% Anoniem",
    "AntiFreeze Technologie",
    "Alle Apparaten",
    "VPN Inbegrepen",
    "Exclusieve NL & BE Content",
    "Netflix, Amazon, HBO, Apple TV, Hulu",
  ];

  return (
    <section className="relative bg-gradient-to-b from-green-900 via-green-800 to-white text-white py-16 border-b-2 border-green-200 overflow-hidden" id="pricing-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-sans text-emerald-300 font-bold tracking-widest bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-6 inline-block">PRIJZEN</span>
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold font-display tracking-tight text-white leading-tight mb-10">
            Eén abonnement,{" "}
            <span className="italic font-serif font-normal text-emerald-300">eindeloze</span>
            <br />mogelijkheden
          </h2>

          <p className="text-green-100 text-base sm:text-lg font-medium mb-8 leading-relaxed">
            Het is <span className="text-white font-bold italic">"je gaat nooit meer terug"</span> beter.<br />
            <span className="text-green-200 text-sm sm:text-base font-normal">tvpikoma vervangt dure Ziggo-pakketten en meerdere streamingdiensten voor één vaste prijs.</span>
          </p>

          {/* Countdown timer */}
          <div className="inline-block bg-white/10 backdrop-blur border border-white/20 rounded-2xl px-8 py-6 shadow-md">
            <div className="flex items-center gap-2 justify-center mb-5">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-widest text-green-200 font-sans">
                Beperkte aanbieding eindigt om middernacht
              </span>
            </div>
            <div className="flex items-center justify-center gap-4">
              {[
                { val: timeLeft.hours,   label: "UREN"     },
                { val: timeLeft.minutes, label: "MINUTEN"  },
                { val: timeLeft.seconds, label: "SECONDEN" },
              ].map((unit, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="bg-white/20 border border-white/30 rounded-xl w-16 h-16 flex items-center justify-center">
                      <span className="text-3xl font-black text-white font-display">
                        {unit.val.toString().padStart(2, "0")}
                      </span>
                    </div>
                    <span className="text-[9px] text-green-300 font-sans tracking-widest mt-1 block">{unit.label}</span>
                  </div>
                  {i < 2 && <span className="text-2xl font-black text-white/50 mb-5">:</span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs uppercase font-sans text-green-600 font-bold tracking-widest bg-green-50 border border-green-200 px-3 py-1 rounded-full mb-3 inline-block">IPTV ABONNEMENTEN</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-4">Eén vast tarief, onbeperkt plezier</h2>
          <p className="text-green-700 text-sm sm:text-base">Kies je periode en aantal apparaten. Geen onverwachte kosten.</p>
        </div>

        <div className="max-w-4xl mx-auto bg-white border border-green-100 rounded-2xl p-6 sm:p-8 shadow-md mb-12">
          <div className="grid grid-cols-1 gap-8">
            <div className="flex flex-col gap-6">

              {/* Plan toggle */}
              <div>
                <label className="text-xs font-bold text-green-600 uppercase tracking-widest block mb-3 font-sans">1. Kies je pakket:</label>
                <div className="flex gap-1.5 bg-green-50 border border-green-200 rounded-2xl p-1.5">
                  <button onClick={() => setSelectedPlan("Basis")}
                    className={`flex-1 py-3.5 rounded-xl text-center font-bold text-sm transition-all cursor-pointer ${
                      selectedPlan === "Basis"
                        ? "bg-green-600 text-white shadow-md"
                        : "text-green-600 hover:text-green-800"
                    }`}>
                    Basis
                  </button>
                  <button onClick={() => setSelectedPlan("VIP")}
                    className={`flex-1 py-3.5 rounded-xl text-center font-bold text-sm transition-all cursor-pointer ${
                      selectedPlan === "VIP"
                        ? "bg-amber-400 text-green-900 shadow-md"
                        : "text-green-600 hover:text-green-800"
                    }`}>
                    ✦ Premium VIP+
                  </button>
                </div>
              </div>

              {/* Device grid */}
              <div>
                <label className="text-xs font-bold text-green-600 uppercase tracking-widest block mb-3 font-sans">2. Aantal gelijktijdige schermen:</label>
                <div className="grid grid-cols-2 gap-2">
                  {["1","2","3","4"].map((dev) => (
                    <button key={dev} onClick={() => setSelectedDevices(dev as "1"|"2"|"3"|"4")}
                      className={`flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-sm transition-all cursor-pointer border-2 ${
                        selectedDevices === dev
                          ? "bg-green-600 border-green-600 text-white shadow-md"
                          : "bg-white border-green-200 text-green-600 hover:border-green-400 hover:text-green-800"
                      }`}>
                      <svg className={`w-5 h-5 ${selectedDevices === dev ? "text-white" : "text-green-400"}`} fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                        <rect x="2" y="3" width="20" height="14" rx="2"/>
                        <path d="M8 21h8M12 17v4"/>
                      </svg>
                      {dev} {Number(dev) > 1 ? "Apparaten" : "Apparaat"}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price cards per period, for whichever plan is toggled */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {periods.map((p) => {
            const isVip = selectedPlan === "VIP";
            const price = (isVip ? vipPrices : normalPrices)[p.id][selectedDevices];
            const features = isVip ? vipFeatures : basisFeatures;
            return (
              <div key={p.id}
                className={`relative rounded-2xl border p-8 min-h-[560px] flex flex-col ${
                  isVip
                    ? "border-amber-300 bg-gradient-to-b from-amber-400 to-amber-300 shadow-xl"
                    : "border-green-200 bg-gradient-to-b from-green-50 to-white shadow-sm"
                }`}>
                {p.bonus && (
                  <div className="flex justify-center mb-4">
                    <span className="bg-green-900 text-amber-400 text-[10px] font-extrabold px-5 py-1.5 rounded-full uppercase tracking-widest shadow-md">BESTE DEAL</span>
                  </div>
                )}
                <h3 className={`text-2xl font-extrabold font-display text-green-900 mb-1 ${p.bonus ? "" : "mt-2"}`}>
                  {isVip ? "✦ PREMIUM VIP +" : "Basis"}
                </h3>
                <p className={`text-xs font-sans uppercase tracking-widest mb-4 ${isVip ? "text-green-800/70" : "text-green-600"}`}>
                  {p.label.toUpperCase()}
                </p>
                <div className="mb-4">
                  <span onClick={() => startCheckout(isVip ? "VIP" : "Basis", price, p.label)}
                    className={`text-5xl font-black text-green-900 cursor-pointer hover:text-green-700 transition-colors ${isVip ? "font-display" : ""}`}
                    style={!isVip ? { fontFamily: "'Sour Gummy', cursive" } : undefined}>
                    €{price.toFixed(2).replace(".",",")}
                  </span>
                </div>
                <p className={`text-xs mb-5 flex items-center gap-1 ${isVip ? "text-green-800/70" : "text-green-500"}`}>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>
                  {selectedDevices} {Number(selectedDevices) > 1 ? "apparaten" : "apparaat"} inbegrepen
                </p>

                <div className="flex flex-col gap-2.5 mb-6 flex-1">
                  {features.map((feature) => (
                    <div key={feature} className={`flex items-start gap-2.5 text-xs ${isVip ? "text-green-900" : "text-green-800"}`}>
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 border ${
                        isVip ? "bg-green-900/15 border-green-900/30" : "bg-green-100 border-green-200"
                      }`}>
                        <svg className={`w-2.5 h-2.5 ${isVip ? "text-green-900" : "text-green-500"}`} fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                      </div>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                <button onClick={() => startCheckout(isVip ? "VIP" : "Basis", price, p.label)}
                  className={`w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-wide transition-all cursor-pointer mt-auto ${
                    isVip
                      ? "bg-green-900 hover:bg-green-800 text-amber-400 shadow-lg"
                      : "bg-green-50 hover:bg-green-100 border border-green-300 text-green-800"
                  }`}>
                  Bestel Nu &rarr;
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
