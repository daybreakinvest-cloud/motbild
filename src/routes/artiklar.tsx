import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Search, ChevronRight, ChevronDown, Heart, ArrowLeft, Calendar, User } from "lucide-react";

export const Route = createFileRoute("/artiklar")({
  component: ArtiklarPage,
});

interface KategoriNod {
  id: string;
  namn: string;
  underkategorier?: KategoriNod[];
}

const KATEGORI_TRAD: KategoriNod[] = [
  {
    id: "teologi-proper",
    namn: "Teologi proper (Läran om Gud)",
    underkategorier: [
      { id: "fadern", namn: "Fadern – den ende sanne Guden" },
      { id: "treenigheten", namn: "Treenigheten och kyrkohistorien" },
    ],
  },
  {
    id: "kristologi",
    namn: "Kristologi (Läran om Kristus)",
    underkategorier: [
      {
        id: "preexistens",
        namn: "Kristi preexistens",
        underkategorier: [
          { id: "johannes-pre", namn: "Johannes evangelium" },
          { id: "paulus-pre", namn: "Paulus brev" },
          { id: "gt-pre", namn: "Gamla Testamentet" },
        ],
      },
      {
        id: "gudom",
        namn: "Kristi gudomlighet",
        underkategorier: [
          { id: "titlar", namn: "Herren, Frälsaren, Alfa & Omega" },
          { id: "ambeten", namn: "Profeten, Översteprästen, Kungen" },
        ],
      },
      {
        id: "manniskan-jesus",
        namn: "Människan Jesus",
      },
    ],
  },
  {
    id: "pneumatologi",
    namn: "Pneumatologi (Den helige Ande)",
    underkategorier: [
      { id: "faderns-ande", namn: "Faderns egen ande och kraft" },
      { id: "livgivande-ande", namn: "Kristus – den livgivande anden" },
    ],
  },
  {
    id: "soteriologi",
    namn: "Soteriologi (Frälsningen)",
  },
];

const START_ARTIKLAR = [
  {
    slug: "begynnelsen-i-johannes-1",
    kategoriId: "johannes-pre",
    titel: "Begynnelsen i Johannes 1: En ny skapelse genom Kristus",
    forfattare: "Peter Abramsgård",
    publicerad: "2026-06-21",
    reviderad: "2026-09-14",
    ingress: "Johannesprologen förstås traditionellt som ett bevis för Jesu tidlösa preexistens. Men en språklig och exegetisk granskning av grundtexten visar att Johannes snarare beskriver begynnelsen av en ny skapelse.",
    sammanfattning: "Denna artikel undersöker verbet φαίνει (lyser) och kontraststrukturen i Johannes 1:1–18. Analysen visar att Johannes inte formulerar en metafysisk spekulation om Logos i forntiden, utan introducerar den nya tidsåldern där ljuset bryter in i mörkret.",
    problemformulering: "Huruvida 'begynnelsen' (en archē) i Johannes 1:1 syftar på universums ursprungliga tillblivelse i 1 Mos 1:1 eller på evangeliets och den nya skapelsens startpunkt med Johannes döparen.",
    textOchKontext: "Johannesevangeliets första kapitel är uppbyggt kring genomgående kontraster: ljus mot mörker, Mose mot Kristus, och den naturliga födelsen mot den andliga födelsen av Gud.",
    exegetiskAnalys: "Verbet φαίνει (lyser) i Joh 1:5 står i historiskt presens, vilket Raymond E. Brown och D. A. Carson båda uppmärksammar. Ljuset fortsätter att lysa i den mänskliga historiens mörker när den Enfödde träder fram. Johannes döparen beskrivs i vers 6–8 som begynnelsen på denna rörelse – vittnet som pekar mot Kristi ankomst.",
    teologiskAnalys: "Att tolka Logos som en självständig preexistent gudomsperson skapar olösliga motsättningar mot Jesu egna ord i Joh 17:3, där han tilltalar Fadern som 'den ende sanne Guden'. När Logos blev kött (Joh 1:14) innebär det att Guds faderliga plan och avsikt fick sin fulla förkroppsligande i människan Jesus Kristus.",
    slutsats: "Johannes 1 är inte ett bevis för en två- eller treenig gudom, utan en storslagen proklamation om att Gud genom sin mänsklige Messias har låtit en ny skapelse bryta in i historien.",
    fotnoter: [
      { nr: 1, text: "Raymond E. Brown, The Gospel According to John (i–xii), Anchor Bible 29 (Garden City, NY: Doubleday, 1966), 8–10." },
      { nr: 2, text: "D. A. Carson, The Gospel According to John, Pillar New Testament Commentary (Grand Rapids: Eerdmans, 1991), 118–122." },
      { nr: 3, text: "Richard Bauckham, Jesus and the God of Israel (Grand Rapids: Eerdmans, 2008), 239–245." },
    ],
    referenser: [
      "Bauckham, Richard. Jesus and the God of Israel. Grand Rapids: Eerdmans, 2008.",
      "Brown, Raymond E. The Gospel According to John (i–xii). Anchor Bible 29. Garden City, NY: Doubleday, 1966.",
      "Carson, D. A. The Gospel According to John. Pillar New Testament Commentary. Grand Rapids: Eerdmans, 1991.",
    ],
    taggar: ["Johannes 1", "Logos", "Kristologi", "Preexistens", "Skapelsen"],
  },
];

function ArtiklarPage() {
  const [sokord, setSokord] = useState("");
  const [valdKategori, setValdKategori] = useState<string | null>(null);
  const [oppnadeNoder, setOppnadeNoder] = useState<string[]>(["kristologi", "preexistens"]);
  const [aktivArtikel, setAktivArtikel] = useState<any | null>(null);

  function togglaNod(id: string) {
    setOppnadeNoder((prev) =>
      prev.includes(id) ? prev.filter((n) => n !== id) : [...prev, id]
    );
  }

  const filtreradeArtiklar = useMemo(() => {
    return START_ARTIKLAR.filter((art) => {
      const matcharSok =
        sokord.trim() === "" ||
        art.titel.toLowerCase().includes(sokord.toLowerCase()) ||
        art.ingress.toLowerCase().includes(sokord.toLowerCase()) ||
        art.taggar.some((t) => t.toLowerCase().includes(sokord.toLowerCase()));

      const matcharKategori = !valdKategori || art.kategoriId === valdKategori;

      return matcharSok && matcharKategori;
    });
  }, [sokord, valdKategori]);

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
                  onClick={() => {
                    setValdKategori(arVald ? null : nod.id);
                    setAktivArtikel(null);
                  }}
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
      {/* 1. HERO SECTION */}
      <section className="bg-[#090023] text-[#F9F8F5] py-16 px-6 border-b border-white/10 font-serif">
        <div className="max-w-4xl mx-auto space-y-6 text-center">
          {/* STOR RUBRIK: GEMENER */}
          <h1 className="text-3xl sm:text-4xl font-normal text-[#F9F8F5]">
            Teologiskt kunskapsbibliotek
          </h1>

          {/* MINDRE HOOK / UNDERRUBRIK: VERSALER */}
          <p className="text-xs sm:text-sm uppercase tracking-wider text-[#F9F8F5] max-w-xl mx-auto leading-relaxed">
            Välgrundade artiklar, språkliga analyser och källhänvisningar till Skriftens grundtexter.
          </p>

          {/* SÖKRUTA */}
          <div className="max-w-xl mx-auto relative">
            <Search className="size-5 text-[#090023] absolute left-4 top-3.5" />
            <input
              type="text"
              value={sokord}
              onChange={(e) => {
                setSokord(e.target.value);
                setAktivArtikel(null);
              }}
              placeholder="Sök på bibelord, ämne, person eller grekiskt ord..."
              className="w-full h-12 pl-12 pr-4 bg-white text-[#090023] rounded-2xl text-xs font-medium outline-none shadow-sm focus:ring-2 focus:ring-[#090023]"
            />
          </div>
        </div>
      </section>

      {/* 2. HUVUDINNEHÅLL */}
      <section className="py-12 px-6 max-w-6xl mx-auto font-serif">
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

          {/* HÖGER: ARTIKELLISTA ELLER LÄSVY */}
          <div className="lg:col-span-8">
            {aktivArtikel ? (
              /* ARTIKELLÄSARE (Följer strikt Chicagomodell i texten) */
              <article className="bg-white border border-black/10 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 font-serif">
                <button
                  type="button"
                  onClick={() => setAktivArtikel(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-[#090023] hover:underline cursor-pointer"
                >
                  <ArrowLeft className="size-4" /> TILLBAKA TILL ARTIKELLISTAN
                </button>

                {/* Titel & Metadata */}
                <div>
                  <h1 className="text-2xl sm:text-4xl font-bold text-[#090023] leading-tight">
                    {aktivArtikel.titel}
                  </h1>
                  <div className="flex flex-wrap items-center gap-4 text-xs uppercase tracking-wider text-[#090023] mt-3 pt-3 border-t border-black/10">
                    <span className="flex items-center gap-1.5"><User className="size-3.5" /> {aktivArtikel.forfattare}</span>
                    <span className="flex items-center gap-1.5"><Calendar className="size-3.5" /> Publicerad: {aktivArtikel.publicerad}</span>
                    <span>Reviderad: {aktivArtikel.reviderad}</span>
                  </div>
                </div>

                {/* Ingress */}
                <div className="text-base sm:text-lg italic text-[#090023] bg-[#f3f0ed] p-5 rounded-2xl border-l-4 border-[#090023]">
                  {aktivArtikel.ingress}
                </div>

                {/* Akademisk brödtext (Chicagomodell: rena akademiska rubriker) */}
                <div className="space-y-2">
                  <h3 className="text-base font-bold text-[#090023]">Sammanfattning</h3>
                  <p className="text-sm leading-relaxed text-[#090023]">{aktivArtikel.sammanfattning}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-[#090023]">Problemformulering</h3>
                  <p className="text-sm leading-relaxed text-[#090023]">{aktivArtikel.problemformulering}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-[#090023]">Text och kontext</h3>
                  <p className="text-sm leading-relaxed text-[#090023]">{aktivArtikel.textOchKontext}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-[#090023]">Språklig och exegetisk analys</h3>
                  <p className="text-base leading-relaxed text-[#090023]">
                    {aktivArtikel.exegetiskAnalys}
                    <sup className="text-xs font-bold text-[#F9F8F5] bg-[#090023] px-1 rounded ml-1 cursor-pointer">[1]</sup>
                  </p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-base font-bold text-[#090023]">Teologisk analys</h3>
                  <p className="text-base leading-relaxed text-[#090023]">{aktivArtikel.teologiskAnalys}</p>
                </div>

                <div className="space-y-2 border-t border-black/10 pt-4">
                  <h3 className="text-base font-bold text-[#090023]">Slutsats</h3>
                  <p className="text-base leading-relaxed text-[#090023]">{aktivArtikel.slutsats}</p>
                </div>

                {/* Referenser & Fotnoter enligt Chicago */}
                <div className="border-t border-black/10 pt-6 space-y-4 text-xs text-[#090023]">
                  <h3 className="font-bold uppercase tracking-wider text-[#090023]">Fotnoter &amp; Källor (Chicago)</h3>
                  <ol className="list-decimal list-inside space-y-1">
                    {aktivArtikel.fotnoter.map((fn: any) => (
                      <li key={fn.nr}>{fn.text}</li>
                    ))}
                  </ol>

                  <h3 className="font-bold uppercase tracking-wider text-[#090023] pt-2">Litteraturförteckning</h3>
                  <ul className="list-disc list-inside space-y-1">
                    {aktivArtikel.referenser.map((ref: string, i: number) => (
                      <li key={i}>{ref}</li>
                    ))}
                  </ul>
                </div>

                {/* Författare */}
                <div className="bg-[#f3f0ed] p-6 rounded-2xl flex items-center gap-4 border border-black/10">
                  <div className="size-12 rounded-full bg-[#090023] text-[#F9F8F5] flex items-center justify-center font-bold text-lg">
                    PA
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#090023]">{aktivArtikel.forfattare}</h4>
                    <p className="text-xs text-[#090023]">Bibellärare, skribent och debattör för Motbild – Bibliskt Unitariskt Nätverk.</p>
                  </div>
                </div>

                {/* Rosa CTA-knapp i VERSALER */}
                <div className="text-center pt-4">
                  <button
                    type="button"
                    className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#FFA8CD] hover:bg-[#ff94be] text-[#090023] font-bold text-xs uppercase tracking-widest transition-all cursor-pointer shadow-sm"
                  >
                    <Heart className="size-4 fill-current text-[#090023]" />
                    VISA DIN UPPSKATTNING
                  </button>
                </div>
              </article>
            ) : (
              /* ARTIKELLISTA */
              <div className="space-y-6">
                <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-[#090023] px-1">
                  <span>Hittade {filtreradeArtiklar.length} artikel/artiklar</span>
                </div>

                {filtreradeArtiklar.map((art) => (
                  <div
                    key={art.slug}
                    onClick={() => setAktivArtikel(art)}
                    className="bg-white border border-black/10 rounded-2xl p-7 shadow-xs hover:border-[#090023] transition-all cursor-pointer space-y-3"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      {art.taggar.map((t) => (
                        <span key={t} className="text-[10px] font-bold uppercase tracking-widest text-[#090023] bg-[#f3f0ed] px-2.5 py-0.5 rounded-full">
                          {t}
                        </span>
                      ))}
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-[#090023] hover:underline">
                      {art.titel}
                    </h2>

                    <p className="text-sm text-[#090023] leading-relaxed">
                      {art.ingress}
                    </p>

                    <div className="pt-2 flex items-center justify-between text-xs uppercase tracking-wider text-[#090023] border-t border-black/5">
                      <span>{art.forfattare} • {art.publicerad}</span>
                      <span className="font-bold text-[#090023] flex items-center gap-1">
                        LÄS ARTIKEL <ChevronRight className="size-3.5" />
                      </span>
                    </div>
                  </div>
                ))}

                {filtreradeArtiklar.length === 0 && (
                  <div className="bg-white border border-black/10 rounded-2xl p-10 text-center space-y-2">
                    <p className="font-bold text-[#090023]">Inga artiklar matchade din sökning.</p>
                    <p className="text-xs text-[#090023]">Prova ett annat sökord eller klicka på en kategori i trädet till vänster.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
