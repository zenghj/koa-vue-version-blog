<template>
  <div class="articles">
    <el-row class="clearfix title">
      <h1 class="fl">在线文章</h1>
    </el-row>
    <el-card v-for="(item,index) in list" :key="index" class="article-item">
      <div slot="header">
        <h2 class="title"><router-link :to="{name: 'article', params: {id: item._id}}">{{item.title}}</router-link></h2>
      </div>
      <div class="des">
        <p>createAt: {{item.createAt}}</p>
      </div>
    </el-card>
  </div>
</template>
<script>
import {fetchArticles} from '../config/api.js'
export default {
  created () {
    this.fetchList()
  },
  data () {
    return {
      list: []
    }
  },
  methods: {
    fetchList () {
      fetchArticles().then(({data}) => {
        if (data.state === 1) {
          this.list = data.result.docs
        } else {
          this.$message.error(data.msg || '获取列表失败')
        }
      })
    }
  }
}
</script>

<style lang="less">
.articles {
  margin: 1em;
}
.article-item {
  position: relative;
  margin: .8em 0;
  .action-btns {
    position: absolute;
    right: 0.5em;
    top: 0.5em;
  }
}
</style>
