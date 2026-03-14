import Link from "next/link";
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
  Tag,
  ArrowRight,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { learnContent } from "@/data/learn";
import { cn, formatDate, formatDuration } from "@/lib/utils";

const difficultyColors: Record<string, string> = {
  beginner: "bg-emerald-50 text-emerald-700",
  intermediate: "bg-amber-50 text-amber-700",
  advanced: "bg-red-50 text-red-700",
};

export function generateStaticParams() {
  return learnContent.map((article) => ({ slug: article.slug }));
}

function renderContent(content: string) {
  const lines = content.split("\n");
  const elements: React.ReactNode[] = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    // Skip empty lines
    if (line.trim() === "") {
      i++;
      continue;
    }

    // Code blocks
    if (line.trim().startsWith("```")) {
      const lang = line.trim().replace("```", "");
      const codeLines: string[] = [];
      i++;
      while (i < lines.length && !lines[i].trim().startsWith("```")) {
        codeLines.push(lines[i]);
        i++;
      }
      i++; // skip closing ```
      elements.push(
        <div key={`code-${elements.length}`} className="my-4 rounded-lg overflow-hidden">
          {lang && (
            <div className="bg-slate-700 px-4 py-2 text-xs text-slate-300 font-mono">
              {lang}
            </div>
          )}
          <pre className={cn("bg-slate-800 text-slate-100 p-4 overflow-x-auto text-sm font-mono leading-relaxed", !lang && "rounded-t-lg")}>
            <code>{codeLines.join("\n")}</code>
          </pre>
        </div>
      );
      continue;
    }

    // H2 headings
    if (line.trim().startsWith("## ")) {
      elements.push(
        <h2
          key={`h2-${elements.length}`}
          className="text-2xl font-bold text-foreground mt-10 mb-4"
        >
          {line.trim().replace("## ", "")}
        </h2>
      );
      i++;
      continue;
    }

    // H3 headings
    if (line.trim().startsWith("### ")) {
      elements.push(
        <h3
          key={`h3-${elements.length}`}
          className="text-xl font-semibold text-foreground mt-8 mb-3"
        >
          {line.trim().replace("### ", "")}
        </h3>
      );
      i++;
      continue;
    }

    // Bullet lists
    if (line.trim().startsWith("- ")) {
      const bullets: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("- ")) {
        bullets.push(lines[i].trim().replace(/^- /, ""));
        i++;
      }
      elements.push(
        <ul
          key={`ul-${elements.length}`}
          className="my-4 space-y-2 pl-6 list-disc text-muted marker:text-primary/40"
        >
          {bullets.map((bullet, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInlineMarkdown(bullet)}
            </li>
          ))}
        </ul>
      );
      continue;
    }

    // Blockquotes
    if (line.trim().startsWith("> ")) {
      const quoteLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("> ")) {
        quoteLines.push(lines[i].trim().replace(/^> /, ""));
        i++;
      }
      elements.push(
        <blockquote
          key={`bq-${elements.length}`}
          className="my-4 border-l-4 border-primary/30 pl-4 py-2 text-muted italic bg-primary-light/30 rounded-r-lg"
        >
          {quoteLines.map((ql, idx) => (
            <p key={idx} className="leading-relaxed">
              {renderInlineMarkdown(ql)}
            </p>
          ))}
        </blockquote>
      );
      continue;
    }

    // Numbered lists
    if (/^\d+\.\s/.test(line.trim())) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\.\s/.test(lines[i].trim())) {
        items.push(lines[i].trim().replace(/^\d+\.\s/, ""));
        i++;
      }
      elements.push(
        <ol
          key={`ol-${elements.length}`}
          className="my-4 space-y-2 pl-6 list-decimal text-muted marker:text-primary/60 marker:font-semibold"
        >
          {items.map((item, idx) => (
            <li key={idx} className="leading-relaxed">
              {renderInlineMarkdown(item)}
            </li>
          ))}
        </ol>
      );
      continue;
    }

    // Table lines — detect and skip (rendered as plain text fallback)
    if (line.trim().startsWith("|")) {
      const tableLines: string[] = [];
      while (i < lines.length && lines[i].trim().startsWith("|")) {
        tableLines.push(lines[i].trim());
        i++;
      }
      // Parse simple markdown table
      const rows = tableLines.filter((r) => !r.match(/^\|[-\s|]+\|$/));
      if (rows.length > 0) {
        const headerCells = rows[0]
          .split("|")
          .filter((c) => c.trim() !== "");
        const bodyRows = rows.slice(1);
        elements.push(
          <div key={`table-${elements.length}`} className="my-6 overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-border">
                  {headerCells.map((cell, idx) => (
                    <th
                      key={idx}
                      className="text-left py-3 px-4 font-semibold text-foreground"
                    >
                      {renderInlineMarkdown(cell.trim())}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {bodyRows.map((row, rIdx) => {
                  const cells = row.split("|").filter((c) => c.trim() !== "");
                  return (
                    <tr key={rIdx} className="border-b border-border">
                      {cells.map((cell, cIdx) => (
                        <td key={cIdx} className="py-3 px-4 text-muted">
                          {renderInlineMarkdown(cell.trim())}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        );
      }
      continue;
    }

    // Regular paragraphs
    elements.push(
      <p
        key={`p-${elements.length}`}
        className="my-3 text-muted leading-relaxed"
      >
        {renderInlineMarkdown(line.trim())}
      </p>
    );
    i++;
  }

  return elements;
}

/** Render inline markdown: **bold**, `code`, and [links](url) */
function renderInlineMarkdown(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      parts.push(
        <strong key={`b-${match.index}`} className="font-semibold text-foreground">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      parts.push(
        <code
          key={`c-${match.index}`}
          className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono text-primary"
        >
          {match[3]}
        </code>
      );
    } else if (match[4] && match[5]) {
      parts.push(
        <a
          key={`a-${match.index}`}
          href={match[5]}
          className="text-primary hover:underline"
        >
          {match[4]}
        </a>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : parts;
}

/** Get related articles: same category or overlapping tags, excluding current */
function getRelatedArticles(currentSlug: string, limit: number = 3) {
  const current = learnContent.find((a) => a.slug === currentSlug);
  if (!current) return [];

  return learnContent
    .filter((a) => a.slug !== currentSlug)
    .map((a) => {
      // Score by category match + overlapping tags
      let score = 0;
      if (a.category === current.category) score += 2;
      const sharedTags = a.tags.filter((t) => current.tags.includes(t));
      score += sharedTags.length;
      return { article: a, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.article);
}

export default async function LearnDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = learnContent.find((a) => a.slug === slug);

  if (!article) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Article not found
          </h1>
          <Link href="/learn" className="text-primary hover:underline">
            Back to Learn
          </Link>
        </div>
      </main>
    );
  }

  const related = getRelatedArticles(slug);

  return (
    <main className="min-h-screen bg-background">
      <article className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/learn"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Learn
          </Link>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
              {article.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <span className="inline-flex items-center gap-1.5 text-muted">
                <User className="w-4 h-4" />
                {article.author}
              </span>
              <span className="inline-flex items-center gap-1.5 text-muted">
                <Calendar className="w-4 h-4" />
                {formatDate(article.date)}
              </span>
              <span className="inline-flex items-center gap-1.5 text-muted">
                <Clock className="w-4 h-4" />
                {formatDuration(article.readTime)} read
              </span>
              <span
                className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
                  difficultyColors[article.difficulty]
                )}
              >
                {article.difficulty}
              </span>
            </div>
          </header>

          {/* Divider */}
          <hr className="border-border mb-8" />

          {/* Content */}
          <div className="prose-custom">{renderContent(article.content)}</div>

          {/* Tags */}
          {article.tags.length > 0 && (
            <div className="mt-12 pt-6 border-t border-border">
              <div className="flex flex-wrap items-center gap-2">
                <Tag className="w-4 h-4 text-muted" />
                {article.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Related Articles */}
          {related.length > 0 && (
            <section className="mt-16">
              <hr className="border-border mb-10" />
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Continue Learning
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {related.map((rel) => (
                  <Card key={rel.id} hover padding="md">
                    <Link
                      href={`/learn/${rel.slug}`}
                      className="block group"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span
                          className={cn(
                            "inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium capitalize",
                            difficultyColors[rel.difficulty]
                          )}
                        >
                          {rel.difficulty}
                        </span>
                      </div>
                      <h3 className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors duration-200 mb-1.5 line-clamp-2">
                        {rel.title}
                      </h3>
                      <p className="text-xs text-muted line-clamp-2 mb-3">
                        {rel.description}
                      </p>
                      <span className="inline-flex items-center gap-1 text-xs text-primary font-medium">
                        Read article
                        <ArrowRight className="w-3 h-3" />
                      </span>
                    </Link>
                  </Card>
                ))}
              </div>
            </section>
          )}
        </div>
      </article>
    </main>
  );
}
