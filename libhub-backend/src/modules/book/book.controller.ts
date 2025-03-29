import { FastifyReply, FastifyRequest } from "fastify";
import { createBook, getBookbyId, updateBook, getBooks, deleteBook} from "./book.service";
import { CreateBookInput } from "./book.schema";
import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from "../../server";
import crypto from 'crypto';
import { FormData } from "formdata-node";

export async function registerBookHandler(request: FastifyRequest<{Body: FormData}>, reply: FastifyReply) {
    const body:any = request.body;
    const obj:CreateBookInput = JSON.parse(body.document as string);
    const file: any = request.file;
            if (!file) {
              return reply.code(400).send('No file uploaded');
            }
            const rand = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')
            const uid = rand()
              const params = {
                Bucket: process.env.AWS_BUCKET_NAME,
                Key: uid,
                Body: await file.buffer,
                ContentType: file.mimetype
              };
              const upload = new PutObjectCommand(params)
              s3Client.send(upload)
            obj.picture = uid;
    try {
        const book = await createBook(obj);
        reply.code(201).send(book);
    } catch (error) {
        reply.status(500).send(error);
    }
}

export async function getBooksHandler(request: FastifyRequest<{Querystring: {page: string,pageSize:string}}>, reply: FastifyReply) {
    const page = parseInt(request.query.page) || 1;
    const pageSize = parseInt(request.query.pageSize) || 5;
    if (isNaN(page) || page < 1 || isNaN(pageSize) || pageSize < 1) {
        return reply.status(400).send({ error: 'Invalid page or pageSize parameters' });
    }
    try {
        const skip = (page - 1) * pageSize;
        const books = await getBooks(skip,pageSize);
        reply.status(200).send(books);
    } catch (error) {
        reply.status(500).send(error);
    }
}

export async function getBookbyIdHandler(request: FastifyRequest<{Params: {id: number}}>, reply: FastifyReply) {
    const id = request.params.id;
    try {
        const book = await getBookbyId(id);
        reply.send(book);
    } catch (error) {
        reply.status(500).send(error);
    }
}

export async function updateBookHandler(request: FastifyRequest<{Params: {id: number},Body:CreateBookInput}>, reply: FastifyReply) {
    const id = request.params.id;
    const body = request.body;
    const obj = await getBookbyId(id);
    if (body.genre.genre_1 === null|| body.genre.genre_1 === undefined){
        body.genre.genre_1 = obj.genre.genre_1;
    }
    if (body.genre.genre_2 === null||body.genre.genre_2 === undefined && obj.genre.genre_2 !== null){
        body.genre.genre_2 = obj.genre.genre_2;
    }
    if (body.genre.genre_3 === null||body.genre.genre_3 === undefined && obj.genre.genre_3 !== null){
        body.genre.genre_3 = obj.genre.genre_3;
    }
    if (body.genre.genre_4 === null||body.genre.genre_4 === undefined && obj.genre.genre_4 !== null){
        body.genre.genre_4 = obj.genre.genre_4;
    }
    try {
        const book = await updateBook(id, body);
        reply.status(204).send(book);
    } catch (error) {
        reply.status(500).send(error);
    }
}

export async function deleteBookHandler(request: FastifyRequest<{Params: {id: number}}>, reply: FastifyReply) {
    const id = request.params.id;
    try {
        await deleteBook(id);
        reply.status(204).send("Book deleted successfully");
    } catch (error) {
        reply.status(500).send(error);
    }
}