const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    log: ['query'],
    errorFormat: 'pretty'
});

const getCompanyPostingData = async (req, res, next) => {
    const companyList = await prisma.company.findMany({
        where: {
            driveCompleted: false
        }
    });

    if (!companyList) {
        return res.status(400).json({
            message: "No companies found",
        })
    }
    else {
        return res.status(200).json({ "companies": companyList });
    }
}

module.exports = { getCompanyPostingData }