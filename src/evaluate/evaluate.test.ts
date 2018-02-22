import evaluate from './evaluate';

describe('a function that evaluates objects and throws an exception when the object is incomplete', () => {
    const defaults = { foo:'foo', bar: 'bar' };

    it('evaluates successfully', () => {
        const evaluated = evaluate(defaults)({ foo: 'bar', bar: 'foo' });

        expect(evaluated).toEqual({ foo: 'bar', bar: 'foo' });
    });

    it('throws an exception on property mismatch', () => {
        const fn = ():void => {
            const constructionData:any = { foo: 1, bar: undefined };

            evaluate(defaults)(constructionData);
        };

        expect(fn).toThrow('Invalid construction, no match with defaults.');
    });

    it('throws an exception on extraneous properties', () => {
        const fn = ():void => {
            const constructionData:any = { foo: 'bar', bar: 'foo', foobar: 'barfoo' };

            evaluate(defaults)(constructionData);
        };

        expect(fn).toThrow('Invalid construction, no match with defaults.');
    });
});
