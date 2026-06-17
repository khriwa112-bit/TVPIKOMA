import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Shield } from "lucide-react";

interface HeaderProps {
  onScrollTo: (selector: string) => void;
  onOpenReseller: () => void;
}

export default function Header({ onScrollTo, onOpenReseller }: HeaderProps) {
  const [showPromo, setShowPromo] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const hero = document.getElementById("hero-section");
      if (hero) {
        setPastHero(window.scrollY > hero.offsetHeight - 10);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <AnimatePresence>
        {showPromo && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}
            className="relative bg-amber-400 text-green-900 py-3 px-4 text-center z-50 flex items-center justify-center gap-3 overflow-hidden">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 2.2, repeat: Infinity, repeatDelay: 2.5, ease: "easeInOut" }}
            />
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-800 opacity-60" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-900" />
            </span>
            <span className="relative font-extrabold tracking-widest uppercase text-sm sm:text-base font-display">
              🎁 3 Maanden Gratis Vandaag!
            </span>
            <span className="relative hidden sm:inline-block bg-green-900 text-amber-400 text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-widest">
              Beperkte tijd
            </span>
            <button onClick={() => setShowPromo(false)} className="absolute right-4 p-1 text-green-900/50 hover:text-green-900"><X className="w-3.5 h-3.5" /></button>
          </motion.div>
        )}
      </AnimatePresence>

      <header
        className={`sticky top-0 z-40 border-b shadow-sm transition-colors duration-300 ${
          pastHero
            ? "bg-green-900 border-green-700"
            : "bg-white border-green-100"
        }`}
        id="main-app-header"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-stretch h-14 relative">

          {/* Name — centered on mobile, left on desktop */}
          <div onClick={() => onScrollTo("#hero-section")}
            className="absolute left-1/2 -translate-x-1/2 h-14 flex items-center cursor-pointer md:relative md:left-auto md:translate-x-0 md:pr-6 md:mr-6">
            <span className={`text-2xl font-extrabold font-display tracking-tight transition-colors duration-300 ${pastHero ? "text-white" : "text-green-900"}`}>
              tvpikoma
            </span>
          </div>

          {/* Nav */}
          <nav className={`hidden md:flex items-center gap-1 flex-1 text-sm font-semibold transition-colors duration-300 ${pastHero ? "text-green-200" : "text-green-700"}`}>
            {[["Kanalen","#channels-section"],["Voordelen","#advantages-section"],["Prijzen","#pricing-section"],["FAQ","#faq-section"]].map(([label, id]) => (
              <button key={id} onClick={() => onScrollTo(id)}
                className={`relative px-3 py-1 transition-colors cursor-pointer group ${pastHero ? "hover:text-white" : "hover:text-green-900"}`}>
                {label}
                <span className={`absolute bottom-0 left-3 right-3 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full ${pastHero ? "bg-amber-400" : "bg-green-600"}`} />
              </button>
            ))}
            <button onClick={onOpenReseller}
              className={`relative px-3 py-1 transition-colors cursor-pointer flex items-center gap-1 group ${pastHero ? "hover:text-white" : "hover:text-green-900"}`}>
              <Shield className="w-3.5 h-3.5" /> Reseller
              <span className={`absolute bottom-0 left-3 right-3 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left rounded-full ${pastHero ? "bg-amber-400" : "bg-green-600"}`} />
            </button>
          </nav>

          {/* Right actions */}
          <div className="hidden md:flex items-center gap-3 pl-6">
            <button onClick={() => onScrollTo("#pricing-section")}
              className="px-5 py-2 rounded-lg text-green-900 bg-amber-400 hover:bg-amber-500 font-bold text-xs tracking-wide transition-all hover:scale-[1.02] cursor-pointer shadow-sm">
              Bekijk prijzen
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden flex items-center gap-2 ml-auto">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 rounded-lg transition-colors ${pastHero ? "bg-green-800 text-white hover:bg-green-700" : "bg-green-50 text-green-700 hover:bg-green-100"}`}>
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
              className={`md:hidden border-t px-4 py-6 flex flex-col gap-4 text-center shadow-lg transition-colors duration-300 ${pastHero ? "bg-green-900 border-green-700" : "bg-white border-green-100"}`}>
              {[["Kanalen","#channels-section"],["Voordelen","#advantages-section"],["Prijzen","#pricing-section"],["FAQ","#faq-section"]].map(([label, id]) => (
                <button key={id} onClick={() => { setMobileMenuOpen(false); onScrollTo(id); }}
                  className={`font-semibold py-2 border-b transition-colors ${pastHero ? "text-green-200 hover:text-white border-green-700" : "text-green-700 hover:text-green-900 border-green-50"}`}>
                  {label}
                </button>
              ))}
              <button onClick={() => { setMobileMenuOpen(false); onOpenReseller(); }}
                className={`font-semibold py-2 border-b flex items-center justify-center gap-1.5 transition-colors ${pastHero ? "text-green-200 hover:text-white border-green-700" : "text-green-700 border-green-50"}`}>
                <Shield className="w-4 h-4" /> Wordt Reseller
              </button>
              <button onClick={() => { setMobileMenuOpen(false); onScrollTo("#pricing-section"); }}
                className="w-full mt-2 py-3 rounded-lg bg-amber-400 text-green-900 font-bold">
                Bekijk Prijzen
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
