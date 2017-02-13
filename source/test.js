/* eslint-env mocha */

const expect = require('expect');
const ab = require('./index.js');

const { entries } = Object;

describe('ab', () => {

    it('exists', () => {
        expect(ab).toBeA('function');
    });

    it('expects a non-null object', () => {

        entries({
            string: '123',
            number: 123,
            undefined: undefined,
            null: null,
            symbol: Symbol()
        }).forEach(([type, arg]) => {
            const fn = () => { ab(arg); };
            expect(fn).toThrow(
                TypeError,
                `expected a non-null object, got ${type}`
            );
        });

        [() => {}, {}].forEach((arg) => {
            const fn = () => { ab(arg); };
            expect(fn).toNotThrow();
        });

    });

    describe('returned proxy', () => {

        const obj = {
            a() { return this; },
            b() { return this; },
            c: 'foo',
            d: { baz: 'qux' }
        };
        const proxy = ab(obj);

        it('is returned', () => {
            expect(proxy).toExist();
        });

        it('automatically binds retrieved functions', () => {
            const a = proxy.a;
            const b = proxy.b;
            expect(a()).toBe(obj);
            expect(b()).toBe(obj);
        });

        it('also returns values that are not functions', () => {
            const c = proxy.c;
            const d = proxy.d;
            expect(c).toBe('foo');
            expect(d).toBe(obj.d);
        });

        it('returns the same bound function on multiple accesses', () => {
            expect(proxy.a).toBe(proxy.a);
            expect(proxy.b).toBe(proxy.b);
            expect(ab(obj).a).toBe(proxy.a);
            expect(ab(obj).b).toBe(proxy.b);
        });

    });


});
