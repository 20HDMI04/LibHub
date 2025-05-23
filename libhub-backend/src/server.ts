import 'dotenv/config'
import Fastify from 'fastify'
import bookRoutes from './modules/book/book.route'
import { bookSchemas } from './modules/book/book.schema'
import { authorRoutes } from './modules/author/author.route'
import { authorSchemas } from './modules/author/author.schema'
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import '@fastify/cors'


const multer = require('fastify-multer')
const storage = multer.memoryStorage()
export const upload = multer({ storage: storage })

const server = Fastify({
  logger: true
})

server.register(require('@fastify/cors'), {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
});

if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY) {
  throw new Error('AWS credentials are not defined');
}

export const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  endpoint: process.env.AWS_ENDPOINT,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: true,
});

async function main() {
  for (const schema of [...bookSchemas, ...authorSchemas]) {
    server.addSchema(schema)
  }
  server.register(multer.contentParser);
  server.register(require('@fastify/swagger'));
  server.register(require('@fastify/swagger-ui'),{
    routePrefix: '/documentation',
  });
  server.register(bookRoutes, {prefix: 'api/v1/books'});
  server.register(authorRoutes, {prefix: 'api/v1/authors'});

  try {
    server.listen({ port: 3000, host: '0.0.0.0' })
  } catch (err:any) {
    server.log.error(err)
    process.exit(1)
  }
}


main();