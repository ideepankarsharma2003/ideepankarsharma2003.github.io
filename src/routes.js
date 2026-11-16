import posts from "./data/posts.json";
import projects from "./data/project-routes.json";

export function getPage(path) {
  let filename;
  try {
    filename =
      decodeURIComponent(path.split("?")[0]).replace(/^\//, "") || "index.html";
  } catch {
    filename = "404.html";
  }
  const pages = {
    "index.html": {
      kind: "home",
      title: "SIDEQUEST",
      description:
        "Deepankar Sharma’s playable portfolio. AI engineering, Neighborly, films from Kumaon, selected projects, and an open journal.",
    },
    "blog.html": {
      kind: "journal",
      title: "The journal",
      description:
        "Travel stories, technology notes, and thoughts on building useful things. An open notebook by Deepankar Sharma.",
      active: "Journal",
    },
    "work.html": {
      kind: "work",
      title: "Selected work",
      description:
        "AI products, agentic systems, computer vision projects, experiments, and certifications by Deepankar Sharma.",
      active: "Work",
    },
    "resume.html": {
      kind: "resume",
      title: "Resume",
      description:
        "Deepankar Sharma’s experience, education, AI engineering projects, and certifications.",
      active: "Resume",
    },
    "write.html": {
      kind: "editor",
      title: "The writing desk",
      description:
        "Write a travel story, technical article, or personal note with templates, images, saved drafts, and a live preview.",
      noindex: true,
    },
  };
  if (pages[filename]) return pages[filename];
  if (projects[filename])
    return {
      kind: "project",
      title: projects[filename].title,
      description: `${projects[filename].title}. From Deepankar Sharma’s portfolio.`,
      active: "Work",
      props: { filename },
    };
  const post = posts.find((item) => `posts/${item.slug}.html` === filename);
  if (post)
    return {
      kind: "article",
      title: post.title,
      description: post.excerpt,
      image: post.cover,
      active: "Journal",
      article: true,
      props: { post },
    };
  return { kind: "notfound", title: "Page not found", noindex: true };
}

export const paths = [
  "/",
  "/blog.html",
  "/work.html",
  "/resume.html",
  "/write.html",
  ...Object.keys(projects).map((name) => `/${name}`),
  ...posts.map((post) => `/posts/${post.slug}.html`),
];

export async function loadPage(kind) {
  const loaders = {
    home: () => import("./pages/Home.jsx"),
    journal: () => import("./pages/Journal.jsx"),
    work: () => import("./pages/Work.jsx"),
    resume: () => import("./pages/Resume.jsx"),
    article: () => import("./pages/Article.jsx"),
    project: () => import("./pages/Project.jsx"),
    editor: () => import("./pages/Editor.jsx"),
    notfound: () => import("./pages/NotFound.jsx"),
  };
  return (await loaders[kind]()).default;
}
