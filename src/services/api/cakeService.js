// Initialize ApperClient with Project ID and Public Key
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  })
}

export const getAllCakes = async () => {
  try {
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "category" } },
        { field: { Name: "base_price" } },
        { field: { Name: "images" } },
        { field: { Name: "description" } },
        { field: { Name: "flavors" } },
        { field: { Name: "allergens" } },
        { field: { Name: "sizes" } },
        { field: { Name: "Tags" } },
        { field: { Name: "Owner" } }
      ],
      orderBy: [
        {
          fieldName: "Id",
          sorttype: "ASC"
        }
      ]
    }
    
    const apperClient = getApperClient()
    const response = await apperClient.fetchRecords('cake', params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }
    
    // Transform database response to match existing component expectations
    return response.data.map(cake => ({
      Id: cake.Id,
      name: cake.Name || '',
      category: cake.category || '',
      basePrice: cake.base_price || 0,
      images: cake.images ? cake.images.split(',').map(img => img.trim()) : [],
      description: cake.description || '',
      flavors: cake.flavors ? cake.flavors.split(',').map(flavor => flavor.trim()) : [],
      allergens: cake.allergens ? cake.allergens.split(',').map(allergen => allergen.trim()) : [],
      sizes: cake.sizes ? JSON.parse(cake.sizes) : []
    }))
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error fetching cakes:", error?.response?.data?.message)
    } else {
      console.error("Error fetching cakes:", error.message)
    }
    throw error
  }
}

export const getCakeById = async (id) => {
  try {
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "category" } },
        { field: { Name: "base_price" } },
        { field: { Name: "images" } },
        { field: { Name: "description" } },
        { field: { Name: "flavors" } },
        { field: { Name: "allergens" } },
        { field: { Name: "sizes" } },
        { field: { Name: "Tags" } },
        { field: { Name: "Owner" } }
      ]
    }
    
    const apperClient = getApperClient()
    const response = await apperClient.getRecordById('cake', id, params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }
    
    if (!response.data) {
      throw new Error('Cake not found')
    }
    
    // Transform database response to match existing component expectations
    const cake = response.data
    return {
      Id: cake.Id,
      name: cake.Name || '',
      category: cake.category || '',
      basePrice: cake.base_price || 0,
      images: cake.images ? cake.images.split(',').map(img => img.trim()) : [],
      description: cake.description || '',
      flavors: cake.flavors ? cake.flavors.split(',').map(flavor => flavor.trim()) : [],
      allergens: cake.allergens ? cake.allergens.split(',').map(allergen => allergen.trim()) : [],
      sizes: cake.sizes ? JSON.parse(cake.sizes) : []
    }
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error(`Error fetching cake with ID ${id}:`, error?.response?.data?.message)
    } else {
      console.error(`Error fetching cake with ID ${id}:`, error.message)
    }
    throw error
  }
}

export const getCakesByCategory = async (category) => {
  try {
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "category" } },
        { field: { Name: "base_price" } },
        { field: { Name: "images" } },
        { field: { Name: "description" } },
        { field: { Name: "flavors" } },
        { field: { Name: "allergens" } },
        { field: { Name: "sizes" } }
      ],
      where: [
        {
          fieldName: "category",
          Operator: "EqualTo",
          Values: [category]
        }
      ]
    }
    
    const apperClient = getApperClient()
    const response = await apperClient.fetchRecords('cake', params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }
    
    return response.data.map(cake => ({
      Id: cake.Id,
      name: cake.Name || '',
      category: cake.category || '',
      basePrice: cake.base_price || 0,
      images: cake.images ? cake.images.split(',').map(img => img.trim()) : [],
      description: cake.description || '',
      flavors: cake.flavors ? cake.flavors.split(',').map(flavor => flavor.trim()) : [],
      allergens: cake.allergens ? cake.allergens.split(',').map(allergen => allergen.trim()) : [],
      sizes: cake.sizes ? JSON.parse(cake.sizes) : []
    }))
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error fetching cakes by category:", error?.response?.data?.message)
    } else {
      console.error("Error fetching cakes by category:", error.message)
    }
    throw error
  }
}

export const getFeaturedCakes = async () => {
  return getCakesByCategory('featured')
}