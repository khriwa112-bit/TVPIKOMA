import { useState } from "react";
import { FAQ_DATA } from "../data";
import { HelpCircle, ChevronRight, MessageCircle } from "lucide-react";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section className="bg-green-50 text-green-900 py-16 border-b-2 border-green-200" id="faq-section">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-xs uppercase font-sans text-green-600 font-bold tracking-widest bg-green-50 border border-green-200 px-3 py-1 rounded-full mb-3 inline-block">VEELGESTELDE VRAGEN</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-green-900 mb-4">Veelgestelde vragen & antwoorden</h2>
          <p className="text-green-600 text-sm sm:text-base">Staat je vraag er niet tussen? Stel hem via WhatsApp!</p>
        </div>
        <div className="flex flex-col gap-3 text-left">
          {FAQ_DATA.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.id} className={`rounded-2xl border transition-all duration-300 overflow-hidden ${isOpen ? "bg-white border-green-300 shadow-sm" : "bg-white border-green-100 hover:border-green-200"}`}>
                <button onClick={() => setOpenIndex(isOpen ? null : idx)} className="w-full px-5 py-4 flex items-center justify-between gap-4 font-bold text-sm sm:text-base cursor-pointer text-left">
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-4 h-4 shrink-0 ${isOpen ? "text-green-600" : "text-green-400"}`} />
                    <span className={isOpen ? "text-green-900" : "text-green-700"}>{faq.question}</span>
                  </div>
                  <ChevronRight className={`w-4 h-4 text-green-400 shrink-0 transition-transform duration-300 ${isOpen ? "rotate-90 text-green-600" : ""}`} />
                </button>
                {isOpen && <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-green-600 leading-relaxed border-t border-green-100"><p>{faq.answer}</p></div>}
              </div>
            );
          })}
        </div>
        <div className="mt-10 p-5 rounded-2xl bg-green-50 border border-green-200 inline-flex items-center gap-4 flex-col sm:flex-row justify-between w-full">
          <div className="flex items-center gap-3 text-left">
            <MessageCircle className="w-5 h-5 text-green-600 shrink-0" />
            <p className="text-xs text-green-600">Heb je een specifieke vraag? Stuur ons direct een WhatsApp-bericht.</p>
          </div>
          <a href="https://wa.me/447449708976" target="_blank" rel="noreferrer"
            className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-green-900 font-bold text-xs tracking-wide whitespace-nowrap text-center transition-colors">
            Stel via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
