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
        const downloadURL = req.body.downloadURL;
        const index = parseInt(req.params.index);
        const studentID = req.params.erno;

        var docName = ''
        switch (index) {
            case 0: docName = 'resume'
                break;
            case 1: docName = 'photo'
                break;
            case 2: docName = 'tenthMarksheet'
                break;
            case 3: docName = 'twelfthMarksheet'
                break;
            case 4: docName = 'transcript'
                break;
            case 5: docName = 'collegeId'
                break;
            case 6: docName = 'aadharCard'
                break;
            case 7: docName = 'panCard'
                break;
            case 8: docName = 'passport'
                break;
            case 9: docName = 'amcatPaymentReceipt'
                break;
            case 10: docName = 'amcatResult'
                break;
            case 11: docName = 'TEfeeReceipt'
                break;
            default: docName = 'invalid'
                break;
        }

        if (docName === 'invalid') {
            return res.status(400).json({ message: "Invalid document index sent" });
        }

        console.log("Doctype = " + docName);


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
            doc = await prisma.studentDocuments.update({
                where: {
                    studentId: studentID
                },
                data: {
                    "tenthMarksheet": downloadURL
                }
            });
        }

        if (!doc) {
            console.log("Not inserted");
            return res.status(400).json({ message: "Could not upload document!" });
        }
        console.log("inserted");
        return res.status(200).json({ message: `${studentID}'s ${docName} uploaded successfully!`, downloadURL: downloadURL });

    } catch (error) {
        return res.status(400).send(error.message)
    }
}

module.exports = { uploadDocsPost }