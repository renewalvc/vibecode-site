import Link from "next/link";
import { ArrowLeft, Clock, Calendar, ChevronRight } from "lucide-react";
import Badge from "@/components/ui/Badge";
import { guides } from "@/data/guides";
import { cn, formatDate } from "@/lib/utils";

const difficultyColors: Record<string, string> = {
  beginner: "bg-emerald-50 text-emerald-700",
  intermediate: "bg-amber-50 text-amber-700",
  advanced: "bg-red-50 text-red-700",
};

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
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

    // Bullet lists — collect consecutive bullet lines
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
  // Match **bold**, `code`, and [text](url) patterns
  const regex = /(\*\*(.+?)\*\*|`([^`]+)`|\[([^\]]+)\]\(([^)]+)\))/g;
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(text)) !== null) {
    // Add text before match
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }

    if (match[2]) {
      // Bold text
      parts.push(
        <strong key={`b-${match.index}`} className="font-semibold text-foreground">
          {match[2]}
        </strong>
      );
    } else if (match[3]) {
      // Inline code
      parts.push(
        <code
          key={`c-${match.index}`}
          className="bg-secondary px-1.5 py-0.5 rounded text-sm font-mono text-primary"
        >
          {match[3]}
        </code>
      );
    } else if (match[4] && match[5]) {
      // Link
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

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length === 1 ? parts[0] : parts;
}

export default async function GuideDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = guides.find((g) => g.slug === slug);

  if (!guide) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-2">Guide not found</h1>
          <Link href="/guides" className="text-primary hover:underline">
            Back to guides
          </Link>
        </div>
      </main>
    );
  }

  const currentIndex = guides.findIndex((g) => g.slug === slug);
  const prevGuide = currentIndex > 0 ? guides[currentIndex - 1] : null;
  const nextGuide =
    currentIndex < guides.length - 1 ? guides[currentIndex + 1] : null;

  return (
    <main className="min-h-screen bg-background">
      <article className="py-12 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Link */}
          <Link
            href="/guides"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-primary transition-colors duration-200 mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to guides
          </Link>

          {/* Header */}
          <header className="mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
              {guide.title}
            </h1>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span
                className={cn(
                  "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize",
                  difficultyColors[guide.difficulty]
                )}
              >
                {guide.difficulty}
              </span>
              <span className="inline-flex items-center gap-1.5 text-muted">
                <Clock className="w-4 h-4" />
                {guide.estimatedTime}
              </span>
              <span className="inline-flex items-center gap-1.5 text-muted">
                <Calendar className="w-4 h-4" />
                Updated {formatDate(guide.lastUpdated)}
              </span>
            </div>
          </header>

          {/* Divider */}
          <hr className="border-border mb-8" />

          {/* Content */}
          <div className="prose-custom">{renderContent(guide.content)}</div>

          {/* Divider */}
          <hr className="border-border mt-12 mb-8" />

          {/* Prev/Next Navigation */}
          <nav className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevGuide ? (
              <Link
                href={`/guides/${prevGuide.slug}`}
                className="group flex flex-col p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary-light/20 transition-all duration-200"
              >
                <span className="text-xs text-muted mb-1">Previous guide</span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {prevGuide.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextGuide && (
              <Link
                href={`/guides/${nextGuide.slug}`}
                className="group flex flex-col items-end p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-primary-light/20 transition-all duration-200 text-right"
              >
                <span className="text-xs text-muted mb-1 flex items-center gap-1">
                  Next guide
                  <ChevronRight className="w-3 h-3" />
                </span>
                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                  {nextGuide.title}
                </span>
              </Link>
            )}
          </nav>
        </div>
      </article>
    </main>
  );
}
