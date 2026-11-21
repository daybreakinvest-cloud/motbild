import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import {
  type ArtikelRow,
  type ArtikelOmdome,
  fetchSwedishArticleBySlug,
  fetchArticleReviews,
  submitArticleReview,
  formatArticleDate,
  parseReferenser,
} from "@/lib/articles";
import { Heart, ArrowLeft, Calendar, User, X, Star } from "lucide-react";

export const Route = createFileRoute("/artiklar/$slug")({
  component: ArtikelDetailPage,
});

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length === 0) return "M";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

function renderFlexibleContent(raw: string) {
  const blocks = raw
    .split(/\r?\n\r?\n+/)
    .map((b) => b.trim())
    .filter(Boolean);

  return blocks.map((block, index) => {
    if (block.startsWith("### ")) {
      return (
        <h3 key={index} className="text-xl sm:text-2xl font-bold text-[#090023] pt-2">
          {block.slice(4).trim()}
        </h3>
      );
    }
    if (block.startsWith("## ")) {
      return (
        <h2 key={index} className="text-3xl sm:text-4xl font-bold text-[#090023] pt-4">
          {block.slice(3).trim()}
        </h2>
      );
    }
    return (
      <p key={index} className="text-base leading-relaxed text-[#090023] whitespace-pre-line">
        {block}
      </p>
    );
  });
}

function ArtikelDetailPage() {
  const { slug } = Route.useParams();
  const [artikel, setArtikel] = useState<ArtikelRow | null>(null);
  const [omdomen, setOmdomen] = useState<ArtikelOmdome[]>([]);
  const [laddar, setLaddar] = useState(true);

  const [valtBetyg, setValtBetyg] = useState<number | null>(null);
  const [omdomeText, setOmdomeText] = useState("");
  const [skickarOmdome, setSkickarOmdome] = useState(false);
  const [omdomeSkickat, setOmdomeSkickat] = useState(false);
  const [visaDonationModal, setVisaDonationModal] = useState(false);

  useEffect(() => {
    let active = true;
    setLaddar(true);
    setValtBetyg(null);
    setOmdomeText("");
    setOmdomeSkickat(false);
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchSwedishArticleBySlug(slug).then(async (data) => {
      if (!active) return;
      setArtikel(data);
      if (data) {
        const reviews = await fetchArticleReviews(data.slug);
        if (active) setOmdomen(reviews);
      } else {
        setOmdomen([]);
      }
      if (active) setLaddar(false);
    });

    return () => {
      active = false;
    };
  }, [slug]);

  async function handleSendReview() {
    if (!artikel) return;
    if (!valtBetyg) {
      alert("Välj ett betyg mellan 1 och 5.");
      return;
    }
    setSkickarOmdome(true);
    const ok = await submitArticleReview({
      artikel_slug: artikel.slug,
      betyg: valtBetyg,
      kommentar: omdomeText,
      sprak: "sv",
    });
    if (ok) {
      setOmdomeSkickat(true);
      const updated = await fetchArticleReviews(artikel.slug);
      setOmdomen(updated);
    } else {
      alert("Något gick fel när omdömet skulle skickas. Försök igen.");
    }
    setSkickarOmdome(false);
  }

  if (laddar) {
    return (
      <SiteLayout>
        <div className="py-24 px-6 max-w-3xl mx-auto font-serif text-base text-[#090023]">
          Hämtar artikel...
        </div>
      </SiteLayout>
    );
  }

  if (!artikel) {
    return (
      <SiteLayout>
        <div className="py-24 px-6 max-w-3xl mx-auto font-serif space-y-6">
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold text-[#090023] leading-tight">
            Artikeln kunde inte hittas
          </h1>
          <p className="text-base text-[#090023] leading-relaxed">
            Den här artikeln finns inte längre eller har ännu inte publicerats.
          </p>
          <Link
            to="/artiklar"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#090023] hover:underline"
          >
            <ArrowLeft className="size-4" /> TILLBAKA TILL ARTIKLAR
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const forfattare = artikel.forfattare ?? "Peter Abramsgård";
  const fotnoter = Array.isArray(artikel.fotnoter) ? artikel.fotnoter : [];
  const referenser = parseReferenser(artikel.referenser);

  const antalBetyg = omdomen.length;
  const snittBetyg =
    antalBetyg > 0
      ? (omdomen.reduce((sum, r) => sum + r.betyg, 0) / antalBetyg)
          .toFixed(1)
          .replace(".", ",")
      : null;
  const synligaKommentarer = omdomen.filter((r) => r.kommentar?.trim());

  return (
    <SiteLayout>
      <div className="py-12 md:py-16 px-6 max-w-3xl mx-auto font-serif">
        {/* BAKÅTPIL */}
        <div className="mb-8">
          <Link
            to="/artiklar"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#090023] hover:underline"
          >
            <ArrowLeft className="size-4" /> TILLBAKA TILL ARTIKLAR
          </Link>
        </div>

        <article className="space-y-8">
          {/* Titel & Byline */}
          <div>
            <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold text-[#090023] leading-tight">
              {artikel.titel}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#090023] mt-4 pt-3 border-t border-black/10">
              <span className="flex items-center gap-1.5">
                <User className="size-3.5" /> Av {forfattare}
              </span>
              {artikel.publicerad_at && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" /> Publicerad: {formatArticleDate(artikel.publicerad_at)}
                </span>
              )}
              {artikel.reviderad_at && (
                <span>Reviderad: {formatArticleDate(artikel.reviderad_at)}</span>
              )}
            </div>
          </div>

          {/* Ingress */}
          {artikel.ingress?.trim() && (
            <div className="text-lg italic text-[#090023] bg-[#f3f0ed] p-6 rounded-2xl border-l-4 border-[#090023] leading-relaxed">
              {artikel.ingress}
            </div>
          )}

          {/* Fasta akademiska avsnitt */}
          {artikel.sammanfattning?.trim() && (
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#090023]">Sammanfattning</h2>
              <p className="text-base leading-relaxed text-[#090023] whitespace-pre-line">
                {artikel.sammanfattning}
              </p>
            </div>
          )}

          {artikel.inledning?.trim() && (
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#090023]">Inledning</h2>
              <p className="text-base leading-relaxed text-[#090023] whitespace-pre-line">
                {artikel.inledning}
              </p>
            </div>
          )}

          {artikel.problemformulering?.trim() && (
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#090023]">Problemformulering</h2>
              <p className="text-base leading-relaxed text-[#090023] whitespace-pre-line">
                {artikel.problemformulering}
              </p>
            </div>
          )}

          {artikel.text_och_kontext?.trim() && (
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#090023]">Text och kontext</h2>
              <p className="text-base leading-relaxed text-[#090023] whitespace-pre-line">
                {artikel.text_och_kontext}
              </p>
            </div>
          )}

          {artikel.exegetisk_analys?.trim() && (
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#090023]">
                Språklig och exegetisk analys
              </h2>
              <p className="text-base leading-relaxed text-[#090023] whitespace-pre-line">
                {artikel.exegetisk_analys}
              </p>
            </div>
          )}

          {artikel.teologisk_analys?.trim() && (
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#090023]">Teologisk analys</h2>
              <p className="text-base leading-relaxed text-[#090023] whitespace-pre-line">
                {artikel.teologisk_analys}
              </p>
            </div>
          )}

          {/* Flexibelt innehåll */}
          {artikel.innehall?.trim() && (
            <div className="space-y-4">{renderFlexibleContent(artikel.innehall)}</div>
          )}

          {artikel.slutsats?.trim() && (
            <div className="space-y-3 border-t border-black/10 pt-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#090023]">Slutsats</h2>
              <p className="text-base leading-relaxed text-[#090023] whitespace-pre-line">
                {artikel.slutsats}
              </p>
            </div>
          )}

          {/* Fotnoter & Källor */}
          {(fotnoter.length > 0 || referenser.length > 0) && (
            <div className="border-t border-black/10 pt-8 space-y-5 text-sm text-[#090023]">
              {fotnoter.length > 0 && (
                <>
                  <h3 className="text-xl font-bold text-[#090023]">
                    Fotnoter &amp; källor (Chicago)
                  </h3>
                  <ol className="list-decimal list-inside space-y-1.5 pl-2">
                    {fotnoter.map((fn) => (
                      <li key={fn.nr}>{fn.text}</li>
                    ))}
                  </ol>
                </>
              )}

              {referenser.length > 0 && (
                <>
                  <h3 className="text-xl font-bold text-[#090023] pt-4">
                    Litteraturförteckning
                  </h3>
                  <ul className="list-disc list-inside space-y-1.5 pl-2">
                    {referenser.map((ref, i) => (
                      <li key={i}>{ref}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {/* Författarpresentation */}
          <div className="bg-[#f3f0ed] p-6 rounded-2xl flex items-center gap-4 border border-black/10 mt-8">
            <div className="size-12 rounded-full bg-[#090023] text-[#F9F8F5] flex items-center justify-center font-bold text-lg shrink-0">
              {getInitials(forfattare)}
            </div>
            <div>
              <h4 className="font-bold text-lg sm:text-xl text-[#090023]">{forfattare}</h4>
              <p className="text-base text-[#090023] mt-0.5">Bibellärare, skribent och debattör.</p>
            </div>
          </div>

          {/* BETYGSÄTTNING (1–5) & ÖPPNA OMDÖMEN */}
          <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs mt-10">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#090023]">
                Vad tyckte du om artikelns akademiska kvalitet?
              </h3>
              <div className="inline-flex items-center gap-2 bg-[#f3f0ed] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#090023]">
                <Star className="size-3.5 fill-[#090023] text-[#090023]" />
                {snittBetyg ? (
                  <span>
                    {snittBetyg} av 5 · {antalBetyg}{" "}
                    {antalBetyg === 1 ? "betygssättare" : "betygssättare"}
                  </span>
                ) : (
                  <span>Inga betyg ännu</span>
                )}
              </div>
            </div>

            {omdomeSkickat ? (
              <div className="p-4 bg-[#f3f0ed] rounded-xl text-base text-[#090023] font-semibold">
                Tack för ditt omdöme och ditt betyg!
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((siffra) => (
                    <button
                      key={siffra}
                      type="button"
                      onClick={() => setValtBetyg(siffra)}
                      className={`size-10 rounded-xl font-bold text-sm border transition-all cursor-pointer ${
                        valtBetyg === siffra
                          ? "bg-[#090023] text-[#F9F8F5] border-[#090023]"
                          : "bg-[#f3f0ed] text-[#090023] border-black/10 hover:border-black/30"
                      }`}
                    >
                      {siffra}
                    </button>
                  ))}
                  {valtBetyg && (
                    <span className="text-xs text-[#090023] font-semibold ml-2">
                      Valt betyg: {valtBetyg} av 5
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#090023] font-bold mb-1.5">
                    Lämna ett kort omdöme (max 1–2 meningar):
                  </label>
                  <textarea
                    maxLength={250}
                    rows={2}
                    value={omdomeText}
                    onChange={(e) => setOmdomeText(e.target.value)}
                    placeholder="Skriv din kommentar här..."
                    className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl p-3 text-xs text-[#090023] outline-none focus:border-[#090023]"
                  />
                  <div className="text-[11px] text-[#090023] text-right mt-1">
                    {omdomeText.length}/250 tecken
                  </div>
                </div>

                <button
                  type="button"
                  disabled={skickarOmdome}
                  onClick={handleSendReview}
                  className="px-6 py-3 bg-[#090023] hover:bg-black text-[#F9F8F5] rounded-xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer disabled:opacity-60"
                >
                  {skickarOmdome ? "SKICKAR..." : "SKICKA OMDÖME"}
                </button>
              </div>
            )}

            {/* Läsarnas kommentarer */}
            {synligaKommentarer.length > 0 && (
              <div className="pt-6 border-t border-black/10 space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#090023]">
                  Läsarnas omdömen ({synligaKommentarer.length})
                </p>
                <div className="space-y-3">
                  {synligaKommentarer.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#f3f0ed] rounded-xl p-4 border border-black/5 space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[#090023]">
                        <span>Betyg: {item.betyg} / 5</span>
                        <span>{formatArticleDate(item.skapad_at)}</span>
                      </div>
                      <p className="text-base text-[#090023] leading-relaxed">
                        {item.kommentar}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* GÅVA / UPPSKATTNING */}
          <div className="text-center pt-6 pb-12">
            <button
              type="button"
              onClick={() => setVisaDonationModal(true)}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#FFA8CD] hover:bg-[#ff94be] text-[#090023] font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-sm"
            >
              <Heart className="size-4 text-[#090023]" />
              VISA DIN UPPSKATTNING
            </button>
          </div>
        </article>

        {/* GÅVO-POPUP */}
        {visaDonationModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-black/15 rounded-3xl max-w-md w-full p-8 shadow-2xl relative space-y-5 text-[#090023]">
              <button
                type="button"
                onClick={() => setVisaDonationModal(false)}
                className="absolute right-5 top-5 p-1 text-[#090023] hover:opacity-70 cursor-pointer"
                aria-label="Stäng"
              >
                <X className="size-5" />
              </button>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#090023] bg-[#f3f0ed] px-3 py-1 rounded-full inline-block">
                  FORSKNINGSSTÖD
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#090023]">
                  Visa din uppskattning
                </h3>
                <p className="text-base text-[#090023] leading-relaxed">
                  Varje artikel kräver tiotals timmars självständig bibelforskning och exegetik. Ett personligt bidrag möjliggör fortsatt fördjupning och skrivande.
                </p>
              </div>

              <div className="bg-[#f3f0ed] p-5 rounded-2xl space-y-2 text-sm border border-black/5">
                <p className="font-bold text-xs uppercase tracking-wider text-[#090023]">Swish direkt till författaren:</p>
                <p className="text-lg font-bold text-[#090023]">073-330 29 83</p>
                <p className="text-xs text-[#090023]">Mottagare: Peter Abramsgård</p>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setVisaDonationModal(false)}
                  className="w-full py-3 bg-[#090023] hover:bg-black text-[#F9F8F5] rounded-xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
                >
                  STÄNG
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
