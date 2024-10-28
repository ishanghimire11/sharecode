import React from "react";
import { currentUser } from "@clerk/nextjs/server";

import Dashboard from "./dashboard/page";
import { SignInButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import prisma from "@/lib/db";

const Home = async () => {
  const user = await currentUser();

  if (!user) {
    return (
      <div>
        <SignInButton>
          <Button>Login</Button>
        </SignInButton>
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
