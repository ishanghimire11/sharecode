import React from "react";
import { currentUser } from "@clerk/nextjs/server";

import Dashboard from "./dashboard/page";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";
import Link from "next/link";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

const Home = async () => {
  const user = await currentUser();

  if (!user) {
    return (
      <div className="flex justify-center items-center h-[90dvh] relative overflow-hidden">
        <div className="absolute -inset-x-10 -inset-y-full">
          <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem] dark:bg-[#121212] dark:bg-[linear-gradient(to_right,#161616_1px,transparent_1px),linear-gradient(to_bottom,#161616_1px,transparent_1px)]"></div>
        </div>

        <div className="relative z-10 flex h-full flex-col items-center justify-center px-4">
          <div className="max-w-3xl text-center">
            <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
              Easy to save and share
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-lg">
              Effortlessly save, organize, and share your code snippets with a
              simple and easy process. Enhance collaboration and productivity by
              keeping your code accessible and shareable anytime, anywhere.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <SignInButton>
                <Button>Login</Button>
              </SignInButton>

              <Link href={"https://github.com/ishanghimire11/sharecode"}>
                <Button variant={"outline"}>
                  <GitHubLogoIcon />
                  Star me
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const loggedinUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (!loggedinUser) {
    await prisma.user.create({
      data: {
        clerkUserId: user.id,
        name: `${user.firstName} ${user.lastName}`,
        imageUrl: `${user.imageUrl}`,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  }

  return (
    <div>
      <Dashboard />
    </div>
  );
};

export default Home;
