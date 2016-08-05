export const each = function (loopable, callback) {
  if (loopable) {
    if (loopable.length === +loopable.length && loopable.length - 1 in loopable) {
      var i
      for (i = 0; i < loopable.length; i++) {
        if (callback.call(loopable[i], loopable[i], i) === false) break
      }
    } else {
      for (var key in loopable) {
        if (callback.call(loopable[key], loopable[key], key) === false) break
      }
    }
  }
}

export const extend = function (base) {
  each(Array.prototype.slice.call(arguments, 1), function (extensionObject) {
    each(extensionObject, function (value, key) {
      if (extensionObject.hasOwnProperty(key)) {
        base[key] = value
      }
    })
  })
  return base
}
