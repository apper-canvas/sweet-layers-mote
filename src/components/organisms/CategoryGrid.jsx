import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const CategoryGrid = () => {
  const categories = [
    {
      id: 'birthday',
      name: 'Birthday Cakes',
      description: 'Celebrate another year with our festive birthday creations',
      icon: 'Gift',
      color: 'from-pink-400 to-red-400',
      image: 'https://images.unsplash.com/photo-1558636508-e0db3814bd1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'wedding',
      name: 'Wedding Cakes',
      description: 'Elegant and romantic cakes for your special day',
      icon: 'Heart',
      color: 'from-purple-400 to-pink-400',
      image: 'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'custom',
      name: 'Custom Cakes',
      description: 'Unique designs tailored to your vision',
      icon: 'Palette',
      color: 'from-blue-400 to-purple-400',
      image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 'seasonal',
      name: 'Seasonal Specials',
      description: 'Limited-time flavors and seasonal decorations',
      icon: 'Snowflake',
      color: 'from-green-400 to-blue-400',
      image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ]

  return (
    <section className="py-16 bg-gradient-to-br from-secondary/30 to-primary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Explore Our <span className="gradient-text">Categories</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            From birthday celebrations to weddings, we have the perfect cake for every occasion.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Link
                to={`/shop?category=${category.id}`}
                className="group block"
              >
                <div className="relative bg-white rounded-xl shadow-lg overflow-hidden card-hover">
                  <div className="aspect-square relative">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-80`}></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                          <ApperIcon name={category.icon} size={32} />
                        </div>
                        <h3 className="font-display text-xl font-bold mb-2">
                          {category.name}
                        </h3>
                        <p className="text-sm opacity-90 px-4">
                          {category.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CategoryGrid