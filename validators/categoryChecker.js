import catchAsync from "../managers/catchAsync.js";
import fs from 'fs'
import logger from "../logs/logger.js";
import { CATEGORY_URL } from "../constants/constants.js";

const categoryCheck = (req, res, next)=>{
    const categories = fs.readFileSync(CATEGORY_URL).toString().split(' ');
    if(!categories.includes(req.body.category)){
        logger.newCategory(`New Category Added: ${req.body.category} by ${req.user.username} for ${req.body.title}`)
        categories.push(req.body.category)
        fs.writeFileSync(CATEGORY_URL, categories.join(' '))
    }
    next()
}

export default categoryCheck;