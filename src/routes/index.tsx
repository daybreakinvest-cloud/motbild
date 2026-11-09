import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, BookOpen, Compass, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/")({
  component: IndexPage,
});

function IndexPage() {
  return (
    <SiteLayout>
      {/* HERO SECTION */}
      <section className="bg-[#090023] text-[#F9F8F5] py-24 md:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal leading-tight text-[#F9F8F5] max-w-3xl mx-auto">
            Om inte sanningen gömmer sig för oss, behöver inte vi gömma oss för sanningen
          </h1>
          <p className="text-base sm:text-lg font-serif text-[#F9F8F5] max-w-2xl mx-auto leading-relaxed pt-2">
            Kyrkan har i två tusen år dikterat vad vi ska tro om Gud. De flesta ifrågasätter aldrig.
            Inte för att de undersökt och fått det bekräftat – utan för att ingen utmanat dem att tänka kritiskt.
          </p>
        </div>
      </section>

      {/* SEKTION MED KORT + ROSA CTA-KNAPP UNDER KORTEN */}
      <section className="py-20 px-6 max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <div className="size-10 rounded-xl bg-[#f3f0ed] text-[#090023] flex items-center justify-center mb-4">
              <BookOpen className="size-5" />
            </div>
            <h3 className="text-xl font-bold font-serif text-[#090023]">
              Välgrundade artiklar med akademiskt djup
            </h3>
            <p className="text-sm font-serif text-[#090023] leading-relaxed">
              Noggrann research med referenser till grundtexter och akademiska källor.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <div className="size-10 rounded-xl bg-[#f3f0ed] text-[#090023] flex items-center justify-center mb-4">
              <Compass className="size-5" />
            </div>
            <h3 className="text-xl font-bold font-serif text-[#090023]">
              Perspektiv som öppnar nya dörrar
            </h3>
            <p className="text-sm font-serif text-[#090023] leading-relaxed">
              En alternativ synvinkel – utmanande och befriande för den som vågar följa tanken hela vägen.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <div className="size-10 rounded-xl bg-[#f3f0ed] text-[#090023] flex items-center justify-center mb-4">
              <Lightbulb className="size-5" />
            </div>
            <h3 className="text-xl font-bold font-serif text-[#090023]">
              Slutsatser som förändrar hur du läser Bibeln
            </h3>
            <p className="text-sm font-serif text-[#090023] leading-relaxed">
              Välgrundade slutledningar utmanar det du tagit för givet.
            </p>
          </div>
        </div>

        {/* ROSA CTA-KNAPP UNDER KORTEN */}
        <div className="mt-14 text-center">
          <Link
            to="/artiklar"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#FFA8CD] hover:bg-[#ff94be] text-[#090023] font-sans font-bold text-xs uppercase tracking-wider transition-all shadow-sm"
          >
            Artiklar <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
