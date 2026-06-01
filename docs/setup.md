# 🚀 Getting Started & Setup

This guide will walk you through setting up SplitZen on your local machine and deploying it to production.

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- A package manager like npm, pnpm, or yarn
- Accounts for [Clerk](https://clerk.com/) (Auth), [Convex](https://www.convex.dev/) (DB), [Inngest](https://www.inngest.com/) (Background Jobs), and [Resend](https://resend.com/) (Emails)

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/PriyanshV10/SplitZen.git
   cd splitr
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

## Environment Variables

You must set up environment variables for the third-party services. Create a `.env.local` file in the root directory and add the following keys:

```env
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Convex Database
NEXT_PUBLIC_CONVEX_URL=your_convex_url

# Inngest Background Jobs
INNGEST_EVENT_KEY=your_inngest_event_key
INNGEST_SIGNING_KEY=your_inngest_signing_key

# Resend Emails
RESEND_API_KEY=your_resend_api_key
```

## Running the App Locally

SplitZen requires running a few processes concurrently for full functionality.

1. **Start the Next.js frontend**:
   ```bash
   npm run dev
   ```
   *Note: This uses turbopack for faster local development.*

2. **Start the Convex Backend**:
   In a separate terminal, deploy your schema and functions to your development Convex environment:
   ```bash
   npx convex dev
   ```

3. **Start the Inngest Dev Server**:
   In a separate terminal, run Inngest to handle local background job processing:
   ```bash
   npx inngest-cli@latest dev
   ```

Now, open [http://localhost:3000](http://localhost:3000) with your browser to see the app running.

## 🌍 Deployment

The easiest way to deploy this Next.js app is to use the [Vercel Platform](https://vercel.com/new).

### Steps:
1. Push your code to a GitHub repository.
2. Import the project into Vercel.
3. Configure the **Environment Variables** in your Vercel project settings using your production keys for Clerk, Convex, Inngest, and Resend.
4. For Convex, ensure you run `npx convex deploy` or set up automatic deployments via GitHub Actions to update your production database schema and functions.
5. Deploy the app.
