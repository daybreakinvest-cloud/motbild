import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import {
  KATEGORI_TRAD,
  type KategoriNod,
  type ArtikelRow,
  fetchEnglishArticles,
  formatArticleDate,
} from "@/lib/articles";
import { Search, ChevronRight, ChevronDown, X } from "lucide-react";

export const Route = createFileRoute("/en/articles/")({
  component: EnglishArticlesIndexPage,
});

function EnglishArticlesIndexPage() {
  const [articles, setArticles] = useState<ArtikelRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<string[]>(["kristologi", "preexistens"]);
  const [showFaithModal, setShowFaithModal] = useState(false);

  useEffect(() => {
    let active = true;
    fetchEnglishArticles().then((data) => {
      if (active) {
        setArticles(data);
        setLoading(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  function toggleNode(id: string) {
    setExpandedNodes((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  }

  const filteredArticles = useMemo(() => {
    return articles.filter((art) => {
      const q = searchQuery.trim().toLowerCase();
      const title = (art.titel_en ?? "").toLowerCase();
      const lead = (art.ingress_en ?? "").toLowerCase();
      const tags = art.taggar_en ?? [];

      const matchesSearch =
        q === "" ||
        title.includes(q) ||
        lead.includes(q) ||
        tags.some((t) => t.toLowerCase().includes(q));

      const matchesCategory = !selectedCategory || art.kategori_id === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [articles, searchQuery, selectedCategory]);

  function renderTree(nodes: KategoriNod[]) {
    return (
      <ul className="space-y-1 pl-3 text-xs font-serif">
        {nodes.map((node) => {
          const hasChildren = node.underkategorier && node.underkategorier.length > 0;
          const isExpanded = expandedNodes.includes(node.id);
          const isSelected = selectedCategory === node.id;

          return (
            <li key={node.id} className="py-0.5">
              <div className="flex items-center gap-1.5 group">
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => toggleNode(node.id)}
                    className="p-1 text-[#090023] cursor-pointer"
                  >
                    {isExpanded ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
                  </button>
                ) : (
                  <span className="w-4" />
                )}

                <button
                  type="button"
                  onClick={() => setSelectedCategory(isSelected ? null : node.id)}
                  className={`text-left hover:underline cursor-pointer transition-colors text-[#090023] ${
                    isSelected ? "font-bold underline" : ""
                  }`}
                >
                  {node.namnEn}
                </button>
              </div>

              {hasChildren && isExpanded && node.underkategorier && renderTree(node.underkategorier)}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <SiteLayout>
      {/* HERO SECTION */}
      <section className="bg-[#090023] text-[#F9F8F5] py-20 px-6 border-b border-white/10 font-serif">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#F9F8F5]">
            A biblical perspective that challenges and liberates
          </h1>

          <p className="text-xl sm:text-2xl text-[#F9F8F5] max-w-2xl mx-auto leading-relaxed pt-2 font-serif">
            For those who dare to engage Scripture without motivated reasoning, confirmation bias, and selective perception—where cognitive dissonance is transformed into intellectual and spiritual clarity.
          </p>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="py-12 px-6 max-w-6xl mx-auto font-serif space-y-12">
        {/* INTRODUCTORY TEXT */}
        <div className="bg-white border border-black/10 rounded-3xl p-8 sm:p-10 shadow-xs space-y-4 text-base leading-relaxed text-[#090023]">
          <p>
            The articles are written from a Biblical Unitarian perspective (
            <button
              type="button"
              onClick={() => setShowFaithModal(true)}
              className="underline cursor-pointer hover:opacity-75"
            >
              here
            </button>
            ) and aim at objective truth-seeking: independent biblical scholarship, linguistic exegesis, and source-critical analysis free from the preconceived notions of church tradition.
          </p>
          <p>
            Criticism of methodology, textual fidelity, logic, and original-language references is welcome. Simply appealing to another denominational tradition or dogmatic formulas adds nothing and will not be considered.
          </p>
          <p>
            These writings seek to challenge the reader to look beyond motivated reasoning that obscures the voice of Scripture itself. At the bottom of each article, you may rate the investigation (1–5) and leave a brief assessment of its scholarly quality.
          </p>
          <p>
            Each article requires dozens of hours of research and writing and is produced completely independently. If you wish to support continued study and publication, you may make a personal contribution alongside the article.
          </p>
        </div>

        {/* SEARCH BOX */}
        <div className="max-w-xl mx-auto relative">
          <Search className="size-5 text-[#090023] absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by scripture reference, topic, person, or Greek word..."
            className="w-full h-12 pl-12 pr-4 bg-white text-[#090023] rounded-2xl text-xs font-medium outline-none border border-black/10 shadow-xs focus:ring-2 focus:ring-[#090023]"
          />
        </div>

        {/* TREE AND CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* LEFT: CATEGORY TREE */}
          <div className="lg:col-span-4 bg-white border border-black/10 rounded-2xl p-5 shadow-xs sticky top-24">
            <div className="flex justify-between items-center pb-3 border-b border-black/10 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#090023]">
                CATEGORY TREE
              </span>
              {selectedCategory && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory(null)}
                  className="text-[10px] font-bold uppercase tracking-wider text-[#F9F8F5] bg-[#090023] px-2 py-0.5 rounded-md hover:underline cursor-pointer"
                >
                  CLEAR FILTER
                </button>
              )}
            </div>
            {renderTree(KATEGORI_TRAD)}
          </div>

          {/* RIGHT: ARTICLE LIST */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center text-xs text-[#090023] px-1">
              <span>
                {loading
                  ? "Loading articles..."
                  : filteredArticles.length === 1
                    ? "Showing 1 article"
                    : `Showing ${filteredArticles.length} articles`}
              </span>
            </div>

            {filteredArticles.map((art) => (
              <Link
                key={art.id}
                to="/en/articles/$slug"
                params={{ slug: art.slug_en! }}
                className="block bg-white border border-black/10 rounded-2xl p-7 shadow-xs hover:border-[#090023] transition-all space-y-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {(art.taggar_en ?? []).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-bold uppercase tracking-widest text-[#090023] bg-[#f3f0ed] px-2.5 py-0.5 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-[#090023] hover:underline">
                  {art.titel_en}
                </h2>

                {art.ingress_en && (
                  <p className="text-base text-[#090023] leading-relaxed">
                    {art.ingress_en}
                  </p>
                )}

                <div className="pt-2 flex items-center justify-between text-xs text-[#090023] border-t border-black/5">
                  <span>
                    {art.forfattare ?? "Peter Abramsgård"} • {formatArticleDate(art.publicerad_at)}
                  </span>
                  <span className="font-bold text-[#090023] flex items-center gap-1 uppercase tracking-wider text-[11px]">
                    READ ARTICLE <ChevronRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            ))}

            {!loading && filteredArticles.length === 0 && (
              <div className="bg-white border border-black/10 rounded-2xl p-10 text-center space-y-2">
                <p className="text-base font-bold text-[#090023]">No articles matched your search.</p>
                <p className="text-base text-[#090023]">Try another search term or select a category in the tree on the left.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* POP-UP: OUR STATEMENT OF FAITH */}
      {showFaithModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-black/15 rounded-3xl max-w-xl w-full p-8 sm:p-10 shadow-2xl relative space-y-6 text-[#090023] font-serif max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setShowFaithModal(false)}
              className="absolute right-6 top-6 p-1 text-[#090023] hover:opacity-70 cursor-pointer"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>

            <div className="border-b border-black/10 pb-4">
              <h3 className="text-3xl sm:text-4xl font-bold text-[#090023]">
                Our statement of faith
              </h3>
            </div>

            <div className="space-y-5 leading-relaxed">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#090023] bg-[#f3f0ed] px-2.5 py-0.5 rounded-full inline-block">
                  THE FATHER
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-[#090023] pt-1">
                  The only true God
                </h4>
                <p className="text-base text-[#090023]">
                  We believe, as Christ did, that the Father is the only true God (John 17:3). No one else is God in the same sense as the Father.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#090023] bg-[#f3f0ed] px-2.5 py-0.5 rounded-full inline-block">
                  THE SON
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-[#090023] pt-1">
                  God’s only begotten Son &amp; Messiah
                </h4>
                <p className="text-base text-[#090023]">
                  Jesus Christ is by nature a non-pre-existent human being (1 Tim 2:5), born of a woman and anointed as Messiah and Lord.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#090023] bg-[#f3f0ed] px-2.5 py-0.5 rounded-full inline-block">
                  THE SPIRIT
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-[#090023] pt-1">
                  God’s power &amp; presence
                </h4>
                <p className="text-base text-[#090023]">
                  The Holy Spirit is not a third person in a Godhead. The term refers to the Father’s own spirit and activity, and at times to Christ himself.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setShowFaithModal(false)}
                className="w-full py-3 bg-[#090023] hover:bg-black text-[#F9F8F5] rounded-xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
