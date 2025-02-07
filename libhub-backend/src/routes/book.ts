const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
    log: ['query'],
});

export async function books(fastify:any) {
    fastify.get("/books", async (request:any, reply:any) => {
    const books = await prisma.book.findMany();
    console.log(books);
    return books;  
  });
}
