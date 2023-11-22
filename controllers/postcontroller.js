const Post = require('../models/postmodel')
const path = require('path')
const fs = require('fs')


module.exports.add_post = async (req,res)=>{
    return res.render('add_post')
}

module.exports.addPostDetail = async (req,res)=>{
    var imgPath = ''
    if(req.file){
        imgPath = Post.postImgModel+"/"+req.file.filename;
    }
    req.body.postImg = imgPath;

    await Post.create(req.body)
    return res.redirect('back')

}

module.exports.view_post = async (req,res)=>{
    let postData = await Post.find({})
    return res.render('view_post',{
        postob : postData
    })
}

module.exports.DeletePost = async (req,res)=>{
    try{
        let oldPostData = await Post.findById(req.params.postId)
        if(oldPostData){
            var oldImg = oldPostData.postImg
            if(oldImg){
                let fullPath = path.join(__dirname,'..',oldImg)
                let dImg = fs.unlinkSync(fullPath);

                let deleteRecord = await Post.findByIdAndDelete(req.params.postId)
                if(deleteRecord){
                    console.log('record and image deleted successfully')
                    return res.redirect('back')
                }
                else{
                    console.log('record deleted succsessfully')
                    return res.redirect('back')
                }
            }
            else{
                let deleteRecord = await Post.findByIdAndDelete(req.params.postId)
                if(deleteRecord){
                    console.log('record deleted successfully')
                    return res.redirect('back')
                }
                else{
                    console.log('record deleted succsessfully')
                    return res.redirect('back')
                }
            }
        }
        else{
            console.log('record not found')
            res.redirect('back')
        }
    }
    catch(err)
    {
        console.log(err)
        res.redirect('back')
    }
}


module.exports.UpdatePost = async (req,res)=>{
    try{
        let oldPostData = await Post.findById(req.params.postId)
        if(oldPostData){
            return res.render('update_post',{
                sPost : oldPostData
            })
        }
        else{
            console.log('record not found')
            return res.redirect('back')
        }
    }
    catch(err)
    {
        console.log(err)
        return res.redirect('back')
    }
}

module.exports.EditPostDetail = async (req,res)=>{
    try{
        if(req.file){

            let oldPostData = await Post.findById(req.body.postId)

            if(oldPostData){
                if(oldPostData.postImg){
                    let fullPath = path.join(__dirname,'..',oldPostData.postImg)
                    await fs.unlinkSync(fullPath)
                }
                var imgPath = Post.postImgModel+"/"+req.file.filename;
                req.body.postImg = imgPath;

                let up = await Post.findByIdAndUpdate(req.body.postId,req.body)
                if(up){
                    console.log("record and image updated successfully")
                    return res.redirect('/post/view_post')
                }
                else{
                    console.log('record not updated')
                    return res.redirect('/post/view_post')
                }
            }
            else{
                console.log('oldData not found')
                return res.redirect('/post/view_post')
            }
        }

        else{
            let oldPostData = await Post.findById(req.body.postId)
            if(oldPostData){
                req.body.postImg = oldPostData.postImg
                let up = await Post.findByIdAndUpdate(req.body.postId,req.body)
                if(up){
                    console.log("record and image updated successfully")
                    return res.redirect('/post/view_post')
                } 
                else{
                    console.log('record not updated')
                    return res.redirect('/post/view_post')
                }
            }
            else{
                console.log('record1 not found')
                return res.redirect('/post/view_post')
            }
        }
    }
    catch(err){
        console.log(err)
        return res.redirect('/post/view_post')
    }
}