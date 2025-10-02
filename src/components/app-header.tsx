import Link from "next/link";
import { Button } from "./ui/button";

export function AppHeader() {
  return (
    <header className="flex justify-between items-center py-3 px-4">
      <h1>Freetup</h1>

      <div className="flex gap-2">
        <Button variant="secondary" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button asChild>
          <Link href="/signup">Signup</Link>
        </Button>
      </div>
    </header>
  );
}
