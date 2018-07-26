<template>
  <header id="client"  class="my-header">
    <el-menu mode="horizontal">
      <el-menu-item index="1">
        <router-link :to="{name: 'articles'}" class="menu-item">文章列表</router-link>
      </el-menu-item>
    </el-menu>
  </header>
</template>
<style lang="less">
#client {
  margin-bottom: 1.5em;
  ul {
    padding-left: 0;
  }
}

</style>
