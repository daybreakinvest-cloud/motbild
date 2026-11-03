import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/stadgar")({
  component: StadgarPage,
});

const STADGAR = [
  {
    nummer: "1",
    titel: "Namn",
    innehall: [
      "Föreningens namn är Motbild – Bibliskt Unitariskt Nätverk.",
    ],
  },
  {
    nummer: "2",
    titel: "Säte",
    innehall: [
      "Föreningen har sitt säte i Stockholm.",
    ],
  },
  {
    nummer: "3",
    titel: "Syfte",
    innehall: [
      "Föreningens syfte är att lyfta fram det bibliskt unitariska perspektivet och ge människor möjlighet att pröva, kontrastera och kritiskt granska olika perspektiv kring Gud och Kristus genom undervisning, debatter, seminarier, utbildningar och öppna samtal.",
      "Föreningen vill uppmuntra självständig prövning, kritiskt tänkande och ett öppet sanningssökande genom att belysa kontrasterande perspektiv och utmana förutfattade meningar och okritisk acceptans av traditioner och etablerade uppfattningar.",
    ],
  },
  {
    nummer: "4",
    titel: "Trosgrund",
    innehall: [
      "Fadern är den ende sanne Guden.",
      "Jesus Kristus är Guds enfödde Son och Messias.",
      "Jesus Kristus är icke-preexistent.",
      "Jesus Kristus är inte Gud i samma mening som Fadern.",
    ],
  },
  {
    nummer: "5",
    titel: "Styrelse",
    innehall: [
      "Styrelsen består av ordförande, kassör/vice ordförande samt minst en (1) övrig ledamot, det vill säga minst tre ledamöter totalt.",
      "Styrelsen väljs av årsmötet för ett år i taget.",
      "Valberedning utses av årsmötet och består av minst en person. Valberedningen har till uppgift att inför årsmötet föreslå kandidater till styrelsen.",
      "Föreningens firma tecknas av ordföranden gemensamt med vice ordföranden. (Alternativt: av ordföranden tillsammans med en annan styrelseledamot som särskilt utsetts av styrelsen.)",
      "Vice ordföranden ansvarar för medlemsregistret samt registrering av nya medlemmar.",
    ],
  },
  {
    nummer: "6",
    titel: "Årsmöte",
    innehall: [
      "Årsmöte ska hållas en gång per år.",
      "Årsmötet väljer styrelse, valberedning, behandlar verksamhetsberättelse och ekonomisk redovisning samt behandlar frågor som lagts fram av styrelsen eller medlemmarna.",
      "Kallelse till årsmöte ska skickas till medlemmarna senast 14 dagar före mötet.",
      "Extra årsmöte kan sammankallas av styrelsen när behov föreligger. Kallelse till extra årsmöte ska skickas senast 7 dagar före mötet. Vid extra årsmöte får endast de ärenden behandlas som angivits i kallelsen.",
    ],
  },
  {
    nummer: "7",
    titel: "Medlemskap",
    innehall: [
      "Medlemskap är avgiftsfritt.",
      "Medlemskap erhålls genom att acceptera föreningens syfte, trosgrund och stadgar samt registrera sig som medlem. Varje medlem har en röst på årsmötet.",
      "Medlemskapet upphör automatiskt om medlemmen själv begär utträde eller om det tydligt framkommer att medlemmen inte längre delar föreningens syfte, trosgrund eller stadgar.",
    ],
  },
  {
    nummer: "8",
    titel: "Dokumentation",
    innehall: [
      "Årsmöten, medlemsmöten och styrelsemöten ska spelas in.",
      "Inspelningarna används endast för att upprätta protokoll och ska raderas senast 30 dagar efter att protokollet justerats, om inte styrelsen av särskilda skäl beslutar att spara en inspelning under längre tid. Inspelningarna är endast tillgängliga för ordförande, sekreterare och kassör/vice ordförande.",
      "Protokoll ska bevaras och arkiveras av föreningen.",
    ],
  },
  {
    nummer: "9",
    titel: "Verksamhetsår",
    innehall: [
      "Föreningens verksamhetsår och räkenskapsår följer kalenderåret.",
    ],
  },
  {
    nummer: "10",
    titel: "Stadgeändring",
    innehall: [
      "Ändring av stadgarna kräver beslut av årsmötet med minst två tredjedelars majoritet.",
    ],
  },
  {
    nummer: "11",
    titel: "Upplösning",
    innehall: [
      "Vid upplösning av föreningen fattar årsmötet beslut om hur föreningens tillgångar ska fördelas. Beslut om upplösning kräver minst två tredjedelars majoritet.",
    ],
  },
];

function StadgarPage() {
  return (
    <SiteLayout>
      {/* 1. HERO SECTION */}
      <section className="bg-[#090023] text-[#F9F8F5] py-20 md:py-24 px-6 border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-xs font-sans uppercase tracking-widest text-[#FFA8CD]">
            Officiella Föreningsstadgar
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-normal leading-tight text-white">
            Stadgar för Motbild
          </h1>
          <p className="text-sm sm:text-base font-serif text-[#F9F8F5]/75 max-w-xl mx-auto leading-relaxed">
            Motbild – Bibliskt Unitariskt Nätverk (Säte: Stockholm)
          </p>
        </div>
      </section>

      {/* 2. STADGETEXT */}
      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="bg-white border border-black/10 rounded-3xl p-8 sm:p-12 shadow-sm space-y-10">
          {STADGAR.map((s) => (
            <div key={s.nummer} className="border-b border-black/10 pb-8 last:border-b-0 last:pb-0 space-y-3">
              <div className="flex items-baseline gap-3">
                <span className="font-sans font-bold text-sm text-[#090023] bg-[#f3f0ed] size-7 rounded-full flex items-center justify-center shrink-0 border border-black/10">
                  {s.nummer}
                </span>
                <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#090023]">
                  {s.titel}
                </h2>
              </div>
              <div className="pl-10 space-y-2 text-sm sm:text-base font-serif text-[#090023]/85 leading-relaxed">
                {s.innehall.map((stycke, i) => (
                  <p key={i}>{stycke}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
