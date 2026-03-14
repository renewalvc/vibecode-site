"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Terminal,
  Rocket,
  Settings,
  MessageSquare,
  Cloud,
  CreditCard,
  Clock,
  ChevronRight,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import { guides, guideCategories, type Guide } from "@/data/guides";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  terminal: Terminal,
  rocket: Rocket,
  settings: Settings,
  "message-square": MessageSquare,
  cloud: Cloud,
  "credit-card": CreditCard,
};

const difficultyColors: Record<string, string> = {
  beginner: "bg-emerald-50 text-emerald-700",
  intermediate: "bg-amber-50 text-amber-700",
  advanced: "bg-red-50 text-red-700",
};

export default function GuidesPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredGuides =
    activeCategory === "All"
      ? guides
      : guides.filter((guide) => guide.category === activeCategory);

  return (
    <main className="min-h-screen bg-background">
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Guides"
            title="Getting Started Guides"
            description="Step-by-step guides to set up your development environment and start building with AI tools."
            align="center"
          />

          {/* Category Filter Pills */}
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {guideCategories.map((category) => (
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

          {/* Guide Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGuides.map((guide) => (
              <GuideCard key={guide.id} guide={guide} />
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

function GuideCard({ guide }: { guide: Guide }) {
  const IconComponent = iconMap[guide.icon] || Terminal;

  return (
    <Card hover padding="md">
      <Link href={`/guides/${guide.slug}`} className="block group">
        <div className="flex items-start gap-4">
          {/* Icon */}
          <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-primary-light flex items-center justify-center">
            <IconComponent className="w-5 h-5 text-primary" />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mb-1">
              {guide.title}
            </h3>
            <p className="text-sm text-muted leading-relaxed mb-4">
              {guide.description}
            </p>

            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-2">
              <span
                className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
                  difficultyColors[guide.difficulty]
                )}
              >
                {guide.difficulty}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-muted">
                <Clock className="w-3.5 h-3.5" />
                {guide.estimatedTime}
              </span>
              <Badge variant="outline">{guide.category}</Badge>
            </div>
          </div>

          {/* Arrow */}
          <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-1 group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-200" />
        </div>
      </Link>
    </Card>
  );
}
