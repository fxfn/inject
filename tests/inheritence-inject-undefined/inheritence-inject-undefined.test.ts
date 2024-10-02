import { describe, it } from "node:test"
import assert from "node:assert"
import { container } from "../../src"
import { JsonTransform } from "./json-transform"
import { LoggingService } from "./logging"
import { ITransform } from "./transform"

describe("regression tests", () => {
  it("should not produce undefined when injecting LoggingService into JsonTransform", () => {
    container.register(LoggingService, { useClass: LoggingService })
    container.register(JsonTransform, { useClass: JsonTransform })

    const jsonTransform = container.resolve(JsonTransform)
    assert.notEqual(jsonTransform.loggingService, undefined)
  })

  it("should not produce undefined when injecting LoggingService into JsonTransform when using tags", () => {
    container.register(LoggingService, { useClass: LoggingService })
    container.register(ITransform, { useClass: JsonTransform, tag: "json" })

    const jsonTransform = container.resolve(ITransform, "json")
    assert.notEqual((jsonTransform as JsonTransform).loggingService, undefined)
  })
})