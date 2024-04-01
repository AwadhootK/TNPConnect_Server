const multer = require('multer');
const { initializeApp } = require('firebase/app');

const config = require('../firebase-init.js');
const { getStorage, ref, getDownloadURL, uploadBytesResumable } = require('firebase/storage');

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

        console.log('File successfully uploaded.');

        
    } catch (error) {
        return res.status(400).send(error.message)
    }
}

module.exports = { uploadDocsPost }