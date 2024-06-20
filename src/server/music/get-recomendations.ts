import "server-only";
import { z } from "zod";
import { count } from "drizzle-orm";
import { serverActionProcedure } from "../infrastructure/trpc";
import { recomendationsTable } from "./recomendations.drizzle.schema";

type GetRecomendationsPaginationResponse = {
  pageSize: number;
  currentPage: number;
  totalPages: number;
  items: {
    id: string
    url: string;
  }[];
};

export const getRecomendations = serverActionProcedure
  .input(z.object({
    page: z.number().positive(),
    pageSize: z.number().positive(),
  }))
  .mutation(async ({ ctx: { db }, input }) => {
    const totalPages = await db.select({ count: count() }).from(recomendationsTable);
    const recomendations = await db
      .select()
      .from(recomendationsTable)
      .orderBy(recomendationsTable.createdAt)
      .limit(input.pageSize)
      .offset((input.page -1 ) * input.pageSize);

    return {
      pageSize: input.pageSize,
      currentPage: input.page,
      totalPages: totalPages[0]?.count ?? 0,
      items: recomendations.map(x => ({
        id: x.id,
        url: x.url
      })),
    } satisfies GetRecomendationsPaginationResponse;
  });

