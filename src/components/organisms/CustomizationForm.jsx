import { useState } from 'react'
import { motion } from 'framer-motion'
import { format, addDays } from 'date-fns'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import { useCart } from '@/hooks/useCart'
import { toast } from 'react-toastify'

const CustomizationForm = ({ cake, onClose }) => {
  const { addToCart } = useCart()
  const [formData, setFormData] = useState({
    size: cake.sizes[0]?.name || 'Small',
    flavor: cake.flavors[0] || 'Vanilla',
    message: '',
    deliveryDate: format(addDays(new Date(), 2), 'yyyy-MM-dd'),
    quantity: 1
  })

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const calculatePrice = () => {
    const selectedSize = cake.sizes.find(s => s.name === formData.size)
    const sizeMultiplier = selectedSize?.multiplier || 1
    return Math.round(cake.basePrice * sizeMultiplier * formData.quantity)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    const cartItem = {
      cakeId: cake.Id,
      quantity: formData.quantity,
      size: formData.size,
      flavor: formData.flavor,
      message: formData.message,
      deliveryDate: formData.deliveryDate,
      price: calculatePrice()
    }

    addToCart(cartItem)
    
    toast.success(`${cake.name} added to cart!`, {
      position: "top-right",
      autoClose: 3000,
    })
    
    onClose?.()
  }

  const minDate = format(addDays(new Date(), 2), 'yyyy-MM-dd')
  const maxDate = format(addDays(new Date(), 30), 'yyyy-MM-dd')

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-2xl font-bold text-gray-900">
          Customize Your Cake
        </h3>
        {onClose && (
          <Button
            onClick={onClose}
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-gray-600"
          >
            <ApperIcon name="X" size={20} />
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Size Selection */}
        <Select
          label="Size"
          value={formData.size}
          onChange={(e) => handleInputChange('size', e.target.value)}
          required
        >
          {cake.sizes.map(size => (
            <option key={size.name} value={size.name}>
              {size.name} - {size.serves} servings
            </option>
          ))}
        </Select>

        {/* Flavor Selection */}
        <Select
          label="Flavor"
          value={formData.flavor}
          onChange={(e) => handleInputChange('flavor', e.target.value)}
          required
        >
          {cake.flavors.map(flavor => (
            <option key={flavor} value={flavor}>
              {flavor}
            </option>
          ))}
        </Select>

        {/* Custom Message */}
        <Input
          label="Custom Message (Optional)"
          value={formData.message}
          onChange={(e) => handleInputChange('message', e.target.value)}
          placeholder="Happy Birthday!, Congratulations!, etc."
          maxLength={50}
        />

        {/* Delivery Date */}
        <Input
          label="Delivery Date"
          type="date"
          value={formData.deliveryDate}
          onChange={(e) => handleInputChange('deliveryDate', e.target.value)}
          min={minDate}
          max={maxDate}
          required
        />

        {/* Quantity */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <div className="flex items-center gap-3">
            <Button
              type="button"
              onClick={() => handleInputChange('quantity', Math.max(1, formData.quantity - 1))}
              variant="outline"
              size="sm"
              className="w-10 h-10 p-0"
            >
              <ApperIcon name="Minus" size={16} />
            </Button>
            <span className="w-12 text-center font-medium text-lg">
              {formData.quantity}
            </span>
            <Button
              type="button"
              onClick={() => handleInputChange('quantity', formData.quantity + 1)}
              variant="outline"
              size="sm"
              className="w-10 h-10 p-0"
            >
              <ApperIcon name="Plus" size={16} />
            </Button>
          </div>
        </div>

        {/* Price Display */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-lg p-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-700">Total Price:</span>
            <span className="font-display text-2xl font-bold gradient-text">
              ${calculatePrice()}
            </span>
          </div>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full flex items-center justify-center gap-2"
        >
          <ApperIcon name="ShoppingCart" size={20} />
          Add to Cart
        </Button>
      </form>
    </motion.div>
  )
}

export default CustomizationForm