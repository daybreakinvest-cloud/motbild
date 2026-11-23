import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/en/bylaws")({
  component: EnglishBylawsPage,
});

const BYLAWS = [
  {
    number: "1",
    title: "Name",
    content: [
      "The name of the association is Motbild – Biblical Unitarian Network.",
    ],
  },
  {
    number: "2",
    title: "Registered office",
    content: [
      "The association has its registered office in Stockholm.",
    ],
  },
  {
    number: "3",
    title: "Purpose",
    content: [
      "The purpose of the association is to highlight the Biblical Unitarian perspective and to provide people with the opportunity to test, contrast, and critically examine different perspectives on God and Christ through teaching, debates, seminars, courses, and open dialogue.",
      "The association seeks to encourage independent inquiry, critical thinking, and an open pursuit of truth by illuminating contrasting perspectives and challenging preconceived notions and uncritical acceptance of traditions and established views.",
    ],
  },
  {
    number: "4",
    title: "Statement of faith",
    content: [
      "The Father is the only true God.",
      "Jesus Christ is God’s only begotten Son and Messiah.",
      "Jesus Christ is non-pre-existent.",
      "Jesus Christ is not God in the same sense as the Father.",
    ],
  },
  {
    number: "5",
    title: "Board",
    content: [
      "The board consists of a chairperson, a treasurer/vice chairperson, and at least one (1) other board member, i.e., at least three board members in total.",
      "The board is elected by the annual general meeting for a term of one year at a time.",
      "A nominating committee is appointed by the annual general meeting and consists of at least one person. The nominating committee’s duty is to propose candidates for the board prior to the annual general meeting.",
      "The association’s authorized signatories are the chairperson jointly with the vice chairperson. (Alternatively: the chairperson together with another board member specifically appointed by the board.)",
      "The vice chairperson is responsible for the membership register and the registration of new members.",
    ],
  },
  {
    number: "6",
    title: "Annual general meeting",
    content: [
      "An annual general meeting shall be held once per year.",
      "The annual general meeting elects the board and nominating committee, reviews the annual activity report and financial statements, and addresses matters submitted by the board or by members.",
      "Notice of the annual general meeting shall be sent to members at least 14 days before the meeting.",
      "An extraordinary general meeting may be convened by the board when necessary. Notice of an extraordinary general meeting shall be sent at least 7 days before the meeting. At an extraordinary general meeting, only the matters specified in the notice may be addressed.",
    ],
  },
  {
    number: "7",
    title: "Membership",
    content: [
      "Membership is free of charge.",
      "Membership is obtained by accepting the association’s purpose, statement of faith, and bylaws, and registering as a member. Each member has one vote at the annual general meeting.",
      "Membership ceases automatically if the member personally requests withdrawal or if it clearly emerges that the member no longer shares the association’s purpose, statement of faith, or bylaws.",
    ],
  },
  {
    number: "8",
    title: "Documentation",
    content: [
      "Annual general meetings, member meetings, and board meetings shall be recorded.",
      "The recordings are used solely for preparing minutes and shall be deleted no later than 30 days after the minutes have been approved, unless the board for special reasons decides to retain a recording for a longer period. The recordings are accessible only to the chairperson, secretary, and treasurer/vice chairperson.",
      "Minutes shall be preserved and archived by the association.",
    ],
  },
  {
    number: "9",
    title: "Fiscal year",
    content: [
      "The association’s operational year and fiscal year follow the calendar year.",
    ],
  },
  {
    number: "10",
    title: "Amendments to the bylaws",
    content: [
      "Amending these bylaws requires a resolution by the annual general meeting with at least a two-thirds majority.",
    ],
  },
  {
    number: "11",
    title: "Dissolution",
    content: [
      "Upon dissolution of the association, the annual general meeting decides how the association’s assets shall be distributed. A resolution to dissolve requires at least a two-thirds majority.",
    ],
  },
];

function EnglishBylawsPage() {
  return (
    <SiteLayout>
      {/* 1. HERO SECTION */}
      <section className="bg-[#090023] text-[#F9F8F5] py-20 md:py-24 px-6 border-b border-white/10 font-serif text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-xs uppercase tracking-widest text-[#F9F8F5]">
            Official association bylaws
          </div>
          <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#F9F8F5]">
            Bylaws of Motbild
          </h1>
          <p className="text-xl sm:text-2xl text-[#F9F8F5] max-w-2xl mx-auto leading-relaxed">
            Motbild – Biblical Unitarian Network (Registered office: Stockholm)
          </p>
        </div>
      </section>

      {/* 2. BYLAWS TEXT */}
      <section className="py-20 px-6 max-w-4xl mx-auto font-serif">
        <div className="bg-[#090023] border border-white/15 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-10">
          {BYLAWS.map((b) => (
            <div key={b.number} className="border-b border-white/10 pb-8 last:border-b-0 last:pb-0 space-y-3">
              <div className="flex items-center gap-3">
                <span className="font-bold text-base text-[#090023] bg-[#F9F8F5] size-8 rounded-full flex items-center justify-center shrink-0">
                  {b.number}
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-[#F9F8F5]">
                  {b.title}
                </h2>
              </div>
              <div className="pl-11 space-y-2 text-base text-[#F9F8F5] leading-relaxed">
                {b.content.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
