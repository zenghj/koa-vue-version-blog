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
import MyHeader from './MyHeader.vue'
import formatTime from '../../../assets/js/timeHelper.js'
import onlineArticleMod from '../store/modules/online-articles.js'
import {mapState, mapActions} from 'vuex'
import {FETCH_ONLINE_ARTICLES, DELETE_ONLINE_ARTICLE} from '../store/actionTypes.js'

const MODULE_NAME = onlineArticleMod.moduleName;
// let count = 0;

export default {
  beforeCreate() {
    // console.log('beforeCreate registerModule', count++)
    // console.log(this.$store, count)
    this.$store.registerModule(MODULE_NAME, onlineArticleMod)
    this.$store.dispatch(`${MODULE_NAME}/${FETCH_ONLINE_ARTICLES}`)
  },
  beforeDestroy() {
    // console.log('beforeDestroyed unregisterModule', count++);
    // console.log(this.$store, count)
    // // console.log('xxx');
    // this.$store.unregisterModule(MODULE_NAME)
  },
  
  data () {
    return {
    }
  },
  computed: {
    ...mapState(onlineArticleMod.moduleName, ['articles']),
    // ...mapState(['articles']),
    computedList () {
      return this.articles && this.articles.map(item => {
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
    ...mapActions(onlineArticleMod.moduleName, [DELETE_ONLINE_ARTICLE, FETCH_ONLINE_ARTICLES]),
    // ...mapActions([DELETE_ONLINE_ARTICLE, FETCH_ONLINE_ARTICLES]),
    confirmDelete (e, item) {
      this.$confirm('此操作将永久删除', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this[DELETE_ONLINE_ARTICLE](item._id)
      }).catch(() => {})
    },
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
