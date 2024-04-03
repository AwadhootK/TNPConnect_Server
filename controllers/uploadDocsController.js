const { initializeApp } = require('firebase/app');

const config = require('../firebase-init.js');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
    log: ['query'],
    errorFormat: 'pretty'
});

initializeApp(config.firebaseConfig);

const storage = getStorage();

const uploadDocsPost = async (req, res) => {
    try {
        const storageRef = ref(storage, `${req.params.erno}/${req.file.originalname}`);

        const metadata = {
            contentType: req.file.mimetype,
        };

        const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);

        const downloadURL = await getDownloadURL(snapshot.ref);

        const index = parseInt(req.params.index);
        const studentID = req.params.erno;

        var docName = ''
        switch (index) {
            case 0: docName = 'studentId';
                break;
            case 1: docName = 'resume'
                break;
            case 2: docName = 'photo'
                break;
            case 3: docName = 'tenthMarksheet'
                break;
            case 4: docName = 'twelfthMarksheet'
                break;
            case 5: docName = 'transcript'
                break;
            case 6: docName = 'collegeId'
                break;
            case 7: docName = 'aadharCard'
                break;
            case 8: docName = 'panCard'
                break;
            case 9: docName = 'passport'
                break;
            case 10: docName = 'amcatPaymentReceipt'
                break;
            case 11: docName = 'amcatResult'
                break;
            case 12: docName = 'TEfeeReceipt'
                break;
            default: docName = 'invalid'
                break;
        }

        if (docName === 'invalid') {
            return res.status(400).json({ message: "Invalid document index sent" });
        }


        var doc;
        if (index == 0) {

            doc = await prisma.studentDocuments.create({
                data: {
                    'studentId': studentID,
                    'resume': downloadURL,
                    'photo': '',
                    'tenthMarksheet': '',
                    'twelfthMarksheet': '',
                    'transcript': '',
                    'collegeID': '',
                    'aadharCard': '',
                    'panCard': '',
                    'passport': '',
                    'amcatPaymentReceipt': '',
                    'amcatResult': '',
                    'TEfeeReceipt': '',
                }
            });
        } else {
            doc = prisma.studentDocuments.update({
                where: {
                    studentId: req.params.erno
                },
                data: {
                    [docName]: downloadURL
                }
            });
        }

        if (!doc) {
            return res.status(400).json({ message: "Could not upload document!" });
        }
        return res.status(200).json({ message: `${studentID}'s ${docName} uploaded successfully!`, downloadURL: downloadURL });

    } catch (error) {
        return res.status(400).send(error.message)
    }
}

module.exports = { uploadDocsPost }