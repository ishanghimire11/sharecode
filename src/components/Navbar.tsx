import { SignedIn, UserButton } from "@clerk/nextjs";
import { ExternalLink } from "lucide-react";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import React from "react";

import { ModeToggle } from "./theme-toggle";

const Navbar = async () => {
  const { userId } = await auth();
  return (
    <div>
      <div className="flex items-center gap-x-4 border-b p-2 mb-2 justify-between">
        <Link href={"/"}>
          <span className="flex items-center gap-x-1">
            <ExternalLink
              className="w-4 h-4 -translate-y-[1px]"
              strokeWidth={2}
            />
            sharecode.
          </span>
        </Link>

        <div className="flex items-center gap-x-2">
          {userId && (
            <SignedIn>
              <UserButton />
            </SignedIn>
          )}
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
