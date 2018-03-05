import { TypeGuard } from './factory/factory';

declare function factory<T>(defaults:T, typeGuard:TypeGuard<T>):(constructionData:T) => Readonly<T>;
