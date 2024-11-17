"use client";

import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  CheckIcon,
  CopyIcon,
  EllipsisIcon,
  ExternalLinkIcon,
  Trash2Icon,
} from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { CopySnipUrlDialogProps, DeleteSnipDialogProps } from "@/types";
import { Cross1Icon } from "@radix-ui/react-icons";
import { Form } from "react-hook-form";
import { Input } from "./ui/input";

function DeleteSnipDialog({
  open,
  setOpen,
  handleDelete,
}: DeleteSnipDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="dark:bg-neutral-950 bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            snippet from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={(e) => handleDelete(e)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function CopySnipUrlDialog({ open, setOpen, snipID }: CopySnipUrlDialogProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(`${process.env.SERVER_URL}/view/${snipID}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent className="dark:bg-neutral-950 bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle className=" flex items-center justify-between">
            <span>Snip url</span>
            <Button
              variant={"link"}
              className="w-[4px] h-[4px] opacity-70 p-2"
              onClick={() => setOpen(false)}
            >
              <Cross1Icon className="w-full h-full" />
            </Button>
          </AlertDialogTitle>
          <div className="flex items-center gap-2">
            <Input
              value={`${process.env.SERVER_URL}/view/${snipID}`}
              onChange={() => {}}
              className="cursor-text opacity-100 text-current"
            />
            <Button onClick={handleCopy} disabled={copied}>
              {copied ? (
                <>
                  <CheckIcon className="w-4 h-4" />
                  Copied
                </>
              ) : (
                <>
                  <CopyIcon className="w-4 h-4" />
                  Copy
                </>
              )}
            </Button>
          </div>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const SnipAction = ({ snipId }: { snipId: string }) => {
  const navigate = useRouter();
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openCopyUrlDialog, setOpenCopyUrlDialog] = useState(false);
  const handleActionButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleDeleteClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();

    try {
      console.log(snipId, "snipid snipid");
      const res = await axios.delete(`/api/delete/${snipId}`);
      console.log(res);

      if (res.status === 200) {
        console.log("Snippet deleted successfully");
        setOpenDeleteDialog(false);
        navigate.refresh();
      }
    } catch (error) {
      console.error("Error deleting snip:", error);
      return;
    }
  };

  const handleShareClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    e.preventDefault();

    setOpenCopyUrlDialog(true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="capitalize flex items-center justify-between"
          onClick={handleActionButtonClick}
        >
          <EllipsisIcon className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-32">
        <DropdownMenuItem
          className="text-center"
          onClick={(e) => handleShareClick(e)}
        >
          <span className="flex gap-x-1 items-center justify-center w-full">
            <ExternalLinkIcon className="w-4 h-4" />
            Share
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setOpenDeleteDialog(true)}>
          <span className="flex gap-x-1 items-center justify-center w-full">
            <Trash2Icon className="w-4 h-4" />
            Delete
          </span>
        </DropdownMenuItem>
      </DropdownMenuContent>
      <DeleteSnipDialog
        open={openDeleteDialog}
        setOpen={setOpenDeleteDialog}
        handleDelete={handleDeleteClick}
      />

      <CopySnipUrlDialog
        open={openCopyUrlDialog}
        setOpen={setOpenCopyUrlDialog}
        snipID={snipId}
      />
    </DropdownMenu>
  );
};

export default SnipAction;
