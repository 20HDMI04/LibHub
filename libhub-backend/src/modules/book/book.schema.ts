import {z} from 'zod';
import { buildJsonSchemas } from "fastify-zod";


/*
id          Int      @id @default(autoincrement())
  title       String
  authorId    Int?
  author      Author?  @relation(fields: [authorId], references: [id])
  description String   @db.LongText
  genre       Json     @db.Json
  published     
 */
const bookCore = {
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string"
    }).trim().min(1, { message: "Title is required!" }),
    authorId: z.number({
            invalid_type_error: "Author ID must be a number"
        }).optional(),    
    description: z.string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string"
    }).trim().min(1, { message: "Description is required!" }),
    genre: z.string().refine((value) => {
        try {
            JSON.parse(value)
            return true
        } catch (error) {
            return false
        }
    }),
    published: z.number(
        {
            invalid_type_error: "Published must be a number"
        }
    ),
}

const createBookSchema = z.object({
    ...bookCore
})

const bookResponseSchema = z.object({
    id: z.number(),
    ...bookCore,
    author: z.object({
        name: z.string(),
        bio: z.string()
    }).optional()
})

const booksResponseSchema = z.array(bookResponseSchema)

const bookDeleteSchema = z.object({
    id: z.number()
})

export const {schemas: bookSchemas, $ref } = buildJsonSchemas({
    createBookSchema,
    bookResponseSchema,
    booksResponseSchema,
    bookDeleteSchema
}, {$id: "book"})
export type CreateBookInput = z.infer<typeof createBookSchema>;