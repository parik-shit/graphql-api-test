const { ApolloServer } = require('apollo-server-express');
const express = require('express');
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb+srv://parikshit152018:vDkH12x5LPPgFdia@cluster0.l1xtqtu.mongodb.net/?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a simple mongoose model
const Book = mongoose.model('Book', {
  title: String,
  author: String,
});

// GraphQL schema
const typeDefs = `
  type Book {
    id: ID!
    title: String!
    author: String!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
  }

  type Mutation {
    addBook(title: String!, author: String!): Book
    updateBook(id: ID!, title: String!, author: String!): Book
    deleteBook(id: ID!): Book
  }
`;

// GraphQL resolvers
const resolvers = {
  Query: {
    books: async () => {
      return await Book.find();
    },
    book: async (_, { id }) => {
      return await Book.findById(id);
    },
  },
  Mutation: {
    addBook: async (_, { title, author }) => {
      const book = new Book({ title, author });
      await book.save();
      return book;
    },
    updateBook: async (_, { id, title, author }) => {
      return await Book.findByIdAndUpdate(id, { title, author }, { new: true });
    },
    deleteBook: async (_, { id }) => {
      return await Book.findByIdAndDelete(id);
    },
  },
};

// Create an Apollo Server with Express
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();
server.applyMiddleware({ app });

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/graphql`);
});
