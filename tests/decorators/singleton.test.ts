import { describe, it, expect } from "vitest"
import { injectable } from "../../src/decorators/injectable"
import { inject } from "../../src/decorators/inject"
import { container } from "../../src"

describe('singleton', () => {
  it('should get a new class each time if it is not a singleton', () => {
    @injectable
    class Database {
      id = crypto.randomUUID()
      provider = "sqlite"
    }

    @injectable
    class MyApp {
      @inject(Database) database1: Database
      @inject(Database) database2: Database
    }

    const myApp = container.resolve(MyApp)
    expect(myApp.database1.id).not.toBe(myApp.database2.id)
  })

  it('injecting a singleton should re-use the existing', () => {

    @injectable.singleton
    class Database {
      id = crypto.randomUUID()
      provider = "sqlite"
    }

    @injectable
    class MyApp {
      @inject(Database) database1: Database
      @inject(Database) database2: Database
    }

    const myApp = container.resolve(MyApp)
    expect(myApp.database1.id).toBe(myApp.database2.id)
  })
})