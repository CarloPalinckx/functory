import { TypeGuard } from '../factory/factory';

const evaluate = <T>(defaults:T):TypeGuard<T> => {
    return (subject:T):boolean => {
        return Object.keys(subject).reduce<boolean>(
            (match:boolean, key:keyof T):boolean => {
                return typeof defaults[key] === typeof subject[key] || defaults[key] === null
                    ? match
                    : false;
            },
            true,
        );
    };
};

export default evaluate;
