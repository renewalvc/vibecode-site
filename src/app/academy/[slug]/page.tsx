import { notFound } from "next/navigation";
import { courses } from "@/data/courses";
import CourseDetail from "./CourseDetail";

interface CoursePageProps {
  params: Promise<{ slug: string }>;
}

// WHY: generateStaticParams pre-renders all known course pages at build time
// for fast initial loads and SEO.
export function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export default async function CoursePage({ params }: CoursePageProps) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  return <CourseDetail course={course} />;
}
