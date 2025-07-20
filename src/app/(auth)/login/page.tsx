"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { login, loginWithGithub } from "@/lib/supabase/auth";
import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { useState, useTransition } from "react";

export const runtime = "edge";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loadingGithub, startTransition] = useTransition();
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    const { error } = await login(email, password);
    if (error) {
      setError("Login failed. Please check your credentials.");
    } else {
      redirect("/dashboard");
    }
    setLoading(false);
  };

  const handleGitHub = async () => {
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
        <h1 className="text-2xl font-bold text-center">Login</h1>
        <Input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <div className="space-y-4">
          <Button onClick={handleLogin} disabled={loading} className="w-full cursor-pointer">
            {loading ? "Logging in..." : "Login"}
          </Button>
          <Button
            onClick={handleGitHub}
            disabled={loadingGithub}
            variant="outline"
            className="w-full flex gap-2 justify-center cursor-pointer"
          >
            <IconBrandGithub size={16} />
            {loadingGithub ? "Connecting to GitHub..." : "Continue with GitHub"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">or</div>
          <Link href="/signup" passHref>
            <Button variant="outline" asChild className="w-full">
              <span>Sign up</span>
            </Button>
          </Link>
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
      </div>
    </div>
  );
}
