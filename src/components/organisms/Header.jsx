import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { AnimatePresence, motion } from "framer-motion";
import { AuthContext } from "../../App";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import CartIcon from "@/components/molecules/CartIcon";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)
  const { user, isAuthenticated } = useSelector((state) => state.user)

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm)}`)
    }
  }

  const handleCartClick = () => {
    navigate('/cart')
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

const navItems = [
    { label: 'Shop', href: '/shop' },
    { label: 'Orders', href: '/orders' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center">
              <ApperIcon name="Cake" size={20} className="text-white" />
            </div>
            <span className="font-display text-xl font-bold gradient-text">
              Sweet Layers
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Bar - Desktop */}
          <div className="hidden lg:block flex-1 max-w-md mx-8">
            <SearchBar onSearch={handleSearch} />
          </div>

          {/* Actions */}
{/* Actions */}
          <div className="flex items-center gap-4">
            <CartIcon onClick={handleCartClick} />
            
            {/* User Actions */}
            {isAuthenticated && (
              <div className="hidden md:flex items-center gap-3">
                <span className="text-sm text-gray-600">
                  Hello, {user?.firstName || user?.name || 'User'}
                </span>
                <Button
                  onClick={logout}
                  variant="ghost"
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <ApperIcon name="LogOut" size={16} />
                  Logout
                </Button>
              </div>
            )}
            
            {/* Mobile Menu Button */}
            <Button
              onClick={toggleMenu}
              variant="ghost"
              size="sm"
              className="md:hidden"
            >
              <ApperIcon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
        </div>

        {/* Mobile Search Bar */}
        <div className="lg:hidden pb-4">
          <SearchBar onSearch={handleSearch} />
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-gray-100"
          >
<div className="px-4 py-4 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="block py-2 text-gray-700 hover:text-primary transition-colors duration-200 font-medium"
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Mobile User Actions */}
              {isAuthenticated && (
                <div className="border-t pt-4 space-y-3">
                  <div className="text-sm text-gray-600">
                    Hello, {user?.firstName || user?.name || 'User'}
                  </div>
                  <Button
                    onClick={() => {
                      logout()
                      setIsMenuOpen(false)
                    }}
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 w-full justify-start"
                  >
                    <ApperIcon name="LogOut" size={16} />
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

export default Header