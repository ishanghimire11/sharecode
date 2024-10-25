import React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Save } from "lucide-react";
import { SaveSnipForm } from "./SaveSnipForm";
import { NewSnipFormProps } from "@/types";

export function SaveSnipModal({ onFormSubmit }: NewSnipFormProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="gap-x-1 flex items-center">
          <Save className="w-5 h-5" />
          Save
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] dark:bg-neutral-950 bg-white">
        <DialogHeader>
          <DialogTitle>Save snip</DialogTitle>
          <DialogDescription>
            Add a name and a description and save your snip.
          </DialogDescription>
        </DialogHeader>
        <SaveSnipForm onFormSubmit={onFormSubmit} />
      </DialogContent>
    </Dialog>
  );
}
