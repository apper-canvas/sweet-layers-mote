import ordersData from '@/services/mockData/orders.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

let orders = [...ordersData]

export const createOrder = async (orderData) => {
  await delay(500)
  
  const newOrder = {
    ...orderData,
    Id: orders.length > 0 ? Math.max(...orders.map(o => o.Id)) + 1 : 1,
    createdAt: new Date().toISOString(),
    status: 'pending'
  }
  
  orders.push(newOrder)
  return { ...newOrder }
}

export const getOrderById = async (id) => {
  await delay(200)
  const order = orders.find(o => o.Id === id)
  if (!order) {
    throw new Error('Order not found')
  }
  return { ...order }
}

export const getAllOrders = async () => {
  await delay(300)
  return [...orders]
}

export const updateOrderStatus = async (id, status) => {
  await delay(200)
  const orderIndex = orders.findIndex(o => o.Id === id)
  if (orderIndex === -1) {
    throw new Error('Order not found')
  }
  
  orders[orderIndex] = { ...orders[orderIndex], status }
  return { ...orders[orderIndex] }
}