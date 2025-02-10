import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { registerAuthorHandler, getAuthorsHandler, deleteAuthorHandler } from "./author.controller";
import prisma from "../../utils/prisma";
import { $ref } from "./author.schema";

export async function authorRoutes(server: FastifyInstance) {
    server.get("/",{
      schema:{
        response: {
          200: $ref("authorListResponseSchema")
        }
      }
    }, getAuthorsHandler);

  server.post('/',
    {
      schema: {
        body: $ref("createAuthorSchema"),
        response: {
          201: $ref("authorResponseSchema"),
        },
      }
    } ,registerAuthorHandler)

    server.delete('/:id', {
      schema: {
        response: {
          204: {
            type: 'string',
          },
        },
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
        }
      }
    }, deleteAuthorHandler)
}