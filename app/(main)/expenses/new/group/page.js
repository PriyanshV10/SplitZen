"use client";

import React from "react";
import { ExpenseForm } from "../_components/expense-form";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs } from "@radix-ui/react-tabs";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const GroupExpense = () => {
  return (
    <div className="container max-w-3xl mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-5xl gradient-title">Add a new expense</h1>
        <p className="text-muted-foreground mt-1">
          Record a new expense to split with others
        </p>
      </div>

      <Card>
        <CardContent>
          <ExpenseForm
                type="group"
                onSuccess={(id) => router.push(`/group/${id}`)}
              />
        </CardContent>
      </Card>
    </div>
  );
};

export default GroupExpense;
