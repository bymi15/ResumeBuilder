"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loginWithGithub, signup } from "@/lib/supabase/auth";
import { IconBrandGithub } from "@tabler/icons-react";
import { redirect, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

export const runtime = "edge";

export default function SignupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGithub, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!fullName || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    setError("");
    const { error } = await signup({ email, password, options: { data: { full_name: fullName } } });
    if (error) {
      setError(error.message || "Signup failed.");
    } else {
      router.push("/dashboard");
    }
    setLoading(false);
  };

  const handleGitHub = () => {
    startTransition(async () => {
      setError("");
      const { error, data } = await loginWithGithub("/dashboard");
      if (error) {
        setError("GitHub login failed.");
        return;
      }
      redirect(data.url);
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-2xl font-bold text-center">Sign Up</h1>
        <Input type="text" placeholder="Full Name" onChange={(e) => setFullName(e.target.value)} />
        <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleSignup} disabled={loading} className="w-full cursor-pointer">
          {loading ? "Signing up..." : "Sign Up"}
        </Button>
        <div className="text-center text-sm text-muted-foreground">or</div>
        <Button
          onClick={handleGitHub}
          disabled={loadingGithub}
          variant="outline"
          className="w-full flex gap-2 justify-center cursor-pointer"
        >
          <IconBrandGithub size={16} />
          {loadingGithub ? "Connecting to GitHub..." : "Continue with GitHub"}
        </Button>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </div>
    </div>
  );
}
