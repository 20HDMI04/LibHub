import {books} from './routes/book';
const dotenv = require('dotenv').config();
const fastify = require('fastify')({
    logger: true,
})

fastify.register(books, {fastify:fastify})


fastify.listen({ port: process.env.PORT || 3000 }, (err:Error, address:any) => {
    if (err) {
      fastify.log.error(err)
      process.exit(1)
    }
  })
