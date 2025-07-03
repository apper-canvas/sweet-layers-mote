import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import { useCart } from '@/hooks/useCart'
import { toast } from 'react-toastify'

const ProductCard = ({ cake, className = '' }) => {
  const { addToCart } = useCart()

  const handleQuickAdd = (e) => {
    e.preventDefault()
    e.stopPropagation()
    
    addToCart({
      cakeId: cake.Id,
      quantity: 1,
      size: cake.sizes[0]?.name || 'Small',
      flavor: cake.flavors[0] || 'Vanilla',
      message: '',
      deliveryDate: '',
      price: cake.basePrice
    })
    
    toast.success(`${cake.name} added to cart!`, {
      position: "top-right",
      autoClose: 2000,
    })
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-xl shadow-lg overflow-hidden card-hover scalloped-card ${className}`}
    >
      <Link to={`/product/${cake.Id}`}>
        <div className="relative">
          <img
            src={cake.images[0]}
            alt={cake.name}
            className="w-full h-48 object-cover"
          />
          {cake.category === 'featured' && (
            <Badge
              variant="primary"
              className="absolute top-2 left-2"
            >
              Featured
            </Badge>
          )}
        </div>
        
        <div className="p-4">
          <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">
            {cake.name}
          </h3>
          
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {cake.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold text-primary gradient-text">
                ${cake.basePrice}
              </span>
              <span className="text-xs text-gray-500">starting from</span>
            </div>
            
            <Button
              onClick={handleQuickAdd}
              variant="primary"
              size="sm"
              className="flex items-center gap-2"
            >
              <ApperIcon name="Plus" size={16} />
              Add
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard