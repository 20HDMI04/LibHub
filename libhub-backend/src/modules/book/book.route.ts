import { FastifyInstance } from "fastify";
import { registerBookHandler } from "./book.controller";
import prisma from "../../utils/prisma";
import { $ref } from "./book.schema";

export default async function bookRoutes(server: FastifyInstance) {
    server.get("/", async (request:any, reply:any) => {
    const books = await prisma.book.findMany();
    console.log(books);
    return books;  
  });

  server.post('/',
    {
      schema: {
        body: $ref("createBookSchema"),
        response: {
          201: $ref("createBookResponseSchema"),
        },
      }
    } ,registerBookHandler)
}