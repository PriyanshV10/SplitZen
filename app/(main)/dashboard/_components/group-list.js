import { Users } from "lucide-react";
import Link from "next/link";
import React from "react";

const GroupList = ({ groups }) => {
  return (
    <>
      {!groups || groups.length === 0 ? (
        <div className="text-center py-6">
          <p className="text-muted-foreground">No Groups Found</p>
          <p className="text-sm text-muted-foreground mt-1">
            Create a Group to start tracking shared expenses.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {groups.map((group) => {
            const balance = group.balance || 0;
            const hasBalance = balance !== 0;
            return (
              <Link href={`/group/${group.id}`} key={group.id} className="flex items-center justify-between hover:bg-muted p-2 rounded-md transition-colors">
                <div className="flex items-center gap-3">
                  <div className="bg-primary/10 p-2 rounded-md">
                    <Users className="h-5 w-5 text-primary"/>
                  </div>
                  <div>
                    <p className="font-medium">{group.name}</p>
                    <p className="text-xs text-muted-foreground">{group.members.length} members</p>
                  </div>
                </div>

                {hasBalance && (
                  <span className={`text-sm font-medium ${balance > 0 ? "text-green-500" : "text-red-500"}`}>
                    {balance > 0 ? "+" : "-"} &#8377;{Math.abs(balance).toFixed(2)}
                  </span>
                )}
              </Link>
            )
          })}
        </div>
      )}
    </>
  );
};

export default GroupList;
