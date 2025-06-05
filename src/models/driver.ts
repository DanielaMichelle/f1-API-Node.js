import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default prisma.driver;
// This code exports the Prisma client instance for the 'driver' model, allowing other parts of the application to interact with the 'driver' table in the database.