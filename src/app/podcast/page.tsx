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
    <div className="min-h-screen bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Podcast
        </h1>
        <p className="text-muted mt-2">
          Conversations with builders creating software with AI tools.
        </p>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <div className="divide-y divide-border">
          {podcastEpisodes.map((episode) => (
            <div key={episode.id} className="py-8 first:pt-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted mb-2">
                <span>Ep. {episode.episodeNumber}</span>
                <span className="text-border">·</span>
                <span>{formatDate(episode.date)}</span>
                <span className="text-border">·</span>
                <span>{formatDuration(episode.duration)}</span>
              </div>

              <Link
                href={`/podcast/${episode.slug}`}
                className="text-lg font-semibold text-foreground hover:text-primary transition-colors"
              >
                {episode.title}
              </Link>

              <p className="text-sm text-primary mt-1">
                {episode.guest}
                <span className="text-muted font-normal">
                  {" "}&middot; {episode.guestTitle}
                </span>
              </p>

              <p className="text-sm text-muted mt-2 line-clamp-2 leading-relaxed">
                {episode.description}
              </p>

              {episode.topics.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-3">
                  {episode.topics.map((topic) => (
                    <span
                      key={topic}
                      className="text-xs text-muted bg-gray-100 px-2 py-0.5 rounded-full"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-8 mt-4 text-sm text-muted">
          Also available on{" "}
          <a href="#" className="text-foreground hover:text-primary underline">Apple Podcasts</a>,{" "}
          <a href="#" className="text-foreground hover:text-primary underline">Spotify</a>, and{" "}
          <a href="#" className="text-foreground hover:text-primary underline">YouTube</a>.
        </div>
      </section>
    </div>
  );
}
