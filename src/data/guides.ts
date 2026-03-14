export interface Guide {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: string;
  icon: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  lastUpdated: string;
  category: string;
}

export const guides: Guide[] = [
  {
    id: "1",
    slug: "install-claude-code",
    title: "Install Claude Code on Your Machine",
    description: "Get Claude Code up and running on macOS, Windows, or Linux in under 5 minutes. No prior experience required.",
    content: `
## What is Claude Code?

Claude Code is Anthropic's official CLI tool that lets you use Claude directly in your terminal. It can read your codebase, edit files, run commands, and help you build entire applications through natural language conversation.

## Prerequisites

- **Node.js 18+** installed on your machine
- A terminal application (Terminal on macOS, CMD/PowerShell on Windows, or any Linux terminal)
- An Anthropic API key (we'll show you how to get one)

## Step 1: Install Node.js

If you don't have Node.js installed, download it from [nodejs.org](https://nodejs.org). Choose the LTS version.

Verify installation:
\`\`\`bash
node --version  # Should show v18 or higher
npm --version   # Should show v9 or higher
\`\`\`

## Step 2: Install Claude Code

Open your terminal and run:

\`\`\`bash
npm install -g @anthropic-ai/claude-code
\`\`\`

This installs Claude Code globally so you can use it from any directory.

## Step 3: Get Your API Key

1. Visit [console.anthropic.com](https://console.anthropic.com)
2. Create an account or sign in
3. Navigate to **API Keys**
4. Click **Create Key** and copy it

## Step 4: Authenticate

Run Claude Code for the first time:

\`\`\`bash
claude
\`\`\`

It will prompt you to enter your API key. Paste it in and press Enter.

## Step 5: Start Building!

Navigate to any project directory and start a conversation:

\`\`\`bash
cd my-project
claude
\`\`\`

Try asking: "What does this project do?" and Claude will analyze your codebase and explain it.

## Tips for Getting Started

- **Be specific** in your requests — "Add a login page with email and password fields" is better than "Add auth"
- **Start small** — try editing a single file before attempting multi-file changes
- **Review changes** — Claude will show you what it plans to change before making edits
- **Use git** — always work on a branch so you can easily revert changes
    `,
    icon: "terminal",
    difficulty: "beginner",
    estimatedTime: "5 min",
    lastUpdated: "2026-03-01",
    category: "Getting Started",
  },
  {
    id: "2",
    slug: "first-app-with-claude-code",
    title: "Build Your First App with Claude Code",
    description: "Walk through building a complete to-do app from scratch using nothing but natural language prompts in Claude Code.",
    content: `
## Overview

In this guide, you'll build a fully functional to-do application using Claude Code. No coding experience needed — just describe what you want and Claude will write the code for you.

## What You'll Build

A clean, responsive to-do app with:
- Add, complete, and delete tasks
- Filter by status (all, active, completed)
- Persistent storage using localStorage
- Beautiful UI with Tailwind CSS

## Step 1: Create Your Project

\`\`\`bash
mkdir my-todo-app
cd my-todo-app
claude
\`\`\`

## Step 2: Scaffold the App

Tell Claude:

> "Create a new Next.js app with TypeScript and Tailwind CSS. Set up the project structure."

Claude will run the necessary commands and set everything up.

## Step 3: Build the UI

Tell Claude:

> "Build a to-do app on the homepage. I want a clean, modern design with an input field to add tasks, a list showing all tasks with checkboxes to mark them complete, and a delete button for each task. Use Tailwind CSS for styling with an indigo color scheme."

## Step 4: Add Functionality

Tell Claude:

> "Add filtering buttons (All, Active, Completed) above the task list. Also save tasks to localStorage so they persist across page reloads."

## Step 5: Polish the Design

Tell Claude:

> "Make the design more polished — add hover effects, transitions, a task count at the bottom, and make sure it looks good on mobile."

## Step 6: Run and Test

\`\`\`bash
npm run dev
\`\`\`

Open http://localhost:3000 and try your app!

## Key Takeaways

- You built a complete app without writing a single line of code manually
- Claude Code understands context — each prompt builds on the previous one
- Being descriptive about design helps Claude create better-looking UIs
- Always test the output and iterate
    `,
    icon: "rocket",
    difficulty: "beginner",
    estimatedTime: "15 min",
    lastUpdated: "2026-03-01",
    category: "Getting Started",
  },
  {
    id: "3",
    slug: "claude-code-terminal-setup",
    title: "Optimize Your Terminal for Claude Code",
    description: "Set up your terminal environment for the best Claude Code experience — themes, aliases, and productivity tips.",
    content: `
## Why Terminal Setup Matters

Claude Code runs in your terminal, so having a well-configured terminal environment makes everything smoother. This guide covers the optimal setup.

## Recommended Terminal Apps

- **macOS**: iTerm2 or the built-in Terminal (with upgrades)
- **Windows**: Windows Terminal
- **Linux**: Alacritty or Kitty

## Step 1: Install a Better Shell (Optional)

Zsh with Oh My Zsh is the gold standard:

\`\`\`bash
# macOS (zsh is default, just add Oh My Zsh)
sh -c "$(curl -fsSL https://raw.github.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
\`\`\`

## Step 2: Helpful Aliases

Add these to your \`~/.zshrc\` or \`~/.bashrc\`:

\`\`\`bash
# Quick access to Claude Code
alias cc="claude"
alias ccr="claude --resume"

# Start Claude Code with a specific model
alias ccs="claude --model claude-sonnet-4-6"
alias cco="claude --model claude-opus-4-6"
\`\`\`

## Step 3: Configure Git (Essential)

Claude Code works best with git. Make sure it's set up:

\`\`\`bash
git config --global user.name "Your Name"
git config --global user.email "your@email.com"
git config --global init.defaultBranch main
\`\`\`

## Step 4: Create a CLAUDE.md File

In your project root, create a \`CLAUDE.md\` file with instructions for Claude:

\`\`\`markdown
# Project Instructions

- This project uses Next.js 14 with App Router
- Use Tailwind CSS for all styling
- Follow the existing code patterns in src/
- Run tests with: npm test
- Run the dev server with: npm run dev
\`\`\`

Claude reads this file automatically and follows the instructions.

## Step 5: Useful Keyboard Shortcuts

- **Escape**: Cancel current Claude operation
- **Ctrl+C**: Force stop
- **Up Arrow**: Recall previous prompts

## Pro Tips

- Keep your terminal window wide — Claude's output is easier to read
- Use tmux or split panes to see Claude's changes alongside your running app
- Commit frequently so you can easily roll back
    `,
    icon: "settings",
    difficulty: "beginner",
    estimatedTime: "10 min",
    lastUpdated: "2026-02-28",
    category: "Getting Started",
  },
  {
    id: "4",
    slug: "prompting-strategies",
    title: "Effective Prompting Strategies for Claude Code",
    description: "Learn the prompting techniques that get the best results from Claude Code — from simple edits to complex multi-file features.",
    content: `
## The Art of Prompting

Getting great results from Claude Code is about clear communication. Here are proven strategies that work.

## Strategy 1: Be Specific About What You Want

**Bad prompt**: "Make the page look better"

**Good prompt**: "Redesign the homepage hero section with a gradient background from indigo to purple, a large bold headline, a subtitle in lighter text, and a CTA button that says 'Get Started' with a hover effect"

## Strategy 2: Describe the User Experience

Instead of describing code, describe the experience:

> "When a user clicks the 'Add to Cart' button, show a subtle animation of the item flying toward the cart icon in the header. The cart count should update with a bounce animation. If the item is already in the cart, increment the quantity instead of adding a duplicate."

## Strategy 3: Reference Existing Patterns

> "Create a new settings page that follows the same layout pattern as the existing profile page — sidebar navigation on the left, content area on the right, same card styling."

## Strategy 4: Break Complex Features into Steps

Instead of: "Build a complete authentication system"

Try:
1. "Set up a login page with email and password fields"
2. "Add form validation — email must be valid, password must be 8+ characters"
3. "Create the API endpoint for authentication"
4. "Add session management with JWT tokens"
5. "Create a protected route wrapper component"

## Strategy 5: Include Constraints

> "Add a search feature to the users table. Requirements:
> - Debounce input by 300ms
> - Search across name and email fields
> - Show 'No results found' state
> - Don't add any new dependencies"

## Strategy 6: Ask for Explanations

> "Explain how the authentication flow works in this codebase, then suggest improvements"

This helps you understand before changing.

## Common Mistakes to Avoid

- Don't ask Claude to "fix everything" — be specific about what's broken
- Don't give contradictory instructions
- Don't skip reviewing the changes Claude makes
- Don't forget to test after each change
    `,
    icon: "message-square",
    difficulty: "intermediate",
    estimatedTime: "10 min",
    lastUpdated: "2026-02-25",
    category: "Best Practices",
  },
  {
    id: "5",
    slug: "deploying-to-railway",
    title: "Deploy Your Vibe-Coded App to Railway",
    description: "Take your locally-built app and deploy it to Railway for the world to see — with custom domains, environment variables, and CI/CD.",
    content: `
## Why Railway?

Railway makes deployment simple — connect your GitHub repo and it handles the rest. No Docker knowledge needed, no complex configs.

## Prerequisites

- A GitHub account
- Your project pushed to a GitHub repository
- A Railway account (free tier available)

## Step 1: Push to GitHub

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
gh repo create my-app --public --push
\`\`\`

## Step 2: Connect to Railway

1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click **New Project**
3. Select **Deploy from GitHub repo**
4. Choose your repository

## Step 3: Configure Environment Variables

In Railway's dashboard:
1. Click on your service
2. Go to **Variables**
3. Add your environment variables (API keys, database URLs, etc.)

## Step 4: Set Up Your Domain

1. Go to **Settings** → **Networking**
2. Click **Generate Domain** for a free \`.up.railway.app\` domain
3. Or add a custom domain by updating your DNS records

## Step 5: Automatic Deployments

Railway automatically deploys when you push to your main branch. Every git push triggers a new deployment.

## Tips

- Use Railway's built-in PostgreSQL or Redis if you need databases
- Monitor your usage on the free tier — it includes $5/month in credits
- Set up preview environments for pull requests
- Use \`railway logs\` CLI command to debug issues
    `,
    icon: "cloud",
    difficulty: "intermediate",
    estimatedTime: "15 min",
    lastUpdated: "2026-02-20",
    category: "Deployment",
  },
  {
    id: "6",
    slug: "adding-payments-stripe",
    title: "Add Payments to Your App with Stripe",
    description: "Integrate Stripe payments into your vibe-coded app — from simple one-time payments to subscription billing.",
    content: `
## Overview

Adding payments is one of the most powerful things you can do with vibe coding. This guide shows you how to integrate Stripe.

## Step 1: Create a Stripe Account

Go to [stripe.com](https://stripe.com) and create an account. You can use test mode to build without real charges.

## Step 2: Get Your API Keys

In the Stripe Dashboard:
1. Click **Developers** → **API Keys**
2. Copy your **Publishable key** and **Secret key**
3. Add them to your \`.env.local\`:

\`\`\`
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
\`\`\`

## Step 3: Install Stripe

\`\`\`bash
npm install stripe @stripe/stripe-js
\`\`\`

## Step 4: Create a Checkout Session API Route

Ask Claude Code:

> "Create an API route at /api/checkout that creates a Stripe checkout session. Accept a priceId in the request body and redirect to Stripe's hosted checkout page. Include success and cancel URLs."

## Step 5: Add a Buy Button

Ask Claude Code:

> "Add a 'Buy Now' button to the pricing card that calls our /api/checkout endpoint with the correct priceId and redirects to Stripe checkout."

## Step 6: Handle Success

Ask Claude Code:

> "Create a /success page that thanks the user for their purchase and provides next steps."

## Testing

Use Stripe's test card: \`4242 4242 4242 4242\` with any future date and any CVC.

## Going Live

1. Complete Stripe's activation checklist
2. Switch from test keys to live keys
3. Update your environment variables in production
    `,
    icon: "credit-card",
    difficulty: "intermediate",
    estimatedTime: "20 min",
    lastUpdated: "2026-02-15",
    category: "Features",
  },
];

export const guideCategories = ["All", "Getting Started", "Best Practices", "Deployment", "Features"];
