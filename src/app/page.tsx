import Link from "next/link";
import Button from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { podcastEpisodes } from "@/data/podcasts";
import { showcaseProjects } from "@/data/showcase";
import { guides } from "@/data/guides";
import { courses } from "@/data/courses";
import { ArrowRight, Headphones, Layers, BookOpen, GraduationCap } from "lucide-react";

const latestEpisode = podcastEpisodes[0];
const featuredProjects = showcaseProjects.filter((p) => p.featured).slice(0, 3);
const topGuides = guides.slice(0, 3);
const featuredCourses = courses.filter((c) => c.featured).slice(0, 2);

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-24 md:py-32 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.08] max-w-3xl mx-auto">
            The best software{" "}
            <span className="text-primary">built with AI</span>
          </h1>
          <p className="mt-6 text-lg text-muted max-w-xl mx-auto leading-relaxed">
            A showcase, podcast, and learning community for people building real
            software with AI tools.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/showcase">
              <Button size="lg">
                Explore Showcase
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/podcast">
              <Button variant="outline" size="lg">
                Listen to Podcast
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What VibeCoded offers — icon cards */}
      <section className="bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20 md:py-24">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard
              icon={<Layers className="w-5 h-5" />}
              title="Showcase"
              description="Discover projects built by the vibe coding community."
              href="/showcase"
            />
            <FeatureCard
              icon={<Headphones className="w-5 h-5" />}
              title="Podcast"
              description="Weekly conversations with AI-powered builders."
              href="/podcast"
            />
            <FeatureCard
              icon={<BookOpen className="w-5 h-5" />}
              title="Guides & Tutorials"
              description="Learn to set up tools and start building."
              href="/guides"
            />
            <FeatureCard
              icon={<GraduationCap className="w-5 h-5" />}
              title="Academy"
              description="Structured courses from beginner to advanced."
              href="/academy"
            />
          </div>
        </div>
      </section>

      {/* Latest Podcast Episode */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20 md:py-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-foreground">Latest Episode</h2>
            <Link
              href="/podcast"
              className="text-sm text-primary font-medium hover:underline underline-offset-4 hidden sm:block"
            >
              All episodes &rarr;
            </Link>
          </div>
          <div className="bg-surface rounded-2xl border border-border overflow-hidden">
            <div className="flex flex-col md:flex-row">
              {/* Artwork placeholder */}
              <div className="w-full md:w-80 h-48 md:h-auto bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center shrink-0">
                <div className="text-center">
                  <p className="text-xs font-semibold text-primary uppercase tracking-widest">
                    Episode {latestEpisode.episodeNumber}
                  </p>
                  <Headphones className="w-10 h-10 text-primary/40 mx-auto mt-3" />
                </div>
              </div>
              {/* Details */}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <p className="text-sm text-muted mb-2">
                  {formatDate(latestEpisode.date)} &middot;{" "}
                  {latestEpisode.duration} min
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-foreground leading-snug">
                  {latestEpisode.title}
                </h3>
                <p className="mt-2 text-sm text-primary font-medium">
                  {latestEpisode.guest} — {latestEpisode.guestTitle}
                </p>
                <p className="mt-4 text-muted text-sm leading-relaxed line-clamp-3 max-w-xl">
                  {latestEpisode.description}
                </p>
                <div className="mt-6">
                  <Link href={`/podcast/${latestEpisode.slug}`}>
                    <Button size="sm">
                      Listen to Episode
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <Link
            href="/podcast"
            className="mt-6 text-sm text-primary font-medium hover:underline underline-offset-4 sm:hidden block"
          >
            All episodes &rarr;
          </Link>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20 md:py-24">
          <div className="flex items-center justify-between mb-10">
            <h2 className="text-2xl font-bold text-foreground">
              Featured Projects
            </h2>
            <Link
              href="/showcase"
              className="text-sm text-primary font-medium hover:underline underline-offset-4 hidden sm:block"
            >
              View all &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/showcase/${project.id}`}
                className="group bg-white rounded-xl border border-border p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {project.name}
                </h3>
                <p className="mt-2 text-sm text-muted line-clamp-2">
                  {project.tagline}
                </p>
                <p className="mt-4 text-xs text-muted">
                  by {project.creator} &middot;{" "}
                  {project.builtWith.slice(0, 2).join(", ")}
                </p>
              </Link>
            ))}
          </div>
          <Link
            href="/showcase"
            className="mt-6 text-sm text-primary font-medium hover:underline underline-offset-4 sm:hidden block"
          >
            View all projects &rarr;
          </Link>
        </div>
      </section>

      {/* Getting Started Guides */}
      <section className="border-b border-border">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20 md:py-24">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                Getting Started
              </h2>
              <p className="mt-2 text-sm text-muted">
                Set up your tools and start building.
              </p>
            </div>
            <Link
              href="/guides"
              className="text-sm text-primary font-medium hover:underline underline-offset-4 hidden sm:block"
            >
              All guides &rarr;
            </Link>
          </div>
          <div className="space-y-0 divide-y divide-border rounded-xl border border-border bg-white overflow-hidden">
            {topGuides.map((guide) => (
              <Link
                key={guide.id}
                href={`/guides/${guide.slug}`}
                className="flex items-center justify-between p-5 hover:bg-surface transition-colors group"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="text-base font-medium text-foreground group-hover:text-primary transition-colors">
                    {guide.title}
                  </h3>
                  <p className="mt-1 text-sm text-muted truncate max-w-lg">
                    {guide.description}
                  </p>
                </div>
                <div className="ml-4 flex items-center gap-3 shrink-0">
                  <span className="text-xs text-muted hidden sm:block">
                    {guide.estimatedTime}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Academy Preview */}
      <section className="bg-surface border-b border-border">
        <div className="max-w-6xl mx-auto px-6 sm:px-8 py-20 md:py-24">
          <div className="flex items-center justify-between mb-10">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Academy</h2>
              <p className="mt-2 text-sm text-muted">
                Structured courses for learning to build with AI.
              </p>
            </div>
            <Link
              href="/academy"
              className="text-sm text-primary font-medium hover:underline underline-offset-4 hidden sm:block"
            >
              All courses &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredCourses.map((course) => (
              <Link
                key={course.id}
                href={`/academy/${course.slug}`}
                className="group bg-white rounded-xl border border-border p-6 sm:p-8 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="flex items-center gap-3 text-xs text-muted mb-4">
                  <span className="capitalize">{course.level}</span>
                  <span>&middot;</span>
                  <span>{course.duration}</span>
                  <span>&middot;</span>
                  <span>{course.modules.length} modules</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                  {course.title}
                </h3>
                <p className="mt-1 text-sm text-muted">{course.subtitle}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-muted">
                    by {course.instructor}
                  </p>
                  <p className="text-base font-semibold text-foreground">
                    ${course.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section>
        <div className="max-w-lg mx-auto px-6 sm:px-8 py-20 md:py-24 text-center">
          <h2 className="text-2xl font-bold text-foreground">Stay up to date</h2>
          <p className="mt-3 text-sm text-muted">
            A weekly newsletter with the best projects, episodes, and tutorials.
          </p>
          <div className="mt-8 flex gap-3">
            <input
              type="email"
              placeholder="you@example.com"
              className="flex-1 px-4 py-2.5 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
            />
            <Button size="md">Subscribe</Button>
          </div>
          <p className="mt-4 text-xs text-muted">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  href,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group bg-white rounded-xl border border-border p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
    >
      <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-foreground group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="mt-2 text-sm text-muted leading-relaxed">{description}</p>
    </Link>
  );
}
