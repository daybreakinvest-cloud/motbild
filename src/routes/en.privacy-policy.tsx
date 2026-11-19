import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/en/privacy-policy")({
  component: EnglishPrivacyPolicyPage,
});

function EnglishPrivacyPolicyPage() {
  return (
    <SiteLayout>
      {/* 1. HERO SECTION */}
      <section className="bg-[#090023] text-[#F9F8F5] py-20 md:py-24 px-6 border-b border-white/10 font-serif text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-xs uppercase tracking-widest text-[#F9F8F5]">
            GDPR &amp; DATA PROTECTION
          </div>
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#F9F8F5]">
            Privacy Policy
          </h1>
          <p className="text-xl sm:text-2xl text-[#F9F8F5] max-w-2xl mx-auto leading-relaxed">
            Information on how the Motbild association processes personal data in accordance with the General Data Protection Regulation (GDPR).
          </p>
        </div>
      </section>

      {/* 2. LEGAL TEXT */}
      <section className="py-20 px-6 max-w-4xl mx-auto font-serif">
        <div className="bg-[#090023] border border-white/15 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-10 text-base leading-relaxed text-[#F9F8F5]">
          <div className="border-b border-white/10 pb-8 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F9F8F5]">1. Data controller</h2>
            <p>
              The association Motbild (with its registered office in Stockholm, Sweden) is the data controller for the processing of
              personal data collected via the association’s website (motbild.se). Contact details for data protection inquiries
              can be found at the bottom of the page.
            </p>
          </div>

          <div className="border-b border-white/10 pb-8 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F9F8F5]">2. Personal data we process</h2>
            <p className="mb-2">We only collect personal data that you voluntarily provide to us in connection with:</p>
            <ul className="list-disc list-inside space-y-1.5 pl-2">
              <li><strong>Membership application:</strong> First name, last name, street address, postal code, city/town, municipality, email address, phone number, and desired areas of involvement.</li>
              <li><strong>Co-hosting inquiry:</strong> Name, role in congregation, congregation name, city/town, denomination, phone number, and email address.</li>
              <li><strong>Email contact:</strong> Name and contact details that you provide when contacting us directly.</li>
            </ul>
          </div>

          <div className="border-b border-white/10 pb-8 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F9F8F5]">3. Purpose and legal basis</h2>
            <p>
              We process your personal data in order to administer your membership, manage meetings and communications,
              coordinate debates and events with congregations, and respond to inquiries.
            </p>
            <p className="mt-2">
              The legal basis for processing is <em>contract</em> (fulfillment of membership), <em>consent</em> (provided when submitting a form), or <em>legitimate interest</em>.
            </p>
          </div>

          <div className="border-b border-white/10 pb-8 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F9F8F5]">4. How long is the data retained?</h2>
            <p>
              Personal data relating to membership is retained for as long as you remain a member of the association. Should you request withdrawal, your data will be deleted without undue delay. Event inquiries are retained only for as long as necessary to organize and follow up on the event.
            </p>
          </div>

          <div className="border-b border-white/10 pb-8 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F9F8F5]">5. Sharing of information</h2>
            <p>
              Motbild never sells personal data to third parties. Data is stored securely with our database provider (Supabase) under strict access controls.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F9F8F5]">6. Your rights</h2>
            <p>
              Under the GDPR, you have the right to request a record of the personal data we hold about you, the right to request rectification of inaccurate data, and the right to request erasure of your personal data from our registers.
            </p>
            <p className="mt-2">
              For questions or deletion requests, please contact us at: <strong className="underline">support@motbild.se</strong>.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
