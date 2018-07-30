<template>
  <header id="client-header">
    <div class="header">
      <router-link :to="{name: 'articles'}" class="menu-item">Julianzeng's blog</router-link>
    </div>
  </header>
</template>
<style lang="less">
@import '../../../assets/less/vars.less';
#client-header {
  background: @primaryColor;
  color: #fff;
  height: 3em;
  line-height: 3em;
  padding: 0 1em;
}
</style>
