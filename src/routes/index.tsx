import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, BookOpen, Compass, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  return (
    <SiteLayout>
      {/* 1. HERO SECTION */}
      <section className="relative w-full min-h-[500px] md:min-h-[560px] flex items-center bg-[#090023] border-b border-white/10 overflow-hidden">
        {/* Bakgrundsbild låst i nederkant så att fötterna och marken syns */}
        <div className="absolute inset-0 z-0">
          <img
  src="/hero-debatt.png"
  alt="Motbild debatt"
  className="w-full h-full object-cover object-[left_22%] scale-95"
/>
          {/* Mörkare toning till höger för maximal läsbarhet */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#090023]/60 to-[#090023]/95" />
        </div>

        {/* Texten till höger */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 w-full py-10 flex justify-end">
          <div className="w-full md:w-7/12 lg:w-1/2 space-y-4 text-left">
            {/* Huvudrubrik (H1) */}
            <h1 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#F9F8F5] leading-snug">
              Ge din tillbedjan värde, och låt din själ befrias genom kompromisslös lydnad för Kristi ord om Fadern
            </h1>

            {/* Underrubrik (tydligt mindre, men i samma feta Book Antiqua) */}
            <h2 className="text-sm sm:text-base md:text-lg font-serif font-bold text-[#F9F8F5] leading-relaxed">
              Låt inte Kyrkans traditioner diktera vad du ska tro om Gud. Betala priset, gå mot strömmen. Det smakar mer än det kostar.
            </h2>
          </div>
        </div>
      </section>

      {/* 2. SEKTION MED DE TRE KORTEN */}
      <section className="py-20 px-6 max-w-5xl mx-auto font-serif">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <div className="size-10 rounded-xl bg-[#f3f0ed] text-[#090023] flex items-center justify-center mb-4">
              <BookOpen className="size-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#090023]">
              Välgrundade artiklar med akademiskt djup
            </h3>
            <p className="text-sm text-[#090023] leading-relaxed">
              Noggrann research med referenser till grundtexter och akademiska källor.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <div className="size-10 rounded-xl bg-[#f3f0ed] text-[#090023] flex items-center justify-center mb-4">
              <Compass className="size-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#090023]">
              Perspektiv som öppnar nya dörrar
            </h3>
            <p className="text-sm text-[#090023] leading-relaxed">
              En alternativ synvinkel – utmanande och befriande för den som vågar följa tanken hela vägen.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <div className="size-10 rounded-xl bg-[#f3f0ed] text-[#090023] flex items-center justify-center mb-4">
              <Lightbulb className="size-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#090023]">
              Slutsatser som förändrar hur du läser Bibeln
            </h3>
            <p className="text-sm text-[#090023] leading-relaxed">
              Välgrundade slutledningar utmanar det du tagit för givet.
            </p>
          </div>
        </div>

        {/* 3. ROSA CTA-KNAPP: VERSALER */}
        <div className="mt-14 text-center">
          <Link
            to="/artiklar"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#FFA8CD] hover:bg-[#ff94be] text-[#090023] font-bold text-xs uppercase tracking-widest transition-all shadow-sm"
          >
            ARTIKLAR <ArrowRight className="size-4 text-[#090023]" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
