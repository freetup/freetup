import type { PropsWithChildren } from "react";
import { AppHeader } from "~/components/app-header";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <AppHeader />

      {children}
    </>
  );
}
