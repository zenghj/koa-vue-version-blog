<template>
  <section class="article markdown-body" >
    <!-- <my-header></my-header> -->
    <h1>{{article.title}}</h1>
    <div v-html="article.content" class=""></div>
  </section>
</template>

<script>
import {getArticleInfo} from '../config/api.js'
import '../../../assets/less/markdown.less'
// import MyHeader from './MyHeader.vue'
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
  // components: {
  //   MyHeader,
  // }
}
</script>

<style>

</style>

