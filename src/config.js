export default {
  size: null,           // 大小预留参数尚未支持
  id: 'store',          // 在key上回自动带上id
  expires: null,        // expires 过期时间
  enableCache: true,    // 是否
  storage: 'local'      // 使用什么缓存数据 local -> localStorage session -> sessionStorage
}
