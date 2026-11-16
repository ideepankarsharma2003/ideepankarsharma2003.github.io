import { useState } from "react";
import Markdown from "../components/Markdown.jsx";
import { assetUrl, categoryNames, formatDate, readingTime } from "../lib.js";

export default function Article({ post }) {
  const [shareStatus, setShareStatus] = useState("");
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setShareStatus("Link copied");
    } catch {
      setShareStatus("Copy the address from your browser to share this story.");
    }
  }
  return (
    <main id="main" className="wrap article-page">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <a href="/blog.html">Journal</a>
        <span aria-hidden="true">/</span>
        <span>{categoryNames[post.category]}</span>
      </nav>
      <header className="article-heading">
        <div className="post-kicker">
          <span>{categoryNames[post.category]}</span>
          <span>{readingTime(post.body)} min read</span>
          {post.sample && <span>Sample post</span>}
        </div>
        <h1>{post.title}</h1>
        <p className="article-excerpt">{post.excerpt}</p>
        <div className="article-byline">
          <img
            src="/assets/img/sidequest/avatar.jpg"
            alt=""
            width="35"
            height="35"
          />
          <p>
            Deepankar Sharma
            <br />
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </p>
        </div>
      </header>
      {post.cover && (
        <img
          className="article-cover"
          src={assetUrl(post.cover)}
          alt={post.coverAlt || ""}
          width="1280"
          height="720"
          fetchPriority="high"
        />
      )}
      <article className="article-content">
        {post.sample && (
          <p className="sample-notice">
            This is a sample post to demonstrate the journal layout. The writing
            desk has a template for your own story.
          </p>
        )}
        <Markdown>{post.body}</Markdown>
        <footer className="article-footer">
          <a className="text-link" href="/blog.html">
            ← Back to the journal
          </a>
          <button className="text-link" type="button" onClick={copyLink}>
            Share story ↗
          </button>
        </footer>
        <p className="editor-message" role="status">
          {shareStatus}
        </p>
      </article>
    </main>
  );
}
