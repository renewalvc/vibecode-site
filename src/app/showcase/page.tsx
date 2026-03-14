"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { ChevronUp, ArrowUpRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  showcaseProjects,
  showcaseCategories,
  type ShowcaseProject,
} from "@/data/showcase";

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

export default function ShowcasePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    let projects = [...showcaseProjects];

    // Category filter
    if (activeCategory !== "All") {
      projects = projects.filter((p) => p.category === activeCategory);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      projects = projects.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q) ||
          p.creator.toLowerCase().includes(q) ||
          p.builtWith.some((t) => t.toLowerCase().includes(q)) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
      );
    }

    // Sort by upvotes
    return projects.sort((a, b) => b.upvotes - a.upvotes);
  }, [activeCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-6 pt-12 pb-8 sm:pt-16">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
          Showcase
        </h1>
        <p className="mt-2 text-gray-500">
          Every project here was built with AI coding tools.{" "}
          <Link href="#" className="text-primary hover:underline">
            Submit yours
          </Link>
        </p>

        {/* Search */}
        <div className="mt-6 relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search projects, creators, tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 text-sm text-gray-900 placeholder:text-gray-400 bg-white focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all"
          />
        </div>

        {/* Category Filters */}
        <div className="mt-4 flex flex-wrap gap-1.5">
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
      </div>

      {/* Project List */}
      <div className="max-w-5xl mx-auto px-6 pb-16">
        <p className="text-xs text-gray-400 mb-4">
          {filtered.length} project{filtered.length !== 1 ? "s" : ""}
        </p>

        {filtered.length > 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 divide-y divide-gray-100 shadow-sm overflow-hidden">
            {filtered.map((project) => (
              <div
                key={project.id}
                className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50/50 transition-colors"
              >
                {/* Thumbnail */}
                <div
                  className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold shrink-0 shadow-sm",
                    COLORS[(parseInt(project.id) - 1) % COLORS.length]
                  )}
                >
                  {project.name.charAt(0)}
                </div>

                {/* Info */}
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
                  <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">
                    {project.tagline}
                  </p>
                  <div className="flex items-center gap-2 mt-1.5 text-[11px] text-gray-400">
                    <span>by {project.creator}</span>
                    <span>&middot;</span>
                    <span>{project.builtWith.slice(0, 2).join(", ")}</span>
                    <span className="hidden sm:inline">&middot;</span>
                    <span className="hidden sm:inline px-1.5 py-0.5 rounded bg-gray-100 text-gray-500 font-medium">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Upvote */}
                <Upvote project={project} />
              </div>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center rounded-xl border border-gray-200 bg-gray-50/50">
            <p className="text-sm text-gray-500">No projects found.</p>
            <p className="text-xs text-gray-400 mt-1">
              Try a different search or category.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
