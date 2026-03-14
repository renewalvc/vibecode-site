"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Star,
  Users,
  Clock,
  BookOpen,
  ChevronDown,
  ChevronUp,
  Check,
  ArrowRight,
  ArrowLeft,
  Shield,
  Award,
  Play,
  GraduationCap,
  CheckCircle,
} from "lucide-react";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import { type Course, type CourseModule } from "@/data/courses";

/* WHY: Hardcoded FAQ — these questions apply to all courses and reduce
   support burden by addressing the most common pre-purchase concerns. */
const FAQ_ITEMS = [
  {
    question: "Do I need any coding experience?",
    answer:
      "It depends on the course level. Our beginner courses require zero prior experience. Intermediate and advanced courses assume you can navigate basic web development concepts.",
  },
  {
    question: "How long do I have access to the course?",
    answer:
      "You get lifetime access. Once you enroll, you can revisit the material anytime. This includes any future updates we make to the course content.",
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "Yes! We offer a 30-day, no-questions-asked money-back guarantee. If the course isn't the right fit, just email us for a full refund.",
  },
  {
    question: "What tools do I need?",
    answer:
      "A computer (Mac, Windows, or Linux), a modern web browser, and a Claude Code subscription. Each course includes detailed setup instructions in the first module.",
  },
  {
    question: "Can I get help if I'm stuck?",
    answer:
      "Absolutely. Every course includes access to a private community where you can ask questions, share progress, and get help from instructors and fellow students.",
  },
];

function StarRating({ rating, reviews }: { rating: number; reviews: number }) {
  const fullStars = Math.floor(rating);

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${
              i < fullStars
                ? "text-amber-400 fill-amber-400"
                : "text-gray-200"
            }`}
          />
        ))}
      </div>
      <span className="text-base font-semibold text-foreground">{rating}</span>
      <span className="text-sm text-muted">
        ({reviews.toLocaleString()} reviews)
      </span>
    </div>
  );
}

function ModuleAccordion({
  module,
  index,
  isOpen,
  onToggle,
}: {
  module: CourseModule;
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 sm:p-5 bg-surface hover:bg-secondary transition-colors cursor-pointer"
      >
        <div className="flex items-center gap-3 text-left">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary-light text-primary text-sm font-bold">
            {index + 1}
          </span>
          <div>
            <h4 className="font-semibold text-foreground">{module.title}</h4>
            <p className="text-sm text-muted">
              {module.lessons.length} lessons &middot; {module.duration}
            </p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-muted shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted shrink-0" />
        )}
      </button>

      {isOpen && (
        <div className="border-t border-border bg-card">
          <ul className="divide-y divide-border">
            {module.lessons.map((lesson, lessonIdx) => (
              <li
                key={lessonIdx}
                className="flex items-center gap-3 px-4 sm:px-5 py-3 text-sm"
              >
                <Play className="w-4 h-4 text-muted shrink-0" />
                <span className="text-foreground">{lesson}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function FAQItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left cursor-pointer"
      >
        <span className="font-medium text-foreground pr-4">{question}</span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-muted shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-muted shrink-0" />
        )}
      </button>
      {isOpen && (
        <p className="pb-4 text-sm text-muted leading-relaxed">{answer}</p>
      )}
    </div>
  );
}

export default function CourseDetail({ course }: { course: Course }) {
  const [openModules, setOpenModules] = useState<Set<number>>(new Set([0]));
  const [openFAQs, setOpenFAQs] = useState<Set<number>>(new Set());
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const totalLessons = course.modules.reduce(
    (sum, mod) => sum + mod.lessons.length,
    0
  );
  const discountPercent = Math.round(
    ((course.originalPrice - course.price) / course.originalPrice) * 100
  );

  function toggleModule(index: number) {
    setOpenModules((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  function toggleFAQ(index: number) {
    setOpenFAQs((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  }

  async function handleEnroll() {
    setIsCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId: course.id }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Something went wrong. Please try again.");
      }
    } catch {
      alert("Failed to start checkout. Please try again.");
    } finally {
      setIsCheckoutLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Back Navigation */}
      <div className="border-b border-border bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3">
          <Link
            href="/academy"
            className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Academy
          </Link>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-purple-600 to-violet-700" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(255,255,255,0.1)_0%,_transparent_60%)]" />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Left: Course Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-white/20 text-white border-0 capitalize">
                  {course.level}
                </Badge>
                {course.featured && (
                  <Badge className="bg-amber-400 text-amber-900 border-0 font-semibold">
                    <Award className="w-3 h-3 mr-1" />
                    Featured
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">
                {course.title}
              </h1>
              <p className="text-lg sm:text-xl text-white/80 mb-6">
                {course.subtitle}
              </p>

              <div className="flex items-center gap-2 mb-6">
                <StarRating rating={course.rating} reviews={course.reviews} />
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-white/70">
                <span className="flex items-center gap-1.5">
                  <Users className="w-4 h-4" />
                  {course.enrolled.toLocaleString()} students
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {course.duration}
                </span>
                <span className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  {course.modules.length} modules &middot; {totalLessons}{" "}
                  lessons
                </span>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3 mt-8 pt-6 border-t border-white/20">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-semibold">
                  {course.instructor
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-white font-medium">{course.instructor}</p>
                  <p className="text-sm text-white/60">Instructor</p>
                </div>
              </div>
            </div>

            {/* Right: Price Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-xl p-6">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-3xl font-bold text-foreground">
                    ${course.price}
                  </span>
                  <span className="text-lg text-muted line-through">
                    ${course.originalPrice}
                  </span>
                </div>
                <Badge variant="accent" className="mb-4">
                  {discountPercent}% off — limited time
                </Badge>

                <Button
                  size="lg"
                  className="w-full mb-3"
                  onClick={handleEnroll}
                  disabled={isCheckoutLoading}
                >
                  {isCheckoutLoading ? "Loading..." : "Enroll Now"}
                  {!isCheckoutLoading && <ArrowRight className="w-5 h-5" />}
                </Button>

                <p className="text-xs text-center text-muted mb-4">
                  30-day money-back guarantee
                </p>

                <div className="border-t border-border pt-4 space-y-3">
                  <p className="text-sm font-medium text-foreground">
                    This course includes:
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-sm text-muted">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      {course.modules.length} modules, {totalLessons} lessons
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      Lifetime access
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      Private community access
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      Certificate of completion
                    </li>
                    <li className="flex items-center gap-2 text-sm text-muted">
                      <CheckCircle className="w-4 h-4 text-accent shrink-0" />
                      Future content updates
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column — Main content */}
          <div className="lg:col-span-2 space-y-12">
            {/* About This Course */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">
                About This Course
              </h2>
              <p className="text-muted leading-relaxed">
                {course.longDescription}
              </p>
            </section>

            {/* What You'll Learn */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                What You&apos;ll Learn
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {course.modules.map((mod, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 rounded-lg bg-surface"
                  >
                    <Check className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                    <span className="text-sm text-foreground">{mod.title}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Course Curriculum */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">
                  Course Curriculum
                </h2>
                <span className="text-sm text-muted">
                  {course.modules.length} modules &middot; {totalLessons}{" "}
                  lessons
                </span>
              </div>
              <div className="space-y-3">
                {course.modules.map((mod, idx) => (
                  <ModuleAccordion
                    key={idx}
                    module={mod}
                    index={idx}
                    isOpen={openModules.has(idx)}
                    onToggle={() => toggleModule(idx)}
                  />
                ))}
              </div>
            </section>

            {/* Instructor Bio */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Your Instructor
              </h2>
              <Card hover={false}>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-purple-500 flex items-center justify-center text-white font-bold text-xl shrink-0">
                    {course.instructor
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {course.instructor}
                    </h3>
                    <p className="text-sm text-muted leading-relaxed">
                      {course.instructorBio}
                    </p>
                  </div>
                </div>
              </Card>
            </section>

            {/* FAQ */}
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">
                Frequently Asked Questions
              </h2>
              <Card hover={false}>
                {FAQ_ITEMS.map((item, idx) => (
                  <FAQItem
                    key={idx}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openFAQs.has(idx)}
                    onToggle={() => toggleFAQ(idx)}
                  />
                ))}
              </Card>
            </section>
          </div>

          {/* Right Column — Sticky sidebar on desktop */}
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-8 space-y-6">
              {/* Course Stats Card */}
              <Card hover={false}>
                <h3 className="font-semibold text-foreground mb-4">
                  Course Details
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted">
                      <GraduationCap className="w-4 h-4" />
                      Level
                    </span>
                    <span className="font-medium text-foreground capitalize">
                      {course.level}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted">
                      <Clock className="w-4 h-4" />
                      Duration
                    </span>
                    <span className="font-medium text-foreground">
                      {course.duration}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted">
                      <BookOpen className="w-4 h-4" />
                      Modules
                    </span>
                    <span className="font-medium text-foreground">
                      {course.modules.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted">
                      <Play className="w-4 h-4" />
                      Lessons
                    </span>
                    <span className="font-medium text-foreground">
                      {totalLessons}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted">
                      <Users className="w-4 h-4" />
                      Enrolled
                    </span>
                    <span className="font-medium text-foreground">
                      {course.enrolled.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-muted">
                      <Star className="w-4 h-4" />
                      Rating
                    </span>
                    <span className="font-medium text-foreground">
                      {course.rating} / 5.0
                    </span>
                  </div>
                </div>
              </Card>

              {/* Money-back Guarantee */}
              <Card hover={false} className="bg-emerald-50 border-emerald-200">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-emerald-900 mb-1">
                      30-Day Money-Back Guarantee
                    </h4>
                    <p className="text-sm text-emerald-700 leading-relaxed">
                      Not satisfied? Get a full refund within 30 days, no
                      questions asked. We want you to learn risk-free.
                    </p>
                  </div>
                </div>
              </Card>

              {/* Tags */}
              <Card hover={false}>
                <h3 className="font-semibold text-foreground mb-3">Topics</h3>
                <div className="flex flex-wrap gap-2">
                  {course.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom CTA Banner */}
      <section className="border-t border-border bg-surface">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Ready to start learning?
          </h2>
          <p className="text-muted mb-6 max-w-xl mx-auto">
            Join {course.enrolled.toLocaleString()} students already enrolled in{" "}
            {course.title}. Start building today.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Button size="lg" onClick={handleEnroll} disabled={isCheckoutLoading}>
              {isCheckoutLoading ? "Loading..." : `Enroll for $${course.price}`}
              {!isCheckoutLoading && <ArrowRight className="w-5 h-5" />}
            </Button>
          </div>
          <p className="text-xs text-muted mt-3">
            30-day money-back guarantee &middot; Lifetime access
          </p>
        </div>
      </section>
    </div>
  );
}
