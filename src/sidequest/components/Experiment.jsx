import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CONTENT } from "../data/content";
import { useUI } from "../context/UIContext";
import {
  AUDIENCES,
  CONSTRAINTS,
  FORMATS,
  DEFAULTS,
  find,
  buildCard,
} from "../lib/scenario";
import SceneIllustration from "./SceneIllustration";
import { Eyebrow, Reveal, Label, GhostNumber } from "./bits";

const S = CONTENT.scenario;

function ChoiceGroup({ q, items, value, onChange, group }) {
  return (
    <div
      role="radiogroup"
      aria-label={q}
      className="border-t border-sq-line pt-5"
    >
      <Label tone="text-sq-accent">{q}</Label>
      <div className="mt-3 flex flex-wrap gap-2">
        {items.map((it) => {
          const active = value === it.id;
          return (
            <button
              key={it.id}
              role="radio"
              aria-checked={active}
              data-testid={`scenario-${group}-${it.id}`}
              onClick={() => onChange(it.id)}
              className={`px-4 py-2.5 font-mono text-[11px] tracking-[0.12em] uppercase border transition-all duration-300 ${
                active
                  ? "bg-lime text-black border-sq-accent font-medium"
                  : "border-sq-line text-sq-muted hover:border-sq-accent hover:text-sq-accent"
              }`}
            >
              {it.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function CardSection({ k, v }) {
  return (
    <div className="border-t border-sq-line/70 pt-4">
      <Label>{k}</Label>
      <p className="mt-2 text-sm leading-relaxed text-sq-fg/90">{v}</p>
    </div>
  );
}

export default function Experiment() {
  const ui = useUI();
  const [audId, setAudId] = useState(DEFAULTS.audience);
  const [conId, setConId] = useState(DEFAULTS.constraint);
  const [fmtId, setFmtId] = useState(DEFAULTS.format);

  const a = find(AUDIENCES, audId);
  const c = find(CONSTRAINTS, conId);
  const f = find(FORMATS, fmtId);
  const card = buildCard(a, c, f);

  return (
    <section id="sidequest" className="relative py-24 sm:py-32 scroll-mt-16">
      <GhostNumber n="00" />
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal>
          <Eyebrow>{S.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display font-semibold tracking-tight leading-[1.02] text-[clamp(2rem,4.6vw,4.2rem)] max-w-4xl">
            {S.title.split(" ").slice(0, 3).join(" ")}{" "}
            <em className="font-serifit italic font-normal text-sq-accent">
              {S.title.split(" ").slice(3).join(" ")}
            </em>
          </h2>
          <p className="mt-5 max-w-2xl text-sq-muted text-base leading-relaxed">
            {S.intro}
          </p>
        </Reveal>

        <div className="mt-14 grid lg:grid-cols-12 gap-10">
          <Reveal className="lg:col-span-5">
            <div className="flex flex-col gap-6">
              <ChoiceGroup
                group="audience"
                q={S.question}
                items={AUDIENCES}
                value={audId}
                onChange={setAudId}
              />
              <ChoiceGroup
                group="constraint"
                q={S.cQuestion}
                items={CONSTRAINTS}
                value={conId}
                onChange={setConId}
              />
              <ChoiceGroup
                group="format"
                q={S.fQuestion}
                items={FORMATS}
                value={fmtId}
                onChange={setFmtId}
              />
              <p
                data-testid="scenario-spec"
                className="font-mono text-[10px] tracking-[0.2em] text-sq-subtle uppercase border border-dashed border-sq-line px-4 py-3"
              >
                {S.specLabel} {card.spec}
              </p>
            </div>
          </Reveal>

          <div className="lg:col-span-7">
            <Reveal delay={0.1}>
              <SceneIllustration
                scene={card.scene}
                audience={audId}
                constraint={conId}
              />
            </Reveal>

            <AnimatePresence mode="wait">
              <motion.div
                key={card.spec}
                data-testid="scenario-card"
                initial={false}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-6 border border-sq-accent/30 bg-sq-panel/60 p-6 sm:p-8"
              >
                <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
                  <div className="sm:col-span-2">
                    <div className="flex items-center gap-3">
                      <Label tone="text-sq-accent">HYPOTHESIS</Label>
                      <span className="chip chip-placeholder">
                        EXPERIMENT PLAN
                      </span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-sq-fg/90">
                      <span className="text-sq-subtle font-mono text-xs mr-2">
                        {a.code}
                      </span>
                      {card.hypothesis}
                    </p>
                  </div>
                  <CardSection k="INVITATION HOOK" v={card.hook} />
                  <CardSection
                    k="PLAUSIBLE DISTRIBUTION ROUTE"
                    v={card.distribution}
                  />
                  <CardSection k="FIRST SMALL TEST" v={card.test} />
                  <CardSection k="WHAT COULD FAIL" v={card.fail} />
                </div>
                <div className="mt-5 border-t border-sq-line/70 pt-4">
                  <Label tone="text-sq-accent">{S.measureLabel}</Label>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {card.measure.map((m, i) => (
                      <li
                        key={m}
                        data-testid={`scenario-measure-${i}`}
                        className="font-mono text-[10px] tracking-[0.14em] uppercase text-sq-fg border border-sq-line px-3 py-1.5"
                      >
                        <span className="text-sq-accent mr-2">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {m}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-3 font-mono text-[10px] text-sq-subtle tracking-[0.14em] uppercase">
                    {S.measureNote}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <Reveal delay={0.05} className="mt-10">
          <div
            data-testid="why-neighborly"
            className="border-l-2 border-neon-orange bg-neon-orange/[0.04] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5"
          >
            <div>
              <Label tone="text-neon-orange">{S.whyLabel}</Label>
              <p className="mt-2 max-w-2xl text-sq-fg/90 text-sm sm:text-base leading-relaxed">
                {S.why}
              </p>
            </div>
            <button
              data-testid="why-neighborly-btn"
              onClick={() => ui.goTo(S.target)}
              className="sm:ml-auto shrink-0 chip border-neon-orange text-neon-orange hover:bg-neon-orange hover:text-black transition-colors !py-2.5 !px-5"
            >
              {S.whyCta} ↓
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
