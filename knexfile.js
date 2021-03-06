// Update with your config settings.

module.exports = {

    development: {
        client: 'sqlite3',
        useNullAsDefault: true,
        connection: {
        filename: './data/lessons.sqlite3'
        },
        pool: {
        afterCreate: (conn, done) => {
            conn.run("PRAGMA foriegn_keys = O", done)
        },
        },
    },
    production: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10
        },
        migrations: {
            tablename: "knex_migrations",
            directory: './migrations',
        }
    }
};



