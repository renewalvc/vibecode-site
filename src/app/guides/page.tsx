"use client";

import { useState } from "react";
import Link from "next/link";
import { guides, guideCategories } from "@/data/guides";
import { cn } from "@/lib/utils";

export default function GuidesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredGuides =
    activeCategory === "All"
      ? guides
      : guides.filter((guide) => guide.category === activeCategory);

  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Guides
            </h1>
            <p className="text-lg text-muted">
              Step-by-step guides to set up your tools and start building.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {guideCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 cursor-pointer",
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-muted hover:text-foreground"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Guide List */}
          <div className="divide-y divide-border">
            {filteredGuides.map((guide) => (
              <Link
                key={guide.id}
                href={`/guides/${guide.slug}`}
                className="block group py-6 first:pt-0 last:pb-0"
              >
                <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mb-1.5">
                  {guide.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-3">
                  {guide.description}
                </p>
                <div className="flex items-center gap-3 text-sm">
                  <span
                    className={cn(
                      "capitalize",
                      guide.difficulty === "beginner" && "text-emerald-600",
                      guide.difficulty === "intermediate" && "text-amber-600",
                      guide.difficulty === "advanced" && "text-red-600"
                    )}
                  >
                    {guide.difficulty}
                  </span>
                  <span className="text-border">·</span>
                  <span className="text-muted">{guide.estimatedTime}</span>
                </div>
              </Link>
            ))}
          </div>

          {filteredGuides.length === 0 && (
            <p className="text-center text-muted py-12">
              No guides found in this category.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
