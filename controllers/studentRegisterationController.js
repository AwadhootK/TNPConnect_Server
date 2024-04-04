const { PrismaClient } = require('@prisma/client');

const { Pool } = require('pg')
require('dotenv').config()

const prisma = new PrismaClient({
    log: ['query'],
    errorFormat: 'pretty'
});
const studentRegPost = async (req, res) => {
    const { studentID, companyName } = req.query;
    const response = req.body;

    console.log(companyName);

    try {

        const pool = new Pool({
            connectionString: process.env.DATABASE_URL_POOL
        });

        const client = await pool.connect();

        const cols = Object.keys(response);
        const vals = Object.values(response);

        if (vals.length == 0) {
            query = `INSERT INTO "${companyName}" VALUES ('${studentID}')`;
        } else {
            query = `INSERT INTO "${companyName}" VALUES ('${studentID}',${vals.map(v => `'${v}'`).join(',')})`;
        }


        // console.log("query = " + query);

        await client.query(query);

        // console.log('done updating company');

        const updatedStudent = await prisma.student.update({
            where: { enrollmentNo: studentID }, data: {
                registeredCompanies: {
                    push: companyName
                }
            }
        });

        if (!updatedStudent) {
            return res.status(400).json({ message: 'Student not registered!' })
        }

        // console.log('Student company list = ' + updatedStudent.registeredCompanies);

        res.status(200).json({ message: "Student recorded successfully!" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { studentRegPost };