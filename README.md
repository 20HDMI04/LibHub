# LibHub
A project to store some book data and manage it. IMDB + Books = LibHub
It will be a place where every book lover can write a comment on a book.

# Backend Documentation
## Backend Tools
Fastify, Prisma, Mariadb on Docker

### Overview
This backend system provides APIs for managing books and authors.

## API Reference
### Get Author/Books
Retrieves the first 5 Authors or Books ordered by its ID.
You could also specify how many items you need at the same time and what page you need.
#### Authors
`GET http://localhost:3000/api/v1/authors`
#### Books
`GET http://localhost:3000/api/v1/books`
#### Authors Specified
`GET http://localhost:3000/api/v1//authors?page=1&pageSize=5`
You will get the first five author.
#### Books Specified
`GET http://localhost:3000/api/v1/books?page=1&pageSize=5`
You will get the first five book.

**Responses:**

#### Authors
```json
{
  "name": "Dazai Osamu",
  "bio": "An interesting writer.",
  "id": 2,
  "createdAt": "2025-02-14T11:09:29.066Z",
  "updatedAt": "2025-02-14T11:22:40.361Z",
  "books": []
}
```
#### Books
```json
{
  "id": 1,
  "title": "Ningen Sikkaku (No Longer Human)",
  "description": "It tells the story of a troubled man incapable of revealing his true self to others, and who, instead, maintains a façade of hollow jocularity, later turning to a life of alcoholism and drug abuse before his final disappearance.",
  "genre": {
    "genre_1":"some genre",
    "genre_2":"some genre (optional)"
  },
  "published": 1948,
  "author": {}
}
```

### Get Author/Books by its ID
Retrieves a specific Author or Book by its ID.
#### Authors
`GET http://localhost:3000/api/v1/authors/2`
#### Books
`GET http://localhost:3000/api/v1/books/1`

**Responses:**

#### Authors
```json
{
  "name": "Dazai Osamu",
  "bio": "An interesting writer.",
  "id": 2,
  "createdAt": "2025-02-14T11:09:29.066Z",
  "updatedAt": "2025-02-14T11:22:40.361Z",
  "books": []
}
```
#### Books
```json
{
  "id": 1,
  "title": "Ningen Sikkaku (No Longer Human)",
  "description": "It tells the story of a troubled man incapable of revealing his true self to others, and who, instead, maintains a façade of hollow jocularity, later turning to a life of alcoholism and drug abuse before his final disappearance.",
  "genre": "{ 1:'Novel', 2:'Fiction'}",
  "published": 1948,
  "author": {}
}
```

### Create Author/Books
Create one instance of an Author or a Book.
#### Authors
`POST http://localhost:3000/api/v1/authors`
#### Books
`POST http://localhost:3000/api/v1/books`

### Body
#### Authors
```json
{
  "name": "Dazai Osamu", (String)
  "bio": "An interesting writer." (String)
}
```
#### Books
```json
{
  "title": "Ten little indian", (String)
  "description": "A fascinating mistery book.", (String)
  "genre": {
    "genre_1": "Mistery", (String)
    "genre_2": "(optional)", (String)
    "genre_3": "(optional)", (String)
    "genre_4": "(optional)" (String)
  }, (String)
  "published": 1956, (Int)
  "authorId": 1 (Int?/Optional)
}
```
**Responses:**
#### Authors
```json
{
  "name": "Dazai Osamu",
  "bio": "Japanese writer.",
  "id": 4,
  "createdAt": "2025-02-14T12:50:28.296Z",
  "updatedAt": "2025-02-14T12:50:28.296Z"
}
```
#### Books
```json
{
  "id": 8,
  "title": "Ten little indian",
  "description": "A fascinating mistery book.",
  "genre": {
    "genre_1": "Mistery"
  },
  "published": 1956,
  "authorId": (optional)
}
```



