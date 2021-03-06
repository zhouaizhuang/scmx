/*
**************小程序api操作********************
*/
// const app = getApp()
// // 上报错误到小程序后台
// const log = wx.getRealtimeLogManager ? wx.getRealtimeLogManager() : null
// const username = wx.getStorageSync('username')
// const phone = wx.getStorageSync('phone')
// export const reportError = function (err) {
//   if (!log) {return}
//   let errStr = err
//   if(isError(err)) {
//     const {message, stack } = err
//     errStr = stack ? String(stack) : String(message)
//     errStr = errStr || String(err)
//   } else if(isObject(err)) {
//     errStr = JSON.stringify(err)
//   }
//   log.error.call(log, `${username}-${phone}-${errStr}`)
// }
// export const reportInfo = function (info) {
//   if (!log) {return}
//   let errStr = info
//   if(isError(info)) {
//     const {message, stack } = info
//     errStr = stack ? String(stack) : String(message)
//     errStr = errStr || String(info)
//   } else if(isObject(info)) {
//     errStr = JSON.stringify(info)
//   }
//   log.info.call(log, `${username}-${phone}-${errStr}`)
// }
/*
 * 二次封装wx.request()
 * url:请求的接口地址
 * options:{method:请求方式, data: 请求传参, header: 请求头信息}
 */
// export const get = function (url, params){
//   return request(url, { data: params })
// }
// export const post = function (url, params){
//   return request(url, { method: 'POST', data: params })
// }
// export function request (url, options = {}) {
//   const site = wx.getStorageSync('site')
//   let host
//   const data = formatJSON(options.data)
//   delete options.data
//   const newOptions = {
//     method: 'GET',
//     data,
//     header: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" }, // 默认值 ,另一种是 "content-type": "application/x-www-form-urlencoded"
//     ...options
//   }
//   newOptions.method = newOptions.method.toUpperCase()
//   if(newOptions.method === 'POST') {
//     url = url.includes('?') ? url + '&' : url + '?'
//     url += `token=${app.globalData.token}`
//   } else {
//     newOptions.data.token = app.globalData.token
//   }
//   if(newOptions.method === 'POST') {
//     url = url.includes("token") ? `${url}&site=${site}&device=xcx` : `${url}?site=${site}&device=xcx`
//   } else {
//     newOptions.data.site = site
//     newOptions.data.device = 'xcx'
//   }
//   if(app.globalData.root) {
//     host = HOST['SH']
//   } else {
//     host = ENV === 'production' ? HOST['KH'] : HOST['CS']
//   }
//   url.includes('api/log/save') && wxLog.warn(`签到签退接口：${url}, 参数：${JSON.stringify(options.data)}`)
//   return new Promise((resolve, reject) => {
//     wx.request({
//       url: host + url,
//       ...newOptions,
//       success: res => {
//         const { code, token } = res.data 
//         if (code === 401) {
//           app.toLogin()
//         } else if(res.statusCode >= 400 && res.statusCode <= 600) {
//           reportError(`请求失败!url:${host + url}<==>statusCode:${res.statusCode}<==>data:${JSON.stringify(res.data)}`)
//           reportError(JSON.stringify(res.data))
//           throw new Error(JSON.stringify(res.data))
//         } else {
//           const oldToken = wx.getStorageSync('token')
//           if (token !== oldToken && code) {
//             app.globalData.token = token
//             wx.setStorageSync('token', token)
//           }
//           resolve(res)
//           url.includes('api/log/save') && wxLog.warn(`签到签退请求发起成功, 返回data: ${JSON.stringify(res.data)}`)
//           url.includes('api/log/log-detail') && wxLog.warn(`获取上次签到请求发起成功, 返回data: ${JSON.stringify(res.data)}`)
//         }
//       },
//       fail: err => {   //请求失败
//         // log('请求失败 (>_<)')
//         reject(err)
//       },
//       complete: () => {
//         // complete
//       }
//     })
//   })
// }


// 显示loading
export const showLoading = function (title = '加载中', duration = 0, mask = true) {
  wx.showLoading({ title, mask})
  if(duration) {
    hideLoading(duration)
  }
}
// 关闭loading
export const hideLoading = function (time = 0) {
  setTimeout(() => { wx.hideLoading() }, time)
}
// 显示提示弹框
export const showToast = (title, delay = 0, duration = 3000, icon='none') => {
  if(title) {
    setTimeout(() => {
      wx.showToast({ title: String(title), icon, duration})
      setTimeout(() => wx.hideToast(),duration)
    }, delay)
  }
}
// 页面跳转
export const go = function (url = '', time = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      wx.navigateTo({
        url,
        success: res => { resolve(res) },
        fail: err => { reject(err) }
      })
    }, time)
  })
}
// 返回页面栈前面N页, 延时time毫秒执行, 返回promise对象
export const goBack = function (delta = 1, time = 0) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      wx.navigateBack({
        delta,
        success: res => { resolve(res) },
        fail: err => { reject(err) }
      })
    }, time)
  })
}
// 设置当前页面的标题
export const setPageTitle = function (title = '') {
  return new Promise((resolve, reject) => {
    wx.setNavigationBarTitle({
      title,
      success: res => { resolve(res) },
      fail: err => { reject(err) }
    })
  })
}

/*
**********************************************************************************************
******************************************公共方法*********************************************
**********************************************************************************************
*/
export const isType = type => val => type === Object.prototype.toString.call(val).slice(8, -1)
export const isArray = isType('Array')
export const isObject = isType('Object')
export const isNull = isType('Null')
export const isUndefined = isType('Undefined')
export const isFunction = isType('Function')
export const isRegExp = isType('RegExp')
export const isString = isType('String')
export const isNumber = isType('Number')
export const isDate = isType('Date')
export const isError = isType('Error')
export const isGt0 = val => /^\+?[1-9][0-9]*$/.test(val) // 是否是大于0的整数
export const isGtEq0 = val => /^\+?[1-9][0-9]*$/.test(val) || String(val) === '0' // 是否是大于等于0的整数
export const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
export const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
export const isPhoneNum = val => /^1[3456789]\d{9}$/.test(val) // 检测是否是手机号码
// 执行此函数，或导致函数执行阻塞在此处t毫秒
// 举例子: await wait(500);   那么程序会在此处阻塞等待500ms
export const wait = async function(t) {
  return new Promise(resolve => setTimeout(() => resolve(), t))
}
// 深拷贝
export const deepCopy = function (obj) {
  if(!(isArray(obj) || isObject(obj))) { return obj }  // 数字、日期、正则、函数、字符串、undefined、null、Symbol直接返回
  let res = isArray(obj) ? [] : {}
  return Object.keys(obj).reduce((prev, item) => {
    prev[item] = (isArray(obj[item]) || isObject(obj[item])) ? deepCopy(obj[item]) : obj[item]
    return prev
  }, res)
}
// 获取唯一ID
export const guID = function () {
  return Number(Math.random().toString().substr(3, 8) + Date.now()).toString(36)
}
// 函数防抖
export const debounce = function (fn, wait=3e3) {
  if(!isFunction(fn)){throw new Error('传入的参数必须是个函数')}
  let timeout = null  // 使用闭包，让每次调用时点击定时器状态不丢失
  return function () { 
    clearTimeout(timeout) // 如果用户在定时器（上一次操作）执行前再次点击，那么上一次操作将被取消
    timeout = setTimeout(()=> fn(...arguments), wait)
  }
}
// 函数节流
export const throttling = function  (fn, wait=3e3) {
  let timeout = null // 使用闭包，让每次调用时点击定时器状态不丢失
  let start = +new Date() // 记录第一次点击时的时间戳
  return function () {
    clearTimeout(timeout)
    let end = +new Date() // 记录第一次以后的每次点击的时间戳
    if (end - start >= wait) { // 当时间到达设置的延时时间则立即调用数据处理函数
      fn(...arguments)
      start = end // 执行处理函数后，将结束时间设置为开始时间，重新开始记时
    } else {
      timeout = setTimeout(() => fn(...arguments), wait) // 后续点击没有到达设置的延时，定时器设定延时进行调用
    }
  }
}
// 获取当前滚动距离顶部的距离
export const getScrollTop = function() {
  return (document.documentElement && document.documentElement.scrollTop) || document.body.scrollTop
}
/*
**********************************************************************************************
******************************************数组方法*********************************************
**********************************************************************************************
*/
/**洗牌算法**/
// [1,2,3,4,5,6].sort(() => .5 - Math.random()) // 基础版本
export const shuffle = function (arr){
  if(!isArray(arr)) { arr = [arr] }
  let n = arr.length, random
  while(0!=n){
    random =  (Math.random() * n--) >>> 0; // 无符号右移位运算符向下取整
    [arr[n], arr[random]] = [arr[random], arr[n]] // ES6的结构赋值实现变量互换
  }
  return arr
}
/**
 *  缓存函数计算结果
 * @举例 const cachedComputed = cached(function(val){ return val + 'ZZZ' })
 * @测试 cachedComputed('abc') ---> 'absZZZ' 第二次调用就不需要计算了直接取值 cachedComputed('abc') ---> 'absZZZ'
 * */ 
export const cached = function (fn) {
  const cache = {}
  return function (str) {
    return !cache[str] && (cache[str] = fn(str)), cache[str]
  }
}
// 对象数组转对象
// toObject([{name: 1}, {age:2}]) ====> {name:1, age:2}
export const toObject = function (arr) {
  var res = {}
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i])
    }
  }
  return res
}
// 检测是否大致相等
// looseEqual(1,'1') ===> true
// looseEqual({name:'zaz'},{'name':'zaz'}) ===> true
export const looseEqual = function (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a)
  var isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = isArray(a)
      var isArrayB = isArray(b)
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a)
        var keysB = Object.keys(b)
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}
// 获取进近似相等的val值，在数组arr中的位置。没找到相似的返回-1
// looseIndexOf([{name:'zaz'}], {name:'zaz'})  ===> 0
export const looseIndexOf = function (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}
// 一次性函数。只执行一次。后面再调用,没有任何函数内代码执行
// 示例：const aa = once(function (a, b){console.log(a + b)})
// aa(1,2) ===> 3   ------>  aa(3, 4) ===> undefined
export const once = function(fn) {
  var called = false
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}
// 删除数组中某个元素
// const arr = ['a', 'b', 'c']
// remove(arr, 'b') ====> arr变更为['a', 'c']
export const remove = function(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) { return arr.splice(index, 1) }
  }
}
// 数组、字符串元素复制N次 
// 举例(重复生成数组元素)： repeat([{age:1}], 2) ====>[{age:1, _id: 'asdasd2j2'}, {age:1, _id: '123123c'}]  // 备注增加_id是为了for循环的key值不重复
// 举例（重复生成字符串）： repeat('abc', 2) ====>  'abcabc'
// 字符串复制实现： Array(3).join(0) ====> '00'    "0".repeat(2) ===> '00'
// 引用类型复制实现： Array(2).fill([{name: '张三'}]) ====> [[{name: '张三'}], [{name: '张三'}]]
export const repeat = function(obj = '', times = 1) {
  let res = isArray(obj) ? [] : ''
  if(isArray(obj)) {
    if(isObject(obj[0])) {
      for(let i =0; i < range(times, 1); i++) {
        const tmp = deepCopy(obj).map(v => ({...v, _id: guID()}))
        res = [...res, ...tmp]
      }
    } else {
      res = [...obj, ...obj]
    }
  } else {
    for(let j = 0; j < range(times, 1); j++){
      res += obj
    }
  }
  return res
}
// 按照某个字段进行排序。
// 举例：sortByProp([{name:'ss', age:30}, {name:'dd', age:14}], 'age') ----> [{name:'dd', age:14}, {name:'ss', age:30}]
// increase不传默认升序， 传false降序
export const sortByProp = function (arr, str, increase = true) {
  return arr.sort((a, b) => increase ? a[str] - b[str] : b[str] - a[str])
}
/**
* 数组去重
* 举例： noSame([1,2,3,4,'1'])
*/
export const noSame = function(arr) {
  const newData = arr.reduce((prev, item) => (prev.set(item, item), prev), new Map())
  return [...newData.keys()]
}
//递归解析数组中某个字段最深层该字段数组平铺。举例子：获取数组中每个对象的最深层的child属性
// const arr = [{ 
//   name: 'a',
//   child:[{
//       name:'b',
//       child: [ { name:'c' }]
//   }]
// }]
//getAreaFlat(arr, 'child')------> [{name:'c'}]
export const getAreaFlat = function (arr, props) {
  if(arr.some(item => isArray(item[props]) && item[props].length)) {
    arr = arr.reduce((prev, item) => isArray(item[props]) && item[props].length ? [...prev, ...item[props]] : [...prev, item], [])
    return getAreaFlat(arr, props)
  } else {
    return arr
  }
}
// 获取某个数组中某个字段的值，拼接成字符串。
// 举例： const arr = [{name:'a'}, {name:'b'}]
// getField(arr, 'name')----> 'a,b'
export const getField = function (arr, field, split = ',') {
  return arr.reduce((prev, item) => [...prev, item[field]], []).join(split)
}
// 获取某个数组中字段isChecked为true的条目。并取出其中特定字段。
// 举例：const arr = [{id:1, isChecked: true}, {id:2, isChecked:false}, {id:2, isChecked:true}]
// getChecked(arr, 'id')  ---> 1,2
export const getChecked = function (arr, field, checkStr = 'isChecked', split = ',') {
  return arr.reduce((prev, item) => (item[checkStr] && prev.push(item[field]), prev), []).join(split)
}
// 数组分块
// 举例子： chunk([1,2,3,4,5], 2) ====>   [[1,2], [3, 4], [5]]
export const chunk = function (arr, size = 0) {
  if(!isArray(arr)) {throw new Error('arr必须是数组类型')}
  size = Number(size)
  if(!isGt0(size)) {throw new Error('size必须为大于0的整数')}
  var targetArr = []
  for(var i = 0; i < arr.length; i += size) {
    targetArr.push(arr.slice(i, i + size));
  }
  return targetArr
}
// 数组（a 相对于 b 的）交集
// 举例子: intersect([1,2,3], [1,2]) ====> [1, 2]
export const intersect = function (arr1, arr2){
  if(!isArray(arr1) || !isArray(arr2)) {throw new Error('参数必须是数组类型')}
  const tmp = new Set(arr2)
  return arr1.filter(x => tmp.has(x))
}
// 数组（a 相对于 b 的）差集
// 举例子: difference([1,2,3], [1,2]) ====> [3]
export const difference = function (arr1, arr2){
  if(!isArray(arr1) || !isArray(arr2)) {throw new Error('参数必须是数组类型')}
  const b = new Set(arr2)
  return arr1.filter(x => !b.has(x))
}
/*
**********************************************************************************************
******************************************字符串操作*********************************************
**********************************************************************************************
*/
// 去除字符串的首尾空格
export const trim = function (str = '') {
  return String(str).replace(/(^\s*)|(\s*$)/g, '')
}
// 固定裁剪几个字符之后显示省略号。举例：sliceStr('张三李四王五', 2) ----> "张三..."
export const sliceStr = function (str, num) {
  str = String(str)
  let newStr = str.substr(0, num)
  str.length > num && (newStr += '...')
  return newStr
}
// 字符串前置补0。举例: addZero('1', 2) ==> '01'
export const addZero = function (str, num) {
  return (Array(num+1).join('0') + str).slice(-num)
}
// 完美的统计字符串长度，能正确统计占四个字节的Unicode字符。举例：length('x\uD83D\uDE80y') ----> 3
export const length = function (str) {
  return [...str].length
}
/*
**********************************************************************************************
******************************************JSON操作*********************************************
**********************************************************************************************
*/
// 格式化JSON, 将null, undefined,转换为''，否则后端会认为undefined和null为字符串导致bug
// 举例子：formatJSON({name:null, age:undefined, school: '清华大学'}) ---> {name:'', age:'', school: '清华大学'}
export const formatJSON = function (obj) {
  if(!isObject(obj)) { return {} }
  return Object.keys(obj).reduce((prev, item) => {
    prev[item] = isNull(obj[item]) || isUndefined(obj[item]) || ['undefined', 'null'].includes(obj[item]) ? '' : obj[item]
    return prev
  }, {})
}
// 检查表单必填项是否为空，空则返回第一个为空的字段名。
// 举例：checkParams({name:'张三', age:'', school:''}) ----> 'age'
export const checkJSON = function (obj) {
  return Object.keys(obj).find(item => !Boolean(obj[item])) || ''
}
// JSON转url
// 举例子： JSON2url('../advise/index', { from: 'index', id_str:'1243' }) -----> '../advise/index?from=index&id_str=1243'
export const JSON2url = function (url = '', params = {}){
  params = formatJSON(params)
  return Object.keys(params).reduce((prev, item) => {
    prev += prev.includes('?') ? '&' : '?'
    prev += `${item}=${encodeURIComponent(params[item])}`
    return prev
  }, url) || ''
}
/**
 * url转JSON
 * @举例 url2JSON('http://www.baidu.com?name=asd&age=12') ----> {name: "asd", age: "12"}
 */
export const url2JSON = function (url = '') {
  let paramsStr = url.includes('?') ? (url.split('?')[1] || '') : url
  paramsStr = paramsStr.split('#')[0] || '' // 防止一些url中混入#号放在?号之后，此处做一个适配
  return paramsStr.split('&').reduce((prev, item) => {
    const [key, val] = item.split('=')
    return { ...prev, [key]: decodeURIComponent(val) } // 此处需要转码，否则中文和一些特殊字符就无法支持了
  }, {})
}
/**
 * 返回一个lower - upper之间的随机数
 * @param lower 下限
 * @param upper 上限
 * @举例 random(0, 0.5) ==> 0.3567039135734613
 * @举例 random(1, 2) ===> 1.6718418553475423
 * @举例 random(-2, -1) ==> -1.4474325452361945
 * 原生参考代码:  a = new Date % 100; // 两位整数随机数
 * a = new Date % 1000; // 三位整数随机数
 * a = new Date % 10000; // 四位整数随机数...依次类推
 */
export const random = function (lower, upper) {
    lower = +lower || 0
    upper = +upper || 0
    return Math.random() * (upper - lower) + lower
}
// 禁止复制
/*
['contextmenu', 'selectstart', 'copy'].forEach(function(ev){
    document.addEventListener(ev, function(event){
      return event.returnValue = false
    })
})
*/
/**
 * 获取部分字段。举例：
 * @param obj 需要读取的对象
 * @param props 需要得到的字段
 * @举例 const obj = {name:'', age:123,school:{hh:11, kj:true}, asd:'qqwq'}
 * @举例 getProps(obj, {name:'', school:{hh:''}, asd:''}) ----> 得到其中部分字段。这个函数可以用户提升小程序列表页和详情页大量数据的渲染性能
 * 还可以直接传入对象数组像这种[{...},{...},{...},{...}]，返回相应字段的对象数组
 * 主要运用于优化移动端大量数据下拉加载更多导致setData的数据很庞大
 */
export const getProps = function (obj, props) {
  if(!isObject(props)) { throw new Error('参数有误，参数必须为object') }
  if(isArray(obj)) {
    return obj.map(item => {
      return Object.keys(props).reduce((prev, v) => {
        prev[v] = isObject(props[v]) ? getProps(item[v], props[v]) : item[v] || ''
        return prev
      }, {})
    })
  }else if(isObject(obj)) {
    return Object.keys(props).reduce((prev, item) => {
      prev[item] = isObject(props[item]) ? getProps(obj[item], props[item]) : obj[item] || ''
      return prev
    }, {})
  } else {
    return obj
  }
}

/**
 * 保证json格式数据的可靠获取
 * @param run 需要执行的函数
 * @param defaultVal 默认值
 * @举例 const obj = { area: { city: null, cityName:'北京' }, areaName: '中国' }
 * @举例 safeGet(() => obj.area.city.town, '') ---> ''
 * @举例 避免了这种写法： obj.area && obj.area.city && obj.area.city.town ? obj.area.city.town : ''
 */
export const safeGet = function (run, defaultVal = '') {
  try {
    return run() || defaultVal
  } catch(e) {
    return defaultVal 
  } 
}

/*
**********************************************************************************************
******************************************金额操作*********************************************
**********************************************************************************************
*/
/**
 * 四舍五入返回N位有效数字（常用于金额计算）
 * @param num 要格式化的数字
 * @param type float->小数形式。  intFloat->当整数的时候不需要带两个小数0，带小数时，保留几位小数
 * @param prev 前置金额符号等等
 * @param prec 保留几位小数
 * @param sep 千分位符号
 * @举例 formatMoney(12322.1223, 'float') ====> "￥12,322.12" // 保留0位小数四舍五入得到 12
 * @举例 formatMoney(12322.1223, 'float', '', 1) ------> "12,322.1"  固定显示1位小数
 * @举例 formatMoney(12322, 'intFloat') ------> "12322"  当没有小数点就显示整数，否则显示整数
 */
export const formatMoney = function (num = 0, type = 'float', prec = 2, dec = '.', sep = ',') {
  num = String(num).replace(/[^0-9+-Ee.]/g, '') || '0'
  prec = Number(prec)
  if((type === 'intFloat' && !num.includes('.')) || num === '0') { return num }
  let [intStr = '', floatStr = ''] = round(num, prec).split(dec) // 分割出整数和小数部分
  let re = /(-?\d+)(\d{3})/ // 匹配整数部分每个三位数
  while (re.test(intStr)) {
    intStr = intStr.replace(re, "$1" + sep + "$2") // 整数部分三位数添加分隔符如','
  }
  floatStr += new Array(prec + 1).join('0')
  return `${intStr}${dec}${floatStr.slice(0, prec)}`
}
/**
 * 四舍五入返回N位有效数字（常用于金额计算）
 * @param num 需要处理的的数字、支持传入字符串
 * @param prec 保留的小数位数
 * @举例 round(12.35) ==> 12  // 12.35 保留0位小数四舍五入得到 12
 * @举例 round(12.35, 1) ==> 12.4 // 12.35 保留1位小数四舍五入得到 12.4
 */
export const round = function (num, prec = 0) {
  prec = Number(prec)
  prec < 0 && (prec = 0)
  const k = Math.pow(10, prec)
  return String(Math.round(Number(num) * k) / k)
}
/**
 * 数据范围
 * @param num 需要限制的数字
 * @param min 限制最小值
 * @param max 限制最大值
 * @举例 range(12.23, 7, 10)  ===> 10 // 上限为10 因此返回10
 * @举例 range(12.23, 14, 20)  ===> 14 // 下限为14 因此返回10
 */
export const range = function (num, min = null, max = null) {
  if(min !== null) {
    num = Number(num) < Number(min) ? min : num
  }
  if(max !== null) {
    num = Number(num) > Number(max) ? max : num
  }
  return num
}
/*
**************日期时间操作********************
*/
/**
 * 获取日期字符串。
 * @param AddDayCount 传0代表今天，传1代表明天
 * @param split 日期分割符
 * @举例 getDateStr(0) ---> 20200904    getDateStr(1) ---> 20200905
 * @举例 分割：getDateStr(1, '-')--->2020-09-05
 */
export const getDateStr = function (AddDayCount = 0, split = '') {
  const dt = new Date()
  dt.setDate(dt.getDate() + AddDayCount) // 获取AddDayCount天后的日期
  return `0000${dt.getFullYear()}`.slice(-4) + split + `00${(dt.getMonth() + 1)}`.slice(-2) + split + `00${dt.getDate()}`.slice(-2)
}
/**
 * 获取星期几， 不传默认是今天
 * @param t 时间格式字符串比如： '2021-10-01'   当然，也同时支持传入new date('2021-10-01')生成的对象
 * @举例 getDay('2020-03-05') ---> 返回的就是这个日期对应的星期几
 * @举例 getDay() // 默认返回当天星期几
 */
export const getDay = function (t = new Date()) {
  if(!isDate(t)) { t = t.replace(/[-]/g, "/") } // 为了兼容ios
  let day = t ? new Date(t).getDay() : new Date().getDay()
  return '星期' + "日一二三四五六"[day]
}
/**
 * 获取时间
 * @param t 时间格式字符串比如： '2021-10-01'   当然，也同时支持传入new date('2021-10-01')生成的对象
 * @举例 socketTime('2020-03-05') ---> 返回的就是2020年3月5日的年月日数据
 * @举例 socketTime() // 默认返回当天数据
 */
export const socketTime = function (t = new Date()) {
  if(!isDate(t)) { t = t.replace(/[-]/g, "/") }
  const dt = new Date(t)
  const year = String(dt.getFullYear())
  const _month = String(dt.getMonth() + 1)
  const month = addZero(_month, 2)
  const day = addZero(dt.getDate(), 2)
  const _day = String(dt.getDate())
  const weekDay = String(dt.getDay())
  const _weekDay = '星期' + "日一二三四五六"[weekDay]
  const hour = addZero(dt.getHours(), 2)
  const minutes = addZero(dt.getMinutes(), 2)
  const seconds = addZero(dt.getSeconds(), 2)
  return { year, month, _month, day, _day, weekDay, _weekDay, hour, minutes, seconds }
}
/**
 * 生成格式化时间字符串
 * @举例 dateFormater('YYYY-MM-DD HH:mm') ==> 2019-06-26 18:30
 * @举例 dateFormater('YYYYMMDD-hh:mm:ss', '2020-08-12 09:13:54') ==> 20200812-09:13:54
*/
export const dateFormater = function (formater, t = new Date()){
  if(!isDate(t)) { t = t.replace(/[-]/g, "/") }
  const dt = new Date(t)
  const [Y, M, D, h, m, s] = [dt.getFullYear() + '', dt.getMonth() + 1, dt.getDate(), dt.getHours(), dt.getMinutes(), dt.getSeconds()]
  return formater.replace(/YYYY|yyyy/g, Y)
    .replace(/YY/g, Y.substr(2,2))
    .replace(/MM/g, (M < 10 ? '0' : '') + M)
    .replace(/DD/g, (D < 10 ? '0' : '') + D)
    .replace(/hh/g, (h < 10 ? '0' : '') + h)
    .replace(/mm/g, (m < 10 ? '0' : '') + m)
    .replace(/ss/g, (s < 10 ? '0' : '') + s)
}
/**得到当前时间之后N秒的时间
 * @param {*} after 多少秒之后的时间
 * @举例 afterNsecond(20)  // 20s之后的时间
 */
export const afterNsecond = function (after = 60) {
  const dt = new Date()
  return new Date(dt.getTime() + after * 1000)
}
