import { os } from "@orpc/server";
import z from "zod";

export const list = os
  .input(
    z.object({
      limit: z.number().int().min(1).max(100).optional(),
      cursor: z.number().int().min(0).default(0),
    }),
  )
  .handler(async () => {
    // your list code here
    return [{ id: 1, name: "name" }];
  });
