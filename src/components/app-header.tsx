"use client";

import Link from "next/link";
import { useSession } from "~/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

export function AppHeader() {
  const { data: session } = useSession();

  return (
    <header className="flex justify-between items-center py-3 px-4 sticky top-0 z-10 bg-background">
      <Link href="/">
        <h1>Freetup</h1>
      </Link>

      <AccountMenu />
    </header>
  );
}

function AccountMenu() {
  const { data: session, isPending } = useSession();

  if (isPending) {
    return <Skeleton className="w-10 h-10 rounded-full" />;
  }

  if (!session) {
    return (
      <div className="flex gap-2">
        <Button variant="secondary" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Signup</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" asChild>
        <Link href="/start">Start a new group</Link>
      </Button>

      <Button variant="secondary" asChild>
        <Avatar>
          {session.user.image && <AvatarImage src={session.user.image} />}
          <AvatarFallback>{session.user.name.charAt(0)}</AvatarFallback>
        </Avatar>
      </Button>
    </div>
  );
}
