const St = require('../models/Student');
const path = require('path');
const fs = require('fs');


module.exports.add_details = async (req,res)=>{
    return res.render('add_details');
}

module.exports.addStudentDetail = async (req,res)=>{
    var imgPath = '';
    if(req.file){
        imgPath = St.imgModel+"/"+req.file.filename;
    }

    req.body.myImg = imgPath;
    
    await St.create(req.body);
    return res.redirect('back');
}

module.exports.view_details = async (req,res)=>{
    let data = await St.find({})
    return res.render('view_details',{
        st : data
    })
}

module.exports.deleteStu = async(req,res)=>{
    let oldData = await St.findById(req.params.id);
    if(oldData.myImg){
        let fullPath = path.join(__dirname,"../",oldData.myImg)
        await fs.unlinkSync(fullPath);
    }
    await St.findByIdAndDelete(req.params.id);
    return res.redirect('back')
}

module.exports.updateStu =async (req,res)=>{
    let data = await St.findById(req.params.id);
    return res.render('update_details',{
        ob : data
    })
}

module.exports.updateStudentDetail = async (req,res)=>{
    if(!req.file)
    {
        let oldData = await St.findById(req.body.EditId);
        req.body.myImg = oldData.myImg;

        await St.findByIdAndUpdate(req.body.EditId,req.body);
        return res.redirect('/view_details');
    }
    else
    {
        let oldData = await St.findById(req.body.EditId);
        if(oldData.myImg)
        {
            let fullPath = path.join(__dirname,"../",oldData.myImg)
            await fs.unlinkSync(fullPath);
        }

        let imgPath = ''
        imgPath = St.imgModel+'/'+req.file.filename;
        req.body.myImg = imgPath;
    
    }

   
    await St.findByIdAndUpdate(req.body.EditId,req.body);
    return res.redirect('view_details');
}
