import evaluate from '../evaluate/evaluate';

// spread objects are cast to any because of open issue https://github.com/Microsoft/TypeScript/pull/13288

export type TypeGuard<T> = (subject:T) => boolean;

type Curried<T extends Object> = (constructionData:T) => Readonly<T>;

const factory = <T>(defaults:T, typeGuard?:TypeGuard<T>):Curried<T> => {
    return (constructionData:T):T => {
        return {
            ...defaults as any,
            ...evaluate<T>(defaults, typeGuard)(constructionData) as any,
        };
    };
};

export default factory;
