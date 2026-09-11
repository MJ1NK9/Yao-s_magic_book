import { reactive, computed } from 'vue'

// 简单全局购物车状态，组件里用 useCart() 取用
const state = reactive({
  items: []
})

const items = computed(() => state.items)
const totalCount = computed(() => state.items.reduce((sum, item) => sum + item.count, 0))
const totalPrice = computed(() =>
  state.items.reduce((sum, item) => sum + item.price * item.count, 0)
)

function add(dish) {
  const hit = state.items.find((item) => item.id === dish.id)
  if (hit) {
    hit.count += 1
    return
  }
  state.items.push({ id: dish.id, name: dish.name, price: dish.price, count: 1 })
}

function minus(id) {
  const index = state.items.findIndex((item) => item.id === id)
  if (index === -1) return
  if (state.items[index].count > 1) {
    state.items[index].count -= 1
  } else {
    state.items.splice(index, 1)
  }
}

function clear() {
  state.items.splice(0, state.items.length)
}

export function useCart() {
  return { items, totalCount, totalPrice, add, minus, clear }
}