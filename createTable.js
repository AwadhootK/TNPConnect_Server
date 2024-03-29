// const { Pool } = require('pg')

// Create a PostgreSQL connection pool
// const pool = new Pool({
//   connectionString: 'your_database_connection_string'
// })

async function createTable(
  tableName,
  columnNames,
  columnTypes
) {
  // const client = await pool.connect()
  try {

    const query = `CREATE TABLE IF NOT EXISTS "${tableName}" (
      enrollmentNo PRIMARY KEY,
      ${columnNames
        .map((columnName, index) => `"${columnName}" ${columnTypes[index]}`)
      .join(',\n')},
        FOREIGN KEY (enrollmentNo) REFERENCES Student(enrollmentNo) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
    )`

    console.log(query)
    // Execute the query
    // await client.query(query)
    // console.log(`Table "${tableName}" created successfully.`)
  } catch (error) {
    console.error('Error creating table:', error)
  } finally {
    // Release the client back to the pool
    // client.release()
  }
}

createTable('Barclays', ['name', 'age'], ['VARCHAR(255)', 'INTEGER'])
  .then(() => {
    // Do something after the table is created
  })
  .catch(error => {
    console.error('Error:', error)
  })
