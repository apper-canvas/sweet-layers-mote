import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const HeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-primary/10 to-accent/10 overflow-hidden">
      <div className="absolute inset-0 bg-white/50"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
              <span className="gradient-text">Sweet Layers</span>
              <br />
              <span className="text-gray-900">of Happiness</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              Transform your special moments with our artisanal custom cakes. 
              Each creation is crafted with love, premium ingredients, and attention to detail.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                as={Link}
                to="/shop"
                variant="primary"
                size="lg"
                className="flex items-center gap-2"
              >
                <ApperIcon name="ShoppingBag" size={20} />
                Shop Now
              </Button>
              
              <Button
                as={Link}
                to="/about"
                variant="outline"
                size="lg"
                className="flex items-center gap-2"
              >
                <ApperIcon name="Info" size={20} />
                Learn More
              </Button>
            </div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80"
                alt="Beautiful custom cake"
                className="w-full h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating badges */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg"
            >
              <div className="text-center">
                <div className="font-display text-2xl font-bold text-primary">5★</div>
                <div className="text-xs text-gray-600">Rated</div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1.2 }}
              className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg"
            >
              <div className="text-center">
                <div className="font-display text-2xl font-bold text-accent">100%</div>
                <div className="text-xs text-gray-600">Fresh</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection