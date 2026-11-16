import { useState } from "react";
import { ProjectCard } from "../components/Cards.jsx";
import projects from "../data/projects.json";

const filters = [
  ["all", "All work"],
  ["flagship", "Flagship"],
  ["projects", "Experiments"],
  ["kudos", "Recognition"],
  ["certifications", "Certificates"],
  ["notes", "Study notes"],
];

export default function Work() {
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
    </main>
  );
}
