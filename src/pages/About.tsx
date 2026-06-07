import { motion } from "motion/react";
import { PERSONAL_INFO, EXPERIENCES } from "../data";
import { Briefcase, Calendar, MapPin, Award } from "lucide-react";
// @ts-ignore
import dionThumbnail from "../assets/images/regenerated_image_1780838739317.png";

export default function About() {
  const interests = [
    "Traveling ✈",
    "Cooking 🍳",
    "Painting 🎨",
    "Typography",
    "Late-night projects",
    "New tools",
    "Rebranding things",
    "Photography"
  ];

  const educationalEntries = [
    {
      inst: "Bhilai Institute Of Technology, Durg",
      degree: "BTech in Information Technology — 8.4 GPA",
      duration: "July 2020 — July 2024",
      location: "Durg, India"
    },
    {
      inst: "ST. Xavier’s High School Bharni, Bilaspur",
      degree: "12th (HSC) — 75.66 %",
      duration: "May 2018 — June 2019",
      location: "Bilaspur, India"
    }
  ];

  return (
    <div className="w-full bg-bg-cream pt-24 min-h-screen grain-texture overflow-x-hidden">
      
      {/* SECTION 1: HOW I GOT HERE */}
      <section className="w-full py-16 px-6 md:px-12 select-none">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="overflow-hidden mb-12">
            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-serif text-[44px] sm:text-[64px] text-primary leading-tight font-normal select-none"
            >
              How I got here
            </motion.h1>
          </div>

          {/* Dual Columns Narrative Story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 font-sans text-[#444440] text-[16px] sm:text-[17px] leading-relaxed">
            <div className="flex flex-col gap-6">
              <p>
                I didn't grow up calling myself a designer. It really started back in school when a teacher handed me an art test. I didn't think much of it then, but that was the spark where <strong className="text-primary font-bold">painting became my primary creative escape</strong>.
              </p>
              <p>
                Then, I made the predictable "good student" move and chose to major in Information Technology. Pretty quickly, I realized that simple code syntax wasn't satisfying enough. I tried front-end development, thinking it would satisfy my visual cells, but raw static layouts still felt missing from a designer's perspective.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <p>
                During COVID, I retreated into physical art, eventually selling paintings online. This process re-awakened my love for creating from scratch. By 2022, I was balancing dual outputs: <strong className="text-primary font-bold">software engineering by day, pixel craftsmanship by night</strong>.
              </p>
              <p>
                Eventually, I decided to blend software constraints with digital artistry. That is how I steered myself into advanced HCI systems, dedicating my engineering background to designing products people actually love, understand, and reuse.
              </p>
            </div>
          </div>

          {/* SCATTERED IMAGE GRID (5 overlapping collage components with rotations snapping on hover) */}
          <div className="relative w-full h-[380px] mt-24 mb-16 hidden sm:block" id="about-fine-collage">
            {/* Collage 1 */}
            <div
              className="absolute left-0 top-0 w-[180px] h-[220px] rounded-lg overflow-hidden border border-border-custom shadow-md translate-x-4 translate-y-6 rotate-[-2deg] hover:rotate-0 hover:scale-105 hover:z-20 cubic-transition group cursor-pointer"
              data-cursor="view"
            >
              <img
                src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&auto=format&fit=crop&q=80"
                alt="Painting Canvas"
                className="w-full h-full object-cover group-hover:scale-105 duration-500"
                loading="lazy"
              />
            </div>

            {/* Collage 2 */}
            <div
              className="absolute left-[20%] top-[40px] w-[190px] h-[190px] rounded-lg overflow-hidden border border-border-custom shadow-md rotate-[1.5deg] hover:rotate-0 hover:scale-105 hover:z-20 cubic-transition group cursor-pointer"
              data-cursor="view"
            >
              <img
                src="https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=400&auto=format&fit=crop&q=80"
                alt="Acrylic Pigments Art"
                className="w-full h-full object-cover group-hover:scale-105 duration-500"
                loading="lazy"
              />
            </div>

            {/* Collage 3 */}
            <div
              className="absolute left-[42%] top-[-20px] w-[180px] h-[240px] rounded-lg overflow-hidden border border-border-custom shadow-md rotate-[-1deg] hover:rotate-0 hover:scale-105 hover:z-20 cubic-transition group cursor-pointer"
              data-cursor="view"
            >
              <img
                src={dionThumbnail}
                alt="UI SaaS Layouts"
                className="w-full h-full object-cover group-hover:scale-105 duration-500"
                loading="lazy"
              />
            </div>

            {/* Collage 4 */}
            <div
              className="absolute left-[62%] top-[60px] w-[200px] h-[200px] rounded-lg overflow-hidden border border-border-custom shadow-md rotate-[2deg] hover:rotate-0 hover:scale-105 hover:z-20 cubic-transition group cursor-pointer"
              data-cursor="view"
            >
              <img
                src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&auto=format&fit=crop&q=80"
                alt="Technology Coding"
                className="w-full h-full object-cover group-hover:scale-105 duration-500"
                loading="lazy"
              />
            </div>

            {/* Collage 5 */}
            <div
              className="absolute left-[80%] top-0 h-[230px] w-[180px] rounded-lg overflow-hidden border border-border-custom shadow-md rotate-[-1.5deg] hover:rotate-0 hover:scale-105 hover:z-20 cubic-transition group cursor-pointer"
              data-cursor="view"
            >
              <img
                src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&auto=format&fit=crop&q=80"
                alt="HCI diagrams study"
                className="w-full h-full object-cover group-hover:scale-105 duration-500"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: I DO A LOT (Interests Tag Cloud) */}
      <section className="w-full py-16 px-6 md:px-12 bg-white border-y border-border-custom/30 select-none">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-12 items-start md:items-center">
          <div className="w-full md:w-[40%]">
            <h2 className="font-serif text-[42px] sm:text-[52px] text-primary leading-none">
              I do a lot.
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#555550] mt-4 leading-relaxed">
              I've always been someone who thrives with multiple things on my plate — there's always something new I'm picking up. I love spending my time on traveling to new places, rebranding anything that looks slightly outdated, cooking, learning new tools, and DIY-ing my way through random projects at 2 a.m.
            </p>
          </div>
          <div className="w-full md:w-[60%] flex flex-wrap gap-2.5" id="interests-cloud-grid">
            {interests.map((tag, idx) => (
              <motion.span
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="font-sans text-xs sm:text-sm text-[#555550] bg-bg-cream border border-border-custom/60 px-5 py-2.5 rounded-full hover:bg-primary hover:text-bg-cream cubic-transition select-none cursor-pointer"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: EXPANDED DETAILED EXPERIENCE TIMELINE */}
      <section className="w-full py-20 px-6 md:px-12 select-none bg-bg-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-[42px] text-primary mb-12 select-none text-center sm:text-left">
            Professional Experience
          </h2>

          <div className="flex flex-col gap-12" id="about-extended-timeline">
            {EXPERIENCES.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white border border-border-custom rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 relative shadow-xs"
              >
                {/* Visual Label indicators */}
                <div className="flex-shrink-0 flex md:flex-col justify-between md:justify-start items-start gap-3 md:w-48 pb-4 md:pb-0 border-b md:border-b-0 md:border-r border-border-custom/60">
                  <div className="flex items-center gap-2 text-accent">
                    <Briefcase size={16} />
                    <span className="font-mono text-xs uppercase tracking-wider font-bold">Role Details</span>
                  </div>
                  <span className="font-sans text-md font-bold text-primary block mt-1">{exp.company}</span>
                  <div className="flex flex-col gap-1 mt-2 text-[12px] text-muted-text font-mono">
                    <span className="flex items-center gap-1"><Calendar size={12} /> {exp.duration}</span>
                    <span className="flex items-center gap-1"><MapPin size={12} /> {exp.location}</span>
                  </div>
                </div>

                {/* Sub Bullet Details */}
                <div className="flex-grow flex flex-col gap-3">
                  <h4 className="font-sans text-md sm:text-lg font-bold text-primary italic">
                    {exp.role}
                  </h4>
                  <ul className="list-disc pl-4 font-sans text-sm text-[#555550] flex flex-col gap-2.5">
                    {exp.description.map((bullet, i) => (
                      <li key={i} className="leading-relaxed">{bullet}</li>
                    ))}
                  </ul>

                  {/* Skills tags built during intern */}
                  {exp.skillsBuilt && (
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border-custom/35">
                      {exp.skillsBuilt.map((skill, si) => (
                        <span 
                          key={si}
                          className="font-mono text-[10px] text-[#555550] bg-bg-cream border border-border-custom/40 px-2.5 py-1 rounded"
                        >
                          #{skill}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* EDUCATION SECTION */}
          <h2 className="font-serif text-[42px] text-primary mt-24 mb-10 text-center sm:text-left select-none">
            Education
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="about-education-timeline">
            {educationalEntries.map((edu, idx) => (
              <div 
                key={idx} 
                className="bg-white border border-border-custom/80 rounded-2xl p-6 flex flex-col justify-between hover:border-accent duration-300"
              >
                <div>
                  <span className="font-mono text-[11px] text-muted-text block uppercase tracking-wider">{edu.duration}</span>
                  <h4 className="font-sans text-base font-bold text-primary mt-1.5 h-12 flex items-center">{edu.inst}</h4>
                  <p className="font-sans text-sm text-[#555550] mt-1">{edu.degree}</p>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-muted-text font-mono mt-4 pt-3 border-t border-border-custom/30">
                  <MapPin size={10} /> <span>{edu.location}</span>
                </div>
              </div>
            ))}
          </div>

          {/* ACHIEVEMENTS & CERTIFICATIONS */}
          <h2 className="font-serif text-[42px] text-primary mt-20 mb-8 text-center sm:text-left select-none">
            Achievements
          </h2>
          <div className="bg-white border border-border-custom rounded-2xl p-6 flex flex-col gap-4">
            <div className="flex items-start gap-3">
              <Award className="text-accent flex-shrink-0 mt-0.5" size={18} />
              <div>
                <span className="font-sans text-sm sm:text-[15px] font-bold text-primary">Grand Finalist — Smart India Hackathon 2023</span>
                <p className="font-sans text-xs sm:text-sm text-muted-text mt-0.5">Designed and developed Sentiment Analysis voice classify helpdesk models.</p>
              </div>
            </div>
            <hr className="border-border-custom/35" />
            <div className="flex items-start gap-3">
              <Award className="text-accent flex-shrink-0 mt-0.5" size={18} />
              <div>
                <span className="font-sans text-sm sm:text-[15px] font-bold text-primary">Semi-Finalist — TechGig Coding Competition</span>
                <p className="font-sans text-xs sm:text-sm text-muted-text mt-0.5">Ranked high across 2021 & 2023 technical coding benchmarks.</p>
              </div>
            </div>
            <hr className="border-border-custom/35" />
            <div className="flex items-start gap-3">
              <Award className="text-accent flex-shrink-0 mt-0.5" size={18} />
              <div>
                <span className="font-sans text-sm sm:text-[15px] font-bold text-primary">Certified Core Specializations (IIT Bombay)</span>
                <p className="font-sans text-xs sm:text-sm text-muted-text mt-0.5">Accredited in Advanced C++, HTML & CSS, and JavaScript programming.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
