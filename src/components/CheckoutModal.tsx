import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X } from "lucide-react";
import { buildWaMeLink } from "../../contexts/WhatsAppContext";

export interface CheckoutOrderLine {
  label: string;
  value: string;
}

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  whatsappNumber: string;
  title: string;
  orderLines: CheckoutOrderLine[];
  total: string;
  baseMessage: string;
  showDeviceField?: boolean;
}

const DEVICE_OPTIONS = [
  "Smart TV (IPTV Smarters / Flix)",
  "Amazon Firestick (TiviMate)",
  "Android Box / Nvidia Shield",
  "Apple TV / iPhone",
  "PC / Mac (VLC)",
];

export default function CheckoutModal({
  isOpen,
  onClose,
  whatsappNumber,
  title,
  orderLines,
  total,
  baseMessage,
  showDeviceField = true,
}: CheckoutModalProps) {
  const [device, setDevice] = useState(DEVICE_OPTIONS[0]);
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");

  const resetAndClose = () => {
    setContact("");
    setError("");
    setDevice(DEVICE_OPTIONS[0]);
    onClose();
  };

  const handleConfirm = () => {
    const trimmed = contact.trim();
    const looksLikeEmail = trimmed.includes("@") && trimmed.includes(".");
    const digitsOnly = trimmed.replace(/[\s()+-]/g, "");
    const looksLikePhone = digitsOnly.length >= 8 && /^\d+$/.test(digitsOnly);
    if (!looksLikeEmail && !looksLikePhone) {
      setError("Vul een geldig e-mailadres of telefoonnummer in.");
      return;
    }

    const lines = [baseMessage];
    if (showDeviceField) lines.push(`Apparaat: ${device}`);
    lines.push(`E-mail/Telefoon: ${trimmed}`);

    window.open(buildWaMeLink(whatsappNumber, lines.join("\n")), "_blank", "noopener,noreferrer");
    resetAndClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-green-950/70 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-md bg-white border border-green-200 rounded-2xl shadow-2xl p-6 sm:p-8 text-green-900 max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={resetAndClose}
              aria-label="Sluiten"
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg bg-green-50 text-green-600 hover:text-green-900 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-xs uppercase font-sans text-green-600 font-bold tracking-widest bg-green-50 border border-green-200 px-3 py-1 rounded-full mb-4 inline-block">
              Afrekenen
            </span>
            <h3 className="text-xl font-bold text-green-900 mb-5 pr-8">{title}</h3>

            <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex flex-col gap-2 text-xs mb-6">
              {orderLines.map((line, i) => (
                <div key={i} className="flex justify-between items-center gap-3">
                  <span className="text-green-600 shrink-0">{line.label}</span>
                  <span className="font-bold text-green-900 text-right">{line.value}</span>
                </div>
              ))}
              <div className="flex justify-between items-center pt-2 mt-1 border-t border-green-200">
                <span className="text-green-700 font-bold">Totaal</span>
                <span className="font-black text-green-900 text-base">{total}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {showDeviceField && (
                <div>
                  <label className="text-xs font-bold text-green-600 block mb-1.5 font-sans">
                    Welk apparaat ga je gebruiken?
                  </label>
                  <select
                    value={device}
                    onChange={(e) => setDevice(e.target.value)}
                    className="w-full bg-green-50 border border-green-200 rounded-xl py-3 px-4 text-sm text-green-900 focus:outline-none focus:border-green-400"
                  >
                    {DEVICE_OPTIONS.map((d) => (
                      <option key={d}>{d}</option>
                    ))}
                  </select>
                </div>
              )}
              <div>
                <label className="text-xs font-bold text-green-600 block mb-1.5 font-sans">
                  E-mailadres of telefoonnummer
                </label>
                <input
                  type="text"
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                    if (error) setError("");
                  }}
                  placeholder="jouw@email.nl of 06 12345678"
                  className="w-full bg-green-50 border border-green-200 rounded-xl py-3 px-4 text-sm text-green-900 placeholder-green-400 focus:outline-none focus:border-green-400"
                />
                {error && <p className="text-[11px] text-red-600 mt-1.5 font-sans">{error}</p>}
              </div>

              <button
                onClick={handleConfirm}
                className="w-full mt-2 py-3.5 rounded-xl bg-green-600 text-white hover:bg-green-700 font-bold text-sm text-center transition-colors cursor-pointer"
              >
                Bevestig bestelling &rarr;
              </button>
              <p className="text-[10px] text-green-500 text-center font-sans -mt-2">
                Je wordt doorgestuurd naar WhatsApp om je bestelling af te ronden.
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
