<template>
  <div class="articles">
    <el-row class="clearfix title">
      <h1 class="fl">Draft Article List</h1>
    </el-row>
    <el-card v-for="(item, index) in list" :key="index" class="article-item">
      <div slot="header">
        <h2 class="title">{{item.title}}</h2>
        <div class="action-btns">
          <router-link :to="`/editArticle?id=${item._id}`">
            <el-button class="el-icon-edit-btn" icon="el-icon-edit" type="primary" circle></el-button>
          </router-link>
          <el-button class="delete-item-btn" icon="el-icon-delete" type="danger" circle @click.stop.prevent="confirmDelete($event, item)"></el-button>
        </div>
      </div>
      <div class="des">
        <p>createAt: {{item.createAt}}</p>
      </div>
    </el-card>
  </div>
</template>
<script>
import {fetchDrafts, deleteArticle} from '../config/api.js'
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
    confirmDelete (e, item) {
      this.$confirm('此操作将永久删除', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteArticle(item._id)
          .then(({data}) => {
            if (data.state === 1) {
              this.fetchList()
              this.$message.success('删除成功')
            } else {
              this.$message.error('删除失败')
            }
          })
      }).catch(() => {})
    },
    fetchList () {
      fetchDrafts().then(({data}) => {
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
  margin: 0.8em 0;
  .action-btns {
    position: absolute;
    right: 0.5em;
    top: 0.5em;
  }
}
</style>
