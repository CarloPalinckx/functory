import { TypeGuard } from './factory/factory';

declare function factory<T>(signature:T, typeGuard:TypeGuard<T>):(constructionData:T) => Readonly<T>;
