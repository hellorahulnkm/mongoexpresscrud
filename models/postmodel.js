const mongoose = require('mongoose')
const multer = require('multer')
const path = require('path')

const postImgPath = "/uploads/postImages"

const postSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    postImg : {
        type : String,
        required : true
    }
})

const imgStorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,'..',postImgPath));
    },
    filename : (req,file,cb)=>{
        cb(null,file.fieldname+'-'+Date.now());
    }
})

postSchema.statics.postImgModel = postImgPath ;

postSchema.statics.uploadedPostImg = multer({storage : imgStorage}).single('postImg')


const Post = mongoose.model('Post',postSchema);

module.exports = Post;