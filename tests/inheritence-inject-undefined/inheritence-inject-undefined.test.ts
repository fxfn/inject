import { describe, it, expect } from "vitest"
import { container } from "../../src"
import { JsonTransform } from "./json-transform"
import { LoggingService } from "./logging"
import { ITransform } from "./transform"

describe("regression tests", () => {
  it("should not produce undefined when injecting LoggingService into JsonTransform", () => {
    container.register(LoggingService, { useClass: LoggingService })
    container.register(JsonTransform, { useClass: JsonTransform })

    const jsonTransform = container.resolve(JsonTransform)
    expect(jsonTransform.loggingService).not.toBe(undefined)
  })

  it("should not produce undefined when injecting LoggingService into JsonTransform when using tags", () => {
    container.register(LoggingService, { useClass: LoggingService })
    container.register(ITransform, { useClass: JsonTransform, tag: "json" })

    const jsonTransform = container.resolve(ITransform, "json")
    expect((jsonTransform as JsonTransform).loggingService).not.toBe(undefined)
  })
})