import store from '../../../src'

describe('test store.js', () => {
  it('test store.set / store.get', () => {
    const value = 'this is test value'
    const key = 'test1'
    store.set(key, value)
    const getVal = store.get(key)
    expect(getVal).to.equal(value)
  })

  it('test store.remove', () => {
    const value = 'this is test value'
    const key = 'test1'
    store.set(key, value)
    store.remove(key)
    const getVal = store.get(key)
    expect(getVal).to.be.a('null')
  })

  it('test set expires', () => {
    const value = 'this is test value'
    const key = 'test1'
    const expirse = 0
    store.set(key, value, expirse)
    const getVal = store.get(key)
    expect(getVal).to.be.a('null')
  })

  it('test forEach', () => {
    store.set('test1', 'this is test1')
    store.set('test2', 'this is test2')
    store.set('test3', 'this is test3')
    store.set('test4', 'this is test4')
    store.forEach(function (value, key) {
      expect(['test1', 'test2', 'test3', 'test4']).to.include(key)
    })
  })

  it('test clear', () => {
    store.set('test1', 'this is test1')
    store.set('test2', 'this is test2')
    store.clear()
    expect(store.get('test1')).to.be.a('null')
    expect(store.get('test2')).to.be.a('null')
  })

  it('test getAll', () => {
    store.set('test1', 'this is test1')
    store.set('test2', 'this is test2')
    store.set('test3', 'this is test3')
    store.set('test4', 'this is test4')
    const map = store.getAll()
    expect(map.test1).to.equal('this is test1')
    expect(map.test2).to.equal('this is test2')
    expect(map.test3).to.equal('this is test3')
    expect(map.test4).to.equal('this is test4')
  })

  it('test create', () => {
    const newstore = store.create({
      id: 'newstore'
    })
    store.set('test1', '哈哈哈哈')
    expect(newstore.get('test1')).to.be.a('null')
  })
})
