import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Clock, ShieldCheck, HelpCircle, ArrowRight, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/debatt")({
  component: DebattPage,
});

const DEBATT_MOMENT = [
  { tid: "18.00–18.10", moment: "Introduktion", beskrivning: "Presentatören hälsar välkommen, presenterar kvällens ämne och lämnar över till moderatorn." },
  { tid: "18.10–18.30", moment: "Proponentens öppningsanförande", beskrivning: "Huvudtes, centrala begrepp och exegetisk genomgång av bibeltexterna." },
  { tid: "18.30–18.50", moment: "Opponentens öppningsanförande", beskrivning: "Motperspektiv, textanalys och argumentation mot den traditionella ståndpunkten." },
  { tid: "18.50–19.20", moment: "Repliker & Bemötande", beskrivning: "Båda debattörerna belyser svagheter i motståndarens argument och försvarar sin tes." },
  { tid: "19.20–19.40", moment: "Fikapaus & Reflektion", beskrivning: "Paus för samtal, ny energi och formulering av skriftliga frågor från publiken." },
  { tid: "19.40–20.10", moment: "Korsförhör mellan debattörerna", beskrivning: "Korta, skarpa frågor och direkta svar under moderatorns ledning." },
  { tid: "20.10–20.45", moment: "Publikfrågor", beskrivning: "Moderatorn samlar in publikens frågor och fördelar ordet rättvist mellan båda sidor." },
  { tid: "20.45–21.00", moment: "Slutanföranden & Avslutning", beskrivning: "Sammanfattande argument och avslutande budskap till församlingen och tittarna." },
];

function DebattPage() {
  return (
    <SiteLayout>
      {/* 1. HERO SECTION */}
      <section className="bg-[#090023] text-[#F9F8F5] py-20 md:py-24 px-6 border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-xs font-sans uppercase tracking-widest text-[#FFA8CD]">
            Pedagogisk utbildningsform
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-normal leading-tight text-white">
            Varför offentliga debatter?
          </h1>
          <p className="text-base sm:text-lg font-serif text-[#F9F8F5]/85 max-w-2xl mx-auto leading-relaxed">
            Debatten är inte målet – den är verktyget. Målet är att hjälpa publiken att själva tänka,
            studera och pröva argumenten mot Bibeln.
          </p>
        </div>
      </section>

      {/* 2. VARFÖR DEBATT? (TEXT & BIBLISK GRUND) */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-12">
        <div className="space-y-6 font-serif text-[#090023]/85 text-base sm:text-lg leading-relaxed">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#090023]">
            Svensk kristenhet och det öppna samtalet
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

        {/* CITATRUTA: Sanningen tål att prövas */}
        <div className="rounded-3xl bg-[#090023] text-white p-8 sm:p-10 border border-white/10 shadow-lg text-center space-y-4">
          <p className="text-xl sm:text-2xl font-serif italic text-[#FFA8CD] leading-relaxed">
            ”Vi är övertygade om att sanningen inte har något att frukta från en öppen och respektfull prövning.”
          </p>
          <p className="text-xs font-sans uppercase tracking-widest text-white/60">
            Syftet är inte att utse vinnare eller förlorare, utan att ge publiken möjlighet att höra båda perspektiven.
          </p>
        </div>

        {/* 3. SÅ GÅR EN DEBATT TILL (SCHEMA & REGLER) */}
        <div className="pt-8 space-y-8">
          <div>
            <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#090023] bg-[#f3f0ed] px-3 py-1 rounded-full border border-black/10">
              Format &amp; Tidsordning
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#090023] mt-3">
              Så går en debatt till
            </h2>
            <p className="text-sm font-sans text-[#090023]/70 mt-2">
              En debattkväll varar ca 3 timmar inklusive fikapaus. Den genomförs under strikt ordnade och respektfulla
              former med en neutral moderator som ansvarar för talartider och ordning.
            </p>
          </div>

          <div className="space-y-3 font-sans">
            {DEBATT_MOMENT.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-black/10 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="sm:w-1/4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#090023] bg-[#f3f0ed] px-2.5 py-1 rounded-lg">
                    <Clock className="size-3 text-[#090023]" />
                    {item.tid}
                  </span>
                </div>
                <div className="sm:w-3/4">
                  <h3 className="font-serif font-bold text-base text-[#090023]">
                    {item.moment}
                  </h3>
                  <p className="text-xs text-[#090023]/70 font-sans mt-0.5 leading-relaxed">
                    {item.beskrivning}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA TILL FÖRSAMLINGAR */}
          <div className="bg-[#f3f0ed] border border-black/10 rounded-3xl p-8 text-center space-y-4 mt-12">
            <h3 className="text-xl font-serif font-bold text-[#090023]">
              Vill er församling stå som värd för en debatt?
            </h3>
            <p className="text-sm font-sans text-[#090023]/75 max-w-lg mx-auto">
              Motbild står för planering, talare, moderator och produktion. Ni öppnar dörrarna och bjuder in er församling.
            </p>
            <div className="pt-2">
              <Link
                to="/medarrangor"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#090023] hover:bg-black text-white font-sans font-bold text-xs uppercase tracking-wider transition-all"
              >
                Läs om medarrangörskap <ArrowRight className="size-3.5 text-[#FFA8CD]" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
