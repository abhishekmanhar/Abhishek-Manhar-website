import { Project, Experience, Testimonial, GalleryItem } from "./types";
// @ts-ignore
import dionThumbnail from "./assets/images/regenerated_image_1780954424543.png";

export const PERSONAL_INFO = {
  name: "Abhishek Manhar",
  currentRole: "Generalist & Full-Stack Developer",
  currentStatus: "Former Software Developer Intern @ JP Morgan Chase & Co.",
  location: "Bangalore, India",
  email: "abhishekmanhar004@gmail.com",
  phone: "+91 9399732115",
  linkedin: "https://www.linkedin.com/in/abhishek-manhar-004/",
  github: "https://github.com/abhishekmanhar",
  instagram: "https://www.instagram.com/abhishekmnhr/",
  portfolio: "https://abhishekmanhar.vercel.app/",
  resumeUrl: "https://drive.google.com/file/d/11ZDgFklnkDrgRcbTMz9Pd7vNC3ZogWKp/view?usp=sharing", // Standard self PDF view
  oneLiner: "A passion-driven generalist developer engineering high-performance systems and bespoke interactive digital experiences.",
  taglines: [
    "Engineering high-performance systems & fluid digital experiences.",
    "A generalist developer building robust, scale-focused software.",
    "Former Software Developer Intern at JPMorgan Chase & Co.",
    "Bridging complex system architecture with human-centered designs."
  ],
  bioParagraph1: "Hi, I'm Abhishek Manhar — I program computers. I'm a generalist developer who worked at JP Morgan Chase & Co as a Software Developer Intern. I don't believe in limits or strict niches; I build across the entire stack, spanning high-fidelity web apps, intuitive mobile platforms, desktop tools, optimized servers, and responsive embedded systems.",
  bioParagraph2: "Developing taught me system performance, multi-user scaling, and strict architecture. Personal experimentation and design taught me constraint, design intuition, and user empathy. I stopped picking between separate engineering and designer identities and started harnessing their productive tension to compose products people genuinely love."
};

export const PROJECTS: Project[] = [
  {
    id: "p1",
    slug: "p1",
    number: "01",
    year: "2024",
    title: "DION — Website Builder (SaaS)",
    tags: ["Next.js", "Prisma", "PostgreSQL", "Stripe Connect", "SaaS"],
    shortDescription: "A high-performance multi-tenant SaaS platform built for digital agencies to seamlessly compile speed-optimized sales funnels.",
    discipline: "SaaS Architecture & Full-stack Engineering",
    role: "Lead Full-stack Engineer",
    timeline: "3 Months (Q2 2024)",
    thumbnail: dionThumbnail,
    fullDescription: "DION is a state-of-the-art multi-tenant Software-as-a-Service (SaaS) platform that enables agency administrators to register, manage independent sub-accounts, and deploy custom landing pages and sales funnels. Built natively on Next.js 14, the platform leverages Prisma ORM combined with PostgreSQL for complex relational query efficiency. The core monetization layer is driven by Stripe Connect, empowering automated recurring subscription cycles, customized checkout sheets, and real-time application fee collection per sale. By optimizing SQL indexing, server-side caching, and critical database queries, API response times were minimized by 80%, guaranteeing stable operation under load.",
    challenges: [
      "Implementing secure multi-tenant isolation across sub-accounts while allowing agencies to map custom root domains.",
      "Syncing split-payment distributions and keeping track of webhooks from Stripe Connect reliably.",
      "Optimizing database query speeds for dynamic component generation."
    ],
    solutions: [
      "Created sub-domain routing middleware that filters requests at the edge server level based on headers.",
      "Implemented an idempotent webhook receiving service coupled with Redis fallback queue to handle payment events.",
      "Utilized Prisma query batching and cached compiled layouts in edge CDN memory."
    ],
    techStack: ["Next.js 14", "React", "Prisma ORM", "PostgreSQL", "Stripe API", "Tailwind CSS", "TypeScript"],
    githubLink: "https://github.com/abhishekmanhar/dion-forge",
    websiteLink: "https://dionforge.vercel.app/"
  },
  {
    id: "p2",
    slug: "p2",
    number: "02",
    year: "2024",
    title: "Discover.Jobs — Modern Job Board",
    tags: ["React", "TypeScript", "Supabase", "Job Board"],
    shortDescription: "A fluid full-stack job directory engineered with real-time query parameters and granular categorical browsing interfaces.",
    discipline: "Frontend Engineering & Database Integration",
    role: "Frontend Engineer & Database Designer",
    timeline: "2 Months",
    thumbnail: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=800&auto=format&fit=crop&q=80",
    fullDescription: "Discover.Jobs reimagines how candidates explore tech vacancies. Utilizing React and TypeScript, the platform pairs with Supabase's PostgreSQL engine to deliver instantaneous indexing, keyword searches, and reactive multi-category filtering. The user interface is crafted to prioritize readability and swift interactions. Candidates are offered a multi-pane overview that groups openings by sector, location constraints, experience requirements, and wage slabs. All actions are verified with optimistic UI state shifts to prevent lagging indicators from muddying the applicant journey.",
    challenges: [
      "Delivering frictionless, zero-lag client-side filtering over thousands of active job opportunities.",
      "Handling real-time state synchronizations when multiple users submit job applications simultaneously."
    ],
    solutions: [
      "Engineered debounce utility decorators and custom React hook query pipelines.",
      "Leveraged Supabase real-time database event subscriptions to dynamically update listing counters on the screen."
    ],
    techStack: ["React 18", "TypeScript", "Supabase DB", "Tailwind CSS", "Framer Motion", "Real-time Subscriptions"],
    githubLink: "https://github.com/abhishekmanhar/Dicover.jobs",
    websiteLink: "https://dicoverjobs.vercel.app/"
  },
  {
    id: "p3",
    slug: "p3",
    number: "03",
    year: "2025",
    title: "Cogito — Summarizer AI",
    tags: ["React", "OpenAI APIs", "Vercel", "Tailwind CSS"],
    shortDescription: "A sophisticated AI-powered text analyzer that processes verbose documents into highly readable, structured summaries.",
    discipline: "AI Integration & Advanced UX Design",
    role: "Web Application Developer",
    timeline: "1 Month (Early 2025)",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=800&auto=format&fit=crop&q=80",
    fullDescription: "Cogito bridges the gap between deep texts and rapid comprehension. Built as a high-speed web application using React and Tailwind CSS, it integrates OpenAI's powerful GPT APIs to consume long essays, PDF uploads, or webpage links. Cogito processes these files via server-side microservices, ensuring user secrets stay completely hidden, and formats key takeaways into neat bullets, main ideas, and semantic maps. Designed with dark-mode elegance, it achieves 95% service uptime and has handled thousands of successful test summaries compiled in under 1.5 seconds per query.",
    challenges: [
      "Exposing third-party LLM APIs safely without causing browser token leakage or front-end request timeouts on extremely heavy text bodies.",
      "Parsing unformatted PDF structures and converting them into neat markdown text segments."
    ],
    solutions: [
      "Built a secure server proxy route running on the backend Node middleware ensuring all API key authorization headers remain sever-side.",
      "Wrote custom regex cleanup algorithms to parse raw text streams and organized dynamic UI responses elegantly with markdown renderers."
    ],
    techStack: ["React", "Node.js", "OpenAI GPT-4 SDK", "Tailwind CSS", "Vercel Serverless Functions", "Vite"],
    githubLink: "https://github.com/abhishekmanhar/Cogito-AI-Summarizer",
    websiteLink: "https://cogito-ai-summarizer.vercel.app/"
  },
  {
    id: "p4",
    slug: "p4",
    number: "04",
    year: "2024",
    title: "Social Media Post Generator",
    tags: ["GPT-4", "React", "AI", "Copywriting"],
    shortDescription: "A targeted copywriting booster translating core raw thoughts into high-conversion engagement templates for social channels.",
    discipline: "AI Assistant & Web Engineering",
    role: "Creator & Lead Developer",
    timeline: "1 Month",
    thumbnail: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=800&auto=format&fit=crop&q=80",
    fullDescription: "Social Media Post Generator empowers developers and writers to output professional copywriting templates at scale. The platform takes raw, unstructured inputs (such as code explanations or daily field notes) and utilizes customized Prompt Engineering sequences on top of GPT-4 APIs to craft bespoke copy tailored for X (Twitter), LinkedIn, and Instagram. Complete with built-in visual frames representing target mobile dimensions, writers can review text alignments, character limits, and visual aesthetics before posting directly to social hubs.",
    challenges: [
      "Adhering to strict character restrictions of different social platforms while retaining the central meaning.",
      "Guarding model requests from generating generic, artificial-sounding copywriting cliches."
    ],
    solutions: [
      "Wrote responsive real-time constraint hooks in React to slice outputs according to platform rules.",
      "Crafted fine-tuned system instruction sets with negative prompts to exclude repetitive buzzwords and force natural voice tones."
    ],
    techStack: ["React", "Tailwind CSS", "GPT-3.5/4 SDK", "Server Proxy", "Lucide React"],
    githubLink: "https://github.com/abhishekmanhar/Social-post-generator",
    websiteLink: "https://social-post-generator-nine.vercel.app/"
  },
  {
    id: "p5",
    slug: "p5",
    number: "05",
    year: "2024",
    title: "Keystroke Rate Test - Speed Analyzer",
    tags: ["JavaScript", "HTML5", "WPM Engine", "Metrics"],
    shortDescription: "A high-precision real-time typing analyzer measuring character-per-minute fluctuations and error frequencies.",
    discipline: "Interactive Frontend Performance",
    role: "Developer & Designer",
    timeline: "2 Weeks",
    thumbnail: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80",
    fullDescription: "Keystroke Rate Test is a clean, hyper-responsive utility built strictly for typing hobbyists. By implementing high-frequency event listeners, the engine captures every downstroke to calculate speed in real-time (Words Per Minute and Characters Per Minute). It graphs typographical performance dynamically, showing interactive D3.js line charts illustrating speed stability, accuracy curves, and specific key-mismatch frequency tables.",
    challenges: [
      "Eliminating input-to-render delays on high-speed typists typing over 140 WPM.",
      "Calculating rolling speed fluctuations smoothly without producing jumpy visual spikes."
    ],
    solutions: [
      "Utilized active requestAnimationFrame loops to isolate keyboard state collection from the rendering cycle.",
      "Applied a rolling average filter to smoothly transition line graphs."
    ],
    techStack: ["HTML5 Canvas", "Tailwind CSS", "TypeScript", "D3.js Visualization", "Web Audio API"]
  },
  {
    id: "p6",
    slug: "p6",
    number: "06",
    year: "2024",
    title: "Web Development Compiler",
    tags: ["React", "Sandboxing", "iFrame API", "Monaco Editor"],
    shortDescription: "An in-browser front-end compiler and playground rendering HTML, CSS, and JS code changes instantly with hot reloading.",
    discipline: "Browser Compilation & Sandboxing",
    role: "Full-Stack Developer",
    timeline: "3 Weeks",
    thumbnail: "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=800&auto=format&fit=crop&q=80",
    fullDescription: "Web Development Compiler provides developers an isolated, instant code editor in their browser. Integrating Monaco Editor (the same engine underpinning VS Code) with an isolated iframe playground, it lets users write HTML5, CSS3, and JavaScript, compiling and hot-reloading code on the fly. It leverages service workers to intercept standard relative queries, producing a sandboxed preview environment that functions entirely offline without server-side compute charges.",
    challenges: [
      "Preventing malicious code script injections from compromising the host page domain cookies and credentials.",
      "Providing clear, structured console and error reports that capture script crashes inside the sandbox."
    ],
    solutions: [
      "Established a separate sandboxed null-origin iframe with strict security policies (no-same-origin, allow-scripts).",
      "Overrode the sandbox window.console methods to capture output streams and redirect logs to an elegant terminal panel."
    ],
    techStack: ["React.js", "Monaco Editor", "Iframe Sandbox API", "Service Workers", "Lucide Icons", "Tailwind"],
    githubLink: "https://github.com/abhishekmanhar/Web-development-compiler",
    websiteLink: "https://web-development-compiler.vercel.app/"
  },
  {
    id: "p7",
    slug: "p7",
    number: "07",
    year: "2023",
    title: "Sorting Perceiver",
    tags: ["Algorithms", "Visualization", "Audio Synthesis", "React"],
    shortDescription: "A fully sensory sorting algorithm sandbox featuring multiple speeds, color-coded item states, and sound synthesis.",
    discipline: "Educational Game Design",
    role: "Creator",
    timeline: "2 Weeks",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    fullDescription: "Sorting Perceiver is a colorful, audible educational widget exploring the mathematical beauty of algorithm systems. It renders vertical bars representing data rows, running step-by-step executions of Quicksort, Mergesort, Bubble Sort, Insertion Sort, and Heap Sort. Each comparison event triggers custom synth wave sounds using the Web Audio API, where pitch represents the bar's height. This delivers an immersive audiovisual learning experience that makes abstract CS concepts feel incredibly concrete.",
    challenges: [
      "Intertwining audio synth bursts perfectly with array shifts without causing sound crackles or script lag.",
      "Securing clean step-by-step playback pauses so users can step, reverse, and resume bubble/merge transitions comfortably."
    ],
    solutions: [
      "Implemented a lightweight Web Audio Oscillator pool with smooth exponential envelope ramps to prevent click noises.",
      "Designed a custom async/promise-based generator queue that yields control on each comparison step."
    ],
    techStack: ["React", "Web Audio API Synths", "Tailwind CSS", "Algorithm Controllers", "Canvas Visualizer"],
    githubLink: "https://github.com/abhishekmanhar/Sorting-Perceiver",
    websiteLink: "https://sorting-perceiver.vercel.app/"
  }
];

export const EXPERIENCES: Experience[] = [
  {
    company: "Citi ICG",
    role: "Technology Software Development Intern",
    duration: "Dec 2024 — Feb 2025",
    location: "Remote, Bangalore",
    description: [
      "Engineered a Java-based internal tool to visualize real-time stock market risk, significantly enhancing reporting accuracy.",
      "Optimized loan management workflows by designing detailed UML state diagrams, streamlining internal processes.",
      "Researched machine learning models for credit risk assessment to provide actionable data-driven recommendations."
    ],
    skillsBuilt: ["Java", "Spring Boot", "System Design", "UML Diagrams", "Credit Risk Analysis"]
  },
  {
    company: "JP Morgan Chase & Co.",
    role: "Software Development Intern",
    duration: "Jan 2024 — June 2024",
    location: "Remote, Bangalore",
    description: [
      "Architected full-stack applications integrating live stock price feeds using Java and proprietary frameworks, improving data accessibility for traders.",
      "Developed intuitive UI components for real-time market data visualization, increasing trader decision speed.",
      "Standardized coding practices across projects, resulting in a 25% improvement in code quality and 15% faster delivery."
    ],
    skillsBuilt: ["Java Enterprise", "Proprietary APIs", "React.js", "Corporate Coding Standards"]
  },
  {
    company: "Purple Tutor",
    role: "IT Intern",
    duration: "Sep 2022 — March 2023",
    location: "Remote, Durg",
    description: [
      "Developed new features for online tutoring platforms using React.js, Node.js, and MongoDB, enhancing user engagement and platform functionality.",
      "Optimized admin panel workflows, reducing manual overhead and improving operational efficiency by 50%.",
      "Boosted site responsiveness and navigation, leading to a significant increase in user retention."
    ],
    skillsBuilt: ["React.js", "Node.js", "MongoDB", "Admin Dashboards", "UI Optimization"]
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: "Abhishek has an exceptional ability to bring clarity and life to ambiguous ideas, turning them into highly practical, robust products with flawless styling.",
    author: "Anubhav Agarwal",
    position: "Founder",
    company: "Superreply"
  },
  {
    quote: "He listens, challenges engineering and design assumptions thoughtfully, and consistently delivers system structures far above our initial benchmarks.",
    author: "Marco Nobel",
    position: "Founder",
    company: "Fuse Living"
  },
  {
    quote: "His code quality is outstanding. At JPMC, his intuitive UI components and clean practices improved team deliverables and speeded asset distributions.",
    author: "Finance Product Lead",
    position: "VP Products",
    company: "JPMorgan Chase & Co."
  },
  {
    quote: "He consistently went above and beyond, utilizing his software engineering and creative abilities to maximize our operational stability.",
    author: "Nandesh Goudar",
    position: "Country Director",
    company: "AIESEC"
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "g1",
    title: "Brutalist Editorial Grid Poster",
    category: "graphic",
    image: "https://images.unsplash.com/photo-1561070791-26c113006238?w=800&auto=format&fit=crop&q=80",
    description: "Graphic exploration inspired by post-modern Swiss design principles, emphasizing tight tracking and raw typography blocks.",
    aspect: "aspect-[3/4]"
  },
  {
    id: "g2",
    title: "Chromatic Type Drift",
    category: "graphic",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80",
    description: "An experimentation in typographical noise and chromatic aberration overlays compiled dynamically.",
    aspect: "aspect-square"
  },
  {
    id: "g3",
    title: "Identity Concept for SaaS",
    category: "graphic",
    image: dionThumbnail,
    description: "Brand ecosystem styled exclusively in a strict neon orange and deep charcoal moodboard.",
    aspect: "aspect-[4/3]"
  },
  {
    id: "g4",
    title: "Modular Spreads & Layout Mock",
    category: "graphic",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80",
    description: "Print-inspired design grid exhibiting visual margins, micro-captions, and heavy contrast margins.",
    aspect: "aspect-[3/4]"
  },
  {
    id: "g5",
    title: "Minimal Brutalist Flyer Schema",
    category: "graphic",
    image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&auto=format&fit=crop&q=80",
    description: "High density layout mapping coordinates, ASCII symbols, and layered metadata frames.",
    aspect: "aspect-square"
  },
  {
    id: "g6",
    title: "Aesthetic Book Cover Form",
    category: "graphic",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80",
    description: "Rebranding study focusing on editorial book jackets, utilising generous column gutters.",
    aspect: "aspect-[3/4]"
  },
  {
    id: "g7",
    title: "Structured Packaging Grid",
    category: "graphic",
    image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80",
    description: "Visual analysis of spatial packaging lines, rendered with strict linear shadows.",
    aspect: "aspect-[4/3]"
  },
  {
    id: "g8",
    title: "High Contrast Geometry Vectors",
    category: "graphic",
    image: "https://images.unsplash.com/photo-1502239608882-93b729c6af43?w=800&auto=format&fit=crop&q=80",
    description: "A series of abstract geometry studies mapping concentric curves and negative space dynamics.",
    aspect: "aspect-square"
  },

  // Paintings (Oh, I forgot - I paint too!)
  {
    id: "p_art1",
    title: "Impasto Palette Play",
    category: "painting",
    image: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80",
    description: "Heavy impasto acrylic modeling explore on coarse, high-grain canvas textures, highlighting depth tactile strokes.",
    aspect: "aspect-[3/4]"
  },
  {
    id: "p_art2",
    title: "Terracotta Dawn Stroke",
    category: "painting",
    image: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?w=800&auto=format&fit=crop&q=80",
    description: "Abstract expressionist study composed with warm terracotta and burnt orange acrylic tones.",
    aspect: "aspect-[4/3]"
  },
  {
    id: "p_art3",
    title: "Saturated Oil Glimmer",
    category: "painting",
    image: "https://images.unsplash.com/photo-1579783928621-7a13d66a6211?w=800&auto=format&fit=crop&q=80",
    description: "Richly detailed oil-layer textures exploring transition states of amber light reflections.",
    aspect: "aspect-square"
  },
  {
    id: "p_art4",
    title: "Laid Gouache Landscape",
    category: "painting",
    image: "https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=800&auto=format&fit=crop&q=80",
    description: "A calming horizontal gouache exploration balancing warm sky accents against heavy geometric hills.",
    aspect: "aspect-[4/3]"
  },
  {
    id: "p_art5",
    title: "Expressionist Hue Mask",
    category: "painting",
    image: "https://images.unsplash.com/photo-1580136579312-94651dfd596d?w=800&auto=format&fit=crop&q=80",
    description: "Mixed media paint and oil pastel layering exploring raw emotional contours.",
    aspect: "aspect-[3/4]"
  },
  {
    id: "p_art6",
    title: "Composite Canvas Fiber",
    category: "painting",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&auto=format&fit=crop&q=80",
    description: "A tactile collage experiment weaving newspaper text fragments directly into heavy gesso coatings.",
    aspect: "aspect-square"
  }
];
