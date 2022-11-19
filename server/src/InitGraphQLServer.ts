import {ApolloServerPluginLandingPageDisabled, ApolloServerPluginLandingPageLocalDefault} from 'apollo-server-core';

import {resolvers} from './graphql/Resolvers'
import {typeDefs} from './graphql/TypeDefs'

const {ApolloServer} = require('apollo-server');

export interface IResult {
  data?: any, errors?: any[],
}

export default class InitGraphQLServer {
  private server: typeof ApolloServer;
  private port: number;
  private path: string;
  private initied: boolean = false;
  public executeOperation(query: string): Promise<IResult> {
    return this.server.executeOperation({query});
  };

  constructor(port: number = 8080, path: string = '/GraphQL') {
    /* create the Server instance*/
    this.server = new ApolloServer({
      typeDefs,
      resolvers,
      cache: 'bounded',
      plugins: [
        // Install a landing page plugin based on NODE_ENV
        process.env.NODE_ENV === 'production' ?
            ApolloServerPluginLandingPageDisabled()
            // ApolloServerPluginLandingPageProductionDefault({ footer: false,
            // })
            :
            ApolloServerPluginLandingPageLocalDefault({footer: false})
      ],
    });
    this.port = port;
    this.path = path;
  }

  async start(): Promise<boolean> {
    /* start the server */
    return this.server
        .listen({
          port: this.port,
          path: this.path,
        })
        .then(({url}) => {
          console.log(`Ready to serve at ${url} !`);
          this.initied = true;
          return true;
        })
        .catch((err) => {
          console.error(err);
          this.initied = false;
          return false;
        });
  }
};
