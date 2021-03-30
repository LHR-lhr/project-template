/**
 * 函数防抖 (只执行最后一次点击)
 * @param {function} fn - 要被应用防抖的函数
 * @param {number} [ delay=500 ] - 间隔时间
 * @returns {function}
 * @constructor
 */
const debounce = (fn, delay = 500) => {
  let timer
  return function () {
    const args = arguments
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      timer = null
      fn.apply(this, args)
    }, delay)
  }
}
/**
 * 函数节流
 * @param {function} fn - 要被应用节流的函数
 * @param {number} [ t = 500 ] - 间隔时间
 * @returns {function}
 * @constructor
 */
const throttle = (fn, t = 500) => {
  let last, timer
  const interval = t
  return function () {
    const args = arguments
    const now = +new Date()
    if (last && now - last < interval) {
      clearTimeout(timer)
      timer = setTimeout(() => {
        last = now
        fn.apply(this, args)
      }, interval)
    } else {
      last = now
      fn.apply(this, args)
    }
  }
}

// 判断类型
/**
  @param {object} obj - 要被检测的对象
  @param {string} type - 检测类型
  @returns {boolean} flag - 检测结果
*/
const isType = (obj, type) => {
  if (typeof obj !== 'object') return false
  const typeString = Object.prototype.toString.call(obj)
  let flag
  switch (type) {
    case 'String':
      flag = typeString === '[object String]'
      break
    case 'Number':
      flag = typeString === '[object Number]'
      break
    case 'Boolean':
      flag = typeString === '[object Boolean]'
      break
    case 'Undefined':
      flag = typeString === '[object Undefined]'
      break
    case 'Null':
      flag = typeString === '[object Null]'
      break
    case 'Array':
      flag = typeString === '[object Array]'
      break
    case 'Function':
      flag = typeString === '[object Function]'
      break
    case 'RegExp':
      flag = typeString === '[object RegExp]'
      break
    case 'Date':
      flag = typeString === '[object Date]'
      break
    case 'Error':
      flag = typeString === '[object Error]'
      break
    default:
      flag = false
  }
  return flag
}
// 正则提取flag
const getRegExp = (re) => {
  var flags = ''
  if (re.global) flags += 'g'
  if (re.ignoreCase) flags += 'i'
  if (re.multiline) flags += 'm'
  return flags
}
/**
 * 深拷贝
 * @param  {object} parent object 需要进行克隆的对象
 * @return {object}        深克隆后的对象
 */
const deepClone = (parent) => {
  // 维护两个储存循环引用的数组
  const parents = []
  const children = []
  const _clone = parent => {
    if (parent === null) return null
    if (typeof parent !== 'object') return parent

    let child, proto

    if (isType(parent, 'Array')) {
      // 对数组做特殊处理
      child = []
    } else if (isType(parent, 'RegExp')) {
      // 对正则对象做特殊处理
      child = new RegExp(parent.source, getRegExp(parent))
      if (parent.lastIndex) child.lastIndex = parent.lastIndex
    } else if (isType(parent, 'Date')) {
      // 对Date对象做特殊处理
      child = new Date(parent.getTime())
    } else {
      // 处理对象原型
      proto = Object.getPrototypeOf(parent)
      // 利用Object.create切断原型链
      child = Object.create(proto)
    }
    // 处理循环引用
    const index = parents.indexOf(parent)

    if (index !== -1) {
      // 如果父数组存在本对象,说明之前已经被引用过,直接返回此对象
      return children[index]
    }
    parents.push(parent)
    children.push(child)
    for (const i in parent) {
      // 递归
      child[i] = _clone(parent[i])
    }
    return child
  }
  return _clone(parent)
}

/** 缓存操作相关 */
const cache = {
  /**
    保存数据到本地缓存
    @param {string} name - 操作字段名
    @param {*} data- 操作数据
    @param {boolean} [stringify = false] - 是否开启JSON序列化
  */
  setStorage (name, data, stringify = false) {
    if (stringify) localStorage.setItem(name, data)
    else localStorage.setItem(name, JSON.stringify(data))
  },
  /**
    读取缓存数据
    @param {string} name - 操作字段名
  */
  getStorage (name) {
    return localStorage.getItem(name)
  },
  /**
    删除缓存数据
    @param {string} name - 操作字段名
  */
  removeStorage (name) {
    localStorage.removeItem(name)
  },
  /**
    清空缓存数据
  */
  clearStorage () {
    localStorage.clear()
  }
}

const QuickSort = (arr, low = 0, high = arr.length > 0 ? arr.length - 1 : -1) => {
  const base = arr[low]
  let l = low
  let h = high
  if (isType(arr, 'Array')) {
    if (l < h) {
      while (l !== h) {
        while (h > l && arr[h] >= base) --h
        arr[l] = arr[h]
        while (l < h && arr[l] <= base) ++l
        arr[h] = arr[l]
      }
      arr[l] = base
      QuickSort(arr, low, l - 1)
      QuickSort(arr, l + 1, high)
      return arr
    }
  } else {
    console.error('arr不是一个数组！')
    return false
  }
}

export {
  debounce,
  throttle,
  isType,
  deepClone,
  cache,
  QuickSort
}
