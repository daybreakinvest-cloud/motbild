import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Clock, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/en/debate")({
  component: EnglishDebatePage,
});

const DEBATE_SCHEDULE = [
  {
    time: "18:00–18:10",
    stage: "Introduction",
    description: "The host welcomes the audience, introduces the evening’s topic, and hands over to the moderator.",
  },
  {
    time: "18:10–18:30",
    stage: "Proponent’s opening statement",
    description: "Main thesis, central concepts, and exegetical examination of the biblical texts.",
  },
  {
    time: "18:30–18:50",
    stage: "Opponent’s opening statement",
    description: "Counter-perspective, textual analysis, and argumentation against the traditional position.",
  },
  {
    time: "18:50–19:20",
    stage: "Rebuttals & responses",
    description: "Both debaters expose weaknesses in their opponent’s arguments and defend their own thesis.",
  },
  {
    time: "19:20–19:40",
    stage: "Refreshment break & reflection",
    description: "Break for conversation, renewed energy, and the formulation of written questions from the audience.",
  },
  {
    time: "19:40–20:10",
    stage: "Cross-examination between debaters",
    description: "Brief, incisive questions and direct answers under the moderator’s direction.",
  },
  {
    time: "20:10–20:45",
    stage: "Audience questions",
    description: "The moderator collects questions from the audience and allocates speaking time fairly between both sides.",
  },
  {
    time: "20:45–21:00",
    stage: "Closing statements & conclusion",
    description: "Summary arguments and concluding message to the congregation and viewers.",
  },
];

function EnglishDebatePage() {
  return (
    <SiteLayout>
      {/* 1. HERO SECTION */}
      <section className="bg-[#090023] text-[#F9F8F5] py-20 md:py-24 px-6 border-b border-white/10 font-serif">
        <div className="max-w-4xl mx-auto text-center space-y-5">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-xs uppercase tracking-widest text-[#F9F8F5]">
            PEDAGOGICAL EDUCATIONAL FORMAT
          </div>
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#F9F8F5]">
            Truth does not hide. Why should we?
          </h1>
          <p className="text-xl sm:text-2xl text-[#F9F8F5] max-w-2xl mx-auto leading-relaxed">
            Debate does not declare winners or losers; it is the instrument that affords the audience the opportunity to listen, think, study, and examine.
          </p>
        </div>
      </section>

      {/* 2. BODY TEXT */}
      <section className="py-20 px-6 max-w-4xl mx-auto space-y-12 font-serif">
        <div className="space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#090023]">
            Biblical precedent and our contemporary age
          </h2>

          <div className="bg-[#f3f0ed] rounded-3xl p-8 sm:p-10 border border-black/10 space-y-6">
            <div className="flex gap-4 items-start">
              <span className="font-bold text-base text-[#090023] bg-white size-8 rounded-full flex items-center justify-center shrink-0 border border-black/10">
                1
              </span>
              <div>
                <h3 className="font-bold text-xl sm:text-2xl text-[#090023]">
                  The example of Jesus
                </h3>
                <p className="text-base text-[#090023] mt-1 leading-relaxed">
                  Jesus gave his disciples no command to debate, yet we repeatedly encounter him in public exchanges where he examines arguments and challenges established assumptions.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="font-bold text-base text-[#090023] bg-white size-8 rounded-full flex items-center justify-center shrink-0 border border-black/10">
                2
              </span>
              <div>
                <h3 className="font-bold text-xl sm:text-2xl text-[#090023]">
                  Paul and the early mission
                </h3>
                <p className="text-base text-[#090023] mt-1 leading-relaxed">
                  Paul reasoned in the synagogues and on the Areopagus. The early mission was characterized by open defence and open examination of the faith.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <span className="font-bold text-base text-[#090023] bg-white size-8 rounded-full flex items-center justify-center shrink-0 border border-black/10">
                3
              </span>
              <div>
                <h3 className="font-bold text-xl sm:text-2xl text-[#090023]">
                  Swedish Christianity today
                </h3>
                <p className="text-base text-[#090023] mt-1 leading-relaxed">
                  In Sweden, we are unaccustomed to public debate and prefer conversation and consensus. Even within Christianity, formal debates have become rare, despite the fact that we encounter competing perspectives daily in books, podcasts, and social media.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* QUOTE BOX */}
        <div className="rounded-3xl bg-[#090023] text-[#F9F8F5] p-8 sm:p-10 border border-white/10 shadow-lg text-center space-y-4">
          <p className="text-xl sm:text-2xl italic text-[#F9F8F5] leading-relaxed">
            “We are convinced that the truth has nothing to fear from an open and respectful examination.”
          </p>
        </div>

        {/* 3. SCHEDULE */}
        <div className="pt-8 space-y-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#090023] bg-[#f3f0ed] px-3.5 py-1.5 rounded-full border border-black/10 inline-block mb-3">
              FORMAT &amp; SCHEDULE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#090023]">
              How a debate is structured
            </h2>
            <p className="text-base text-[#090023] mt-2 leading-relaxed">
              A debate evening lasts approximately 3 hours, including a refreshment break. It is conducted under strictly ordered
              and respectful guidelines with a neutral moderator responsible for speaking times and order.
            </p>
          </div>

          <div className="space-y-3">
            {DEBATE_SCHEDULE.map((item, idx) => (
              <div
                key={idx}
                className="bg-white border border-black/10 rounded-2xl p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="sm:w-1/4">
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#090023] bg-[#f3f0ed] px-2.5 py-1 rounded-lg">
                    <Clock className="size-3 text-[#090023]" />
                    {item.time}
                  </span>
                </div>
                <div className="sm:w-3/4">
                  <h3 className="font-bold text-lg sm:text-xl text-[#090023]">
                    {item.stage}
                  </h3>
                  <p className="text-base text-[#090023] mt-0.5 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA FOR CONGREGATIONS */}
          <div className="bg-[#f3f0ed] border border-black/10 rounded-3xl p-8 sm:p-10 text-center space-y-4 mt-12">
            <h3 className="text-xl sm:text-2xl font-bold text-[#090023]">
              Would your congregation like to host a debate?
            </h3>
            <p className="text-base text-[#090023] max-w-lg mx-auto leading-relaxed">
              Motbild handles planning, speakers, moderator, and production. You open your doors and invite your congregation.
            </p>
            <div className="pt-2">
              <Link
                to="/en/co-host"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#FFA8CD] hover:bg-[#ff94be] text-[#090023] font-bold text-xs uppercase tracking-widest transition-all"
              >
                READ ABOUT CO-HOSTING <ArrowRight className="size-3.5 text-[#090023]" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
