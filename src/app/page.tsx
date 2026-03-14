"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronUp, ArrowUpRight, ArrowRight, Headphones } from "lucide-react";
import { cn } from "@/lib/utils";
import { showcaseProjects, type ShowcaseProject } from "@/data/showcase";
import { podcastEpisodes } from "@/data/podcasts";
import { formatDate } from "@/lib/utils";

/* WHY: Deterministic colors so each project always gets the same thumbnail. */
const COLORS = [
  "bg-rose-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-sky-500",
  "bg-violet-500",
  "bg-pink-500",
  "bg-teal-500",
  "bg-orange-500",
];

const sorted = [...showcaseProjects].sort((a, b) => b.upvotes - a.upvotes);
const featured = sorted.filter((p) => p.featured).slice(0, 3);
const trending = sorted.filter((p) => !p.featured).slice(0, 5);
const latestEpisodes = podcastEpisodes.slice(0, 3);

function Upvote({ project }: { project: ShowcaseProject }) {
  const [count, setCount] = useState(project.upvotes);
  const [voted, setVoted] = useState(false);

  return (
    <button
      onClick={() => {
        setVoted(!voted);
        setCount((c) => (voted ? c - 1 : c + 1));
      }}
      className={cn(
        "flex flex-col items-center gap-0.5 w-12 py-2 rounded-lg border text-xs font-bold transition-all cursor-pointer shrink-0",
        voted
          ? "border-primary bg-primary/5 text-primary"
          : "border-gray-200 text-gray-400 hover:border-primary hover:text-primary"
      )}
    >
      <ChevronUp className="w-4 h-4" />
      {count}
    </button>
  );
}

function Thumb({ name, index }: { name: string; index: number }) {
  return (
    <div
      className={cn(
        "w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm",
        COLORS[index % COLORS.length]
      )}
    >
      {name.charAt(0)}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-10 sm:pt-16 sm:pb-12">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Discover what people are building with AI
        </h1>
        <p className="mt-2 text-gray-500 max-w-lg">
          A curated showcase of the best software created with AI coding tools.
        </p>
      </div>

      {/* Featured */}
      <section className="max-w-5xl mx-auto px-6 pb-14">
        <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-5">
          Featured
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {featured.map((project, i) => (
            <Link
              key={project.id}
              href={`/showcase/${project.id}`}
              className="group relative rounded-2xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-md transition-all bg-white"
            >
              <div className="flex items-start gap-3 mb-3">
                <Thumb name={project.name} index={parseInt(project.id) - 1} />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-xs text-gray-400 mt-0.5">
                    by {project.creator}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-500 leading-relaxed line-clamp-2">
                {project.tagline}
              </p>
              <div className="mt-3 flex items-center justify-between">
                <div className="flex gap-1">
                  {project.builtWith.slice(0, 2).map((t) => (
                    <span
                      key={t}
                      className="text-[10px] font-medium text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-400 flex items-center gap-0.5">
                  <ChevronUp className="w-3 h-3" />
                  {project.upvotes}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Trending */}
      <section className="border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-[11px] font-bold uppercase tracking-widest text-gray-400">
              Trending
            </h2>
            <Link
              href="/showcase"
              className="text-xs font-semibold text-primary hover:underline underline-offset-4"
            >
              View all projects &rarr;
            </Link>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 shadow-sm overflow-hidden">
            {trending.map((project, i) => (
              <div
                key={project.id}
                className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors"
              >
                <Thumb
                  name={project.name}
                  index={parseInt(project.id) - 1}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <Link
                      href={`/showcase/${project.id}`}
                      className="text-sm font-semibold text-gray-900 hover:text-primary transition-colors"
                    >
                      {project.name}
                    </Link>
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-300 hover:text-primary transition-colors"
                    >
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    {project.tagline}
                  </p>
                </div>
                <Upvote project={project} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Podcast */}
      <section className="max-w-5xl mx-auto px-6 py-14 sm:py-16">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Headphones className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold text-gray-900">
                The VibeCoded Podcast
              </h2>
              <p className="text-xs text-gray-500">
                Conversations with AI-powered builders
              </p>
            </div>
          </div>
          <Link
            href="/podcast"
            className="text-xs font-semibold text-primary hover:underline underline-offset-4 hidden sm:block"
          >
            All episodes &rarr;
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {latestEpisodes.map((ep) => (
            <Link
              key={ep.id}
              href={`/podcast/${ep.slug}`}
              className="group rounded-xl border border-gray-200 p-5 hover:border-gray-300 hover:shadow-md transition-all bg-white"
            >
              <div className="text-[10px] font-bold uppercase tracking-widest text-primary mb-3">
                Ep. {ep.episodeNumber}
              </div>
              <h3 className="text-sm font-bold text-gray-900 group-hover:text-primary transition-colors leading-snug line-clamp-2">
                {ep.title}
              </h3>
              <p className="text-xs text-gray-500 mt-2">
                {ep.guest}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {formatDate(ep.date)} &middot; {ep.duration} min
              </p>
            </Link>
          ))}
        </div>
        <Link
          href="/podcast"
          className="mt-4 text-xs font-semibold text-primary hover:underline underline-offset-4 sm:hidden block"
        >
          All episodes &rarr;
        </Link>
      </section>

      {/* Newsletter */}
      <section className="border-t border-gray-100 bg-gray-50/50">
        <div className="max-w-5xl mx-auto px-6 py-14">
          <div className="max-w-sm mx-auto text-center">
            <h3 className="text-base font-bold text-gray-900">
              Get the weekly roundup
            </h3>
            <p className="text-xs text-gray-500 mt-1 mb-5">
              New projects, podcast episodes, and tutorials every Friday.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 min-w-0 px-3.5 py-2 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white transition-all"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
