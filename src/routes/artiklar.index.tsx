import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useMemo, useEffect } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import {
  KATEGORI_TRAD,
  type KategoriNod,
  type ArtikelRow,
  fetchSwedishArticles,
  formatArticleDate,
} from "@/lib/articles";
import { Search, ChevronRight, ChevronDown, X } from "lucide-react";

export const Route = createFileRoute("/artiklar/")({
  component: ArtiklarIndexPage,
});

function ArtiklarIndexPage() {
  const [artiklar, setArtiklar] = useState<ArtikelRow[]>([]);
  const [laddar, setLaddar] = useState(true);
  const [sokord, setSokord] = useState("");
  const [valdKategori, setValdKategori] = useState<string | null>(null);
  const [oppnadeNoder, setOppnadeNoder] = useState<string[]>(["kristologi", "preexistens"]);
  const [visaOmOssModal, setVisaOmOssModal] = useState(false);

  useEffect(() => {
    let active = true;
    fetchSwedishArticles().then((data) => {
      if (active) {
        setArtiklar(data);
        setLaddar(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  function togglaNod(id: string) {
    setOppnadeNoder((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  }

  const filtreradeArtiklar = useMemo(() => {
    return artiklar.filter((art) => {
      const q = sokord.trim().toLowerCase();
      const matcharSok =
        q === "" ||
        art.titel.toLowerCase().includes(q) ||
        (art.ingress ?? "").toLowerCase().includes(q) ||
        (art.taggar ?? []).some((t) => t.toLowerCase().includes(q));

      const matcharKategori = !valdKategori || art.kategori_id === valdKategori;

      return matcharSok && matcharKategori;
    });
  }, [artiklar, sokord, valdKategori]);

  function renderaTrad(noder: KategoriNod[]) {
    return (
      <ul className="space-y-1 pl-3 text-xs font-serif">
        {noder.map((nod) => {
          const harUnder = nod.underkategorier && nod.underkategorier.length > 0;
          const arOppnad = oppnadeNoder.includes(nod.id);
          const arVald = valdKategori === nod.id;

          return (
            <li key={nod.id} className="py-0.5">
              <div className="flex items-center gap-1.5 group">
                {harUnder ? (
                  <button
                    type="button"
                    onClick={() => togglaNod(nod.id)}
                    className="p-1 text-[#090023] cursor-pointer"
                  >
                    {arOppnad ? <ChevronDown className="size-3.5" /> : <ChevronRight className="size-3.5" />}
                  </button>
                ) : (
                  <span className="w-4" />
                )}

                <button
                  type="button"
                  onClick={() => setValdKategori(arVald ? null : nod.id)}
                  className={`text-left hover:underline cursor-pointer transition-colors text-[#090023] ${
                    arVald ? "font-bold underline" : ""
                  }`}
                >
                  {nod.namn}
                </button>
              </div>

              {harUnder && arOppnad && nod.underkategorier && renderaTrad(nod.underkategorier)}
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
            Bibliskt perspektiv som utmanar och befriar
          </h1>

          <p className="text-xl sm:text-2xl text-[#F9F8F5] max-w-2xl mx-auto leading-relaxed pt-2 font-serif">
            För den som vågar möta Skriften utan motiverat tänkande, fördomsbekräftelse och selektiv perception – där kognitiv dissonans förvandlas till intellektuell och andlig klarhet.
          </p>
        </div>
      </section>

      {/* HUVUDINNEHÅLL */}
      <section className="py-12 px-6 max-w-6xl mx-auto font-serif space-y-12">
        {/* FÖRTEXT SOM FYRA KORT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-xs space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold text-[#090023]">
              Perspektiv och metod
            </h3>
            <p className="text-base leading-relaxed text-[#090023]">
              Artiklarna utgår från ett bibliskt unitariskt perspektiv (
              <button
                type="button"
                onClick={() => setVisaOmOssModal(true)}
                className="underline cursor-pointer hover:opacity-75"
              >
                här
              </button>
              ) och syftar till sakligt sanningssökande: självständig bibelforskning, språklig exegetik och källkritisk analys fri från kyrkotraditionens förutfattade meningar.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-xs space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold text-[#090023]">
              Utmaning och omdöme
            </h3>
            <p className="text-base leading-relaxed text-[#090023]">
              Texterna vill utmana läsaren att se bortom motiverat tänkande som hindrar Skriftens egen röst. Nederst kan du betygsätta undersökningen (1-5) och lämna ett kort omdöme om dess sakliga kvalitet.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-xs space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold text-[#090023]">
              Saklig prövning och kritik
            </h3>
            <p className="text-base leading-relaxed text-[#090023]">
              Kritik av metod, texttrohet, logik och grundtextreferenser är välkommen. Att enbart hänvisa till annan samfundstradition eller dogmatiska formler tillför inget och beaktas inte.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-xs space-y-3">
            <h3 className="text-xl sm:text-2xl font-bold text-[#090023]">
              Oberoende forskning och stöd
            </h3>
            <p className="text-base leading-relaxed text-[#090023]">
              Varje artikel kräver tiotals timmars forsknings- och skrivarbete och produceras helt oberoende. Vill du stödja fortsatt fördjupning och publicering finns möjlighet till ett personligt bidrag i anslutning till artikeln.
            </p>
          </div>
        </div>

        {/* SÖKRUTA */}
        <div className="max-w-xl mx-auto relative">
          <Search className="size-5 text-[#090023] absolute left-4 top-3.5" />
          <input
            type="text"
            value={sokord}
            onChange={(e) => setSokord(e.target.value)}
            placeholder="Sök på bibelord, ämne, person eller grekiskt ord..."
            className="w-full h-12 pl-12 pr-4 bg-white text-[#090023] rounded-2xl text-xs font-medium outline-none border border-black/10 shadow-xs focus:ring-2 focus:ring-[#090023]"
          />
        </div>

        {/* TRÄD OCH KORT */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* VÄNSTER: KATEGORITRÄD */}
          <div className="lg:col-span-4 bg-white border border-black/10 rounded-2xl p-5 shadow-xs sticky top-24">
            <div className="flex justify-between items-center pb-3 border-b border-black/10 mb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#090023]">
                KATEGORITRÄD
              </span>
              {valdKategori && (
                <button
                  type="button"
                  onClick={() => setValdKategori(null)}
                  className="text-[10px] font-bold uppercase tracking-wider text-[#F9F8F5] bg-[#090023] px-2 py-0.5 rounded-md hover:underline cursor-pointer"
                >
                  RENSA FILTER
                </button>
              )}
            </div>
            {renderaTrad(KATEGORI_TRAD)}
          </div>

          {/* HÖGER: ARTIKELLISTA */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex justify-between items-center text-xs text-[#090023] px-1">
              <span>
                {laddar
                  ? "Hämtar artiklar..."
                  : filtreradeArtiklar.length === 1
                    ? "Visar 1 artikel"
                    : `Visar ${filtreradeArtiklar.length} artiklar`}
              </span>
            </div>

            {filtreradeArtiklar.map((art) => (
              <Link
                key={art.id}
                to="/artiklar/$slug"
                params={{ slug: art.slug }}
                className="block bg-white border border-black/10 rounded-2xl p-7 shadow-xs hover:border-[#090023] transition-all space-y-3"
              >
                <div className="flex flex-wrap items-center gap-2">
                  {(art.taggar ?? []).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-bold uppercase tracking-widest text-[#090023] bg-[#f3f0ed] px-2.5 py-0.5 rounded-full"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-[#090023] hover:underline">
                  {art.titel}
                </h2>

                {art.ingress && (
                  <p className="text-base text-[#090023] leading-relaxed">
                    {art.ingress}
                  </p>
                )}

                <div className="pt-2 flex items-center justify-between text-xs text-[#090023] border-t border-black/5">
                  <span>
                    {art.forfattare ?? "Peter Abramsgård"} • {formatArticleDate(art.publicerad_at)}
                  </span>
                  <span className="font-bold text-[#090023] flex items-center gap-1 uppercase tracking-wider text-[11px]">
                    LÄS ARTIKEL <ChevronRight className="size-3.5" />
                  </span>
                </div>
              </Link>
            ))}

            {!laddar && filtreradeArtiklar.length === 0 && (
              <div className="bg-white border border-black/10 rounded-2xl p-10 text-center space-y-2">
                <p className="text-base font-bold text-[#090023]">Inga artiklar matchade din sökning.</p>
                <p className="text-base text-[#090023]">Prova ett annat sökord eller klicka på en kategori i trädet till vänster.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* POP-UP: VÅR TROSGRUND */}
      {visaOmOssModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-black/15 rounded-3xl max-w-xl w-full p-8 sm:p-10 shadow-2xl relative space-y-6 text-[#090023] font-serif max-h-[90vh] overflow-y-auto">
            <button
              type="button"
              onClick={() => setVisaOmOssModal(false)}
              className="absolute right-6 top-6 p-1 text-[#090023] hover:opacity-70 cursor-pointer"
              aria-label="Stäng"
            >
              <X className="size-5" />
            </button>

            <div className="border-b border-black/10 pb-4">
              <h3 className="text-3xl sm:text-4xl font-bold text-[#090023]">
                Vår trosgrund
              </h3>
            </div>

            <div className="space-y-5 leading-relaxed">
              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#090023] bg-[#f3f0ed] px-2.5 py-0.5 rounded-full inline-block">
                  FADERN
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-[#090023] pt-1">
                  Den ende sanne Guden
                </h4>
                <p className="text-base text-[#090023]">
                  Vi tror som Kristus att Fadern är den ende sanne Guden (Joh 17:3). Ingen annan är Gud i samma mening som Fadern.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#090023] bg-[#f3f0ed] px-2.5 py-0.5 rounded-full inline-block">
                  SONEN
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-[#090023] pt-1">
                  Guds enfödde Son &amp; Messias
                </h4>
                <p className="text-base text-[#090023]">
                  Jesus Kristus är till sin natur en icke-preexistent människa (1 Tim 2:5), född av kvinna och smord till Messias och Herre.
                </p>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#090023] bg-[#f3f0ed] px-2.5 py-0.5 rounded-full inline-block">
                  ANDEN
                </span>
                <h4 className="text-xl sm:text-2xl font-bold text-[#090023] pt-1">
                  Guds kraft &amp; närvaro
                </h4>
                <p className="text-base text-[#090023]">
                  Den helige Ande är inte en tredje person i en gudom. Begreppet syftar på Faderns egen ande och verksamhet, och ibland på Kristus själv.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setVisaOmOssModal(false)}
                className="w-full py-3 bg-[#090023] hover:bg-black text-[#F9F8F5] rounded-xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
              >
                STÄNG
              </button>
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
