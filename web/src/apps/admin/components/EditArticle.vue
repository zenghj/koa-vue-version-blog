<template>
  <section class="edit-article">
    <header class="">
      <el-input class="input" :value="form.title" @input="updateTitle" placeholder="请输入标题"></el-input>
      <div class="actions">
        <router-link :to="{name: 'draftArticles'}" target="_blank">
          <el-button type="text">草稿箱</el-button>
        </router-link>
        <el-button type="text" @click="saveDraft">保存到草稿箱</el-button>
        <el-button type="text" @click="publish">发布</el-button>
      </div>
    </header>
    <main id="editor" class="clearfix">
      <textarea class="fl" :value="form.rawContent" @input="update" name="" id="" placeholder="请输入文章内容"></textarea>
      <div class="preview fr markdown-body" v-html="content"></div>
    </main>
  </section>
</template>

<script>
import marked from 'marked'
import _ from 'lodash'
import {saveAsDraft, publishArticle, getArticleInfo, updateArticle} from '../config/api.js'
import '../../../assets/less/markdown.less'
export default {
  beforeRouteEnter (to, from, next) {
    const id = to.query.id
    if (id) {
      getArticleInfo(id)
        .then(({data}) => {
          const {result, state} = data
          console.log(result)
          if (state === 1) {
            next(vm => {
              vm.form.title = result.title || ''
              vm.form.rawContent = result.rawContent || ''
              vm.id = id
            })
          } else {
            next(vm => {
              vm.$message.error('初始化失败')
              vm.id = id
            })
          }
        })
        .catch(err => {
          console.error(err)
          next(vm => {
            vm.$message.error('初始化失败')
            vm.id = id
          })
        })
    } else {
      next()
    }
  },
  data () {
    return {
      form: {
        title: '',
        rawContent: '',
      },
      id: '',
    }
  },
  computed: {
    content () {
      return marked(this.form.rawContent, {sanitize: true})
    },
  },
  methods: {
    update: _.debounce(function (e) {
      this.form.rawContent = e.target.value
      this.$nextTick(() => {
        this.saveDraft()
      })
    }, 500),
    updateTitle: _.debounce(function (value) {
      this.form.title = value
      this.$nextTick(() => {
        this.saveDraft()
      })
    }, 500),
    saveDraft (e) {
      const payload = {
        title: this.form.title,
        content: this.content,
        status: 0,
        rawContent: this.form.rawContent,
      }
      if(!this.id) {
        saveAsDraft(payload).then(({data}) => {
          if (data.state === 1) {
            this.id = data.result._id
            this.$router.push(`/editArticle?id=${this.id}`)
          } else {
            this.$message.error('自动保存失败')
          }
        }).catch(err => {
          console.error(err)
          this.$message.error('自动保存失败')
        })
      } else {
        updateArticle(this.id, payload).then(({data}) => {
          if (data.state !== 1) {
            this.$message.error('自动保存失败')
          }
        }).catch(err => {
          console.error(err)
          this.$message.error('自动保存失败')
        })
      }

    },
    publish (e) {
      publishArticle({
        title: this.form.title,
        content: this.content,
        status: 1,
        rawContent: this.form.rawContent,
      }).then(({data}) => {
        if (data.state === 1) {
          this.$message.success('保存成功')
          this.$router.push({name: 'articles'})
        } else {
          this.$message.error('保存失败')
        }
      }).catch(err => {
        console.error(err)
        this.$message.error('保存失败')
      })
    }
  }
}
</script>

<style lang="less">
@import './less/editor.less';
@headerHeight: 3em;
.edit-article {
  height: 100vh;
  header {
    position: relative;
    height: @headerHeight;
    .input {
      width: 100%;
      height: 100%;
      .el-input__inner {
        box-sizing: border-box;
        height: 100%;
        padding-right: 8em;
        border-width: 0;
        border-bottom-width: 1px;
        border-radius: 0;
      }
    }
    .actions {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 1em;
    }
  }
  #editor {
    height: calc(~'100% - 3em');
    .preview {
      overflow: scroll;
    }
  }
}
</style>
