"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function AccountSettings() {
  const [email, setEmail] = useState("john@example.com");

  return (
    <form className="space-y-4">
      <div>
        <Label>Email</Label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <Button>Update Email</Button>
    </form>
  );
}
