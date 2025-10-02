import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { client } from ".";

export const orpc = createTanstackQueryUtils(client);
