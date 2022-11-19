import {describe, expect, test} from '@jest/globals';
import {Server} from 'http';

import InitGraphQLServer from './InitGraphQLServer';

const testServer: InitGraphQLServer = new InitGraphQLServer(8088);

//  let started: boolean = false;
// testServer.executeOperation ( {query: {}})


describe('GraphQL Server', () => {
  test(
      'server is up ?',
      async () => expect(await testServer.start())  //
                      .toBe(true));

  test('Brazil ?', async () => {
    const query: string = 'query { country(abbreviation:"BR") { name } }';
    const {data} = await testServer.executeOperation(query);

    expect(JSON.stringify(data)).toBe(`{"country":{"name":"Brazil"}}`);
  });

  test('wrong zip', async () => {
    const query: string =
        `query { zipcode(country:"US", zip: "20240") { postcode } }`;
    const {data} = await testServer.executeOperation(query);
    expect(JSON.stringify(data)).toBe(`{"zipcode":{"postcode":"20240"}}`);
  });
});
