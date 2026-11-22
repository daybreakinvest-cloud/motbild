import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, BookOpen, Compass, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  return (
    <SiteLayout>
      {/* 1. HERO SECTION (BILDLÖS, CENTRERAD) */}
      <section className="w-full bg-[#090023] border-b border-white/10 py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-serif font-bold text-[#F9F8F5] leading-tight">
            Ge din tillbedjan värde och låt din själ befrias genom kompromisslös lydnad för Kristi ord om Fadern
          </h1>

          <p className="max-w-2xl mx-auto text-xl sm:text-2xl font-serif text-[#F9F8F5]/90 leading-relaxed">
            Låt inte Kyrkans traditioner diktera vad du ska tro om Gud. Betala priset, gå mot strömmen. Det smakar mer än det kostar.
          </p>
        </div>
      </section>

      {/* 2. SEKTION MED DE TRE KORTEN */}
      <section className="py-20 px-6 max-w-5xl mx-auto font-serif">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <div className="size-10 rounded-xl bg-[#f3f0ed] text-[#090023] flex items-center justify-center mb-4">
              <BookOpen className="size-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#090023]">
              Akademiskt djup
            </h3>
            <p className="text-base text-[#090023] leading-relaxed">
              Noggrann research med referenser till grundtexter och akademiska källor.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <div className="size-10 rounded-xl bg-[#f3f0ed] text-[#090023] flex items-center justify-center mb-4">
              <Compass className="size-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#090023]">
              Nya perspektiv
            </h3>
            <p className="text-base text-[#090023] leading-relaxed">
              Befriande och utmanande och för den som vågar följa tanken hela vägen.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <div className="size-10 rounded-xl bg-[#f3f0ed] text-[#090023] flex items-center justify-center mb-4">
              <Lightbulb className="size-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#090023]">
              Slutsatser som förändrar
            </h3>
            <p className="text-base text-[#090023] leading-relaxed">
              Utmanar det du tagit för givet.
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
