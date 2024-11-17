import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Snip, SnipTablesProps } from "@/types";
import { auth } from "@clerk/nextjs/server";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import axios from "axios";

import SnipAction from "./SnipAction";

const SnipsTable: React.FC<SnipTablesProps> = async ({ searchParams }) => {
  const { userId } = await auth();
  const newSnipId = searchParams?.newSnipId;

  try {
    const snippetsResponse = await axios.get<Snip[]>(
      `${process.env.SERVER_URL}/api/snips/${userId}`,
      {
        headers: {
          "Cache-Control": "no-cache",
          Pragma: "no-cache",
          Expires: "0",
        },
      }
    );
    let snippets = snippetsResponse.data;

    if (!Array.isArray(snippets)) {
      return <div className="text-red-500">Error loading snippets.</div>;
    }

    if (newSnipId) {
      const newSnippetResponse = await axios.get<Snip>(
        `${process.env.SERVER_URL}/api/snip/${newSnipId}`
      );
      const newSnippet = newSnippetResponse.data;

      if (newSnippet) {
        snippets = [newSnippet, ...snippets];
      }
    }

    return (
      <div className="max-h-[40dvh] overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead className="min-w-[220px]">Name</TableHead>
              <TableHead className="min-w-[120px]">Language</TableHead>
              <TableHead className="min-w-[150px]">Created At</TableHead>
              <TableHead className="min-w-[300px]">Description</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {snippets.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-28 opacity-70">
                  No saved snips found.
                </TableCell>
              </TableRow>
            ) : (
              snippets.map((snippet, index) => (
                <TableRow key={snippet.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium">
                    <Link href={`/view/${snippet.id}`}>{snippet.name}</Link>
                  </TableCell>
                  <TableCell>{snippet.language}</TableCell>
                  <TableCell>
                    {formatDate(new Date(snippet.createdAt))}
                  </TableCell>
                  <TableCell>{snippet.description}</TableCell>
                  <TableCell>
                    <SnipAction snipId={snippet.id} />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    );
  } catch (error) {
    console.error("Error fetching snippets:", error);
    return (
      <div className="text-red-500">
        Unable to load snippets. Please try again later.
      </div>
    );
  }
};

export default SnipsTable;
