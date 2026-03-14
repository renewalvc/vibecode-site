"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Clock,
  BookOpen,
  User,
  Calendar,
  ArrowRight,
  Tag,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { learnContent, learnCategories, type LearnContent } from "@/data/learn";
import { cn, formatDate, formatDuration } from "@/lib/utils";

const difficultyColors: Record<string, string> = {
  beginner: "bg-emerald-50 text-emerald-700",
  intermediate: "bg-amber-50 text-amber-700",
  advanced: "bg-red-50 text-red-700",
};

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
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Learn"
            title="Learn Vibe Coding"
            description="Articles, tutorials, and deep dives to help you master AI-assisted development."
            align="center"
          />

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-1 mb-12 bg-secondary rounded-xl p-1.5 max-w-fit mx-auto">
            {learnCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 cursor-pointer",
                  activeCategory === category
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted hover:text-foreground"
                )}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Featured Articles */}
          {featured.length > 0 && (
            <div className="mb-12">
              {featured.map((article) => (
                <FeaturedCard key={article.id} article={article} />
              ))}
            </div>
          )}

          {/* Remaining Articles Grid */}
          {remaining.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {remaining.map((article) => (
                <ArticleCard key={article.id} article={article} />
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

function FeaturedCard({ article }: { article: LearnContent }) {
  return (
    <Card hover padding="lg" className="mb-6">
      <Link href={`/learn/${article.slug}`} className="block group">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="primary">Featured</Badge>
              <span
                className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
                  difficultyColors[article.difficulty]
                )}
              >
                {article.difficulty}
              </span>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-foreground group-hover:text-primary transition-colors duration-200 mb-3">
              {article.title}
            </h2>
            <p className="text-muted leading-relaxed mb-4 max-w-2xl">
              {article.description}
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-muted">
              <span className="inline-flex items-center gap-1.5">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(article.date)}
              </span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {formatDuration(article.readTime)} read
              </span>
            </div>
          </div>

          <div className="flex-shrink-0 hidden md:flex items-center">
            <div className="w-12 h-12 rounded-full bg-primary-light flex items-center justify-center group-hover:bg-primary/10 transition-colors">
              <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-0.5 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}

function ArticleCard({ article }: { article: LearnContent }) {
  return (
    <Card hover padding="md">
      <Link href={`/learn/${article.slug}`} className="block group h-full">
        <div className="flex flex-col h-full">
          {/* Top Meta */}
          <div className="flex items-center gap-2 mb-3">
            <span
              className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
                difficultyColors[article.difficulty]
              )}
            >
              {article.difficulty}
            </span>
            <Badge variant="outline">{article.category}</Badge>
          </div>

          {/* Title & Description */}
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mb-2">
            {article.title}
          </h3>
          <p className="text-sm text-muted leading-relaxed mb-4 flex-1">
            {article.description}
          </p>

          {/* Author & Meta */}
          <div className="flex items-center justify-between text-xs text-muted pt-4 border-t border-border">
            <span className="inline-flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              {article.author}
            </span>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(article.date)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {formatDuration(article.readTime)}
              </span>
            </div>
          </div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-3">
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-xs text-muted bg-secondary px-2 py-0.5 rounded-md"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </Link>
    </Card>
  );
}
