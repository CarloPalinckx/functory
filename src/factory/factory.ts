/*
spread objects are cast any because of open issue https://github.com/Microsoft/TypeScript/pull/13288
 */

type Curried<T> = (constructionData:T) => Readonly<T>;

const factory = <T>(defaults:T):Curried<T> => {
    return (constructionData:Partial<T>):T => {
        return {
            ...defaults as any,
            ...constructionData as any,
        };
    };
};

export default factory;
