import { describe, it } from "node:test"
import assert from "node:assert/strict"
import { container } from "../../src"
import { injectable } from "../../src/decorators/injectable"

describe('injectable', () => {
  it('should register a class', () => {
    @injectable
    class InjectableTestClass {
      injected: boolean = true
    }

    let instance = container.resolve(InjectableTestClass)
    assert.equal(instance instanceof InjectableTestClass, true)
    assert.equal(instance.injected, true)
  })
})