import { reactive, computed } from 'vue'

// 订单只存在内存里，刷新即清空；后续接后端时改成请求接口
const state = reactive({
  list: []
})

function pad(n) {
  return n < 10 ? '0' + n : String(n)
}

function formatTime(date) {
  return (
    date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    ' ' + pad(date.getHours()) +
    ':' + pad(date.getMinutes())
  )
}

function create(items, totalPrice) {
  state.list.unshift({
    id: 'NO' + Date.now(),
    items: items.map((item) => ({ id: item.id, name: item.name, price: item.price, count: item.count })),
    totalPrice,
    createdAt: formatTime(new Date())
  })
}

export function useOrders() {
  return { orders: computed(() => state.list), create }
}