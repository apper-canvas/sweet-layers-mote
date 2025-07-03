import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import React, { useState } from "react";
import { useCart } from "@/hooks/useCart";
import ApperIcon from "@/components/ApperIcon";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";

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

const [imageError, setImageError] = useState(false)
  const [imageLoading, setImageLoading] = useState(true)

  const handleImageError = () => {
    setImageError(true)
    setImageLoading(false)
  }

  const handleImageLoad = () => {
    setImageLoading(false)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className={`bg-white rounded-xl shadow-lg overflow-hidden card-hover scalloped-card ${className}`}
    >
      <Link to={`/product/${cake.Id}`}>
        <div className="relative">
          {imageLoading && (
            <div className="w-full h-48 bg-gray-200 shimmer flex items-center justify-center">
              <ApperIcon name="Image" size={24} className="text-gray-400" />
            </div>
          )}
          {!imageError ? (
            <img
              src={cake.images[0]}
              alt={cake.name}
              className={`w-full h-48 object-cover ${imageLoading ? 'hidden' : 'block'}`}
              onError={handleImageError}
              onLoad={handleImageLoad}
            />
          ) : (
            <div className="w-full h-48 bg-gradient-to-br from-secondary/50 to-primary/20 flex flex-col items-center justify-center">
              <ApperIcon name="ImageOff" size={32} className="text-gray-400 mb-2" />
              <span className="text-sm text-gray-500 font-medium">{cake.name}</span>
              <span className="text-xs text-gray-400">Image unavailable</span>
            </div>
          )}
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
          
          {/* Allergen Badges */}
          {cake.allergens && cake.allergens.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {cake.allergens.map((allergen) => (
                <Badge
                  key={allergen}
                  variant="warning"
                  className="text-xs capitalize"
                >
                  {allergen}
                </Badge>
              ))}
            </div>
          )}
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