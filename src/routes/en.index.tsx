import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ArrowRight, BookOpen, Compass, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/en/")({
  component: EnglishIndexPage,
});

function EnglishIndexPage() {
  return (
    <SiteLayout>
      {/* 1. HERO SECTION */}
      <section className="w-full bg-[#090023] border-b border-white/10 py-20 md:py-28 px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-serif font-bold text-[#F9F8F5] leading-tight">
            Give value to your worship and let your soul be set free through uncompromising obedience to Christ’s words concerning the Father
          </h1>

          <p className="max-w-2xl mx-auto text-xl sm:text-2xl font-serif text-[#F9F8F5]/90 leading-relaxed">
            Do not let Church traditions dictate what you should believe about God. Pay the price, go against the current. It tastes far better than it costs.
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
              Well-founded articles with academic depth
            </h3>
            <p className="text-base text-[#090023] leading-relaxed">
              Thorough research with references to original texts and academic sources.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <div className="size-10 rounded-xl bg-[#f3f0ed] text-[#090023] flex items-center justify-center mb-4">
              <Compass className="size-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#090023]">
              Perspectives that open new doors
            </h3>
            <p className="text-base text-[#090023] leading-relaxed">
              An alternative viewpoint—challenging and liberating for those who dare to follow the thought all the way.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl border border-black/10 shadow-xs space-y-3">
            <div className="size-10 rounded-xl bg-[#f3f0ed] text-[#090023] flex items-center justify-center mb-4">
              <Lightbulb className="size-5" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#090023]">
              Conclusions that transform how you read the Bible
            </h3>
            <p className="text-base text-[#090023] leading-relaxed">
              Well-founded reasoning challenges what you have taken for granted.
            </p>
          </div>
        </div>

        {/* 3. ROSA CTA-KNAPP: VERSALER */}
        <div className="mt-14 text-center">
          <Link
            to="/en/articles"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#FFA8CD] hover:bg-[#ff94be] text-[#090023] font-bold text-xs uppercase tracking-widest transition-all shadow-sm"
          >
            ARTICLES <ArrowRight className="size-4 text-[#090023]" />
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
