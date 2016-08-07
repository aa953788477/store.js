import config from './config'
import {
  extend
} from './utils'
import {
  getStorage
} from './storage'
export default class Store {
  constructor (options) {
    this.options = extend({}, config, options)
    this.storage = getStorage(options.storage)
    this.length = 0
    this._init()
  }

  _init () {
    // 初始化缓存操作
  }

  set (key, value, exp) {
    let item = this._setVal(key, value, exp)
    key = this._setKey(key)
    this.storage.set(key, item)
    return this
  }

  get (key) {
    key = this._setKey(key)
    let item = this.storage.get(key)
    return this._getVal(item)
  }

  forEach (callback) {
    this.storage.each((item, key) => {
      key = this._getKey(key)
      if (!key) return
      const value = this._getVal(item)
      if (value !== undefined && value !== null) callback(value, key)
    })
  }

  clear () {
    this.forEach((value, key) => {
      this.remove(key)
    })
    return this
  }

  remove (key) {
    key = this._setKey(key)
    this.storage.remove(key)
    return this
  }

  has (key) {
    return !!this.get(key)
  }

  getAll () {
    let allMap = {}
    this.forEach((value, key) => {
      allMap[key] = value
    })
    return allMap
  }

  _setVal (key, value, exp) {
    return {
      value: value,
      key: key,
      exp: exp || this.options.expires,
      time: new Date().getTime()
    }
  }

  _getVal (item) {
    if (item === null) return null
    let nowTime = new Date().getTime()
    if (item.exp && nowTime - item.time > item.exp) {
      this.storage.remove(item.key)
      return null
    }
    return item.value
  }

  _setKey (key) {
    return this.options.id + '_' + key
  }

  _getKey (key) {
    if (key.indexOf(this.options.id + '_') !== 0) return
    return key.substring(this.options.id.length + 1)
  }
}
