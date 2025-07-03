import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useCart } from '@/hooks/useCart'
import CartItem from '@/components/molecules/CartItem'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import Empty from '@/components/ui/Empty'

const Cart = () => {
  const { cartItems, clearCart, getCartTotal, getCartCount } = useCart()

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      clearCart()
    }
  }

  const subtotal = getCartTotal()
  const tax = subtotal * 0.08 // 8% tax
  const total = subtotal + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-8">
            Your <span className="gradient-text">Cart</span>
          </h1>
          
          <Empty
            title="Your cart is empty"
            description="Add some delicious cakes to get started!"
            actionLabel="Start Shopping"
            onAction={() => window.location.href = '/shop'}
            icon="ShoppingCart"
          />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold">
            Your <span className="gradient-text">Cart</span>
          </h1>
          <Button
            onClick={handleClearCart}
            variant="ghost"
            className="text-error hover:text-error/80"
          >
            <ApperIcon name="Trash2" size={20} className="mr-2" />
            Clear Cart
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {cartItems.map((item) => (
                <motion.div
                  key={item.cakeId}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <CartItem item={item} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="font-display text-xl font-semibold mb-4">
                Order Summary
              </h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between">
                  <span>Items ({getCartCount()})</span>
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

              <div className="space-y-3">
                <Button
                  as={Link}
                  to="/checkout"
                  variant="primary"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <ApperIcon name="CreditCard" size={20} />
                  Proceed to Checkout
                </Button>
                
                <Button
                  as={Link}
                  to="/shop"
                  variant="outline"
                  size="lg"
                  className="w-full flex items-center justify-center gap-2"
                >
                  <ApperIcon name="ArrowLeft" size={20} />
                  Continue Shopping
                </Button>
              </div>

              {/* Delivery Info */}
              <div className="mt-6 p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <ApperIcon name="Truck" size={16} className="text-primary" />
                  <span className="font-medium text-sm">Free Delivery</span>
                </div>
                <p className="text-xs text-gray-600">
                  Free delivery on orders over $50 within 10 miles
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart