import { useState } from "react";

/* Click-to-play film card: YouTube inline, Instagram inline, or link-out when a video blocks embedding. */
export default function PlayableFilm({
  videoId,
  igEmbed,
  url,
  title,
  channel,
  embed,
  showCaption = true,
  dark = false,
  className = "",
  children,
}) {
  const [playing, setPlaying] = useState(false);
  const igShort = igEmbed
    ? (igEmbed.match(/reel\/([A-Za-z0-9_-]+)/) || [])[1] || "ig"
    : null;
  const canEmbed = embed !== false && (igEmbed || videoId);
  const border = dark ? "border-sq-line" : "border-sq-fg/15";
  const testId = videoId || igShort;
  const cover = videoId ? (
    <span className="absolute inset-0 flex items-center justify-center">
      <span className="w-11 h-11 rounded-full bg-sq-bg/85 border border-sq-accent flex items-center justify-center text-sq-accent group-hover:bg-lime group-hover:text-black transition-colors text-sm">
        {embed === false ? "↗" : "▶"}
      </span>
    </span>
  ) : null;
  return (
    <div
      data-testid={`film-${testId}`}
      className={`sq-film relative border ${border} overflow-hidden ${dark ? "bg-sq-surface" : "bg-sq-paper"} ${className}`}
    >
      <div className="relative aspect-video overflow-hidden">
        {playing ? (
          <iframe
            src={
              igEmbed ||
              `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`
            }
            title={title || "Film"}
            allow="autoplay; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full bg-black"
          />
        ) : canEmbed ? (
          <button
            onClick={() => setPlaying(true)}
            data-testid={`film-play-${testId}`}
            aria-label={`Play ${title || "film"}`}
            className="group absolute inset-0 w-full"
          >
            {videoId ? (
              <img
                src={`/assets/img/sidequest/films/${videoId}.jpg`}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
                }}
                alt={title || "Film still"}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <span className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-sq-panel via-sq-surface to-ink">
                <span className="w-12 h-12 rounded-full border border-neon-orange text-neon-orange flex items-center justify-center text-sm group-hover:bg-neon-orange group-hover:text-black transition-colors">
                  ▶
                </span>
                <span className="font-mono text-[9px] tracking-[0.2em] text-sq-subtle uppercase">
                  PLAY THE REEL
                </span>
              </span>
            )}
            {cover}
          </button>
        ) : (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`film-open-${testId}`}
            aria-label={`Open ${title || "film"}`}
            className="group absolute inset-0 block"
          >
            {videoId ? (
              <img
                src={`/assets/img/sidequest/films/${videoId}.jpg`}
                onError={(event) => {
                  event.currentTarget.onerror = null;
                  event.currentTarget.src = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
                }}
                alt={title || "Film still"}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <span className="absolute inset-0 bg-gradient-to-br from-sq-panel via-sq-surface to-ink" />
            )}
            {cover}
          </a>
        )}
      </div>
      {showCaption && (channel || title || children) && (
        <div
          className={`p-4 ${dark ? "border-t border-sq-line" : "border-t border-sq-fg/10"}`}
        >
          {channel && (
            <span
              className={`chip ${dark ? "!text-neon-orange !border-neon-orange/50" : "!text-sq-sage !border-sq-sage/60"}`}
            >
              {channel}
            </span>
          )}
          {title && (
            <p
              className={`mt-2 font-display font-semibold tracking-tight text-sm leading-snug ${dark ? "text-sq-fg" : "text-sq-fg"}`}
            >
              {title}
            </p>
          )}
          {children}
        </div>
      )}
    </div>
  );
}
