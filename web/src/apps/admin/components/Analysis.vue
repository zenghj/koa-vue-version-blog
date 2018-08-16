<template>
  <article class="analysis-article">
    <my-header></my-header>
    <div class="charts">
      <el-tabs tab-position="left" style="">
        <el-tab-pane label="Performance">
          <h2>&nbsp; The performance data of every page</h2>
          <br/>
          <div class="chart-items clearfix">
            <div class="chart-item fl" v-for="(url, index) in appPerformanceUrls" :key="index">
              <h4 class="chart-title"><a :href="url">&nbsp; {{url}}</a></h4>
              <Echart class="echart" :options="getStackChartOpt({data: appPerformanceTjs[url], title: url})"></Echart>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="App mounted">
          <h2>&nbsp; Data of the time used for the Vue app mounted per page</h2>
          <br/>
          <div class="chart-items clearfix">
            <div class="chart-item fl" v-for="(url, index) in appMountUrls" :key="index">
              <h4 class="chart-title"><a :href="url">&nbsp; {{url}}</a></h4>
              <Echart class="echart" :options="getChartOpt({data: appMountTjs[url], title: url, getY: appMountGetY})"></Echart>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

  </article>
</template>
<script>
import {getTJs} from '../config/api.js'
import {TJ_TYPES, APPS} from '../../../assets/js/tj.js'
import Echart from 'vue-echarts'
import MyHeader from './MyHeader.vue'
import {groupBy} from 'lodash'
import formatTime from 'rootAssets/js/timeHelper.js'

export default {
  data () {
    return {
      appMountTjs: {},
      appPerformanceTjs: {},
    }
  },
  computed: {
    appMountUrls () {
      return Object.keys(this.appMountTjs)
    },
   appPerformanceUrls () {
      return Object.keys(this.appPerformanceTjs)
    }
  },
  created() {
    let appName = APPS.BLOG_CLIENT
    this.getTJByClientMountedData().then(data => {
      if(data.state === 1 && data.result.length > 0) {
        
        this.appMountTjs = this.groupByUrl(data.result)
      }
    })
    this.getTjPerformanceData().then(data => {
      if(data.state === 1 && data.result.length > 0) {
        this.appPerformanceTjs = this.groupByUrl(data.result)
      }
    })

  },
  methods: {
    getTJByClientMountedData () {
      return getTJs({
        // app: APPS.BLOG_CLIENT,
        type: TJ_TYPES.APP_MOUNTED,
      }).then(res => res.data).catch(err => {
        this.$message.error(err.msg || '获取统计数据失败')
      })
    },
    getTjPerformanceData () {
      return getTJs({
        // app: APPS.BLOG_CLIENT,
        type: TJ_TYPES.PERFORMANCE,
      }).then(res => res.data).catch(err => {
        this.$message.error(err.msg || '获取统计数据失败')
      })
    },
    groupByUrl (array) {
      return groupBy(array, item => item.url)
    },
    appMountGetY (item) {
      return item.data.timeMS
    },
    performanceGetY (item) {
      return item.data.computed.firstScreenTimeMS
    },
    getChartOpt ({data, title, getY}) {
      if(data && data.length) {
        let xs = data.map(item => formatTime(item.createAt, 'YYYY/MM/DD HH:mm:ss'))
        let ys = data.map(getY)
        if(title === 'http://localhost:8080/blog/admin/#/Analysis' ) {
          console.log(xs, ys)
          console.log(data)
        }
        let opt = {}
        // if(title) {
        //   opt.title = {         
        //     // text: title,
        //     subtext: title,
        //     x: 'center'
        //  }
        // }
        opt = Object.assign(opt, {
          xAxis: {
              type: 'category',
              data: xs,
              // name: '记录创建时刻',
          },
          yAxis: {
              type: 'value',
              name: 'ms'
          },
          series: [{
              data: ys,
              type: 'line',
              smooth: true
          }],
          tooltip: {
              trigger: 'axis'
          },
        })

        return opt
      }
    },
    getStackChartOpt ({title, data}) {
      let opt = {}
      let xs = []
      let names = ['首屏时间', '白屏时间', 'DNS查询时间', 'onload时间']
      let types = ['firstScreenTimeMS', 'whiteScreenTimeMS', 'dnsLookupTimeMS', 'onloadTimeMS']
      let timings = data.map(item => {
        xs.push(formatTime(item.createAt, 'YYYY/MM/DD HH:mm:ss'))
        return item.data.computed
      })
      let seriesData = {}
      timings.forEach(timing => {
        types.forEach(type => {
          (seriesData[type] = seriesData[type] || []).push(timing[type])
        })
      })
      let series = types.map((type, idx) => {
        
        return {
          name: names[idx],
          type: 'line',
          // stack: '时间',
          data: seriesData[type],
          smooth: true,
        }
      })
      opt = Object.assign(opt, {
        legend: {
          data: ['首屏时间', '白屏时间', 'DNS查询时间', 'onload时间']
        },
        series,
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: xs,
        },
        yAxis: {
            type: 'value',
            name: 'ms',
        },
        tooltip: {
            trigger: 'axis'
        },
      })
      return opt
    }
  },

  components: {
    Echart,
    MyHeader,
  }
}
</script>

<style lang="less" scoped>
@import "../../../assets/less/mixin.less";
.chart-item {
  width: 800px;
  // width: 100%;
  box-shadow: 0 0 10px #999;
  border-radius: 10px;
  margin: 1em;
  .echart {
    width: inherit;
  }
}
.chart-title {
  .ellipsis();
}
</style>
