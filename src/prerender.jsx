import React from "react";
import { renderToString } from "react-dom/server";
import { readFile, writeFile, mkdir, cp, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import App from "./App.jsx";
import { getPage, loadPage, paths } from "./routes.js";

const domain = "https://ideepankarsharma2003.github.io";
const output = resolve("dist");
const template = await readFile(resolve(output, "index.html"), "utf8");
const escape = (text) =>
  String(text || "").replace(
    /[&<>"']/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        character
      ],
  );

for (const path of [...paths, "/404.html"]) {
  const page = getPage(path);
  const canonical = domain + (path === "/index.html" ? "/" : encodeURI(path));
  const image = page.image
    ? /^https?:\/\//i.test(page.image)
      ? page.image
      : domain + "/" + page.image.replace(/^\//, "")
    : domain + "/assets/img/og.png";
  const metadata = `<meta name="description" content="${escape(page.description)}"><meta property="og:title" content="${escape(page.title)} | Deepankar Sharma"><meta property="og:description" content="${escape(page.description)}"><meta property="og:type" content="${page.article ? "article" : "website"}"><meta property="og:url" content="${escape(canonical)}"><meta property="og:image" content="${escape(image)}"><meta name="twitter:card" content="summary_large_image"><link rel="canonical" href="${escape(canonical)}">${page.noindex ? '<meta name="robots" content="noindex">' : ""}`;
  const Page = await loadPage(page.kind);
  const markup = renderToString(<App page={page} Page={Page} />);
  const html = template
    .replace(
      /<title>.*?<\/title>/s,
      `<title>${escape(page.title)} | Deepankar Sharma</title>`,
    )
    .replace("<!-- metadata -->", metadata)
    .replace('<div id="root"></div>', `<div id="root">${markup}</div>`);
  const filename = resolve(output, path === "/" ? "index.html" : path.slice(1));
  await mkdir(dirname(filename), { recursive: true });
  await writeFile(filename, html);
}
await cp("assets/img", resolve(output, "assets/img"), { recursive: true });
await cp("xohou.html", resolve(output, "xohou.html"));
await writeFile(resolve(output, ".nojekyll"), "");
const urls = paths
  .filter((path) => !getPage(path).noindex)
  .map((path) => `<url><loc>${escape(domain + encodeURI(path))}</loc></url>`)
  .join("");
await writeFile(
  resolve(output, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`,
);
await writeFile(
  resolve(output, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${domain}/sitemap.xml\n`,
);
await rm(".prerender", { recursive: true, force: true });
console.log(`Prerendered ${paths.length + 1} React pages into dist/`);
