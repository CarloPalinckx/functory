import { TypeGuard } from '../factory/factory';

type Curried<T> = (subject:T) => T;

const evaluate = <T>(defaults:T, typeGuard?:TypeGuard<T>):Curried<T> => {
    return (subject:T):T => {
        const matches = Object.keys(subject).reduce<boolean>(
            (match:boolean, key:keyof T):boolean => {
                return (
                    defaults.hasOwnProperty(key) &&
                    (typeof defaults[key] === typeof subject[key] || defaults[key] === null)
                ) ? match : false;
            },
            true,
        );

        if (!matches) {
            throw 'Invalid construction, no match with signature.';
        }

        if (typeGuard !== undefined && !(typeGuard(defaults) && typeGuard(subject))) {
            throw 'Invalid construction, type guard not passed.';
        }

        return subject;
    };
};

export default evaluate;
