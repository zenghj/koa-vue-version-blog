<template>
  <article class="not-found">
      <h1>404</h1>
      <h2>Page Not Found</h2>
      <h3><router-link :to="{name: 'articles'}">Back to Home Page</router-link></h3>
  </article>
</template>

<style lang="less">
@import "../../../assets/less/vars.less";
.not-found {
  // padding-top: 2em;
  text-align: center;
  h1 {
    font-size: 200px;
  }
  h2 {
    font-size: 50px;
  }
  h3 a {
    text-decoration: underline;
    // color: @primaryColor;
  }
}
</style>

