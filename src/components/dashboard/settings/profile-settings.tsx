"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export function ProfileSettings() {
  const [name, setName] = useState("John Doe");
  const [location, setLocation] = useState("New York");

  const handleSave = () => {
    // Call API to update user
    console.log("Saving", { name, location });
  };

  return (
    <form className="space-y-4">
      <div>
        <Label>Name</Label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        <Label>Location</Label>
        <Input value={location} onChange={(e) => setLocation(e.target.value)} />
      </div>
      <Button type="button" onClick={handleSave}>
        Save Changes
      </Button>
    </form>
  );
}
