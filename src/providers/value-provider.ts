import { type Provider } from ".";
import { Constructor } from "../types";

export interface ValueProvider<T> {
  useValue: T;
}

export function isValueProvider<T>(
  provider: Provider<T>
): provider is ValueProvider<any> {
  return !!(provider as ValueProvider<T>).useValue;
}