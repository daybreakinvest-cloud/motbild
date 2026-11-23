import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/lib/supabase";
import { Building2, CheckCircle2, Send, Flame, Users } from "lucide-react";

export const Route = createFileRoute("/en/co-host")({
  component: EnglishCoHostPage,
});

function EnglishCoHostPage() {
  const [fornamn, setFornamn] = useState("");
  const [efternamn, setEfternamn] = useState("");
  const [roll, setRoll] = useState("");
  const [telefon, setTelefon] = useState("");
  const [epost, setEpost] = useState("");
  const [forsamling, setForsamling] = useState("");
  const [ort, setOrt] = useState("");
  const [samfund, setSamfund] = useState("");
  const [godkant, setGodkant] = useState(false);
  const [skickat, setSkickat] = useState(false);
  const [laddar, setLaddar] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!godkant) return;
    setLaddar(true);

    const { error } = await supabase.from("medarrangorer").insert({
      fornamn,
      efternamn,
      roll_i_forsamlingen: roll,
      telefon,
      epost,
      forsamling,
      ort,
      samfund,
      godkant_villkor: godkant,
    });

    if (!error) {
      setSkickat(true);
      // Send confirmation email and notification
      fetch("/api/notify-en", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          typ: "MEDARRANGOR",
          data: { fornamn, efternamn, epost, telefon, forsamling, ort, roll, samfund },
        }),
      });
    } else {
      alert("Something went wrong while sending your inquiry. Please try again.");
    }
    setLaddar(false);
  }

  return (
    <SiteLayout>
      {/* 1. HERO SECTION */}
      <section className="bg-[#090023] text-[#F9F8F5] py-20 md:py-24 px-6 border-b border-white/10 font-serif">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-xs uppercase tracking-widest text-[#F9F8F5]">
            CHURCH COLLABORATION
          </div>
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#F9F8F5]">
            Break the negative trend and create real value
          </h1>
          <p className="text-xl sm:text-2xl text-[#F9F8F5] max-w-2xl mx-auto leading-relaxed">
            When did your members last examine why they believe what they believe?
          </p>
        </div>
      </section>

      {/* 2. BODY TEXT & ARGUMENTATION */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-16 font-serif">
        <div className="space-y-6 text-[#090023] text-base leading-relaxed">
          <p>
            Studies show that Bible reading is declining, especially among younger generations. When questions about God
            and faith arise, many seek answers online, in podcasts, and on social media—often without guidance from
            the local congregation.
          </p>
          <p className="font-bold text-[#090023]">
            It does not have to be this way.
          </p>
          <p>
            We are convinced that the church needs more settings where believers are encouraged to open the Bible,
            test arguments, and seek the truth for themselves.
          </p>
        </div>

        {/* 3 CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-xs space-y-3">
            <div className="size-10 rounded-xl bg-[#f3f0ed] text-[#090023] flex items-center justify-center mb-2">
              <Flame className="size-5 text-[#090023]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#090023]">
              Spark hunger quickly
            </h3>
            <p className="text-base text-[#090023] leading-relaxed">
              Motbild arranges moderated public debates on the most foundational questions: the Trinity, the divinity of Christ,
              and pre-existence—questions that simmer beneath the surface in every congregation.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-xs space-y-3">
            <div className="size-10 rounded-xl bg-[#f3f0ed] text-[#090023] flex items-center justify-center mb-2">
              <Users className="size-5 text-[#090023]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#090023]">
              Fill the room with seekers
            </h3>
            <p className="text-base text-[#090023] leading-relaxed">
              An event centered on these questions generates an appetite that ordinary church evenings rarely do. People come
              because they want to know—not because they feel obligated.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-xs space-y-3">
            <div className="size-10 rounded-xl bg-[#f3f0ed] text-[#090023] flex items-center justify-center mb-2">
              <Building2 className="size-5 text-[#090023]" />
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-[#090023]">
              You open the doors
            </h3>
            <p className="text-base text-[#090023] leading-relaxed">
              Motbild is responsible for planning, moderator, speakers, and production. You open your doors and welcome
              your congregation and local community.
            </p>
          </div>
        </div>

        {/* DIVISION OF RESPONSIBILITIES */}
        <div className="bg-[#f3f0ed] rounded-3xl p-8 sm:p-10 border border-black/10 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#090023]">
            Dare to do something that makes a profound difference
          </h2>
          <p className="text-base leading-relaxed text-[#090023]">
            The purpose is not to declare winners or losers, but to spark questions, ignite a hunger for God’s Word,
            and demonstrate that Christians can deeply disagree and still meet one another with respect, humility, and love.
            That is leadership. That is courage. And that is precisely what Christianity in Sweden needs right now.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-black/10 text-base">
            <div className="bg-white p-5 rounded-xl border border-black/5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#090023] block">CONGREGATION’S ROLE:</span>
              <ul className="space-y-1 text-[#090023] list-disc list-inside leading-relaxed">
                <li>Opens its premises for the evening</li>
                <li>Invites its members and local community</li>
                <li>Covers the proponent’s honorarium</li>
                <li>Provides refreshments and hospitality</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-xl border border-black/5 space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#090023] block">MOTBILD’S ROLE:</span>
              <ul className="space-y-1 text-[#090023] list-disc list-inside leading-relaxed">
                <li>Handles planning and structure</li>
                <li>Provides the opponent</li>
                <li>Arranges an independent moderator</li>
                <li>Coordinates filming and technical production</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. FORM: EXPRESSION OF INTEREST */}
        <div id="register" className="pt-8">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F9F8F5] bg-[#090023] px-3.5 py-1.5 rounded-full inline-block">
              EXPRESSION OF INTEREST
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#090023] mt-3">
              Our congregation would like to co-host
            </h2>
            <p className="text-base text-[#090023] mt-2 leading-relaxed">
              Complete the form below and we will get in touch to plan dates and details.
            </p>
          </div>

          {skickat ? (
            <div className="bg-[#f3f0ed] border border-black/10 rounded-3xl p-10 text-center space-y-3">
              <CheckCircle2 className="size-12 text-emerald-700 mx-auto" />
              <h3 className="text-xl sm:text-2xl font-bold text-[#090023]">Thank you for your interest!</h3>
              <p className="text-base text-[#090023] max-w-md mx-auto leading-relaxed">
                We have received the inquiry for <strong>{forsamling}</strong> in <strong>{ort}</strong> and will get back
                to {fornamn} shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-black/10 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#090023] mb-4">
                  Contact person
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#090023] mb-1">FIRST NAME *</label>
                    <input required value={fornamn} onChange={(e) => setFornamn(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2.5 text-xs text-[#090023] outline-none focus:border-[#090023]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#090023] mb-1">LAST NAME *</label>
                    <input required value={efternamn} onChange={(e) => setEfternamn(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2.5 text-xs text-[#090023] outline-none focus:border-[#090023]" />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#090023] mb-1">ROLE IN CONGREGATION *</label>
                  <input required value={roll} onChange={(e) => setRoll(e.target.value)} placeholder="e.g. Senior Pastor, Elder, Board Chair" className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2.5 text-xs text-[#090023] outline-none focus:border-[#090023]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#090023] mb-1">PHONE *</label>
                    <input type="tel" required value={telefon} onChange={(e) => setTelefon(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2.5 text-xs text-[#090023] outline-none focus:border-[#090023]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#090023] mb-1">EMAIL *</label>
                    <input type="email" required value={epost} onChange={(e) => setEpost(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2.5 text-xs text-[#090023] outline-none focus:border-[#090023]" />
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-black/10">
                <h3 className="text-xl font-bold text-[#090023] mb-4">
                  The congregation
                </h3>
                <div className="mb-4">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#090023] mb-1">CONGREGATION *</label>
                  <input required value={forsamling} onChange={(e) => setForsamling(e.target.value)} placeholder="Name of congregation" className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2.5 text-xs text-[#090023] outline-none focus:border-[#090023]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#090023] mb-1">CITY / TOWN *</label>
                    <input required value={ort} onChange={(e) => setOrt(e.target.value)} placeholder="City / Municipality" className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2.5 text-xs text-[#090023] outline-none focus:border-[#090023]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#090023] mb-1">DENOMINATION</label>
                    <input value={samfund} onChange={(e) => setSamfund(e.target.value)} placeholder="e.g. Pentecostal, Evangelical, Free Church, Independent" className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2.5 text-xs text-[#090023] outline-none focus:border-[#090023]" />
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-[#090023] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={godkant}
                    onChange={(e) => setGodkant(e.target.checked)}
                    required
                    className="mt-0.5 size-4 accent-[#090023]"
                  />
                  <span>
                    I have read and agree to Motbild processing the personal data I submit in order to handle our co-hosting inquiry.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={laddar}
                className="w-full h-12 bg-[#090023] hover:bg-black text-[#F9F8F5] rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <Send className="size-4 text-[#F9F8F5]" />
                {laddar ? "SENDING..." : "SEND INQUIRY"}
              </button>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
