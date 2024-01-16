// resolvers.js
import {Book} from './models/Book.js';


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
    addBook: async (_, args) => {
      const newBook = new Book(args);
      return await newBook.save();
    },
    updateBook: async (_, { id, ...rest }) => {
      return await Book.findByIdAndUpdate(id, rest, { new: true });
    },
    deleteBook: async (_, { id }) => {
      return await Book.findByIdAndRemove(id);
    },
  },
};

export {resolvers};
