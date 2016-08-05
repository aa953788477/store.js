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
  }
}
