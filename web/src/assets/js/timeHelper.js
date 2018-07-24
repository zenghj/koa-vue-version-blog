import moment from 'moment'

export default function format (str) {
  return moment(str).format('YYYY/MM/DD HH:MM:SS')
}
