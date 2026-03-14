import Link from "next/link";
import { courses } from "@/data/courses";

export default function AcademyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-2">
          Academy
        </h1>
        <p className="text-lg text-muted mb-12">
          Structured courses for learning to build software with AI tools.
        </p>

        <div className="divide-y divide-border border-t border-border">
          {courses.map((course) => (
            <div key={course.id} className="py-6 sm:py-8">
              <Link
                href={`/academy/${course.slug}`}
                className="text-xl font-semibold text-foreground hover:text-primary transition-colors"
              >
                {course.title}
              </Link>
              <p className="text-muted mt-1 mb-3">{course.subtitle}</p>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted mb-3">
                <span>{course.instructor}</span>
                <span className="capitalize">{course.level}</span>
                <span>{course.duration}</span>
                <span className="text-foreground font-medium">
                  ${course.price}
                </span>
              </div>
              <Link
                href={`/academy/${course.slug}`}
                className="text-sm font-medium text-primary hover:text-primary-hover transition-colors"
              >
                View course &rarr;
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
