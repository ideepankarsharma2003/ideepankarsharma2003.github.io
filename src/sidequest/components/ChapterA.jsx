import { motion } from "framer-motion";
import { CONTENT } from "../data/content";
import { Eyebrow, Reveal, Label, GhostNumber } from "./bits";

const C = CONTENT.chapters.intelligence;

function PipelineNode({ t, s, i }) {
  return (
    <motion.div
      data-testid={`pipeline-node-${i}`}
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.55, delay: i * 0.16, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex-1 min-w-[150px] border border-sq-line bg-sq-panel/50 p-4"
    >
      <p className="font-mono text-[10px] tracking-[0.2em] text-sq-subtle">
        {String(i + 1).padStart(2, "0")}
      </p>
      <p className="mt-2 font-display font-semibold tracking-tight text-sm sm:text-base text-sq-fg">
        {t}
      </p>
      <p className="mt-1.5 text-[11px] leading-snug text-sq-muted">{s}</p>
    </motion.div>
  );
}

export default function ChapterA() {
  return (
    <section
      id="intelligence"
      className="relative py-24 sm:py-32 border-t border-sq-line scroll-mt-16 overflow-x-clip"
    >
      <GhostNumber n="01" />
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal>
          <Eyebrow tone="text-neon-cyan">{C.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display font-semibold tracking-tight leading-[1.02] text-[clamp(2rem,4.6vw,4.2rem)]">
            Build{" "}
            <em className="font-serifit italic font-normal text-neon-cyan">
              Intelligence.
            </em>
          </h2>
          <p className="mt-5 max-w-2xl text-sq-muted text-base leading-relaxed">
            {C.intro} {C.intro2}
          </p>
        </Reveal>

        <Reveal delay={0.1} className="mt-12">
          <div className="flex flex-col md:flex-row md:items-stretch gap-3">
            {C.pipeline.map((p, i) => (
              <div
                key={p.t}
                className="flex flex-col md:flex-row md:items-center flex-1 gap-3"
              >
                <PipelineNode t={p.t} s={p.s} i={i} />
                {i < C.pipeline.length - 1 && (
                  <motion.svg
                    viewBox="0 0 20 20"
                    className="w-4 h-4 shrink-0 self-center md:rotate-0 rotate-90 text-sq-subtle"
                    initial={false}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.16 + 0.3 }}
                    aria-hidden="true"
                  >
                    <path
                      d="M3 10 h12 M11 5 l5 5 -5 5"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </motion.svg>
                )}
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-8">
          <Label>{C.skillsLabel}</Label>
          <ul className="mt-3 flex flex-wrap gap-2">
            {C.skills.map((s) => (
              <li
                key={s}
                className="font-mono text-[10px] tracking-[0.1em] uppercase text-sq-muted border border-sq-line px-3 py-1.5 hover:border-neon-cyan hover:text-neon-cyan transition-colors"
              >
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-2 gap-6">
          <Reveal delay={0.05}>
            <article
              data-testid="project-card"
              className="h-full border border-sq-line bg-sq-panel/60 p-6 sm:p-8"
            >
              <Label tone="text-neon-cyan">{C.project.label}</Label>
              <h3 className="mt-3 font-display font-semibold tracking-tight text-2xl sm:text-3xl">
                {C.project.name}
              </h3>
              <p className="mt-1 font-mono text-[11px] tracking-[0.14em] text-sq-subtle uppercase">
                {C.project.org}
              </p>
              <div className="mt-6 border-t border-sq-line/70 pt-4">
                <Label>THE PROBLEM</Label>
                <p className="mt-2 text-sm leading-relaxed text-sq-fg/90">
                  {C.project.problem}
                </p>
              </div>
              <div className="mt-5 border-t border-sq-line/70 pt-4">
                <div className="flex flex-wrap items-center gap-3">
                  <Label>MY CONTRIBUTION</Label>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-sq-fg/90">
                  {C.project.contribution}
                </p>
              </div>
            </article>
          </Reveal>

          <Reveal delay={0.12}>
            <article className="h-full flex flex-col gap-6">
              <div className="border border-sq-line bg-sq-panel/60 p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <Label>COMPUTER VISION IN PRODUCTION</Label>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-sq-fg/90">
                  Production inference for person re-identification and
                  attribute models, with ONNX, OpenVINO, and edge deployment.
                </p>
              </div>
              <div className="border border-neon-cyan/30 bg-neon-cyan/[0.03] p-6 sm:p-8">
                <div className="flex flex-wrap items-center gap-3">
                  <Label tone="text-neon-cyan">FROM LABELS TO TRAINING</Label>
                </div>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-sq-fg/90 font-display">
                  Automated training pipelines and video synopsis work reduced
                  the label-to-train cycle by 65%.
                </p>
              </div>
            </article>
          </Reveal>
        </div>

        <Reveal delay={0.05} className="mt-6">
          <Label tone="text-neon-cyan">{C.shelfLabel}</Label>
          <div className="mt-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {C.shelf.map((s, i) => (
              <Reveal key={s.name} delay={i * 0.06} className="h-full">
                <article
                  data-testid={`shelf-${s.name.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                  className="h-full flex flex-col border border-sq-line bg-sq-surface/60 p-5 hover:border-neon-cyan/60 hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="chip !text-neon-cyan !border-neon-cyan/40 self-start">
                    {s.tag}
                  </span>
                  <h3 className="mt-3 font-display font-semibold tracking-tight text-lg text-sq-fg">
                    {s.name}
                  </h3>
                  <p className="mt-2 text-xs leading-relaxed text-sq-muted flex-1">
                    {s.desc}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
