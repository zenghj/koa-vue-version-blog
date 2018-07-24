const location = window.location
const host = location.host
const protocol = location.protocol
const urlPrefix = `${protocol}//${host}/blog`

const URLS = {
  client: `${urlPrefix}/client`,
  admin: `${urlPrefix}/admin`
}

export default URLS
