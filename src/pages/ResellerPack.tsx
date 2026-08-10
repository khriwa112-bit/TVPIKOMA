import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Check, MessageCircle, TrendingUp, Key, Users, ShieldCheck, Sparkles, Star, Gift } from "lucide-react";
import { useWhatsAppNumber } from "../../contexts/WhatsAppContext";
import { applyPageMeta, DEFAULT_PAGE_META, setFaqPageSchema, setBreadcrumbSchema } from "../lib/pageMeta";

interface CreditPack {
  id: string;
  name: string;
  credits: number;
  price: number;
  originalPrice?: number;
  perCredit: number;
  badge?: string;
  features: string[];
}

const packs: CreditPack[] = [
  {
    id: "brons",
    name: "Brons",
    credits: 120,
    price: 270,
    perCredit: 2.25,
    features: [
      "120 credits (lijnen/maanden)",
      "Volledig reseller dashboard",
      "Zelf trials & accounts aanmaken",
      "100% White Label branding",
      "Zelf je eigen prijzen bepalen",
      "24/7 WhatsApp reseller support",
    ],
  },
  {
    id: "zilver",
    name: "Zilver",
    credits: 240,
    price: 500,
    originalPrice: 540,
    perCredit: 2.08,
    badge: "Meest gekozen",
    features: [
      "240 credits (lijnen/maanden)",
      "Volledig reseller dashboard",
      "Zelf trials & accounts aanmaken",
      "100% White Label branding",
      "Zelf je eigen prijzen bepalen",
      "Prioriteit WhatsApp support",
      "Gratis playlist/EPG generator",
    ],
  },
];

const usps = [
  { icon: <TrendingUp className="w-4 h-4 text-green-700" />, title: "Hoge Winstmarges", desc: "Koop credits vanaf €2,08/maand per lijn en verkoop voor €10-€15+ aan je klanten." },
  { icon: <Key className="w-4 h-4 text-green-700" />, title: "Volledig Beheerpaneel", desc: "Genereer zelf playlists, pas accounts aan en maak gratis trials aan voor nieuwe klanten." },
  { icon: <Users className="w-4 h-4 text-green-700" />, title: "100% White Label", desc: "Je verkoopt onder je eigen merknaam. Klanten zien tvpikoma nergens terug." },
];

const faqs = [
  { q: "Wat is een reseller credit precies?", a: "Eén credit staat gelijk aan één maand IPTV-toegang voor één klantlijn. Je koopt credits in bulk tegen een lage prijs en wijst ze zelf toe aan je eigen klanten, tegen de prijs die jij bepaalt." },
  { q: "Hoe snel krijg ik toegang tot mijn dashboard?", a: "Direct na bestelling en betaling ontvang je binnen enkele minuten je reseller inloggegevens per e-mail, samen met een korte handleiding voor het beheerpaneel." },
  { q: "Verlopen mijn credits?", a: "Nee, credits verlopen niet. Je gebruikt ze op het moment dat jij een klant activeert of verlengt, zo vaak of zo weinig als je zelf wilt." },
  { q: "Kan ik eerst gratis testen voordat ik credits koop?", a: "Zeker. Stuur ons een berichtje via WhatsApp en we zetten een gratis testpaneel voor je klaar zodat je het dashboard eerst zelf kan uitproberen." },
];

export default function ResellerPack() {
  const WHATSAPP_NUMBER = useWhatsAppNumber();
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  useEffect(() => {
    applyPageMeta({
      title: "tvpikoma Reseller Pakketten – Word IPTV Reseller | Vanaf €270",
      description:
        "Start je eigen IPTV onderneming met een tvpikoma reseller pakket. Kies Brons (120 credits, €270) of Zilver (240 credits, €500) en verkoop onder je eigen merknaam.",
      canonical: "https://tivipikoma.com/reseller-pakket",
      ogTitle: "tvpikoma Reseller Pakketten – Word IPTV Reseller",
      ogDescription:
        "Start je eigen IPTV onderneming. 100% white label, hoge winstmarges, volledig beheerpaneel. Pakketten vanaf €270.",
    });
    setFaqPageSchema(faqs.map((f) => ({ question: f.q, answer: f.a })));
    setBreadcrumbSchema([{ name: "Reseller Pakketten", path: "/reseller-pakket" }]);
    return () => {
      applyPageMeta(DEFAULT_PAGE_META);
      setFaqPageSchema(null);
      setBreadcrumbSchema(null);
    };
  }, []);

  const startCheckout = (pack: CreditPack) => {
    navigate("/afrekenen", {
      state: {
        title: `Reseller aanmelding: ${pack.name}`,
        orderLines: [
          { label: "Pakket", value: pack.name },
          { label: "Credits", value: String(pack.credits) },
        ],
        total: `€${pack.price.toFixed(2).replace(".", ",")}`,
        baseMessage: `[tvpikoma] Hallo, ik wil me aanmelden als reseller met het *${pack.name} pakket* (${pack.credits} credits) voor €${pack.price.toFixed(2).replace(".", ",")}.`,
        showDeviceField: false,
      },
    });
  };

  const requestTestPanel = () => {
    const msg = `[tvpikoma] Hallo, ik ben geïnteresseerd om reseller te worden. Kan ik eerst een gratis testpaneel krijgen?`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  };

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
        <span className="text-xs uppercase font-bold tracking-widest bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-5 inline-block text-emerald-300">PARTNER PROGRAMMA</span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">Reseller Pakketten</h1>
        <p className="text-green-200 text-lg max-w-xl mx-auto mb-2">Start je eigen IPTV onderneming en verdien maandelijks een stabiel passief inkomen.</p>
        <p className="text-amber-400 font-bold text-base">Vanaf €270 &mdash; Direct toegang tot je reseller dashboard</p>
      </section>

      {/* USPs */}
      <section className="max-w-5xl mx-auto px-4 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {usps.map((u) => (
            <div key={u.title} className="flex gap-3 bg-green-50 border border-green-100 rounded-2xl p-5">
              <div className="p-2 h-fit rounded-lg bg-green-100 border border-green-200 shrink-0 mt-0.5">{u.icon}</div>
              <div>
                <h3 className="font-bold text-green-900 mb-1 text-sm">{u.title}</h3>
                <p className="text-green-600 leading-relaxed text-xs">{u.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Credit pack cards */}
      <section className="max-w-3xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-extrabold text-green-900 text-center mb-2">Kies je Credit Pakket</h2>
        <p className="text-green-600 text-sm text-center mb-8">1 credit = 1 maand toegang voor 1 klantlijn. Credits verlopen nooit.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {packs.map((pack) => (
            <div key={pack.id}
              className={`relative rounded-2xl border p-7 flex flex-col shadow-sm ${
                pack.badge
                  ? "border-amber-300 bg-gradient-to-b from-amber-400 to-amber-300 shadow-xl"
                  : "border-green-200 bg-gradient-to-b from-green-50 to-white"
              }`}>
              {pack.badge && (
                <div className="flex justify-center mb-4">
                  <span className="bg-green-900 text-amber-400 text-[10px] font-extrabold px-5 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1">
                    <Star className="w-3 h-3 fill-amber-400" /> {pack.badge}
                  </span>
                </div>
              )}
              <h3 className={`text-2xl font-extrabold mb-1 ${pack.badge ? "text-green-900" : "text-green-900 mt-2"}`}>{pack.name}</h3>
              <p className={`text-xs uppercase tracking-widest mb-4 ${pack.badge ? "text-green-800/70" : "text-green-600"}`}>{pack.credits} credits</p>

              <div className="flex items-center gap-2 mb-1">
                {pack.originalPrice && (
                  <span className={`line-through text-sm font-semibold ${pack.badge ? "text-green-800/50" : "text-green-400"}`}>
                    €{pack.originalPrice.toFixed(2).replace(".", ",")}
                  </span>
                )}
                <div className={`text-4xl font-black font-display ${pack.badge ? "text-green-900" : "text-green-900"}`}>
                  €{pack.price.toFixed(2).replace(".", ",")}
                </div>
              </div>
              <p className={`text-xs mb-6 ${pack.badge ? "text-green-800/60" : "text-green-500"}`}>
                &asymp; €{pack.perCredit.toFixed(2).replace(".", ",")} per credit
              </p>

              <div className="flex flex-col gap-2 mb-6 flex-1">
                {pack.features.map((f) => (
                  <div key={f} className={`flex items-start gap-2 text-xs ${pack.badge ? "text-green-900" : "text-green-800"}`}>
                    <Check className={`w-3.5 h-3.5 mt-0.5 shrink-0 stroke-[3] ${pack.badge ? "" : "text-green-500"}`} />{f}
                  </div>
                ))}
              </div>

              <button onClick={() => startCheckout(pack)}
                className={`w-full py-3.5 rounded-xl font-bold text-sm uppercase tracking-wide transition-all cursor-pointer ${
                  pack.badge
                    ? "bg-green-900 hover:bg-green-800 text-amber-400 shadow-lg"
                    : "bg-green-50 hover:bg-green-100 border border-green-300 text-green-800"
                }`}>
                Bestel via WhatsApp →
              </button>
            </div>
          ))}
        </div>

        {/* Free test panel callout */}
        <div className="mt-8 bg-green-50 border border-green-100 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2.5 rounded-full bg-green-100 border border-green-200 shrink-0">
              <Sparkles className="w-4 h-4 text-green-700" />
            </div>
            <div>
              <h4 className="font-bold text-green-900 text-sm">Liever eerst uitproberen?</h4>
              <p className="text-green-600 text-xs">Vraag een gratis testpaneel aan en bekijk het reseller dashboard zelf.</p>
            </div>
          </div>
          <button onClick={requestTestPanel}
            className="shrink-0 px-5 py-2.5 rounded-xl bg-white border border-green-300 text-green-800 hover:bg-green-100 font-bold text-xs uppercase tracking-wide transition-all cursor-pointer">
            Gratis testpaneel aanvragen
          </button>
        </div>

        {/* Trust row */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs text-green-600">
          {["✅ Direct toegang", "🔒 Credits verlopen nooit", "🏷️ 100% White Label", "💬 24/7 reseller support"].map(t => (
            <div key={t} className="bg-green-50 border border-green-100 rounded-xl py-3 px-2 font-semibold">{t}</div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-extrabold text-green-900 text-center mb-8">Veelgestelde Vragen</h2>
        <div className="flex flex-col gap-3">
          {faqs.map((f, i) => (
            <div key={f.q} className="border border-green-100 rounded-2xl overflow-hidden bg-green-50">
              <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left cursor-pointer">
                <span className="font-bold text-green-900 text-sm">{f.q}</span>
                <span className={`shrink-0 text-green-600 transition-transform ${openFaq === i ? "rotate-45" : ""}`}>+</span>
              </button>
              {openFaq === i && (
                <div className="px-5 pb-4 text-green-700 text-xs leading-relaxed">{f.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-b from-green-900 to-green-800 text-white py-14 px-4 text-center">
        <ShieldCheck className="w-8 h-8 text-amber-400 mx-auto mb-4" />
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-3">Klaar om te starten?</h2>
        <p className="text-green-200 text-sm max-w-md mx-auto mb-6">Neem contact op via WhatsApp en we helpen je binnen enkele minuten op weg met je eigen reseller dashboard.</p>
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("[tvpikoma] Hallo, ik wil graag meer weten over de reseller pakketten.")}`}
          target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-amber-400 hover:bg-amber-300 text-green-900 font-extrabold text-sm px-6 py-3.5 rounded-xl transition-all cursor-pointer shadow-lg"
        >
          <Gift className="w-4 h-4" /> Start als Reseller
        </a>
      </section>

      {/* Related pages */}
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-wrap items-center justify-center gap-3 text-xs">
        <Link to="/abonnementen" className="px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-800 font-semibold hover:bg-green-100 transition-colors">
          Zelf ook kijken? Bekijk abonnementen
        </Link>
        <Link to="/3-maanden-gratis" className="px-4 py-2 rounded-full bg-green-50 border border-green-200 text-green-800 font-semibold hover:bg-green-100 transition-colors">
          🎁 3 maanden gratis actie
        </Link>
      </div>

      {/* Footer */}
      <footer className="bg-green-900 text-green-300 text-center text-xs py-6">
        <p>© {new Date().getFullYear()} tvpikoma · Premium IPTV voor NL &amp; BE</p>
      </footer>
    </div>
  );
}
