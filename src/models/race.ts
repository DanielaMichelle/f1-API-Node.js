import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

export default prisma.race;
// This file exports the Prisma client instance for Race model.