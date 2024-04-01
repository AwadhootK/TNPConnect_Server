const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    log: ['query'],
    errorFormat: 'pretty'
});
const studentRegPost = async (req, res) => {
    const { studentID, companyName } = req.query;
    const response = req.body;

    try {
        const updatedComp = await prisma.companyName.create({
            data: {
                enrollmentNo: studentID,
                ...response
            }
        });

        res.status(200).json(updatedComp);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
}


module.exports = { studentRegPost };