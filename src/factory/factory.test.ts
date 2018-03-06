import factory from './factory';
import evaluate from '../evaluate/evaluate';

jest.mock('../evaluate/evaluate', () => {
    return jest.fn().mockReturnValue(
        jest.fn().mockImplementation((subject:any) => subject),
    );
});

interface Product {
    foo:string;
    bar:string;
}

describe('a curried factory function that allows for easy setting of signature', () => {
    const signature:Product = { foo: 'foo', bar: 'bar' };

    it('curries into a product', () => {
        const productFactory = factory(signature)();
        const product = productFactory({ foo: 'bar', bar: 'foo' });

        expect(product).toEqual({ foo: 'bar', bar: 'foo' });
    });

    it('throws an exception on failing evaluation', () => {
        (evaluate as jest.Mock).mockReturnValueOnce(() => false);

        /*
         * We cast our constructionData as any to skip compiler checks
         * and fake a scenario where factory input is uncertain or untyped.
         */
        const constructionData:any = { foo: '', bar: 19.12 };
        const productFactory = factory(signature)();

        const fn = ():void => {
            productFactory(constructionData);
        };

        expect(fn).toThrow('Invalid construction, evaluation didn\'t pass');
    });

    it('throws an exception on failing type guard', () => {
        (evaluate as jest.Mock).mockReturnValueOnce(() => true);

        /*
         * the typeGuard is used to provide strict construction rules for a product.
         * It should take the product as a argument and should have a boolean as
         * return value.
         */
        const typeGuard = (product:Product):boolean => {
            return product.bar.length > 3;
        };

        const failingData:Product = { foo: '', bar: '' };
        const productFactory = factory(signature)(typeGuard);

        const fn = ():void => {
            productFactory(failingData);
        };

        expect(fn).toThrow('Invalid construction, type guard didn\'t pass');
    });
});
