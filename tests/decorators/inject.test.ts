import { it, describe } from "node:test"
import assert from "node:assert/strict"
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
    assert.equal(myApp.database instanceof Database, true)
    assert.equal(myApp.database.connected, false)
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
    assert.equal(myApp.database instanceof Database, true)
    assert.equal(myApp.database.provider instanceof DatabaseProvider, true)
    assert.equal(myApp.database.provider.name, 'sqlite')
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
    assert.equal(myApp.mysqlProvder instanceof MySQLDatabaseProvider, true)
    assert.equal(myApp.mysqlProvder.name, 'mysql')
    assert.equal(myApp.sqliteProvider instanceof SqliteDatabaseProvider, true)
    assert.equal(myApp.sqliteProvider.name, 'sqlite')
  })
})