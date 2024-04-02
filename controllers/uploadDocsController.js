const multer = require('multer');
const { initializeApp } = require('firebase/app');

const config = require('../firebase-init.js');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');

initializeApp(config.firebaseConfig);

const storage = getStorage();

const prisma = new PrismaClient({
    log : ['query'],
    errorFormat: 'pretty'
})
const uploadDocsPost = async (req, res) => {
    try {
        const dateTime = giveCurrentDateTime();

        const storageRef = ref(storage, `${req.params.erno}/${req.file.originalname + "       " + dateTime}`);

        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);

        console.log('File successfully uploaded.');
        
        var index = req.params.index
        var docName = ''
        switch (index)
        {
            case 0: docName = 'studentId'
            case 1: docName = 'resume'
            case 2: docName = 'photo'
            case 3 : docName = 'tenthMarksheet'
            case 4 : docName = 'twelfthMarksheet'
            case 5 : docName = 'transcript'
            case 6 : docName = 'collegeId'
            case 7 : docName = 'aadharCard'
            case 8 : docName = 'panCard'
            case 9 : docName = 'passport'
            case 10 : docName = 'amcatPaymentReceipt'
            case 11 : docName = 'amcatResult'
            case 12 : docName = 'TEfeeReceipt'

        }
        if(index == 0)
        {
        const insertDoc =  await prisma.studentDocuments.create({
            'studentId': req.params.erno, // Provide the enrollment number
            'resume': '', // Empty string for resume
            'photo': '', // Empty string for photo
            'tenthMarksheet': '', // Empty string for tenthMarksheet
            'twelfthMarksheet': '', // Empty string for twelfthMarksheet
            'transcript': '', // Empty string for transcript
            'collegeID': '', // Empty string for collegeID
            'aadharCard': '', // Empty string for aadharCard
            'panCard': '', // Empty string for panCard
            'passport': '', // Empty string for passport (nullable field)
            'amcatPaymentReceipt': '', // Empty string for amcatPaymentReceipt
            'amcatResult': '', // Empty string for amcatResult
            'TEfeeReceipt': '', // Empty string for TEfeeReceipt (nullable field)
          });
        }

        else
        {
            const UpdateDoc = prisma.studentDocuments.update({
                where: {
                    studentId: req.params.erno
                },
                data: {
                    [docName]: downloadURL
                }
            });
        }
        

        
    } catch (error) {
        return res.status(400).send(error.message)
    }
    return res.status(200).send('File uploaded successfully');
}



const giveCurrentDateTime = () => {
    const today = new Date();
    const date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    const dateTime = date + ' ' + time;
    return dateTime;
}

module.exports = { uploadDocsPost }