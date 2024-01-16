// server.js
import express from 'express';
import { ApolloServer } from '@apollo/server';
import mongoose from 'mongoose';
import typeDefs from './schema.js';
import resolvers from './resolvers.js';

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });

server.applyMiddleware({ app });

const PORT = process.env.PORT || 3000;

mongoose
  .connect('mongodb+srv://parikshit152018:vDkH12x5LPPgFdia@cluster0.l1xtqtu.mongodb.net/?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => console.error('Error connecting to MongoDB:', error));
