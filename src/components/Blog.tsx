import { useEffect } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { MessageCircle, ArrowLeft, ExternalLink } from "lucide-react";
import { useWhatsAppNumber, trackWhatsAppConversion } from "../../contexts/WhatsAppContext";
import { applyPageMeta, DEFAULT_PAGE_META, setBreadcrumbSchema } from "../lib/pageMeta";

type BlogBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[] }
  | { type: "quote"; text: string; source?: string }
  | { type: "link"; href: string; label: string };

interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  date: string;
  isoDate: string;
  readTime: string;
  content: BlogBlock[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "tvpikoma-vs-swivtv",
    title: "TVpikoma vs SwivTV: welke Nordic IPTV past bij jou? (2026)",
    metaTitle: "TVpikoma vs SwivTV — Beste IPTV Nordic vergelijking 2026 | tvpikoma",
    metaDescription:
      "TVpikoma of SwivTV? We zetten de verschillen op een rij: snelheid en live sport versus een grote VOD-bibliotheek. Inclusief een echte gebruikersvergelijking van Reddit.",
    excerpt:
      "De grote providers verhogen hun prijzen. Steeds meer mensen zoeken een stabiel alternatief voor Nordic IPTV. We zetten TVpikoma en SwivTV naast elkaar.",
    category: "Vergelijking",
    date: "7 augustus 2026",
    isoDate: "2026-08-07",
    readTime: "4 min",
    content: [
      {
        type: "p",
        text: "De grote tv-providers verhogen hun prijzen elk jaar opnieuw. Geen wonder dat steeds meer mensen op zoek zijn naar een stabiel alternatief voor Nordic IPTV. Twee namen komen daarbij vaak terug: TVpikoma en SwivTV.",
      },
      {
        type: "p",
        text: "Beide diensten worden door ons team gebouwd, dus we kunnen je precies vertellen waar elk van de twee in uitblinkt. Geen marketingpraatjes — gewoon een eerlijke vergelijking.",
      },
      {
        type: "h2",
        text: "Wat een Reddit-gebruiker over de twee zei.",
      },
      {
        type: "quote",
        text: "Als je snelheid en sport prioriteert, is TVPIKOMA moeilijk te verslaan. (...) Als je meer wilt dan alleen sport, is SWIVTV een fantastisch alternatief. Ze hebben de grootste bibliotheek voor films en series.",
        source: "r/webdesign — \"Beste IPTV Nordic: TVPIKOMA vs. SWIVTV\"",
      },
      {
        type: "p",
        text: "Die samenvatting klopt eigenlijk goed met hoe we de twee diensten zelf hebben opgebouwd. Hieronder leggen we uit waarom.",
      },
      {
        type: "h2",
        text: "TVpikoma: gebouwd voor snelheid en live sport.",
      },
      {
        type: "p",
        text: "TVpikoma draait op stabiele servers met 99,9% uptime. Dat merk je vooral tijdens live wedstrijden — geen buffering op het moment dat het spannend wordt.",
      },
      {
        type: "list",
        items: [
          "80.000+ live kanalen, inclusief alle grote Nederlandse, Belgische en internationale sportzenders",
          "4K/UHD beeldkwaliteit die ook daadwerkelijk stabiel blijft",
          "Installatie meestal binnen 5 minuten geregeld",
          "24/7 WhatsApp support als je vastloopt",
        ],
      },
      {
        type: "p",
        text: "Kies TVpikoma als je vooral live tv en sport kijkt en buffering haat.",
      },
      {
        type: "h2",
        text: "SwivTV: gebouwd voor een breed aanbod aan films en series.",
      },
      {
        type: "p",
        text: "SwivTV is de zusterdienst van TVpikoma, met net een ander accent. Waar TVpikoma vooral scoort op snelheid, richt SwivTV zich op een zo compleet mogelijke VOD-bibliotheek.",
      },
      {
        type: "p",
        text: "Voor gezinnen die naast live tv ook veel films en series kijken, is dat precies waar het om draait. Eén abonnement in plaats van losse streamingdiensten naast elkaar.",
      },
      {
        type: "h2",
        text: "Welke past bij jou?",
      },
      {
        type: "p",
        text: "Wil je vooral live sport kijken zonder gedoe? Ga voor TVpikoma. Zoek je een breed aanbod aan films en series voor het hele gezin? Dan is SwivTV de logische keuze.",
      },
      {
        type: "p",
        text: "Twijfel je nog? Stuur ons een berichtje via WhatsApp. We denken graag met je mee, zonder verkooppraatje.",
      },
      {
        type: "link",
        href: "https://www.reddit.com/r/webdesign/comments/1qwj45f/b%C3%A4sta_iptv_nordic_tvpikoma_vs_swivtv_mitt_test_av/?tl=nl",
        label: "Lees de volledige vergelijking op Reddit",
      },
    ],
  },
  {
    slug: "tvpikoma-kosten",
    title: "Wat kost TVpikoma? Alle abonnementen op een rij (2026)",
    metaTitle: "Wat kost TVpikoma? Prijzen en pakketten 2026 | tvpikoma",
    metaDescription:
      "Benieuwd wat TVpikoma kost? Overzicht van alle abonnementen: vanaf €5,20 per maand, 80.000+ kanalen, 99,9% uptime en 24/7 WhatsApp support.",
    excerpt:
      "Wat betaal je nu eigenlijk voor TVpikoma? We zetten alle abonnementsvormen naast elkaar, van 3 maanden tot de 12+3 actie.",
    category: "Advies",
    date: "7 augustus 2026",
    isoDate: "2026-08-07",
    readTime: "3 min",
    content: [
      {
        type: "p",
        text: "Een van de meest gestelde vragen die we via WhatsApp krijgen: wat kost TVpikoma nu eigenlijk? Hieronder een helder overzicht, zonder kleine lettertjes.",
      },
      {
        type: "h2",
        text: "De prijzen per abonnementsvorm.",
      },
      {
        type: "list",
        items: [
          "3 maanden — €11,99 per maand",
          "6 maanden — €9,99 per maand",
          "12 maanden — €7,50 per maand",
          "12+3 maanden (actie) — €5,20 per maand, waarbij je 3 maanden gratis krijgt bovenop de 12",
        ],
      },
      {
        type: "p",
        text: "Hoe langer je vastlegt, hoe lager de maandprijs. De 12+3 maanden actie is op dit moment het voordeligst: je betaalt voor 12 maanden en krijgt er 3 gratis bij.",
      },
      {
        type: "h2",
        text: "Wat krijg je daarvoor.",
      },
      {
        type: "p",
        text: "Elk pakket geeft je toegang tot hetzelfde brede aanbod. Het verschil zit 'm in de duur en het aantal schermen dat je tegelijk kan gebruiken.",
      },
      {
        type: "list",
        items: [
          "80.000+ live kanalen in Nederland, België en internationaal",
          "80.000+ films en series (VOD) in 4K/UHD",
          "Stabiele servers met 99,9% uptime",
          "24/7 WhatsApp support",
          "Werkt op Smart TV, Fire TV Stick, Android TV, Apple TV, telefoon, tablet en pc",
        ],
      },
      {
        type: "h2",
        text: "Is dat duur of goedkoop?",
      },
      {
        type: "p",
        text: "Vergelijk het met wat je nu kwijt bent aan losse streamingdiensten en een kabelabonnement bij elkaar. Vanaf €5,20 per maand krijg je alles in één pakket, inclusief live sport.",
      },
      {
        type: "p",
        text: "Benieuwd wat het voor jouw situatie kost, met hoeveel schermen je nodig hebt? Stuur ons een berichtje via WhatsApp. We rekenen het gratis voor je uit.",
      },
    ],
  },
];

function openBlogWhatsApp(whatsappNumber: string, postTitle: string) {
  const msg = `[tvpikoma] Hoi, ik las het blogartikel "${postTitle}" en heb nog een vraag.`;
  trackWhatsAppConversion();
  window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
}

function BlogShellHeader({ whatsappNumber }: { whatsappNumber: string }) {
  return (
    <>
      <div className="bg-green-900 text-white py-3 px-4 text-center">
        <span className="text-sm font-semibold">📺 tvpikoma — Premium IPTV voor Nederland &amp; België</span>
      </div>
      <header className="bg-white border-b border-green-100 sticky top-0 z-40 shadow-sm">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link to="/" className="text-2xl font-extrabold text-green-900 tracking-tight">tvpikoma</Link>
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank" rel="noopener noreferrer"
            onClick={trackWhatsAppConversion}
            className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Bestel via WhatsApp
          </a>
        </div>
      </header>
    </>
  );
}

export function BlogList() {
  useEffect(() => {
    applyPageMeta({
      title: "Blog — IPTV nieuws, vergelijkingen & advies | tvpikoma",
      description: "Alles over IPTV: vergelijkingen, prijzen en advies. Geschreven door het tvpikoma team.",
      canonical: "https://tivipikoma.com/blog",
      ogTitle: "tvpikoma Blog — IPTV nieuws, vergelijkingen & advies",
      ogDescription: "Vergelijkingen, prijzen en tips over IPTV, geschreven door het tvpikoma team.",
    });
    setBreadcrumbSchema([{ name: "Blog", path: "/blog" }]);
    return () => {
      applyPageMeta(DEFAULT_PAGE_META);
      setBreadcrumbSchema(null);
    };
  }, []);

  const whatsappNumber = useWhatsAppNumber();

  return (
    <div className="min-h-screen bg-white font-sans">
      <BlogShellHeader whatsappNumber={whatsappNumber} />

      <section className="bg-gradient-to-b from-green-900 to-green-700 text-white py-16 px-4 text-center">
        <span className="text-xs uppercase font-bold tracking-widest bg-white/10 border border-white/20 px-3 py-1 rounded-full mb-5 inline-block text-emerald-300">
          TVPIKOMA BLOG
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">IPTV nieuws &amp; advies</h1>
        <p className="text-green-200 text-lg max-w-xl mx-auto">Vergelijkingen, prijzen en tips — geschreven door ons eigen team.</p>
      </section>

      <section className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid sm:grid-cols-2 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group bg-white border border-green-100 rounded-2xl p-6 shadow-sm hover:shadow-md hover:border-green-300 transition-all flex flex-col"
            >
              <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-2">{post.category}</span>
              <h2 className="text-lg font-extrabold text-green-900 mb-2 group-hover:text-green-700 transition-colors">{post.title}</h2>
              <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">{post.excerpt}</p>
              <div className="flex items-center justify-between text-xs text-gray-400 font-medium">
                <span>{post.date}</span>
                <span>{post.readTime} leestijd</span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-green-50 border border-green-100 rounded-2xl p-6">
          <p className="text-sm text-green-800 font-medium text-center sm:text-left">Weten wat een tvpikoma abonnement precies kost?</p>
          <Link
            to="/abonnementen"
            className="shrink-0 px-5 py-2.5 rounded-xl bg-green-700 hover:bg-green-800 text-white font-bold text-xs tracking-wide whitespace-nowrap text-center transition-colors"
          >
            Bekijk onze abonnementen
          </Link>
        </div>
      </section>
    </div>
  );
}

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);
  const whatsappNumber = useWhatsAppNumber();

  useEffect(() => {
    if (!post) return;
    const canonical = `https://tivipikoma.com/blog/${post.slug}`;
    applyPageMeta({
      title: post.metaTitle,
      description: post.metaDescription,
      canonical,
      ogTitle: post.title,
      ogDescription: post.metaDescription,
    });

    const schema = document.createElement("script");
    schema.type = "application/ld+json";
    schema.id = "blogposting-schema";
    schema.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: post.title,
      description: post.metaDescription,
      datePublished: post.isoDate,
      dateModified: post.isoDate,
      url: canonical,
      inLanguage: "nl-NL",
      author: { "@type": "Organization", name: "tvpikoma" },
      publisher: { "@type": "Organization", name: "tvpikoma", logo: { "@type": "ImageObject", url: "https://tivipikoma.com/favicon-1200.png" } },
      image: "https://tivipikoma.com/favicon-1200.png",
      mainEntityOfPage: { "@type": "WebPage", "@id": canonical },
    });
    document.head.appendChild(schema);

    setBreadcrumbSchema([
      { name: "Blog", path: "/blog" },
      { name: post.title, path: `/blog/${post.slug}` },
    ]);

    return () => {
      applyPageMeta(DEFAULT_PAGE_META);
      setBreadcrumbSchema(null);
      document.getElementById("blogposting-schema")?.remove();
    };
  }, [post]);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <div className="min-h-screen bg-white font-sans">
      <BlogShellHeader whatsappNumber={whatsappNumber} />

      <article className="max-w-2xl mx-auto px-4 py-12">
        <Link to="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:text-green-900 mb-6">
          <ArrowLeft className="w-4 h-4" /> Terug naar blog
        </Link>

        <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-3 block">{post.category}</span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-green-900 tracking-tight mb-4">{post.title}</h1>
        <div className="flex items-center gap-3 text-xs text-gray-400 font-medium mb-10">
          <span>{post.date}</span>
          <span>·</span>
          <span>{post.readTime} leestijd</span>
        </div>

        <div className="flex flex-col gap-5">
          {post.content.map((block, i) => {
            if (block.type === "h2") {
              return <h2 key={i} className="text-xl font-extrabold text-green-900 mt-4">{block.text}</h2>;
            }
            if (block.type === "p") {
              return <p key={i} className="text-gray-700 leading-relaxed">{block.text}</p>;
            }
            if (block.type === "list") {
              return (
                <ul key={i} className="flex flex-col gap-2">
                  {block.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-700 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }
            if (block.type === "quote") {
              return (
                <blockquote key={i} className="border-l-4 border-emerald-400 bg-green-50 rounded-r-xl p-4 italic text-gray-700">
                  "{block.text}"
                  {block.source && <footer className="not-italic text-xs text-gray-500 mt-2 font-medium">— {block.source}</footer>}
                </blockquote>
              );
            }
            if (block.type === "link") {
              return (
                <a
                  key={i}
                  href={block.href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-green-700 hover:text-green-900 underline underline-offset-2 w-fit"
                >
                  {block.label} <ExternalLink className="w-3.5 h-3.5" />
                </a>
              );
            }
            return null;
          })}
        </div>

        <div className="mt-12 pt-8 border-t border-green-100 flex flex-col sm:flex-row gap-3">
          <button
            onClick={() => openBlogWhatsApp(whatsappNumber, post.title)}
            className="flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold px-5 py-3 rounded-xl transition-colors"
          >
            <MessageCircle className="w-4 h-4" /> Stel je vraag via WhatsApp
          </button>
          <Link
            to="/abonnementen"
            className="flex items-center justify-center gap-2 bg-green-50 hover:bg-green-100 border border-green-200 text-green-800 text-sm font-bold px-5 py-3 rounded-xl transition-colors"
          >
            Bekijk onze abonnementen
          </Link>
        </div>
      </article>
    </div>
  );
}
