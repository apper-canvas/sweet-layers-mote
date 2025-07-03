import cakesData from '@/services/mockData/cakes.json'

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

export const getAllCakes = async () => {
  await delay(300)
  return [...cakesData]
}

export const getCakeById = async (id) => {
  await delay(200)
  const cake = cakesData.find(c => c.Id === id)
  if (!cake) {
    throw new Error('Cake not found')
  }
  return { ...cake }
}

export const getCakesByCategory = async (category) => {
  await delay(250)
  return cakesData.filter(cake => cake.category === category)
}

export const searchCakes = async (query) => {
  await delay(200)
  const searchTerm = query.toLowerCase()
  return cakesData.filter(cake =>
    cake.name.toLowerCase().includes(searchTerm) ||
    cake.description.toLowerCase().includes(searchTerm) ||
    cake.flavors.some(flavor => flavor.toLowerCase().includes(searchTerm))
  )
}

export const getFeaturedCakes = async () => {
  await delay(300)
  return cakesData.filter(cake => cake.category === 'featured')
}