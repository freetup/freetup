"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { use } from "react";
import { orpc } from "~/lib/orpc/react-query";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default function GroupPage({ params }: PageProps) {
  const { slug } = use(params);

  const { data } = useSuspenseQuery(
    orpc.groups.get.queryOptions({
      input: {
        slug,
      },
    })
  );

  console.log(data);

  return <div>GroupPage</div>;
}
