import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/integritetspolicy")({
  component: IntegritetspolicyPage,
});

function IntegritetspolicyPage() {
  return (
    <SiteLayout>
      <section className="bg-[#090023] text-[#F9F8F5] py-20 md:py-24 px-6 border-b border-white/10 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-block px-3.5 py-1 rounded-full bg-white/10 text-xs font-sans uppercase tracking-widest text-[#F9F8F5]">
            GDPR &amp; Dataskydd
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif font-normal leading-tight text-[#F9F8F5]">
            Integritetspolicy
          </h1>
          <p className="text-sm sm:text-base font-serif text-[#F9F8F5] max-w-xl mx-auto leading-relaxed">
            Information om hur Föreningen Motbild behandlar personuppgifter i enlighet med dataskyddsförordningen (GDPR).
          </p>
        </div>
      </section>

      <section className="py-20 px-6 max-w-4xl mx-auto">
        <div className="bg-white border border-black/10 rounded-3xl p-8 sm:p-12 shadow-sm space-y-8 font-serif text-[#090023] text-base leading-relaxed">
          <div>
            <h2 className="text-2xl font-bold font-serif text-[#090023] mb-3">1. Personuppgiftsansvarig</h2>
            <p>
              Föreningen Motbild (med säte i Stockholm) är personuppgiftsansvarig för behandlingen av de personuppgifter
              som samlas in via föreningens webbplats (motbild.se). Kontaktuppgifter för frågor om dataskydd finns längst ner på sidan.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-serif text-[#090023] mb-3">2. Vilka personuppgifter vi behandlar</h2>
            <p className="mb-2">Vi samlar endast in uppgifter som du själv lämnar till oss i samband med:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Medlemsansökan:</strong> Förnamn, efternamn, adress, postnummer, ort, kommun, e-post, telefonnummer och önskade engagemangsområden.</li>
              <li><strong>Förfrågan om medarrangörskap:</strong> Namn, roll i församlingen, församlingsnamn, ort, samfundstillhörighet, telefonnummer och e-postadress.</li>
              <li><strong>Kontakt via e-post:</strong> Namn och kontaktuppgifter som du uppger vid direktkontakt med oss.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-serif text-[#090023] mb-3">3. Ändamål och laglig grund</h2>
            <p>
              Vi behandlar dina uppgifter för att kunna hantera ditt medlemskap, administrera möten och utskick, samordna debatter och evenemang med församlingar samt besvara förfrågningar.
            </p>
            <p className="mt-2">
              Den lagliga grunden för behandlingen är <em>avtal</em> (fullgörande av medlemskap), <em>samtycke</em> (som du lämnar vid ifyllande av formulär) eller <em>berättigat intresse</em>.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-serif text-[#090023] mb-3">4. Hur länge sparas uppgifterna?</h2>
            <p>
              Personuppgifter rörande medlemskap sparas så länge du är medlem i föreningen. Begär du utträde raderas dina uppgifter utan onödigt dröjsmål. Förfrågningar om arrangemang sparas endast så länge det krävs för att genomföra och följa upp evenemanget.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-serif text-[#090023] mb-3">5. Delning av information</h2>
            <p>
              Föreningen Motbild säljer aldrig personuppgifter till tredje part. Uppgifterna lagras säkert i vår databasleverantör (Supabase) med strikt åtkomstkontroll.
            </p>
          </div>

          <div>
            <h2 className="text-2xl font-bold font-serif text-[#090023] mb-3">6. Dina rättigheter</h2>
            <p>
              Du har enligt GDPR rätt att begära ett registerutdrag över vilka uppgifter vi har om dig, rätt att begära rättelse av felaktiga uppgifter samt rätt att begära att dina personuppgifter raderas ur våra register.
            </p>
            <p className="mt-2">
              Vid frågor eller begäran om radering, kontakta oss på: <strong className="font-sans">support@motbild.se</strong>.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
