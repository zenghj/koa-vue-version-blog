<template>
  <div class="articles">
    <el-row class="clearfix title">
      <h1 class="fl">Article List</h1>
    </el-row>
    <el-card v-for="(item,index) in list" :key="index" class="article-item">
      <div slot="header">
        <h2 class="title">
          <router-link :to="`/article/${item._id}`">
            <el-button type="text">{{item.title}}</el-button>
          </router-link>
        </h2>
      </div>
      <div class="des">
        <p>createAt: {{item.createAt}}</p>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  data () {
    return {
      list: [
        {
          title: 'Article1',
          createAt: '2018-09-09',
          updateAt: null,
          _id: '1'
        },
        {
          title: 'Article2',
          createAt: '2018-09-10',
          updateAt: null,
          _id: '2'
        }
      ]
    }
  },
  methods: {
    openAddDialog () {},
    openEditDialog () {},
    confirmDelete () {},
  }
}
</script>

<style lang="less">
.articles {
  margin: 1em;
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
