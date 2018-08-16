<template>
  <header id="admin-header">
    <el-menu mode="horizontal">
      <el-menu-item v-for="(item, index) in links" :key="index" :index="String(index)">
        <router-link :to="{name: item.name}">{{item.text}}</router-link>
      </el-menu-item>
      <el-menu-item :index="String(links.length)">
        <a :href="`${URLS.client}#/articles`">客户端</a>
      </el-menu-item>
    </el-menu>
  </header>

</template>
<script>
  export default {
    data () {
      return {
        activeIndex: '1',
        links: [
          {
            name: 'articles',
            text: '在线文章',
          }, {
            name: 'draftArticles',
            text: '草稿箱',
          }, {
            name: 'editArticle',
            text: '发布新文章',
          }, {
            name: 'CategoryManage',
            text: '分类管理',
          }, {
            name: 'Analysis',
            text: '数据分析',
          }
        ]
      }
    }
  }
</script>

<style lang="less">
#admin-header {
  margin-bottom: 1em;
  .el-menu-item {
    height: 3em;
    line-height: 3em;
  }
}
</style>
