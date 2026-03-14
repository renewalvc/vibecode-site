import Link from "next/link";
import type { Metadata } from "next";
import { podcastEpisodes } from "@/data/podcasts";
import { formatDate, formatDuration } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { Play, Clock, Calendar, Headphones, Mic } from "lucide-react";

export const metadata: Metadata = {
  title: "Podcast — VibeCoded",
  description:
    "Weekly conversations with builders who are creating amazing software with AI tools. Available on all major platforms.",
};

export default function PodcastPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero / Header */}
      <section className="relative overflow-hidden border-b border-border bg-surface">
        {/* Subtle gradient accent at top */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-transparent to-transparent opacity-60" />

        <div className="relative mx-auto max-w-4xl px-6 py-20 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary-light px-4 py-1.5 text-sm font-semibold text-primary">
            <Mic className="h-4 w-4" />
            Podcast
          </div>

          <h1 className="text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            The VibeCoded Podcast
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted">
            Weekly conversations with builders who are creating amazing software
            with AI tools. Available on all major platforms.
          </p>

          {/* Platform badges */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <PlatformBadge name="Apple Podcasts" />
            <PlatformBadge name="Spotify" />
            <PlatformBadge name="YouTube" />
          </div>
        </div>
      </section>

      {/* Episode List */}
      <section className="mx-auto max-w-4xl px-6 py-16">
        <div className="mb-10 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">
              All Episodes
            </h2>
            <p className="mt-1 text-sm text-muted">
              {podcastEpisodes.length} episodes
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <Headphones className="h-4 w-4" />
            Latest first
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {podcastEpisodes.map((episode) => (
            <EpisodeCard key={episode.id} episode={episode} />
          ))}
        </div>
      </section>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Episode Card                                                       */
/* ------------------------------------------------------------------ */

interface EpisodeCardProps {
  episode: (typeof podcastEpisodes)[number];
}

function EpisodeCard({ episode }: EpisodeCardProps) {
  return (
    <Card hover padding="none" className="group">
      <div className="flex items-start gap-5 p-6">
        {/* Play button */}
        <button
          aria-label={`Play episode ${episode.episodeNumber}`}
          className="mt-1 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-white shadow-sm transition-all duration-200 hover:bg-primary-hover hover:shadow-md group-hover:scale-105"
        >
          <Play className="h-5 w-5 translate-x-0.5" />
        </button>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Top row: episode number + meta */}
          <div className="mb-2 flex flex-wrap items-center gap-3 text-sm text-muted">
            <Badge variant="primary">Ep. {episode.episodeNumber}</Badge>
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
          <Link
            href={`/podcast/${episode.slug}`}
            className="block text-lg font-semibold leading-snug text-foreground transition-colors hover:text-primary"
          >
            {episode.title}
          </Link>

          {/* Guest */}
          <p className="mt-1 text-sm font-medium text-primary">
            {episode.guest}
            <span className="font-normal text-muted">
              {" "}
              &middot; {episode.guestTitle}
            </span>
          </p>

          {/* Description */}
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted">
            {episode.description}
          </p>

          {/* Topics */}
          <div className="mt-3 flex flex-wrap gap-2">
            {episode.topics.map((topic) => (
              <Badge key={topic} variant="outline">
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}

/* ------------------------------------------------------------------ */
/*  Platform Badge                                                     */
/* ------------------------------------------------------------------ */

function PlatformBadge({ name }: { name: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:border-primary/30 hover:bg-primary-light">
      <Headphones className="h-4 w-4 text-primary" />
      {name}
    </span>
  );
}
