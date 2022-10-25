// module.exports = ({ env }) => ({
//   connection: {
//     client: 'postgres',
//     connection: {
//       host: env('PGHOST', '127.0.0.1'),
//       port: env.int('PGPORT', 5682),
//       database: env('PGDATABASE', 'railway'),
//       user: env('PGUSER', 'postgres'),
//       password: env('PGPASSWORD', 'password'),
//       ssl: env.bool(true),
//     },
//   },
// })

module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'postgres',
        host: env('DATABASE_HOST', 'localhost'),
        port: env.int('DATABASE_PORT', 5432),
        database: env('DATABASE_NAME', 'strapi'),
        username: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        schema: env('DATABASE_SCHEMA', 'public'), // Not Required
        ssl: false,
      },
      options: {},
    },
  },
});
