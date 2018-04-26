import evaluate from './evaluate';

describe('evaluate', () => {
    it('should pass evaluation on correct values', () => {
        const evaluation = evaluate({ foo: '', bar: '' })({ foo: 'foo', bar: 'bar' });

        expect(evaluation).toBe(true);
    });

    it('should fail evaluation on non-matching values', () => {
        const evaluation = evaluate({ foo: '', bar: '' })({ foo: 'foo', bar: 12345 } as any);

        expect(evaluation).toBe(false);
    });

    it('should fail evaluation on extraneous keys', () => {
        const evaluation = evaluate({ foo: '', bar: '' })({ foo: 'foo', bar: 12345, foobar: 'foobar' } as any);

        expect(evaluation).toBe(false);
    });

    it('should throw an error when a signature contains "undefined" or "null"', () => {
        const fn = ():void => {
            evaluate({ foo: '', bar: null })({ foo: '', bar: null });
        };

        expect(fn).toThrow(`Incorrect key found in signature, signatures shouldn\'t have null or undefined.Check the value of key: bar.`);
    });

    it('should fail when subject contains "undefined" or "null"', () => {
        const signature = { foo: '', bar: {} };

        const evaluatedNull = evaluate(signature)({ foo: '', bar: null } as any);
        const evaluatedUndefined = evaluate(signature)({ foo: '', bar: undefined } as any);

        expect(evaluatedNull).toBe(false);
        expect(evaluatedUndefined).toBe(false);
    });

    it('should handle recursive signature evaluation', () => {
        const signature = {
            foo: '',
            bar: {
                b: '',
                a: '',
                r: '',
            },
        };

        const invalidData:any = {
            foo: 'foo',
            bar: {
                b: 1,
                a: 2,
                r: 3,
            },
        };

        const validData:any = {
            foo: 'foo',
            bar: {
                b: 'foo',
                a: 'foo',
                r: 'foo',
            },
        };

        const validEvaluation = evaluate(signature)(validData);
        const invalidEvaluation = evaluate(signature)(invalidData);

        expect(validEvaluation).toBe(true);
        expect(invalidEvaluation).toBe(false);
    });
});
