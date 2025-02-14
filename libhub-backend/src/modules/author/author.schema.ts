import {z} from 'zod';
import { buildJsonSchemas } from "fastify-zod";

const authorCore = {
    name: z.string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string"
    }).trim().min(1, { message: "Name is required!" }),
    bio: z.string({
        required_error: "Bio is required",
        invalid_type_error: "Bio must be a string"
    }).trim().min(1, { message: "Bio is required!" }),
}

const authorGenerated = {
    id: z.number(),
    createdAt: z.string().optional(),
    updatedAt: z.string().optional(),
}

const createAuthorSchema = z.object({
    ...authorCore
})

const authorResponseSchema = z.object({
    ...authorCore,
    ...authorGenerated,
    books: z.array(z.object({
        title: z.string()
    })).optional()
})

const authorListResponseSchema = z.array(authorResponseSchema)

const getAuthorByIdSchema = z.object({
    ...authorCore,
    ...authorGenerated,
    books: z.array(z.object({
        title: z.string()
    })).optional()
})

const deleteAuthorSchema = z.object({
    id: z.number()
})

const updateAuthorSchema = z.object({
    name: z.string({}).optional(),
    bio: z.string({}).optional()
})

export const {schemas: authorSchemas, $ref } = buildJsonSchemas({
    createAuthorSchema,
    authorResponseSchema,
    authorListResponseSchema,
    deleteAuthorSchema,
    updateAuthorSchema,
    getAuthorByIdSchema    
}, {$id: "author"})

export type CreateAuthorInput = z.infer<typeof createAuthorSchema>;
export type UpdateAuthorInput = z.infer<typeof updateAuthorSchema>;