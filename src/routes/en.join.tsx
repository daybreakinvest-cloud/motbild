import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, Send } from "lucide-react";

export const Route = createFileRoute("/en/join")({
  component: EnglishJoinPage,
});

const ENGAGEMENT_OPTIONS = [
  "Education & Lectures",
  "Debate & Apologetics",
  "Research & Writing",
  "Media & Podcast/Video",
  "Administration & Coordination",
  "Service & Practical Support",
];

function EnglishJoinPage() {
  const [selectedEngagement, setSelectedEngagement] = useState<string[]>([]);
  const [other, setOther] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [municipality, setMunicipality] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  function toggleEngagement(item: string) {
    setSelectedEngagement((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!accepted) return;
    setLoading(true);

    const { error } = await supabase.from("medlemmar").insert({
      engagemang: selectedEngagement,
      annat_engagemang: other,
      fornamn: firstName,
      efternamn: lastName,
      adress: address,
      ort: city,
      postnummer: postalCode,
      kommun: municipality,
      epost: email,
      telefon: phone,
      godkant_stadgar: accepted,
    });

    if (!error) {
      setSubmitted(true);
      // Send confirmation email and notification
      fetch("/api/notify-en", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          typ: "MEDLEM",
          data: {
            fornamn: firstName,
            efternamn: lastName,
            epost: email,
            telefon: phone,
            ort: city,
            engagemang: selectedEngagement,
          },
        }),
      });
    } else {
      alert("Something went wrong while submitting your application. Please try again.");
    }
    setLoading(false);
  }

  return (
    <SiteLayout>
      {/* 1. HERO SECTION */}
      <section className="bg-[#090023] text-[#F9F8F5] py-20 md:py-24 px-6 border-b border-white/10 font-serif text-center">
        <div className="max-w-4xl mx-auto space-y-5">
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#F9F8F5]">
            Application for membership
          </h1>
          <p className="text-xl sm:text-2xl text-[#F9F8F5] max-w-2xl mx-auto leading-relaxed">
            {/* Underrubrik läggs till i nästa fas */}
          </p>
        </div>
      </section>

      {/* 2. CONTENT & FORM */}
      <section className="py-16 md:py-20 px-6 max-w-3xl mx-auto">
        <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8 space-y-4 mb-8 text-base text-[#090023] font-serif leading-relaxed">
          <p>Motbild is built by people.</p>
          <p>
            Whether your service lies in education, research, debate, practical support,
            administration, or media, your experience and ambitions matter.
          </p>
          <p>Together, we build steadily, credibly, and for the long term.</p>
          <p className="font-semibold text-[#090023]">
            More importantly, you share our faith and accept our bylaws.
          </p>
        </div>

        {submitted ? (
          <div className="bg-[#f3f0ed] border border-black/10 rounded-2xl p-8 text-center space-y-3 font-sans">
            <CheckCircle2 className="size-12 text-emerald-700 mx-auto" />
            <h3 className="text-xl sm:text-2xl font-bold font-serif text-[#090023]">
              Thank you for your membership application!
            </h3>
            <p className="text-base font-serif text-[#090023] leading-relaxed">
              We have received your details and will get back to you shortly.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8 space-y-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#090023] mb-3">
                Competence, experience, and involvement
              </h2>
              <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#090023] mb-2">
                How would you like to get involved? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {ENGAGEMENT_OPTIONS.map((option) => (
                  <button
                    type="button"
                    key={option}
                    onClick={() => toggleEngagement(option)}
                    className={`p-3 text-left rounded-xl text-xs font-sans font-semibold border transition-all cursor-pointer ${
                      selectedEngagement.includes(option)
                        ? "bg-[#090023] text-[#F9F8F5] border-[#090023]"
                        : "bg-[#f3f0ed] text-[#090023] border-black/10 hover:border-black/30"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>

              <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#090023] mb-1">
                Other
              </label>
              <input
                type="text"
                value={other}
                onChange={(e) => setOther(e.target.value)}
                className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2.5 text-xs text-[#090023] font-serif outline-none focus:border-[#090023]"
                placeholder="Additional skills or experience..."
              />
            </div>

            <div className="pt-4 border-t border-black/10">
              <h2 className="text-xl sm:text-2xl font-bold font-serif text-[#090023] mb-4">
                Personal details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#090023] mb-1">First name *</label>
                  <input required value={firstName} onChange={(e) => setFirstName(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2 text-xs text-[#090023] font-serif outline-none focus:border-[#090023]" />
                </div>
                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#090023] mb-1">Last name *</label>
                  <input required value={lastName} onChange={(e) => setLastName(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2 text-xs text-[#090023] font-serif outline-none focus:border-[#090023]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#090023] mb-1">Street address *</label>
                  <input required value={address} onChange={(e) => setAddress(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2 text-xs text-[#090023] font-serif outline-none focus:border-[#090023]" />
                </div>
                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#090023] mb-1">City / Town *</label>
                  <input required value={city} onChange={(e) => setCity(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2 text-xs text-[#090023] font-serif outline-none focus:border-[#090023]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#090023] mb-1">Postal code *</label>
                  <input required value={postalCode} onChange={(e) => setPostalCode(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2 text-xs text-[#090023] font-serif outline-none focus:border-[#090023]" />
                </div>
                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#090023] mb-1">Municipality *</label>
                  <input required value={municipality} onChange={(e) => setMunicipality(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2 text-xs text-[#090023] font-serif outline-none focus:border-[#090023]" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#090023] mb-1">Email *</label>
                  <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2 text-xs text-[#090023] font-serif outline-none focus:border-[#090023]" />
                </div>
                <div>
                  <label className="block text-xs font-sans font-semibold uppercase tracking-wider text-[#090023] mb-1">Phone *</label>
                  <input type="tel" required value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2 text-xs text-[#090023] font-serif outline-none focus:border-[#090023]" />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-[#090023] font-serif cursor-pointer">
                  <input
                    type="checkbox"
                    checked={accepted}
                    onChange={(e) => setAccepted(e.target.checked)}
                    required
                    className="mt-0.5 size-4 accent-[#090023]"
                  />
                  <span>
                    I have read and accept Motbild’s bylaws and consent to Motbild processing the personal data I submit in order to handle my membership application.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 h-12 bg-[#090023] hover:bg-black text-[#F9F8F5] rounded-xl font-sans font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="size-4 text-[#F9F8F5]" />
                {loading ? "Submitting application..." : "Submit application"}
              </button>
            </div>
          </form>
        )}
      </section>
    </SiteLayout>
  );
}
