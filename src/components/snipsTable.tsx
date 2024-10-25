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
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];

const SnipsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>No</TableHead>
          <TableHead className="min-w-[220px]">Name</TableHead>
          <TableHead className="min-w-[120px]">Language</TableHead>
          <TableHead className="min-w-[150px]">Created At</TableHead>
          <TableHead className="min-w-[300px]">Description</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {snippets.map((snippet, index) => (
          <TableRow key={snippet.id}>
            <TableCell>{index + 1}.</TableCell>
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
