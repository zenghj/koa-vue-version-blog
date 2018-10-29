<template>
  <div class="articles">
    <my-header></my-header>
    <el-row class="clearfix title">
      <h3 class="fl">草稿箱</h3>
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
      width="138">
      <template slot-scope="scope">
        <a :href="URLS.getClientArticleUrl(scope.row._id)" target="_blank">
          <el-button type="text" size="small">预览</el-button>
        </a>
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
import MyHeader from './MyHeader.vue'
import formatTime from '../../../assets/js/timeHelper.js'
import {mapState, mapActions} from 'vuex'
import draftsMod, {moduleName as MODULE_NAME} from '../store/modules/draft-articles.js'
import {FETCH_DRAFTS, DELETE_DRAFT, PUBLISH_DRAFT_TO_ONLINE} from '../store/actionTypes.js'

export default {
  beforeCreate() {
    this.$store.registerModule(MODULE_NAME, draftsMod)
    this.$store.dispatch(`${MODULE_NAME}/${FETCH_DRAFTS}`)
  },
  destroyed() {
    this.$store.unregisterModule(MODULE_NAME)
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState(MODULE_NAME, ['drafts']),
    computedList () {
      return (this.drafts || []).map(item => {
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
    ...mapActions(MODULE_NAME, [FETCH_DRAFTS, DELETE_DRAFT, PUBLISH_DRAFT_TO_ONLINE]),
    confirmDelete (e, item) {
      this.$confirm('此操作将永久删除', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this[DELETE_DRAFT](item._id)
      }).catch(() => {})
    },
    fetchList () {
      this[FETCH_DRAFTS]()
    },
    publish (e, item) {
      this[PUBLISH_DRAFT_TO_ONLINE](item._id)
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
