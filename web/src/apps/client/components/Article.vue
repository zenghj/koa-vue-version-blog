<template>
  <section class="article" v-html="article">
  </section>
</template>

<script>
export default {
  data () {
    return {
      article: '<h1>article detail<h1>'
    }
  }
}
</script>
