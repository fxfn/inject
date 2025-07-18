import { type Provider } from ".";

export interface ValueProvider<T> {
  useValue: T;
}

export function isValueProvider<T>(
  provider: Provider<T>
): provider is ValueProvider<any> {
  return 'useValue' in provider;
}