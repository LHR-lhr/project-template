/* eslint-disable */
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
const esSort = (arr, fn) =>{
  var resArr = arr;
    if(Object.prototype.toString.call(fn)==='[object Function]'){
        //如果传进来参数的是函数
        for(var i = 0;i<resArr.length-1;i++){
            //遍历数组,将前后两项作为实参传给fn
            if(fn.call(resArr,resArr[i],resArr[i+1])>0){
                //如果fn执行之后的返回值大于0.就调用swap方法交换位置
                var a = resArr[i],b=resArr[i+1];
                resArr[i] = swap(a,b).a;
                resArr[i+1] = swap(a,b).b;
                //交换之后，如果当前项不是第一项，则当前项(索引为i的项)继续跟前面的项进行比较
                if(i>0){
                    for(var j = i-1;j>=0;j--){
                            if(fn.call(resArr,resArr[j],resArr[j+1])>0){
                                var a = resArr[j],b=resArr[j+1];
                                resArr[j] = swap(a,b).a;
                                resArr[j+1] = swap(a,b).b;
                            }
                        }
                }
            }
        }
    }else{
        //如果不是函数，则按正常排序
        //遍历数组，将前后两项进行比较
        for(var i = 0;i<resArr.length-1;i++){
            var cur = resArr[i];//当前项
            var next = resArr[i+1];//下一项
            if(comASCII(cur,next)){
                //当返回true的时候交换，并且交换完成之后，当前项继续往前比较
                resArr[i] = swap(cur,next).a;
                resArr[i+1] = swap(cur,next).b;
                //当前项继续向前比较
                if(i>0){
                    for(var k = i-1;k>=0;k--){
                        var cur = resArr[k];
                        var next = resArr[k+1];
                        if(comASCII(cur,next)){
                            resArr[k] = swap(cur,next).a;
                            resArr[k+1] = swap(cur,next).b;
                        }
                    }
                }
            }
        }
    }
    //封装一个交换位置的函数
    function swap(a,b){
        return {
            a:b,
            b:a
        }
    }
    //如果不传参的情况下比较ASCII码
    function comASCII(cur,next){
        //全部转换为字符串、逐项比较ASCII码
        cur = cur.toString();
        next = next.toString();
        //取长度最大值
        var len = cur.length>next.length?next.length:cur.length;
        //当前后两项都不是不是{}类型的数据时，进行比较
        if(cur!=='[object Object]'&&next!=='[object Object]'){
            for(var j = 0;j<len;j++){
                if(!isNaN(cur.charCodeAt(j))&&!isNaN(next.charCodeAt(j))){
                    //如果二者的ASCII码都是有效数字
                    if(cur.charCodeAt(j)>next.charCodeAt(j)){
                        //如果前一项比后一项当前的ASCII码大，则返回true，交换位置
                        return true;
                    }else if(cur.charCodeAt(j)==next.charCodeAt(j)){
                    //如果相等直接进入下一轮循环
                            continue;
                        }else{
                        //前项比后项小，直接返回false
                            return false;
                        }
                }
            }
            if(!isNaN(cur.charCodeAt(len))&&isNaN(next.charCodeAt(len))&&(cur.charCodeAt(len-1)==next.charCodeAt(len-1))){
                //比较完之后，如果前一项ASCII还是有效数字，说明前项比后项大，交换
                return true;
            }
        }
        //如果上述条件不满足，则不交换
        return false;
    } 
    //返回当前数组
    return resArr;
};

export {
  debounce,
  throttle,
  isType,
  deepClone,
  cache,
  QuickSort,
  esSort
}
