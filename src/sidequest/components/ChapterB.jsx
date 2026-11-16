import { CONTENT } from "../data/content";
import { Eyebrow, Reveal, Label, GhostNumber } from "./bits";
import PlayableFilm from "./PlayableFilm";

const C = CONTENT.chapters.connection;

const GatheringIcon = ({ icon }) => {
  if (icon === "aipan")
    return (
      <svg viewBox="0 0 48 48" className="w-9 h-9" aria-hidden="true">
        <g fill="none" stroke="#FF6B35" strokeWidth="1.8">
          <path d="M24 6 L42 24 L24 42 L6 24 Z" />
          <path d="M24 14 L34 24 L24 34 L14 24 Z" />
        </g>
        <circle cx="24" cy="24" r="2.5" fill="#FF6B35" />
      </svg>
    );
  if (icon === "rasna")
    return (
      <svg viewBox="0 0 48 48" className="w-9 h-9" aria-hidden="true">
        <g fill="none" stroke="#FF6B35" strokeWidth="1.8" strokeLinecap="round">
          <path d="M14 20 h12 l-2 20 h-8 Z" />
          <path d="M17 20 v-6 h6 v6" />
          <path d="M32 16 c3 3 3 7 0 10" />
          <path d="M36 12 c5 5 5 13 0 18" />
        </g>
      </svg>
    );
  return (
    <svg viewBox="0 0 48 48" className="w-9 h-9" aria-hidden="true">
      <g fill="none" stroke="#FF6B35" strokeWidth="1.8" strokeLinecap="round">
        <circle cx="24" cy="20" r="7" />
        <path d="M24 6 v3 M24 31 v3 M10 20 h3 M35 20 h3 M14 10 l2 2 M32 32 l2 2 M34 10 l-2 2 M16 32 l-2 2 M8 40 h32" />
      </g>
    </svg>
  );
};

function GatheringCard({ g, i }) {
  return (
    <Reveal delay={i * 0.08} className="h-full">
      <article
        data-testid={`gathering-${g.icon}`}
        className="h-full flex flex-col border border-sq-line bg-sq-panel/60 overflow-hidden hover:border-neon-orange/60 hover:-translate-y-1 transition-all duration-300"
      >
        <PlayableFilm
          embed={g.embed}
          videoId={g.videoId}
          igEmbed={g.igEmbed}
          title={g.t}
          showCaption={false}
          url={
            g.embed === false && g.videoId
              ? `https://www.youtube.com/watch?v=${g.videoId}`
              : g.url
          }
          dark
          className="!border-0 !bg-transparent"
        />
        <div className="p-5 flex flex-col flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-display font-semibold tracking-tight text-xl text-sq-fg">
              {g.t}
            </h3>
            <span className="w-9 h-9 shrink-0 rounded-lg bg-sq-bg/85 border border-sq-line flex items-center justify-center">
              <GatheringIcon icon={g.icon} />
            </span>
          </div>
          <p className="mt-1 font-mono text-[10px] tracking-[0.16em] text-sq-subtle uppercase">
            {g.meta}
          </p>
          <p className="mt-3 text-sm leading-relaxed text-sq-muted flex-1">
            {g.d}
          </p>
          <a
            data-testid={`gathering-link-${g.icon}`}
            href={g.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 self-start chip border-neon-orange text-neon-orange hover:bg-neon-orange hover:text-black transition-colors"
          >
            {g.link}
          </a>
        </div>
      </article>
    </Reveal>
  );
}

function FilmTile({ f }) {
  return (
    <PlayableFilm
      dark
      videoId={f.videoId}
      title={f.title}
      url={f.url}
      className="h-full hover:-translate-y-1 transition-transform duration-300"
    />
  );
}

export default function ChapterB() {
  return (
    <section
      id="connection"
      className="relative py-24 sm:py-32 border-t border-sq-line scroll-mt-16 overflow-x-clip"
    >
      <GhostNumber n="02" />
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Reveal>
          <Eyebrow tone="text-neon-orange">{C.eyebrow}</Eyebrow>
          <h2 className="mt-4 font-display font-semibold tracking-tight leading-[1.02] text-[clamp(2rem,4.6vw,4.2rem)]">
            Build{" "}
            <em className="font-serifit italic font-normal text-neon-orange">
              Connection.
            </em>
          </h2>
          <p className="mt-5 max-w-2xl text-sq-muted text-base leading-relaxed">
            {C.intro}
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <div
            data-testid="neighborly-live-strip"
            className="mt-10 border border-neon-orange/40 bg-neon-orange/[0.04] p-6 sm:p-8"
          >
            <p className="font-serifit italic text-neon-orange text-2xl sm:text-4xl leading-tight">
              {C.tagline}
            </p>
            <p className="mt-3 font-mono text-[10px] tracking-[0.25em] text-sq-muted uppercase">
              {C.taglineSub}
            </p>
            <div className="mt-5 flex flex-wrap items-center gap-2">
              {C.badges.map((b) => (
                <span key={b} className="chip border-sq-line text-sq-muted">
                  {b}
                </span>
              ))}
              <a
                data-testid="neighborly-play-link"
                href={C.playUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="chip chip-lime hover:-translate-y-0.5 transition-transform"
              >
                {C.playCta}
              </a>
              <a
                data-testid="neighborly-site-link"
                href={C.siteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="chip border-neon-orange text-neon-orange hover:bg-neon-orange hover:text-black transition-colors"
              >
                {C.siteCta}
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 grid md:grid-cols-2 gap-5">
          {C.cards.map((card, i) => (
            <Reveal key={card.n} delay={i * 0.08}>
              <article
                data-testid={`neighborly-card-${card.n}`}
                className={`h-full border p-6 sm:p-8 transition-colors ${
                  card.status === "placeholder"
                    ? "border-dashed border-sq-muted/70 bg-transparent"
                    : "border-sq-line bg-sq-panel/60 hover:border-neon-orange/50"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-display font-semibold text-4xl text-sq-line select-none">
                    {card.n}
                  </span>
                </div>
                <h3 className="mt-4 font-mono text-xs tracking-[0.25em] text-neon-orange uppercase">
                  {card.t}
                </h3>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-sq-fg/90">
                  {card.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.05} className="mt-14">
          <Label tone="text-neon-orange">{C.stepsLabel}</Label>
          <div className="mt-4 grid md:grid-cols-3 gap-5">
            {C.steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.08} className="h-full">
                <div
                  data-testid={`neighborly-step-${s.n}`}
                  className="h-full border border-sq-line bg-sq-panel/60 p-6 hover:border-neon-orange/50 hover:-translate-y-1 transition-all duration-300"
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-neon-orange">
                    {s.n}
                  </span>
                  <h3 className="mt-3 font-display font-semibold tracking-tight text-lg text-sq-fg">
                    {s.t}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-sq-muted">
                    {s.s}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-14">
          <Label tone="text-neon-orange">{C.gatheringsLabel}</Label>
          <div className="mt-4 grid md:grid-cols-2 gap-5">
            {C.gatherings.map((g, i) => (
              <GatheringCard key={g.t} g={g} i={i} />
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.05} className="mt-14">
          <Label tone="text-neon-orange">{C.filmsLabel}</Label>
          <div className="mt-4 grid sm:grid-cols-3 gap-5">
            {C.films.map((f, i) => (
              <Reveal key={f.videoId} delay={i * 0.08} className="h-full">
                <FilmTile f={f} />
              </Reveal>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
