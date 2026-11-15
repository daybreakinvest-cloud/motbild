import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/cookiepolicy")({
  component: CookiepolicyPage,
});

function CookiepolicyPage() {
  return (
    <SiteLayout>
      {/* 1. HERO SECTION */}
      <section className="bg-[#090023] text-[#F9F8F5] py-20 md:py-24 px-6 border-b border-white/10 font-serif text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-xs uppercase tracking-widest text-[#F9F8F5]">
            Cookies &amp; Dataskydd
          </div>
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#F9F8F5]">
            Cookiepolicy
          </h1>
          <p className="text-xl sm:text-2xl text-[#F9F8F5] max-w-2xl mx-auto leading-relaxed">
            Information om hur motbild.se använder cookies och liknande tekniker.
          </p>
        </div>
      </section>

      {/* 2. JURIDISK TEXT (Blåsvart kort på offwhite bakgrund) */}
      <section className="py-20 px-6 max-w-4xl mx-auto font-serif">
        <div className="bg-[#090023] border border-white/15 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-10 text-base leading-relaxed text-[#F9F8F5]">
          <div className="border-b border-white/10 pb-8 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F9F8F5]">1. Vad är cookies?</h2>
            <p>
              En cookie (kaka) är en liten textfil som en webbplats begär att få spara på din dator, surfplatta eller mobiltelefon. Cookies används vanligtvis för att webbplatsen ska fungera tekniskt eller för att analysera hur den används.
            </p>
          </div>

          <div className="border-b border-white/10 pb-8 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F9F8F5]">2. Hur motbild.se använder cookies</h2>
            <p>
              Motbild använder inga cookies för marknadsföring, annonsering eller tredjepartsspårning. Vi samlar inte heller in beteendedata via analysverktyg från tredje part.
            </p>
            <p className="mt-2">
              Endast strikt nödvändiga tekniska mekanismer kan förekomma för att webbplatsen, sidnavigeringen och säkerheten vid formulärutskick ska fungera korrekt.
            </p>
          </div>

          <div className="border-b border-white/10 pb-8 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F9F8F5]">3. Hantering i din webbläsare</h2>
            <p>
              Du kan själv blockera eller radera cookies via inställningarna i din webbläsare. Eftersom motbild.se inte förlitar sig på spårningscookies påverkar det inte din möjlighet att läsa innehållet på webbplatsen.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F9F8F5]">4. Kontakt</h2>
            <p>
              Har du frågor om vår hantering av cookies eller personuppgifter, kontakta oss på: <strong className="underline">support@motbild.se</strong>.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
