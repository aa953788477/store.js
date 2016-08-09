import Store from './Store'
import {register} from './storage/index.js'

let store = new Store()

store.version = '0.1.1'
store.create = function (options) {
  return new Store(options)
}
store.register = register

export default store
