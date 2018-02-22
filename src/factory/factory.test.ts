import factory from './factory';

type Product = {
    foo:string,
    bar?:string,
};

describe('a curried factory function that allows for easy setting of defaults', () => {
    it('curries into a product', () => {
        const defaults:Product = { foo: 'bar', bar: 'foo' };

        const product = factory<Product>(defaults)({ foo: 'foo' });

        expect(product).toEqual({ foo: 'foo', bar: 'foo' });
    });
});
