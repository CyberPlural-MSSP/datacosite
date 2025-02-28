import { z } from "zod";

import { createTRPCRouter, publicProcedure, privateProcedure } from "~/server/api/trpc";
import { admins } from "~/server/db/schema";

import { env } from "~/env";

import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { TRPCError } from "@trpc/server";

export const adminRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  signup: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(8), name: z.string().min(3) }))
    .mutation(async ({ ctx, input }) => {
      const salt = await bcrypt.genSalt(env.SALT_ROUNDS);
      const hashedPassword = await bcrypt.hash(input.password, salt);

      await ctx.db.insert(admins).values({
        email: input.email,
        password: hashedPassword,
        name: input.name,
      });
    }),

  createRootAdmin: publicProcedure.mutation(async ({ ctx }) => {
    const salt = await bcrypt.genSalt(env.SALT_ROUNDS);
    const randomPassword = Math.random().toString(36).substring(2, 15);
    const hashedPassword = await bcrypt.hash(randomPassword, salt);

    await ctx.db.insert(admins).values({
      email: "root@cyberplural.com",
      password: hashedPassword,
      name: "Root Admin",
    });

    const admin = await ctx.db.query.admins.findFirst({
      where: (admins, { eq }) => eq(admins.email, "root@cyberplural.com"),
    });

    return {
      email: "root@cyberplural.com",
      password: randomPassword,
      token: jwt.sign({ adminId: admin!.id }, env.JWT_SECRET),
    };
  }),

  rootAdminExists: publicProcedure.query(async ({ ctx }) => {
    const admin = await ctx.db.query.admins.findFirst();

    return !!admin;
  }),

  login: publicProcedure
    .input(z.object({ email: z.string().email(), password: z.string().min(8) }))
    .mutation(async ({ ctx, input }) => {
      const admin = await ctx.db.query.admins.findFirst({
        where: (admins, { eq }) => eq(admins.email, input.email),
      });

      if (!admin) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid credentials" });
      }

      const isPasswordValid = await bcrypt.compare(input.password, admin.password);

      if (!isPasswordValid) {
        throw new TRPCError({ code: "UNAUTHORIZED", message: "Invalid credentials" });
      }

      return {
        admin,
        token: jwt.sign({ adminId: admin.id }, env.JWT_SECRET),
      };
    }),

  me: privateProcedure.query(async ({ ctx }) => {
    const admin = await ctx.db.query.admins.findFirst({
      where: (admins, { eq }) => eq(admins.id, ctx.admin.id),
    });

    return admin;
  }),
});
