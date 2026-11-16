import { useMemo, useState } from "react";
import { PostCard } from "../components/Cards.jsx";
import posts from "../data/posts.json";

const categories = [
  ["all", "Everything"],
  ["travel", "Travel"],
  ["tech", "Technology"],
  ["notes", "Life & notes"],
];

export default function Journal() {
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");
  const visiblePosts = useMemo(
    () =>
      posts.filter((post) => {
        const matchesCategory =
          category === "all" || category === post.category;
        const query = search.trim().toLocaleLowerCase();
        return (
          matchesCategory &&
          `${post.title} ${post.excerpt} ${post.body}`
            .toLocaleLowerCase()
            .includes(query)
        );
      }),
    [category, search],
  );

  function reset() {
    setCategory("all");
    setSearch("");
  }
  return (
    <main id="main" className="wrap journal-page">
      <section className="page-intro">
        <p className="eyebrow">The journal</p>
        <h1>
          A curious mind.
          <br />
          <em>An open notebook.</em>
        </h1>
        <div className="intro-bottom">
          <p>
            Field notes from building things and getting a little lost.
            <br />
            Technology, travel, and everything in between.
          </p>
          <a className="text-link" href="/write.html">
            Open the writing desk <span aria-hidden="true">↗</span>
          </a>
        </div>
      </section>
      <section aria-label="Journal posts">
        <div className="filter-bar">
          <div
            className="filter-tabs"
            role="group"
            aria-label="Filter posts by category"
          >
            {categories.map(([value, label]) => (
              <button
                key={value}
                type="button"
                className={`filter-button${category === value ? " active" : ""}`}
                aria-pressed={category === value}
                onClick={() => setCategory(value)}
              >
                {label}
              </button>
            ))}
          </div>
          <label className="search-field">
            <span aria-hidden="true">⌕</span>
            <input
              type="search"
              placeholder="Find a story"
              aria-label="Search journal posts"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </label>
        </div>
        <p className="sr-only" role="status">
          {visiblePosts.length}{" "}
          {visiblePosts.length === 1 ? "story" : "stories"} found.
        </p>
        <div className="blog-posts">
          {visiblePosts.map((post) => (
            <PostCard key={post.slug} post={post} />
          ))}
        </div>
        {visiblePosts.length === 0 && (
          <div className="empty-state">
            <h2>No stories here yet.</h2>
            <p>Try another search or explore a different category.</p>
            <button className="text-link" type="button" onClick={reset}>
              Show all stories ↗
            </button>
          </div>
        )}
      </section>
      <div className="journal-end">
        <span aria-hidden="true">✳</span>
        <p>Always something more to discover.</p>
        <a href="/write.html">Start a new story ↗</a>
      </div>
    </main>
  );
}
