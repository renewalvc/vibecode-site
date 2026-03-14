import Link from "next/link";
import { Sparkles } from "lucide-react";

const footerLinks = {
  Product: [
    { name: "Showcase", href: "/showcase" },
    { name: "Podcast", href: "/podcast" },
    { name: "Newsletter", href: "/newsletter" },
    { name: "Academy", href: "/academy" },
  ],
  Learn: [
    { name: "Getting Started", href: "/guides" },
    { name: "Tutorials", href: "/learn" },
    { name: "Claude Code Setup", href: "/guides/install-claude-code" },
    { name: "Best Practices", href: "/learn/ai-coding-best-practices" },
  ],
  Community: [
    { name: "Submit Your Project", href: "/showcase" },
    { name: "Twitter / X", href: "#" },
    { name: "Discord", href: "#" },
    { name: "YouTube", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg gradient-bg flex items-center justify-center shadow-sm">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
              <span className="text-lg font-bold text-foreground">
                Vibe<span className="gradient-text">Coded</span>
              </span>
            </Link>
            <p className="text-sm text-muted max-w-xs">
              Discover, learn, and build amazing software with AI-assisted
              development. Join the vibe coding revolution.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3 className="text-sm font-semibold text-foreground mb-4">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted hover:text-foreground transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted">
            &copy; {new Date().getFullYear()} VibeCoded. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link
              href="#"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
