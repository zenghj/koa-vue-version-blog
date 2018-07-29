const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema

const STATUSES = {
  draft: 0,
  published: 1,
  deleted: -1,
}
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
    default: STATUSES.draft,
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
  },
  parentId: {
    type: String,
  },
  category: {
    type: String,
  }
})

const cloneKeys = ['updateAt', 'status', 'title', 'content', 'rawContent']

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
methods.$create = ({status = STATUSES.published, title, content, rawContent, parentId, category}) => {
  const article = new Article({
    status,
    title,
    content,
    rawContent,
    parentId,
    category,
  });
  return article.save();
}

methods.$readById = id => {
  return new Promise((resolve, reject) => {
    Article.findById(id, (err, doc) => {
      if(err) {
        return reject(err);
      }
      resolve(doc)
    })
  });
}

methods.$query = query => {
  return new Promise((resolve, reject) => {
    Article.find(query, function(err, docs) {
      if(err) {
        return reject(err)
      }
      resolve(docs)
    })
  })
}

methods.$readList = ({page, limit, status = STATUSES.draft}) => {
  return new Promise((resolve, reject) => {
    Article.paginate({
      status,
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
  return (async () => {
    let doc = await methods.$readById(id)
    if(!doc) {
      return {code: -1, msg: '不存在此记录'}
    }
    let docs = await methods.$query({parentId: id})
    let draftDoc = (docs && docs.length > 0 ) ? docs[0] : null
    let updated
    if(doc.status === STATUSES.published && draftDoc == null) {
      updated = await methods.$create({
          ...doc,
          ...rest,
          status: STATUSES.draft,
          parentId: id,
        })
    } else {
      if(draftDoc) doc = draftDoc
      updated = await updateOrPublishDoc(doc, rest)
    }
    return updated
  })()
}

async function updateOrPublishDoc(doc, update) {
  Object.assign(doc, update, {updateAt: Date.now()})

  let parentId = doc.parentId
  let ret
  if (update.status === STATUSES.published && parentId) {
    doc.parentId = null
    doc.createAt = Date.now()
    ret = await doc.save()
    await methods.$delete(parentId)
  } else {
    ret = await doc.save()
  }
  return ret
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
