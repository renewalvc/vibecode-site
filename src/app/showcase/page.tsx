"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronUp, Sparkles, Trophy, Calendar, ArrowUpRight } from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import { cn, formatDate } from "@/lib/utils";
import { showcaseProjects, showcaseCategories, type ShowcaseProject } from "@/data/showcase";

// WHY: Deterministic gradient palette so each project gets a consistent thumbnail color
// without needing actual image assets.
const GRADIENTS = [
  "from-indigo-500 to-purple-600",
  "from-emerald-500 to-teal-600",
  "from-orange-500 to-rose-600",
  "from-cyan-500 to-blue-600",
  "from-pink-500 to-fuchsia-600",
  "from-amber-500 to-orange-600",
  "from-violet-500 to-indigo-600",
  "from-lime-500 to-emerald-600",
];

function getGradient(index: number): string {
  return GRADIENTS[index % GRADIENTS.length];
}

function ProjectCard({
  project,
  index,
  rank,
}: {
  project: ShowcaseProject;
  index: number;
  rank: number;
}) {
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
    <div
      className={cn(
        "group flex items-center gap-4 sm:gap-5 px-4 sm:px-6 py-5 transition-all duration-200 hover:bg-surface rounded-lg",
        "border-b border-border last:border-b-0"
      )}
    >
      {/* Rank Number */}
      <span className="hidden sm:flex items-center justify-center w-6 text-sm font-medium text-muted shrink-0">
        {rank}
      </span>

      {/* Gradient Thumbnail */}
      <Link href={`/showcase/${project.id}`} className="shrink-0">
        <div
          className={cn(
            "w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br shadow-sm",
            "flex items-center justify-center text-white font-bold text-lg sm:text-xl",
            "transition-transform duration-200 group-hover:scale-105",
            getGradient(index)
          )}
        >
          {project.name.charAt(0)}
        </div>
      </Link>

      {/* Project Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Link
            href={`/showcase/${project.id}`}
            className="text-base sm:text-lg font-semibold text-foreground hover:text-primary transition-colors truncate"
          >
            {project.name}
          </Link>
          {project.featured && (
            <Trophy className="w-4 h-4 text-amber-500 shrink-0" />
          )}
        </div>

        <p className="text-sm text-muted mb-2 line-clamp-1">
          {project.tagline}
        </p>

        <div className="flex flex-wrap items-center gap-2">
          {/* Built With - show first 2 on mobile, 3 on desktop */}
          <div className="flex items-center gap-1.5">
            {project.builtWith.slice(0, 3).map((tech) => (
              <Badge key={tech} variant="outline" className="text-[11px] hidden sm:inline-flex">
                {tech}
              </Badge>
            ))}
            {project.builtWith.slice(0, 2).map((tech) => (
              <Badge key={`mobile-${tech}`} variant="outline" className="text-[11px] sm:hidden">
                {tech}
              </Badge>
            ))}
          </div>

          <span className="hidden sm:inline text-border">|</span>

          <Badge variant="primary" className="text-[11px]">
            {project.category}
          </Badge>

          <span className="hidden sm:inline text-border">|</span>

          <span className="hidden sm:inline text-xs text-muted">
            by {project.creator}
          </span>
        </div>
      </div>

      {/* Upvote Button — Product Hunt style: bordered, vertically stacked icon + count */}
      <button
        onClick={handleUpvote}
        className={cn(
          "flex flex-col items-center justify-center shrink-0",
          "w-14 sm:w-16 py-2.5 rounded-lg border transition-all duration-200",
          "hover:shadow-md cursor-pointer",
          hasUpvoted
            ? "border-primary bg-primary-light text-primary"
            : "border-border bg-card text-muted hover:border-primary hover:text-primary"
        )}
      >
        <ChevronUp
          className={cn(
            "w-5 h-5 transition-transform duration-200",
            hasUpvoted && "text-primary"
          )}
        />
        <span className="text-sm font-semibold leading-tight">{upvotes}</span>
      </button>
    </div>
  );
}

export default function ShowcasePage() {
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter projects by selected category
  const filteredProjects =
    activeCategory === "All"
      ? showcaseProjects
      : showcaseProjects.filter((p) => p.category === activeCategory);

  // Sort by upvotes descending
  const sortedProjects = [...filteredProjects].sort(
    (a, b) => b.upvotes - a.upvotes
  );

  // Format today's date in a Product Hunt style
  const today = new Date();
  const todayLabel = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-background to-background" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-light text-primary text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            Community Built
          </div>

          <h1 className="text-4xl sm:text-5xl font-bold text-foreground tracking-tight mb-4">
            Community{" "}
            <span className="gradient-text">Showcase</span>
          </h1>

          <p className="text-lg text-muted max-w-2xl mx-auto mb-8">
            Discover amazing software built by the vibe coding community.
            Upvote your favorites and get inspired.
          </p>

          <Link href="/submit">
            <Button variant="primary" size="lg">
              <ArrowUpRight className="w-5 h-5" />
              Submit Your Project
            </Button>
          </Link>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* Date Label */}
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-4 h-4 text-muted" />
          <span className="text-sm font-medium text-muted">{todayLabel}</span>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-border">
          {showcaseCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer",
                activeCategory === category
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "bg-secondary text-muted hover:bg-border hover:text-foreground"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Projects List */}
        <div className="bg-card rounded-xl border border-border shadow-sm overflow-hidden">
          {sortedProjects.length > 0 ? (
            sortedProjects.map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={parseInt(project.id) - 1}
                rank={index + 1}
              />
            ))
          ) : (
            <div className="py-16 text-center">
              <p className="text-muted text-lg">
                No projects found in this category yet.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Be the first to submit one!
              </p>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <p className="text-center text-sm text-muted mt-8">
          Rankings update in real time based on community upvotes.
        </p>
      </section>
    </div>
  );
}
