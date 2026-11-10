import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/lib/supabase";
import { Building2, CheckCircle2, Send, Flame, Users } from "lucide-react";

export const Route = createFileRoute("/medarrangor")({
  component: MedarrangorPage,
});

function MedarrangorPage() {
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
    } else {
      alert("Något gick fel när förfrågan skulle skickas. Försök igen.");
    }
    setLaddar(false);
  }

  return (
    <SiteLayout>
      {/* 1. HERO SECTION */}
      <section className="bg-[#090023] text-[#F9F8F5] py-20 md:py-24 px-6 border-b border-white/10 font-serif">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-xs uppercase tracking-widest text-[#F9F8F5]">
            FÖRSAMLINGSSAMVERKAN
          </div>
          <h1 className="text-3xl sm:text-5xl font-normal leading-tight text-[#F9F8F5]">
            Bryt den negativa trenden och skapa verkligt värde
          </h1>
          <p className="text-base sm:text-lg text-[#F9F8F5] max-w-2xl mx-auto leading-relaxed">
            När undersökte dina medlemmar senast varför de tror som de gör?
          </p>
        </div>
      </section>

      {/* 2. BRÖDTEXT & ARGUMENTATION */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-16 font-serif">
        <div className="space-y-6 text-[#090023] text-base sm:text-lg leading-relaxed">
          <p>
            Studier visar att bibelläsningen minskar, särskilt bland yngre generationer. När frågor om Gud och tron
            uppstår söker många svar på internet, i poddar och på sociala medier – ofta utan vägledning från den
            lokala församlingen.
          </p>
          <p className="font-bold text-[#090023]">
            Det behöver inte vara så.
          </p>
          <p>
            Vi är övertygade om att församlingen behöver fler sammanhang där troende uppmuntras att öppna Bibeln,
            pröva argument och själva söka sanningen.
          </p>
        </div>

        {/* 3 KORT: Fördelar för församlingen */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-xs space-y-3">
            <div className="size-10 rounded-xl bg-[#f3f0ed] text-[#090023] flex items-center justify-center mb-2">
              <Flame className="size-5 text-[#090023]" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-wider text-[#090023]">
              SKAPA HUNGER SNABBT
            </h3>
            <p className="text-xs text-[#090023] leading-relaxed">
              Motbild arrangerar modererade offentliga debatter kring de mest grundläggande frågorna: Treenigheten,
              Kristi gudom och preexistens. Frågor som brinner under ytan i varje församling.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-xs space-y-3">
            <div className="size-10 rounded-xl bg-[#f3f0ed] text-[#090023] flex items-center justify-center mb-2">
              <Users className="size-5 text-[#090023]" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-wider text-[#090023]">
              FYLL LOKALEN MED SÖKARE
            </h3>
            <p className="text-xs text-[#090023] leading-relaxed">
              Ett arrangemang kring dessa frågor skapar ett sug som vanliga församlingskvällar sällan gör. Människor
              kommer för att de vill veta – inte för att de måste.
            </p>
          </div>

          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-xs space-y-3">
            <div className="size-10 rounded-xl bg-[#f3f0ed] text-[#090023] flex items-center justify-center mb-2">
              <Building2 className="size-5 text-[#090023]" />
            </div>
            <h3 className="text-base font-bold uppercase tracking-wider text-[#090023]">
              NI ÖPPNAR DÖRRARNA
            </h3>
            <p className="text-xs text-[#090023] leading-relaxed">
              Motbild ansvarar för planering, moderator, talare och produktion. Ni öppnar dörrarna och välkomnar
              församlingen och bygden.
            </p>
          </div>
        </div>

        {/* ARBETS- OCH ANSVARSFÖRDELNING */}
        <div className="bg-[#f3f0ed] rounded-3xl p-8 sm:p-10 border border-black/10 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#090023]">
            VÅGA GÖRA NÅGOT SOM GÖR STOR SKILLNAD
          </h2>
          <p className="text-sm leading-relaxed text-[#090023]">
            Syftet är inte att utse vinnare eller förlorare, utan att väcka frågor, tända en hunger efter Guds ord och
            visa att kristna kan vara djupt oense och ändå möta varandra med respekt, ödmjukhet och kärlek.
            Det är ledarskap. Det är mod. Och det är precis vad svensk kristenhet behöver just nu.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-black/10 text-xs">
            <div className="bg-white p-5 rounded-xl border border-black/5 space-y-2">
              <span className="font-bold uppercase tracking-wider text-[#090023] block">FÖRSAMLINGENS ROLL:</span>
              <ul className="space-y-1 text-[#090023] list-disc list-inside">
                <li>Öppnar sina lokaler för kvällen</li>
                <li>Bjuder in sina medlemmar och närsamhälle</li>
                <li>Står för proponentens arvode</li>
                <li>Ansvarar för fika och värdskap</li>
              </ul>
            </div>
            <div className="bg-white p-5 rounded-xl border border-black/5 space-y-2">
              <span className="font-bold uppercase tracking-wider text-[#090023] block">MOTBILDS ROLL:</span>
              <ul className="space-y-1 text-[#090023] list-disc list-inside">
                <li>Ansvarar för planering och struktur</li>
                <li>Står för opponenten</li>
                <li>Ordna oberoende moderator</li>
                <li>Ansvarar för filmning &amp; tekniksamordning</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4. FORMULÄR: INTRESSEANMÄLAN */}
        <div id="anmalan" className="pt-8">
          <div className="text-center mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-[#F9F8F5] bg-[#090023] px-3.5 py-1.5 rounded-full inline-block">
              INTRESSEANMÄLAN
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-wider text-[#090023] mt-3">
              VÅR FÖRSAMLING VILL STÅ SOM MEDARRANGÖR
            </h2>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#090023] mt-2">
              FYLL I FORMULÄRET NEDAN SÅ TAR VI KONTAKT FÖR ATT PLANERA DATUM OCH DETALJER
            </p>
          </div>

          {skickat ? (
            <div className="bg-[#f3f0ed] border border-black/10 rounded-3xl p-10 text-center space-y-3">
              <CheckCircle2 className="size-12 text-emerald-700 mx-auto" />
              <h3 className="text-2xl font-bold uppercase tracking-wider text-[#090023]">TACK FÖR ERT INTRESSE!</h3>
              <p className="text-sm text-[#090023] max-w-md mx-auto">
                Vi har tagit emot förfrågan för <strong>{forsamling}</strong> i <strong>{ort}</strong> och återkommer
                till {fornamn} inom kort.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white border border-black/10 rounded-3xl p-8 sm:p-10 shadow-sm space-y-6">
              {/* Kontaktperson */}
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#090023] mb-4">
                  KONTAKTPERSON
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#090023] mb-1">FÖRNAMN *</label>
                    <input required value={fornamn} onChange={(e) => setFornamn(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2.5 text-xs text-[#090023] outline-none focus:border-[#090023]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#090023] mb-1">EFTERNAMN *</label>
                    <input required value={efternamn} onChange={(e) => setEfternamn(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2.5 text-xs text-[#090023] outline-none focus:border-[#090023]" />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#090023] mb-1">ROLL I FÖRSAMLINGEN *</label>
                  <input required value={roll} onChange={(e) => setRoll(e.target.value)} placeholder="t.ex. Föreståndare, Pastor, Styrelseordförande" className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2.5 text-xs text-[#090023] outline-none focus:border-[#090023]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#090023] mb-1">TELEFON *</label>
                    <input type="tel" required value={telefon} onChange={(e) => setTelefon(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2.5 text-xs text-[#090023] outline-none focus:border-[#090023]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#090023] mb-1">E-POST *</label>
                    <input type="email" required value={epost} onChange={(e) => setEpost(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2.5 text-xs text-[#090023] outline-none focus:border-[#090023]" />
                  </div>
                </div>
              </div>

              {/* Församlingen */}
              <div className="pt-4 border-t border-black/10">
                <h3 className="text-sm font-bold uppercase tracking-wider text-[#090023] mb-4">
                  FÖRSAMLINGEN
                </h3>
                <div className="mb-4">
                  <label className="block text-xs font-semibold uppercase tracking-widest text-[#090023] mb-1">FÖRSAMLING *</label>
                  <input required value={forsamling} onChange={(e) => setForsamling(e.target.value)} placeholder="Församlingens namn" className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2.5 text-xs text-[#090023] outline-none focus:border-[#090023]" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#090023] mb-1">ORT *</label>
                    <input required value={ort} onChange={(e) => setOrt(e.target.value)} placeholder="Stad / Kommun" className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2.5 text-xs text-[#090023] outline-none focus:border-[#090023]" />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-widest text-[#090023] mb-1">SAMFUND</label>
                    <input value={samfund} onChange={(e) => setSamfund(e.target.value)} placeholder="t.ex. Pingst, EFK, Alliansmissionen, Fristående" className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2.5 text-xs text-[#090023] outline-none focus:border-[#090023]" />
                  </div>
                </div>
              </div>

              {/* Samtycke */}
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
                    Jag har tagit del av och godkänner att Motbild behandlar de personuppgifter jag lämnar för att kunna handlägga vår förfrågan om medarrangörskap.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={laddar}
                className="w-full h-12 bg-[#090023] hover:bg-black text-[#F9F8F5] rounded-xl font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs"
              >
                <Send className="size-4 text-[#F9F8F5]" />
                {laddar ? "SKICKAR..." : "SKICKA INTRESSEANMÄLAN"}
              </button>
            </form>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
