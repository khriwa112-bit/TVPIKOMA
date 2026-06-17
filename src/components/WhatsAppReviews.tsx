import { MessageSquare } from "lucide-react";

const ROW1 = Array.from({ length: 7 }, (_, i) => `/assets/reviews/chat-${i + 1}.png`);
const ROW2 = Array.from({ length: 3 }, (_, i) => `/assets/reviews/chat-${i + 8}.png`);

function PhoneFrame({ src, index }: { src: string; index: number }) {
  const rotations = [-3, 2, -2, 3, -1, 2, -3, 1, -2, 3, -1, 2, -3];
  const rot = rotations[index % rotations.length];
  return (
    <div style={{
      flexShrink: 0,
      position: "relative",
      padding: "20px 12px",
      transform: `rotate(${rot}deg)`,
    }}>
      <div style={{
        width: 165,
        borderRadius: 24,
        overflow: "hidden",
        boxShadow:
          "0 8px 16px rgba(0,0,0,0.08), 0 20px 50px rgba(0,0,0,0.10), 0 0 40px rgba(22,163,74,0.08)",
        border: "1px solid rgba(0,0,0,0.06)",
      }}>
        <img
          src={src}
          alt="Klant review"
          style={{ width: "100%", height: "auto", display: "block" }}
          loading="lazy"
        />
      </div>
    </div>
  );
}

function MarqueeRow({ images, reverse = false }: { images: string[]; reverse?: boolean }) {
  const doubled = [...images, ...images];
  return (
    <div style={{ overflowX: "hidden", overflowY: "visible", width: "100%", padding: "16px 0" }}>
      <div className={reverse ? "animate-scroll-right" : "animate-scroll"} style={{ display: "flex", gap: 20, alignItems: "flex-end" }}>
        {doubled.map((src, i) => (
          <PhoneFrame key={i} src={src} index={i} />
        ))}
      </div>
    </div>
  );
}

export default function WhatsAppReviews() {
  return (
    <section className="bg-gradient-to-br from-emerald-800 to-green-900 text-white py-16 border-b-2 border-green-700" style={{ overflowX: "hidden" }} id="reviews-section">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs uppercase font-sans text-emerald-300 font-bold tracking-widest bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-3 inline-block">23.000+ TEVREDEN KLANTEN</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white mb-4">#1 IPTV in Nederland volgens onze klanten</h2>
          <p className="text-green-200 text-sm sm:text-base">We laten onze WhatsApp supportberichten spreken. Hier zijn echte onbewerkte reacties van klanten.</p>
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 32, width: "100%" }}>
        <MarqueeRow images={ROW1} />
        <MarqueeRow images={ROW2} reverse />
      </div>

      <div className="mt-10 text-center">
        <p className="text-xs text-green-200 mb-4 inline-flex items-center gap-1.5 justify-center">
          <MessageSquare className="w-4 h-4" /> Heb je zelf een vraag en wil je live met support praten?
        </p><br />
        <a href="https://wa.me/447449708976" target="_blank" rel="noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-amber-400 text-green-900 hover:bg-amber-500 font-bold text-xs tracking-wide transition-all uppercase shadow-lg">
          Start WhatsApp Chat &rarr;
        </a>
      </div>

      {/* Payment methods */}
      <div className="max-w-3xl mx-auto px-4 mt-14">
        <div className="text-center mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-300 font-sans bg-white/10 border border-white/20 px-3 py-1 rounded-full inline-block mb-3">Betaalmethoden</span>
          <h3 className="text-2xl font-extrabold font-display text-white">Betaal zoals jij wilt</h3>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* PayPal */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-5 py-3">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <path d="M7 5h7a5 5 0 0 1 0 10H9l-1 5H5L7 5z" fill="white" fillOpacity="0.9"/>
              <path d="M10 10h6a3 3 0 0 1 0 6h-4l-.5 3H9l1-9z" fill="white" fillOpacity="0.5"/>
            </svg>
            <span className="text-sm font-extrabold text-white">PayPal</span>
          </div>

          {/* Visa */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-5 py-3">
            <svg viewBox="0 0 32 12" className="h-4 w-auto">
              <text x="0" y="10" fontSize="12" fontWeight="900" fill="white" fontFamily="Arial" letterSpacing="1.5">VISA</text>
            </svg>
          </div>

          {/* Mastercard */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-5 py-3">
            <svg viewBox="0 0 34 22" className="h-5 w-auto">
              <circle cx="11" cy="11" r="10" fill="white" fillOpacity="0.9"/>
              <circle cx="23" cy="11" r="10" fill="white" fillOpacity="0.5"/>
            </svg>
            <span className="text-sm font-extrabold text-white">Mastercard</span>
          </div>

          {/* iDEAL */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-5 py-3">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
              <circle cx="7" cy="6" r="2" fill="white"/>
              <rect x="6" y="10" width="3" height="10" rx="1" fill="white"/>
              <rect x="11" y="6" width="8" height="2" rx="1" fill="white"/>
              <rect x="11" y="10" width="5" height="2" rx="1" fill="white"/>
              <rect x="11" y="14" width="8" height="2" rx="1" fill="white"/>
            </svg>
            <span className="text-sm font-extrabold text-white">iDEAL</span>
          </div>

          {/* Bankoverschrijving */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-5 py-3">
            <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="white" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3L2 8h20L12 3z"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 8v9M9 8v9M15 8v9M19 8v9"/>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2 17h20v3H2z"/>
            </svg>
            <span className="text-sm font-extrabold text-white">Bankoverschrijving</span>
          </div>

          {/* Klarna */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-5 py-3">
            <svg viewBox="0 0 24 24" className="w-5 h-5">
              <rect width="24" height="24" rx="5" fill="white" fillOpacity="0.15"/>
              <text x="5" y="18" fontSize="16" fontWeight="900" fill="white" fontFamily="Arial">K</text>
            </svg>
            <span className="text-sm font-extrabold text-white">Klarna</span>
          </div>
        </div>
      </div>
    </section>
  );
}
