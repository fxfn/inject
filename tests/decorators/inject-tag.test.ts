import { it, describe } from "node:test"
import assert from "node:assert/strict"
import { inject } from "../../src/decorators/inject"
import { injectable } from "../../src/decorators/injectable"
import { container } from "../../src"

abstract class ILogger {
  abstract info(...args: any[]): void
}

@injectable
class ConsoleLogger {
  info(...args: any[]) {
    console.log(...args)
  }
}

@injectable
class NullLogger {
  info(...args: any[]) {
    return void 0
  }
}

describe('register with tags', () => {
  it('should resolve the correct dependency with a tag', () => {
    container.register(ILogger, { useClass: ConsoleLogger, tag: "console" })
    container.register(ILogger, { useClass: NullLogger, tag: "null" })

    const nullLogger = container.resolve(ILogger, "null")
    assert.equal(nullLogger instanceof NullLogger, true)

    const consoleLogger = container.resolve(ILogger, "console")
    assert.equal(consoleLogger instanceof ConsoleLogger, true)
  })
})