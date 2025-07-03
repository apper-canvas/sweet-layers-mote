import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getAllCakes } from '@/services/api/cakeService'
import ProductCard from '@/components/molecules/ProductCard'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'
import Loading from '@/components/ui/Loading'
import Error from '@/components/ui/Error'

const FeaturedCakes = () => {
  const [cakes, setCakes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    loadFeaturedCakes()
  }, [])

  const loadFeaturedCakes = async () => {
    try {
      setLoading(true)
      setError('')
      const allCakes = await getAllCakes()
      // Get featured cakes or first 6 cakes
      const featured = allCakes.filter(cake => cake.category === 'featured').slice(0, 6)
      setCakes(featured.length > 0 ? featured : allCakes.slice(0, 6))
    } catch (err) {
      setError('Failed to load featured cakes')
      console.error('Error loading featured cakes:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="bg-gray-200 h-8 rounded shimmer w-64 mx-auto mb-4"></div>
            <div className="bg-gray-200 h-4 rounded shimmer w-96 mx-auto"></div>
          </div>
          <Loading />
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Error message={error} onRetry={loadFeaturedCakes} />
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            <span className="gradient-text">Featured</span> Creations
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover our most popular and exquisite cake designs, 
            perfect for any special occasion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {cakes.map((cake, index) => (
            <motion.div
              key={cake.Id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProductCard cake={cake} />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            as={Link}
            to="/shop"
            variant="primary"
            size="lg"
            className="flex items-center gap-2 mx-auto"
          >
            <ApperIcon name="ArrowRight" size={20} />
            View All Cakes
          </Button>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedCakes