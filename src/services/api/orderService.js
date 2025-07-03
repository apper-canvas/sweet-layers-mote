// Initialize ApperClient with Project ID and Public Key
const getApperClient = () => {
  const { ApperClient } = window.ApperSDK
  return new ApperClient({
    apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
    apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
  })
}

export const createOrder = async (orderData) => {
  try {
    const params = {
      records: [
        {
          Name: `Order ${Date.now()}`,
          items: JSON.stringify(orderData.items),
          customer_info: JSON.stringify(orderData.customer),
          delivery: JSON.stringify(orderData.delivery),
          total: orderData.total,
          status: orderData.status || 'pending',
          created_at: new Date().toISOString()
        }
      ]
    }
    
    const apperClient = getApperClient()
    const response = await apperClient.createRecord('order', params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }
    
    if (response.results) {
      const successfulOrders = response.results.filter(result => result.success)
      const failedOrders = response.results.filter(result => !result.success)
      
      if (failedOrders.length > 0) {
        console.error(`Failed to create ${failedOrders.length} orders:${JSON.stringify(failedOrders)}`)
        
        failedOrders.forEach(record => {
          record.errors?.forEach(error => {
            console.error(`${error.fieldLabel}: ${error.message}`)
          })
        })
      }
      
      if (successfulOrders.length > 0) {
        const order = successfulOrders[0].data
        return {
          Id: order.Id,
          items: order.items ? JSON.parse(order.items) : [],
          customerInfo: order.customer_info ? JSON.parse(order.customer_info) : {},
          delivery: order.delivery ? JSON.parse(order.delivery) : {},
          total: order.total || 0,
          status: order.status || 'pending',
          createdAt: order.created_at || order.CreatedOn || new Date().toISOString()
        }
      }
    }
    
    throw new Error('Failed to create order')
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error creating order:", error?.response?.data?.message)
    } else {
      console.error("Error creating order:", error.message)
    }
    throw error
  }
}

export const getOrderById = async (id) => {
  try {
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "items" } },
        { field: { Name: "customer_info" } },
        { field: { Name: "delivery" } },
        { field: { Name: "total" } },
        { field: { Name: "status" } },
        { field: { Name: "created_at" } },
        { field: { Name: "CreatedOn" } }
      ]
    }
    
    const apperClient = getApperClient()
    const response = await apperClient.getRecordById('order', id, params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }
    
    if (!response.data) {
      throw new Error('Order not found')
    }
    
    const order = response.data
    return {
      Id: order.Id,
      items: order.items ? JSON.parse(order.items) : [],
      customerInfo: order.customer_info ? JSON.parse(order.customer_info) : {},
      delivery: order.delivery ? JSON.parse(order.delivery) : {},
      total: order.total || 0,
      status: order.status || 'pending',
      createdAt: order.created_at || order.CreatedOn || new Date().toISOString()
    }
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error(`Error fetching order with ID ${id}:`, error?.response?.data?.message)
    } else {
      console.error(`Error fetching order with ID ${id}:`, error.message)
    }
    throw error
  }
}

export const getAllOrders = async () => {
  try {
    const params = {
      fields: [
        { field: { Name: "Name" } },
        { field: { Name: "items" } },
        { field: { Name: "customer_info" } },
        { field: { Name: "delivery" } },
        { field: { Name: "total" } },
        { field: { Name: "status" } },
        { field: { Name: "created_at" } },
        { field: { Name: "CreatedOn" } }
      ],
      orderBy: [
        {
          fieldName: "Id",
          sorttype: "DESC"
        }
      ]
    }
    
    const apperClient = getApperClient()
    const response = await apperClient.fetchRecords('order', params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }
    
    return response.data.map(order => ({
      Id: order.Id,
      items: order.items ? JSON.parse(order.items) : [],
      customerInfo: order.customer_info ? JSON.parse(order.customer_info) : {},
      delivery: order.delivery ? JSON.parse(order.delivery) : {},
      total: order.total || 0,
      status: order.status || 'pending',
      createdAt: order.created_at || order.CreatedOn || new Date().toISOString()
    }))
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error fetching orders:", error?.response?.data?.message)
    } else {
      console.error("Error fetching orders:", error.message)
    }
    return []
  }
}

export const updateOrderStatus = async (id, status) => {
  try {
    const params = {
      records: [
        {
          Id: id,
          status: status
        }
      ]
    }
    
    const apperClient = getApperClient()
    const response = await apperClient.updateRecord('order', params)
    
    if (!response.success) {
      console.error(response.message)
      throw new Error(response.message)
    }
    
    if (response.results) {
      const successfulUpdates = response.results.filter(result => result.success)
      const failedUpdates = response.results.filter(result => !result.success)
      
      if (failedUpdates.length > 0) {
        console.error(`Failed to update ${failedUpdates.length} orders:${JSON.stringify(failedUpdates)}`)
        
        failedUpdates.forEach(record => {
          record.errors?.forEach(error => {
            console.error(`${error.fieldLabel}: ${error.message}`)
          })
        })
      }
      
      if (successfulUpdates.length > 0) {
        const order = successfulUpdates[0].data
        return {
          Id: order.Id,
          items: order.items ? JSON.parse(order.items) : [],
          customerInfo: order.customer_info ? JSON.parse(order.customer_info) : {},
          delivery: order.delivery ? JSON.parse(order.delivery) : {},
          total: order.total || 0,
          status: order.status || 'pending',
          createdAt: order.created_at || order.CreatedOn || new Date().toISOString()
        }
      }
    }
    
    throw new Error('Failed to update order status')
  } catch (error) {
    if (error?.response?.data?.message) {
      console.error("Error updating order status:", error?.response?.data?.message)
    } else {
      console.error("Error updating order status:", error.message)
    }
    throw error
  }
}