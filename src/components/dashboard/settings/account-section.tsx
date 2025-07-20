"use client";

import { PasswordStrengthMeter } from "@/components/shared/password-strength";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUpdateAuthUserMutation } from "@/hooks/api/auth/use-update-auth-user-mutation";
import { passwordSchema } from "@/lib/schemas/user-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

const formSchema = z
  .object({
    password: passwordSchema,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof formSchema>;

export function AccountSection({ authUser }: { authUser: User }) {
  const [isEmailAuth] = useState(authUser.app_metadata.provider === "email");
  const [password, setPassword] = useState("");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isValid },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const { mutateAsync: updateAuthUser } = useUpdateAuthUserMutation();

  const onSubmit = async (values: FormData) => {
    try {
      await updateAuthUser({ password: values.password });
      toast.success("Your password has been updated.");
    } catch (err) {
      toast.error("Failed to update password. Please try again.");
      console.error(err);
    }
    setPassword("");
    reset();
  };

  return (
    <div className="border-t pt-6 space-y-4">
      <h1 className="text-2xl font-semibold">Account</h1>
      {isEmailAuth ? (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
          <label className="block text-sm font-medium">New Password</label>
          <Input
            type="password"
            {...register("password")}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setValue("password", e.target.value, { shouldValidate: true });
            }}
          />
          {errors.password && (
            <p className="ml-1 mb-3 text-xs text-red-500 mt-1">{errors.password.message}</p>
          )}
          <label className="block text-sm font-medium">Confirm Password</label>
          <Input type="password" {...register("confirmPassword")} />
          {errors.confirmPassword && (
            <p className="ml-1 mb-3 text-xs text-red-500 mt-1">{errors.confirmPassword.message}</p>
          )}
          <PasswordStrengthMeter password={password} />
          <Button type="submit" disabled={isSubmitting || !isValid}>
            Update Password
          </Button>
        </form>
      ) : (
        <p className="text-muted-foreground">
          Connected via third-party provider (e.g., GitHub). Password change is not available.
        </p>
      )}
    </div>
  );
}
