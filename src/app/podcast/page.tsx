import Link from "next/link";
import type { Metadata } from "next";
import { podcastEpisodes } from "@/data/podcasts";
import { formatDate, formatDuration } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Podcast — VibeCoded",
  description:
    "Weekly conversations with builders creating software with AI tools.",
};

export default function PodcastPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-16">
          <h1 className="text-3xl font-bold text-foreground">Podcast</h1>
          <p className="text-muted mt-2">
            Weekly conversations with builders creating software with AI tools.
          </p>
        </div>
      </div>

      {/* Episode List */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-10">
        <p className="text-sm text-muted mb-6">
          {podcastEpisodes.length} episodes
        </p>

        <div className="rounded-xl border border-border bg-white overflow-hidden shadow-sm divide-y divide-border">
          {podcastEpisodes.map((episode) => (
            <Link
              key={episode.id}
              href={`/podcast/${episode.slug}`}
              className="block p-6 hover:bg-surface/50 transition-colors group"
            >
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted mb-2">
                <span className="font-medium">
                  Ep. {episode.episodeNumber}
                </span>
                <span className="text-border">&middot;</span>
                <span>{formatDate(episode.date)}</span>
                <span className="text-border">&middot;</span>
                <span>{formatDuration(episode.duration)}</span>
              </div>

              <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {episode.title}
              </h2>

              <p className="text-sm text-primary mt-1">
                {episode.guest}
                <span className="text-muted font-normal">
                  {" "}
                  &middot; {episode.guestTitle}
                </span>
              </p>

              <p className="text-sm text-muted mt-3 line-clamp-2 leading-relaxed max-w-2xl">
                {episode.description}
              </p>

              {episode.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {episode.topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-xs text-muted bg-surface px-2 py-0.5 rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          ))}
        </div>

        <div className="mt-8 text-sm text-muted">
          Also available on{" "}
          <a
            href="#"
            className="text-foreground hover:text-primary underline underline-offset-2"
          >
            Apple Podcasts
          </a>
          ,{" "}
          <a
            href="#"
            className="text-foreground hover:text-primary underline underline-offset-2"
          >
            Spotify
          </a>
          , and{" "}
          <a
            href="#"
            className="text-foreground hover:text-primary underline underline-offset-2"
          >
            YouTube
          </a>
          .
        </div>
      </div>
    </div>
  );
}
