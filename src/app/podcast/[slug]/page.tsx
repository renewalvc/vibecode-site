import Link from "next/link";
import type { Metadata } from "next";
import { podcastEpisodes } from "@/data/podcasts";
import { formatDate, formatDuration } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import {
  ArrowLeft,
  Play,
  Clock,
  Calendar,
  Headphones,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Mic,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Static params                                                      */
/* ------------------------------------------------------------------ */

export function generateStaticParams() {
  return podcastEpisodes.map((ep) => ({ slug: ep.slug }));
}

/* ------------------------------------------------------------------ */
/*  Dynamic metadata                                                   */
/* ------------------------------------------------------------------ */

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const episode = podcastEpisodes.find((ep) => ep.slug === slug);

  if (!episode) {
    return { title: "Episode Not Found — VibeCoded" };
  }

  return {
    title: `${episode.title} — VibeCoded Podcast`,
    description: episode.description,
  };
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function EpisodeDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const episodeIndex = podcastEpisodes.findIndex((ep) => ep.slug === slug);
  const episode = podcastEpisodes[episodeIndex];

  if (!episode) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
        <h1 className="text-2xl font-bold text-foreground">
          Episode not found
        </h1>
        <p className="mt-2 text-muted">
          The episode you&apos;re looking for doesn&apos;t exist.
        </p>
        <Link
          href="/podcast"
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to all episodes
        </Link>
      </div>
    );
  }

  /* Episodes are ordered newest-first, so "previous" has a higher index */
  const prevEpisode = podcastEpisodes[episodeIndex + 1] ?? null;
  const nextEpisode = episodeIndex > 0 ? podcastEpisodes[episodeIndex - 1] : null;

  return (
    <div className="min-h-screen bg-background">
      {/* ------------------------------------------------------------ */}
      {/*  Header                                                       */}
      {/* ------------------------------------------------------------ */}
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-transparent to-transparent opacity-60" />

        <div className="relative mx-auto max-w-4xl px-6 pb-16 pt-10">
          {/* Back link */}
          <Link
            href="/podcast"
            className="mb-8 inline-flex items-center gap-1.5 text-sm font-medium text-muted transition-colors hover:text-primary"
          >
            <ArrowLeft className="h-4 w-4" />
            All Episodes
          </Link>

          {/* Episode number + meta */}
          <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-muted">
            <Badge variant="primary">Episode {episode.episodeNumber}</Badge>
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(episode.date)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock className="h-3.5 w-3.5" />
              {formatDuration(episode.duration)}
            </span>
          </div>

          {/* Title */}
          <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {episode.title}
          </h1>

          {/* Description (short) */}
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">
            {episode.description}
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------ */}
      {/*  Body                                                         */}
      {/* ------------------------------------------------------------ */}
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-[1fr_280px]">
          {/* Main column */}
          <div className="space-y-10">
            {/* Guest info */}
            <Card hover={false} padding="md">
              <div className="flex items-center gap-4">
                {/* Avatar placeholder */}
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-purple-500 text-xl font-bold text-white shadow-sm">
                  {episode.guest
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="text-lg font-semibold text-foreground">
                    {episode.guest}
                  </p>
                  <p className="text-sm text-muted">{episode.guestTitle}</p>
                </div>
              </div>
            </Card>

            {/* Audio player placeholder */}
            <Card hover={false} padding="none" className="overflow-hidden">
              <div className="bg-gradient-to-r from-primary/5 to-purple-500/5 p-6">
                <div className="flex items-center gap-4">
                  {/* Play button */}
                  <button
                    aria-label="Play episode"
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-md transition-all duration-200 hover:bg-primary-hover hover:shadow-lg"
                  >
                    <Play className="h-6 w-6 translate-x-0.5" />
                  </button>

                  {/* Progress + time */}
                  <div className="min-w-0 flex-1">
                    <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted">
                      <span>0:00</span>
                      <span>{formatDuration(episode.duration)}</span>
                    </div>
                    {/* Progress bar */}
                    <div className="h-2 w-full overflow-hidden rounded-full bg-border">
                      <div className="h-full w-0 rounded-full bg-primary transition-all" />
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground">
                    {episode.title}
                  </p>
                  <div className="flex items-center gap-1 text-xs text-muted">
                    <Headphones className="h-3.5 w-3.5" />
                    Listen
                  </div>
                </div>
              </div>
            </Card>

            {/* Video embed placeholder */}
            <div>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                Watch the Episode
              </h2>
              <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-border bg-gradient-to-br from-slate-900 via-indigo-950 to-purple-950 shadow-sm">
                {/* Play overlay */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 backdrop-blur-sm transition-transform hover:scale-110">
                    <Play className="h-8 w-8 translate-x-0.5 text-white" />
                  </div>
                  <span className="text-sm font-medium text-white/70">
                    Video coming soon
                  </span>
                </div>
              </div>
            </div>

            {/* Long description */}
            <div>
              <h2 className="mb-4 text-lg font-semibold text-foreground">
                About This Episode
              </h2>
              <div className="prose prose-slate max-w-none">
                <p className="whitespace-pre-line text-base leading-relaxed text-muted">
                  {episode.longDescription}
                </p>
              </div>
            </div>

            {/* Topics */}
            <div>
              <h2 className="mb-3 text-lg font-semibold text-foreground">
                Topics Covered
              </h2>
              <div className="flex flex-wrap gap-2">
                {episode.topics.map((topic) => (
                  <Badge key={topic} variant="primary">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Listen on */}
            <Card hover={false} padding="md">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-foreground">
                <Mic className="h-4 w-4 text-primary" />
                Listen On
              </h3>
              <div className="flex flex-col gap-2">
                <PlatformLink name="Apple Podcasts" />
                <PlatformLink name="Spotify" />
                <PlatformLink name="YouTube" />
              </div>
            </Card>

            {/* Episode details */}
            <Card hover={false} padding="md">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground">
                Details
              </h3>
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-muted">Episode</dt>
                  <dd className="font-medium text-foreground">
                    #{episode.episodeNumber}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Published</dt>
                  <dd className="font-medium text-foreground">
                    {formatDate(episode.date)}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Duration</dt>
                  <dd className="font-medium text-foreground">
                    {formatDuration(episode.duration)}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted">Guest</dt>
                  <dd className="font-medium text-foreground">
                    {episode.guest}
                  </dd>
                </div>
              </dl>
            </Card>
          </aside>
        </div>

        {/* ---------------------------------------------------------- */}
        {/*  Prev / Next Navigation                                     */}
        {/* ---------------------------------------------------------- */}
        <nav className="mt-16 grid gap-4 border-t border-border pt-10 sm:grid-cols-2">
          {prevEpisode ? (
            <Link
              href={`/podcast/${prevEpisode.slug}`}
              className="group flex items-start gap-3 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md"
            >
              <ChevronLeft className="mt-0.5 h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-primary" />
              <div className="min-w-0">
                <span className="text-xs font-medium uppercase tracking-wide text-muted">
                  Previous Episode
                </span>
                <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                  {prevEpisode.title}
                </p>
              </div>
            </Link>
          ) : (
            /* Empty spacer so "Next" aligns right */
            <div />
          )}

          {nextEpisode ? (
            <Link
              href={`/podcast/${nextEpisode.slug}`}
              className="group flex items-start justify-end gap-3 rounded-xl border border-border bg-card p-5 text-right transition-all hover:border-primary/30 hover:shadow-md"
            >
              <div className="min-w-0">
                <span className="text-xs font-medium uppercase tracking-wide text-muted">
                  Next Episode
                </span>
                <p className="mt-1 line-clamp-2 text-sm font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                  {nextEpisode.title}
                </p>
              </div>
              <ChevronRight className="mt-0.5 h-5 w-5 shrink-0 text-muted transition-colors group-hover:text-primary" />
            </Link>
          ) : (
            <div />
          )}
        </nav>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Platform Link                                                      */
/* ------------------------------------------------------------------ */

function PlatformLink({ name }: { name: string }) {
  return (
    <a
      href="#"
      className="flex items-center justify-between rounded-lg border border-border px-3 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-primary/30 hover:bg-primary-light hover:text-primary"
    >
      <span className="flex items-center gap-2">
        <Headphones className="h-4 w-4 text-primary" />
        {name}
      </span>
      <ExternalLink className="h-3.5 w-3.5 text-muted" />
    </a>
  );
}
