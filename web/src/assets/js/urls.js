const location = window.location
const host = location.host
const protocol = location.protocol
const urlPrefix = `${protocol}//${host}/blog`
// const apiPrefix = `${urlPrefix}/api`

const URLS = {
  client: `${urlPrefix}/client`,
  admin: `${urlPrefix}/admin`,
  uploadImgApi: `http://47.95.13.52/service/upload/img`
  // uploadImgApi: `http://127.0.0.1:2333/service/upload/img`
}

export default URLS
