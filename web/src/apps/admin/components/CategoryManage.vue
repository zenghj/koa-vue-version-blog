<template>
  <section class="categories">
    <my-header></my-header>
    <div class="cate-body">
      <h3>
        分类列表
      </h3>

      <div class="tags">
        <el-tag class="tag" v-for="tag in list" :key="tag.name" :closable="tag.name !== 'others'" :type="tag.type" @close="handleClose($event, tag)">
        {{tag.name}}
      </el-tag>
      <el-form inline class="inline-block tag">
        <el-form-item>
          <el-input placeholder="请输入内容" v-model="input">
            <el-button slot="append" type="text" @click="createCate">添加分类</el-button>
          </el-input>
        </el-form-item>
      </el-form>
      </div>
    </div>

  </section>

</template>
<script>
import {getCategoryories, delCategoryory, createCategory} from '../config/api.js'
import MyHeader from './MyHeader.vue'
export default {
  data () {
    return {
      list: [],
      input: ''
    }
  },
  created() {
    this.fetchList()
  },
  components: {
    MyHeader,
  },
  methods: {
    fetchList() {
      getCategoryories().then(({data}) => {
        if(data.state === 1) {
          this.list = data.result.list
        } else {
          this.$message.error(data.msg || '获取Categoryories失败')
        }
      })
    },
    handleClose (e, item) {
      this.$confirm('确定删除?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delCategoryory(item.name).then(({data}) => {
            if(data.state === 1) {
              this.$message.success('删除成功')
              this.fetchList()
            } else {
              this.$message.error(err.msg || '删除失败')
            }
          }).catch(err => {
            console.error(err)
            this.$message.error(err.msg || '删除失败')
          })
        }).catch(() => {
          console.log('取消删除')        
        });
    },
    createCate (e) {
      if(this.input.trim() !== '') {
        createCategory({name: this.input}).then(({data}) => {
          if(data.state === 1) {
            this.$message.success('创建成功')
            this.input = ''
            this.fetchList()
          } else {
            this.$message.error('创建失败')
          }
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
