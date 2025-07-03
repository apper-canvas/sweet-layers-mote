import { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const SearchBar = ({ onSearch, placeholder = "Search cakes...", className = '' }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    e.preventDefault()
    onSearch(searchTerm)
  }

  return (
    <form onSubmit={handleSearch} className={`relative ${className}`}>
      <div className="relative">
        <ApperIcon
          name="Search"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-primary/20 transition-all duration-200 bg-white"
        />
      </div>
      <Button
        type="submit"
        variant="primary"
        size="sm"
        className="absolute right-2 top-1/2 transform -translate-y-1/2"
      >
        <ApperIcon name="Search" size={16} />
      </Button>
    </form>
  )
}

export default SearchBar