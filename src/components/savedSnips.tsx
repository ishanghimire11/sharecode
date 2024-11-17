import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

import SnipsTable from "./snipsTable";
import { Button } from "./ui/button";

const SavedSnips = () => {
  return (
    <Card className="w-full xl:w-3/4">
      <CardHeader>
        <CardTitle>Saved Snips</CardTitle>
        <CardDescription>
          All of the snips you saved are available below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SnipsTable />
      </CardContent>
      <CardFooter>
        <Button
          type="button"
          className="flex items-center gap-x-1 py-2 px-4 rounded-md w-fit p-0"
        >
          <Link
            href={"/newsnip"}
            className="flex items-center gap-x-1 py-2 px-3 rounded-md w-fit"
          >
            <PlusIcon className="w-5 h-5" />
            Add New Snip
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SavedSnips;
