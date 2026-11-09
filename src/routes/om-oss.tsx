import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/om-oss")({
  component: OmOssPage,
});

function OmOssPage() {
  return (
    <SiteLayout>
      {/* 1. HERO SECTION */}
      <section className="bg-[#090023] text-[#F9F8F5] py-20 md:py-24 px-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-xs font-sans uppercase tracking-widest text-[#F9F8F5]">
            Identitet &amp; Uppdrag
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-normal leading-tight text-[#F9F8F5]">
            Vårt uppdrag och vår tro
          </h1>
          <p className="text-base sm:text-lg font-serif text-[#F9F8F5] max-w-2xl mx-auto leading-relaxed">
            På ett bredare plan vill vi uppmuntra till kritiskt tänkande genom utbildning, debatter och samtal.
            Mer specifikt är syftet att lyfta fram ett bibliskt unitariskt perspektiv och ge människor möjlighet
            att kontrastera det mot den traditionella synen på Gud, på ett respektfullt sätt.
          </p>
        </div>
      </section>

      {/* 2. VÅR TROSGRUND (3 KORT) */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#090023]">
            Vår trosgrund
          </h2>
          <p className="text-xs font-sans font-semibold uppercase tracking-wider text-[#090023] mt-2">
            GRUNDAD UTESLUTANDE I BIBELNS EGNA GRUNDTEXTER
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Fadern */}
          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-xs space-y-3">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#090023] bg-[#f3f0ed] px-3 py-1 rounded-full">
              Fadern
            </span>
            <h3 className="text-xl font-serif font-bold text-[#090023] pt-2">
              Den ende sanne Guden
            </h3>
            <p className="text-sm text-[#090023] leading-relaxed font-serif">
              Vi tror som Kristus att Fadern är den ende sanne Guden (Joh 17:3). Ingen annan är Gud i samma mening som Fadern.
            </p>
          </div>

          {/* Sonen */}
          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-xs space-y-3">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#090023] bg-[#f3f0ed] px-3 py-1 rounded-full">
              Sonen
            </span>
            <h3 className="text-xl font-serif font-bold text-[#090023] pt-2">
              Guds enfödde Son &amp; Messias
            </h3>
            <p className="text-sm text-[#090023] leading-relaxed font-serif">
              Jesus Kristus är till sin natur en icke-preexistent människa (1 Tim 2:5), född av kvinna och smord till Messias och Herre.
            </p>
          </div>

          {/* Anden */}
          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-xs space-y-3">
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#090023] bg-[#f3f0ed] px-3 py-1 rounded-full">
              Anden
            </span>
            <h3 className="text-xl font-serif font-bold text-[#090023] pt-2">
              Guds kraft &amp; närvaro
            </h3>
            <p className="text-sm text-[#090023] leading-relaxed font-serif">
              Den helige Ande är inte en tredje person i en gudom. Begreppet syftar på Faderns egen ande och verksamhet, och ibland på Kristus själv.
            </p>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-2xl bg-[#f3f0ed] border border-black/10 text-center font-serif text-sm text-[#090023]">
          <p>
            Vi tror att Treenighetsläran är en mänsklig konstruktion som utvecklats över tid genom så kallad progressiv uppenbarelse.
            Biblisk unitarisk tro berör fler områden, vilket återspeglas i artiklarna – men vårt uppdrag är koncentrerat till kärnan i tron.
          </p>
        </div>
      </section>

      {/* 3. STORY: PETER ABRAMSGÅRD & DE FYRA BESLUTEN */}
      <section className="bg-white py-20 px-6 border-t border-b border-black/10">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#F9F8F5] bg-[#090023] px-3.5 py-1.5 rounded-full inline-block mb-4">
              Bakgrund &amp; Erfarenhet
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#090023]">
              Var inte en JA-sägare – vägen till frihet
            </h2>
            <div className="text-base font-serif text-[#090023] space-y-4 mt-6 leading-relaxed">
              <p>
                Jag har varit troende i 37 år. Från den dag jag kom till tro hade jag en längtan efter sanningen i Guds Ord.
                Som flitig bibelstudent krockade mina upptäckter ofta med mitt samfunds traditionella tolkningar.
              </p>
              <p>
                År 2011 började jag för första gången på allvar studera Treenigheten och Jesu gudom. Syftet var från början
                att en gång för alla bevisa Treenighetens riktighet. Istället ledde det mig till en helt annan plats.
              </p>
              <p>
                Jag såg hur läran om Treenigheten var ohållbar i ljuset av grundtexterna. Jesus är inte preexistent i traditionell
                mening och inte Gud i samma mening som Fadern. Även om upptäckten först skapade tomhet och sorg, ledde den i
                förlängningen till en enorm frihet och glädje. Jesus hade inte blivit mindre – han hade blivit större och sannare.
              </p>
            </div>
          </div>

          {/* De 4 besluten */}
          <div className="bg-[#f3f0ed] rounded-3xl p-8 sm:p-10 border border-black/10 space-y-6">
            <h3 className="text-xl font-serif font-bold text-[#090023]">
              Jag beslutar:
            </h3>

            <div className="space-y-4 font-serif">
              <div className="flex gap-4 items-start">
                <span className="font-sans font-bold text-base text-[#090023] bg-white size-8 rounded-full flex items-center justify-center shrink-0 border border-black/10">
                  1
                </span>
                <div>
                  <h4 className="font-bold text-base text-[#090023]">
                    Att alltid söka sanningen i Skriften
                  </h4>
                  <p className="text-sm text-[#090023] mt-1 leading-relaxed font-serif">
                    Oavsett samfundstradition och människors åsikter. Det handlar om exegetik och textanalys, men framför allt om att våga ifrågasätta felaktiga slutsatser.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="font-sans font-bold text-base text-[#090023] bg-white size-8 rounded-full flex items-center justify-center shrink-0 border border-black/10">
                  2
                </span>
                <div>
                  <h4 className="font-bold text-base text-[#090023]">
                    Att aldrig komma till Skriften med en förutfattad mening
                  </h4>
                  <p className="text-sm text-[#090023] mt-1 leading-relaxed font-serif">
                    Att stå fri från fördomsbekräftelse, selektiv perception och kognitiv dissonans.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="font-sans font-bold text-base text-[#090023] bg-white size-8 rounded-full flex items-center justify-center shrink-0 border border-black/10">
                  3
                </span>
                <div>
                  <h4 className="font-bold text-base text-[#090023]">
                    Att alltid hålla Skriftens sanning som högsta auktoritet
                  </h4>
                  <p className="text-sm text-[#090023] mt-1 leading-relaxed font-serif">
                    Det spelar ingen roll vad traditioner och teologer säger om det inte stämmer med Skriften.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="font-sans font-bold text-base text-[#090023] bg-white size-8 rounded-full flex items-center justify-center shrink-0 border border-black/10">
                  4
                </span>
                <div>
                  <h4 className="font-bold text-base text-[#090023]">
                    Att alltid och i varje sammanhang stå upp för och dela sanningen
                  </h4>
                  <p className="text-sm text-[#090023] mt-1 leading-relaxed font-serif">
                    Ibland gör sanningen ont, men i förlängningen är den det enda som befriar.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
