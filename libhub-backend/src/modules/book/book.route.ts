import { FastifyInstance } from "fastify";
import { registerBookHandler, getBooksHandler, deleteBookHandler, getBookbyIdHandler, updateBookHandler, getMainBooksHandler } from "./book.controller";
import { $ref, CreateBookInput } from "./book.schema";
import { MultipartFile } from "@fastify/multipart";
import { upload } from "../../server";
import { FormData } from "formdata-node";

export default async function bookRoutes(server: FastifyInstance) {
    
  server.get('/', {
    schema:{
      querystring:{
        type: 'object',
        properties:{
          page: {type: 'string'},
          pageSize: {type: 'string'}
        }
      },
      response: {
        200: $ref("booksResponseSchema")
      }
    }
  }, getBooksHandler)

  server.get('/main',{
    schema: {
      response: {
        200: $ref("mainBookResponseSchema")
      }
    }
  }, getMainBooksHandler)

  server.get('/:id', {
        schema: {
          params: {
            type: 'object',
            properties: {
              id: { type: 'number' },
            },
          },
          response: {
            200: $ref("getBookByIdSchema")
          }
        }
      }, getBookbyIdHandler)

    server.post<{Body: FormData}>('/',
        { preHandler: upload.single('image'), handler: registerBookHandler }
    );
  
    server.put('/:id', {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'number' }
          }
        },
        body: $ref("bookUpdateSchema"),
        response: {
          204: $ref("bookResponseSchema")
        }
      }
    }, updateBookHandler)

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
            type: 'string'
          }
        }
      }
    }, deleteBookHandler)
}