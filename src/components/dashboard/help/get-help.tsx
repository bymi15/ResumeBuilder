"use client";

import { HelpCircle } from "lucide-react";
import { ContactSupportForm } from "./contact-support-form";
import { FAQ } from "./faq";

export default function GetHelp() {
  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="flex items-center gap-2 mb-6">
        <HelpCircle className="text-primary" />
        <h1 className="text-2xl font-semibold">Get Help</h1>
      </div>

      <p className="text-muted-foreground mb-6">
        Need help with StyledResume? Start with the frequently asked questions below. If you're
        still stuck, contact support.
      </p>

      <FAQ />
      <ContactSupportForm />
    </div>
  );
}
