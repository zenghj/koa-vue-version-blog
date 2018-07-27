<template>
  <section class="edit-article">
    <header class="">
      <el-input class="input" :value="form.title" @input="updateTitle" placeholder="请输入标题"></el-input>
      <div class="actions">
        <el-upload class="upload-img" 
          :action="URLS.uploadImgApi"
          :on-progress="handleUploading"
          :on-change="handleUploadEnd"
          :on-success="handleUploadImgSuccess" 
          :on-error="handleUploadImgFail" 
          name="img" 
          :show-file-list="false">
          <i class="el-icon-picture"></i>
        </el-upload>
        <a v-if="id" :href="`${URLS.client}#/articles/${id}`" target="_blank" ><el-button type="text">预览</el-button></a>
        <router-link :to="{name: 'draftArticles'}" target="_blank">
          <el-button type="text">草稿箱</el-button>
        </router-link>
        <el-button type="text" @click="saveDraft">保存到草稿箱</el-button>
        <el-button type="text" @click="publish">发布</el-button>
      </div>
    </header>
    <main id="editor" class="clearfix">
      <textarea ref="textarea" :value="form.rawContent" @input="update" @scroll="handleScroll($event, 'textarea')" placeholder="请输入文章内容" class="fl"></textarea>
      <div ref="previewer" class="preview fr markdown-body" v-html="content" @scroll="handleScroll($event, 'previewer')"></div>
    </main>
    <div v-show="imgUploading" class="img-uploading-mask">
      <div class="center"></div>
    </div>
  </section>
</template>

<script>
import marked from 'marked'
import _ from 'lodash'
import {saveAsDraft, publishArticle, getArticleInfo, updateArticle, uploadImg} from '../config/api.js'
import '../../../assets/less/markdown.less'

function geneImgCode (url) {
  return `![](${url})`
}
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
      editors: {
        textarea: {
          forcedSrolling: false,
          ele: null,
        },
        previewer: {
          forcedSrolling: false,
          ele: null,
        }
      },
      imgUploading: false,
    }
  },
  mounted() {
    this.editors.textarea.ele = this.$refs.textarea
    this.editors.previewer.ele = this.$refs.previewer
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
    saveDraft (event) {
      const payload = {
        title: this.form.title,
        content: this.content,
        status: 0,
        rawContent: this.form.rawContent,
      }
      let errMsg = event ? '保存失败' : '自动保存失败'
      let sucMsg = '保存成功'

      if(!this.id) {
        saveAsDraft(payload).then(({data}) => {
          if (data.state === 1) {
            this.id = data.result._id
            this.$router.push(`/editArticle?id=${this.id}`)
            event && this.$message.success(sucMsg)
          } else {
            this.$message.error(errMsg)
          }
        }).catch(err => {
          console.error(err)
          this.$message.error(errMsg)
        })
      } else {
        updateArticle(this.id, payload).then(({data}) => {
          if (data.state === 1) {
            event && this.$message.success(sucMsg)
            let resultId = data.result._id
            if(this.id !== resultId) {
              this.id = resultId
              this.$router.push(`/editArticle?id=${this.id}`)
            }
          } else {
            this.$message.error(errMsg)
          }
        }).catch(err => {
          console.error(err)
          this.$message.error(errMsg)
        })
      }

    },
    publish (e) {
      publishArticle(this.id, {
        title: this.form.title,
        content: this.content,
        status: 1,
        rawContent: this.form.rawContent,
      }).then(({data}) => {
        if (data.state === 1) {
          this.$message.success('发布成功')
          this.$router.push({name: 'articles'})
        } else {
          this.$message.error('发布失败')
        }
      }).catch(err => {
        console.error(err)
        this.$message.error('发布失败')
      })
    },

    handleUploading () {
      this.imgUploading = true
    },
    handleUploadEnd () {
      this.imgUploading = false
    },
    handleUploadImgSuccess (data) {
      const {state, result = {}} = data
      if(state === 1) {
        const textarea = this.$refs.textarea
        const selectionEnd = textarea.selectionEnd
        const rawContent = this.form.rawContent
        this.form.rawContent = rawContent.slice(0, selectionEnd) + geneImgCode(result.url) + 
          rawContent.slice(selectionEnd)
        this.$nextTick(() => {
          this.saveDraft()
        })
      }
    },
    handleUploadImgFail (err) {
      this.$message.error('上传失败')
    },
    handleScroll(e, refName) {
      const target = this.editors[refName]
      const targetEle = target.ele
      if(target.forcedSrolling) return;
      const otherName = refName === 'textarea' ? 'previewer' : 'textarea'
      const other = this.editors[otherName]
      const otherEle = other.ele
      other.forcedSrolling = true
      console.log('forcedSrolling', otherName)
      this.scrollOtherBaseOne(targetEle, otherEle)
      setTimeout(() => {
        other.forcedSrolling = false
        console.log('cancel forcedSrolling', otherName)
      }, 100)
    },
    scrollOtherBaseOne(one, other) {
      const scrollT = one.scrollTop
      const scrollH = one.scrollHeight
      const clientH = one.clientHeight
      const rate = scrollT / (scrollH - clientH)

      const otherScrollH = other.scrollHeight
      const otherClientH = other.clientHeight
      const otherScrollT = Math.ceil((otherScrollH - otherClientH) * rate)
      other.scrollTop = otherScrollT
    },
  }
}
</script>

<style lang="less">
@import './less/editor.less';
@import '../../../assets/less/vars.less';
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
      .upload-img {
        display: inline-block;
      }
      .el-icon-picture {
        color: @primaryColor;
        cursor: pointer;
        &:hover {
          color: lighten(@primaryColor, 10%);
        }
      }
    }
  }
  #editor {
    height: calc(~'100% - 3em');
    .preview {
      overflow-y: scroll;
    }
  }
  .img-uploading-mask {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: #fff;
    opacity: 0.5;
    z-index: 999;
    cursor: not-allowed;
    .center {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translateX(-50%, -50%);
    }
  }
}
</style>
