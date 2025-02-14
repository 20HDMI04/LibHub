import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { registerAuthorHandler, getAuthorsHandler, deleteAuthorHandler, updateAuthorHandler, getAuthorsbyIdHandler } from "./author.controller";
import { $ref } from "./author.schema";

export async function authorRoutes(server: FastifyInstance) {
    server.get("/",{
      schema:{
        response: {
          200: $ref("authorListResponseSchema")
        }
      }
    }, getAuthorsHandler);

    server.get('/:id', {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' },
          },
        },
        response: {
          200: $ref("getAuthorByIdSchema")
        }
      }
    }, getAuthorsbyIdHandler)

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

    server.put('/:id', {
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
        },
        body: $ref("updateAuthorSchema")
      }
    }, updateAuthorHandler)
}