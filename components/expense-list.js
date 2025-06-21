"use client";

import { UseConvexQuery, useConvexMutation } from "@/hooks/use-convex-query";
import { api } from "@/convex/_generated/api";
import { format, set } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { getCategoryById } from "@/lib/expense-categories";
import { getCategoryIcon } from "@/lib/expense-categories";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "./ui/alert-dialog";

export function ExpenseList({
  expenses,
  showOtherPerson = true,
  isGroupExpense = false,
  otherPersonId = null,
  userLookupMap = {},
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState(null);

  const { data: currentUser } = UseConvexQuery(api.users.getCurrentUser);
  const deleteExpense = useConvexMutation(api.expenses.deleteExpense);

  if (!expenses || !expenses.length) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          No expenses found
        </CardContent>
      </Card>
    );
  }

  // Helper to get user details from cache or look up from expense
  const getUserDetails = (userId) => {
    // For the group context, we need to look up members from somewhere else
    // This is a simplified fallback
    return {
      name:
        userId === currentUser?._id
          ? "You"
          : userLookupMap[userId]?.name || "Other User",
      imageUrl:
        userId === currentUser?._id
          ? currentUser.imageUrl
          : userLookupMap[userId]?.imageUrl,
      id: userId,
    };
  };

  // Check if the user can delete an expense (creator or payer)
  const canDeleteExpense = (expense) => {
    if (!currentUser) return false;
    return (
      expense.createdBy === currentUser._id ||
      expense.paidByUserId === currentUser._id
    );
  };

  // Handle delete expense
  const handleDeleteExpense = async (expense) => {
    setSelectedExpense(expense);
    setOpenDialog(true);
  };

  const confirmDeleteExpense = async () => {
    if (!selectedExpense) return;

    try {
      await deleteExpense.mutate({ expenseId: selectedExpense._id });
      toast.success("Expense deleted successfully");
    } catch (error) {
      toast.error("Failed to delete expense: " + error.message);
    } finally {
      setSelectedExpense(null);
      setOpenDialog(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {expenses.map((expense) => {
        const payer = getUserDetails(expense.paidByUserId, expense);
        const isCurrentUserPayer = expense.paidByUserId === currentUser?._id;
        const category = getCategoryById(expense.category);
        const CategoryIcon = getCategoryIcon(category.id);
        const showDeleteOption = canDeleteExpense(expense);

        return (
          <Card
            className="hover:bg-muted/30 transition-colors"
            key={expense._id}
          >
            <CardContent className="py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {/* Category icon */}
                  <div className="bg-primary/10 p-2 rounded-full">
                    <CategoryIcon className="h-5 w-5 text-primary" />
                  </div>

                  <div>
                    <h3 className="font-medium">{expense.description}</h3>
                    <div className="flex items-center text-sm text-muted-foreground gap-2">
                      <span>
                        {format(new Date(expense.date), "MMM d, yyyy")}
                      </span>
                      {showOtherPerson && (
                        <>
                          <span>•</span>
                          <span>
                            {isCurrentUserPayer ? "You" : payer.name} paid
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-right">
                    <div className="font-medium">
                      &#8377;{expense.amount.toFixed(2)}
                    </div>
                    {isGroupExpense ? (
                      <Badge variant="outline" className="mt-1">
                        Group expense
                      </Badge>
                    ) : (
                      <div className="text-sm text-muted-foreground">
                        {isCurrentUserPayer ? (
                          <span className="text-green-600">You paid</span>
                        ) : (
                          <span className="text-amber-600">
                            {payer.name} paid
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {showDeleteOption && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-red-500 hover:text-red-700 hover:bg-red-100"
                      onClick={() => handleDeleteExpense(expense)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete expense</span>
                    </Button>
                  )}

                  <AlertDialog open={openDialog} onOpenChange={setOpenDialog}>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete the expense.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={confirmDeleteExpense}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>

              {/* Display splits info */}
              <div className="mt-3 text-sm">
                <div className="flex gap-2 flex-wrap">
                  {expense.splits.map((split, idx) => {
                    const splitUser = getUserDetails(split.userId, expense);
                    const isCurrentUser = split.userId === currentUser?._id;
                    const shouldShow =
                      showOtherPerson ||
                      (!showOtherPerson &&
                        (split.userId === currentUser?._id ||
                          split.userId === otherPersonId));

                    if (!shouldShow) return null;

                    return (
                      <Badge
                        key={idx}
                        variant={split.paid ? "outline" : "secondary"}
                        className="flex items-center gap-1"
                      >
                        <Avatar className="h-4 w-4">
                          <AvatarImage src={splitUser.imageUrl} />
                          <AvatarFallback>
                            {splitUser.name?.charAt(0) || "?"}
                          </AvatarFallback>
                        </Avatar>
                        <span>
                          {isCurrentUser ? "You" : splitUser.name}: $
                          {split.amount.toFixed(2)}
                        </span>
                      </Badge>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}

export default ExpenseList;
