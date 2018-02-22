import evaluate from '../evaluate/evaluate';

// spread objects are cast to any because of open issue https://github.com/Microsoft/TypeScript/pull/13288

type Curried<T extends Object> = (constructionData:T) => Readonly<T>;

const factory = <T extends Object>(defaults:T):Curried<T> => {
    return (constructionData:T):T => {
        return {
            ...defaults as any,
            ...evaluate<T>(defaults)(constructionData) as any,
        };
    };
};

export default factory;
