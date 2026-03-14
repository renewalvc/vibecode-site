"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, Sparkles } from "lucide-react";
import Button from "@/components/ui/Button";

const navigation = [
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
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-foreground">
              Vibe<span className="gradient-text">Coded</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors",
                  pathname === item.href || pathname?.startsWith(item.href + "/")
                    ? "text-primary bg-primary-light"
                    : "text-muted hover:text-foreground hover:bg-secondary"
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link href="/newsletter">
              <Button variant="outline" size="sm">
                Newsletter
              </Button>
            </Link>
            <Link href="/academy">
              <Button size="sm">Start Learning</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="w-5 h-5 text-foreground" />
            ) : (
              <Menu className="w-5 h-5 text-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white">
          <div className="px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                  pathname === item.href || pathname?.startsWith(item.href + "/")
                    ? "text-primary bg-primary-light"
                    : "text-muted hover:text-foreground hover:bg-secondary"
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-3 space-y-2 border-t border-border mt-3">
              <Link href="/newsletter" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" size="sm" className="w-full">
                  Newsletter
                </Button>
              </Link>
              <Link href="/academy" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="w-full">
                  Start Learning
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
