import {z} from 'zod';
import { buildJsonSchemas } from "fastify-zod";

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
    genre: z.object({
        genre_1: z.string(),
        genre_2: z.string().optional(),
        genre_3: z.string().optional(),
        genre_4: z.string().optional()
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