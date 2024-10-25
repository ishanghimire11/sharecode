import { z } from "zod";

export const formSchema = z.object({
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

export type FormValues = z.infer<typeof formSchema>;
