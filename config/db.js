const { Pool } = require('pg');
require('dotenv').config();

if (process.env.NODE_ENV === "development") {
    const pool = new Pool({
        host: process.env.POSTGRES_DEV_HOST,
        database: process.env.POSTGRES_DEV_DATABASE,
        user: process.env.POSTGRES_DEV_USERNAME,
        password: process.env.POSTGRES_DEV_PASSWORD,
        port: parseInt(process.env.POSTGRES_DEV_PORT)
    })
    module.exports = pool;
}else if (process.env.NODE_ENV === "production") {
    const pool = new Pool({
        host: process.env.POSTGRES_DEV_HOST,
        database: process.env.POSTGRES_DEV_DATABASE,
        user: process.env.POSTGRES_DEV_USERNAME,
        password: process.env.POSTGRES_DEV_PASSWORD,
        port: parseInt(process.env.POSTGRES_DEV_PORT)
    })
    module.exports = pool;
}
