import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Campaigns() {
  return (
    <div className="max-w-4xl mx-auto py-40 ">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Campaigns</h2>
        <Button>New Campaign</Button>
      </div>

      <div className="grid gap-4">
        <Card className="p-4">Campaign: Spring Sale — Running — $2,000 spent</Card>
        <Card className="p-4">Campaign: Summer Launch — Draft</Card>
      </div>
    </div>
  );
}
