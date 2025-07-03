import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import { useCart } from '@/hooks/useCart'
import { getCakeById } from '@/services/api/cakeService'
import { useEffect, useState } from 'react'

const CartItem = ({ item }) => {
  const { updateCartItem, removeFromCart } = useCart()
  const [cake, setCake] = useState(null)

  useEffect(() => {
    const loadCake = async () => {
      try {
        const cakeData = await getCakeById(item.cakeId)
        setCake(cakeData)
      } catch (error) {
        console.error('Error loading cake:', error)
      }
    }
    loadCake()
  }, [item.cakeId])

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return
    updateCartItem(item.cakeId, { ...item, quantity: newQuantity })
  }

  const handleRemove = () => {
    removeFromCart(item.cakeId)
  }

  if (!cake) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg shadow-md p-4 border border-gray-100"
    >
      <div className="flex items-center gap-4">
        <img
          src={cake.images[0]}
          alt={cake.name}
          className="w-16 h-16 object-cover rounded-lg"
        />
        
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{cake.name}</h4>
          <div className="text-sm text-gray-600 space-y-1">
            <p>Size: {item.size}</p>
            <p>Flavor: {item.flavor}</p>
            {item.message && <p>Message: "{item.message}"</p>}
            {item.deliveryDate && <p>Delivery: {item.deliveryDate}</p>}
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0"
          >
            <ApperIcon name="Minus" size={16} />
          </Button>
          
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          
          <Button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0"
          >
            <ApperIcon name="Plus" size={16} />
          </Button>
        </div>
        
        <div className="text-right">
          <p className="font-bold text-primary">${item.price * item.quantity}</p>
          <Button
            onClick={handleRemove}
            variant="ghost"
            size="sm"
            className="text-error hover:text-error/80"
          >
            <ApperIcon name="X" size={16} />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

export default CartItem