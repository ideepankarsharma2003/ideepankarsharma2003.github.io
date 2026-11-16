import { useEffect, useState } from "react";
import { ProjectCard } from "../components/Cards.jsx";
import projects from "../data/projects.json";
import testimonials from "../data/testimonials.json";
import ChapterA from "../sidequest/components/ChapterA.jsx";
import ChapterB from "../sidequest/components/ChapterB.jsx";
import Experiment from "../sidequest/components/Experiment.jsx";

const filters = [
  ["all", "All work"],
  ["flagship", "Flagship"],
  ["projects", "Experiments"],
  ["kudos", "Recognition"],
  ["certifications", "Certificates"],
  ["notes", "Study notes"],
];

export default function Work() {
  useEffect(() => {
    let frame;
    function revealLinkedSection() {
      const target = document.getElementById(window.location.hash.slice(1));
      const detail = target?.closest("details");
      if (!detail) return;
      detail.open = true;
      frame = window.requestAnimationFrame(() =>
        target.scrollIntoView({ block: "start" }),
      );
    }
    revealLinkedSection();
    window.addEventListener("hashchange", revealLinkedSection);
    return () => {
      window.removeEventListener("hashchange", revealLinkedSection);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  const [filter, setFilter] = useState("all");
  const visibleProjects = projects.filter(
    (project) => filter === "all" || project.category === filter,
  );
  return (
    <main id="main" className="wrap work-page">
      <section className="page-intro">
        <p className="eyebrow">The portfolio</p>
        <h1>
          Built with intent.
          <br />
          <em>Made to be used.</em>
        </h1>
        <p>
          Production AI, community products, and experiments that taught me
          something.
        </p>
      </section>
      <section aria-label="Projects">
        <div className="filter-bar">
          <div
            className="filter-tabs"
            role="group"
            aria-label="Filter projects"
          >
            {filters.map(([value, label]) => (
              <button
                key={value}
                className={`filter-button${value === filter ? " active" : ""}`}
                type="button"
                aria-pressed={value === filter}
                onClick={() => setFilter(value)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
        <p className="sr-only" role="status">
          {visibleProjects.length} projects shown.
        </p>
        <div className="projects-grid archive-grid">
          {visibleProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </section>
      <section className="sq-work-stories" aria-labelledby="work-stories-title">
        <p className="eyebrow">Behind the work</p>
        <h2 id="work-stories-title">A closer look.</h2>
        <details className="sq-work-detail">
          <summary>
            How I build AI systems <span aria-hidden="true">↗</span>
          </summary>
          <ChapterA />
        </details>
        <details className="sq-work-detail">
          <summary>
            Neighborly, from an idea to a community platform{" "}
            <span aria-hidden="true">↗</span>
          </summary>
          <ChapterB />
        </details>
        <details className="sq-work-detail">
          <summary>
            An experiment in bringing people together{" "}
            <span aria-hidden="true">↗</span>
          </summary>
          <Experiment />
        </details>
      </section>
      <section className="testimonial-section sq-work-testimonials">
        <p className="eyebrow">Working together</p>
        {testimonials.map((person) => (
          <details key={person.name}>
            <summary>
              {person.name}
              <span>{person.role}</span>
            </summary>
            <blockquote>{person.quote}</blockquote>
          </details>
        ))}
      </section>
    </main>
  );
}
