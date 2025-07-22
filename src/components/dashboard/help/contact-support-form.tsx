"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useContactMutation } from "@/hooks/api/contact/use-contact-mutation";
import useAuthSession from "@/hooks/shared/use-auth-session";
import { cn } from "@/lib/utils";
import { Mail } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const MAX_MESSAGE_LENGTH = 500;

export function ContactSupportForm() {
  const session = useAuthSession();
  const [formData, setFormData] = useState({ email: "", message: "" });
  const { mutateAsync: contactSupport, isPending, isError, isSuccess } = useContactMutation();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name === "message" && value.length > MAX_MESSAGE_LENGTH) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all fields.");
      return;
    }
    try {
      await contactSupport({
        ...formData,
        message: `${formData.message.trim()}\n\n[Email: ${session?.user?.email || "n/a"}, ID: ${
          session?.user?.id
        }]`,
      });
      setFormData({ email: "", message: "" });
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  return (
    <Card>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail className="text-primary" />
          <h2 className="text-lg font-semibold">Contact Support</h2>
        </div>
        <p className="text-sm text-muted-foreground">
          {"Can't find what you're looking for? Contact us directly for personalized assistance."}
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="you@example.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              rows={4}
              placeholder="How can we help you?"
              value={formData.message}
              onChange={handleChange}
              required
            />
            <p
              className={cn(
                "text-xs text-right",
                formData.message.length >= MAX_MESSAGE_LENGTH
                  ? "text-red-600"
                  : "text-muted-foreground"
              )}
            >
              {formData.message.length} / {MAX_MESSAGE_LENGTH} characters
            </p>
          </div>

          <Button type="submit" disabled={isPending}>
            {isPending ? "Sending..." : "Send Message"}
          </Button>

          {isSuccess ? (
            <p className="text-sm text-green-600">Your message was sent successfully!</p>
          ) : isError ? (
            <p className="text-sm text-red-600">Something went wrong. Please try again later.</p>
          ) : null}
        </form>
      </CardContent>
    </Card>
  );
}
