import Link from "next/link";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { formatDate } from "@/lib/utils";
import { podcastEpisodes } from "@/data/podcasts";
import { showcaseProjects } from "@/data/showcase";
import { guides } from "@/data/guides";
import { learnContent } from "@/data/learn";

const latestEpisode = podcastEpisodes[0];
const featuredProject = showcaseProjects.find((p) => p.featured) ?? showcaseProjects[0];
const latestGuide = guides[0];

export default function Home() {
  return (
    <div>
      {/* ========== HERO ========== */}
      <section className="bg-white pt-24 pb-20 md:pt-32 md:pb-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-foreground leading-[1.1]">
            The best software built with AI
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-muted leading-relaxed max-w-2xl">
            VibeCoded is a showcase, podcast, and learning community for people
            building real software with AI tools.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 sm:gap-8 text-base">
            <Link
              href="/showcase"
              className="text-primary font-medium hover:underline underline-offset-4"
            >
              Explore the showcase &rarr;
            </Link>
            <Link
              href="/podcast"
              className="text-primary font-medium hover:underline underline-offset-4"
            >
              Listen to the podcast &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* ========== CONTENT GRID ========== */}
      <section className="bg-white pb-20 md:pb-28">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Latest podcast episode (spans 2 rows on desktop) */}
            <div className="lg:row-span-2 border border-border rounded-xl p-6 sm:p-8 flex flex-col">
              <p className="text-sm text-muted uppercase tracking-wide font-medium">
                Episode {latestEpisode.episodeNumber}
              </p>
              <h3 className="mt-3 text-xl sm:text-2xl font-semibold text-foreground leading-snug">
                {latestEpisode.title}
              </h3>
              <p className="mt-3 text-sm text-primary font-medium">
                {latestEpisode.guest} &mdash; {latestEpisode.guestTitle}
              </p>
              <p className="mt-4 text-muted text-sm leading-relaxed flex-1">
                {latestEpisode.description}
              </p>
              <Link
                href={`/podcast/${latestEpisode.slug}`}
                className="mt-6 text-sm text-primary font-medium hover:underline underline-offset-4 self-start"
              >
                Listen &rarr;
              </Link>
            </div>

            {/* Top-right: Featured showcase project */}
            <div className="border border-border rounded-xl p-6 sm:p-8 flex flex-col">
              <p className="text-sm text-muted uppercase tracking-wide font-medium">
                Featured project
              </p>
              <h3 className="mt-3 text-lg font-semibold text-foreground">
                {featuredProject.name}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {featuredProject.tagline}
              </p>
              <p className="mt-3 text-sm text-muted">
                by {featuredProject.creator}
              </p>
              <Link
                href="/showcase"
                className="mt-4 text-sm text-primary font-medium hover:underline underline-offset-4 self-start"
              >
                View project &rarr;
              </Link>
            </div>

            {/* Bottom-right: Latest guide */}
            <div className="border border-border rounded-xl p-6 sm:p-8 flex flex-col">
              <p className="text-sm text-muted uppercase tracking-wide font-medium">
                Latest guide
              </p>
              <h3 className="mt-3 text-lg font-semibold text-foreground">
                {latestGuide.title}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {latestGuide.description}
              </p>
              <Link
                href={`/guides/${latestGuide.slug}`}
                className="mt-4 text-sm text-primary font-medium hover:underline underline-offset-4 self-start"
              >
                Read &rarr;
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== WHAT IS VIBECODED? ========== */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-[650px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
            A new kind of software community
          </h2>
          <div className="mt-6 space-y-4 text-muted leading-relaxed">
            <p>
              AI tools like Claude Code, Cursor, and Bolt are making it possible
              for anyone to build real software. Designers, founders,
              hobbyists, and developers are all shipping products that would
              have taken teams of engineers just a few years ago.
            </p>
            <p>
              VibeCoded exists to showcase what this new generation of builders
              is creating. Through our podcast, we talk to the people behind the
              projects. Through our showcase, we highlight the most interesting
              work. And through our guides and courses, we help more people get
              started.
            </p>
            <p>
              This is still early. The tools are changing fast, the community is
              growing, and nobody has all the answers yet. That is what makes it
              interesting.
            </p>
          </div>
          <Link
            href="/learn/what-is-vibe-coding"
            className="inline-block mt-6 text-sm text-primary font-medium hover:underline underline-offset-4"
          >
            Learn more about vibe coding &rarr;
          </Link>
        </div>
      </section>

      {/* ========== NEWSLETTER ========== */}
      <section className="bg-surface py-16 md:py-20">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold text-foreground tracking-tight">
            Stay up to date
          </h2>
          <p className="mt-3 text-sm text-muted leading-relaxed">
            A weekly newsletter with the best projects, episodes, and tutorials.
          </p>
          <div className="mt-6 flex gap-3">
            <Input
              type="email"
              placeholder="you@example.com"
              className="flex-1"
            />
            <Button variant="primary" size="md">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
