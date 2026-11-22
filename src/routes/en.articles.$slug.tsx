import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import {
  type ArtikelRow,
  type ArtikelOmdome,
  fetchEnglishArticleBySlug,
  fetchArticleReviews,
  submitArticleReview,
  formatArticleDate,
  parseReferenser,
} from "@/lib/articles";
import { Heart, ArrowLeft, Calendar, User, X, ExternalLink, Star } from "lucide-react";

const STRIPE_PAYMENT_LINK = "https://donate.stripe.com/6oU4gs3IteFc2wf6hb9AA00";

export const Route = createFileRoute("/en/articles/$slug")({
  component: EnglishArticleDetailPage,
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

function EnglishArticleDetailPage() {
  const { slug } = Route.useParams();
  const [article, setArticle] = useState<ArtikelRow | null>(null);
  const [reviews, setReviews] = useState<ArtikelOmdome[]>([]);
  const [loading, setLoading] = useState(true);

  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  useEffect(() => {
    let active = true;
    setLoading(true);
    setSelectedRating(null);
    setReviewText("");
    setReviewSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });

    fetchEnglishArticleBySlug(slug).then(async (data) => {
      if (!active) return;
      setArticle(data);
      if (data) {
        const fetchedReviews = await fetchArticleReviews(data.slug);
        if (active) setReviews(fetchedReviews);
      } else {
        setReviews([]);
      }
      if (active) setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [slug]);

  async function handleSubmitReview() {
    if (!article) return;
    if (!selectedRating) {
      alert("Please select a rating between 1 and 5.");
      return;
    }
    setSubmittingReview(true);
    const ok = await submitArticleReview({
      artikel_slug: article.slug,
      betyg: selectedRating,
      kommentar: reviewText,
      sprak: "en",
    });
    if (ok) {
      setReviewSubmitted(true);
      const updated = await fetchArticleReviews(article.slug);
      setReviews(updated);
    } else {
      alert("Something went wrong while submitting your review. Please try again.");
    }
    setSubmittingReview(false);
  }

  if (loading) {
    return (
      <SiteLayout>
        <div className="py-24 px-6 max-w-3xl mx-auto font-serif text-base text-[#090023]">
          Loading article...
        </div>
      </SiteLayout>
    );
  }

  if (!article) {
    return (
      <SiteLayout>
        <div className="py-24 px-6 max-w-3xl mx-auto font-serif space-y-6">
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold text-[#090023] leading-tight">
            Article not found
          </h1>
          <p className="text-base text-[#090023] leading-relaxed">
            This article no longer exists or has not yet been published in English.
          </p>
          <Link
            to="/en/articles"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#090023] hover:underline"
          >
            <ArrowLeft className="size-4" /> BACK TO ARTICLES
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const author = article.forfattare ?? "Peter Abramsgård";
  const footnotes = Array.isArray(article.fotnoter_en) ? article.fotnoter_en : [];
  const references = parseReferenser(article.referenser_en);

  const ratingCount = reviews.length;
  const avgRating =
    ratingCount > 0
      ? (reviews.reduce((sum, r) => sum + r.betyg, 0) / ratingCount).toFixed(1)
      : null;
  const visibleComments = reviews.filter((r) => (r.kommentar_en ?? r.kommentar)?.trim());

  return (
    <SiteLayout seoTitle={article.titel_en ?? undefined} seoDescription={article.ingress_en ?? article.sammanfattning_en ?? undefined}>
      <div className="py-12 md:py-16 px-6 max-w-3xl mx-auto font-serif">
        {/* BACK LINK */}
        <div className="mb-8">
          <Link
            to="/en/articles"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#090023] hover:underline"
          >
            <ArrowLeft className="size-4" /> BACK TO ARTICLES
          </Link>
        </div>

        <article className="space-y-8">
          {/* Title & Byline */}
          <div>
            <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold text-[#090023] leading-tight">
              {article.titel_en}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-xs text-[#090023] mt-4 pt-3 border-t border-black/10">
              <span className="flex items-center gap-1.5">
                <User className="size-3.5" /> By {author}
              </span>
              {article.publicerad_at && (
                <span className="flex items-center gap-1.5">
                  <Calendar className="size-3.5" /> Published: {formatArticleDate(article.publicerad_at)}
                </span>
              )}
              {article.reviderad_at && (
                <span>Revised: {formatArticleDate(article.reviderad_at)}</span>
              )}
            </div>
          </div>

          {/* Lead / Abstract */}
          {article.ingress_en?.trim() && (
            <div className="text-lg italic text-[#090023] bg-[#f3f0ed] p-6 rounded-2xl border-l-4 border-[#090023] leading-relaxed">
              {article.ingress_en}
            </div>
          )}

          {/* Fixed Academic Sections */}
          {article.sammanfattning_en?.trim() && (
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#090023]">Summary</h2>
              <p className="text-base leading-relaxed text-[#090023] whitespace-pre-line">
                {article.sammanfattning_en}
              </p>
            </div>
          )}

          {article.inledning_en?.trim() && (
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#090023]">Introduction</h2>
              <p className="text-base leading-relaxed text-[#090023] whitespace-pre-line">
                {article.inledning_en}
              </p>
            </div>
          )}

          {article.problemformulering_en?.trim() && (
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#090023]">Problem statement</h2>
              <p className="text-base leading-relaxed text-[#090023] whitespace-pre-line">
                {article.problemformulering_en}
              </p>
            </div>
          )}

          {article.text_och_kontext_en?.trim() && (
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#090023]">Text and context</h2>
              <p className="text-base leading-relaxed text-[#090023] whitespace-pre-line">
                {article.text_och_kontext_en}
              </p>
            </div>
          )}

          {article.exegetisk_analys_en?.trim() && (
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#090023]">
                Linguistic and exegetical analysis
              </h2>
              <p className="text-base leading-relaxed text-[#090023] whitespace-pre-line">
                {article.exegetisk_analys_en}
              </p>
            </div>
          )}

          {article.teologisk_analys_en?.trim() && (
            <div className="space-y-3">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#090023]">Theological analysis</h2>
              <p className="text-base leading-relaxed text-[#090023] whitespace-pre-line">
                {article.teologisk_analys_en}
              </p>
            </div>
          )}

          {/* Flexible content */}
          {article.innehall_en?.trim() && (
            <div className="space-y-4">{renderFlexibleContent(article.innehall_en)}</div>
          )}

          {article.slutsats_en?.trim() && (
            <div className="space-y-3 border-t border-black/10 pt-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-[#090023]">Conclusion</h2>
              <p className="text-base leading-relaxed text-[#090023] whitespace-pre-line">
                {article.slutsats_en}
              </p>
            </div>
          )}

          {/* Footnotes & Bibliography (Chicago) */}
          {(footnotes.length > 0 || references.length > 0) && (
            <div className="border-t border-black/10 pt-8 space-y-5 text-sm text-[#090023]">
              {footnotes.length > 0 && (
                <>
                  <h3 className="text-xl font-bold text-[#090023]">
                    Footnotes &amp; sources (Chicago)
                  </h3>
                  <ol className="list-decimal list-inside space-y-1.5 pl-2">
                    {footnotes.map((fn) => (
                      <li key={fn.nr}>{fn.text}</li>
                    ))}
                  </ol>
                </>
              )}

              {references.length > 0 && (
                <>
                  <h3 className="text-xl font-bold text-[#090023] pt-4">Bibliography</h3>
                  <ul className="list-disc list-inside space-y-1.5 pl-2">
                    {references.map((ref, i) => (
                      <li key={i}>{ref}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
          )}

          {/* Author Box */}
          <div className="bg-[#f3f0ed] p-6 rounded-2xl flex items-center gap-4 border border-black/10 mt-8">
            {author.toLowerCase().includes("abramsgård") ? (
              <img
                src="/peter_abramsgard_portrattbild.png"
                alt={author}
                className="size-32 sm:size-44 rounded-full object-contain bg-white border border-black/10 shrink-0"
              />
            ) : (
              <div className="size-14 rounded-full bg-[#090023] text-[#F9F8F5] flex items-center justify-center font-bold text-lg shrink-0">
                {getInitials(author)}
              </div>
            )}
            <div>
              <h4 className="font-bold text-lg sm:text-xl text-[#090023]">{author}</h4>
              <p className="text-base text-[#090023] mt-0.5">Bible teacher, writer, and debater.</p>
            </div>
          </div>

          {/* RATING & OPEN REVIEWS */}
          <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs mt-10">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/10 pb-4">
              <h3 className="text-xl sm:text-2xl font-bold text-[#090023]">
                How did you assess the scholarly quality of this article?
              </h3>
              <div className="inline-flex items-center gap-2 bg-[#f3f0ed] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#090023]">
                <Star className="size-3.5 fill-[#090023] text-[#090023]" />
                {avgRating ? (
                  <span>
                    {avgRating} out of 5 · {ratingCount}{" "}
                    {ratingCount === 1 ? "rating" : "ratings"}
                  </span>
                ) : (
                  <span>No ratings yet</span>
                )}
              </div>
            </div>

            {reviewSubmitted ? (
              <div className="p-4 bg-[#f3f0ed] rounded-xl text-base text-[#090023] font-semibold">
                Thank you for your rating and feedback!
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setSelectedRating(num)}
                      className={`size-10 rounded-xl font-bold text-sm border transition-all cursor-pointer ${
                        selectedRating === num
                          ? "bg-[#090023] text-[#F9F8F5] border-[#090023]"
                          : "bg-[#f3f0ed] text-[#090023] border-black/10 hover:border-black/30"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                  {selectedRating && (
                    <span className="text-xs text-[#090023] font-semibold ml-2">
                      Selected rating: {selectedRating} out of 5
                    </span>
                  )}
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#090023] font-bold mb-1.5">
                    Leave a brief review (1–2 sentences max):
                  </label>
                  <textarea
                    maxLength={250}
                    rows={2}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="Write your comment here..."
                    className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl p-3 text-xs text-[#090023] outline-none focus:border-[#090023]"
                  />
                  <div className="text-[11px] text-[#090023] text-right mt-1">
                    {reviewText.length}/250 characters
                  </div>
                </div>

                <button
                  type="button"
                  disabled={submittingReview}
                  onClick={handleSubmitReview}
                  className="px-6 py-3 bg-[#090023] hover:bg-black text-[#F9F8F5] rounded-xl font-bold text-sm transition-all cursor-pointer disabled:opacity-60"
                >
                  {submittingReview ? "Submitting..." : "Submit review"}
                </button>
              </div>
            )}

            {/* Reader comments */}
            {visibleComments.length > 0 && (
              <div className="pt-6 border-t border-black/10 space-y-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#090023]">
                  Reader reviews ({visibleComments.length})
                </p>
                <div className="space-y-3">
                  {visibleComments.map((item) => (
                    <div
                      key={item.id}
                      className="bg-[#f3f0ed] rounded-xl p-4 border border-black/5 space-y-1.5"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-[#090023]">
                        <span>Rating: {item.betyg} / 5</span>
                        <span>{formatArticleDate(item.skapad_at)}</span>
                      </div>
                      <p className="text-base text-[#090023] leading-relaxed">
                        {item.kommentar_en ?? item.kommentar}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* SUPPORT BUTTON */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-6 pb-12">
            <button
              type="button"
              onClick={() => setShowSupportModal(true)}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-xl bg-[#FFA8CD] hover:bg-[#ff94be] text-[#090023] font-bold text-sm transition-all cursor-pointer shadow-sm"
            >
              <Heart className="size-4 text-[#090023]" />
              Show your appreciation
            </button>
          </div>
        </article>

        {/* SUPPORT MODAL */}
        {showSupportModal && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
            <div className="bg-white border border-black/15 rounded-3xl max-w-md w-full p-8 shadow-2xl relative space-y-5 text-[#090023]">
              <button
                type="button"
                onClick={() => setShowSupportModal(false)}
                className="absolute right-5 top-5 p-1 text-[#090023] hover:opacity-70 cursor-pointer"
                aria-label="Close"
              >
                <X className="size-5" />
              </button>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-[#090023] bg-[#f3f0ed] px-3 py-1 rounded-full inline-block">
                  RESEARCH SUPPORT
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-[#090023]">
                  Show your appreciation
                </h3>
                <p className="text-base text-[#090023] leading-relaxed">
                  Each article requires dozens of hours of independent biblical scholarship and exegesis. A personal contribution makes continued research and writing possible.
                </p>
              </div>

              {STRIPE_PAYMENT_LINK && (
                <a
                  href={STRIPE_PAYMENT_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 px-4 bg-[#FFA8CD] hover:bg-[#ff94be] text-[#090023] rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xs"
                >
                  CONTRIBUTE VIA STRIPE <ExternalLink className="size-4 text-[#090023]" />
                </a>
              )}

              <div className="bg-[#f3f0ed] p-5 rounded-2xl space-y-2 text-sm border border-black/5">
                <p className="font-bold text-xs uppercase tracking-wider text-[#090023]">
                  Swish (for residents in Sweden):
                </p>
                <p className="text-lg font-bold text-[#090023]">073-330 29 83</p>
                <p className="text-xs text-[#090023]">Recipient: Peter Abramsgård</p>
              </div>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setShowSupportModal(false)}
                  className="w-full py-3 bg-[#090023] hover:bg-black text-[#F9F8F5] rounded-xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
                >
                  CLOSE
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </SiteLayout>
  );
}
