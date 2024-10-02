# fxfn/inject

Zero-dependency, modern typescript@5 decorators basic DI framework.

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