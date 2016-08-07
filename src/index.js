import Store from './Store'
import {register} from './storage'

let store = new Store()

store.version = '0.1.0'
store.create = function (options) {
  return new Store(options)
}
store.register = register

export default store
