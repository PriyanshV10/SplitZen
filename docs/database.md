# 📊 Database Schema (Convex)

SplitZen uses [Convex](https://www.convex.dev/) as its real-time database. The schema is fully typed and defined in `convex/schema.js`.

Below is an overview of the core tables and their fields.

## `users`
Stores user profiles and is typically synchronized with the Clerk authentication state via webhooks or initial sign-in logic.

- **`name`** (String): The user's full name.
- **`email`** (String): The user's email address.
- **`tokenIdentifier`** (String): Unique identifier provided by the authentication provider (Clerk) to link the DB user to the auth user.
- **`imageUrl`** (String, Optional): URL to the user's avatar.

**Indexes**: Lookups by `tokenIdentifier`, `email`, and search indexes for name/email.

---

## `expenses`
The core entity representing a shared bill or transaction.

- **`description`** (String): What the expense was for (e.g., "Dinner at Luigi's").
- **`amount`** (Number): Total cost of the expense.
- **`category`** (String, Optional): Categorization of the expense.
- **`date`** (Number): Timestamp of when the expense occurred.
- **`paidByUserId`** (Id<"users">): Reference to the user who paid the bill.
- **`splitType`** (String): How the expense is divided (e.g., `equal`, `percentage`, `exact`).
- **`splits`** (Array of Objects): Breakdown of who owes what.
  - `userId` (Id<"users">): The user involved in the split.
  - `amount` (Number): The exact amount this user owes.
  - `paid` (Boolean): Whether this specific split has been settled.
- **`groupId`** (Id<"groups">, Optional): If the expense belongs to a group, this references the group. If undefined, it is a one-on-one expense.
- **`createdBy`** (Id<"users">): Reference to the user who recorded the expense in the app.

**Indexes**: Lookups by `groupId`, `date`, and compound index for user + group.

---

## `groups`
Represents a collection of users who share related expenses (e.g., "Summer Trip", "Apartment 4B").

- **`name`** (String): Display name of the group.
- **`description`** (String, Optional): Additional context about the group.
- **`createdBy`** (Id<"users">): The user who created the group.
- **`members`** (Array of Objects): List of group participants.
  - `userId` (Id<"users">): Reference to the user.
  - `role` (String): Role within the group (e.g., `admin`, `member`).
  - `joinedAt` (Number): Timestamp of when they joined.

---

## `settlements`
Represents a payment made between users to clear a debt.

- **`amount`** (Number): Amount paid.
- **`note`** (String, Optional): Context for the payment (e.g., "Venmo transfer for pizza").
- **`date`** (Number): Timestamp of the payment.
- **`paidByUserId`** (Id<"users">): The user who sent the money.
- **`receivedByUserId`** (Id<"users">): The user who received the money.
- **`groupId`** (Id<"groups">, Optional): The group context for the settlement (if applicable).
- **`relatedExpenseIds`** (Array of Id<"expenses">, Optional): Which specific expenses this settlement is intended to clear.
- **`createdBy`** (Id<"users">): The user who recorded the settlement in the app.

**Indexes**: Lookups by `groupId`, `date`, and compound indexes for payer/receiver + group.
