import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/debatt")({
  component: DebattPage,
});

const DEBATT_MOMENT = [
  { tid: "18.00–18.10", moment: "INTRODUKTION", beskrivning: "Presentatören hälsar välkommen, presenterar kvällens ämne och lämnar över till moderatorn." },
  { tid: "18.10–18.30", moment: "PROPONENTENS ÖPPNINGSANFÖRANDE", beskrivning: "Huvudtes, centrala begrepp och exegetisk genomgång av bibeltexterna." },
  { tid: "18.30–18.50", moment: "OPPONENTENS ÖPPNINGSANFÖRANDE", beskrivning: "Motperspektiv, textanalys och argumentation mot den traditionella ståndpunkten." },
  { tid: "18.50–19.20", moment: "REPLIKER & BEMÖTANDE", beskrivning: "Båda debattörerna belyser svagheter i motståndarens argument och försvarar sin tes." },
  { tid: "19.20–19.40", moment: "FIKAPAUS & REFLEKTION", beskrivning: "Paus för samtal, ny energi och formulering av skriftliga frågor från publiken." },
  { tid: "19.40–20.10", moment: "KORSFÖRHÖR MELLAN DEBATTÖRERNA", beskrivning: "Korta, skarpa frågor och direkta svar under moderatorns ledning." },
  { tid: "20.10–20.45", moment: "PUBLIKFRÅGOR", beskrivning: "Moderatorn samlar in publikens frågor och fördelar ordet rättvist mellan båda sidor." },
  { tid: "20.45–21.00", moment: "SLUTANFÖRANDEN & AVSLUTNING", beskrivning: "Sammanfattande argument och avslutande budskap till församlingen och tittarna." },
];

function DebattPage() {
  return (
    <SiteLayout>
      {/* 1. HERO SECTION */}
      <section className="bg-[#090023] text-[#F9F8F5] py-20 md:py-24 px-6 border-b border-white/10 font-serif">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-xs uppercase tracking-widest text-[#F9F8F5]">
            PEDAGOGISK UTBILDNINGSFORM
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal leading-tight text-[#F9F8F5]">
            Varför offentliga debatter?
          </h1>
          <p className="text-base sm:text-lg text-[#F9F8F5] max-w-2xl mx-auto leading-relaxed">
            Debatten är inte målet – den är verktyget. Målet är att hjälpa publiken att själva tänka,
            studera och pröva argumenten mot Bibeln.
          </p>
        </div>
      </section>

      {/* 2. BRÖDTEXT */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-12 font-serif">
        <div className="space-y-6 text-[#090023] text-base sm:text-lg leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#090023]">
            SVENSK KRISTENHET OCH DET ÖPPNA SAMTALET
          </h2>
          <p>
            I Sverige är vi ovana vid offentlig debatt. Vi föredrar ofta samtal, konsensus och samförstånd.
            Inom kristenheten har formella debatter dessutom blivit ovanliga, särskilt kring de mest kontroversiella
            teologiska frågorna. Samtidigt lever vi i ett samhälle där människor dagligen möter konkurrerande
            perspektiv genom böcker, poddar, YouTube och sociala medier.
          </p>
          <p>
            Jesus gav inte sina lärjungar ett uttryckligt bud att hålla formella debatter. Han gav inte heller
            något bud att skriva böcker, producera filmer eller bygga webbplatser. Däremot möter vi gång på gång
            Jesus i offentliga meningsutbyten där han prövar argument, ställer frågor och utmanar etablerade föreställningar.
          </p>
          <p>
            Paulus argumenterade med judarna i synagogorna och mötte filosofer på Areopagen i Aten. Den tidiga
            kristna missionen präglades inte av tystnad inför olika perspektiv, utan av ett öppet försvar och en
            öppen prövning av tron.
          </p>
        </div>

        {/* CITATRUTA */}
        <div className="rounded-3xl bg-[#090023] text-[#F9F8F5] p-8 sm:p-10 border border-white/10 shadow-lg text-center space-y-4">
          <p className="text-xl sm:text-2xl italic text-[#F9F8F5] leading-relaxed">
            ”Vi är övertygade om att sanningen inte har något att frukta från en öppen och respektfull prövning.”
          </p>
          <p className="text-xs font-bold uppercase tracking-widest text-[#F9F8F5]">
            SYFTET ÄR INTE ATT UTSE VINNARE ELLER FÖRLORARE, UTAN ATT GE PUBLIKEN MÖJLIGHET ATT HÖRA BÅDA PERSPEKTIVEN.
          </p>
        </div>

        {/* 3. TIDSORDNING */}
        <div className="pt-8 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#090023] bg-[#f3f0ed] px-3.5 py-1.5 rounded-full border border-black/10 inline-block mb-3">
              FORMAT &amp; TIDSORDNING
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#090023]">
              SÅ GÅR EN DEBATT TILL
            </h2>
            <p className="text-sm text-[#090023] mt-2 leading-relaxed">
              En debattkväll varar ca 3 timmar inklusive fikapaus. Den genomförs under strikt ordnade och respektfulla
              former med en neutral moderator som ansvarar för talartider och ordning.
            </p>
          </div>

          <div className="space-y-3">
            {DEBATT_MOMENT.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-black/10 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="sm:w-1/4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#090023] bg-[#f3f0ed] px-2.5 py-1 rounded-lg">
                    <Clock className="size-3 text-[#090023]" />
                    {item.tid}
                  </span>
                </div>
                <div className="sm:w-3/4">
                  <h3 className="font-bold uppercase tracking-wider text-sm text-[#090023]">
                    {item.moment}
                  </h3>
                  <p className="text-xs text-[#090023] mt-0.5 leading-relaxed">
                    {item.beskrivning}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA TILL FÖRSAMLINGAR */}
          <div className="bg-[#f3f0ed] border border-black/10 rounded-3xl p-8 sm:p-10 text-center space-y-4 mt-12">
            <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wider text-[#090023]">
              VILL ER FÖRSAMLING STÅ SOM VÄRD FÖR EN DEBATT?
            </h3>
            <p className="text-sm text-[#090023] max-w-lg mx-auto leading-relaxed">
              Motbild står för planering, talare, moderator och produktion. Ni öppnar dörrarna och bjuder in er församling.
            </p>
            <div className="pt-2">
              <Link
                to="/medarrangor"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFA8CD] hover:bg-[#ff94be] text-[#090023] font-bold text-xs uppercase tracking-widest transition-all"
              >
                LÄS OM MEDARRANGÖRSKAP <ArrowRight className="size-3.5 text-[#090023]" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
