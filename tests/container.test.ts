import { describe, it, expect } from "vitest"
import { container, Container } from "../src"

describe('container', () => {
  it('container should be a Container', () => {
    expect(container instanceof Container).toBe(true)
  })

  it('createContainer should create a child container', () => {
    let child = container.createContainer()
    expect(child.parent).not.toBe(undefined)
    expect(child instanceof Container).toBe(true)
    expect(child.parent).toBe(container)
  })

  it("should register a class", () => {
    class TestClass {
      name = "Jay"
    }

    container.register(TestClass, { useClass: TestClass })
    const instance = container.resolve(TestClass)

    expect(instance.name).toBe("Jay")
  })

  it("should register and resolve a class with a tag", () => {
    class BaseClass {
      name = ""
    }

    class TestClass extends BaseClass {
      name = "Jay"
    }

    container.register(BaseClass, { useClass: TestClass, tag: "test" })
    const instance = container.resolve(BaseClass, "test")
    expect(instance.name).toBe("Jay")
  })

  it("should regsiter multiple classes and resolve the correct one by tag", () => {
    class BaseClass {
      name = ""
    }

    class TestClass extends BaseClass {
      name = "Jay"
    }

    class TestClass2 extends BaseClass {
      name = "Jim"
    }

    container.register(BaseClass, { useClass: TestClass, tag: "test" })
    container.register(BaseClass, { useClass: TestClass2, tag: "test2" })
    const testClass = container.resolve(BaseClass, "test")
    const testClass2 = container.resolve(BaseClass, "test2")

    expect(testClass.name).toBe("Jay")
    expect(testClass2.name).toBe("Jim")
  })
})