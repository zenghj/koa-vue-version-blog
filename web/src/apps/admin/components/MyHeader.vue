<template>
  <el-menu class="my-header" mode="horizontal">
    <el-menu-item index="1">
      <router-link :to="{name: 'articles'}">在线文章管理</router-link>
    </el-menu-item>
    <el-menu-item  index="2">
      <router-link :to="{name: 'draftArticles'}">草稿箱文章管理</router-link>
    </el-menu-item>
    <el-menu-item  index="3">
      <router-link :to="{name: 'editArticle'}">发布新文章</router-link>
    </el-menu-item>
  </el-menu>
</template>
<script>
  export default {
    data () {
      return {
        activeIndex: '1',
      }
    }
  }
</script>

<style>
.my-header {
  margin-bottom: 1em;
}
</style>
