<template>
  <section class="article markdown-body" >
    <h1>{{article.title}}</h1>
    <div v-html="article.content" class=""></div>
  </section>
</template>

<script>
import {getArticleInfo} from '../config/api.js'
import '../../../assets/less/markdown.less'
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
  }
}
</script>

<style>

</style>

