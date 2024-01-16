// server.js
const express = require('express');
const { ApolloServer } = require('@apollo/server');
const mongoose = require('mongoose');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');

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
