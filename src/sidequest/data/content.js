export const CONTENT = {
  version: "2026.02.14",
  meta: {
    title: "SIDEQUEST — Deepankar Sharma",
    tagline: "Deepankar Sharma — still exploring.",
    description:
      "Films, travel, painting, technology, community, and thoughts along the way. A personal corner of the internet by Deepankar Sharma.",
  },
  contacts: {
    email: "deepankarsharma2003@gmail.com",
    phone: "+91 96391 02301",
    linkedin: "https://linkedin.com/in/ideepankarsharma2003",
    github: "https://github.com/ideepankarsharma2003",
  },
  hero: {
    eyebrow: "A PERSONAL CORNER OF THE INTERNET",
    lineA: "Hi, I’m",
    lineB: "Deepankar.",
    lineC: "Still exploring.",
    primaryCta: "A little about me",
    secondaryCta: "Watch a film",
    skip: "Skip the intro",
    strap: "FILMS ✳ PAINTING ✳ BACKPACKING ✳ CODE",
    portrait: "/assets/img/sidequest/avatar.jpg",
    portraitBig: "/assets/img/sidequest/portrait.jpg",
    portraitName: "Deepankar Sharma",
    portraitLocation: "HADUCHAUR · HALDWANI · NAINITAL · UTTARAKHAND",
    portraitRoles: "BACKPACKER · FILMMAKER · PAINTER · BUILDER",
    portraitCaption: "A LITTLE FURTHER FROM THE SCREEN.",
    subline:
      "I make things, head out with a backpack, and bring a camera along. Here are the places, people, ideas, and little experiments that make up my life.",
    objects: [
      {
        id: "terminal",
        caption: "THINGS I MAKE.",
        target: "making",
      },
      {
        id: "chairs",
        caption: "PEOPLE & COMMUNITY.",
        target: "connection",
      },
      {
        id: "camera",
        caption: "FILMS & PLACES.",
        target: "curiosity",
      },
    ],
  },
  marquee: [
    "TAKE A WALK",
    "MAKE SOMETHING",
    "FOLLOW A QUESTION",
    "BRING A CAMERA",
    "MEET SOMEONE",
    "TRY A DIFFERENT ROUTE",
  ],
  scenario: {
    eyebrow: "THE INTERACTIVE SIDEQUEST",
    title: "Get 10 strangers to actually show up.",
    intro:
      "Pick an audience, a constraint, and a format. Explore a small experiment for bringing people together.",
    specLabel: "SPEC",
    question: "WHO’S INVITED?",
    cQuestion: "WHAT’S IN THE WAY?",
    fQuestion: "WHAT’S THE FORMAT?",
    audiences: [
      {
        id: "newcomers",
        code: "NEWCITY",
        label: "People new to a city",
        hypothesis:
          "They don’t know anyone yet — and they’re wary of anything that smells like networking. New city, zero context, high willingness if the ask feels small and human.",
      },
      {
        id: "remotes",
        code: "REMOTE",
        label: "Remote workers",
        hypothesis:
          "They talk to screens all week. The barrier isn’t interest, it’s the small heavy cost of leaving the house after the laptop closes.",
      },
      {
        id: "builders",
        code: "BUILDERS",
        label: "Curious local builders",
        hypothesis:
          "They show up when they can learn something or show something. Open mingling feels like a waste of an evening; a task doesn’t.",
      },
    ],
    constraints: [
      {
        id: "tiny-budget",
        code: "LOWBUDGET",
        label: "Tiny budget",
        distribution:
          "Zero-spend channels only: neighbourhood WhatsApp groups, a coworking notice board, one well-aimed post on a local forum. The invitation itself has to do the marketing.",
      },
      {
        id: "no-audience",
        code: "NOFOLLOWERS",
        label: "No existing audience",
        distribution:
          "Borrow rooms instead of building one: ask a café for a dead weekday slot, ask a coworking space to forward it to members, ask two friends to each bring exactly one person. Three borrowed audiences.",
      },
      {
        id: "dislike-networking",
        code: "NOBLENDING",
        label: "People dislike networking",
        distribution:
          "Never use the word networking. Distribute through places organised around an activity — run clubs, maker spaces, language-exchange boards — where joining the task is already the default.",
      },
    ],
    formats: [
      {
        id: "walk",
        code: "WALK",
        label: "A walk",
        scene: "route",
        hook: "“Lost in the neighbourhood: 90 minutes on foot, no phones, one wrong turn allowed. We end at a chai stall.”",
        test: "One route, six people, one fixed end point. If nobody has talked by minute ten, the route has a stop built in — order first, walk second.",
        fail: "Rain. Strangers walking in polite silence. A route that’s too pretty turns into a tour — so every twenty minutes someone else becomes the navigator.",
      },
      {
        id: "cafe",
        code: "CAFE",
        label: "A small café gathering",
        scene: "table",
        hook: "“Table for six. One question each: what are you figuring out right now? First chai is on me.”",
        test: "Six chairs, ninety minutes, a small stack of host questions. Two of the six are invited by name, not broadcast.",
        fail: "Cliques form by round two, and latecomers reset the room. Fix: one shared question at a time; latecomers get a two-minute recap, not a restart.",
      },
      {
        id: "build",
        code: "BUILDNIGHT",
        label: "A build-and-share evening",
        scene: "build",
        hook: "“Bring one thing you made this month. Three minutes to demo it, however unfinished. Others bring the chai.”",
        test: "Eight people, a visible timer, three-minute demos. Two demo slots pre-seeded so the room never starts cold.",
        fail: "Demos overrun and the room thins out; nobody brings anything. Fix: hard timer, and two seeded demos before invites go out.",
      },
    ],
    measureLabel: "WHAT I’D MEASURE",
    measure: [
      "Invitations sent",
      "Replies",
      "RSVPs",
      "Actual attendance",
      "Repeat interest",
    ],
    measureNote:
      "Track the first small test, then use what happened to shape the next one.",
    whyLabel: "WHY THIS INTERESTS ME",
    why: "This is the same wall Neighborly runs into: moving people from online interest to an actual chair. The experiment above is the next test I’d run.",
    whyCta: "Read the Neighborly chapter",
    target: "connection",
  },
  chapters: {
    intelligence: {
      id: "intelligence",
      eyebrow: "HOW I THINK WITH MACHINES",
      title: "Build Intelligence.",
      intro:
        "From a question to a useful answer. The engineering behind the systems I ship.",
      pipeline: [
        {
          t: "QUESTION",
          s: "What is actually being asked?",
        },
        {
          t: "RETRIEVAL / CONTEXT",
          s: "Hybrid search: lexical + vectors + graph, reranked",
        },
        {
          t: "AGENT / TOOL DECISION",
          s: "Which tool, which source, which boundary?",
        },
        {
          t: "VALIDATION",
          s: "Does every claim map to a source?",
        },
        {
          t: "USEFUL OUTPUT",
          s: "Grounded, structured, small",
        },
      ],
      skills: [
        "OpenAI Responses API",
        "LangGraph",
        "Multi-agent systems",
        "Tool calling",
        "Structured outputs",
        "Hybrid retrieval",
        "Pinecone",
        "Neo4j",
        "Reranking",
        "Guardrails",
        "Python",
        "FastAPI",
        "PyTorch",
        "Azure",
        "GCP",
        "Claude Code & Codex workflows",
      ],
      skillsLabel: "MY TOOLKIT",
      project: {
        label: "FEATURED BUILD",
        name: "Thunder AI — a lab copilot",
        org: "LabThunder · AI & Lead Developer",
        problem:
          "Lab engineers lose hours paging through dense instrument manuals and technical logs to answer one operational question.",
        contribution:
          "I built a streaming tool-calling copilot: company-scoped Pinecone retrieval, exact-document search, bounded neighbouring-page expansion — plus async PDF/DOCX ingestion (FastAPI, Redis/RQ) and OpenAI-vision extraction of diagrams with structured outputs, so maintenance figures become retrievable assets.",
        tradeoff:
          "I chose bounded neighbouring-page expansion over feeding whole documents. Ingestion gets stricter; answers stay grounded in pages that actually exist.",
        lesson:
          "Retrieval is a product decision, not plumbing. Where you let the model look decides whether anyone can trust what it says.",
        tradeoffStatus: "draft",
        lessonStatus: "draft",
      },
      intro2:
        "The sidequest shows how I think. This chapter shows what I build — end-to-end systems: agents, retrieval, computer vision, pipelines that survive production.",
      shelfLabel: "MORE SYSTEMS ON THE SHELF",
      shelf: [
        {
          name: "AI Co-CEO platform",
          tag: "REDEGADES · RÉSUMÉ",
          desc: "LLM decision intelligence with LangGraph multi-agent orchestration, tool calling, and permission-scoped access; Fireflies meetings become tasks automatically.",
        },
        {
          name: "Shotify.ai at scale",
          tag: "WAREWE · RÉSUMÉ",
          desc: "Scaled on Django/GCP to support thousands of daily AI video generations for short-form social content.",
        },
        {
          name: "Video synopsis pipelines",
          tag: "I2V SYSTEMS · RÉSUMÉ",
          desc: "Led video synopsis and automated training pipelines, cutting the label-to-train cycle by 65%.",
        },
        {
          name: "Synthetic data workflows",
          tag: "I2V SYSTEMS · RÉSUMÉ",
          desc: "ControlNet, inpainting, and generative image composition for production training data.",
        },
        {
          name: "Voice calling agents",
          tag: "RÉSUMÉ",
          desc: "Twilio voice agents integrating ASR/TTS for automated calling workflows.",
        },
        {
          name: "RedSerp",
          tag: "LIVE · REDSERP.COM",
          desc: "Reddit trend intelligence with automated PostgreSQL ingestion, topic discovery, and ML content optimization.",
        },
      ],
    },
    connection: {
      id: "connection",
      eyebrow: "STRANGERS TO NEIGHBORS",
      title: "Build Connection.",
      intro:
        "Neighborly is my attempt to help strangers become neighbors — through real-world activities, not another feed.",
      tagline: "Real life is the destination.",
      taglineSub: "LESS PERFORMING ONLINE. MORE BELONGING OFFLINE.",
      badges: ["NO ENDLESS SWIPING", "REAL LOCAL PLANS", "ADULTS 18+"],
      playUrl:
        "https://play.google.com/store/apps/details?id=com.yourneighborly.app",
      playCta: "LIVE ON GOOGLE PLAY ↗",
      siteUrl: "https://yourneighborly.com/",
      siteCta: "EXPLORE YOURNEIGHBORLY.COM ↗",
      filmsLabel: "HANGOUT FILMS",
      films: [
        {
          videoId: "sZH7ccOcFpc",
          title: "Weekend trek with the bros — Kumaon forest trails",
          url: "https://www.youtube.com/watch?v=sZH7ccOcFpc",
        },
        {
          videoId: "ChSm0G5CNIs",
          title: "Trek with bros: hangout",
          url: "https://www.youtube.com/watch?v=ChSm0G5CNIs",
        },
        {
          videoId: "gY-tFRzaGzg",
          title: "Neighborly village days",
          url: "https://www.youtube.com/watch?v=gY-tFRzaGzg",
        },
      ],
      stepsLabel: "HOW NEIGHBORLY WORKS",
      steps: [
        {
          n: "01",
          t: "Find a small reason to go out",
          s: "Discover a walk, game, coffee, art session, or local community with the useful details upfront.",
        },
        {
          n: "02",
          t: "Meet around something real",
          s: "Shared activities remove the pressure to perform. You already have somewhere to begin.",
        },
        {
          n: "03",
          t: "Turn one hello into familiarity",
          s: "Use discussions, messages, and recurring plans to meet again — until strangers become familiar faces.",
        },
      ],
      gatheringsLabel: "GATHERINGS THAT BROUGHT US TOGETHER",
      gatherings: [
        {
          icon: "aipan",
          videoId: "Rtfy_lzRUD8",
          embed: false,
          t: "Aipan Art Retreat",
          meta: "JULY 25, 2026 · VISTA HOSTEL, JYOLIKOT",
          d: "Traditional Kumaoni art, a mountain setting, and an easy shared activity to make together. The recap film opens on YouTube.",
          url: "https://yourneighborly.com/hangouts/c93151b2-0b4b-4cff-a132-26bdf8adb43a",
          link: "EVENT DETAILS ↗",
        },
        {
          icon: "rasna",
          igEmbed: "https://www.instagram.com/reel/DZ1_tMzznrp/embed",
          t: "The Rasna drives",
          meta: "JUNE 18 & 28, 2026 · HALDUCHAUR HIGHWAY",
          d: "A birthday and a heatwave became shared acts of service — cold drinks, teamwork, and conversations on the highway. The reel plays right here.",
          url: "https://www.instagram.com/reel/DZ1_tMzznrp/",
          link: "WATCH ON INSTAGRAM ↗",
          videoId: "GhkwQEMxEBk",
        },
      ],
      cards: [
        {
          n: "01",
          t: "WHAT I NOTICED",
          status: "brief",
          body: "People say yes to the idea of meeting neighbors easily — online. The hard part is the jump from a like to an actual door, at an actual time.",
        },
        {
          n: "02",
          t: "WHAT I TRIED",
          status: "verified",
          body: "Built Neighborly: community discovery, activity matching, events, and local engagement — a system for turning shared interests into actual plans.",
        },
        {
          n: "03",
          t: "WHAT I LEARNED",
          status: "signed",
          body: "“Give people something to make, not small talk. The Aipan did the introducing; I just set the table.” — Deepankar",
        },
        {
          n: "04",
          t: "WHAT I WOULD TEST NEXT",
          status: "draft",
          body: "The sidequest experiment above is the next test: ten strangers, one small format, measured honestly. Evidence lands here after it runs.",
        },
      ],
      statusLabels: {
        brief: "SOURCED — THE BRIEF",
        verified: "VERIFIED — RÉSUMÉ",
        placeholder: "EVIDENCE SLOT — AWAITING DEEPANKAR",
        draft: "DRAFT — AWAITING DEEPANKAR’S REVIEW",
        signed: "SIGNED OFF — DEEPANKAR",
      },
      note: "Sourced from Neighborly’s own site and channels — yourneighborly.com. Sign off anything that should sound more like you.",
    },
    curiosity: {
      id: "curiosity",
      eyebrow: "ONE PLACE, TOLD PROPERLY",
      title: "Follow Curiosity.",
      intro:
        "A camera, a trail, and a different way of paying attention. Stories from Kumaon and beyond.",
      modes: {
        moment: "THE MOMENT",
        framed: "HOW I FRAMED IT",
      },
      video: {
        id: "vFV3MOdJyMY",
        url: "https://www.youtube.com/watch?v=vFV3MOdJyMY",
        title: "Naini Peak Trek 4K — Nainital From Above",
        channel: "Sharma G online",
      },
      footageChip: "SHARMA G ONLINE · NAINI PEAK",
      story: {
        moment: [
          {
            k: "PLACE",
            v: "Naini Peak, Nainital. A trek to the top and a view of the Himalaya, filmed in 4K.",
            status: "verified",
          },
          {
            k: "OBSERVATION",
            v: "“From the top, Nainital goes quiet — the lake holds the whole town, and the noise doesn’t make the climb.”",
            status: "signed",
          },
        ],
        framed: [
          {
            k: "PLACE",
            v: "The same peak, behind the lens. One climb, one camera, and the mountain as the subject.",
            status: "verified",
          },
          {
            k: "CREATIVE CHOICE",
            v: "Peaceful Himalayan views scored with lofi music, shot from above in 4K — choices straight from the film itself.",
            status: "verified",
          },
        ],
      },
      note: "Footage from his channel, Sharma G Online. Place and creative choice are sourced from the film’s own title; the observation line is a draft awaiting his sign-off. No invented trips or permissions.",
      moreLabel: "MORE FROM THE CAMERA",
      more: [
        {
          videoId: "fS573YBdcXw",
          title: "Kumaon knows how to make rain feel slow",
        },
        {
          videoId: "aq3Azlp57xE",
          title: "A weekend in the mountains — trek diaries ep. 01",
        },
        {
          videoId: "G7bnoDfUanc",
          title: "Escaping the noise — hidden mountain trek",
        },
        {
          videoId: "-hp4gtEKbxU",
          title: "Sometimes all you need is a quiet morning walk",
        },
      ],
    },
  },
  proof: {
    id: "proof",
    eyebrow: "SIDEQUEST — PROOF OF WORK",
    title: "Live sidequests.",
    intro:
      "No mockups, no promises. Films you can watch and websites you can click — right now.",
    filmsLabel: "THE FILMS — TWO CHANNELS, ONE TRAIL",
    films: [
      {
        videoId: "lr8auTtB3eQ",
        title: "Neighborly live on Google Play",
        channel: "NEIGHBORLY",
        url: "https://www.youtube.com/watch?v=lr8auTtB3eQ",
        embed: false,
      },
      {
        videoId: "GhkwQEMxEBk",
        title: "neighborly social drive — for the introverts too",
        channel: "NEIGHBORLY",
        igEmbed: "https://www.instagram.com/reel/DZ1_tMzznrp/embed",
        url: "https://www.instagram.com/reel/DZ1_tMzznrp/",
      },
      {
        videoId: "gY-tFRzaGzg",
        title: "neighborly village days",
        channel: "NEIGHBORLY",
        url: "https://www.youtube.com/watch?v=gY-tFRzaGzg",
      },
      {
        videoId: "fS573YBdcXw",
        title: "kumaon knows how to make rain feel slow",
        channel: "SHARMA G ONLINE",
        url: "https://www.youtube.com/watch?v=fS573YBdcXw",
      },
      {
        videoId: "aq3Azlp57xE",
        title: "a weekend in the mountains — trek diaries ep. 01",
        channel: "SHARMA G ONLINE",
        url: "https://www.youtube.com/watch?v=aq3Azlp57xE",
      },
      {
        videoId: "vFV3MOdJyMY",
        title: "Naini Peak trek 4K — Nainital from above",
        channel: "SHARMA G ONLINE",
        url: "https://www.youtube.com/watch?v=vFV3MOdJyMY",
      },
      {
        videoId: "G7bnoDfUanc",
        title: "Escaping the noise — hidden mountain trek",
        channel: "SHARMA G ONLINE",
        url: "https://www.youtube.com/watch?v=G7bnoDfUanc",
      },
      {
        videoId: "-hp4gtEKbxU",
        title: "Sometimes all you need is a quiet morning walk",
        channel: "SHARMA G ONLINE",
        url: "https://www.youtube.com/watch?v=-hp4gtEKbxU",
      },
    ],
    sitesLabel: "THE WEBSITES — LIVE, CLICK THEM",
    sites: [
      {
        name: "Neighborly",
        tag: "CURRENT BUILD",
        img: "https://ideepankarsharma2003.github.io/assets/img/flagship/neighborly.jpg",
        desc: "Real-world neighbor discovery, activity matching, events, and community engagement. Live on Google Play and the web.",
        url: "https://yourneighborly.com/app",
        hot: true,
      },
      {
        name: "Redegades",
        tag: "BUSINESS COPILOT",
        img: "https://ideepankarsharma2003.github.io/assets/img/flagship/redegades.png",
        desc: "AI business copilot for decision intelligence, meeting memory, and cross-application automation.",
        url: "https://ideepankarsharma2003.github.io/#portfolio",
      },
      {
        name: "LabThunder",
        tag: "MULTI-AGENT OPS",
        img: "https://ideepankarsharma2003.github.io/assets/img/flagship/thunder.jpg",
        desc: "Multi-agent lab workflows for equipment discovery, routing, and decision support.",
        url: "https://labthunder.io/",
      },
      {
        name: "Shotify.ai",
        tag: "AI VIDEO",
        img: "https://ideepankarsharma2003.github.io/assets/img/flagship/shotify.jpg",
        desc: "Short-form video generation and publishing pipeline built on Django and cloud infrastructure.",
        url: "https://shotify.ai/",
      },
      {
        name: "RedSerp",
        tag: "TREND INTEL",
        img: "https://ideepankarsharma2003.github.io/assets/img/flagship/redserp.jpg",
        desc: "Reddit trend intelligence with automated ingestion, topic discovery, and ML content insights.",
        url: "https://redserp.com/",
      },
      {
        name: "Paperbot.AI",
        tag: "CONTENT AGENT",
        img: "https://ideepankarsharma2003.github.io/assets/img/flagship/paperbot.jpg",
        desc: "GPT-4, Whisper, LangChain, and CrewAI system for turning voice and notes into long-form content.",
        url: "https://paperbot.ai/",
      },
    ],
    studio: {
      short: "Object Oriented Teens",
      name: "Object Oriented Teens Infotech Services",
      logo: "https://www.objectorientedteens.com/oot-logo.png",
      url: "https://www.objectorientedteens.com/",
      tagline: "Ambitious ideas. Beautifully built.",
      desc: "My independent technology studio: AI solutions, web and SaaS products, mobile apps, cloud systems, digital growth, and support.",
      motto:
        "HUMAN IDEAS ✳ INTELLIGENT SYSTEMS ✳ DESIGNED WITH INTENT ✳ ENGINEERED TO WORK",
    },
    note: "Every film and link comes from Deepankar’s own channels and portfolio site. No invented metrics, no follower counts.",
  },
  personal: {
    introduction:
      "I’m from Uttarakhand. I paint, travel with a backpack, make films, and build software. My interests tend to follow me from the screen to the mountains and back again.",
    story:
      "I grew up an introvert and taught myself how to socialize. Making things together is one way I’ve found to connect with people. That’s a thread running through my films, community gatherings, and some of the things I build.",
    interests: [
      {
        title: "Painting",
        text: "Color, texture, and a different way to make something.",
      },
      {
        title: "Backpacking",
        text: "Mountain air, long walks, and the unexpected detour.",
      },
      {
        title: "Filmmaking",
        text: "Looking a little closer at the places I go.",
      },
      {
        title: "Building",
        text: "Following an idea far enough to try it out.",
      },
    ],
    community:
      "A shared activity can make a first conversation easier. I like creating small reasons for people to meet—an art session, a walk, a chance to help out together.",
  },
};
