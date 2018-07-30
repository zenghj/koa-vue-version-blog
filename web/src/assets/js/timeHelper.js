import moment from 'moment'

export default function formatTime (str) {
  if (!str) return ''
  return moment(str).format('YYYY/MM/DD HH:mm:ss')
}
