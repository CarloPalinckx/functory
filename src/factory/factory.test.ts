import factory from './factory';
import evaluate from '../evaluate/evaluate';

jest.mock('../evaluate/evaluate', () => {
    return jest.fn().mockImplementation(
        () => {
            return jest.fn().mockImplementation((subject:any) => subject);
        },
    );
});

interface Product {
    foo:string;
    bar:string;
}

describe('a curried factory function that allows for easy setting of defaults', () => {
    const defaults:any = { foo: null, bar: 'bar' };

    it('curries into a product', () => {
        const constructionData = { foo: 'foo', bar: 'foo', hurr:'durr' };
        const product = factory<Product>(defaults)(constructionData);

        expect(evaluate).toHaveBeenCalledTimes(1);
        expect(product).toEqual(constructionData);
    });
});
