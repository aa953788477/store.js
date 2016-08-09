# si-store

一个基于 Web Storage 的存储库，提供简单的api操作，可以设置缓存时间

## 安装

用 npm 安装

```shell
npm install si-store --save
```

直接在 `script` 标签中导入，先要在github 上下载代码,然后：

```html
<script src="si-store.js" charset="utf-8"></script>
```

## 开始使用

```javascript
import store from 'si-store'  // ES6 可以这么写

var store = require('si-store') // commonJs 规范写法

// 如果是script 标签引入的可以不用管，直接使用store对象即可

store.set('test1', 'this is value')  // 存储字符串
store.set('test2', {
  key: 'this is test'
})                                   // 也可以存储对象

store.get('test1')                   //  获取存储的值 this is value

store.remove('test2')                // 删除key为 test2的存储
```

设置过期时间

```javascript
store.set('test', 'test value',  30)   // 设置过期时间在30ms之后

setTimeout(function () {
  store.get('test')                    // null
}, 31)
```

新建一个新的缓存实例

```javascript
var newStore = store.create({
  id: 'iStore',            // id 必需 每一个存储实例的唯一值
  expires: 10 * 1000 * 60, // 默认缓存时间，以毫秒为单位，设为null 不限时间
  storage: 'local'         // 用那种储存方式， local => localStorage， session => sessionStorage 目前只支持者两种
})
```

遍历和清空存储

```javascript
store.clear()           //清空当前实例下存储的所有数据
store.forEach(function (value, key) {
    console.log(key, value)
}) // 遍历当前实例下存储的所有的数据

let allObj = store.getAll()    //获取所有存储的数据 返回一个 Object
```

## API

### set([key, value, expires])

存储数据

* key  存储数据的key，获取时根据key获取
* value 储存的数据, 不限制类型
* expires 过期时间，不设置默认是永不过期

### get([key])

根据 key 获取存储的数据

### remove([key])

删除缓存的数据

### has([key])

判断某一个key 在当前实例下是否存在

### getAll()

获取所有的缓存的数据， 返回一个 Object 对象, 例: {key1: '', key2: ''}

### clear()

清除当前实例下存储的所有的数据

### forEach([callback])

遍历当前实例下存储的所有数据

* callback function 遍历的回调函数 例：store.forEach(function (value, key) { // ... })

### create([options])

创建一个新的存储实例, 只有全局 store才具有的方法。

options 是一个 Object, 支持以下参数

* id  必须，当前实例的id,唯一值不可重复
* expires 默认过期时间
* storage 存储方式 'local'/'session'  默认是 'local'

## 下一步要做的

 * 支持存储数量的限制
 * 支持多个key的get
 * 支持异步的storage 例如 indexDB 这些的支持

## License

 [MIT](http://opensource.org/licenses/MIT)

 Copyright (c) 2016 myron
