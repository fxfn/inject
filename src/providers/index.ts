import { type ClassProvider, isClassProvider } from "./class-provider";
import { type ValueProvider, isValueProvider } from "./value-provider";

export type Provider<T = any> =
  { tag?: string} & (
    | ClassProvider<T>
    | ValueProvider<T>
  )

export function isProvider(provider: any): provider is Provider {
  return (
    isClassProvider(provider) ||
    isValueProvider(provider)
  )
}