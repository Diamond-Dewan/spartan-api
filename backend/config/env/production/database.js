module.exports = ({ env }) => ({
  defaultConnection: 'default',
  connections: {
    default: {
      connector: 'bookshelf',
      settings: {
        client: 'mysql',
        host: env('MYSQLHOST', 'localhost'),
        port: env.int('MYSQLPORT', 3306),
        database: env('MYSQLDATABASE', 'strapi'),
        username: env('MYSQLUSER', 'strapi'),
        password: env('MYSQLPASSWORD', 'strapi'),
      },
      options: {},
    },
  },
});

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
//         // schema: env('DATABASE_SCHEMA', 'public'), // Not Required
//         ssl: false,
//       },
//       options: {},
//     },
//   },
// });
