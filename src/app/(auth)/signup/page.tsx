"use client";

import { PasswordStrengthMeter } from "@/components/shared/password-strength";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { emailSchema, fullNameSchema, passwordSchema } from "@/lib/schemas/user-schema";
import { loginWithGithub, signup } from "@/lib/supabase/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconBrandGithub } from "@tabler/icons-react";
import { redirect } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

export const runtime = "edge";

const formSchema = z
  .object({
    fullName: fullNameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

export default function SignupPage() {
  const [password, setPassword] = useState("");
  const [loadingGithub, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const onSubmit = async (values: FormData) => {
    const { fullName, email, password } = values;
    const { error } = await signup({ email, password, options: { data: { full_name: fullName } } });
    if (error) {
      toast.error("Failed to sign up. Please try again.");
      console.error(error);
    } else {
      redirect("/dashboard");
    }
  };

  const handleGitHub = () => {
    startTransition(async () => {
      const { error, data } = await loginWithGithub("/dashboard");
      if (error) {
        toast.error("Failed to connect with GitHub. Please try again.");
        console.error(error);
        return;
      }
      redirect(data.url);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <div className="space-y-2">
          <Input type="text" placeholder="Full Name" {...register("fullName")} />
          {errors.fullName && (
            <p className="ml-2 text-xs text-red-500">{errors.fullName.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Input type="email" placeholder="Email" {...register("email")} />
          {errors.email && <p className="ml-2 text-xs text-red-500">{errors.email.message}</p>}
        </div>
        <div className="space-y-2">
          <Input
            type="password"
            placeholder="Password"
            {...register("password")}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setValue("password", e.target.value, { shouldValidate: true });
            }}
          />
          {errors.password && (
            <p className="ml-2 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>
        <div className="space-y-2">
          <Input type="password" placeholder="Confirm Password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="ml-2 text-xs text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>
        <PasswordStrengthMeter password={password} />
        <Button type="submit" disabled={isSubmitting || !isValid} className="w-full cursor-pointer">
          {isSubmitting ? "Signing up..." : "Sign Up"}
        </Button>
        <div className="text-center text-sm text-muted-foreground">or</div>
        <Button
          type="button"
          onClick={handleGitHub}
          disabled={loadingGithub}
          variant="outline"
          className="w-full flex gap-2 justify-center cursor-pointer"
        >
          <IconBrandGithub size={16} />
          {loadingGithub ? "Connecting to GitHub..." : "Continue with GitHub"}
        </Button>
      </form>
    </div>
  );
}
