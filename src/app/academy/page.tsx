import Link from "next/link";
import { Star, Users, Clock, BookOpen, ArrowRight, GraduationCap, Award, Zap } from "lucide-react";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import SectionHeader from "@/components/ui/SectionHeader";
import { courses, type Course } from "@/data/courses";

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  // WHY: Render up to 5 stars, filling based on rating. Half-stars round up.
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <div className="flex items-center gap-1">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-4 h-4 ${
              i < fullStars
                ? "text-amber-400 fill-amber-400"
                : i === fullStars && hasHalf
                  ? "text-amber-400 fill-amber-400"
                  : "text-gray-200"
            }`}
          />
        ))}
      </div>
      <span className="text-sm font-medium text-foreground">{rating}</span>
      <span className="text-sm text-muted">({reviews.toLocaleString()})</span>
    </div>
  );
}

function CourseCard({ course }: { course: Course }) {
  const totalLessons = course.modules.reduce(
    (sum, mod) => sum + mod.lessons.length,
    0
  );
  const discountPercent = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );

  return (
    <Card hover padding="none" className="overflow-hidden flex flex-col">
      {/* Card Header — gradient with course initial */}
      <div className="relative bg-gradient-to-br from-indigo-500 via-purple-500 to-violet-600 p-6 pb-8">
        {course.featured && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-amber-400 text-amber-900 font-semibold border-0">
              <Award className="w-3 h-3 mr-1" />
              Popular
            </Badge>
          </div>
        )}
        <div className="flex items-center gap-3 mb-3">
          <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm capitalize">
            {course.level}
          </Badge>
          <Badge className="bg-white/20 text-white border-0 backdrop-blur-sm">
            {course.duration}
          </Badge>
        </div>
        <h3 className="text-xl font-bold text-white mb-1">{course.title}</h3>
        <p className="text-sm text-white/80">{course.subtitle}</p>
      </div>

      {/* Card Body */}
      <div className="p-6 flex flex-col flex-1">
        {/* Instructor */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
            {course.instructor.split(" ").map((n) => n[0]).join("")}
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              {course.instructor}
            </p>
            <p className="text-xs text-muted">Instructor</p>
          </div>
        </div>

        {/* Rating */}
        <div className="mb-4">
          <StarRating rating={course.rating} reviews={course.reviews} />
        </div>

        {/* Stats Row */}
        <div className="flex items-center gap-4 text-sm text-muted mb-4">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {course.enrolled.toLocaleString()} students
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            {course.modules.length} modules
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {totalLessons} lessons
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-muted mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {course.tags.map((tag) => (
            <Badge key={tag} variant="outline" className="text-[11px]">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Price + CTA — pinned to bottom */}
        <div className="mt-auto flex items-center justify-between pt-4 border-t border-border">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-foreground">
              ${course.price}
            </span>
            <span className="text-sm text-muted line-through">
              ${course.originalPrice}
            </span>
            <Badge variant="accent" className="text-[11px]">
              {discountPercent}% off
            </Badge>
          </div>
          <Link href={`/academy/${course.slug}`}>
            <Button size="sm">
              Enroll Now
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </Card>
  );
}

export default function AcademyPage() {
  // WHY: Sum total enrolled across all courses for social proof stats.
  const totalStudents = courses.reduce((sum, c) => sum + c.enrolled, 0);
  const totalModules = courses.reduce((sum, c) => sum + c.modules.length, 0);
  const totalLessons = courses.reduce(
    (sum, c) => sum + c.modules.reduce((s, m) => s + m.lessons.length, 0),
    0
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-light via-background to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--color-primary)_0%,_transparent_50%)] opacity-5" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary-light text-primary text-sm font-medium mb-6">
            <GraduationCap className="w-4 h-4" />
            Learn to Build with AI
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground tracking-tight mb-4">
            VibeCoded{" "}
            <span className="gradient-text">Academy</span>
          </h1>

          <p className="text-lg sm:text-xl text-muted max-w-2xl mx-auto mb-8">
            Master AI-assisted development with structured courses taught by
            experienced builders
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-primary" />
              {totalStudents.toLocaleString()}+ students
            </span>
            <span className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-primary" />
              {totalModules} modules
            </span>
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
              4.8+ average rating
            </span>
          </div>
        </div>
      </section>

      {/* All Courses Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <SectionHeader
          label="Courses"
          title="All Courses"
          description="From your first line of code to production-ready applications — choose the path that fits your level."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      {/* Social Proof / Stats Section */}
      <section className="border-t border-border bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
              Join{" "}
              <span className="gradient-text">9,000+</span>{" "}
              students learning to build with AI
            </h2>
            <p className="text-lg text-muted max-w-2xl mx-auto">
              Our students have gone from zero coding experience to shipping
              real products used by thousands of people.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card hover={false} className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-primary-light mx-auto mb-3">
                <Users className="w-6 h-6 text-primary" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {totalStudents.toLocaleString()}+
              </p>
              <p className="text-sm text-muted">Students enrolled</p>
            </Card>

            <Card hover={false} className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-amber-50 mx-auto mb-3">
                <Star className="w-6 h-6 text-amber-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">4.8</p>
              <p className="text-sm text-muted">Average rating</p>
            </Card>

            <Card hover={false} className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 mx-auto mb-3">
                <BookOpen className="w-6 h-6 text-emerald-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {totalLessons}+
              </p>
              <p className="text-sm text-muted">Hands-on lessons</p>
            </Card>

            <Card hover={false} className="text-center">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-violet-50 mx-auto mb-3">
                <Zap className="w-6 h-6 text-violet-500" />
              </div>
              <p className="text-2xl font-bold text-foreground">
                {courses.length}
              </p>
              <p className="text-sm text-muted">Expert-led courses</p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
