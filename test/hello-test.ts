import hello from '../src/hello';
import {expect} from 'chai';

describe('Hello', () => {
  it('hello', async () => {
    const message = await hello('typescript');
    expect(message).to.equal('Hello, typescript!');
  })
});
