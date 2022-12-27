import path from 'path'
import multer from 'multer';

export const multerProfilePicDiskStorage = multer.diskStorage({   // convert this into single-files
    destination: function(req, file, callback) {
        callback(null, `./public/users/profilePics`)
    },
    filename: function(req, file, callback) {
        const name= `${req.body.username}-${Date.now()}`+ path.extname(file.originalname)
        req.body[`${file.fieldname}`] = name
        callback(null, name);
    }
})

export const multerProductImgDiskStorage = multer.diskStorage({   // convert this into multi-files
    destination: function(req, file, callback) {
        callback(null, `./public/products/images`)
    },
    filename: function(req, file, callback) {
        const name=`${req.user.username}-${req.body.title}-${Math.random()*1000}`+ path.extname(file.originalname);
        try{
            req.body.images.push(name)
        }catch(err){
            req.body['images']=[];
            req.body.images.push(name)
        }
        callback(null, name);
    }
})