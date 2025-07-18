import { it, describe, expect } from "vitest"
import { inject } from "../../src/decorators/inject"
import { injectable } from "../../src/decorators/injectable"
import { container } from "../../src"

describe('inject', () => {
  it('should inject a dependency', () => {
    @injectable
    class Database {
      connected = false
    }

    @injectable
    class MyApp {
      @inject(Database) database!: Database
    }

    let myApp = container.resolve(MyApp)
    expect(myApp.database instanceof Database).toBe(true)
    expect(myApp.database.connected).toBe(false)
  })

  it('should inject deep dependencies', () => {
    @injectable
    class DatabaseProvider {
      name = "sqlite"
    }

    @injectable
    class Database {
      @inject(DatabaseProvider) provider: DatabaseProvider
    }

    @injectable
    class MyApp {
      @inject(Database) database: Database
    }

    const myApp = container.resolve(MyApp)
    expect(myApp.database instanceof Database).toBe(true)
    expect(myApp.database.provider instanceof DatabaseProvider).toBe(true)
    expect(myApp.database.provider.name).toBe('sqlite')
  })

  it('should inject the correct dependency if a tag is provided', () => {
    abstract class IDatabaseProvider {
      abstract name: string
    }

    class SqliteDatabaseProvider implements IDatabaseProvider {
      name = "sqlite"
    }

    class MySQLDatabaseProvider implements IDatabaseProvider {
      name = "mysql"
    }

    container.register(IDatabaseProvider, { useClass: SqliteDatabaseProvider, tag: 'sqlite' })
    container.register(IDatabaseProvider, { useClass: MySQLDatabaseProvider, tag: 'mysql' })

    @injectable
    class MyApp {
      @inject(IDatabaseProvider, 'mysql') mysqlProvder: IDatabaseProvider
      @inject(IDatabaseProvider, 'sqlite') sqliteProvider: IDatabaseProvider
    }

    const myApp = container.resolve(MyApp)
    expect(myApp.mysqlProvder instanceof MySQLDatabaseProvider).toBe(true)
    expect(myApp.mysqlProvder.name).toBe('mysql')
    expect(myApp.sqliteProvider instanceof SqliteDatabaseProvider).toBe(true)
    expect(myApp.sqliteProvider.name).toBe('sqlite')
  })

  it('should inject the dependency in the order they are registered in', () => {

    abstract class IDataProvider {
      abstract name: string
    }

    class OneDataProvider implements IDataProvider {
      name = "one"
    }

    class TwoDataProvider implements IDataProvider {
      name = "two"
    }

    container.register(IDataProvider, { useClass: OneDataProvider, tag: 'one' })
    container.register(IDataProvider, { useClass: TwoDataProvider, tag: 'two' })

    const providers = container.resolveAll(IDataProvider)
    expect(providers[0].name).toBe('one')
    expect(providers[1].name).toBe('two')
  })
})