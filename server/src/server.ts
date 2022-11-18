import {ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageLocalDefault} from 'apollo-server-core';

import {resolvers} from './graphql/Resolvers'
import {typeDefs} from './graphql/TypeDefs'

const {ApolloServer} = require('apollo-server');

/* create the Server */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  cache: 'bounded',
  plugins: [
    // Install a landing page plugin based on NODE_ENV
    process.env.NODE_ENV === 'production' ?
        ApolloServerPluginLandingPageDisabled()
        // ApolloServerPluginLandingPageProductionDefault({ footer: false, })
        :
        ApolloServerPluginLandingPageLocalDefault({footer: false})
  ],
});

/* start the server */
server
    .listen({
      port: 8080,
      path: '/GraphQL',
    })
    .then(({url}) => console.log(`Ready to serve at ${url} !`));
