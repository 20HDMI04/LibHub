import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { registerAuthorHandler } from "./author.controller";
import prisma from "../../utils/prisma";
import { $ref } from "./author.schema";

export async function authorRoutes(server: FastifyInstance) {
    server.get("/", async (request:FastifyRequest, reply:FastifyReply) => {
    const authors = await prisma.author.findMany();
    return authors;  
  });

  server.post('/',
    {
      schema: {
        body: $ref("createAuthorSchema"),
        response: {
          201: $ref("authorResponseSchema"),
        },
      }
    } ,registerAuthorHandler)
}