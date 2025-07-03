import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { getCakeById } from '@/services/api/cakeService'
import CustomizationForm from '@/components/organisms/CustomizationForm'
import Button from '@/components/atoms/Button'
import Badge from '@/components/atoms/Badge'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'

const ProductDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [cake, setCake] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [selectedImage, setSelectedImage] = useState(0)
  const [showCustomizer, setShowCustomizer] = useState(false)

  useEffect(() => {
    loadCake()
  }, [id])

  const loadCake = async () => {
    try {
      setLoading(true)
      setError('')
      const cakeData = await getCakeById(parseInt(id))
      setCake(cakeData)
    } catch (err) {
      setError('Failed to load cake details')
      console.error('Error loading cake:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleBackClick = () => {
    navigate(-1)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-4">
              <div className="bg-gray-200 aspect-square rounded-xl shimmer"></div>
              <div className="flex gap-2">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="bg-gray-200 w-20 h-20 rounded-lg shimmer"></div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              <div className="bg-gray-200 h-8 rounded shimmer"></div>
              <div className="bg-gray-200 h-6 rounded shimmer w-1/3"></div>
              <div className="bg-gray-200 h-4 rounded shimmer"></div>
              <div className="bg-gray-200 h-4 rounded shimmer w-2/3"></div>
              <div className="bg-gray-200 h-12 rounded shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error message={error} onRetry={loadCake} />
        </div>
      </div>
    )
  }

  if (!cake) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Error message="Cake not found" />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <Button
          onClick={handleBackClick}
          variant="ghost"
          className="flex items-center gap-2 mb-6"
        >
          <ApperIcon name="ArrowLeft" size={20} />
          Back to Shop
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="aspect-square rounded-xl overflow-hidden shadow-lg"
            >
              <img
                src={cake.images[selectedImage]}
                alt={cake.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {cake.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {cake.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                      index === selectedImage
                        ? 'border-primary shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${cake.name} ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="primary" className="capitalize">
                  {cake.category}
                </Badge>
              </div>
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {cake.name}
              </h1>
              <div className="flex items-center gap-4 mb-4">
                <span className="font-display text-3xl font-bold gradient-text">
                  ${cake.basePrice}
                </span>
                <span className="text-gray-500">starting from</span>
              </div>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-lg text-gray-600 leading-relaxed">
                {cake.description}
              </p>
            </div>

            {/* Available Flavors */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Available Flavors</h3>
              <div className="flex flex-wrap gap-2">
                {cake.flavors.map((flavor) => (
                  <Badge key={flavor} variant="secondary" className="capitalize">
                    {flavor}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Size Options */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Size Options</h3>
              <div className="space-y-2">
                {cake.sizes.map((size) => (
                  <div key={size.name} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <span className="font-medium">{size.name}</span>
                      <span className="text-gray-500 ml-2">({size.serves} servings)</span>
                    </div>
                    <span className="font-semibold text-primary">
                      ${Math.round(cake.basePrice * size.multiplier)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() => setShowCustomizer(true)}
                variant="primary"
                size="lg"
                className="flex items-center justify-center gap-2 flex-1"
              >
                <ApperIcon name="ShoppingCart" size={20} />
                Customize & Order
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="flex items-center justify-center gap-2"
              >
                <ApperIcon name="Heart" size={20} />
                Save for Later
              </Button>
            </div>
          </div>
        </div>

        {/* Customization Modal */}
        <AnimatePresence>
          {showCustomizer && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
              onClick={() => setShowCustomizer(false)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="w-full max-w-md"
              >
                <CustomizationForm
                  cake={cake}
                  onClose={() => setShowCustomizer(false)}
                />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default ProductDetail