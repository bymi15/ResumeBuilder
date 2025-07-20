"use client";

import { DashboardContainer } from "@/components/dashboard/dashboard-container";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

export default function Billing() {
  return (
    <DashboardContainer>
      <div className="py-4 border-b mb-4">
        <h1 className="text-2xl font-semibold">Billing</h1>
      </div>
      <p className="mb-6 text-muted-foreground text-base">
        Your account is currently on the <strong>Free Plan</strong>.
      </p>
      <div className="flex items-center space-x-4 p-6 mb-6 rounded-xl bg-gradient-to-r from-green-50 via-white to-green-50 shadow-lg">
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-100 text-green-600">
          <Star className="w-7 h-7" />
        </div>
        <p className="text-green-800 font-semibold text-lg leading-tight m-0">
          {"You're all set! Enjoy "}
          <span className="uppercase font-extrabold text-green-500">free access</span> with no
          limits — for now!
        </p>
      </div>
      <p className="mb-8 text-sm text-gray-600 leading-relaxed">
        {
          "No charges for now — enjoy full access without limits! When billing launches, you'll have easy control to manage your subscription right here."
        }
      </p>
      <Button disabled className="cursor-not-allowed" size="lg">
        Manage Subscription
      </Button>
    </DashboardContainer>
  );
}
