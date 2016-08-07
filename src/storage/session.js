let storage = window.sessionStorage
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
      if (callback(this.get(key), key) === false) return
    }
  }
}
