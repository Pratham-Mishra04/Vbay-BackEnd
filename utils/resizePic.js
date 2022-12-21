import sharp from "sharp";
import fs from 'fs'

export const resizePic = (picPath, toPath, d1, d2) =>{
    const promise = fs.promises.readFile(picPath);
    
    Promise.resolve(promise).then(function(buffer){
        sharp(buffer)
            .resize(d1, d2)
            .toFormat('jpeg')
            .jpeg({quality: 100})
            .toFile(toPath)
    }).catch(err=>console.log(err)) // log error in resize pic here

    fs.unlinkSync(picPath, function(err){
        next(err)
    })
}

export const resizeProfilePic =  (req, res, next)=>{
        if(!req.file) return next()
    
        const picPath = req.file.destination+'/'+req.file.filename;
        const toPath = `public/users/profilePics/${req.body.username}-${Date.now()}.jpeg`;
    
        resizePic(picPath, toPath, 500 ,500);

        req.body.profilePic = toPath.split('/')[3];
    
        next()
}

export const resizeProductPics =  (req, res, next)=>{
    if(!req.body.images) return next()

    const resizedImgs= [];

    req.body.images.forEach(loc=>{
        const picPath = `public/products/images/${loc}`
        const toPath = `public/products/images/${req.user.username}-${req.body.title}-${Date.now()}.jpeg`;

        resizePic(picPath, toPath, 1280 ,720);

        resizedImgs.push(toPath);
    })

    req.body.images=resizedImgs;
    next()
}