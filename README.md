[![](https://travis-ci.org/CarloPalinckx/functory.svg?branch=master)](https://travis-ci.org/CarloPalinckx/functory) [![](https://api.codeclimate.com/v1/badges/8d9185b95792c01646bc/maintainability)](https://codeclimate.com/github/CarloPalinckx/functory/maintainability)

# Functory 🏭

This is a small utility that can help you with typeguarding your application's entrypoints.
It helps you with asserting identity of objects. It is based on the idea of immutablejs's [Record.factory](https://facebook.github.io/immutable-js/docs/#/Record.Factory) but instead of producing a class instance it produces a plain objects.
This makes it great for usage with things like [redux](https://github.com/reactjs/redux) and localStorage. 

## Usage 🕹

```typescript
npm install --save functory
```

The factory curries 3 parameters: signature, typeguard and constructionData.

### signature
Consider it a typescript alternative to something like react's proptypes. Instead of using an alternative syntax to type-check, we use typescript's compiler to do this.
It looks like this:

```typescript
import { factory } from 'functory';

interface FooBar {
    readonly foo:string;
    readonly bar:number;
}

const signature:FooBar = {
    foo: '',
    bar: 0,
}
```
The benefit of using a signature like this over proptypes is that it can directly be used as mock for unit tests.

### typeGuard - *optional*

A type guard provides an extra way to assert identity of an object. A type guard looks like this:
```typescript
import { factory } from 'functory';

interface FooBar {
    readonly foo:string;
    readonly bar:number;
}

const signature:FooBar = {
    foo: 'bar',
    bar: 0,
}

const typeGuard = (foobar:FooBar):boolean => {
    return foobar.foo.length > 2;
};

```

### constructionData
All the data you feed into the factory to produce a product.

### Creating your very own FooBar 🎉

```typescript
import { factory } from 'functory';

interface FooBar {
    readonly foo:string;
    readonly bar:number;
}

const signature:FooBar = {
    foo: 'bar',
    bar: 0,
}

const typeGuard = (foobar:FooBar):boolean => {
    return foobar.foo.length > 2;
}

const createFooBar = factory<FooBar>(signature)(typeGuard);

const fooBar = createFooBar({
    foo: 'foo',
    bar: 19,
});

```

### Failed creation 🙅
The factory throws exceptions based on a few evaluations:
- key length equality
- signature typeof comparison
- result of provided typeGuard

Check [factory.test.ts](https://github.com/CarloPalinckx/functory/blob/master/src/factory/factory.test.ts) for a more comprehensive overview of all paths. 

## Constraints 🚩
This module comes with a few constraints and best-practises.

- **Prevent nested values without their own factory.** If you really need to nest your values. Make sure that your nested values have their own factory to ensure type identity.
- **Only use serializable plain objects.** Avoid functions in interfaces at all times. As they make it hard to serialize the product.
