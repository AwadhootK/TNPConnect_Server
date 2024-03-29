const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient({
    log: ['query'],
    errorFormat: 'pretty'
})

const getProfile = async (req, res, next) => {
    const erno = req.params.erno;
    console.log(erno)
    const userProfile = await prisma.student.findFirst({
        where: {
            enrollmentNo: { equals: erno }
        }
    })

    if (!userProfile) {
        return res.status(404).send('User not found!');
    }
    res.send(userProfile);
}

const postProfile = (req, res, next) => {
    res.send('company details')
}


module.exports = { getProfile, postProfile }