<template>
  <div class="articles">
    <div class="container">
      <el-input v-model="keyword" class="search-input" placeholder="输入文章标题关键词搜索文章" @keyup.native.enter="handleSearch">
        <el-button slot="append" icon="el-icon-search" @click.native="handleSearch"></el-button>
      </el-input>
      <div class="tags">
        <el-tag v-for="(item, index) in categoryories" :key="index" class="tag" :type="activeTagName === item.name ? 'success' : 'info'" @click.native="handleTagClick($event, item)">{{item.name}}</el-tag>
      </div>
      <p class="total-count">总共{{list.length}}条记录</p>
      <div class="article-items">
        <router-link class="article-item" v-for="(item,index) in list" :key="index" :to="{name: 'article', params: {id: item._id}}">
          <el-card class="card">
            <div slot="header">
              <h2 class="title">
                {{item.title || '无标题'}}
              </h2>
            </div>
            <div class="des">
              <p>所属分类: {{item.category}}</p>
              <p>创建于: {{formatTime(item.createAt)}}</p>
            </div>
          </el-card>
        </router-link>
        <!-- <div v-if="list.length === 0" class="empty-result"></div> -->
      </div>

    </div>
  </div>
</template>
<script>
import {fetchArticles, getCategoryories} from '../config/api.js'
import formatTime from '../../../assets/js/timeHelper.js'
export default {
  name: 'articles',
  created () {
    this.fetchList()
    this.fetchCategoryories()
    this.initQuery()
  },
  data () {
    return {
      list: [],
      categoryories: [],
      activeTagName: '',
      keyword: ''
    }
  },
  methods: {
    formatTime,
    getQuery() {
      return this.$router.currentRoute.query || {}
    },
    initQuery() {
      let query = this.getQuery()
      this.activeTagName = query.category || ''
      this.keyword = query.keyword
    },
    fetchList () {
      fetchArticles(this.getQuery()).then(({data}) => {
        if (data.state === 1) {
          this.list = data.result.docs
        } else {
          this.$message.error(data.msg || '获取列表失败')
        }
      })
      
    },
    fetchCategoryories() {
      getCategoryories().then(({data}) => {
        if (data.state === 1) {
          this.categoryories = data.result.list
        } else {
          this.$message.error(data.msg || '获取列表失败')
        }
      })
    },
    handleTagClick (e, item) {
      if(item.name === this.activeTagName) {
        this.activeTagName = ''
      } else {
        this.activeTagName = item.name
      }
      let query = {...this.$router.currentRoute.query}
      if(this.activeTagName !== '') {
        query.category = this.activeTagName
      } else {
        delete query.category
      }
      this.updateQueryAndFetchList(query)
    },
    handleSearch () {
      this.updateQueryAndFetchList( {...this.$router.currentRoute.query, keyword: this.keyword})
    },
    updateQueryAndFetchList (query = {}) {
      this.$router.push({name: 'articles', query})
      this.fetchList()
    } 
  }
}
</script>

<style lang="less" scoped>
@import '../../../assets/less/vars.less';
@import '../../../assets/less/mixin.less';
.articles {
  .header {
    background: @primaryColor;
    color: #fff;
    height: 3em;
    line-height: 3em;
    padding: 0 1em;
  }
  .container {
    margin: 0 1em;

    // .tags {
    //   margin-bottom: 1em;
    // }
    .tag {
      cursor: pointer;
      margin: 1em;
      margin-left: 0;
    }
    .search-input {
      margin: 2em 0 1em 0;
    }
  }

  .total-count {
    color: @gray;
    margin-bottom: 1em;
    text-align: right;
  }
  @media screen and (min-width: 500px) {
    .article-items {
      display: flex;
      flex-direction: row;
      flex: 0 0 23em;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: wrap;
    }
    .article-item {
      min-width: 23em;
    }
  }
  @media screen and (max-width: 500px) {
    .article-items {
      flex: 0 0 90%;
    }
  }
  .article-item {
    display: block;
    margin-bottom: 1em;
    .card {
      position: relative;
      // width: 18em;
      // float: left;
      // margin: 1em 1em 0 0;
      .des {
        font-size: 14px;
      }
    }
    .title {
      .ellipsis();
    }
    .action-btns {
      position: absolute;
      right: 0.5em;
      top: 0.5em;
    }
  }
}
</style>
