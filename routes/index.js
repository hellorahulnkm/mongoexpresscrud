const express = require('express')
const routes = express.Router();
const admincontroller = require('../controllers/admincontroller')
const St = require('../models/Student');

console.log("Index routing")

routes.get('/',admincontroller.add_details);

routes.post('/addStudentDetail',St.uploadedImg,admincontroller.addStudentDetail)

routes.get('/view_details',admincontroller.view_details)

routes.get('/deleteStu/:id',admincontroller.deleteStu)

routes.get('/updateStu/:id',admincontroller.updateStu)

routes.post('/updateStudentDetail',St.uploadedImg,admincontroller.updateStudentDetail)


module.exports = routes