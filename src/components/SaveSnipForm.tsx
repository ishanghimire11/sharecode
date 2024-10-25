"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "./ui/textarea";
import { NewSnipFormProps } from "@/types";

const formSchema = z.object({
  snipName: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z
    .string()
    .min(8, {
      message: "Description must be at least 8 characters.",
    })
    .max(400, {
      message: "Description must be no more than 100 characters.",
    }),
});

export function SaveSnipForm({ onFormSubmit }: NewSnipFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      snipName: "",
      description: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="snipName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Number Generator" {...field} />
              </FormControl>
              <FormMessage className="text-red-500 font-semibold text-xs" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="!mt-4">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Function for generating random numbers."
                  className="resize-none min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-500 font-semibold text-xs" />
            </FormItem>
          )}
        />

        <Button type="submit" className="ml-auto block">
          Submit
        </Button>
      </form>
    </Form>
  );
}
