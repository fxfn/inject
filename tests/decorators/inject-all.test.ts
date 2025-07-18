import { describe, it, expect } from "vitest";
import { injectable } from "../../src/decorators/injectable";
import { container } from "../../src";
import { injectAll } from "../../src/decorators/inject-all";

describe('injectAll', () => {
  it('should inject all the registered dependencies from a string and return an array', () => {

    interface DatabaseProvider {
      name: string
    }

    class DatabaseProviderSqlite implements DatabaseProvider {
      name = "sqlite"
    }

    class DatabaseProviderMySQL implements DatabaseProvider {
      name = "mysql"
    }

    class DatabaseProviderSqlServer implements DatabaseProvider {
      name = "sqlserver"
    }

    container.register("DatabaseProvider", { useClass: DatabaseProviderSqlite })
    container.register("DatabaseProvider", { useClass: DatabaseProviderMySQL })
    container.register("DatabaseProvider", { useClass: DatabaseProviderSqlServer })

    @injectable
    class MyApp {
      @injectAll("DatabaseProvider") providers: DatabaseProvider[]
    }

    const myApp = container.resolve(MyApp)
    expect(myApp.providers.length).toBe(3)
  })

  it('should inject all the registered dependencies from a token and return an array', () => {
    abstract class DatabaseProvider {
      name: string
    }

    class DatabaseProviderSqlite implements DatabaseProvider {
      name = "sqlite"
    }

    class DatabaseProviderMySQL implements DatabaseProvider {
      name = "mysql"
    }

    class DatabaseProviderSqlServer implements DatabaseProvider {
      name = "sqlserver"
    }

    container.register(DatabaseProvider, { useClass: DatabaseProviderSqlite })
    container.register(DatabaseProvider, { useClass: DatabaseProviderMySQL })
    container.register(DatabaseProvider, { useClass: DatabaseProviderSqlServer })

    @injectable
    class MyApp {
      @injectAll(DatabaseProvider) providers: DatabaseProvider[]
    }

    const myApp = container.resolve(MyApp)
    expect(myApp.providers.length).toBe(3)
  })
})