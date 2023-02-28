import { Query } from 'mongoose';

interface QueryString {
  search?: string;
  sort?: string;
  fields?: string;
  page?: number;
  limit?: number;
}

class APIFeatures<T> {
  query: Query<T[], T>;
  queryStr: QueryString;

  constructor(query: Query<T[], T>, queryStr: QueryString) {
    this.query = query;
    this.queryStr = queryStr;
  }

  search(): this {
    const searchStr = this.queryStr.search || '';

    const regexArry = [];

    regexArry.push(new RegExp(searchStr, 'i'));
    regexArry.push(new RegExp(searchStr.replace(' ', ''), 'i'));

    const search = this.queryStr.search
      ? {
          $or: [
            {
              title: {
                $in: regexArry,
              },
            },
            { tags: 
              { $elemMatch: 
                { 
                  $in: regexArry
                  // $regex: searchStr  
                } 
              } 
            },
            {
              category: {
                $in: regexArry,
              },
            },
          ],
        }
      : {};
    this.query = this.query.find(search);
    return this;
  }

  filter(): this {
    const queryObj = { ...this.queryStr };
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach((item) => delete queryObj[item]);

    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    this.query = this.query.find(JSON.parse(queryString));

    return this;
  }

  sort(): this {
    if (this.queryStr.sort) {
      const sortBy = this.queryStr.sort.replace(',', ' ');
      this.query = this.query.sort(sortBy);
    } else {
      this.query = this.query.sort('createdAt');
    }

    return this;
  }

  fields(): this {
    if (this.queryStr.fields) {
      const fields = this.queryStr.fields.replace(',', ' ');
      this.query = this.query.select(fields);
    } else {
      this.query = this.query.select('-__v');
    }

    return this;
  }

  paginator(): this {
    const page = this.queryStr.page ?? 1;
    const limit = this.queryStr.limit ?? 10;

    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit);

    return this;
  }
}

export default APIFeatures;
