<template>
  <div class="articles">
    <el-row class="clearfix title">
      <h1 class="fl">Article List</h1>
      <router-link :to="{name: 'editArticle'}"><el-button class="fr" type="primary" icon="el-icon-plus" circle></el-button></router-link>
    </el-row>
    <el-card v-for="(item,index) in list" :key="index" class="article-item">
      <div slot="header">
        <h2 class="title">{{item.title}}</h2>
        <div class="action-btns">
          <a :href="`${URLS.client}#/article/${item._id}`"><el-button class="fr" type="primary" icon="el-icon-document" circle></el-button></a>
          <el-button class="el-icon-edit-btn" icon="el-icon-edit" type="primary" circle @click.stop.prevent="openEditDialog($event, item)"></el-button>
          <el-button class="delete-item-btn" icon="el-icon-delete" type="danger" circle @click.stop.prevent="confirmDelete($event, item)"></el-button>
        </div>
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
