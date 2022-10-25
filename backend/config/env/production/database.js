module.exports = ({ env }) => ({
  connection: {
    client: 'postgres',
    connection: {
      host: env('PGHOST', '127.0.0.1'),
      port: env.int('PGPORT', 5682),
      database: env('PGDATABASE', 'railway'),
      user: env('PGUSER', 'postgres'),
      password: env('PGPASSWORD', 'password'),
      ssl: env.bool(true),
    },
  },
})

// module.exports = ({ env }) => ({
//   defaultConnection: 'default',
//   connections: {
//     default: {
//       connector: 'bookshelf',
//       settings: {
//         client: 'postgres',
//         host: env('PGHOST', 'localhost'),
//         port: env.int('PGPORT', 5432),
//         database: env('PGDATABASE', 'strapi'),
//         username: env('PGUSER', 'strapi'),
//         password: env('PGPASSWORD', 'strapi'),
//         schema: env('DATABASE_SCHEMA', 'public'), // Not Required
//         ssl: env.bool(true),
//       },
//       options: {},
//     },
//   },
// });
