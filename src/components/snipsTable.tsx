import React from "react";
import Link from "next/link";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ExternalLinkIcon } from "lucide-react";
import { Button } from "./ui/button";
import { formatDate } from "@/lib/utils";
import axios from "axios";
import { auth } from "@clerk/nextjs/server";

const SnipsTable = async () => {
  const { userId } = await auth();
  try {
    const res = await axios.get(
      `${process.env.SERVER_URL}/api/snips/${userId}`
    );
    const snippets = await res.data;

    if (!Array.isArray(snippets)) {
      return <div className="text-red-500">Error loading snippets.</div>;
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead className="min-w-[220px]">Name</TableHead>
            <TableHead className="min-w-[120px]">Language</TableHead>
            <TableHead className="min-w-[150px]">Created At</TableHead>
            <TableHead className="min-w-[300px]">Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {snippets.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-28 opacity-70">
                No saved snips found.
              </TableCell>
            </TableRow>
          ) : (
            snippets.map((snippet, index) => (
              <TableRow key={snippet.id} className="hover:bg-gray-100">
                <TableCell>{index + 1}.</TableCell>
                <TableCell className="font-medium">
                  <Link href={`/view/${snippet.id}`}>{snippet.name}</Link>
                </TableCell>
                <TableCell>{snippet.language}</TableCell>
                <TableCell>{formatDate(new Date(snippet.createdAt))}</TableCell>
                <TableCell>{snippet.description}</TableCell>
                <TableCell>
                  <Button
                    className="w-4 h-4 items-center translate-y-1"
                    variant="link"
                  >
                    <ExternalLinkIcon />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    );
  } catch (error) {
    console.error("Error fetching snippets:", error);
    return <div>Error loading snippets.</div>;
  }
};

export default SnipsTable;
