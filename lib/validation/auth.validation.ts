import { z } from "zod/lib/index";

export const SignUpSchema = z.object({
  fullName: z.string().min(5, { message: "Must be 5 or more characters long" }),
  email: z
    .string()
    .min(11, { message: "There has to be 11 characters" })
    .endsWith(".com")
    .toLowerCase()
    .trim(),
  password: z
    .string()
    .min(8, { message: "Password must have at least 8 characters" }),
});
