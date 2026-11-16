# SIDEQUEST — Deepankar Sharma

A React + Vite portfolio built from the supplied SIDEQUEST app, with light and dark themes, a complete project archive, a journal, and a writing desk. The build prerenders each page for GitHub Pages, including the existing portfolio-detail URLs.

## Local development

Requires Node.js 22.12 or newer.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:5173. To check the production site, run `npm run build` followed by `npm run preview`.

## Themes and content

The theme initially follows the device preference. The header toggle remembers an explicit choice across visits and pages. Both themes cover the SIDEQUEST chapters, interactive experiment, films, archive, article pages, and editor.

The homepage uses the SIDEQUEST hero and mountain portrait, the gathering experiment, AI and Neighborly chapters, and creator films. Source content and components live under `src/sidequest/`. Public review badges and duplicate project grids have been removed. YouTube stills are stored locally and videos load when selected.

- `src/pages/` contains the journal, archive, resume, case studies, articles, and writing desk.
- `src/components/` contains navigation, theme controls, cards, and safe Markdown rendering.
- `src/styles/` contains theme variables, responsive styles, SIDEQUEST utilities, and print styles.
- `src/data/` contains the posts, all 23 original portfolio entries, case studies, resume, and testimonials.
- `assets/img/sidequest/` contains the supplied portrait, avatar, mark, and film stills.
- `assets/img/journal/` contains optimized project thumbnails and additional portfolio photographs.

## Write and publish a story

Open `/write.html` for travel, technology, and personal-note templates, Markdown editing, image uploads, and a live preview. Drafts save in IndexedDB in the current browser. Export a post JSON to keep a portable copy.

Import an exported JSON into the repository.

```sh
npm run post:add -- /path/to/your-post.json
npm run build
```

The import saves uploaded images, updates `src/data/posts.json`, and gives the post a stable `/posts/your-story.html` URL. The build generates the article HTML and adds it to the homepage, journal, and sitemap. Add `--replace` to deliberately update an existing slug. Commit the content and images with the rest of the changes.

The three initial stories are labelled samples. Replace or remove them as you add your own writing. Drafts are local to the current browser profile. Export/import controls move them between devices.

## Build output

`dist/` is the complete deployable site. GitHub Pages needs a build that publishes this directory. The production base URL is `/` for `ideepankarsharma2003.github.io`. Existing case-study filenames are emitted during prerendering, including filenames with spaces. The standalone XOHOU presentation is copied into the build.

Work is prepared on `redesign/portfolio-journal`. Hosting can be configured when the branch is ready to publish.

## References

- [Supplied SIDEQUEST design](https://sidequest-portfolio--6ayuri0b.preview.emergentagent.com/)
- [NN/g on visual hierarchy](https://www.nngroup.com/articles/visual-hierarchy-ux-definition/)
- [web.dev on reduced motion](https://web.dev/articles/prefers-reduced-motion)
- [web.dev on Largest Contentful Paint](https://web.dev/articles/optimize-lcp)
- [Vite’s GitHub Pages guidance](https://vite.dev/guide/static-deploy.html#github-pages)

Portraits and films come from the supplied SIDEQUEST source and the existing portfolio.
