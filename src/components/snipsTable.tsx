import React from "react";
import axios from "axios";

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

const snippets = [
  {
    id: "cm2s65k9t00054ick3ebef55v",
    code: 'const greet = () => { console.log("Hello, World!"); };',
    createdAt: "2024-10-27T22:36:04.927Z",
    description: "gen number easily ",
    language: "JavaScript",
    name: "Num gen",
    userId: "user_2nxQHbtnm58pPYeelTRpZbsR6uQ",
  },
  {
    id: "cm2s66ic200074ickwvxz4jvj",
    code: 'const greet = () => { console.log("Hello, World!"); };',
    createdAt: "2024-10-27T22:36:49.069Z",
    description: "gen number easily ",
    language: "JavaScript",
    name: "Num gen",
    userId: "user_2nxQHbtnm58pPYeelTRpZbsR6uQ",
  },
  {
    id: "cm2s6721w00094ick5k5iuph0",
    code: 'const greet = () => { console.log("Hello, World!"); };',
    createdAt: "2024-10-27T22:37:14.591Z",
    description: "gen number easily ",
    language: "JavaScript",
    name: "Num gen",
    userId: "user_2nxQHbtnm58pPYeelTRpZbsR6uQ",
  },
  {
    id: "cm2s67sbc000b4ickbxy95wco",
    code: "hello mofos",
    createdAt: "2024-10-27T22:37:48.664Z",
    description: "gen mofo",
    language: "JavaScript",
    name: "mofo",
    userId: "user_2nxQHbtnm58pPYeelTRpZbsR6uQ",
  },
  {
    id: "cm2s6i5yf00018yuj62l3yo3d",
    code: 'const greet = () => { console.log("Hello, World!"); };',
    createdAt: "2024-10-27T22:45:52.930Z",
    description: "dsadsads",
    language: "JavaScript",
    name: "mofo",
    userId: "user_2nxQHbtnm58pPYeelTRpZbsR6uQ",
  },
  {
    id: "cm2s6jd2i00038yujtowrd4gh",
    code: 'const greet = () => { console.log("Hello, World!"); };',
    createdAt: "2024-10-27T22:46:48.809Z",
    description: "dsadsads",
    language: "JavaScript",
    name: "mofo",
    userId: "user_2nxQHbtnm58pPYeelTRpZbsR6uQ",
  },
  {
    id: "cm2s6jnt500058yujnml9kx66",
    code: 'const greet = () => { console.log("Hello, World!"); };',
    createdAt: "2024-10-27T22:47:02.729Z",
    description: "dsadsads",
    language: "JavaScript",
    name: "mofo1",
    userId: "user_2nxQHbtnm58pPYeelTRpZbsR6uQ",
  },
  {
    id: "cm2s7111j00078yujww5wkc26",
    code: 'const greet = () => { console.log("Hello, World!"); };',
    createdAt: "2024-10-27T23:00:33.029Z",
    description: "dasdsasdasd",
    language: "JavaScript",
    name: "dsdsad",
    userId: "user_2nxQHbtnm58pPYeelTRpZbsR6uQ",
  },
  {
    id: "cm2s746xs0001sxol4cyctgll",
    code: 'const greet = () => { console.log("Hello, World!"); };',
    createdAt: "2024-10-27T23:03:00.639Z",
    description: "dsadsads",
    language: "JavaScript",
    name: "dsadsads",
    userId: "user_2nxQHbtnm58pPYeelTRpZbsR6uQ",
  },
  {
    id: "cm2s760sz0003sxolspet3zsr",
    code: 'const greet = () => { console.log("Hello, World!"); };',
    createdAt: "2024-10-27T23:04:26.002Z",
    description: "dsadasdjn",
    language: "JavaScript",
    name: "ayooo",
    userId: "user_2nxQHbtnm58pPYeelTRpZbsR6uQ",
  },
  {
    id: "cm2sbac9s0001kii537igbfvz",
    code: 'const greet = () => { console.log("Hello, World!"); };',
    createdAt: "2024-10-28T00:59:45.948Z",
    description: "dsadsdads",
    language: "JavaScript",
    name: "Orchestrate",
    userId: "user_2nxQHbtnm58pPYeelTRpZbsR6uQ",
  },
  {
    id: "cm2sbfma80001kk0rs4zg7x01",
    code: 'const greet = () => { console.log("Hello, World!"); };',
    createdAt: "2024-10-28T01:03:52.206Z",
    description: "dsadsadsdsadsa",
    language: "JavaScript",
    name: "mofo2",
    userId: "user_2nxQHbtnm58pPYeelTRpZbsR6uQ",
  },
];

const SnipsTable = async () => {
  // const res = await fetch(`${process.env.SERVER_URL}/api/snip`);
  // const snippets = await res.json();
  // if (snippets.status === 400) {
  //   console.error("Error fetching snips:", snippets.error);
  //   return;
  // }

  console.log(snippets);

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
        {snippets &&
          snippets.map((snippet, index) => (
            <TableRow key={snippet.id}>
              <TableCell>{index + 1}.</TableCell>
              <TableCell className="font-medium">{snippet.name}</TableCell>
              <TableCell>{snippet.language}</TableCell>
              <TableCell>{formatDate(new Date(snippet.createdAt))}</TableCell>
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
