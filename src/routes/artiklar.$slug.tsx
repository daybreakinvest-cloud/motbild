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
              <h2 className="text-3xl sm:text-4xl font-bold text-[#090023]">Samman
