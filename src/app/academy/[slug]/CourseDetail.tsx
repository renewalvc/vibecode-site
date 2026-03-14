"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, ArrowLeft, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
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
      "Yes. We offer a 30-day, no-questions-asked money-back guarantee. If the course isn't the right fit, just email us for a full refund.",
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
          <span className="text-sm font-medium text-muted w-6 text-right shrink-0">
            {index + 1}.
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
        <div className="border-t border-border">
          <ul className="divide-y divide-border">
            {module.lessons.map((lesson, lessonIdx) => (
              <li
                key={lessonIdx}
                className="px-4 sm:px-5 py-3 text-sm text-foreground pl-14 sm:pl-16"
              >
                {lesson}
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
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        {/* Back link */}
        <Link
          href="/academy"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Academy
        </Link>

        {/* Title and subtitle */}
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-2">
          {course.title}
        </h1>
        <p className="text-lg text-muted mb-4">{course.subtitle}</p>

        {/* Key details */}
        <p className="text-sm text-muted mb-8">
          <span className="capitalize">{course.level}</span>
          {" · "}
          {course.duration}
          {" · "}
          <span className="text-foreground font-medium">${course.price}</span>
        </p>

        {/* Instructor */}
        <section className="mb-12">
          <h2 className="text-sm font-medium text-muted uppercase tracking-wide mb-2">
            Instructor
          </h2>
          <p className="text-foreground font-medium mb-1">{course.instructor}</p>
          <p className="text-sm text-muted leading-relaxed">
            {course.instructorBio}
          </p>
        </section>

        {/* About */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            About this course
          </h2>
          <p className="text-muted leading-relaxed">{course.longDescription}</p>
        </section>

        {/* Curriculum */}
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-foreground mb-6">
            Curriculum
          </h2>
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

        {/* Enroll */}
        <div className="mb-12">
          <Button
            size="lg"
            onClick={handleEnroll}
            disabled={isCheckoutLoading}
          >
            {isCheckoutLoading
              ? "Loading..."
              : `Enroll for $${course.price}`}
            {!isCheckoutLoading && <ArrowRight className="w-5 h-5" />}
          </Button>
        </div>

        {/* FAQ */}
        <section>
          <h2 className="text-xl font-semibold text-foreground mb-4">
            Frequently asked questions
          </h2>
          <div className="border-t border-border">
            {FAQ_ITEMS.map((item, idx) => (
              <FAQItem
                key={idx}
                question={item.question}
                answer={item.answer}
                isOpen={openFAQs.has(idx)}
                onToggle={() => toggleFAQ(idx)}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
