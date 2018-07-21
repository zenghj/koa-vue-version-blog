<template>
  <section class="article" v-html="content">
  </section>
</template>

<script>
import {getArticleInfo} from '../config/api.js'
export default {
  props: ['id'],
  created() {
    getArticleInfo(this.id)
      .then(({data}) => {
          const {result, state} = data
          if (state === 1) {
            this.content = result.content
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
      content: ''
    }
  }
}
</script>
