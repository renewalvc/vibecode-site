"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronUp, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  showcaseProjects,
  showcaseCategories,
  type ShowcaseProject,
} from "@/data/showcase";

const sorted = [...showcaseProjects].sort((a, b) => b.upvotes - a.upvotes);
const featured = sorted.filter((p) => p.featured);
const rest = sorted.filter((p) => !p.featured);

function UpvoteButton({ project }: { project: ShowcaseProject }) {
  const [count, setCount] = useState(project.upvotes);
  const [voted, setVoted] = useState(false);

  return (
    <button
      onClick={() => {
        setVoted(!voted);
        setCount((c) => (voted ? c - 1 : c + 1));
      }}
      className={cn(
        "flex flex-col items-center gap-0.5 px-3 py-2 rounded-lg border text-xs font-semibold transition-all cursor-pointer shrink-0",
        voted
          ? "border-primary bg-primary/5 text-primary"
          : "border-gray-200 text-gray-500 hover:border-primary hover:text-primary"
      )}
    >
      <ChevronUp className="w-4 h-4" />
      <span>{count}</span>
    </button>
  );
}

function ProjectRow({ project }: { project: ShowcaseProject }) {
  return (
    <div className="flex items-center gap-4 py-5">
      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <Link
            href={`/showcase/${project.id}`}
            className="text-[15px] font-semibold text-gray-900 hover:text-primary transition-colors"
          >
            {project.name}
          </Link>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-primary transition-colors"
          >
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
        <p className="text-sm text-gray-500 mt-0.5 line-clamp-1">
          {project.tagline}
        </p>
        <div className="flex items-center gap-2 mt-2 text-xs text-gray-400">
          {project.builtWith.slice(0, 3).map((tech, i) => (
            <span key={tech}>
              {i > 0 && <span className="mr-2">&middot;</span>}
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Upvote */}
      <UpvoteButton project={project} />
    </div>
  );
}

function FeaturedCard({ project }: { project: ShowcaseProject }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Link
              href={`/showcase/${project.id}`}
              className="text-base font-semibold text-gray-900 hover:text-primary transition-colors"
            >
              {project.name}
            </Link>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <p className="text-sm text-gray-500 line-clamp-2 leading-relaxed">
            {project.tagline}
          </p>
        </div>
        <UpvoteButton project={project} />
      </div>
      <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
        <span className="text-xs text-gray-400">by {project.creator}</span>
        <div className="flex gap-1.5">
          {project.builtWith.slice(0, 2).map((tech) => (
            <span
              key={tech}
              className="text-[11px] text-gray-400 bg-gray-50 px-2 py-0.5 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? rest
      : rest.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero — compact */}
      <div className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-12 sm:py-16 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Discover what people are building with AI
          </h1>
          <p className="mt-2 text-sm text-gray-500 max-w-md mx-auto">
            A curated showcase of the best software created with vibe coding
            tools like Claude Code, Cursor, and Bolt.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6">
        {/* Featured Projects */}
        <section className="py-10 sm:py-14">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-primary mb-6">
            Featured
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.map((project) => (
              <FeaturedCard key={project.id} project={project} />
            ))}
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* All Projects */}
        <section className="py-10 sm:py-14">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-primary">
              All Projects
            </h2>
          </div>

          {/* Category filters */}
          <div className="flex flex-wrap gap-1.5 mb-8">
            {showcaseCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer",
                  activeCategory === cat
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
                )}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Project list */}
          <div className="divide-y divide-gray-100">
            {filtered.length > 0 ? (
              filtered.map((project) => (
                <ProjectRow key={project.id} project={project} />
              ))
            ) : (
              <p className="py-16 text-center text-sm text-gray-400">
                No projects in this category yet.
              </p>
            )}
          </div>
        </section>

        <hr className="border-gray-100" />

        {/* Newsletter — minimal */}
        <section className="py-14 sm:py-20">
          <div className="max-w-sm mx-auto text-center">
            <h3 className="text-base font-semibold text-gray-900">
              Get the weekly roundup
            </h3>
            <p className="text-sm text-gray-500 mt-1 mb-6">
              New projects, podcast episodes, and tutorials every Friday.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="you@example.com"
                className="flex-1 min-w-0 px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white transition-all"
              />
              <button
                type="submit"
                className="px-5 py-2 rounded-full bg-primary text-white text-sm font-semibold hover:bg-primary-hover transition-colors shadow-sm cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
