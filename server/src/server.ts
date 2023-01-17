
import Fastify from "fastify";
import cors from "@fastify/cors";

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const app = Fastify();

app.register(cors)

app.get("/habits", () => {
    return prisma.habit.findMany();
})

app.listen({
    port: 3333,
}).then(() => {
    console.log("Running")
})


