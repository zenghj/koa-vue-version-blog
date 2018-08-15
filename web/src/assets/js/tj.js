/**
 * type [string] 统计类型
 */

import axios from 'axios'
import {collectPerformanceInfo, calcAppMountedTimeMS} from './performance'
import URLS from './urls'
export const TJ_TYPES = {
  APP_MOUNTED: 'APP_MOUNTED',
  PERFORMANCE: 'PERFORMANCE',
}

export function sendTj (opt) {
  return axios
    .post(URLS.tj, {
      app: 'blog',
      ...opt,
    })
    .catch(err => {
      console.error(err)
    })
}

export function sendPerformanceTj () {
  const performance = collectPerformanceInfo()
  return sendTj({
    type: TJ_TYPES.PERFORMANCE,
    data: performance,
    url: window.location.href,
  })
}

export function sendAppMountedTj (now) {
  if (now && typeof now === 'number') {
    return sendTj({
      type: TJ_TYPES.APP_MOUNTED,
      data: {
        timeMS: calcAppMountedTimeMS(now)
      },
      url: window.location.href,
    })
  }
}

export function applyPerformanceTj () {
  window.onload = () => {
    setTimeout(sendPerformanceTj, 0)
  }
}

export const appMountedTjMixin = {
  mounted () {
    sendAppMountedTj(Date.now())
  },
}
