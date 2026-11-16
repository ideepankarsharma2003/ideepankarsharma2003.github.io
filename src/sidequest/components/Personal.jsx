import { CONTENT } from "../data/content.js";
import PlayableFilm from "./PlayableFilm.jsx";

export function AboutPerson() {
  return (
    <section id="about" className="sq-section sq-personal">
      <div className="sq-wrap">
        <div className="sq-personal-layout">
          <div className="sq-personal-copy">
            <p className="eyebrow">A little about me</p>
            <h2 className="sq-section-title">
              Curious about
              <br />
              <em>a lot of things.</em>
            </h2>
            <p>{CONTENT.personal.introduction}</p>
            <p>{CONTENT.personal.story}</p>
          </div>
          <figure className="sq-personal-photo">
            <a href="#curiosity" aria-label="Watch my Naini Peak film">
              <img
                src="/assets/img/sidequest/films/vFV3MOdJyMY.jpg"
                alt="A view from the Naini Peak trek film"
                width="1280"
                height="720"
                loading="lazy"
              />
            </a>
            <figcaption>
              Naini Peak, Nainital. A view from my camera.{" "}
              <a href="#curiosity">Watch the film ↗</a>
            </figcaption>
          </figure>
        </div>
        <dl className="sq-interests">
          {CONTENT.personal.interests.map((interest) => (
            <div key={interest.title}>
              <dt>{interest.title}</dt>
              <dd>{interest.text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export function CommunityLife() {
  const community = CONTENT.chapters.connection;
  return (
    <section id="connection" className="sq-section sq-community">
      <div className="sq-wrap">
        <div className="section-heading">
          <div>
            <p className="eyebrow">People & community</p>
            <h2>
              Small reasons
              <br />
              <em>to come together.</em>
            </h2>
            <p className="sq-community-intro">{CONTENT.personal.community}</p>
          </div>
        </div>
        <div className="sq-gatherings">
          {community.gatherings.map((gathering) => (
            <article key={gathering.t} className="sq-gathering">
              <PlayableFilm
                dark
                videoId={gathering.videoId}
                igEmbed={gathering.igEmbed}
                embed={gathering.embed}
                title={gathering.t}
                showCaption={false}
                url={
                  gathering.embed === false
                    ? `https://www.youtube.com/watch?v=${gathering.videoId}`
                    : gathering.url
                }
                className="border-0"
              />
              <div className="sq-gathering-copy">
                <p className="eyebrow">{gathering.meta}</p>
                <h3>{gathering.t}</h3>
                <p>{gathering.d}</p>
                <a
                  className="text-link"
                  href={gathering.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See this gathering ↗
                </a>
              </div>
            </article>
          ))}
        </div>
        <p className="sq-community-note">
          Some of that curiosity became Neighborly, a community project I’m
          building.{" "}
          <a href="/work.html#connection">The story behind the project ↗</a>
        </p>
      </div>
    </section>
  );
}
