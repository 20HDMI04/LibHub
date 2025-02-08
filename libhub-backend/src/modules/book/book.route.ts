import { FastifyInstance } from "fastify";
import { registerBookHandler, getBooksHandler, deleteBookHandler } from "./book.controller";
import prisma from "../../utils/prisma";
import { $ref } from "./book.schema";

export default async function bookRoutes(server: FastifyInstance) {
    
  server.get('/', {
    schema:{
      response: {
        200: $ref("booksResponseSchema")
      }
    }
  }, getBooksHandler)

  server.post('/',
    {
      schema: {
        body: $ref("createBookSchema"),
        response: {
          201: $ref("bookResponseSchema"),
        },
      }
    } ,registerBookHandler)

    server.delete('/:id', {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' }
          }
        },
        response: {
          204: {
            type: 'null'
          }
        }
      }
    }, deleteBookHandler)
}