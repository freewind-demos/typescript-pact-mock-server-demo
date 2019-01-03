import axios from 'axios';
import {expect} from 'chai';
import * as path from 'path';
import {InteractionObject} from '@pact-foundation/pact';
const {Pact} = require('@pact-foundation/pact');

const MOCK_SERVER_PORT = 9999;

const provider = new Pact({
  consumer: "typescript-pact-consumer-demo",
  provider: "typescript-pact-provider-demo",
  port: MOCK_SERVER_PORT,
  log: path.resolve(process.cwd(), "logs", "pact.log"),
  dir: path.resolve(process.cwd(), "pacts"),
  logLevel: "INFO",
  spec: 2
});

describe('Hello', () => {

  before(async () => {
    await provider.setup();
    await provider.addInteraction({
      state: "A do nothing state",
      uponReceiving: "a hello to typescript",
      withRequest: {
        method: "GET",
        path: "/hello"
      },
      willRespondWith: {
        status: 200,
        body: "Hi!"
      }
    } as InteractionObject);
  });

  after(() => {
    return provider.finalize();
  });

  it('should get response from mock server', async () => {
    const response = await axios.get(`http://localhost:${MOCK_SERVER_PORT}/hello`);
    expect(response.data).to.equal("Hi!");
  });

});
