// server.js
import express from 'express';
import { expressMiddleware } from '@apollo/server/express4';
import mongoose from 'mongoose';
import {typeDefs} from './schema.js';
import {resolvers} from './resolvers.js';
import { ApolloServer } from '@apollo/server';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import cors from 'cors';

const app = express();

const server = new ApolloServer({ typeDefs, resolvers });



  // server.start().then(() => {
  //   server.applyMiddleware({ app });
  
  //   const PORT = process.env.PORT || 3000;
  
  //   mongoose
  //     .connect('mongodb+srv://parikshit152018:vDkH12x5LPPgFdia@cluster0.l1xtqtu.mongodb.net/?retryWrites=true&w=majority', {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //     })
  //     .then(() => {
  //       app.listen(PORT, () => {
  //         console.log(`Server listening on port ${PORT}`);
  //       });
  //     })
  //     .catch((error) => console.error('Error connecting to MongoDB:', error));
  // });


  const PORT = process.env.PORT || 3000;
  await server.start();
  app.use(
    
    '/graphql',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
    
    
  
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
      .catch((error) => console.error('Error connecting to MongoDB:', error))
  );
  
  await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);