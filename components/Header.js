"use client";

import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import Link from "next/link";
import Image from "next/image";
import React from "react";
// import Theme from '@/components/theme'
import ModeToggle from "@/components/mode-toggle";
import { Button } from "@/components/ui/button";
import { useStoreUser } from "@/hooks/use-store-user";
import { BarLoader } from "react-spinners";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

const Header = () => {
  const { isLoading } = useStoreUser();
  const path = usePathname();

  return (
    <header className="fixed top-0 z-50 w-full border-b backdrop-blur bg-white/95 supports-[backdrop-filter]:bg-white/60 dark:bg-[#0a0a0a]/90 dark:supports-[backdrop-filter]:bg-[#0a0a0a]/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/logo.png"
            alt="Spiltr Logo"
            width={200}
            height={60}
            className="h-10 w-auto object-contain"
          />
        </Link>

        {path === "/" && (
          <div className="hidden md:flex items-center gap-6">
            <Link
              href={"#features"}
              className="text-sm font-medium hover:text-violet-600 dark:hover:text-violet-500 transition"
            >
              Features
            </Link>
            <Link
              href={"#how-it-works"}
              className="text-sm font-medium hover:text-violet-600 dark:hover:text-violet-500 transition"
            >
              How it works
            </Link>
          </div>
        )}

        <div className="flex items-center gap-4">
          {/* <Theme/> */}
          <ModeToggle />
          <Authenticated>
            <Link href={"/dashboard"}>
              <Button
                variant={"outline"}
                className={
                  "hidden md:inline-flex items-center gap-2 hover:text-violet-600 hover:border-violet-600 transition"
                }
              >
                <LayoutDashboard className="h-4 w-4" />
                Dashboard
              </Button>
              <Button variant={"ghost"} className={"md:hidden h-10 w-10 p-0"}>
                <LayoutDashboard className="h-4 w-4" />
              </Button>
            </Link>
          </Authenticated>
          <Unauthenticated>
            <SignInButton>
              <Button variant={"ghost"}>Log In</Button>
            </SignInButton>
            <SignUpButton>
              <Button
                className={
                  "bg-violet-600 hover:bg-violet-700 text-white border-none"
                }
              >
                Get Started
              </Button>
            </SignUpButton>
          </Unauthenticated>
          <UserButton />
        </div>
      </nav>
      {isLoading && <BarLoader width={"100%"} color="#7C3AED" />}
    </header>
  );
};

export default Header;
