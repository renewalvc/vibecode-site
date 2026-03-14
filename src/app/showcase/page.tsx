"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  showcaseProjects,
  showcaseCategories,
  type ShowcaseProject,
} from "@/data/showcase";

function ProjectCard({ project }: { project: ShowcaseProject }) {
  const [upvotes, setUpvotes] = useState(project.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  function handleUpvote(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    setHasUpvoted(!hasUpvoted);
    setUpvotes((prev) => (hasUpvoted ? prev - 1 : prev + 1));
  }

  return (
    <div className="group flex items-center gap-5 px-6 py-5 hover:bg-surface/50 transition-colors border-b border-border last:border-b-0">
      <div className="flex-1 min-w-0">
        <Link
          href={`/showcase/${project.id}`}
          className="text-base font-semibold text-foreground hover:text-primary transition-colors"
        >
          {project.name}
        </Link>
        <p className="text-sm text-muted mt-0.5 line-clamp-1">
          {project.tagline}
        </p>
        <p className="text-xs text-muted mt-2">
          by {project.creator} &middot;{" "}
          {project.builtWith.slice(0, 3).join(", ")}
        </p>
      </div>

      <button
        onClick={handleUpvote}
        className={cn(
          "flex flex-col items-center justify-center shrink-0",
          "w-14 py-2 rounded-lg border transition-all duration-200 cursor-pointer",
          hasUpvoted
            ? "border-primary bg-primary/5 text-primary"
            : "border-border bg-white text-muted hover:border-primary hover:text-primary"
        )}
      >
        <ChevronUp className="w-4 h-4" />
        <span className="text-xs font-semibold">{upvotes}</span>
      </button>
    </div>
  );
}

export default function ShowcasePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? showcaseProjects
      : showcaseProjects.filter((p) => p.category === activeCategory);

  const sortedProjects = [...filteredProjects].sort(
    (a, b) => b.upvotes - a.upvotes
  );

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-4xl mx-auto px-6 sm:px-8 py-16">
          <h1 className="text-3xl font-bold text-foreground">Showcase</h1>
          <p className="text-muted mt-2">
            Projects built by the vibe coding community.{" "}
            <Link href="#" className="text-primary hover:underline">
              Submit yours &rarr;
            </Link>
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 sm:px-8 py-10">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {showcaseCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-3.5 py-1.5 rounded-full text-sm font-medium transition-all cursor-pointer",
                activeCategory === category
                  ? "bg-foreground text-white"
                  : "bg-surface text-muted hover:text-foreground border border-border"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project List */}
        <div className="rounded-xl border border-border bg-white overflow-hidden shadow-sm">
          {sortedProjects.length > 0 ? (
            sortedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="py-20 text-center">
              <p className="text-muted">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
