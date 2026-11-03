import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, Send } from "lucide-react";

export const Route = createFileRoute("/bli-medlem")({
  component: BliMedlemPage,
});

const ENGAGEMANG_VAL = [
  "Utbildning & Föreläsningar",
  "Debatt & Apologetik",
  "Forskning & Skrivande",
  "Media & Podd/Video",
  "Administration & Samordning",
  "Service & Praktiskt stöd",
];

function BliMedlemPage() {
  const [valdaEngagemang, setValdaEngagemang] = useState<string[]>([]);
  const [annat, setAnnat] = useState("");
  const [fornamn, setFornamn] = useState("");
  const [efternamn, setEfternamn] = useState("");
  const [adress, setAdress] = useState("");
  const [ort, setOrt] = useState("");
  const [postnummer, setPostnummer] = useState("");
  const [kommun, setKommun] = useState("");
  const [epost, setEpost] = useState("");
  const [telefon, setTelefon] = useState("");
  const [godkant, setGodkant] = useState(false);
  const [skickat, setSkickat] = useState(false);
  const [laddar, setLaddar] = useState(false);

  function togglaEngagemang(item: string) {
    setValdaEngagemang((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!godkant) return;
    setLaddar(true);

    const { error } = await supabase.from("medlemmar").insert({
      engagemang: valdaEngagemang,
      annat_engagemang: annat,
      fornamn,
      efternamn,
      adress,
      ort,
      postnummer,
      kommun,
      epost,
      telefon,
      godkant_stadgar: godkant,
    });

    if (!error) {
      setSkickat(true);
    } else {
      alert("Något gick fel vid inskickandet. Försök igen.");
    }
    setLaddar(false);
  }

  return (
    <SiteLayout>
      <section className="py-16 md:py-20 px-6 max-w-3xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#090023] mb-6">
          Ansökan om medlemskap
        </h1>
        
        <div className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8 space-y-4 mb-8 text-base text-[#090023]/80 leading-relaxed">
          <p>Motbild byggs av människor.</p>
          <p>
            Oavsett om din tjänst ligger inom utbildning, forskning, debatt, service,
            administration eller media är din erfarenhet och dina ambitioner viktiga.
          </p>
          <p>Tillsammans bygger vi stabilt, trovärdigt och långsiktigt.</p>
          <p className="font-semibold text-[#090023]">
            Viktigare ändå är att du delar vår tro och accepterar stadgarna.
          </p>
        </div>

        {skickat ? (
          <div className="bg-[#f3f0ed] border border-black/10 rounded-2xl p-8 text-center space-y-3 font-sans">
            <CheckCircle2 className="size-12 text-emerald-700 mx-auto" />
            <h3 className="text-xl font-bold text-[#090023]">Tack för din medlemsansökan!</h3>
            <p className="text-sm text-[#090023]/70">
              Vi har tagit emot dina uppgifter och återkommer till dig inom kort.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white border border-black/10 rounded-2xl p-6 sm:p-8 space-y-6 font-sans">
            <div>
              <h2 className="text-lg font-bold font-serif text-[#090023] mb-3">
                Kompetens, erfarenhet och engagemang
              </h2>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#090023]/70 mb-2">
                Hur vill du engagera dig? *
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                {ENGAGEMANG_VAL.map((val) => (
                  <button
                    type="button"
                    key={val}
                    onClick={() => togglaEngagemang(val)}
                    className={`p-3 text-left rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      valdaEngagemang.includes(val)
                        ? "bg-[#090023] text-white border-[#090023]"
                        : "bg-[#f3f0ed] text-[#090023] border-black/10 hover:border-black/30"
                    }`}
                  >
                    {val}
                  </button>
                ))}
              </div>

              <label className="block text-xs font-bold uppercase tracking-wider text-[#090023]/70 mb-1">
                Annat
              </label>
              <input
                type="text"
                value={annat}
                onChange={(e) => setAnnat(e.target.value)}
                className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2.5 text-xs text-[#090023] outline-none focus:border-[#FFA8CD]"
                placeholder="Övrig kompetens..."
              />
            </div>

            <div className="pt-4 border-t border-black/10">
              <h2 className="text-lg font-bold font-serif text-[#090023] mb-4">
                Personuppgifter
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Förnamn *</label>
                  <input required value={fornamn} onChange={(e) => setFornamn(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Efternamn *</label>
                  <input required value={efternamn} onChange={(e) => setEfternamn(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2 text-xs" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Adress *</label>
                  <input required value={adress} onChange={(e) => setAdress(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Ort *</label>
                  <input required value={ort} onChange={(e) => setOrt(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2 text-xs" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">Postnummer *</label>
                  <input required value={postnummer} onChange={(e) => setPostnummer(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Kommun *</label>
                  <input required value={kommun} onChange={(e) => setKommun(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2 text-xs" />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-xs font-semibold mb-1">E-post *</label>
                  <input type="email" required value={epost} onChange={(e) => setEpost(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2 text-xs" />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1">Telefon *</label>
                  <input type="tel" required value={telefon} onChange={(e) => setTelefon(e.target.value)} className="w-full bg-[#f3f0ed] border border-black/15 rounded-xl px-4 py-2 text-xs" />
                </div>
              </div>

              <div className="pt-2">
                <label className="flex items-start gap-2.5 text-xs text-[#090023]/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={godkant}
                    onChange={(e) => setGodkant(e.target.checked)}
                    required
                    className="mt-0.5 size-4 accent-[#090023]"
                  />
                  <span>
                    Jag har tagit del av och godkänner Motbilds stadgar samt samtycker till att Motbild behandlar de personuppgifter jag lämnar för att kunna handlägga min medlemsansökan.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                disabled={laddar}
                className="w-full mt-6 h-12 bg-[#090023] hover:bg-black text-[#F9F8F5] rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="size-4 text-[#FFA8CD]" />
                {laddar ? "Skickar ansökan..." : "Skicka ansökan"}
              </button>
            </div>
          </form>
        )}
      </section>
    </SiteLayout>
  );
}
