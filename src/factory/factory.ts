import evaluate from '../evaluate/evaluate';

// spread objects are cast to any because of open issue https://github.com/Microsoft/TypeScript/pull/13288

export type TypeGuard<T> = (subject:T) => boolean;
export type CurriedTypeGuard<T> = (typeGuard?:TypeGuard<T>) => CurriedProduct<T>;
export type CurriedProduct<T extends Object> = (constructionData:T) => Readonly<T>;
export type Factory = <T extends Object>(signature:T) => CurriedTypeGuard<T>;

const factory:Factory = <T extends Object>(signature:T):CurriedTypeGuard<T> => {
    const evaluator = evaluate(signature);

    return (typeGuard?:TypeGuard<T>):CurriedProduct<T> => {
        return (constructionData:T):Readonly<T> => {
            if (typeGuard !== undefined && !typeGuard(constructionData)) {
                throw new Error('Invalid construction, type guard didn\'t pass');
            }

            if (!evaluator(constructionData)) {
                throw new Error('Invalid construction, evaluation didn\'t pass');
            }

            return { ...constructionData as any };
        };
    };
};

export default factory;
