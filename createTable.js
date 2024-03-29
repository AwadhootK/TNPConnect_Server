const { Pool } = require('pg')
require('dotenv').config()

// Create a PostgreSQL connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
})

async function createTable(
  tableName,
  columnNames,
  columnTypes
) {
  const client = await pool.connect()
  try {

    const query = `CREATE TABLE IF NOT EXISTS "${tableName}" (
      enrollmentNo VARCHAR(255) PRIMARY KEY,
      ${columnNames
        .map((columnName, index) => `"${columnName}" ${columnTypes[index]}`)
        .join(',\n')},
        FOREIGN KEY (enrollmentNo) REFERENCES "Student"("enrollmentNo") 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
    )`;

    console.log(query)

    // Execute the query
    await client.query(query)

    console.log(`Table "${tableName}" created successfully.`)

  } catch (error) {
    console.error('Error creating table:', error)
  } finally {
    // Release the client back to the pool
    client.release();
  }
}


// get the columns and the types from admin web frontend 
createTable('Barclays', ['name', 'age'], ['VARCHAR(255)', 'INTEGER'])
  .then(() => {
    // Do something after the table is created
  })
  .catch(error => {
    console.error('Error:', error)
  })
