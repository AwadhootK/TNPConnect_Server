const express = require('express')
const { getCompanyDetails, postCompanyDetails, companyResults, updateDriveStatus } = require('../controllers/adminController');

const adminRouter = express.Router()

adminRouter.get('/companyDetails', getCompanyDetails);
adminRouter.post('/companyDetails', postCompanyDetails);
adminRouter.patch('/updateCompanyStatus/:companyName', updateDriveStatus)
//! see if we can send push notifs to students who got internship in this function
adminRouter.post('/results/:company', companyResults);

module.exports = adminRouter;