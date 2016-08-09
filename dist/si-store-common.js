/*!
 * si-store.js v0.1.1
 * (c) 2016 Myron Liu
 * Released under the MIT License.
 */
'use strict';

var config = {
  size: null, // 大小预留参数尚未支持
  id: 'store', // 在key上回自动带上id
  expires: null, // expires 过期时间
  enableCache: true, // 是否
  storage: 'local' // 使用什么缓存数据 local -> localStorage session -> sessionStorage
};

var each = function each(loopable, callback) {
  if (loopable) {
    if (loopable.length === +loopable.length && loopable.length - 1 in loopable) {
      var i;
      for (i = 0; i < loopable.length; i++) {
        if (callback.call(loopable[i], loopable[i], i) === false) break;
      }
    } else {
      for (var key in loopable) {
        if (callback.call(loopable[key], loopable[key], key) === false) break;
      }
    }
  }
};

var extend = function extend(base) {
  each(Array.prototype.slice.call(arguments, 1), function (extensionObject) {
    each(extensionObject, function (value, key) {
      if (extensionObject.hasOwnProperty(key)) {
        base[key] = value;
      }
    });
  });
  return base;
};

var storage = window.localStorage;
var local = {
  set: function set(key, value) {
    storage.setItem(key, JSON.stringify(value));
  },
  get: function get(key) {
    return JSON.parse(storage.getItem(key));
  },
  remove: function remove(key) {
    storage.removeItem(key);
  },
  each: function each(callback) {
    for (var key in storage) {
      callback(this.get(key), key);
    }
  }
};

var storage$1 = window.sessionStorage;
var session = {
  set: function set(key, value) {
    storage$1.setItem(key, JSON.stringify(value));
  },
  get: function get(key) {
    return JSON.parse(storage$1.getItem(key));
  },
  remove: function remove(key) {
    storage$1.removeItem(key);
  },
  each: function each(callback) {
    for (var key in storage$1) {
      if (callback(this.get(key), key) === false) return;
    }
  }
};

var storageMap = {};
var register = function register(name, obj) {
  storageMap[name] = obj;
};

var getStorage = function getStorage(name) {
  return storageMap[name];
};

register('local', local);
register('session', session);

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var Store = function () {
  function Store(options) {
    classCallCheck(this, Store);

    this.options = extend({}, config, options);
    this.storage = getStorage(this.options.storage);
    this.length = 0;
    this._init();
  }

  createClass(Store, [{
    key: '_init',
    value: function _init() {
      // 初始化缓存操作
    }
  }, {
    key: 'set',
    value: function set(key, value, exp) {
      var item = this._setVal(key, value, exp);
      key = this._setKey(key);
      this.storage.set(key, item);
      return this;
    }
  }, {
    key: 'get',
    value: function get(key) {
      key = this._setKey(key);
      var item = this.storage.get(key);
      return this._getVal(item);
    }
  }, {
    key: 'remove',
    value: function remove(key) {
      key = this._setKey(key);
      this.storage.remove(key);
      return this;
    }
  }, {
    key: 'forEach',
    value: function forEach(callback) {
      var _this = this;

      this.storage.each(function (item, key) {
        key = _this._getKey(key);
        if (!key) return;
        var value = _this._getVal(item);
        if (value !== undefined && value !== null) callback(value, key);
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      var _this2 = this;

      this.forEach(function (value, key) {
        _this2.remove(key);
      });
      return this;
    }
  }, {
    key: 'has',
    value: function has(key) {
      return !!this.get(key);
    }
  }, {
    key: 'getAll',
    value: function getAll() {
      var allMap = {};
      this.forEach(function (value, key) {
        allMap[key] = value;
      });
      return allMap;
    }
  }, {
    key: '_setVal',
    value: function _setVal(key, value, exp) {
      return {
        value: value,
        key: key,
        exp: exp === undefined || exp === null ? this.options.expires : exp,
        time: new Date().getTime()
      };
    }
  }, {
    key: '_getVal',
    value: function _getVal(item) {
      if (item === null) return null;
      var nowTime = new Date().getTime();
      if (item.exp !== undefined && item.exp !== null && nowTime - item.time >= item.exp) {
        this.storage.remove(item.key);
        return null;
      }
      return item.value;
    }
  }, {
    key: '_setKey',
    value: function _setKey(key) {
      return this.options.id + '_' + key;
    }
  }, {
    key: '_getKey',
    value: function _getKey(key) {
      if (key.indexOf(this.options.id + '_') !== 0) return;
      return key.substring(this.options.id.length + 1);
    }
  }]);
  return Store;
}();

var store = new Store();

store.version = '0.1.1';
store.create = function (options) {
  return new Store(options);
};
store.register = register;

module.exports = store;