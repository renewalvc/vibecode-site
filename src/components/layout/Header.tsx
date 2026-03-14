"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, Sparkles } from "lucide-react";

const mainNav = [
  { name: "Showcase", href: "/showcase" },
  { name: "Podcast", href: "/podcast" },
  { name: "Guides", href: "/guides" },
  { name: "Learn", href: "/learn" },
  { name: "Academy", href: "/academy" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-primary flex items-center justify-center">
            <Sparkles className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-sm font-bold text-gray-900">VibeCoded</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {mainNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "px-3 py-1.5 text-sm rounded-md transition-colors",
                pathname === item.href || pathname?.startsWith(item.href + "/")
                  ? "text-primary font-medium"
                  : "text-gray-500 hover:text-gray-900"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <Link
          href="/newsletter"
          className="hidden md:block text-sm text-gray-500 hover:text-gray-900 transition-colors"
        >
          Newsletter
        </Link>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-1.5 rounded-md hover:bg-gray-100 transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? (
            <X className="w-5 h-5 text-gray-600" />
          ) : (
            <Menu className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-6 py-4 space-y-1">
          {mainNav.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={cn(
                "block px-3 py-2 text-sm rounded-md transition-colors",
                pathname === item.href || pathname?.startsWith(item.href + "/")
                  ? "text-primary font-medium bg-primary-light"
                  : "text-gray-600 hover:bg-gray-50"
              )}
            >
              {item.name}
            </Link>
          ))}
          <Link
            href="/newsletter"
            onClick={() => setMobileOpen(false)}
            className="block px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-md"
          >
            Newsletter
          </Link>
        </div>
      )}
    </header>
  );
}
