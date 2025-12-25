"use client";

import Navbar from "../components/Navbar";
import ContactForm from "../components/ContactForm";
import { useReveal } from "../components/useReveal";
import { useParallax } from "../components/useParallax";

export default function Home() {
  const about = useReveal();
  const research = useReveal();
  const work = useReveal();
  const contact = useReveal();

  // Mouse parallax (returns number)
  const parallax = useParallax(40);

  return (
    <>
      <Navbar />

      <main className="bg-[#0b0f1a] text-gray-300 pt-24 overflow-x-hidden">

        {/* ================= HERO ================= */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050814]">

          {/* Parallax AI Glows */}
          <div className="absolute inset-0 -z-10">
            <div
              style={{ transform: `translateY(${parallax}px)` }}
              className="absolute top-[-300px] left-1/2 h-[700px] w-[700px]
              -translate-x-1/2 rounded-full bg-sky-500/30 blur-[160px]
              animate-pulseSlow"
            />
            <div
              style={{ transform: `translateY(${-parallax}px)` }}
              className="absolute bottom-[-250px] right-[-200px] h-[600px] w-[600px]
              rounded-full bg-purple-500/25 blur-[160px]
              animate-pulseSlower"
            />
            <div
              style={{ transform: `translateY(${parallax * 0.6}px)` }}
              className="absolute bottom-[-200px] left-[-200px] h-[500px] w-[500px]
              rounded-full bg-cyan-400/20 blur-[140px]
              animate-pulseSlow"
            />
          </div>

          {/* Hero Content */}
          <div className="max-w-5xl px-6 text-center">
            <h1 className="text-6xl md:text-7xl font-extrabold text-white mb-8 leading-tight">
              Applied AI
              <br />
              <span className="text-sky-400 drop-shadow-[0_0_25px_rgba(56,189,248,0.6)]">
                Beyond Research
              </span>
            </h1>

            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12 leading-relaxed">
              RALAXA is a research-driven AI lab building reliable,
              real-world intelligent systems across healthcare,
              security, and computer vision.
            </p>

            <div className="flex justify-center gap-6">
              <a
                href="#research"
                className="px-9 py-4 rounded-xl bg-sky-400 text-black text-lg font-semibold
                hover:opacity-90 hover:scale-[1.03] transition-all duration-300"
              >
                Research
              </a>
              <a
                href="#contact"
                className="px-9 py-4 rounded-xl border border-white/30 text-lg text-white
                hover:border-white hover:bg-white/5 transition-all duration-300"
              >
                Contact
              </a>
            </div>
          </div>
        </section>

        {/* ================= DIVIDER ================= */}
        <div className="py-24">
          <div className="mx-auto h-[2px] max-w-5xl
            bg-gradient-to-r from-transparent via-sky-400 to-transparent" />
        </div>

        {/* ================= ABOUT ================= */}
        <section
          id="about"
          ref={about.ref}
          className={`py-24 reveal ${about.visible ? "visible" : ""}`}
        >
          <div className="max-w-5xl mx-auto px-6">
            <h2 className="text-4xl font-bold mb-8 text-white">
              About RALAXA
            </h2>
            <p className="text-lg leading-relaxed">
              RALAXA is a deep-technology research lab focused on applied
              artificial intelligence. We bridge rigorous academic research
              with deployable, real-world AI systems across high-impact domains.
            </p>
          </div>
        </section>

        {/* ================= RESEARCH ================= */}
        <section
          id="research"
          ref={research.ref}
          className={`py-24 bg-[#0e1322] reveal ${research.visible ? "visible" : ""}`}
        >
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-4xl font-bold text-white mb-12">
              Research & Publications
            </h2>

            <div className="grid md:grid-cols-2 gap-10">
              {[
                ["Medical & Healthcare AI", "Medical image analysis, multimodal learning, and clinical decision-support systems."],
                ["Intelligent Security Systems", "AI-driven anomaly detection, reasoning, and forensic intelligence."],
                ["Applied Computer Vision", "Detection, tracking, and deployment under real-world constraints."],
                ["Publications & Dissemination", "Peer-reviewed journals, conferences, and technical research outputs."]
              ].map(([title, desc]) => (
                <div
                  key={title}
                  className="group relative border border-white/10 rounded-2xl p-8 bg-[#0b0f1a]
                  transition-all duration-500 hover:-translate-y-2
                  hover:border-sky-400/50
                  hover:shadow-[0_0_40px_rgba(56,189,248,0.25)]"
                >
                  <h3 className="text-xl font-semibold text-white mb-4">
                    {title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {desc}
                  </p>

                  <div className="absolute inset-0 rounded-2xl opacity-0
                    group-hover:opacity-100 transition-opacity duration-500
                    pointer-events-none
                    bg-gradient-to-br from-sky-400/10 to-transparent" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ================= FOUNDER ================= */}
        <section
          id="work"
          ref={work.ref}
          className={`py-32 reveal ${work.visible ? "visible" : ""}`}
        >
          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-16 items-center">

            <div className="flex justify-center">
              <div className="relative w-60 h-60 rounded-full overflow-hidden
                border border-white/20 bg-[#111827]">
                <img
                  src="/founder/rahul.jpg"
                  alt="Rahul – Founder of RALAXA"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-3xl font-semibold text-white mb-2">
                Rahul
              </h3>

              <p className="inline-block mb-6 px-4 py-1 rounded-full
                bg-sky-400/10 text-sky-400 text-sm font-medium">
                Founder & Research Lead · PhD
              </p>

              <p className="text-lg leading-relaxed mb-4">
                PhD-trained engineer and AI researcher with deep expertise
                in medical image processing, intelligent systems, and
                deployable AI built under real-world constraints.
              </p>

              <p className="text-lg leading-relaxed">
                RALAXA was founded to build research-driven AI systems
                grounded in scientific depth, engineering rigor,
                and long-term impact.
              </p>
            </div>
          </div>
        </section>

        {/* ================= CONTACT ================= */}
        <section
          id="contact"
          ref={contact.ref}
          className={`relative py-32 reveal ${contact.visible ? "visible" : ""}`}
        >
          <div className="absolute inset-0 -z-10 flex justify-center">
            <div className="w-[700px] h-[700px] rounded-full bg-sky-500/10 blur-[180px]" />
          </div>

          <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Let’s Build Something
                <span className="text-sky-400"> Meaningful</span>
              </h2>

              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                Interested in research collaboration, consulting, or
                building intelligent systems together?
              </p>

              <p className="text-gray-400 leading-relaxed">
                Reach out to RALAXA for academic partnerships,
                industry projects, or deep-tech discussions.
              </p>
            </div>

            <ContactForm />
          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="py-10 border-t border-white/10 text-gray-400 text-center">
          © {new Date().getFullYear()} RALAXA. All rights reserved.
        </footer>

      </main>
    </>
  );
}
