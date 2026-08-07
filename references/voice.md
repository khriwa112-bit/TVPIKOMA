# Voice — tvpikoma blog

Modelled on: https://www.odido.nl/blog/ (adapted from the pandoratv/IPTVTotaal blog workflow for the tvpikoma brand)

---

## The core idea

Write like a helpful friend who happens to know a lot about tech. Not a salesperson. Not a support ticket. A friend who explains things simply, gets to the point, and doesn't waste your time.

---

## Sentence rhythm

Short sentences. Then another short one. Sometimes a slightly longer sentence that explains the why or the how. Then short again.

Never write walls of text. Two or three sentences per paragraph is the ceiling. One is fine.

**Do this:**
> tvpikoma werkt op elk apparaat. Je hoeft niks te weten over M3U-links of Xtream Codes. Wij leggen het stap voor stap uit.

**Not this:**
> tvpikoma is een veelzijdige dienst die op vrijwel alle moderne apparaten werkt en waarbij je, nadat je de installatie hebt voltooid, direct toegang krijgt tot het volledige aanbod van meer dan 80.000 zenders.

---

## Tone markers

- Always use **je** and **jij** — never u, nooit formeel
- Speak directly to the reader: "Je hoeft niet...", "Zo heb je...", "Dat kan je gewoon..."
- Never pushy. Never desperate. Calm and confident.
- End sections with a short closer: "Zo simpel is het.", "Klaar.", "Geen gedoe."
- Use a period after headings when they're phrased as a sentence or how-to: "Zo installeer je de app."

---

## What to avoid

- No hollow superlatives: ~~"de meest geweldige IPTV-aanbieder van Nederland"~~
- No jargon without explanation
- No long intros that don't say anything
- No hard sells — the helpful tone IS the conversion
- No exclamation marks everywhere — one max per article, if at all
- Don't fabricate numbers or claims about competitors — only use facts we can stand behind

---

## Closers

End articles with a light nudge, not a hard push:
> Heb je vragen? Stuur ons een berichtje via WhatsApp. We helpen je binnen een paar minuten verder.

Not:
> ~~Bestel nu je abonnement en profiteer van onze geweldige aanbiedingen!!!~~

---

## Product facts (tvpikoma — verified in this repo, use these exact numbers)

- 80.000+ kanalen (Premium VIP+) — Basis pakket heeft 50.000+ kanalen
- 80.000+ films & series (VOD)
- Vanaf €5,20/maand (12+3 maanden actie: 12 maanden kopen, 3 gratis)
- 99,9% uptime
- 24/7 WhatsApp support
- Installatie meestal binnen 5 minuten geregeld
- Werkt op Smart TV, Fire TV Stick, Android TV, Apple TV, telefoon, tablet, Chromecast en PC
- Geen bevestigd "geld-terug-garantie" — noem dit dus niet, in tegenstelling tot de pandoratv/IPTVTotaal voice guide

Do not invent a money-back guarantee, a specific channel count, or a competitor stat that isn't sourced from this repo or from content the user explicitly provided.

## Where posts live in code

Blog posts are defined as an inline array in `src/components/Blog.tsx` (`BLOG_POSTS`). Each post has a `slug`, and routes are `/blog` (list) and `/blog/:slug` (detail). No CMS, no markdown files, no cover images by default (Pexels workflow skipped for this site per user instruction — revisit if a Pexels key is added later).
