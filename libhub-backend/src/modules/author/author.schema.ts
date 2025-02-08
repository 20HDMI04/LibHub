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
    createdAt: z.string(),
    updatedAt: z.string(),
}

const createAuthorSchema = z.object({
    ...authorCore
})

const authorResponseSchema = z.object({
    ...authorCore,
    ...authorGenerated
})

const authorListResponseSchema = z.object({})

export const {schemas: authorSchemas, $ref } = buildJsonSchemas({
    createAuthorSchema,
    authorResponseSchema,
    authorListResponseSchema    
}, {$id: "author"})

export type CreateAuthorInput = z.infer<typeof createAuthorSchema>;