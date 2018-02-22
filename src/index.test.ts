import { helloWorld } from './index';

describe('hello world', () => {
    it('hello\'s the world', () => {
        expect(helloWorld).toBe(true);
    });
});
