const { createTable } = require('../createTable');
const { SendNotificationToDevice } = require('../controllers/push-notifications.controller.js');

const { Prisma, PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient({
    log: ['query'],
    errorFormat: 'pretty'
})


//! check once
async function getCompanyDetails(req, res, next) {
    var count = await prisma.student.findFirst({
        where: {
            isInterned: true,
            companyName: req.companyName
        }
    });
    if (!count)
        return res.json({ message: 'Results not obtained yet , contact the admin' });
    return res.json({ message: count });


}

async function getCountOfRegisteredStudents(req, res, next) {
    var totalRegistered = prisma.company.count
    if (!totalRegistered)
        return res.json({ message: 'No students registered yet , contact the admin' });

    return res.json({ message: totalRegistered });

}

const postCompanyDetails = async (req, res, next) => {
    try {
        const companyName = req.body.name;
        const columnsReq = req.body.colName;
        const columnsDataType = req.body.coldatatype;

        const companyData = {
            name: req.body.name,
            id: req.body.cid,
            stipend: req.body.stipend,
            ppo: req.body.ppo,
            jdLink: req.body.jdLink,
            location: req.body.location,
            duration: req.body.duration,
            rounds: req.body.rounds,
            dateTimeOfTest: req.body.dateTimeOfTest,
            notes: req.body.notes,
            criteria: req.body.criteria,
            mode: req.body.mode,
            driveCompleted: req.body.driveCompleted,
            eligibleBranches: req.body.eligibleBranches,
            mode: req.body.mode
        };

        console.log(companyData);

        const newCompany = await prisma.company.create({
            data: companyData
        });

        await createTable(companyName, columnsReq, columnsDataType);

        res.status(200).json({ message: 'Company details added successfully' });
    } catch (error) {
        console.error('Error in postCompanyDetails:', error);
        res.status(500).json({ error: 'An error occurred while processing the request' });
    }
}
const companyResults = async (req, res, next) => {
    const { studentsList } = req.body;
    var deviceIDList = [];

    const updatePromises = studentsList.map(async student => {
        const updateStatus = await updateInternshipStatus(student, req.params.company);
        if (!updateStatus) {
            console.log(student + " not updated!");
            return res.status(400).json({ message: 'Student Not Updated!' });
        }
    });

    await Promise.all(updatePromises);

    const deviceIDPromises = studentsList.map(async studentID => {
        const deviceID = await prisma.student.findFirst({
            where: {
                enrollmentNo: studentID
            },
            select: {
                deviceID: true
            }
        });
        return deviceID.deviceID;
    });

    deviceIDList = await Promise.all(deviceIDPromises);

    SendNotificationToDevice(deviceIDList, req.params.company);

    res.status(200).json({ message: 'Students profile successfully updated!' });
}

const updateInternshipStatus = async (erno, company) => {
    try {
        const updatedStudent = await prisma.student.update({
            where: {
                enrollmentNo: erno
            },
            data: {
                isInterned: true,
                companyName: company
            }
        });

        if (!updatedStudent) {
            return false;
        }
        console.log(erno + " updated!");
        return true;

    } catch (error) {
        console.log(error);
        return false;
    }
}

module.exports = { getCompanyDetails, postCompanyDetails, companyResults }