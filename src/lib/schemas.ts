import { z } from "zod";

export const getValidationErorr = (error: any) => {}

export const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
export type SignInFormValues = z.infer<typeof signInSchema>;

export const signUpSchema = z
  .object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
      });
    }
  });
export type SignUpFormValues = z.infer<typeof signUpSchema>;
