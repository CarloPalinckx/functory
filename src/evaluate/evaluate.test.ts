import evaluate from './evaluate';

describe('a function that compares the key/values of two objects', () => {
    it('passes evaluation', () => {
        const passed = evaluate({ foo: '', bar: '' })({ foo: 'foo', bar: 'bar' });

        expect(passed).toBe(true);
    });

    it('fails evaluation', () => {
        const passed = evaluate({ foo: '', bar: '' })({ foo: 'foo', bar: 12345 } as any);

        expect(passed).toBe(false);
    });

    it('fails evaluation on extraneous keys', () => {
        const passed = evaluate({ foo: '', bar: '' })({ foo: 'foo', bar: 12345, foobar: 'foobar' } as any);

        expect(passed).toBe(false);
    });
});
