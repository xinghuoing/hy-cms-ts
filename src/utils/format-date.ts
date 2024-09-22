import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

export function formatUTC(utcString: string, format: string = 'YYYY-MM-DD HH:mm:ss') {
  return dayjs.utc(utcString).utcOffset(8).format(format)
}

// 00:00:00  小写的hh是不分AM/PM的要换成大写的HH
export function formatUTCStart(utcString: string) {
  const startDate = formatUTC(utcString, 'YYYY-MM-DD')
  return dayjs(startDate).startOf('day').format('YYYY-MM-DD HH:mm:ss')
}
// 23:59:59
export function formatUTCEnd(utcString: string) {
  const endDate = formatUTC(utcString, 'YYYY-MM-DD')
  return dayjs(endDate).endOf('day').format('YYYY-MM-DD HH:mm:ss')
}
