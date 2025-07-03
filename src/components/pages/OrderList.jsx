import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { format } from 'date-fns'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'
import Empty from '@/components/ui/Empty'
import { getAllOrders, updateOrderStatus } from '@/services/api/orderService'

const OrderList = () => {
  const [orders, setOrders] = useState([])
  const [filteredOrders, setFilteredOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  useEffect(() => {
    loadOrders()
  }, [])

  useEffect(() => {
    filterAndSortOrders()
  }, [orders, searchTerm, statusFilter, sortBy])

  const loadOrders = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await getAllOrders()
      setOrders(data)
    } catch (err) {
      setError(err.message)
      toast.error('Failed to load orders')
    } finally {
      setLoading(false)
    }
  }

  const filterAndSortOrders = () => {
    let filtered = [...orders]

    // Filter by search term
    if (searchTerm.trim()) {
      filtered = filtered.filter(order =>
        order.Id.toString().includes(searchTerm) ||
        order.customerInfo?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerInfo?.email?.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(order => order.status === statusFilter)
    }

    // Sort orders
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt) - new Date(a.createdAt)
        case 'oldest':
          return new Date(a.createdAt) - new Date(b.createdAt)
        case 'amount-high':
          return b.total - a.total
        case 'amount-low':
          return a.total - b.total
        default:
          return 0
      }
    })

    setFilteredOrders(filtered)
  }

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      setOrders(prev => prev.map(order =>
        order.Id === orderId ? { ...order, status: newStatus } : order
      ))
      toast.success(`Order status updated to ${newStatus}`)
    } catch (err) {
      toast.error('Failed to update order status')
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning/20 text-warning border-warning'
      case 'confirmed':
        return 'bg-info/20 text-info border-info'
      case 'preparing':
        return 'bg-primary/20 text-primary border-primary'
      case 'ready':
        return 'bg-success/20 text-success border-success'
      case 'completed':
        return 'bg-gray-100 text-gray-700 border-gray-300'
      case 'cancelled':
        return 'bg-error/20 text-error border-error'
      default:
        return 'bg-gray-100 text-gray-700 border-gray-300'
    }
  }

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'preparing', label: 'Preparing' },
    { value: 'ready', label: 'Ready' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ]

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'amount-high', label: 'Highest Amount' },
    { value: 'amount-low', label: 'Lowest Amount' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Your <span className="gradient-text">Orders</span>
            </h1>
            <p className="text-xl text-gray-600">Track and manage your cake orders</p>
          </div>
          <Loading className="mt-12" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              Your <span className="gradient-text">Orders</span>
            </h1>
            <p className="text-xl text-gray-600">Track and manage your cake orders</p>
          </div>
          <Error message={error} onRetry={loadOrders} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Your <span className="gradient-text">Orders</span>
          </h1>
          <p className="text-xl text-gray-600">Track and manage your cake orders</p>
        </div>

        {/* Filters and Search */}
        <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Orders
              </label>
              <Input
                type="text"
                placeholder="Search by order ID, name, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Filter by Status
              </label>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sort by
              </label>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full"
              >
                {sortOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>

        {/* Orders Grid */}
        {filteredOrders.length === 0 ? (
          <Empty
            title="No Orders Found"
            description="You haven't placed any orders yet or no orders match your filters."
            actionLabel="Browse Cakes"
            onAction={() => window.location.href = '/shop'}
            icon="ShoppingBag"
          />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredOrders.map((order, index) => (
              <motion.div
                key={order.Id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow duration-200"
              >
                {/* Order Header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-900">
                      Order #{order.Id}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {format(new Date(order.createdAt), 'MMM dd, yyyy • h:mm a')}
                    </p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </div>
                </div>

                {/* Customer Info */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <ApperIcon name="User" size={16} className="text-gray-500" />
                    <span className="font-medium text-gray-900">
                      {order.customerInfo?.name || 'N/A'}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ApperIcon name="Mail" size={14} className="text-gray-400" />
                    <span>{order.customerInfo?.email || 'N/A'}</span>
                  </div>
                  {order.customerInfo?.phone && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <ApperIcon name="Phone" size={14} className="text-gray-400" />
                      <span>{order.customerInfo.phone}</span>
                    </div>
                  )}
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <h4 className="font-medium text-gray-900 mb-2">Items:</h4>
                  <div className="space-y-2">
                    {order.items?.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">
                          {item.name} × {item.quantity}
                        </span>
                        <span className="font-medium text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Total */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="font-semibold text-lg text-gray-900">Total:</span>
                  <span className="font-bold text-xl text-primary">
                    ${order.total?.toFixed(2) || '0.00'}
                  </span>
                </div>

                {/* Status Update Actions */}
                {order.status === 'pending' && (
                  <div className="mt-4 flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusUpdate(order.Id, 'confirmed')}
                      className="flex-1"
                    >
                      <ApperIcon name="Check" size={16} className="mr-1" />
                      Confirm
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleStatusUpdate(order.Id, 'cancelled')}
                      className="flex-1 text-error border-error hover:bg-error hover:text-white"
                    >
                      <ApperIcon name="X" size={16} className="mr-1" />
                      Cancel
                    </Button>
                  </div>
                )}

                {order.status === 'confirmed' && (
                  <div className="mt-4">
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(order.Id, 'preparing')}
                      className="w-full"
                    >
                      <ApperIcon name="Clock" size={16} className="mr-1" />
                      Mark as Preparing
                    </Button>
                  </div>
                )}

                {order.status === 'preparing' && (
                  <div className="mt-4">
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(order.Id, 'ready')}
                      className="w-full bg-success hover:bg-success/90"
                    >
                      <ApperIcon name="CheckCircle" size={16} className="mr-1" />
                      Mark as Ready
                    </Button>
                  </div>
                )}

                {order.status === 'ready' && (
                  <div className="mt-4">
                    <Button
                      size="sm"
                      onClick={() => handleStatusUpdate(order.Id, 'completed')}
                      className="w-full"
                    >
                      <ApperIcon name="Package" size={16} className="mr-1" />
                      Mark as Completed
                    </Button>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Summary Stats */}
        {orders.length > 0 && (
          <div className="mt-12 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-lg text-gray-900 mb-4">Order Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">
                  {orders.length}
                </div>
                <div className="text-sm text-gray-600">Total Orders</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-warning">
                  {orders.filter(o => o.status === 'pending').length}
                </div>
                <div className="text-sm text-gray-600">Pending</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-success">
                  {orders.filter(o => o.status === 'completed').length}
                </div>
                <div className="text-sm text-gray-600">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-700">
                  ${orders.reduce((sum, order) => sum + (order.total || 0), 0).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">Total Value</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default OrderList