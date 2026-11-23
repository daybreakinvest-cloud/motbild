import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";

export const Route = createFileRoute("/en/about")({
  component: EnglishAboutPage,
});

function EnglishAboutPage() {
  return (
    <SiteLayout>
      {/* 1. HERO SECTION */}
      <section className="bg-[#090023] text-[#F9F8F5] py-20 md:py-24 px-6 border-b border-white/10 font-serif">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_auto] items-center gap-10">
          <div className="text-center md:text-left space-y-5">
            <div className="inline-block px-4 py-1.5 rounded-full border border-white/20 text-xs uppercase tracking-widest text-[#F9F8F5]">
              IDENTITY &amp; MISSION
            </div>
            <h1 className="text-4xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#F9F8F5]">
              Our mission and our faith
            </h1>
            <p className="text-xl sm:text-2xl text-[#F9F8F5] max-w-2xl mx-auto md:mx-0 leading-relaxed">
              On a broader level, we seek to encourage critical thinking through education, debates, and dialogue.
              More specifically, our purpose is to highlight a Biblical Unitarian perspective and give people the
              opportunity to contrast it with the traditional view of God in a respectful manner.
            </p>
          </div>

          <div className="flex flex-col items-center gap-4 mx-auto">
            <div className="size-72 sm:size-96 rounded-full bg-white overflow-hidden shrink-0">
              <img
                src="/peter_abramsgard_portrattbild.png"
                alt="Peter Abramsgård"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="text-sm text-[#F9F8F5] text-center">
              Peter Abramsgård - Director
            </p>
          </div>
        </div>
      </section>

      {/* 2. STATEMENT OF FAITH */}
      <section className="py-20 px-6 max-w-5xl mx-auto font-serif">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#090023]">
            Our statement of faith
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* The Father */}
          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#090023] bg-[#f3f0ed] px-3 py-1 rounded-full">
              THE FATHER
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#090023] pt-2">
              The only true God
            </h3>
            <p className="text-base text-[#090023] leading-relaxed">
              We believe, as Christ did, that the Father is the only true God (John 17:3). No one else is God in the same sense as the Father.
            </p>
          </div>

          {/* The Son */}
          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#090023] bg-[#f3f0ed] px-3 py-1 rounded-full">
              THE SON
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#090023] pt-2">
              God’s only begotten Son &amp; Messiah
            </h3>
            <p className="text-base text-[#090023] leading-relaxed">
              Jesus Christ is by nature a non-pre-existent human being (1 Tim 2:5), born of a woman and anointed as Messiah and Lord.
            </p>
          </div>

          {/* The Spirit */}
          <div className="bg-white border border-black/10 rounded-2xl p-7 shadow-xs space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-[#090023] bg-[#f3f0ed] px-3 py-1 rounded-full">
              THE SPIRIT
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#090023] pt-2">
              God’s power &amp; presence
            </h3>
            <p className="text-base text-[#090023] leading-relaxed">
              The Holy Spirit is not a third person in a Godhead. The term refers to the Father’s own spirit and activity, and at times to Christ himself.
            </p>
          </div>
        </div>

        <div className="mt-8 p-6 rounded-2xl bg-[#f3f0ed] border border-black/10 text-center text-lg text-[#090023]">
          <p>
            We believe that the doctrine of the Trinity is a human construct that developed over time through what is known as progressive revelation.
            Biblical Unitarian faith encompasses further areas, as reflected in the articles—yet our mission is concentrated on the core of the faith.
          </p>
        </div>
      </section>

      {/* 3. STORY: PETER ABRAMSGÅRD & THE FOUR RESOLUTIONS */}
      <section className="bg-white py-20 px-6 border-t border-b border-black/10 font-serif">
        <div className="max-w-4xl mx-auto space-y-12">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#F9F8F5] bg-[#090023] px-3.5 py-1.5 rounded-full inline-block mb-4">
              BACKGROUND &amp; EXPERIENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#090023]">
              Do not be a yes-man—the path to freedom
            </h2>
            <div className="text-base text-[#090023] space-y-4 mt-6 leading-relaxed">
              <p>
                I have been a believer for 37 years. From the day I came to faith, I had a longing for the truth of God’s Word.
                As a diligent student of the Bible, my discoveries frequently clashed with the traditional interpretations of my denomination.
              </p>
              <p>
                In 2011, I began for the first time to seriously study the Trinity and the deity of Jesus. My original aim was to prove
                once and for all the validity of the Trinity. Instead, it led me to an entirely different place.
              </p>
              <p>
                I saw how the doctrine of the Trinity was untenable in the light of the original texts. Jesus is not pre-existent in the
                traditional sense, nor is he God in the same sense as the Father. Although that realization at first brought emptiness and
                sorrow, it ultimately led to an immense freedom and joy. Jesus had not become smaller—he had become greater and truer.
              </p>
            </div>
          </div>

          {/* The 4 resolutions */}
          <div className="bg-[#f3f0ed] rounded-3xl p-8 sm:p-10 border border-black/10 space-y-6">
            <h3 className="text-xl font-bold text-[#090023]">
              I resolve:
            </h3>

            <div className="space-y-4">
              <div className="flex gap-4 items-start">
                <span className="font-bold text-base text-[#090023] bg-white size-8 rounded-full flex items-center justify-center shrink-0 border border-black/10">
                  1
                </span>
                <div>
                  <h4 className="font-bold text-lg sm:text-xl text-[#090023]">
                    Always to seek the truth in Scripture
                  </h4>
                  <p className="text-base text-[#090023] mt-1 leading-relaxed">
                    Regardless of denominational tradition and human opinions. This is a matter of exegesis and textual analysis, but above all of daring to question erroneous conclusions.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="font-bold text-base text-[#090023] bg-white size-8 rounded-full flex items-center justify-center shrink-0 border border-black/10">
                  2
                </span>
                <div>
                  <h4 className="font-bold text-lg sm:text-xl text-[#090023]">
                    Never to approach Scripture with a preconceived notion
                  </h4>
                  <p className="text-base text-[#090023] mt-1 leading-relaxed">
                    To stand free from confirmation bias, selective perception, and cognitive dissonance.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="font-bold text-base text-[#090023] bg-white size-8 rounded-full flex items-center justify-center shrink-0 border border-black/10">
                  3
                </span>
                <div>
                  <h4 className="font-bold text-lg sm:text-xl text-[#090023]">
                    Always to hold the truth of Scripture as the highest authority
                  </h4>
                  <p className="text-base text-[#090023] mt-1 leading-relaxed">
                    It does not matter what traditions and theologians say if it does not accord with Scripture.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <span className="font-bold text-base text-[#090023] bg-white size-8 rounded-full flex items-center justify-center shrink-0 border border-black/10">
                  4
                </span>
                <div>
                  <h4 className="font-bold text-lg sm:text-xl text-[#090023]">
                    Always and in every context to stand up for and share the truth
                  </h4>
                  <p className="text-base text-[#090023] mt-1 leading-relaxed">
                    At times the truth hurts, yet in the long run it is the only thing that sets us free.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
