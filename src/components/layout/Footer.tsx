import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-100">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} VibeCoded
        </p>
        <nav className="flex flex-wrap items-center gap-6 text-xs text-gray-400">
          <Link href="/showcase" className="hover:text-gray-600 transition-colors">
            Showcase
          </Link>
          <Link href="/podcast" className="hover:text-gray-600 transition-colors">
            Podcast
          </Link>
          <Link href="/guides" className="hover:text-gray-600 transition-colors">
            Guides
          </Link>
          <Link href="/learn" className="hover:text-gray-600 transition-colors">
            Learn
          </Link>
          <Link href="/academy" className="hover:text-gray-600 transition-colors">
            Academy
          </Link>
          <Link href="/newsletter" className="hover:text-gray-600 transition-colors">
            Newsletter
          </Link>
        </nav>
      </div>
    </footer>
  );
}
