import { useEffect } from "react";
import Hero from "../sidequest/components/Hero.jsx";
import Marquee from "../sidequest/components/Marquee.jsx";
import ChapterC from "../sidequest/components/ChapterC.jsx";
import Proof from "../sidequest/components/Proof.jsx";
import {
  AboutPerson,
  CommunityLife,
} from "../sidequest/components/Personal.jsx";
import { PostCard } from "../components/Cards.jsx";
import posts from "../data/posts.json";

export default function Home() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#intelligence" || hash === "#sidequest")
      window.location.replace(`/work.html${hash}`);
    if (hash === "#resume") window.location.replace("/resume.html");
  }, []);

  return (
    <main id="main" className="sq-home">
      <div id="hero">
        <Hero />
      </div>
      <Marquee />
      <AboutPerson />
      <ChapterC />
      <section className="sq-section sq-journal" id="journal">
        <div className="sq-wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The journal</p>
              <h2>
                Notes from <em>everywhere.</em>
              </h2>
              <p>
                Places I go, things I’m learning, and thoughts I want to keep.
              </p>
            </div>
            <a className="text-link" href="/blog.html">
              Read the journal ↗
            </a>
          </div>
          <div className="home-posts">
            {posts.slice(0, 3).map((post) => (
              <PostCard key={post.slug} post={post} />
            ))}
          </div>
        </div>
      </section>
      <CommunityLife />
      <div id="portfolio">
        <div id="making">
          <Proof />
        </div>
      </div>
    </main>
  );
}
