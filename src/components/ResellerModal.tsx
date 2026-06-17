import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Check, Send, TrendingUp, Key, Users, Sparkles } from "lucide-react";

interface ResellerModalProps { isOpen: boolean; onClose: () => void; }

export default function ResellerModal({ isOpen, onClose }: ResellerModalProps) {
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [desiredCredits, setDesiredCredits] = useState("50_credits"); const [isSubmitting, setIsSubmitting] = useState(false); const [isSuccess, setIsSuccess] = useState(false);
  const handleSubmit = (e: FormEvent) => { e.preventDefault(); if (!name||!email||!phone){alert("Vul alle velden in!");return;} setIsSubmitting(true); setTimeout(()=>{setIsSubmitting(false);setIsSuccess(true);},2000); };
  const usps = [
    {icon:<TrendingUp className="w-4 h-4 text-green-700"/>,title:"Hoge Winstmarges",desc:"Koop credits vanaf €2,50/maand per lijn en verkoop voor €10-€15+."},
    {icon:<Key className="w-4 h-4 text-green-700"/>,title:"Volledig Beheerpaneel",desc:"Zelf playlists genereren, accounts aanpassen en trials aanmaken."},
    {icon:<Users className="w-4 h-4 text-green-700"/>,title:"100% White Label",desc:"Je verkoopt onder je eigen merknaam. Klanten zien tvpikoma nooit."},
  ];
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-green-950/70 backdrop-blur-md">
          <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0,scale:0.95}}
            className="relative w-full max-w-2xl bg-white border border-green-200 rounded-3xl shadow-2xl p-6 sm:p-8 text-green-900 max-h-[92vh] overflow-y-auto">
            <button onClick={onClose} className="absolute top-4 right-4 px-3 py-1 rounded-lg bg-green-50 text-green-600 hover:text-green-900 text-xs font-bold">Sluiten</button>
            <div className="text-left mb-6">
              <span className="text-[10px] uppercase font-sans text-green-600 font-bold tracking-widest bg-green-50 border border-green-200 px-3 py-1 rounded-full mb-3 inline-block">PARTNER PROGRAMMA</span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-green-900">Start je eigen IPTV Onderneming</h2>
              <p className="text-xs text-green-600 mt-1">Word IPTV reseller van tvpikoma en verdien maandelijks een stabiel passief inkomen.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              <div className="md:col-span-5 flex flex-col gap-4 text-left">
                <h3 className="text-xs font-bold text-green-600 uppercase tracking-widest font-sans border-b border-green-100 pb-2">Waarom tvpikoma Reseller?</h3>
                {usps.map((u,i)=>(
                  <div key={i} className="flex gap-3 text-xs">
                    <div className="p-2 h-fit rounded-lg bg-green-100 border border-green-200 shrink-0 mt-0.5">{u.icon}</div>
                    <div><h4 className="font-bold text-green-900 mb-0.5">{u.title}</h4><p className="text-green-600 leading-relaxed text-[11px]">{u.desc}</p></div>
                  </div>
                ))}
                <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-[10px] text-green-600 mt-2">
                  <span className="font-bold text-green-900">Start vanaf €250</span> — direct omgezet in credits op je dashboard.
                </div>
              </div>
              <div className="md:col-span-7 bg-green-50 border border-green-100 rounded-2xl p-5">
                <AnimatePresence mode="wait">
                  {!isSuccess ? (
                    <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left">
                      <h4 className="text-sm font-bold text-green-900 mb-2 flex items-center gap-1.5 font-sans"><Sparkles className="w-4 h-4"/>Vrijblijvende Aanvraag</h4>
                      {[{label:"Naam:",val:name,set:setName,type:"text",ph:"bijv. Sander de Groot"},{label:"E-mail:",val:email,set:setEmail,type:"email",ph:"sander@gmail.com"},{label:"WhatsApp:",val:phone,set:setPhone,type:"tel",ph:"+31 6 12345678"}].map(f=>(
                        <div key={f.label}>
                          <label className="text-[10px] font-bold text-green-600 uppercase tracking-widest block mb-1 font-sans">{f.label}</label>
                          <input type={f.type} required value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph}
                            className="w-full bg-white border border-green-200 rounded-lg py-2 px-3 text-xs text-green-900 placeholder-green-400 focus:outline-none focus:border-green-400"/>
                        </div>
                      ))}
                      <div>
                        <label className="text-[10px] font-bold text-green-600 uppercase tracking-widest block mb-1 font-sans">Credits:</label>
                        <select value={desiredCredits} onChange={e=>setDesiredCredits(e.target.value)} className="w-full bg-white border border-green-200 rounded-lg py-2 px-3 text-xs text-green-900 focus:outline-none">
                          <option value="test_only">Gratis testpaneel aanvragen</option>
                          <option value="50_credits">Brons (50 credits)</option>
                          <option value="200_credits">Zilver (200 credits)</option>
                          <option value="500_credits">Goud (500 credits)</option>
                        </select>
                      </div>
                      <button type="submit" disabled={isSubmitting}
                        className="w-full mt-3 py-3 rounded-xl bg-amber-400 text-green-900 hover:bg-amber-500 font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 disabled:opacity-50 transition-all cursor-pointer">
                        {isSubmitting?"Versturen...":<><Send className="w-3.5 h-3.5"/><span>Aanvraag versturen</span></>}
                      </button>
                    </form>
                  ):(
                    <motion.div initial={{opacity:0}} animate={{opacity:1}} className="py-10 text-center flex flex-col items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-green-100 border border-green-300 text-green-600 flex items-center justify-center mb-1"><Check className="w-6 h-6 stroke-[3]"/></div>
                      <h4 className="text-base font-bold text-green-900">Aanvraag Ontvangen!</h4>
                      <p className="text-xs text-green-600 max-w-xs mx-auto">Bedankt <strong className="text-green-900">{name}</strong>. We nemen binnen 30 minuten contact op via <strong className="text-green-900">{phone}</strong>.</p>
                      <button onClick={()=>{setIsSuccess(false);setName("");setEmail("");setPhone("");onClose();}}
                        className="mt-4 px-5 py-2 rounded-xl bg-green-50 border border-green-200 text-green-600 text-xs hover:bg-green-100 font-medium transition-colors">Sluiten</button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
