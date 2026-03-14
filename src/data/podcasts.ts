export interface PodcastEpisode {
  id: string;
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  guest: string;
  guestTitle: string;
  guestAvatar: string;
  date: string;
  duration: number; // minutes
  audioUrl: string;
  videoUrl: string;
  topics: string[];
  episodeNumber: number;
}

export const podcastEpisodes: PodcastEpisode[] = [
  {
    id: "ep-12",
    slug: "building-saas-in-a-weekend",
    title: "Building a Full SaaS in a Weekend with Claude Code",
    description: "Marcus Chen shares how he built and launched a complete project management tool in 48 hours using nothing but Claude Code and natural language prompts.",
    longDescription: "In this episode, we sit down with Marcus Chen, a former product manager who taught himself to code using AI tools. Marcus walks us through his incredible journey of building ProjectFlow — a full-featured project management SaaS — in just one weekend. He covers his workflow, the prompts he used, how he handled authentication, payments, and deployment, and the surprising lessons he learned about what vibe coding can and can't do. Whether you're a seasoned developer looking to 10x your speed or a complete beginner dreaming of launching your first app, this episode is packed with actionable insights.",
    guest: "Marcus Chen",
    guestTitle: "Founder, ProjectFlow",
    guestAvatar: "/images/avatars/marcus.jpg",
    date: "2026-03-10",
    duration: 58,
    audioUrl: "#",
    videoUrl: "#",
    topics: ["SaaS", "Claude Code", "Weekend Projects", "Shipping Fast"],
    episodeNumber: 12,
  },
  {
    id: "ep-11",
    slug: "designer-to-developer",
    title: "From Designer to Full-Stack Developer in 30 Days",
    description: "Sarah Kim, a UI designer, describes her transformation into a shipping developer using AI coding tools — and the design-first approach that gave her an edge.",
    longDescription: "Sarah Kim spent 8 years as a UI/UX designer at top tech companies. She always had ideas for products but couldn't build them herself. Then she discovered vibe coding. In this conversation, Sarah shares her 30-day journey from designer to full-stack developer, how her design background actually became a superpower, and why she believes the future belongs to people who can think in products, not just code. She demos her app MoodBoard AI live on the show and breaks down exactly how she built it.",
    guest: "Sarah Kim",
    guestTitle: "Designer & Indie Developer",
    guestAvatar: "/images/avatars/sarah.jpg",
    date: "2026-03-03",
    duration: 45,
    audioUrl: "#",
    videoUrl: "#",
    topics: ["Design", "Career Change", "Full-Stack", "Product Thinking"],
    episodeNumber: 11,
  },
  {
    id: "ep-10",
    slug: "open-source-ai-tools",
    title: "The Open Source AI Toolkit: What's Worth Using in 2026",
    description: "Developer advocate Jamie Rodriguez breaks down the best open-source tools for AI-assisted development, from Claude Code to Cursor to Aider.",
    longDescription: "The ecosystem of AI coding tools is exploding, and it can be overwhelming to know what's worth your time. Jamie Rodriguez, a developer advocate who's tested virtually every tool on the market, joins us to give a no-BS breakdown of the current landscape. We cover Claude Code's terminal workflow, how it compares to IDE-based tools, the best open-source alternatives, and Jamie's framework for evaluating which tools actually make you more productive versus which ones are just hype.",
    guest: "Jamie Rodriguez",
    guestTitle: "Developer Advocate, DevToolsCo",
    guestAvatar: "/images/avatars/jamie.jpg",
    date: "2026-02-24",
    duration: 62,
    audioUrl: "#",
    videoUrl: "#",
    topics: ["Open Source", "Developer Tools", "AI Coding", "Productivity"],
    episodeNumber: 10,
  },
  {
    id: "ep-9",
    slug: "non-technical-founder",
    title: "How a Non-Technical Founder Built a $10K MRR Product",
    description: "Alex Park had zero coding experience. Using AI tools and sheer determination, he built a niche B2B tool that now generates $10K in monthly recurring revenue.",
    longDescription: "Alex Park is proof that you don't need a CS degree to build a successful software product. As a former real estate agent, Alex identified a pain point in property management communication and decided to solve it himself. Using Claude Code and a lot of YouTube tutorials, he built PropComm — a tenant communication platform — from scratch. In this episode, Alex shares his entire journey: the early failures, the breakthrough moments, how he landed his first 50 customers, and his advice for other non-technical founders who want to build.",
    guest: "Alex Park",
    guestTitle: "Founder, PropComm",
    guestAvatar: "/images/avatars/alex.jpg",
    date: "2026-02-17",
    duration: 51,
    audioUrl: "#",
    videoUrl: "#",
    topics: ["Non-Technical Founders", "B2B SaaS", "Revenue", "Solo Founder"],
    episodeNumber: 9,
  },
  {
    id: "ep-8",
    slug: "vibe-coding-education",
    title: "Should Schools Teach Vibe Coding? A Debate",
    description: "Two educators with opposing views discuss whether AI-assisted 'vibe coding' should be part of computer science curricula or if it undermines learning fundamentals.",
    longDescription: "This is one of our most thought-provoking episodes yet. Professor Diana Walsh from MIT argues that traditional CS fundamentals are more important than ever, while high school teacher and coding bootcamp founder Ray Nakamura believes vibe coding is the great equalizer that will democratize software creation. They go back and forth on what students actually need to learn, whether understanding algorithms matters when AI can write them, and how education should adapt to a world where anyone can build software.",
    guest: "Prof. Diana Walsh & Ray Nakamura",
    guestTitle: "MIT CS Department & CodeNext Academy",
    guestAvatar: "/images/avatars/diana.jpg",
    date: "2026-02-10",
    duration: 72,
    audioUrl: "#",
    videoUrl: "#",
    topics: ["Education", "CS Fundamentals", "Debate", "Future of Coding"],
    episodeNumber: 8,
  },
  {
    id: "ep-7",
    slug: "ai-native-startups",
    title: "The Rise of AI-Native Startups: Building with 1-Person Teams",
    description: "Venture capitalist Lisa Huang discusses why she's betting big on solo founders using AI tools to build companies that previously required teams of 10+.",
    longDescription: "Lisa Huang is a partner at Gradient Ventures and has been investing in what she calls 'AI-native startups' — companies built from day one using AI coding tools, often by solo founders or tiny teams. In this episode, Lisa explains her investment thesis, shares examples of portfolio companies that are punching way above their weight class, and discusses what she looks for in founders who are building this way. She also offers practical advice on fundraising, go-to-market strategy, and why she thinks the next generation of billion-dollar companies will be built by 1-3 person teams.",
    guest: "Lisa Huang",
    guestTitle: "Partner, Gradient Ventures",
    guestAvatar: "/images/avatars/lisa.jpg",
    date: "2026-02-03",
    duration: 55,
    audioUrl: "#",
    videoUrl: "#",
    topics: ["Startups", "Venture Capital", "Solo Founders", "AI-Native"],
    episodeNumber: 7,
  },
];
