import Link from "next/link";
import {
  ArrowRight,
  Play,
  Terminal,
  Rocket,
  Globe,
  ChevronUp,
  Star,
  Users,
  Clock,
  Sparkles,
  BookOpen,
  Zap,
  Mail,
  TrendingUp,
  Headphones,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import SectionHeader from "@/components/ui/SectionHeader";
import Input from "@/components/ui/Input";
import { formatDate, formatDuration } from "@/lib/utils";
import { showcaseProjects } from "@/data/showcase";
import { podcastEpisodes } from "@/data/podcasts";
import { learnContent } from "@/data/learn";
import { courses } from "@/data/courses";

const featuredProjects = showcaseProjects.filter((p) => p.featured).slice(0, 3);
const latestEpisode = podcastEpisodes[0];
const featuredArticles = learnContent.filter((l) => l.featured);
const featuredCourses = courses.filter((c) => c.featured).slice(0, 2);

export default function Home() {
  return (
    <div>
      {/* ========== HERO SECTION ========== */}
      <section className="relative overflow-hidden bg-white">
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Top-right gradient blob */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
          {/* Bottom-left gradient blob */}
          <div className="absolute -bottom-32 -left-32 w-[500px] h-[500px] rounded-full bg-purple-500/5 blur-3xl" />
          {/* Subtle grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, #6366f1 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 md:pt-28 md:pb-36">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            {/* Label pill */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary-light border border-primary/10 mb-8">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">
                The home for AI-built software
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Discover What People Are{" "}
              <span className="gradient-text">Building with AI</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-10 leading-relaxed">
              Explore the best vibe-coded software, learn to build your own, and
              join a community of creators shipping real products with AI.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/showcase">
                <Button size="lg" variant="primary">
                  Explore Showcase
                  <ArrowRight className="w-5 h-5" />
                </Button>
              </Link>
              <Link href="/learn">
                <Button size="lg" variant="outline">
                  Start Learning
                  <BookOpen className="w-5 h-5" />
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-muted">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>5,000+ builders</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Rocket className="w-4 h-4" />
                <span>200+ projects shipped</span>
              </div>
              <div className="hidden sm:flex items-center gap-2">
                <Headphones className="w-4 h-4" />
                <span>12 podcast episodes</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom fade divider */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      </section>

      {/* ========== FEATURED SHOWCASE ========== */}
      <section className="bg-surface py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Community Showcase"
            title="Featured Projects"
            description="Real software built by real people using AI. Upvote your favorites and get inspired to build your own."
          />

          <div className="grid gap-6 md:grid-cols-3">
            {featuredProjects.map((project, index) => (
              <Card
                key={project.id}
                padding="none"
                hover
                className={`animate-fade-in stagger-${index + 1} flex flex-col`}
              >
                {/* Project thumbnail area */}
                <div className="relative h-44 rounded-t-xl overflow-hidden bg-gradient-to-br from-primary/10 via-purple-500/10 to-pink-500/10">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-5xl font-bold gradient-text opacity-30">
                      {project.name.charAt(0)}
                    </div>
                  </div>
                  <div className="absolute top-3 right-3">
                    <Badge variant="primary">{project.category}</Badge>
                  </div>
                </div>

                {/* Project info */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground truncate">
                        {project.name}
                      </h3>
                      <p className="text-sm text-muted mt-1 line-clamp-2">
                        {project.tagline}
                      </p>
                    </div>

                    {/* Upvote button (visual only) */}
                    <div className="flex flex-col items-center gap-0.5 px-2.5 py-1.5 rounded-lg border border-border bg-surface hover:border-primary/30 transition-colors shrink-0">
                      <ChevronUp className="w-4 h-4 text-primary" />
                      <span className="text-xs font-semibold text-foreground">
                        {project.upvotes}
                      </span>
                    </div>
                  </div>

                  {/* Creator */}
                  <div className="flex items-center gap-2 mt-3 mb-4">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                      <span className="text-[10px] font-bold text-white">
                        {project.creator.charAt(0)}
                      </span>
                    </div>
                    <span className="text-sm text-muted">{project.creator}</span>
                  </div>

                  {/* Built with tags */}
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {project.builtWith.slice(0, 3).map((tool) => (
                      <Badge key={tool} variant="outline">
                        {tool}
                      </Badge>
                    ))}
                    {project.builtWith.length > 3 && (
                      <Badge variant="outline">
                        +{project.builtWith.length - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/showcase">
              <Button variant="outline">
                View All Projects
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== LATEST PODCAST ========== */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Latest Episode"
            title="The VibeCoded Podcast"
            description="Conversations with builders, creators, and innovators who are shipping software with AI."
          />

          <div className="max-w-4xl mx-auto">
            <Card padding="none" hover className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                {/* Episode artwork */}
                <div className="relative w-full md:w-80 h-56 md:h-auto shrink-0 gradient-bg flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="text-sm font-medium uppercase tracking-wider opacity-80 mb-2">
                      Episode {latestEpisode.episodeNumber}
                    </div>
                    <Headphones className="w-16 h-16 mx-auto opacity-90" />
                    <div className="mt-3 flex items-center justify-center gap-2 text-sm opacity-80">
                      <Clock className="w-4 h-4" />
                      <span>{formatDuration(latestEpisode.duration)}</span>
                    </div>
                  </div>
                  {/* Play overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity bg-black/20">
                    <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center shadow-lg">
                      <Play className="w-7 h-7 text-primary ml-1" />
                    </div>
                  </div>
                </div>

                {/* Episode info */}
                <div className="flex-1 p-6 md:p-8 flex flex-col justify-center">
                  <div className="flex items-center gap-3 mb-3">
                    <Badge variant="primary">New Episode</Badge>
                    <span className="text-sm text-muted">
                      {formatDate(latestEpisode.date)}
                    </span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-bold text-foreground mb-2">
                    {latestEpisode.title}
                  </h3>

                  <p className="text-sm text-primary font-medium mb-3">
                    with {latestEpisode.guest} &mdash;{" "}
                    {latestEpisode.guestTitle}
                  </p>

                  <p className="text-muted text-sm leading-relaxed mb-5 line-clamp-3">
                    {latestEpisode.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-3">
                    <Link href={`/podcast/${latestEpisode.slug}`}>
                      <Button size="sm" variant="primary">
                        <Play className="w-4 h-4" />
                        Listen Now
                      </Button>
                    </Link>
                    <Link href="/podcast">
                      <Button size="sm" variant="ghost">
                        All Episodes
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* ========== HOW IT WORKS ========== */}
      <section className="bg-surface py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Get Started"
            title="Build Software in 3 Steps"
            description="No degree needed. No bootcamp required. Just you, an idea, and an AI coding tool."
          />

          <div className="grid gap-8 md:grid-cols-3 max-w-4xl mx-auto">
            {/* Step 1 */}
            <div className="text-center animate-fade-in stagger-1">
              <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/20">
                <Terminal className="w-8 h-8 text-white" />
              </div>
              <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                Step 1
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Install Claude Code
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Set up the most powerful AI coding tool in minutes. Works in your
                terminal on any operating system.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center animate-fade-in stagger-2">
              <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/20">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                Step 2
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Describe What You Want
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Tell the AI what to build using plain English. No syntax, no
                frameworks to memorize — just describe your vision.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center animate-fade-in stagger-3">
              <div className="w-16 h-16 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-5 shadow-lg shadow-primary/20">
                <Rocket className="w-8 h-8 text-white" />
              </div>
              <div className="text-xs font-bold text-primary uppercase tracking-wider mb-2">
                Step 3
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Ship Your Creation
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Deploy your app to the web and share it with the world. Go from
                idea to live product in hours, not months.
              </p>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link href="/guides">
              <Button variant="primary">
                Read the Getting Started Guide
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== LEARN SECTION ========== */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Learn"
            title="Level Up Your Skills"
            description="Guides and articles to help you go from beginner to shipping real products with AI."
          />

          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            {featuredArticles.map((article, index) => (
              <Link
                key={article.id}
                href={`/learn/${article.slug}`}
                className="group"
              >
                <Card
                  hover
                  padding="lg"
                  className={`h-full animate-fade-in stagger-${index + 1}`}
                >
                  <div className="flex items-center gap-2 mb-4">
                    <Badge variant="primary">{article.category}</Badge>
                    <Badge variant="outline">{article.difficulty}</Badge>
                  </div>

                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>

                  <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
                    {article.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-muted">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{article.readTime} min read</span>
                    </div>
                    <span className="flex items-center gap-1 text-primary font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                      Read article
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/learn">
              <Button variant="outline">
                Browse All Articles
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== NEWSLETTER CTA ========== */}
      <section className="relative bg-surface py-20 md:py-28 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute bottom-0 left-1/4 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl" />
        </div>

        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-14 h-14 rounded-2xl gradient-bg flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary/20">
            <Mail className="w-7 h-7 text-white" />
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight mb-4">
            Stay in the Loop
          </h2>
          <p className="text-lg text-muted mb-8 max-w-lg mx-auto">
            Get a weekly dose of the best AI-built projects, tutorials, and
            insights delivered to your inbox. No spam, unsubscribe anytime.
          </p>

          {/* Email form */}
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-5">
            <Input
              type="email"
              placeholder="you@example.com"
              className="flex-1"
            />
            <Button variant="primary" size="md">
              Subscribe
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>

          <p className="text-sm text-muted flex items-center justify-center gap-2">
            <Users className="w-4 h-4" />
            Join 5,000+ builders getting the weekly newsletter
          </p>
        </div>
      </section>

      {/* ========== ACADEMY PREVIEW ========== */}
      <section className="bg-white py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            label="Academy"
            title="Go Deeper with Courses"
            description="Structured, project-based courses taught by experienced builders. Learn by doing."
          />

          <div className="grid gap-6 md:grid-cols-2 max-w-5xl mx-auto">
            {featuredCourses.map((course, index) => (
              <Link
                key={course.id}
                href={`/academy/${course.slug}`}
                className="group"
              >
                <Card
                  hover
                  padding="none"
                  className={`h-full animate-fade-in stagger-${index + 1} flex flex-col`}
                >
                  {/* Course header gradient */}
                  <div className="relative h-40 rounded-t-xl overflow-hidden bg-gradient-to-br from-primary via-purple-500 to-pink-500 flex items-end">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="relative p-5 text-white w-full">
                      <Badge
                        variant="outline"
                        className="border-white/30 text-white mb-2"
                      >
                        {course.level}
                      </Badge>
                      <h3 className="text-xl font-bold">{course.title}</h3>
                    </div>
                  </div>

                  {/* Course details */}
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-sm text-muted leading-relaxed mb-4 line-clamp-2">
                      {course.description}
                    </p>

                    {/* Stats row */}
                    <div className="flex items-center gap-4 text-sm text-muted mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                        <span className="font-medium text-foreground">
                          {course.rating}
                        </span>
                        <span>({course.reviews})</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5" />
                        <span>
                          {course.enrolled.toLocaleString()} enrolled
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{course.duration}</span>
                      </div>
                    </div>

                    {/* Instructor */}
                    <div className="flex items-center gap-2 mb-5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center">
                        <span className="text-[11px] font-bold text-white">
                          {course.instructor.charAt(0)}
                        </span>
                      </div>
                      <span className="text-sm text-muted">
                        {course.instructor}
                      </span>
                    </div>

                    {/* Pricing */}
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-foreground">
                          ${course.price}
                        </span>
                        <span className="text-sm text-muted line-through">
                          ${course.originalPrice}
                        </span>
                      </div>
                      <span className="text-sm text-primary font-medium flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        View Course
                        <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/academy">
              <Button variant="outline">
                Explore All Courses
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA ========== */}
      <section className="relative bg-foreground py-20 md:py-28 overflow-hidden">
        {/* Decorative gradient overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary blur-[128px]" />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-lg text-white/60 mb-10 max-w-xl mx-auto">
            Join thousands of creators who are turning their ideas into real
            software with AI. No coding experience required.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/guides">
              <Button size="lg" variant="primary">
                <Zap className="w-5 h-5" />
                Get Started Free
              </Button>
            </Link>
            <Link href="/showcase">
              <Button
                size="lg"
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10"
              >
                <TrendingUp className="w-5 h-5" />
                Browse Showcase
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
