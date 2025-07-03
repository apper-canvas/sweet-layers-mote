import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useCart } from '@/hooks/useCart'
import { createOrder } from '@/services/api/orderService'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { toast } from 'react-toastify'

const Checkout = () => {
  const navigate = useNavigate()
  const { cartItems, getCartTotal, clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Customer Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Delivery Info
    deliveryType: 'delivery',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    deliveryInstructions: '',
    
    // Payment Info
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const orderData = {
        items: cartItems,
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone
        },
        delivery: {
          type: formData.deliveryType,
          address: formData.deliveryType === 'delivery' ? {
            street: formData.address,
            city: formData.city,
            state: formData.state,
            zipCode: formData.zipCode
          } : null,
          instructions: formData.deliveryInstructions
        },
        total: getCartTotal() * 1.08, // Including tax
        status: 'pending'
      }

      const order = await createOrder(orderData)
      
      // Clear cart and redirect to success page
      clearCart()
      toast.success('Order placed successfully!', {
        position: "top-right",
        autoClose: 3000,
      })
      
      // In a real app, you'd redirect to an order confirmation page
      navigate('/', { replace: true })
      
    } catch (error) {
      console.error('Error placing order:', error)
      toast.error('Failed to place order. Please try again.', {
        position: "top-right",
        autoClose: 3000,
      })
    } finally {
      setLoading(false)
    }
  }

  const subtotal = getCartTotal()
  const tax = subtotal * 0.08
  const total = subtotal + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="font-display text-3xl font-bold mb-4">
              Your cart is empty
            </h1>
            <p className="text-gray-600 mb-8">
              Add some items to your cart before checking out.
            </p>
            <Button
              onClick={() => navigate('/shop')}
              variant="primary"
              size="lg"
              className="flex items-center gap-2 mx-auto"
            >
              <ApperIcon name="ArrowLeft" size={20} />
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="font-display text-3xl sm:text-4xl font-bold mb-8">
          <span className="gradient-text">Checkout</span>
        </h1>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Fields */}
            <div className="lg:col-span-2 space-y-8">
              {/* Customer Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="font-display text-xl font-semibold mb-4">
                  Customer Information
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    required
                  />
                  <Input
                    label="Last Name"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    required
                  />
                  <Input
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    required
                  />
                  <Input
                    label="Phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    required
                  />
                </div>
              </motion.div>

              {/* Delivery Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="font-display text-xl font-semibold mb-4">
                  Delivery Information
                </h2>
                
                <div className="space-y-4">
                  <Select
                    label="Delivery Option"
                    value={formData.deliveryType}
                    onChange={(e) => handleInputChange('deliveryType', e.target.value)}
                    required
                  >
                    <option value="delivery">Delivery</option>
                    <option value="pickup">Pickup</option>
                  </Select>

                  {formData.deliveryType === 'delivery' && (
                    <div className="space-y-4">
                      <Input
                        label="Address"
                        value={formData.address}
                        onChange={(e) => handleInputChange('address', e.target.value)}
                        required
                      />
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <Input
                          label="City"
                          value={formData.city}
                          onChange={(e) => handleInputChange('city', e.target.value)}
                          required
                        />
                        <Input
                          label="State"
                          value={formData.state}
                          onChange={(e) => handleInputChange('state', e.target.value)}
                          required
                        />
                        <Input
                          label="ZIP Code"
                          value={formData.zipCode}
                          onChange={(e) => handleInputChange('zipCode', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  )}

                  <Input
                    label="Special Instructions"
                    value={formData.deliveryInstructions}
                    onChange={(e) => handleInputChange('deliveryInstructions', e.target.value)}
                    placeholder="Any special delivery instructions..."
                  />
                </div>
              </motion.div>

              {/* Payment Information */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <h2 className="font-display text-xl font-semibold mb-4">
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <Input
                    label="Card Number"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Expiry Date"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      placeholder="MM/YY"
                      required
                    />
                    <Input
                      label="CVV"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      placeholder="123"
                      required
                    />
                  </div>
                  <Input
                    label="Name on Card"
                    value={formData.nameOnCard}
                    onChange={(e) => handleInputChange('nameOnCard', e.target.value)}
                    required
                  />
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white rounded-xl shadow-lg p-6 sticky top-24"
              >
                <h2 className="font-display text-xl font-semibold mb-4">
                  Order Summary
                </h2>
                
                {/* Order Items */}
                <div className="space-y-3 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.cakeId} className="flex justify-between text-sm">
                      <div className="flex-1">
                        <p className="font-medium">Cake x{item.quantity}</p>
                        <p className="text-gray-500">{item.size}, {item.flavor}</p>
                      </div>
                      <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-3">
                    <div className="flex justify-between font-semibold text-lg">
                      <span>Total</span>
                      <span className="gradient-text">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={loading}
                  className="w-full flex items-center justify-center gap-2"
                >
                  <ApperIcon name="CreditCard" size={20} />
                  Place Order
                </Button>

                {/* Security Info */}
                <div className="mt-4 p-3 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                  <div className="flex items-center gap-2 text-sm">
                    <ApperIcon name="Shield" size={16} className="text-primary" />
                    <span className="font-medium">Secure Payment</span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Your payment information is encrypted and secure
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Checkout