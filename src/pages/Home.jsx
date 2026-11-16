import Hero from "../sidequest/components/Hero.jsx";
import Marquee from "../sidequest/components/Marquee.jsx";
import Experiment from "../sidequest/components/Experiment.jsx";
import ChapterA from "../sidequest/components/ChapterA.jsx";
import ChapterB from "../sidequest/components/ChapterB.jsx";
import ChapterC from "../sidequest/components/ChapterC.jsx";
import Proof from "../sidequest/components/Proof.jsx";
import { PostCard } from "../components/Cards.jsx";
import posts from "../data/posts.json";
import testimonials from "../data/testimonials.json";

export default function Home() {
  return (
    <main id="main" className="sq-home">
      <div id="hero">
        <Hero />
      </div>
      <Marquee />
      <Experiment />
      <ChapterA />
      <ChapterB />
      <ChapterC />
      <div id="portfolio">
        <Proof />
      </div>
      <section className="sq-section sq-journal" id="journal">
        <div className="sq-wrap">
          <div className="section-heading">
            <div>
              <p className="eyebrow">The journal</p>
              <h2>
                Notes from <em>everywhere.</em>
              </h2>
              <p>Things I build, places I go, and thoughts along the way.</p>
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
      <section className="sq-section" id="about">
        <div className="sq-wrap testimonial-section">
          <p className="eyebrow">In good company</p>
          {testimonials.map((person) => (
            <details key={person.name}>
              <summary>
                {person.name}
                <span>{person.role}</span>
              </summary>
              <blockquote>{person.quote}</blockquote>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
