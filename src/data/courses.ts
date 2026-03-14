export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  longDescription: string;
  instructor: string;
  instructorBio: string;
  instructorAvatar: string;
  price: number;
  originalPrice: number;
  currency: string;
  duration: string;
  modules: CourseModule[];
  level: "beginner" | "intermediate" | "advanced";
  enrolled: number;
  rating: number;
  reviews: number;
  tags: string[];
  featured: boolean;
  stripePriceId: string;
}

export interface CourseModule {
  title: string;
  lessons: string[];
  duration: string;
}

export const courses: Course[] = [
  {
    id: "vibe-coding-fundamentals",
    slug: "vibe-coding-fundamentals",
    title: "Vibe Coding Fundamentals",
    subtitle: "Go from zero to shipping your first app in one week",
    description: "The complete beginner's course for vibe coding. Learn to build real web applications using AI tools — no prior coding experience needed. By the end, you'll have built and deployed 3 complete projects.",
    longDescription: "This course is designed for absolute beginners who have never written a line of code. Over 6 modules, you'll learn the fundamentals of how web applications work, how to use AI coding tools effectively, and how to build, test, and deploy real projects. Each module includes hands-on exercises where you'll build something tangible. By the end of the course, you'll have 3 deployed projects in your portfolio and the confidence to tackle any app idea.",
    instructor: "Elena Vasquez",
    instructorBio: "Elena is a former product designer who transitioned to full-stack development using AI tools. She's built 12 successful products and has taught over 2,000 students how to code with AI. Her teaching style is patient, practical, and focused on building real things.",
    instructorAvatar: "/images/avatars/elena.jpg",
    price: 149,
    originalPrice: 299,
    currency: "USD",
    duration: "6 weeks",
    modules: [
      {
        title: "Welcome to Vibe Coding",
        lessons: [
          "What is vibe coding and why it matters",
          "Setting up your development environment",
          "Installing Claude Code",
          "Your first conversation with AI",
          "Understanding how web apps work",
        ],
        duration: "2 hours",
      },
      {
        title: "Building Your First App",
        lessons: [
          "Planning your app before building",
          "Creating a project from scratch",
          "Building UI components with natural language",
          "Adding interactivity and state",
          "Project: Build a personal dashboard",
        ],
        duration: "3 hours",
      },
      {
        title: "Design That Doesn't Suck",
        lessons: [
          "Design principles for non-designers",
          "Working with Tailwind CSS through AI",
          "Responsive design for mobile",
          "Icons, images, and visual polish",
          "Project: Redesign your dashboard to look professional",
        ],
        duration: "2.5 hours",
      },
      {
        title: "Working with Data",
        lessons: [
          "Introduction to databases",
          "Setting up Supabase",
          "CRUD operations through AI",
          "User authentication",
          "Project: Build a bookmarks app with user accounts",
        ],
        duration: "3 hours",
      },
      {
        title: "Going Live",
        lessons: [
          "Version control with Git basics",
          "Deploying to Railway",
          "Custom domains and DNS",
          "Environment variables and security",
          "Project: Deploy all your projects",
        ],
        duration: "2 hours",
      },
      {
        title: "Leveling Up",
        lessons: [
          "Advanced prompting strategies",
          "Debugging with AI assistance",
          "Adding payments with Stripe",
          "SEO and analytics basics",
          "What to build next: finding your niche",
        ],
        duration: "2.5 hours",
      },
    ],
    level: "beginner",
    enrolled: 2847,
    rating: 4.9,
    reviews: 412,
    tags: ["Beginner", "Web Development", "Claude Code", "Full Course"],
    featured: true,
    stripePriceId: "price_placeholder_fundamentals",
  },
  {
    id: "ai-assisted-fullstack",
    slug: "ai-assisted-fullstack",
    title: "AI-Assisted Full-Stack Development",
    subtitle: "Build production-grade applications with AI as your co-pilot",
    description: "Take your vibe coding skills to the next level. Learn to build complex, production-ready full-stack applications with databases, authentication, APIs, payments, and deployment.",
    longDescription: "You've built your first apps — now it's time to build real products. This intermediate course covers everything you need to ship production-grade applications: relational databases, authentication systems, REST and GraphQL APIs, real-time features, payment processing, and professional deployment workflows. Each module culminates in building a piece of a capstone project: a complete SaaS application.",
    instructor: "Marcus Chen",
    instructorBio: "Marcus is a full-stack developer and founder of ProjectFlow, a project management SaaS he built entirely with AI tools. He has 8 years of experience in software engineering and specializes in making complex technical concepts accessible to everyone.",
    instructorAvatar: "/images/avatars/marcus.jpg",
    price: 249,
    originalPrice: 499,
    currency: "USD",
    duration: "8 weeks",
    modules: [
      {
        title: "Architecture & Planning",
        lessons: [
          "How modern web applications are structured",
          "Choosing the right tech stack",
          "Database design fundamentals",
          "API design patterns",
          "Planning your capstone SaaS project",
        ],
        duration: "2.5 hours",
      },
      {
        title: "Database Mastery",
        lessons: [
          "Relational vs. document databases",
          "Schema design and migrations",
          "Complex queries and relationships",
          "Performance and indexing basics",
          "Hands-on: Build the data layer",
        ],
        duration: "3 hours",
      },
      {
        title: "Authentication & Authorization",
        lessons: [
          "Auth concepts: sessions, JWTs, OAuth",
          "Implementing email/password auth",
          "Social login (Google, GitHub)",
          "Role-based access control",
          "Hands-on: Secure your application",
        ],
        duration: "3 hours",
      },
      {
        title: "API Development",
        lessons: [
          "Building REST APIs with Next.js",
          "Input validation and error handling",
          "Rate limiting and security",
          "File uploads and processing",
          "Hands-on: Build the API layer",
        ],
        duration: "3.5 hours",
      },
      {
        title: "Payments & Billing",
        lessons: [
          "Stripe integration deep dive",
          "One-time payments vs subscriptions",
          "Webhooks and event handling",
          "Billing portals and invoices",
          "Hands-on: Add paid plans to your SaaS",
        ],
        duration: "3 hours",
      },
      {
        title: "Real-Time Features",
        lessons: [
          "WebSockets and real-time data",
          "Live notifications",
          "Collaborative features",
          "Optimistic updates",
          "Hands-on: Add real-time to your app",
        ],
        duration: "2.5 hours",
      },
      {
        title: "Testing & Quality",
        lessons: [
          "Why testing matters for AI-generated code",
          "Unit and integration testing",
          "End-to-end testing with Playwright",
          "CI/CD pipelines",
          "Hands-on: Add tests to your SaaS",
        ],
        duration: "3 hours",
      },
      {
        title: "Launch Day",
        lessons: [
          "Production deployment checklist",
          "Monitoring and error tracking",
          "Analytics and user feedback",
          "Marketing your product",
          "Capstone: Launch your SaaS product",
        ],
        duration: "2.5 hours",
      },
    ],
    level: "intermediate",
    enrolled: 1523,
    rating: 4.8,
    reviews: 234,
    tags: ["Full-Stack", "Production", "SaaS", "Intermediate"],
    featured: true,
    stripePriceId: "price_placeholder_fullstack",
  },
  {
    id: "claude-code-mastery",
    slug: "claude-code-mastery",
    title: "Claude Code Mastery",
    subtitle: "Become a power user of the most capable AI coding tool",
    description: "Deep dive into Claude Code's advanced features — custom instructions, multi-file workflows, automated testing, git integration, and techniques used by the most productive AI-assisted developers.",
    longDescription: "Claude Code is the most powerful AI coding tool available, but most people only scratch the surface. This course teaches you advanced techniques that 10x your productivity: crafting CLAUDE.md files, managing complex multi-file refactors, automated testing workflows, CI/CD integration, and the mental models that separate novice vibe coders from experts. Includes live coding sessions and real-world case studies.",
    instructor: "Jamie Rodriguez",
    instructorBio: "Jamie is a developer advocate and the creator of several popular open-source projects built with Claude Code. They've been using AI coding tools since the earliest betas and have developed a deep understanding of how to get the most out of them.",
    instructorAvatar: "/images/avatars/jamie.jpg",
    price: 199,
    originalPrice: 399,
    currency: "USD",
    duration: "4 weeks",
    modules: [
      {
        title: "Claude Code Deep Dive",
        lessons: [
          "Architecture: how Claude Code actually works",
          "CLAUDE.md files: your project's instruction manual",
          "Permission modes and safety",
          "Session management and conversation context",
          "Advanced terminal configuration",
        ],
        duration: "2 hours",
      },
      {
        title: "Advanced Prompting",
        lessons: [
          "The anatomy of a great prompt",
          "Multi-step reasoning and planning",
          "Debugging strategies with AI",
          "Code review and refactoring prompts",
          "Working with large codebases",
        ],
        duration: "2.5 hours",
      },
      {
        title: "Multi-File Workflows",
        lessons: [
          "Managing complex feature development",
          "Cross-file refactoring safely",
          "Using subagents for parallel work",
          "Coordinating frontend and backend changes",
          "Case study: Building a feature from scratch",
        ],
        duration: "3 hours",
      },
      {
        title: "Automation & Integration",
        lessons: [
          "Git workflows with Claude Code",
          "Automated testing strategies",
          "CI/CD pipeline integration",
          "Custom hooks and scripts",
          "Building your personal development system",
        ],
        duration: "2.5 hours",
      },
    ],
    level: "intermediate",
    enrolled: 987,
    rating: 4.9,
    reviews: 156,
    tags: ["Claude Code", "Advanced", "Productivity", "Power User"],
    featured: true,
    stripePriceId: "price_placeholder_mastery",
  },
  {
    id: "ship-your-first-app",
    slug: "ship-your-first-app",
    title: "Ship Your First App: Weekend Workshop",
    subtitle: "Build and launch a complete app in one intensive weekend",
    description: "An intensive, hands-on workshop where you'll build and launch a real application in a single weekend. Perfect for doers who learn by building.",
    longDescription: "This isn't a traditional course — it's a weekend sprint. On Saturday, we'll go from zero to a working app. On Sunday, we'll polish, deploy, and launch. You'll walk away with a live, deployed application and the experience of having shipped something real. The workshop includes live Q&A sessions, a private community for participants, and lifetime access to recordings.",
    instructor: "Elena Vasquez",
    instructorBio: "Elena is a former product designer who transitioned to full-stack development using AI tools. She's built 12 successful products and has taught over 2,000 students how to code with AI.",
    instructorAvatar: "/images/avatars/elena.jpg",
    price: 79,
    originalPrice: 149,
    currency: "USD",
    duration: "1 weekend",
    modules: [
      {
        title: "Saturday: Build",
        lessons: [
          "Ideation and planning (30 min)",
          "Setting up the project (30 min)",
          "Building the core features (3 hours)",
          "Adding polish and design (2 hours)",
          "End-of-day review and Q&A",
        ],
        duration: "6 hours",
      },
      {
        title: "Sunday: Ship",
        lessons: [
          "Bug fixes and refinements (1 hour)",
          "Adding auth and database (2 hours)",
          "Deployment and domain setup (1 hour)",
          "Launch checklist and go-live (1 hour)",
          "Celebration and next steps",
        ],
        duration: "5 hours",
      },
    ],
    level: "beginner",
    enrolled: 4231,
    rating: 4.7,
    reviews: 589,
    tags: ["Workshop", "Weekend", "Beginner", "Hands-On"],
    featured: false,
    stripePriceId: "price_placeholder_ship",
  },
];
