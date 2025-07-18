import { describe, it, expect } from "vitest"
import { container } from "../../src"
import { injectable } from "../../src/decorators/injectable"

describe('injectable', () => {
  it('should register a class', () => {
    @injectable
    class InjectableTestClass {
      injected: boolean = true
    }

    let instance = container.resolve(InjectableTestClass)
    expect(instance instanceof InjectableTestClass).toBe(true)
    expect(instance.injected).toBe(true)
  })
})