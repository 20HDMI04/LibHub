import {z} from 'zod';
import { buildJsonSchemas } from "fastify-zod";
const bookCore = {
    title: z.string({
        required_error: "Title is required",
        invalid_type_error: "Title must be a string"
    }),
    authorId: z.number({
            invalid_type_error: "Author ID must be a number"
        }).optional(),    
    description: z.string({
        required_error: "Description is required",
        invalid_type_error: "Description must be a string"
    }),
}

const createBookSchema = z.object({
    ...bookCore
})

const createBookResponseSchema = z.object({
    id: z.number(),
    ...bookCore,
})

export const {schemas: bookSchemas, $ref } = buildJsonSchemas({
    createBookSchema,
    createBookResponseSchema
})
export type CreateBookInput = z.infer<typeof createBookSchema>;