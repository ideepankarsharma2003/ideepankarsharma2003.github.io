import { assetUrl, categoryNames, formatDate, readingTime } from "../lib.js";

const projectCategories = {
  flagship: "Product engineering",
  projects: "Experiment",
  kudos: "Recognition",
  certifications: "Certificate",
  notes: "Study notes",
};

export function ProjectCard({ project, index = 0 }) {
  const external = project.href.startsWith("https://");
  const href = project.href.startsWith("#")
    ? "/resume.html"
    : external
      ? project.href
      : assetUrl(project.href);
  return (
    <article className={`project-card project-tone-${index % 4}`}>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
      >
        <div className="project-image">
          <img
            src={assetUrl(project.image)}
            alt={`${project.title} project preview`}
            width="800"
            height="600"
            loading="lazy"
          />
          <span className="image-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
        <div className="project-meta">
          <h3>{project.title}</h3>
          <span>{projectCategories[project.category]}</span>
        </div>
        {project.description && <p>{project.description}</p>}
      </a>
    </article>
  );
}

export function PostCard({ post }) {
  return (
    <article className="post-card">
      <a href={`/posts/${post.slug}.html`}>
        <div className="post-image">
          <img
            src={assetUrl(post.cover || "assets/img/journal/workspace.jpg")}
            alt={post.coverAlt || ""}
            width="800"
            height="500"
            loading="lazy"
          />
          <span className="image-arrow" aria-hidden="true">
            ↗
          </span>
        </div>
        <div className="post-card-copy">
          <div className="post-kicker">
            <span>{categoryNames[post.category]}</span>
            <span>{readingTime(post.body)} min read</span>
            {post.sample && <span className="sample-label">Sample</span>}
          </div>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <div className="post-date">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true" />
            Read story ↗
          </div>
        </div>
      </a>
    </article>
  );
}
