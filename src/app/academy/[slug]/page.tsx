import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { courses } from "@/data/courses";
import CourseDetail from "./CourseDetail";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    return { title: "Course Not Found — VibeCoded" };
  }

  return {
    title: `${course.title} — VibeCoded Academy`,
    description: course.subtitle,
  };
}

export default async function CoursePage({ params }: PageProps) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);

  if (!course) {
    notFound();
  }

  return <CourseDetail course={course} />;
}
