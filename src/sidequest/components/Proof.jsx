import { useRef } from "react";
import { CONTENT } from "../data/content.js";
import { Label } from "./bits.jsx";
import PlayableFilm from "./PlayableFilm.jsx";
import { ProjectCard } from "../../components/Cards.jsx";
import projects from "../../data/projects.json";

const proof = CONTENT.proof;

export default function Proof() {
  const rail = useRef(null);
  function nudge(direction) {
    rail.current?.scrollBy({
      left: direction * 340,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  }
  return (
    <section id="proof" className="sq-section">
      <div className="sq-wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">The work, out in the world</p>
            <h2>
              Live <em className="text-neon-mint">sidequests.</em>
            </h2>
            <p>
              Films you can watch. Products you can explore. Ideas made real.
            </p>
          </div>
          <a className="text-link" href="/work.html">
            All {projects.length} projects ↗
          </a>
        </div>
        <div className="mt-10 flex items-center justify-between gap-4">
          <Label>FROM BOTH SIDES OF THE CAMERA</Label>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Scroll films back"
              className="w-9 h-9 border border-sq-line text-sq-muted hover:text-sq-accent"
              onClick={() => nudge(-1)}
            >
              ←
            </button>
            <button
              type="button"
              aria-label="Scroll films forward"
              className="w-9 h-9 border border-sq-line text-sq-muted hover:text-sq-accent"
              onClick={() => nudge(1)}
            >
              →
            </button>
          </div>
        </div>
        <div
          ref={rail}
          className="mt-4 mb-14 flex gap-4 overflow-x-auto pb-4 snap-x"
          aria-label="Film collection"
        >
          {proof.films.map((film) => (
            <PlayableFilm
              key={film.videoId}
              dark
              {...film}
              className="w-[280px] sm:w-[320px] shrink-0 snap-start"
            />
          ))}
        </div>
        <div className="projects-grid">
          {projects.slice(0, 6).map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
        <div className="mt-9">
          <a className="btn-ghost" href="/work.html">
            Explore the complete archive ↗
          </a>
        </div>
        <a
          href={proof.studio.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-14 border border-sq-line bg-sq-surface p-6 sm:p-8 flex flex-col md:flex-row md:items-center gap-5 hover:border-neon-mint transition-colors"
        >
          <div className="flex-1">
            <Label tone="text-neon-mint">
              MY INDEPENDENT TECHNOLOGY STUDIO
            </Label>
            <h3 className="mt-3 font-display text-2xl sm:text-3xl font-semibold">
              {proof.studio.short}
            </h3>
            <p className="mt-3 text-sm text-sq-muted leading-relaxed max-w-2xl">
              {proof.studio.desc}
            </p>
          </div>
          <span className="chip border-neon-mint text-neon-mint self-start md:self-center">
            Visit the studio ↗
          </span>
        </a>
      </div>
    </section>
  );
}
