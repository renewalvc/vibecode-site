"use client";

import { useState } from "react";
import Link from "next/link";
import { learnContent, learnCategories } from "@/data/learn";
import { cn, formatDate } from "@/lib/utils";

export default function LearnPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? learnContent
      : learnContent.filter((item) => item.category === activeCategory);

  const featured = filtered.filter((item) => item.featured);
  const remaining = filtered.filter((item) => !item.featured);

  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Learn
            </h1>
            <p className="text-lg text-muted">
              Articles and tutorials on AI-assisted development.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap gap-2 mb-10">
            {learnCategories.map((category) => (
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

          {/* Featured Articles */}
          {featured.length > 0 && (
            <div className="mb-12 space-y-6">
              {featured.map((article) => (
                <Link
                  key={article.id}
                  href={`/learn/${article.slug}`}
                  className="block group"
                >
                  <div className="border border-border rounded-lg p-6 md:p-8 transition-colors duration-200 hover:border-primary/30">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-200 mb-3">
                      {article.title}
                    </h2>
                    <p className="text-muted leading-relaxed mb-4 max-w-2xl">
                      {article.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted">
                      <span>{article.author}</span>
                      <span className="text-border">·</span>
                      <span>{formatDate(article.date)}</span>
                      <span className="text-border">·</span>
                      <span>{article.readTime} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* Remaining Articles Grid */}
          {remaining.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {remaining.map((article) => (
                <Link
                  key={article.id}
                  href={`/learn/${article.slug}`}
                  className="block group"
                >
                  <div className="border border-border rounded-lg p-5 h-full transition-colors duration-200 hover:border-primary/30">
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed mb-4">
                      {article.description}
                    </p>
                    <p className="text-sm text-muted">
                      {article.category}
                      <span className="mx-1.5">·</span>
                      {article.readTime} min read
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {filtered.length === 0 && (
            <p className="text-center text-muted py-12">
              No articles found in this category.
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
