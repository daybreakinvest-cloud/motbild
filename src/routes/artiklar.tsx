import { createFileRoute } from "@tanstack/react-router";
import { useState, useMemo } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { Search, ChevronRight, ChevronDown, Heart, ArrowLeft, Calendar, User, X } from "lucide-react";

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

  // Betyg och omdöme state
  const [valtBetyg, setValtBetyg] = useState<number | null>(null);
  const [omdomeText, setOmdomeText] = useState("");
  const [omdomeSkickat, setOmdomeSkickat] = useState(false);

  // Popup för uppskattning / gåva
  const [visaDonationModal, setVisaDonationModal] = useState(false);

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
      {aktivArtikel ? (
        /* ==================================================================== */
        /* 2. DEDIKERAD LÄSSIDA FÖR ARTIKELN (TRÄD OCH SÖKRUTA ÄR HELT BORTA)   */
        /* ==================================================================== */
        <div className="py-12 md:py-16 px-6 max-w-3xl mx-auto font-serif">
          {/* BAKÅTPIL HÖGST UPP */}
          <div className="mb-8">
            <button
              type="button"
              onClick={() => {
                setAktivArtikel(null);
                setValtBetyg(null);
                setOmdomeText("");
                setOmdomeSkickat(false);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#090023] hover:underline cursor-pointer"
            >
              <ArrowLeft className="size-4" /> TILLBAKA TILL ARTIKLAR
            </button>
          </div>

          <article className="space-y-8">
            {/* Titel & Byline (Klassiska gemener) */}
            <div>
              <h1 className="text-3xl sm:text-5xl font-bold text-[#090023] leading-tight">
                {aktivArtikel.titel}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-xs text-[#090023] mt-4 pt-3 border-t border-black/10">
                <span className="flex items-center gap-1.5"><User className="size-3.5" /> Av {aktivArtikel.forfattare}</span>
                <span className="flex items-center gap-1.5"><Calendar className="size-3.5" /> Publicerad: {aktivArtikel.publicerad}</span>
                <span>Reviderad: {aktivArtikel.reviderad}</span>
              </div>
            </div>

            {/* Ingress */}
            <div className="text-base sm:text-lg italic text-[#090023] bg-[#f3f0ed] p-6 rounded-2xl border-l-4 border-[#090023] leading-relaxed">
              {aktivArtikel.ingress}
            </div>

            {/* Chicagomodell: Akademiska rubriker i gemener */}
            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#090023]">Sammanfattning</h2>
              <p className="text-base leading-relaxed text-[#090023]">{aktivArtikel.sammanfattning}</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#090023]">Problemformulering</h2>
              <p className="text-base leading-relaxed text-[#090023]">{aktivArtikel.problemformulering}</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#090023]">Text och kontext</h2>
              <p className="text-base leading-relaxed text-[#090023]">{aktivArtikel.textOchKontext}</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#090023]">Språklig och exegetisk analys</h2>
              <p className="text-base leading-relaxed text-[#090023]">
                {aktivArtikel.exegetiskAnalys}
                <sup className="text-xs font-bold text-[#F9F8F5] bg-[#090023] px-1 rounded ml-1 cursor-pointer">[1]</sup>
              </p>
            </div>

            <div className="space-y-3">
              <h2 className="text-xl font-bold text-[#090023]">Teologisk analys</h2>
              <p className="text-base leading-relaxed text-[#090023]">{aktivArtikel.teologiskAnalys}</p>
            </div>

            <div className="space-y-3 border-t border-black/10 pt-4">
              <h2 className="text-xl font-bold text-[#090023]">Slutsats</h2>
              <p className="text-base leading-relaxed text-[#090023]">{aktivArtikel.slutsats}</p>
            </div>

            {/* Fotnoter & Källor (Chicago) */}
            <div className="border-t border-black/10 pt-8 space-y-5 text-sm text-[#090023]">
              <h3 className="font-bold uppercase tracking-wider text-xs text-[#090023]">Fotnoter &amp; Källor (Chicago)</h3>
              <ol className="list-decimal list-inside space-y-1.5 pl-2">
                {aktivArtikel.fotnoter.map((fn: any) => (
                  <li key={fn.nr}>{fn.text}</li>
                ))}
              </ol>

              <h3 className="font-bold uppercase tracking-wider text-xs text-[#090023] pt-4">Litteraturförteckning</h3>
              <ul className="list-disc list-inside space-y-1.5 pl-2">
                {aktivArtikel.referenser.map((ref: string, i: number) => (
                  <li key={i}>{ref}</li>
                ))}
              </ul>
            </div>

            {/* Författarpresentation */}
            <div className="bg-[#f3f0ed] p-6 rounded-2xl flex items-center gap-4 border border-black/10 mt-8">
              <div className="size-12 rounded-full bg-[#090023] text-[#F9F8F5] flex items-center justify-center font-bold text-lg shrink-0">
                PA
              </div>
              <div>
                <h4 className="font-bold text-base text-[#090023]">{aktivArtikel.forfattare}</h4>
                <p className="text-xs text-[#090023] mt-0.5">Bibellärare, skribent och debattör.</p>
              </div>
            </div>

            {/* BETYGSÄTTNING (1–5) OCH OMDÖME */}
            <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8 space-y-4 shadow-xs mt-10">
              <h3 className="text-lg font-bold text-[#090023]">
                Vad tyckte du om artikelns akademiska kvalitet?
              </h3>
              
              {omdomeSkickat ? (
                <div className="p-4 bg-[#f3f0ed] rounded-xl text-sm text-[#090023] font-semibold">
                  Tack för ditt omdöme och ditt betyg!
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Betygsväljare 1-5 */}
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

                  {/* Omdömesfält */}
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
                    onClick={() => {
                      if (!valtBetyg) {
                        alert("Välj ett betyg mellan 1 och 5.");
                        return;
                      }
                      setOmdomeSkickat(true);
                    }}
                    className="px-6 py-3 bg-[#090023] hover:bg-black text-[#F9F8F5] rounded-xl font-bold text-xs uppercase tracking-widest transition-all cursor-pointer"
                  >
                    SKICKA OMDÖME
                  </button>
                </div>
              )}
            </div>

            {/* GÅVA / UPPSKATTNING (ROSA CTA-KNAPP) */}
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

          {/* GÅVO-POPUP (MODAL) */}
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
                  <h3 className="text-2xl font-bold text-[#090023]">
                    Visa din uppskattning
                  </h3>
                  <p className="text-sm text-[#090023] leading-relaxed">
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
      ) : (
        /* ==================================================================== */
        /* 1. BIBLIOTEKSVYN (HERO, DIN FÖRTEX, KATEGORITRÄD OCH KORT)           */
        /* ==================================================================== */
        <>
          {/* HERO SECTION */}
          <section className="bg-[#090023] text-[#F9F8F5] py-20 px-6 border-b border-white/10 font-serif">
            <div className="max-w-4xl mx-auto space-y-6 text-center">
              {/* Stor rubrik: gemener */}
              <h1 className="text-3xl sm:text-5xl font-normal text-[#F9F8F5]">
                Bibliskt perspektiv som utmanar och klargör
              </h1>

              {/* Hook / underrubrik: VERSALER */}
              <p className="text-xs sm:text-sm uppercase tracking-wider text-[#F9F8F5] max-w-2xl mx-auto leading-relaxed pt-1">
                FÖR DEN SOM VÅGAR MÖTA GRUNDTEXTEN UTAN FÖRUTFATTADE MENINGAR – DÄR MOTIVERAT TÄNKANDE OCH SELEKTIV PERCEPTION FÅR GE VIKA FÖR SKRIFTENS EGEN RÖST, OCH DÄR DEN KOGNITIVA DISSONANSEN FÖRVANDLAS TILL INTELLEKTUELL OCH ANDLIG FRIHET.
              </p>
            </div>
          </section>

          {/* HUVUDINNEHÅLL */}
          <section className="py-12 px-6 max-w-6xl mx-auto font-serif space-y-12">
            {/* DIN FÖRTEX (ORDAGRANT ENLIGT DINA FYRA STYCKEN) */}
            <div className="bg-white border border-black/10 rounded-3xl p-8 sm:p-10 shadow-xs space-y-4 text-base leading-relaxed text-[#090023]">
              <p>
                Artiklarna utgår från ett bibliskt unitariskt perspektiv (se “Om oss”) och syftar till sakligt sanningssökande: självständig bibelforskning, språklig exegetik och källkritisk analys fri från kyrkotraditionens förutfattade meningar.
              </p>
              <p>
                Kritik av metod, texttrohet, logik och grundtextreferenser är välkommen. Att enbart hänvisa till annan samfundstradition eller dogmatiska formler tillför inget och beaktas inte.
              </p>
              <p>
                Texterna vill utmana läsaren att se bortom motiverat tänkande som hindrar Skriftens egen röst. Nederst kan du betygsätta undersökningen (1-5) och lämna ett kort omdöme om dess sakliga kvalitet.
              </p>
              <p>
                Varje artikel kräver tiotals timmars forsknings- och skrivarbete och produceras helt oberoende. Vill du stödja fortsatt fördjupning och publicering finns möjlighet till ett personligt bidrag i anslutning till artikeln.
              </p>
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
                  <span>{filtreradeArtiklar.length === 1 ? "Visar 1 artikel" : `Visar ${filtreradeArtiklar.length} artiklar`}</span>
                </div>

                {filtreradeArtiklar.map((art) => (
                  <div
                    key={art.slug}
                    onClick={() => {
                      setAktivArtikel(art);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
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

                    <div className="pt-2 flex items-center justify-between text-xs text-[#090023] border-t border-black/5">
                      <span>{art.forfattare} • {art.publicerad}</span>
                      <span className="font-bold text-[#090023] flex items-center gap-1 uppercase tracking-wider text-[11px]">
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
            </div>
          </section>
        </>
      )}
    </SiteLayout>
  );
}
