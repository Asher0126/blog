/**
 *
 * @param {String} str 合法的时间字符串
 * @param {String} format 格式化 y-M-d H:m:s
 */
export function parseTime (str, format) {
  // console.log(str, format)
  // 确定时间是否合法
  const time = Date.parse(str)
  if (!time) {
    console.error('非法时间字符串')
  }
  const d = new Date(time)

  // 获取理想的结果
  const year = d.getFullYear()
  const month = _addZero(d.getMonth() + 1)
  const date = _addZero(d.getDate())
  const hour = _addZero(d.getHours())
  const minute = _addZero(d.getMinutes())
  const second = _addZero(d.getSeconds())

  // 替换结果
  // console.log(str.replace('y', year))
  return format.replace('y', year).replace('M', month).replace('d', date).replace('h', hour).replace('m', minute).replace('s', second)
}

/**
 * 私有方法
 * @param {Number} num 数字
 */
function _addZero (num) {
  return num < 10 ? '0' + num : num
}
