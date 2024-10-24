import React from "react";
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

const snippets = [
  {
    id: "snippet1",
    name: "Hello World Function",
    language: "JavaScript",
    createdAt: "2024-10-20",
    description: "A simple function that logs 'Hello, World!' to the console.",
  },
  {
    id: "snippet2",
    name: "Factorial Calculator",
    language: "Python",
    createdAt: "2024-10-19",
    description: "Calculates the factorial of a given number.",
  },
  {
    id: "snippet3",
    name: "Responsive Grid Layout",
    language: "CSS",
    createdAt: "2024-10-18",
    description: "A basic grid layout for responsive web design.",
  },
  {
    id: "snippet4",
    name: "Database Connection",
    language: "SQL",
    createdAt: "2024-10-17",
    description: "Establishes a connection to a PostgreSQL database.",
  },
];

const SnipsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Language</TableHead>
          <TableHead>Created At</TableHead>
          <TableHead>Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {snippets.map((snippet) => (
          <TableRow key={snippet.id}>
            <TableCell className="font-medium">{snippet.name}</TableCell>
            <TableCell>{snippet.language}</TableCell>
            <TableCell>{snippet.createdAt}</TableCell>
            <TableCell>{snippet.description}</TableCell>
            <TableCell>
              <Button
                className="w-4 h-4 items-center translate-y-1"
                variant={"link"}
              >
                <ExternalLinkIcon />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SnipsTable;
