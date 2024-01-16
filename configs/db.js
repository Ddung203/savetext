import mysql from "mysql2/promise";
const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  database: "db_savetext",
  // password: "password"
});

export default pool;
