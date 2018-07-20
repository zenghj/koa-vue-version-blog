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
    unique: true,
    index: true,
  },
  content: {
    type: String,
  }
})

articleSchema.pre('save', function(next) {
  if(this.title) {
    next()
  } else {
    next(new Error('title 不能为空'))
  } 
})

articleSchema.plugin(mongoosePaginate);

const Article = mongoose.model('Article', articleSchema)


const methods = {};
methods.$create = ({status = 1, title, content}) => {
  const article = new Article({
    status,
    title,
    content,
  });
  return content.save();
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

methods.$readList = ({page, limit}) => {
  return new Promise((resolve, reject) => {
    Article.paginate({

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

methods.$update = ({id, status, title, content}) => {
  return new Promise((resolve, reject) => {
    Article.findByIdAndUpdate(id, {
      status, 
      title, 
      content,
    }, (err, doc) => {
      if(err) {
        return reject(err);
      }
      resolve(doc)
    })
  });
}

methods.$delete = ({id}) => {
  return new Promise((resolve, reject) => {
    Article.findByIdAndUpdate(id, {
      status: -1,
    }, (err, doc) => {
      if(err) {
        return reject(err);
      }
      resolve(doc)
    })
  });
}

module.exports = methods;
