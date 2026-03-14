import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { courses } from "@/data/courses";

export default function AcademyPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="border-b border-border">
        <div className="max-w-5xl mx-auto px-6 sm:px-8 py-16">
          <h1 className="text-3xl font-bold text-foreground">Academy</h1>
          <p className="text-muted mt-2 max-w-lg">
            Structured courses for learning to build software with AI tools.
            From your first app to production-grade products.
          </p>
        </div>
      </div>

      {/* Course Grid */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course) => (
            <Link
              key={course.id}
              href={`/academy/${course.slug}`}
              className="group bg-white rounded-xl border border-border p-6 sm:p-8 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
            >
              <div className="flex items-center gap-3 text-xs text-muted mb-4">
                <span className="capitalize px-2 py-0.5 rounded-full bg-surface border border-border">
                  {course.level}
                </span>
                <span>{course.duration}</span>
                <span>&middot;</span>
                <span>
                  {course.modules.length} modules,{" "}
                  {course.modules.reduce((s, m) => s + m.lessons.length, 0)}{" "}
                  lessons
                </span>
              </div>

              <h2 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {course.title}
              </h2>
              <p className="mt-1 text-sm text-muted">{course.subtitle}</p>

              <p className="mt-4 text-sm text-muted line-clamp-2 leading-relaxed">
                {course.description}
              </p>

              <div className="mt-6 pt-4 border-t border-border flex items-center justify-between">
                <p className="text-sm text-muted">by {course.instructor}</p>
                <div className="flex items-center gap-3">
                  <span className="text-lg font-semibold text-foreground">
                    ${course.price}
                  </span>
                  <ArrowRight className="w-4 h-4 text-muted group-hover:text-primary transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
