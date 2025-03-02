import { eq } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, privateProcedure, rootAdminProcedure } from "~/server/api/trpc";
import { collectedDataTypes } from "~/server/db/schema";

export const dataTypesRouter = createTRPCRouter({
  create: rootAdminProcedure.input(z.object({
    name: z.string(),
    description: z.string(),
  })).mutation(async ({ ctx, input }) => {
    const { name, description } = input;

    const existingDataType = await ctx.db.query.collectedDataTypes.findFirst({
      where: eq(collectedDataTypes.name, name.toUpperCase()),
    });

    if (existingDataType) {
      throw new Error("Data type already exists");
    }
    
    await ctx.db.insert(collectedDataTypes).values({
      name: name.toUpperCase(),
      description,
    });
    
    const data = await ctx.db.query.collectedDataTypes.findFirst({
      where: eq(collectedDataTypes.name, name.toUpperCase()),
    });

    return data;
  }),

  getAll: privateProcedure.query(async ({ ctx }) => {
    const data = await ctx.db.query.collectedDataTypes.findMany();

    return data;
  }),

  getById: privateProcedure.input(z.object({
    id: z.number(),
  })).query(async ({ ctx, input }) => {
    const { id } = input;
    
    const data = await ctx.db.query.collectedDataTypes.findFirst({
      where: eq(collectedDataTypes.id, id),
    });

    return data;
  }),

  delete: rootAdminProcedure.input(z.object({
    id: z.number(),
  })).mutation(async ({ ctx, input }) => {
    const { id } = input;
    
    const result = await ctx.db.delete(collectedDataTypes).where(eq(collectedDataTypes.id, id));

    return result.rowsAffected === 1;
  }),
});
