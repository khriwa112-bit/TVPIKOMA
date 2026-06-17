export default function ChannelSearch() {
  const channelLogos = [
    { name: "F1 TV",       logo: "/assets/channels/f1.png",          invert: false },
    { name: "ESPN",        logo: "/assets/channels/espn.png",         invert: false },
    { name: "Viaplay",     logo: "/assets/channels/viaplay.png",      invert: false },
    { name: "Ziggo Sport", logo: "/assets/channels/ziggo-sport.png",  invert: false },
    { name: "Eurosport",   logo: "/assets/channels/eurosport.png",    invert: false },
    { name: "Sky Sport",   logo: "/assets/channels/sky-sports.png",   invert: false },
    { name: "DAZN",        logo: "/assets/channels/dazn.png",         invert: false },
  ];

  const doubled = [...channelLogos, ...channelLogos];

  const bigNames = ["CHAMPIONS LEAGUE","FORMULE 1","NPO","RTL","SBS","NETFLIX","ZIGGO SPORT","ESPN","VIAPLAY","EUROSPORT","HBO MAX","DISNEY+","VIDEOLAND","SKY SPORTS","DAZN"];
  const doubledNames = [...bigNames, ...bigNames];

  return (
    <section className="relative bg-green-50 text-green-900 py-14 border-b border-green-200 overflow-hidden" id="channels-section">

      {/* Big scrolling names */}
      <div className="w-full overflow-hidden relative mb-12">
        <div className="animate-scroll whitespace-nowrap flex gap-16 py-3">
          {doubledNames.map((name, i) => (
            <span key={i} className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display tracking-tight text-green-700 select-none flex-shrink-0 opacity-30">
              {name}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <span className="text-[10px] uppercase font-sans text-green-600 font-bold tracking-widest block mb-1">LIVE TV</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display tracking-tight text-green-900">Al je favoriete zenders</h2>
        </div>

        {/* Auto-scrolling logos */}
        <div className="w-full overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-green-50 to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-green-50 to-transparent z-10 pointer-events-none" />
          <div className="animate-scroll-slow">
            <div className="flex gap-5 px-2">
              {doubled.map((ch, i) => (
                <div key={i} className="bg-green-50 border border-green-200 rounded-2xl flex items-center justify-center w-[140px] h-[90px] sm:w-[160px] sm:h-[100px] hover:bg-green-100 hover:scale-105 transition-all duration-200 cursor-pointer flex-shrink-0">
                  <img src={ch.logo} alt={ch.name} className="w-[75%] h-[75%] object-contain" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
