import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

/* Reactive scene for the sidequest experiment. Format rearranges the furniture; audience and constraint alter the figures and the sign. */
export default function SceneIllustration({ scene, audience, constraint }) {
  const reduce = useReducedMotion();
  const ease = [0.22, 1, 0.36, 1];

  const sign = {
    "tiny-budget": "₹ 0 SPEND",
    "no-audience": "0 FOLLOWERS",
    "dislike-networking": "NO “NETWORKING”",
  }[constraint];

  const tag = { newcomers: "NEW HERE", remotes: "REMOTE", builders: "BUILDER" }[
    audience
  ];

  const chairAnim = (x, y, flip = false) => ({
    initial: { opacity: 0 },
    animate: { opacity: 1, x, y, scaleX: flip ? -1 : 1 },
    exit: { opacity: 0, y: y + 14 },
    transition: { duration: reduce ? 0 : 0.55, ease },
  });

  const Chair = (props) => (
    <g {...props}>
      <path
        d="M0 -46 h9 M2 -46 V0 M2 0 h30 M32 0 v34 M4 0 v34"
        fill="none"
        strokeWidth="2.5"
        strokeLinecap="round"
        className="stroke-neon-orange"
      />
    </g>
  );

  const Figure = ({ x, y, accessory }) => (
    <g
      transform={`translate(${x},${y})`}
      stroke="rgb(var(--sq-fg))"
      strokeWidth="2"
      strokeLinecap="round"
      fill="none"
    >
      <circle cx="0" cy="0" r="5.5" />
      <path d="M0 6 v18 M-8 14 h16 M0 24 l-6 15 M0 24 l6 15" />
      {accessory === "laptop" && (
        <rect
          x="7"
          y="12"
          width="13"
          height="9"
          rx="1.5"
          stroke="rgb(var(--sq-accent))"
        />
      )}
      {accessory === "tool" && (
        <path
          d="M8 10 l7 7 M8 10 l4 -1 1 4 -5 -3z"
          stroke="rgb(var(--sq-accent))"
          strokeWidth="1.6"
        />
      )}
      {accessory === "question" && (
        <text
          x="7"
          y="8"
          fontSize="11"
          fill="rgb(var(--sq-accent))"
          stroke="none"
          fontFamily="'JetBrains Mono', monospace"
        >
          ?
        </text>
      )}
    </g>
  );

  return (
    <div
      data-testid="scenario-scene"
      className="relative border border-sq-line bg-sq-surface/60 overflow-hidden"
    >
      <svg
        viewBox="0 0 560 340"
        className="w-full h-auto"
        role="img"
        aria-label={`Experiment scene: ${scene} format`}
      >
        <line
          x1="20"
          y1="302"
          x2="540"
          y2="302"
          stroke="rgb(var(--sq-line))"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* constraint sign */}
        <g>
          <rect
            x="416"
            y="30"
            width="122"
            height="28"
            rx="14"
            fill="none"
            stroke="rgb(var(--sq-accent))"
            strokeOpacity="0.6"
            strokeDasharray="3 4"
          />
          <text
            x="477"
            y="48"
            textAnchor="middle"
            fill="rgb(var(--sq-accent))"
            fontFamily="'JetBrains Mono', monospace"
            fontSize="10"
            letterSpacing="1.5"
          >
            {sign}
          </text>
        </g>

        <AnimatePresence mode="wait">
          {scene === "route" && (
            <motion.g
              key="route"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.4 }}
            >
              <motion.path
                d="M 40 292 C 130 258, 200 312, 300 268 S 440 226, 512 244"
                fill="none"
                stroke="rgb(var(--sq-accent))"
                strokeWidth="2.5"
                strokeDasharray="6 8"
                strokeLinecap="round"
                initial={false}
                animate={{ pathLength: 1 }}
                transition={{ duration: reduce ? 0 : 1.4, ease }}
              />
              <g
                stroke="rgb(var(--sq-accent))"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
              >
                <line x1="512" y1="244" x2="512" y2="212" />
                <path
                  d="M512 212 l14 5 -14 5"
                  fill="rgb(var(--sq-accent))"
                  stroke="none"
                />
              </g>
              <Figure
                x={140}
                y={262}
                accessory={
                  audience === "remotes"
                    ? "laptop"
                    : audience === "builders"
                      ? "tool"
                      : "question"
                }
              />
              <Figure
                x={310}
                y={244}
                accessory={
                  audience === "remotes"
                    ? "laptop"
                    : audience === "builders"
                      ? "tool"
                      : "question"
                }
              />
              <text
                x="96"
                y="236"
                fill="rgb(var(--sq-subtle))"
                fontFamily="'JetBrains Mono', monospace"
                fontSize="9"
                letterSpacing="1.5"
              >
                {tag} + {tag}
              </text>
            </motion.g>
          )}

          {scene === "table" && (
            <motion.g
              key="table"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.4 }}
            >
              <g
                stroke="rgb(var(--sq-line))"
                strokeWidth="2.5"
                strokeLinecap="round"
                fill="none"
              >
                <ellipse cx="280" cy="262" rx="64" ry="11" />
                <path d="M280 273 v28 M252 301 h56" />
              </g>
              <path
                d="M262 232 q4 6 0 12 M292 228 q4 6 0 12"
                stroke="rgb(var(--sq-subtle))"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
              <Figure
                x={210}
                y={218}
                accessory={
                  audience === "remotes"
                    ? "laptop"
                    : audience === "builders"
                      ? "tool"
                      : "question"
                }
              />
              <Figure
                x={352}
                y={218}
                accessory={
                  audience === "remotes"
                    ? "laptop"
                    : audience === "builders"
                      ? "tool"
                      : "question"
                }
              />
            </motion.g>
          )}

          {scene === "build" && (
            <motion.g
              key="build"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduce ? 0 : 0.4 }}
            >
              <rect
                x="208"
                y="236"
                width="150"
                height="10"
                rx="2"
                fill="none"
                stroke="rgb(var(--sq-line))"
                strokeWidth="2.5"
              />
              <path
                d="M222 246 v52 M344 246 v52"
                stroke="rgb(var(--sq-line))"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <rect
                x="238"
                y="182"
                width="90"
                height="52"
                rx="4"
                fill="rgb(var(--sq-surface))"
                stroke="rgb(var(--sq-accent))"
                strokeWidth="2"
                style={{ filter: "drop-shadow(0 0 10px rgba(212,255,0,0.4))" }}
              />
              <text
                x="252"
                y="204"
                fill="rgb(var(--sq-accent))"
                fontFamily="'JetBrains Mono', monospace"
                fontSize="10"
              >
                DEMO_01
              </text>
              <path
                d="M252 216 h44"
                stroke="rgb(var(--sq-accent))"
                strokeOpacity="0.5"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <Figure
                x={160}
                y={226}
                accessory={
                  audience === "remotes"
                    ? "laptop"
                    : audience === "builders"
                      ? "tool"
                      : "question"
                }
              />
              <Figure
                x={402}
                y={226}
                accessory={
                  audience === "remotes"
                    ? "laptop"
                    : audience === "builders"
                      ? "tool"
                      : "question"
                }
              />
            </motion.g>
          )}
        </AnimatePresence>

        {/* the two chairs — they rearrange or step aside per format */}
        <AnimatePresence>
          {scene !== "route" && (
            <motion.g
              key="chair-l"
              {...chairAnim(
                scene === "table" ? 158 : 118,
                scene === "table" ? 246 : 252,
              )}
            >
              <Chair />
            </motion.g>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {scene !== "route" && (
            <motion.g
              key="chair-r"
              {...chairAnim(
                scene === "table" ? 372 : 430,
                scene === "table" ? 246 : 252,
                true,
              )}
            >
              <Chair />
            </motion.g>
          )}
        </AnimatePresence>
      </svg>
    </div>
  );
}
