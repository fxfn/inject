import { container } from "../container"
import { InjectionToken } from "../types"
import { singleton } from "./singleton"

type Constructor<T = {}> = new (...args: any[]) => T

export function injectable<Class extends Constructor>(
  token: InjectionToken
) {
  return (Value: Class, context: ClassDecoratorContext<Class>) => {
    container.register(token, { useClass: Value })
    return Value
  }
}

injectable.singleton = singleton