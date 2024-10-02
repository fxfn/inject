# fxfn/inject

Zero-dependency basic DI framework using modern typescript@5 decorators. (no experimentalDecorators, no emitDecoratorMetadata, no reflect-metadata)

- [fxfn/inject](#fxfninject)
- [get started](#get-started)
- [examples](#examples)
- [api](#api)
  - [`container.register(type, options)`](#containerregistertype-options)
    - [`RegistrationOptions`](#registrationoptions)
  - [`container.resolve(type, tag?)`](#containerresolvetype-tag)
  - [`@injectable`](#injectable)
  - [`@inject(type: Type<T>, tag?: string)`](#injecttype-typet-tag-string)
- [limitations](#limitations)
- [contributing](#contributing)

## get started

> *******************************************************************
> Your `tsconfig.json` should be using `"target": "ES2022"` at least.
> *******************************************************************

```bash
$ git clone https://github.com/fxfn/inject
$ cd inject
$ pnpm i
$ pnpm run test
$ pnpm run build
```

## examples

### basic

```ts
import { inject, container, injectable } from "./path/to/inject"

@injectable
class UserDetails {
  name = "Jim"
}

@injectable
class User {
  @inject(UserDetail) details: UserDetail
}

const user = container.resolve(User)
  // ?^ { user: { details: "jim" } }
```

## api

A *lot* of inspiration was taken from [TSyringe](https://github.com/microsoft/tsyringe).

### `container.register(type, options)`

Register a type with the container.

| Parameter | Description | Optional |
| --------- | ----------- | -------- |
| `type: Type<T>` | The type to register. | - |
| `options: RegistrationOptions` | Options for the registration. | ✅ |

#### `RegistrationOptions`

| Option | Description | Optional |
| ------ | ----------- | -------- |
| `useClass` | The class to use for the registration. | - |
| `useValue` | The value to use for the registration. | - |
| `tag` | The tag to use for the registration. | ✅ |

One of either `useClass` or `useValue` must be provided.

### `container.resolve(type, tag?)`

Resolve a type from the container.

| Parameter | Description | Optional |
| --------- | ----------- | -------- |
| `type: Type<T>` | The type to resolve. | - |
| `tag?: string` | The tag to use for the resolution. | ✅ |

### `@injectable`

Mark a class as injectable.

### `@inject(type: Type<T>, tag?: string)`

Inject a dependency.

| Parameter | Description | Optional |
| --------- | ----------- | -------- |
| `type: Type<T>` | The type of the dependency to inject. | - |
| `tag?: string` | The tag to use for the injection. | ✅ |


## limitations

- No support for parameter decorators.
- Limited API support.

## contributing

PRs welcome, as long as they don't require adding dependencies to the project.