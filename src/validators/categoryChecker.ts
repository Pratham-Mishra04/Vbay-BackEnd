import catchAsync from '../managers/catchAsync';
import logger from '../../logs/logger';
import Category from '../models/categoryModel';
import { Request, Response, NextFunction } from 'express';

const categoryCheck = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    if (
      !(await Category.findOne({
        title: { $regex: `^${req.body.category}$`, $options: 'i' },
      }))
    )
      try {
        Category.create({ title: req.body.category });
        logger.newCategory(
            `New Category Added: ${req.body.category} by ${req.user.username} for ${req.body.title}`
        );
      } catch (err) {
        logger.error(
          `Error in creating new category: ${req.body.category} by ${req.user.username} for ${req.body.title}\n${err.message}`
        );
      }
    next();
  }
);

export default categoryCheck;
