import React from "react";
import { ModeToggle } from "./theme-toggle";
import { Button } from "./ui/button";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const Navbar = () => {
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
          <Button variant={"default"}>Login</Button>
          <ModeToggle />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
