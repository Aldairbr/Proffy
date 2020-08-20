import knex from 'knex'
// import path from 'path'

const database = knex({
  client: 'postgres',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password: '123',
    database: 'proffy'
  },
  migrations: {
    directory: './src/database/migrations'
  },
  useNullAsDefault: true,
})

export default database