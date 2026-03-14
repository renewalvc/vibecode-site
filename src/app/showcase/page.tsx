"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { showcaseProjects, showcaseCategories, type ShowcaseProject } from "@/data/showcase";

function ProjectCard({ project }: { project: ShowcaseProject }) {
  const [upvotes, setUpvotes] = useState(project.upvotes);
  const [hasUpvoted, setHasUpvoted] = useState(false);

  function handleUpvote(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    if (hasUpvoted) {
      setUpvotes((prev) => prev - 1);
      setHasUpvoted(false);
    } else {
      setUpvotes((prev) => prev + 1);
      setHasUpvoted(true);
    }
  }

  return (
    <div className="flex items-center gap-4 sm:gap-5 px-4 sm:px-6 py-5 border-b border-border last:border-b-0">
      {/* Project Info */}
      <div className="flex-1 min-w-0">
        <Link
          href={`/showcase/${project.id}`}
          className="text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors"
        >
          {project.name}
        </Link>

        <p className="text-sm text-muted mt-0.5 line-clamp-1">
          {project.tagline}
        </p>

        <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mt-2 text-xs text-muted">
          <span>by {project.creator}</span>
          <span className="text-border">·</span>
          <span>Built with {project.builtWith.join(", ")}</span>
        </div>
      </div>

      {/* Upvote Button */}
      <button
        onClick={handleUpvote}
        className={cn(
          "flex flex-col items-center justify-center shrink-0",
          "w-12 py-2 rounded-lg border transition-all duration-200 cursor-pointer",
          hasUpvoted
            ? "border-primary bg-primary-light text-primary"
            : "border-border bg-white text-muted hover:border-primary hover:text-primary"
        )}
      >
        <ChevronUp className="w-4 h-4" />
        <span className="text-xs font-semibold leading-tight">{upvotes}</span>
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
    <div className="min-h-screen bg-white">
      <section className="max-w-3xl mx-auto px-4 sm:px-6 pt-16 pb-10">
        <h1 className="text-3xl font-bold text-foreground tracking-tight">
          Showcase
        </h1>
        <p className="text-muted mt-2">
          Projects built by the community.{" "}
          <Link href="/submit" className="text-primary hover:underline">
            Submit yours
          </Link>
        </p>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mt-8">
          {showcaseCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-3 py-1.5 rounded-full text-sm transition-colors cursor-pointer",
                activeCategory === category
                  ? "bg-foreground text-white"
                  : "bg-gray-100 text-muted hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 pb-16">
        <div className="border border-border rounded-lg overflow-hidden">
          {sortedProjects.length > 0 ? (
            sortedProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="py-16 text-center">
              <p className="text-muted">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
