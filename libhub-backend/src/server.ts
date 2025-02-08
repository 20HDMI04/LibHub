import 'dotenv/config'
import Fastify from 'fastify'
import bookRoutes from './modules/book/book.route'
import { bookSchemas } from './modules/book/book.schema'
import { authorRoutes } from './modules/author/author.route'
import { authorSchemas } from './modules/author/author.schema'

const server = Fastify({
  logger: true
})

async function main() {
  for (const schema of [...bookSchemas, ...authorSchemas]) {
    server.addSchema(schema)
  }

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