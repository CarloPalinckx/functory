import { TypeGuard } from '../factory/factory';

const evaluate = <T>(signature:T):TypeGuard<T> => {
    return (subject:T):boolean => {
        if (Object.keys(subject).length !== Object.keys(signature).length) {
            return false;
        }

        return Object.keys(subject).reduce<boolean>(
            (match:boolean, key:keyof T):boolean => {
                return typeof signature[key] === typeof subject[key] || signature[key] === null
                    ? match
                    : false;
            },
            true,
        );
    };
};

export default evaluate;
