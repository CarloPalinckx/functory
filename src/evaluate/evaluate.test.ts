import evaluate from './evaluate';

describe('a function that evaluates objects and throws an exception when the object is incomplete', () => {
    interface Product {
        foo:string;
        bar:string;
    }

    const defaults:Product = { foo:'foo', bar: 'bar' };

    it('evaluates successfully', () => {
        const evaluated = evaluate(defaults)({ foo: 'bar', bar: 'foo' });

        expect(evaluated).toEqual({ foo: 'bar', bar: 'foo' });
    });

    it('throws an exception on property mismatch', () => {
        const fn = ():void => {
            evaluate(defaults)({ foo: 1, bar: undefined } as any);
        };

        expect(fn).toThrow('Invalid construction, no match with signature.');
    });

    it('throws an exception on extraneous properties', () => {
        const fn = ():void => {
            evaluate(defaults)({ foo: 'bar', bar: 'foo', foobar: 'barfoo' } as any);
        };

        expect(fn).toThrow('Invalid construction, no match with signature.');
    });

    it('throws an exception when type guard is not passed, no-ops otherwise', () => {
        const typeGuard = (subject:Product):boolean => {
            return subject.bar.length === 3;
        };

        const evaluator = evaluate<Product>(defaults, typeGuard);
        const product = evaluator({ foo: 'foo', bar: 'foo' });

        const fn = ():void => {
            evaluator({ foo: 'bar', bar: 'barbapapa' } as any);
        };

        expect(product).toEqual(product);
        expect(fn).toThrow('Invalid construction, type guard not passed.');
    });
});
