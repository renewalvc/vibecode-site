import Link from "next/link";
import {
  ArrowLeft,
  ExternalLink,
  Calendar,
  User,
  Code,
  Tag,
  ChevronUp,
  Trophy,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { cn, formatDate } from "@/lib/utils";
import { showcaseProjects, type ShowcaseProject } from "@/data/showcase";

// WHY: Deterministic gradient palette — must match the listing page so thumbnails
// look the same across pages.
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

export function generateStaticParams() {
  return showcaseProjects.map((project) => ({
    id: project.id,
  }));
}

export function generateMetadata({ params }: { params: { id: string } }) {
  const project = showcaseProjects.find((p) => p.id === params.id);
  if (!project) {
    return { title: "Project Not Found | VibeCoded" };
  }
  return {
    title: `${project.name} — VibeCoded Showcase`,
    description: project.tagline,
  };
}

function SimilarProjectCard({
  project,
  gradientIndex,
}: {
  project: ShowcaseProject;
  gradientIndex: number;
}) {
  return (
    <Link href={`/showcase/${project.id}`}>
      <Card hover padding="sm" className="flex items-center gap-4">
        <div
          className={cn(
            "w-12 h-12 rounded-lg bg-gradient-to-br shrink-0",
            "flex items-center justify-center text-white font-bold text-sm",
            getGradient(gradientIndex)
          )}
        >
          {project.name.charAt(0)}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-foreground truncate">
            {project.name}
          </p>
          <p className="text-xs text-muted truncate">{project.tagline}</p>
        </div>
        <div className="flex flex-col items-center shrink-0 text-muted">
          <ChevronUp className="w-4 h-4" />
          <span className="text-xs font-medium">{project.upvotes}</span>
        </div>
      </Card>
    </Link>
  );
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = showcaseProjects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">
            Project Not Found
          </h1>
          <p className="text-muted mb-6">
            The project you are looking for does not exist.
          </p>
          <Link href="/showcase">
            <Button variant="primary">
              <ArrowLeft className="w-4 h-4" />
              Back to Showcase
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const projectIndex = parseInt(project.id) - 1;

  // WHY: Similar projects come from the same category first, then fill with
  // other projects. Excludes the current project and caps at 3.
  const similarProjects = showcaseProjects
    .filter((p) => p.id !== project.id)
    .sort((a, b) => {
      const aMatch = a.category === project.category ? 1 : 0;
      const bMatch = b.category === project.category ? 1 : 0;
      if (bMatch !== aMatch) return bMatch - aMatch;
      return b.upvotes - a.upvotes;
    })
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="border-b border-border bg-card">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4">
          <Link
            href="/showcase"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Showcase
          </Link>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Project Header */}
            <div className="flex items-start gap-4 sm:gap-5 mb-8">
              <div
                className={cn(
                  "w-16 h-16 sm:w-20 sm:h-20 rounded-xl bg-gradient-to-br shrink-0 shadow-md",
                  "flex items-center justify-center text-white font-bold text-xl sm:text-2xl",
                  getGradient(projectIndex)
                )}
              >
                {project.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {project.name}
                  </h1>
                  {project.featured && (
                    <Trophy className="w-5 h-5 text-amber-500 shrink-0" />
                  )}
                </div>
                <p className="text-lg text-muted">{project.tagline}</p>
              </div>
            </div>

            {/* Large Thumbnail Placeholder (16:9) */}
            <div
              className={cn(
                "w-full aspect-video rounded-2xl bg-gradient-to-br mb-8 shadow-lg",
                "flex items-center justify-center",
                getGradient(projectIndex)
              )}
            >
              <span className="text-white/60 text-lg font-medium">
                {project.name} Preview
              </span>
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                About
              </h2>
              <p className="text-muted leading-relaxed text-base">
                {project.description}
              </p>
            </div>

            {/* Built With */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Code className="w-5 h-5 text-primary" />
                Built With
              </h2>
              <div className="flex flex-wrap gap-2">
                {project.builtWith.map((tech) => (
                  <Badge
                    key={tech}
                    variant="outline"
                    className="text-sm px-3 py-1"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-foreground mb-3 flex items-center gap-2">
                <Tag className="w-5 h-5 text-primary" />
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                <Badge variant="primary">{project.category}</Badge>
                {project.tags.map((tag) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Upvote & Action Card */}
            <Card hover={false} padding="md">
              <div className="flex flex-col items-center text-center mb-5">
                <div className="flex flex-col items-center justify-center w-20 h-20 rounded-xl border-2 border-primary bg-primary-light mb-3">
                  <ChevronUp className="w-7 h-7 text-primary" />
                  <span className="text-xl font-bold text-primary leading-tight">
                    {project.upvotes}
                  </span>
                </div>
                <span className="text-sm text-muted">Upvotes</span>
              </div>

              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button variant="primary" size="lg" className="w-full">
                  <ExternalLink className="w-4 h-4" />
                  Visit Project
                </Button>
              </a>
            </Card>

            {/* Creator Info */}
            <Card hover={false} padding="md">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
                Creator
              </h3>
              <div className="flex items-center gap-3">
                {/* Avatar Placeholder */}
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm shrink-0">
                  {project.creator.charAt(0)}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {project.creator}
                  </p>
                  <p className="text-xs text-muted">Maker</p>
                </div>
              </div>
            </Card>

            {/* Launch Date */}
            <Card hover={false} padding="md">
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-3">
                Launch Date
              </h3>
              <div className="flex items-center gap-2 text-muted">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">{formatDate(project.launchDate)}</span>
              </div>
            </Card>

            {/* Similar Projects */}
            <div>
              <h3 className="text-sm font-semibold text-foreground uppercase tracking-wide mb-4">
                Similar Projects
              </h3>
              <div className="space-y-3">
                {similarProjects.map((similar) => (
                  <SimilarProjectCard
                    key={similar.id}
                    project={similar}
                    gradientIndex={parseInt(similar.id) - 1}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
