const mongoose = require('mongoose');
const multer = require('multer');

const imgPath = '/uploads';
const path = require('path');

const StudentSchema = mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    age : {
        type: Number ,
        required : true
    },
    gender : {
        type : String , 
        required : true
    },
    hobby : {
        type : Array,
        required : true
    },
    city : {
        type : String,
        required : true
    },
    myImg : {
        type : String,
        required : true
    }
})

const imgStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"..",imgPath));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
})

StudentSchema.statics.imgModel = imgPath;

StudentSchema.statics.uploadedImg = multer({storage : imgStorage}).single('myImg');

const Student = mongoose.model('Student',StudentSchema);

module.exports = Student;   