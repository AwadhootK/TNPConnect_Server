const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    log: ['query'],
    errorFormat: 'pretty'
});

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

const postProfile = async (req, res, next) => {
    const userProfile = await prisma.student.create({
        data: req.body
    });

    if (!userProfile) {
        return res.status(400).send('Some error occurred!');
    }

    res.status(200).send('Profile created successfully!');
}

const editProfileDocs = async (req, res, next) => {
    const erno = req.params.erno;
    const docType = req.body.docType;
    const docURL = req.body.docURL;

    const userDetails = await prisma.studentDocuments.findFirst({ where: { studentId: erno } });

    userDetails.resume = docURL;

    const user = await prisma.student.update({
        where: {
            enrollmentNo: erno
        },
        data: userDetails
    });

    res.send(userDetails);
}

const editProfileIsInterned = async (req, res) => {
    const erno = req.params.erno;
    const { isInterned, company } = req.body;

    const studentDetails = await prisma.student.findFirst({ where: { enrollmentNo: { equals: erno } } });

    if (studentDetails) {
        return res.status(400).send('Student not found!');
    }

    if (studentDetails.isInterned === true) {
        return res.status(400).send('Internship already present!');
    }

    studentDetails.isInterned = true;
    studentDetails.companyName = company;

    const updatedStudent = await prisma.student.update({
        where: {
            enrollmentNo: erno
        },
        data: studentDetails
    });

    if (!updatedStudent) {
        return res.status(400).send('Some error occurred!');
    }

    res.status(200).send('Internship status successfully updated!');
}

module.exports = { getProfile, postProfile, editProfileDocs, editProfileIsInterned }