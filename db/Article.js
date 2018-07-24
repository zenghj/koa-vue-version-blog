const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema

const articleSchema = new Schema({
  createAt: {
    type: Date,
    default: Date.now,
  },
  updateAt: {
    type: Date,
  },
  status: {
    type: Number, // '0: 草稿箱， 1: 已发布， -1 已删除
    default: 0,
  },
  title: {
    type: String,
    // unique: true,
    // index: true,
  },
  content: {
    type: String,
  },
  rawContent: {
    type: String,
  }
})

// articleSchema.pre('save', function(next) {
//   if(this.title) {
//     next()
//   } else {
//     next(new Error('title 不能为空'))
//   } 
// })

articleSchema.plugin(mongoosePaginate);

const Article = mongoose.model('Article', articleSchema)


const methods = {};
methods.$create = ({status = 1, title, content, rawContent}) => {
  const article = new Article({
    status,
    title,
    content,
    rawContent,
  });
  return article.save();
}

methods.$read = ({id}) => {
  return new Promise((resolve, reject) => {
    Article.findById(id, (err, doc) => {
      if(err) {
        return reject(err);
      }
      resolve(doc)
    })
  });
}

methods.$readList = ({page, limit, status}) => {
  return new Promise((resolve, reject) => {
    Article.paginate({
      status: (status ? status : 0)
    }, {
      page, 
      limit,
    }, (err, result) => {
      if(err) {
        return reject(err);
      }
      resolve(result);
    })
  });
}

methods.$update = ({id, ...rest}) => {
  return new Promise((resolve, reject) => {
    Article.findByIdAndUpdate(id, {
      ...rest
    }, (err, doc) => {
      if(err) {
        return reject(err)
      }
      if(doc) {
        resolve(doc)
      } else {
        reject({code: -1, msg: '不存在此记录'})
      }
      
    })
  });
}

methods.$delete = (id) => {
  return new Promise((resolve, reject) => {
    Article.findByIdAndRemove(id, (err, doc) => {
      if(err) {
        return reject(err);
      }
      resolve(doc)
    })
  });
}

module.exports = methods;
