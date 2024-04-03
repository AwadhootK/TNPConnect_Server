const { Pool } = require('pg')
require('dotenv').config()


async function createTable(
  tableName,
  columnNames,
  columnTypes
) {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL_POOL
  });

  console.log('creating table for ' + tableName);

  const client = await pool.connect()
  try {
    console.log(process.env.DATABASE_URL_POOL);

    var query;
    if (columnNames == undefined || columnNames == null || columnTypes == undefined || columnTypes == null) {
      query = `CREATE TABLE IF NOT EXISTS "${tableName}" (
        enrollmentNo VARCHAR(255) PRIMARY KEY,
        FOREIGN KEY (enrollmentNo) REFERENCES "Student"("enrollmentNo") 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
    )`;
    } else {
      query = `CREATE TABLE IF NOT EXISTS "${tableName}" (
        enrollmentNo VARCHAR(255) PRIMARY KEY,
        ${columnNames
          .map((columnName, index) => `"${columnName}" ${columnTypes[index]}`)
          .join(',\n')},
          FOREIGN KEY (enrollmentNo) REFERENCES "Student"("enrollmentNo") 
          ON DELETE CASCADE 
          ON UPDATE CASCADE
      )`;
    }


    console.log("query = " + query);

    await client.query(query);

    console.log(`Table "${tableName}" created successfully.`)

  } catch (error) {
    console.error('Error creating table:', error)
  } finally {
    // Release the client back to the pool
    // client.release();
  }
}


module.exports = { createTable }