export function shortFormatDate (date) {
  if (!(date instanceof Date)) return '-'
  const formater = new Intl.DateTimeFormat('en', {
    dateStyle: 'short',
    timeStyle: 'short',
    hour12: false
  })
  return formater.format(date)
}
