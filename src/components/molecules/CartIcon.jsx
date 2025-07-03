import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import { useCart } from '@/hooks/useCart'

const CartIcon = ({ onClick }) => {
  const { cartItems } = useCart()
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <motion.button
      onClick={onClick}
      className="relative p-2 text-gray-700 hover:text-primary transition-colors duration-200"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ApperIcon name="ShoppingCart" size={24} />
      {itemCount > 0 && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium"
        >
          {itemCount > 99 ? '99+' : itemCount}
        </motion.span>
      )}
    </motion.button>
  )
}

export default CartIcon