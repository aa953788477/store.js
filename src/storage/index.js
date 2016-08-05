import local from './local'
import session from './session'

let storageMap = {}
export const register = function (name, obj) {
  storageMap[name] = obj
}

export const getStorage = function (name) {
  return storageMap[name]
}

register('local', local)
register('session', session)
