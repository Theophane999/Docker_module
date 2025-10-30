"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPool = getPool;
const promise_1 = require("mysql2/promise");
const { DB_HOST = 'localhost', DB_PORT = '3306', DB_USER = 'root', DB_PASSWORD = '', DB_NAME = 'appdb', } = process.env;
let pool;
async function getPool() {
    if (!pool) {
        pool = (0, promise_1.createPool)({
            host: DB_HOST,
            port: parseInt(DB_PORT, 10),
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_NAME,
            connectionLimit: 5,
        });
        let attempts = 0;
        while (attempts < 30) {
            try {
                const conn = await pool.getConnection();
                conn.release();
                break;
            }
            catch (e) {
                attempts++;
                await new Promise(r => setTimeout(r, 1000));
            }
        }
    }
    return pool;
}
