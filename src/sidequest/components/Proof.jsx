import { ProjectCard } from "../../components/Cards.jsx";
import projects from "../../data/projects.json";

const selected = projects.filter((project) =>
  ["LabThunder", "Navikarnam-2023"].includes(project.title),
);

export default function Proof() {
  return (
    <section id="proof" className="sq-section sq-making">
      <div className="sq-wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Things I make</p>
            <h2>
              Sometimes, curiosity
              <br />
              <em>turns into a project.</em>
            </h2>
            <p>
              A couple of things I’ve worked on, from AI products to an
              innovation-fest project.
            </p>
          </div>
          <a className="text-link" href="/work.html">
            Explore my work ↗
          </a>
        </div>
        <div className="projects-grid">
          {selected.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
