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
  }

  set (key, value, exp) {
    let item = {
      value: value,
      exp: exp,
      time: new Date().getTime()
    }
    this.storage.set(key, item)
    return this
  }

  get (key) {
    let item = this.storage.get(key)
    if (item === null) return null
    let nowTime = new Date().getTime()
    if (item.exp && nowTime - item.time > item.exp) {
      this.storage.remove(key)
      return null
    }
  }

  clear () {
  }

  remove (key) {
  }

  has (key) {
  }

  forEach () {
  }
  getAll () {
  }
}
