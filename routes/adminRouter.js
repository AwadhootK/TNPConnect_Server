const express = require('express')
const { getCompanyDetails, postCompanyDetails, companyResults } = require('../controllers/adminController');

const adminRouter = express.Router()

adminRouter.get('/companyDetails', getCompanyDetails);
adminRouter.post('/companyDetails', postCompanyDetails);

//! see if we can send push notifs to students who got internship in this function
adminRouter.post('/results/:company', companyResults);

module.exports = adminRouter;