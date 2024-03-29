const express = require('express')
const { getCompanyDetails, postCompanyDetails } = require('../controllers/adminController');

const adminRouter = express.Router()

adminRouter.get('/companyDetails', getCompanyDetails);
adminRouter.post('/companyDetails', postCompanyDetails);

module.exports = adminRouter;