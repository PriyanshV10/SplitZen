# 🏗 Architecture & Tech Stack

SplitZen is built using a modern, scalable, and fully serverless architecture.

## 💻 Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (Using the App Router for server components, streaming, and modern routing)
- **Language**: TypeScript / JavaScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) for utility-first styling.
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/) & [Radix UI](https://www.radix-ui.com/) for accessible, customizable components.
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) combined with [Zod](https://zod.dev/) for robust, type-safe form validation.

### Backend & Infrastructure
- **Authentication**: [Clerk](https://clerk.com/) handles secure user authentication, session management, and syncing user states.
- **Database & Real-time Backend**: [Convex](https://www.convex.dev/) provides a serverless database and API layer that pushes real-time updates directly to the frontend React components via WebSockets.
- **Background Jobs**: [Inngest](https://www.inngest.com/) manages reliable background functions, delayed jobs, and event-driven architectures (e.g., sending email digests).
- **Emails**: [Resend](https://resend.com/) powers transactional email delivery.

## 📂 Project Structure

Here is a high-level overview of the repository structure:

```text
/splitr
├── app/                  # Next.js App Router (Pages, Layouts, API Routes)
│   ├── (auth)/           # Authentication routes (managed by Clerk)
│   ├── (main)/           # Main application routes (Dashboard, Groups, Expenses)
│   ├── api/              # API Routes (e.g., for Inngest endpoints)
│   ├── globals.css       # Global styles and Tailwind configuration
│   └── ...
├── components/           # Reusable React components
│   ├── ui/               # Base UI components (shadcn/ui)
│   └── ...               # Custom application components
├── convex/               # Convex backend directory
│   ├── schema.js         # Database schema definition
│   ├── expenses.js       # API endpoints for expenses
│   ├── groups.js         # API endpoints for groups
│   ├── settlements.js    # API endpoints for settlements
│   ├── users.js          # API endpoints for users
│   └── ...
├── docs/                 # Detailed markdown documentation
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions, constants, and shared logic
├── public/               # Static assets like images (hero.png) and favicons
├── middleware.js         # Next.js middleware (usually configuring Clerk auth)
└── package.json          # Dependencies and scripts
```
