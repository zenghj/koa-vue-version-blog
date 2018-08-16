/**
 * type [string] 统计类型
 */

import axios from 'axios'
import {asyncCollectPerformance, calcAppMountedTimeMS} from './performance'
import URLS from './urls'
export const TJ_TYPES = {
  APP_MOUNTED: 'APP_MOUNTED',
  PERFORMANCE: 'PERFORMANCE',
}

export const APPS = {
  BLOG_CLIENT: 'BLOG_CLIENT',
  BLOG_ADMIN: 'BLOG_ADMIN',
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

export function asyncSendPerformanceTj (appName) {
  asyncCollectPerformance().then(performance => {
    return sendTj({
      type: TJ_TYPES.PERFORMANCE,
      data: performance,
      url: window.location.href,
      app: appName,
    })
  })
}

export function sendAppMountedTj ({app, now}) {
  if (now && typeof now === 'number') {
    return sendTj({
      type: TJ_TYPES.APP_MOUNTED,
      data: {
        timeMS: calcAppMountedTimeMS(now)
      },
      url: window.location.href,
      app,
    })
  } else {
    console.error('sendAppMountedTj fail')
  }
}
