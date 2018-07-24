<template>
  <div class="articles">
    <my-header></my-header>
    <el-row class="clearfix title">
      <h1 class="fl">草稿箱</h1>
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
      prop="createAt"
      label="创建日期"
      >
    </el-table-column>
     <el-table-column
      fixed="right"
      label="操作"
      width="110">
      <template slot-scope="scope">
        <el-button type="text" size="small" @click="publish($event, scope.row)">发布</el-button>
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
import {fetchDrafts, deleteArticle, updateArticle} from '../config/api.js'
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
      fetchDrafts().then(({data}) => {
        if (data.state === 1) {
          this.list = data.result.docs
        } else {
          this.$message.error(data.msg || '获取列表失败')
        }
      })
    },
    publish (e, item) {
      console.log(item);
      updateArticle(item._id, {
        status: 1,
      }).then(({data}) => {
        if (data.state === 1) {
          this.$message.success('保存成功')
          // this.$router.push({name: 'articles'})
          this.fetchList()
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
.articles {
  margin: 0 1em;
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
