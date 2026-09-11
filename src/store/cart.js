import Vue from 'vue'

// 简单全局购物车状态：比引入 Vuex 轻，页面里用 computed 取用
// Vue.observable 让普通对象变成响应式，改动后引用它的页面会自动刷新
export const cartState = Vue.observable({
  items: []
})

export function addToCart(dish) {
  const hit = cartState.items.find((item) => item.id === dish.id)
  if (hit) {
    hit.count += 1
    return
  }
  cartState.items.push({ id: dish.id, name: dish.name, price: dish.price, count: 1 })
}

// 直接把数量设为指定值，数量减到 0 就把这道菜从购物车移除
export function setCartCount(id, count) {
  const index = cartState.items.findIndex((item) => item.id === id)
  if (index === -1) return
  if (count <= 0) {
    cartState.items.splice(index, 1)
    return
  }
  cartState.items[index].count = count
}

export function clearCart() {
  cartState.items.splice(0, cartState.items.length)
}

export function getCartTotalCount() {
  return cartState.items.reduce((sum, item) => sum + item.count, 0)
}

export function getCartTotalPrice() {
  return cartState.items.reduce((sum, item) => sum + item.price * item.count, 0)
}
