const getCompanyDetails = (req, res, next) => {
    res.send('company details')
}

const postCompanyDetails = (req, res, next) => {

}

const companyResults = async (req, res, next) => {
    const { companyName, studentsList } = req.body;

    studentsList.forEach(async student => {
        const updateStatus = await updateInternshipStatus(student, companyName);
        if (!updateStatus) {
            console.log(student + " not updated!");
            return res.status(500).send('Internal Server Error');
        }
    });

    res.status(200).send('Students profile successfully updated!');
}

const updateInternshipStatus = async (erno, company) => {
    try {
        const studentDetails = await prisma.student.findFirst({ where: { enrollmentNo: { equals: erno } } });

        if (studentDetails || studentDetails.isInterned === true) {
            return false;
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