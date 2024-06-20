import { z } from "zod";
import { serverActionProcedure } from "../infrastructure/trpc";
import { recomendationsTable } from "./recomendations.drizzle.schema";
import { randomUUID } from "crypto";

export const addRecomendation = serverActionProcedure
  .input(z.object({
    url: z.string().url().min(1),
  }))
  .mutation(async ({ctx: { db }, input}) => {
    const recomendation = {
      id: randomUUID(),
      url: input.url,
      createdAt: new Date(),
    };
    const _ = await db.insert(recomendationsTable).values(recomendation);
  })