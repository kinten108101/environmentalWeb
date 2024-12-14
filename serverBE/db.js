const Pool = require('pg').Pool

const pool = new Pool({
    user: "postgres",
    host: "192.168.1.8",
    database: "weather",
    password: "1234",
    port: 5432,
})

module.exports = pool;
