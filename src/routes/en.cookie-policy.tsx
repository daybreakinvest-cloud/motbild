import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/en/cookie-policy")({
  component: EnglishCookiePolicyPage,
});

function EnglishCookiePolicyPage() {
  return (
    <SiteLayout>
      {/* 1. HERO SECTION */}
      <section className="bg-[#090023] text-[#F9F8F5] py-20 md:py-24 px-6 border-b border-white/10 font-serif text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-xs uppercase tracking-widest text-[#F9F8F5]">
            Cookies &amp; data protection
          </div>
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#F9F8F5]">
            Cookie policy
          </h1>
          <p className="text-xl sm:text-2xl text-[#F9F8F5] max-w-2xl mx-auto leading-relaxed">
            Information on how motbild.se uses cookies and similar technologies.
          </p>
        </div>
      </section>

      {/* 2. JURIDISK TEXT (Blåsvart kort på offwhite bakgrund) */}
      <section className="py-20 px-6 max-w-4xl mx-auto font-serif">
        <div className="bg-[#090023] border border-white/15 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-10 text-base leading-relaxed text-[#F9F8F5]">
          <div className="border-b border-white/10 pb-8 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F9F8F5]">1. What are cookies?</h2>
            <p>
              A cookie is a small text file that a website requests to store on your computer, tablet, or mobile phone. Cookies are typically used to enable technical website functionality or to analyze how a website is used.
            </p>
          </div>

          <div className="border-b border-white/10 pb-8 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F9F8F5]">2. How motbild.se uses cookies</h2>
            <p>
              Motbild does not use cookies for marketing, advertising, or third-party tracking. Nor do we collect behavioral data through third-party analytics tools.
            </p>
            <p className="mt-2">
              Only strictly necessary technical mechanisms may be present to ensure that the website, page navigation, and form submission security function properly.
            </p>
          </div>

          <div className="border-b border-white/10 pb-8 space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F9F8F5]">3. Management in your browser</h2>
            <p>
              You can block or delete cookies at any time via your browser settings. Because motbild.se does not rely on tracking cookies, doing so will not affect your ability to read the content on the website.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F9F8F5]">4. Contact</h2>
            <p>
              If you have questions regarding our handling of cookies or personal data, please contact us at: <strong className="underline">support@motbild.se</strong>.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
