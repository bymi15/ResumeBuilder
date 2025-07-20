import { z } from "zod";

export const emailSchema = z
  .string()
  .email("Invalid email address")
  .min(1, "Email is required")
  .max(256, "Email is too long");

export const fullNameSchema = z
  .string()
  .min(3, "Full name must be at least 3 characters")
  .max(100, "Full name is too long")
  .regex(
    /^[a-zA-ZÀ-ÖØ-öø-ÿ'\-\s]+$/,
    "Full name must only contain letters, spaces, apostrophes, or hyphens"
  )
  .refine(
    (val) => {
      // Must contain at least two words (split by space)
      const words = val.trim().split(/\s+/);
      return words.length >= 2 && words.every((word) => word.length >= 2);
    },
    {
      message: "Please enter at a first and last name, each at least 2 characters",
    }
  );

export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[a-z]/, "Must contain a lowercase letter")
  .regex(/[A-Z]/, "Must contain an uppercase letter")
  .regex(/[0-9]/, "Must contain a number")
  .regex(/[^a-zA-Z0-9]/, "Must contain a symbol");
