import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/om-oss")({
  component: OmOssPage,
});

function OmOssPage() {
  return (
    <SiteLayout>
      {/* 1. HERO SECTION */}
      <section className="bg-[#090023] text-[#F9F8F5] py-20 md:py-24 px-6 border-b border-white/10 font-serif">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-10">
          <div className="text-center md:text-left space-y-5">
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-xs uppercase tracking-widest text-[#F9F8F5]">
              IDENTITET &amp; UPPDRAG
            </div>
            <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#F9F8F5]">
              Vårt uppdrag och vår tro
            </h1>
            <p className="text-xl sm:text-2xl text-[#F9F8F5] max-w-2xl mx-auto md:mx-0 leading-relaxed">
              På ett bredare plan vill vi uppmuntra till kritiskt tänkande genom utbildning, debatter och samtal.
              Mer specifikt är syftet att på ett respektfullt sätt lyfta fram ett bibliskt unitariskt perspektiv och ge människor möjlighet
              att kontrastera det mot den traditionella synen på Gud.
            </p>
          </div>

          <div className="mx-auto size-64 sm:size-72 rounded-full bg-white overflow-hidden shrink-0">
            <img
              src="/peter_abramsgard_portrattbild.png"
              alt="Peter Abramsgård"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </section>

      {/* 2. TROSGRUND */}
      <section className="py-20 px-6 max-w-5xl mx-auto font-serif">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#090023]">
            Trosgrund
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Fadern */}
          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#090023] bg-[#f3f0ed] px-3 py-1 rounded-full">
              FADERN
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#090023] pt-2">
              Den ende sanne Guden
            </h3>
            <p className="text-base text-[#090023] leading-relaxed">
              Vi tror som Kristus att Fadern är den ende sanne Guden (Joh 17:3). Ingen annan är Gud i samma mening som Fadern.
            </p>
          </div>

          {/* Sonen */}
          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#090023] bg-[#f3f0ed] px-3 py-1 rounded-full">
              SONEN
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#090023] pt-2">
              Guds enfödde Son &amp; Messias
            </h3>
            <p className="text-base text-[#090023] leading-relaxed">
              Jesus Kristus är till sin natur en icke-preexistent människa (1 Tim 2:5), född av kvinna och smord till Messias och Herre.
            </p>
          </div>

          {/* Anden */}
          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#090023] bg-[#f3f0ed] px-3 py-1 rounded-full">
              ANDEN
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#090023] pt-2">
              Guds kraft &amp; närvaro
            </h3>
            <p className="text-base text-[#090023] leading-relaxed">
              Den helige Ande är inte en tredje person i en gudom. Begreppet syftar på Faderns egen ande och verksamhet, och ibland på Kristus själv.
            </p>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-2xl bg-[#f3f0ed] border border-black/10 text-center text-lg text-[#090023]">
          <p>
            Vi tror att Treenighetsläran är en mänsklig konstruktion som utvecklats över tid genom så kallad progressiv uppenbarelse.
            Biblisk unitarisk tro berör fler områden, vilket återspeglas i artiklarna – uppdraget är koncentrerat till kärnan i tron.
          </p>
        </div>
      </section>
      <section className="bg-white py-20 px-6 border-t border-b border-black/10 font-serif">
        <div className="max-w-4xl mx-auto space-y-12">
              {/* De 4 besluten */}
          <div className="bg-[#f3f0ed] rounded-3xl p-8 sm:p-10 border border-black/10 space-y-6">
            <h3 className="text-xl font-bold text-[#090023]">
              Vi är fast beslutna
            </h3>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="font-bold text-base text-[#090023] bg-white size-8 rounded-full flex items-center justify-center shrink-0 border border-black/10">
                  1
                </span>
                <div>
                  <h4 className="font-bold text-lg sm:text-xl text-[#090023]">
                    Att alltid söka sanningen i Skriften
                  </h4>
                  <p className="text-base text-[#090023] mt-1 leading-relaxed">
                    Oavsett samfundstradition och människors åsikter. Det handlar om exegetik och textanalys, men framför allt om att våga ifrågasätta felaktiga slutsatser.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="font-bold text-base text-[#090023] bg-white size-8 rounded-full flex items-center justify-center shrink-0 border border-black/10">
                  2
                </span>
                <div>
                  <h4 className="font-bold text-lg sm:text-xl text-[#090023]">
                    Att aldrig komma till Skriften med en förutfattad mening
                  </h4>
                  <p className="text-base text-[#090023] mt-1 leading-relaxed">
                    Att stå fri från fördomsbekräftelse, selektiv perception och kognitiv dissonans.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="font-bold text-base text-[#090023] bg-white size-8 rounded-full flex items-center justify-center shrink-0 border border-black/10">
                  3
                </span>
                <div>
                  <h4 className="font-bold text-lg sm:text-xl text-[#090023]">
                    Att alltid hålla Skriftens sanning som högsta auktoritet
                  </h4>
                  <p className="text-base text-[#090023] mt-1 leading-relaxed">
                    Det spelar ingen roll vad traditioner och teologer säger om det inte stämmer med Skriften.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="font-bold text-base text-[#090023] bg-white size-8 rounded-full flex items-center justify-center shrink-0 border border-black/10">
                  4
                </span>
                <div>
                  <h4 className="font-bold text-lg sm:text-xl text-[#090023]">
                    Att alltid och i varje sammanhang stå upp för och dela sanningen
                  </h4>
                  <p className="text-base text-[#090023] mt-1 leading-relaxed">
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
