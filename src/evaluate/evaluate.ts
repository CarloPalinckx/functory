import { TypeGuard } from '../factory/factory';

const evaluate = <T extends { [key:string]:any }>(signature:T):TypeGuard<T> => {
    Object.keys(signature).forEach((key):void => {
        if (signature[key] === null || signature[key] === undefined) {
            throw new Error(`Incorrect key found in signature, signatures shouldn\'t have null or undefined.Check the value of key: ${key}.`);
        }
    });

    return (subject:T):boolean => {
        if (Object.keys(subject).length !== Object.keys(signature).length) {
            return false;
        }

        return Object.keys(subject).reduce<boolean>(
            (match:boolean, key:keyof T):boolean => {
                if (subject[key] === null || subject[key] === undefined) {
                    return false;
                }

                if (Array.isArray(signature[key]) && Array.isArray(subject[key])) {
                    return (subject[key] as any).reduce(
                        (valid:boolean, item:Object):boolean => {
                            return evaluate(signature[key][0])(item)
                                ? valid
                                : false;
                        },
                        true,
                    );
                }

                if (typeof signature[key] === 'object' && typeof subject[key] === 'object') {
                    return evaluate(signature[key])(subject[key]);
                }

                return typeof signature[key] === typeof subject[key]
                    ? match
                    : false;
            },
            true,
        );
    };
};

export default evaluate;
