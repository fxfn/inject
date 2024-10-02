import { describe, it } from "node:test"
import assert from "node:assert/strict"
import { container, Container } from "../src"

describe('container', () => {
  it('container should be a Container', () => {
    assert.equal(container instanceof Container, true)
  })

  it('createContainer should create a child container', () => {
    let child = container.createContainer()
    assert.notEqual(child.parent, undefined)
    assert.equal(child instanceof Container, true)
    assert.equal(child.parent, container)
  })

  it("should register a class", () => {
    class TestClass {
      name = "Jay"
    }

    container.register(TestClass, { useClass: TestClass })
    const instance = container.resolve(TestClass)

    assert.equal(instance.name, "Jay")
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
    assert.equal(instance.name, "Jay")
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

    assert.equal(testClass.name, "Jay")
    assert.equal(testClass2.name, "Jim")
  })
})