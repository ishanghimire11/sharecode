import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SnipsTable from "./snipsTable";
import { Button } from "./ui/button";
import { PlusIcon } from "lucide-react";

const SavedSnips = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          All of the snips you saved are available below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <SnipsTable />
      </CardContent>
      <CardFooter>
        <Button className="flex items-center gap-x-1 py-2 px-4 rounded-md w-fit">
          <PlusIcon className="w-5 h-5" />
          Add New Snip
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SavedSnips;
