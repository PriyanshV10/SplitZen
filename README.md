# SplitZen 💸

SplitZen is the smartest and simplest way to track shared expenses, manage bills effortlessly, and settle up with ease. Never worry about who owes what, whether you're living with roommates, traveling with friends, or managing family expenses.

![SplitZen Hero](public/images/hero.png)

## 🌟 Features

- **Dashboard**: Get a comprehensive view of your total balances, what you owe, and what is owed to you.
- **Groups**: Create groups for trips, apartments, or events to keep related expenses organized.
- **Expense Tracking**: Easily add expenses, select who paid, and split costs evenly, by percentages, or by exact amounts.
- **Settlements**: Record payments and settle debts easily.
- **Real-time Sync**: Powered by Convex, all your expenses and balances update in real-time across all your devices.
- **Secure Authentication**: Seamless login and user management with Clerk.

## 💻 Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: TypeScript / JavaScript
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Authentication**: [Clerk](https://clerk.com/)
- **Database & Backend**: [Convex](https://www.convex.dev/) (Serverless Real-time Backend)
- **Background Jobs**: [Inngest](https://www.inngest.com/)
- **Emails**: [Resend](https://resend.com/)

## 🚀 Quick Start

Ensure you have [Node.js](https://nodejs.org/) installed.

1. **Clone the repository**:
   ```bash
   git clone https://github.com/PriyanshV10/SplitZen.git
   cd splitr
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up Environment Variables**: Create a `.env.local` file.
   ```env
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
   CLERK_SECRET_KEY=...
   NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
   NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
   NEXT_PUBLIC_CONVEX_URL=...
   INNGEST_EVENT_KEY=...
   INNGEST_SIGNING_KEY=...
   RESEND_API_KEY=...
   ```

4. **Run the development servers**:
   Start the frontend:
   ```bash
   npm run dev
   ```
   Start Convex (backend):
   ```bash
   npx convex dev
   ```
   Start Inngest (background jobs):
   ```bash
   npx inngest-cli@latest dev
   ```

## 📚 Complete Documentation

For an in-depth dive into how SplitZen is built and deployed, please check out the complete documentation in the `docs/` folder:

- 🏗 **[Architecture & Tech Stack](docs/architecture.md)**: Deep dive into the project structure and frameworks used.
- ⚙️ **[Getting Started & Setup](docs/setup.md)**: Extended setup guide and deployment instructions.
- 📊 **[Database Schema](docs/database.md)**: Complete details of the Convex database design.
- ✨ **[Features Overview](docs/features.md)**: Full breakdown of every capability in the app.

---
Made with ❤️ by [Priyansh](https://github.com/PriyanshV10)
