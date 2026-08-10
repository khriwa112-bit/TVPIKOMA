import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Lock, Tv } from "lucide-react";
import { useWhatsAppNumber, buildWaMeLink } from "../../contexts/WhatsAppContext";
import { applyPageMeta, DEFAULT_PAGE_META } from "../lib/pageMeta";

export interface CheckoutOrderLine {
  label: string;
  value: string;
}

export interface CheckoutState {
  title: string;
  orderLines: CheckoutOrderLine[];
  total: string;
  baseMessage: string;
  showDeviceField?: boolean;
}

export default function Checkout() {
  const whatsappNumber = useWhatsAppNumber();
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state as CheckoutState | null;

  const [device, setDevice] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");
  const [summaryOpen, setSummaryOpen] = useState(false);

  useEffect(() => {
    if (!order) navigate("/", { replace: true });
  }, [order, navigate]);

  useEffect(() => {
    applyPageMeta({
      title: "Afrekenen | tvpikoma",
      description: "Rond je bestelling af en ontvang direct hulp via WhatsApp.",
      canonical: "https://tivipikoma.com/afrekenen",
      ogTitle: "Afrekenen | tvpikoma",
      ogDescription: "Rond je bestelling af en ontvang direct hulp via WhatsApp.",
    });
    return () => applyPageMeta(DEFAULT_PAGE_META);
  }, []);

  if (!order) return null;

  const showDeviceField = order.showDeviceField !== false;

  const handleConfirm = () => {
    const trimmedDevice = device.trim();
    const trimmedContact = contact.trim();

    if (showDeviceField && !trimmedDevice) {
      setError("Vul in welk apparaat je gaat gebruiken.");
      return;
    }

    const looksLikeEmail = trimmedContact.includes("@") && trimmedContact.includes(".");
    const digitsOnly = trimmedContact.replace(/[\s()+-]/g, "");
    const looksLikePhone = digitsOnly.length >= 8 && /^\d+$/.test(digitsOnly);
    if (!looksLikeEmail && !looksLikePhone) {
      setError("Vul een geldig e-mailadres of telefoonnummer in.");
      return;
    }

    const lines = [order.baseMessage];
    if (showDeviceField) lines.push(`Apparaat: ${trimmedDevice}`);
    lines.push(`E-mail/Telefoon: ${trimmedContact}`);

    window.location.href = buildWaMeLink(whatsappNumber, lines.join("\n"));
  };

  const OrderSummary = (
    <div className="flex flex-col gap-6">
      <div className="flex items-start gap-4">
        <div className="relative shrink-0">
          <div className="w-16 h-16 rounded-lg bg-green-900 flex items-center justify-center">
            <Tv className="w-7 h-7 text-amber-400" />
          </div>
          <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-gray-500 text-white text-[10px] font-bold flex items-center justify-center">1</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-gray-900 leading-snug">{order.title.replace(/^Bestelling: /, "").replace(/^Reseller aanmelding: /, "")}</p>
          {order.orderLines.map((line, i) => (
            <p key={i} className="text-xs text-gray-500">{line.label}: {line.value}</p>
          ))}
        </div>
        <span className="text-sm font-semibold text-gray-900 shrink-0">{order.total}</span>
      </div>

      <div className="flex flex-col gap-2.5 pt-4 border-t border-gray-200 text-sm">
        <div className="flex justify-between text-gray-600">
          <span>Subtotaal</span>
          <span>{order.total}</span>
        </div>
        <div className="flex justify-between text-gray-600">
          <span>Levering</span>
          <span>Direct via WhatsApp</span>
        </div>
      </div>

      <div className="flex justify-between items-center pt-4 border-t border-gray-200">
        <span className="text-base font-bold text-gray-900">Totaal</span>
        <span className="text-xl font-black text-gray-900">{order.total}</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="/" className="text-xl font-extrabold text-green-900 tracking-tight">tvpikoma</a>
          <div className="flex items-center gap-1.5 text-gray-500 text-xs font-semibold">
            <Lock className="w-3.5 h-3.5" /> Beveiligde checkout
          </div>
        </div>
      </header>

      {/* Mobile order summary accordion */}
      <button
        onClick={() => setSummaryOpen((v) => !v)}
        className="lg:hidden flex items-center justify-between gap-2 px-4 sm:px-6 py-4 bg-gray-50 border-b border-gray-200 cursor-pointer"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-gray-900">
          {summaryOpen ? "Bestelling verbergen" : "Bestelling weergeven"}
          {summaryOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </span>
        <span className="text-base font-bold text-gray-900">{order.total}</span>
      </button>
      {summaryOpen && (
        <div className="lg:hidden px-4 sm:px-6 py-6 bg-gray-50 border-b border-gray-200">
          {OrderSummary}
        </div>
      )}

      <main className="flex-1 grid lg:grid-cols-2">
        {/* Left: form */}
        <div className="px-4 sm:px-6 lg:px-0 py-10 lg:py-14 flex justify-end">
          <div className="w-full max-w-md lg:pr-14">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">Afrekenen</h1>

            <div className="flex flex-col gap-5">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-sm font-semibold text-gray-900">Contact</label>
                </div>
                <label className="text-xs text-gray-500 block mb-1.5">E-mailadres of telefoonnummer</label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="jouw@email.nl of 06 12345678"
                  className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                />
              </div>

              {showDeviceField && (
                <div>
                  <label className="text-sm font-semibold text-gray-900 block mb-1.5">Apparaat</label>
                  <label className="text-xs text-gray-500 block mb-1.5">Op welk apparaat ga je kijken?</label>
                  <input
                    type="text"
                    value={device}
                    onChange={(e) => {
                      setDevice(e.target.value);
                      if (error) setError("");
                    }}
                    placeholder="Typ zelf je apparaat, bijv. Firestick, Smart TV, Apple TV, PC..."
                    className="w-full bg-white border border-gray-300 rounded-lg py-3 px-4 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                  />
                </div>
              )}

              {error && <p className="text-xs text-red-600">{error}</p>}

              <button
                onClick={handleConfirm}
                className="w-full mt-2 py-3.5 rounded-lg bg-green-600 text-white hover:bg-green-700 font-bold text-sm text-center transition-colors cursor-pointer"
              >
                Bevestig bestelling
              </button>
              <p className="text-xs text-gray-400 text-center -mt-2">
                Je wordt doorgestuurd naar WhatsApp om je bestelling af te ronden.
              </p>

              <button
                onClick={() => navigate(-1)}
                className="text-xs text-gray-500 hover:text-gray-800 flex items-center gap-1 mt-2 cursor-pointer w-fit"
              >
                &larr; Terug
              </button>
            </div>
          </div>
        </div>

        {/* Right: order summary (desktop) */}
        <div className="hidden lg:block bg-gray-50 border-l border-gray-200 px-6 py-14">
          <div className="max-w-md pl-8">{OrderSummary}</div>
        </div>
      </main>
    </div>
  );
}
