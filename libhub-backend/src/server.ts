import 'dotenv/config'
import Fastify from 'fastify'
import bookRoutes from './modules/book/book.route'
import { bookSchemas } from './modules/book/book.schema'

const server = Fastify({
  logger: true
})



async function main() {
  for (const schema of bookSchemas) {
    server.addSchema(schema)
  }
  
  server.register(bookRoutes, {prefix: 'api/books'});
  
  try {
    server.listen({ port: 3000, host: '0.0.0.0' })
  } catch (err:any) {
    server.log.error(err)
    process.exit(1)
  }
}


main();