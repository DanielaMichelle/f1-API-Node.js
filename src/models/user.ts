import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();
export default prisma.user; // This code exports the user model from Prisma, allowing it to be used in other parts of the application.