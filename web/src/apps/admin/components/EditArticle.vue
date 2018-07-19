<template>
  <section class="edit-article">
    <header class="">
      <el-input class="input" v-model="form.title"  placeholder="请输入标题"></el-input>
      <div class="actions">
        <router-link :to="{name: 'draftArticles'}"><el-button type="text">草稿箱</el-button></router-link>
        <el-button type="text">保存到草稿箱</el-button>
        <el-button type="text">发布</el-button>
      </div>
    </header>
    <main id="editor" class="clearfix">
      <textarea class="fl" :value="form.textarea" @input="update" name="" id="" placeholder="请输入文章内容"></textarea>
      <div class="preview fr" v-html="compiledMarkdown"></div>
    </main>
  </section>
</template>

<script>
import marked from 'marked'
import _ from 'lodash'
export default {
  data () {
    return {
      form: {
        title: '',
        textarea: '',
      },
    }
  },
  computed: {
    compiledMarkdown () {
      return marked(this.form.textarea, {sanitize: true})
    },
  },
  methods: {
    update: _.debounce(function (e) {
      this.form.textarea = e.target.value
    })
  }
}
</script>

<style lang="less">
@import "./less/editor.less";
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
    height: calc(~"100% - 3em");
  }
}
</style>
