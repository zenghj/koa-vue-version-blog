<template>
  <section class="categories">
    <my-header></my-header>
    <div class="cate-body">
      <h3>
        分类列表
      </h3>

      <div class="tags">
        <el-tag class="tag" v-for="tag in categoryList" :key="tag.name" :closable="tag.name !== 'others'" :type="tag.type" @close="handleClose($event, tag)">
          {{tag.name}}
        </el-tag>
        <el-form inline class="inline-block tag">
          <el-form-item>
            <el-input placeholder="请输入内容" v-model.trim="input">
              <el-button slot="append" type="text" @click="createCate">添加分类</el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </section>

</template>
<script>
import MyHeader from './MyHeader.vue'
import {mapState, mapActions} from 'vuex'
import {FETCH_CATEGORY_LIST, ACT_DELETE_CATEGORY, ACT_CREATE_CATEGORY} from '../store/actionTypes.js'
import categoryManageMod, {MODULE_NAME} from '../store/modules/categories-manage.js'
export default {
  beforeCreate() {
    console.log('beforeCreate')
    this.$store.registerModule(MODULE_NAME, categoryManageMod)
    this.$store.dispatch(`${MODULE_NAME}/${FETCH_CATEGORY_LIST}`)
  },
  // destroyed() {
  //   this.$store.unregisterModule(MODULE_NAME)
  // },
  data () {
    return {
      input: ''
    }  
  },
  
  computed: {
    ...mapState(MODULE_NAME, ['categoryList'])
  },
  components: {
    MyHeader,
  },
  methods: {
    ...mapActions(MODULE_NAME, [FETCH_CATEGORY_LIST, ACT_DELETE_CATEGORY, ACT_CREATE_CATEGORY]),
    fetchList() {
      this[FETCH_CATEGORY_LIST]()
    },
    handleClose (e, item) {
      this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this[ACT_DELETE_CATEGORY](item)
        }).catch(() => {
          console.log('取消删除')        
        });
    },
    createCate (e) {
      let val = this.input.trim()
      if( val !== '') {
        this[ACT_CREATE_CATEGORY]({name: val}).then(() => {
          this.input = ''
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.inline-block {
  display: inline-block;
}
.cate-body {
  margin: 0 1.25em;
  h3 {
    // margin-bottom:
  }
  // .tags {
  //   margin-top: 1em;
  // }
  .tag {
    height: 40px;
    line-height: 40px;
    vertical-align: top;
    margin-right: 1em;
    margin-top: 1em;
    font-size: 14px;
  }
}
.el-input__inner {
  width: 200px;
}
</style>
