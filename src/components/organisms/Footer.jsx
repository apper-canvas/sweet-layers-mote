import { Link } from 'react-router-dom'
import ApperIcon from '@/components/ApperIcon'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
                <ApperIcon name="Cake" size={20} className="text-white" />
              </div>
              <span className="font-display text-xl font-bold text-white">
                Sweet Layers
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Creating beautiful, delicious custom cakes for your special occasions. 
              Made with love and the finest ingredients.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <ApperIcon name="Facebook" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <ApperIcon name="Instagram" size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors">
                <ApperIcon name="Twitter" size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/shop" className="text-gray-400 hover:text-white transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-white transition-colors">
                  Cart
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2 text-gray-400">
              <div className="flex items-center gap-2">
                <ApperIcon name="Phone" size={16} />
                <span>(555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="Mail" size={16} />
                <span>orders@sweetlayers.com</span>
              </div>
              <div className="flex items-center gap-2">
                <ApperIcon name="MapPin" size={16} />
                <span>123 Bakery Lane, Sweet City</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 Sweet Layers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer