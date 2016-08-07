let storage = window.localStorage
export default {
  set (key, value) {
    storage.setItem(key, JSON.stringify(value))
  },
  get (key) {
    return JSON.parse(storage.getItem(key))
  },
  remove (key) {
    storage.removeItem(key)
  },
  each (callback) {
    for (let key in storage) {
      callback(this.get(key), key)
    }
  }
}
