<template>
  <div class="articles">
    <my-header></my-header>
    <el-row class="clearfix title">
      <h3 class="fl">文章管理后台</h3>
      <router-link :to="{name: 'editArticle'}" class="fr"><el-button type="text">发布新文章</el-button></router-link>
    </el-row>
    
    <el-table
    :data="computedList"
    stripe
    style="width: 100%">
    <el-table-column
      prop="title"
      label="标题"
      >
    </el-table-column>
    <el-table-column
      prop="category"
      label="所属分类"
      />
    <el-table-column
      prop="createAt"
      label="创建日期"
      >
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作"
      width="110">
      <template slot-scope="scope">
        <a :href="URLS.getClientArticleUrl(scope.row._id)"><el-button type="text" size="small">查看</el-button></a>
        <router-link :to="`/editArticle?id=${scope.row._id}`">
            <el-button type="text" size="small">编辑</el-button>
        </router-link>
        <el-button type="text" size="small" @click.stop.prevent="confirmDelete($event, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </div>
</template>
<script>
import {fetchArticles, deleteArticle} from '../config/api.js'
import MyHeader from './MyHeader.vue'
import formatTime from '../../../assets/js/timeHelper.js'
export default {
  created () {
    this.fetchList()
  },
  data () {
    return {
      list: []
    }
  },
  computed: {
    computedList () {
      return this.list.map(item => {
        return {
          ...item,
          title: (item.title ? item.title : '无标题'),
          createAt: formatTime(item.createAt),
        }
      })
    }
  },
  components: {
    MyHeader,
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
  margin: 0 1em;
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
