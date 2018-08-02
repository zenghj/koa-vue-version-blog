<template>
  <section class="article markdown-body" >
    <!-- <my-header></my-header> -->
    <h1>{{article.title}} <span class="small">{{formatTime(article.createAt, 'YYYY/MM/DD')}}
      <router-link :to="{name: 'articles', query: {category: article.category}}">[{{article.category}}]</router-link></span></h1>
    <div ref="articleContent" v-html="article.content" class=""></div>
  </section>
</template>

<script>
import {getArticleInfo} from '../config/api.js'
import 'highlight.js/styles/default.css'
import '../../../assets/less/markdown.less'
import formatTime from '../../../assets/js/timeHelper.js'
export default {
  props: ['id'],
  created() {
    getArticleInfo(this.id)
      .then(({data}) => {
          const {result, state} = data
          if (state === 1) {
            this.article = result
          } else {
            this.$message.error('初始化失败')
          }
        })
        .catch(err => {
          console.error(err)
          this.$message.error('初始化失败')
        })
  },
  data () {
    return {
      article: {}
    }
  },
  methods: {
    formatTime,
  }
}
</script>

<style scoped lang="less">
@import '../../../assets/less/vars.less';
.small {
  font-size: @smallFont;
  color: @gray;
}
</style>

