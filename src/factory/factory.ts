import evaluate from '../evaluate/evaluate';

// spread objects are cast to any because of open issue https://github.com/Microsoft/TypeScript/pull/13288

export type TypeGuard<T> = (subject:T) => boolean;

type CurriedTypeGuard<T> = (typeGuard?:TypeGuard<T>) => CurriedProduct<T>;
type CurriedProduct<T extends Object> = (constructionData:T) => Readonly<T>;

const factory = <T>(defaults:T):CurriedTypeGuard<T> => {
    const evaluator = evaluate(defaults);

    return (typeGuard:TypeGuard<T> = evaluator):CurriedProduct<T> => {
        return (constructionData:T):T => {
            if (typeGuard !== evaluator && !typeGuard(constructionData)) {
                throw 'Invalid construction, type guard didn\'t pass';
            }

            if (!evaluator(constructionData)) {
                throw 'Invalid construction, evaluation didn\'t pass';
            }

            return {
                ...defaults as any,
                ...constructionData as any,
            };
        };
    };
};

export default factory;
