import { motion } from 'framer-motion'
import ProductCard from '@/components/molecules/ProductCard'
import Empty from '@/components/ui/Empty'

const ProductGrid = ({ cakes, loading, error, onRetry }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gray-200 h-48 shimmer"></div>
            <div className="p-4 space-y-3">
              <div className="bg-gray-200 h-4 rounded shimmer"></div>
              <div className="bg-gray-200 h-3 rounded shimmer w-3/4"></div>
              <div className="bg-gray-200 h-3 rounded shimmer w-1/2"></div>
              <div className="flex justify-between items-center">
                <div className="bg-gray-200 h-6 rounded shimmer w-16"></div>
                <div className="bg-gray-200 h-8 rounded shimmer w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="col-span-full">
        <Empty
          title="Error loading cakes"
          description={error}
          actionLabel="Try Again"
          onAction={onRetry}
          icon="AlertCircle"
        />
      </div>
    )
  }

  if (cakes.length === 0) {
    return (
      <div className="col-span-full">
        <Empty
          title="No cakes found"
          description="Try adjusting your search or filters to find more cakes"
          actionLabel="Clear Filters"
          onAction={() => window.location.reload()}
          icon="Search"
        />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {cakes.map((cake, index) => (
        <motion.div
          key={cake.Id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
        >
          <ProductCard cake={cake} />
        </motion.div>
      ))}
    </div>
  )
}

export default ProductGrid