"use client";

import {
  IconBell,
  IconCalendar,
  IconLogout,
  IconMessage,
  IconPlus,
  IconSettings,
  IconUser,
  IconUsersGroup,
} from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient, useSession } from "~/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Skeleton } from "./ui/skeleton";

export function AppHeader() {
  return (
    <header className="flex justify-between items-center py-3 px-4 md:px-6 sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      <Link href="/" className="hover:opacity-80 transition-opacity">
        <h1 className="text-xl font-bold">Freetup</h1>
      </Link>

      <AccountMenu />
    </header>
  );
}

function AccountMenu() {
  const { data: session, isPending } = useSession();
  const router = useRouter();

  if (isPending) {
    return <Skeleton className="w-10 h-10 rounded-full" />;
  }

  if (!session) {
    return (
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button size="sm" asChild>
          <Link href="/signup">Sign up</Link>
        </Button>
      </div>
    );
  }

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  const userInitials = session.user.name
    ? session.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : (session.user.email?.charAt(0).toUpperCase() ?? "?");

  return (
    <div className="flex items-center gap-2">
      <Button variant="outline" className="hidden sm:flex" asChild>
        <Link href="/start">
          <IconPlus className="size-4" />
          <span className="hidden md:inline">Start a group</span>
          <span className="md:hidden">New group</span>
        </Link>
      </Button>

      <Button variant="ghost" size="icon">
        <IconMessage />
      </Button>

      <Button variant="ghost" size="icon">
        <IconBell />
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="relative h-10 w-10 rounded-full p-0"
          >
            <Avatar className="h-10 w-10">
              {session.user.image && (
                <AvatarImage src={session.user.image} alt={session.user.name} />
              )}
              <AvatarFallback>{userInitials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user.name}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild className="sm:hidden">
            <Link href="/start">
              <IconPlus />
              Start a group
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/events">
              <IconCalendar />
              Your Events
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/groups">
              <IconUsersGroup />
              Your Groups
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/profile">
              <IconUser />
              Profile
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link href="/settings">
              <IconSettings />
              Settings
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleLogout} variant="destructive">
            <IconLogout />
            Log out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
