import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { getAllCakes } from '@/services/api/cakeService'
import FilterSidebar from '@/components/molecules/FilterSidebar'
import ProductGrid from '@/components/organisms/ProductGrid'
import SearchBar from '@/components/molecules/SearchBar'
import Button from '@/components/atoms/Button'
import ApperIcon from '@/components/ApperIcon'

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [cakes, setCakes] = useState([])
  const [filteredCakes, setFilteredCakes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    loadCakes()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [cakes, searchParams])

  const loadCakes = async () => {
    try {
      setLoading(true)
      setError('')
      const allCakes = await getAllCakes()
      setCakes(allCakes)
    } catch (err) {
      setError('Failed to load cakes')
      console.error('Error loading cakes:', err)
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = () => {
    let filtered = [...cakes]
    
    // Apply search filter
    const searchTerm = searchParams.get('search')
    if (searchTerm) {
      filtered = filtered.filter(cake =>
        cake.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cake.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
    
    // Apply category filter
    const category = searchParams.get('category')
    if (category) {
      filtered = filtered.filter(cake => cake.category === category)
    }
    
    // Apply flavor filter
    const flavor = searchParams.get('flavor')
    if (flavor) {
      filtered = filtered.filter(cake => 
        cake.flavors.some(f => f.toLowerCase().includes(flavor.toLowerCase()))
      )
    }
    
    // Apply price range filter
    const priceRange = searchParams.get('priceRange')
    if (priceRange && priceRange !== '') {
      const [min, max] = priceRange.split('-').map(Number)
      if (priceRange === '200+') {
        filtered = filtered.filter(cake => cake.basePrice >= 200)
      } else if (max) {
        filtered = filtered.filter(cake => cake.basePrice >= min && cake.basePrice <= max)
      }
    }
    
    setFilteredCakes(filtered)
  }

  const handleSearch = (searchTerm) => {
    const params = new URLSearchParams(searchParams)
    if (searchTerm) {
      params.set('search', searchTerm)
    } else {
      params.delete('search')
    }
    setSearchParams(params)
  }

  const handleFilterChange = (filters) => {
    const params = new URLSearchParams(searchParams)
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
    })
    
    setSearchParams(params)
  }

  const clearAllFilters = () => {
    setSearchParams({})
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Our <span className="gradient-text">Cake</span> Collection
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl">
            Discover our wide selection of artisanal cakes, each crafted with love and premium ingredients.
          </p>
        </div>

        {/* Search and Filter Toggle */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar 
              onSearch={handleSearch}
              placeholder="Search cakes..."
              className="w-full"
            />
          </div>
          <Button
            onClick={() => setShowFilters(!showFilters)}
            variant="outline"
            className="flex items-center gap-2 sm:w-auto"
          >
            <ApperIcon name="Filter" size={20} />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-gray-600">
            {loading ? 'Loading...' : `${filteredCakes.length} cakes found`}
          </p>
          {(searchParams.toString() && !loading) && (
            <Button
              onClick={clearAllFilters}
              variant="ghost"
              size="sm"
              className="text-gray-500 hover:text-gray-700"
            >
              Clear All Filters
            </Button>
          )}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <FilterSidebar
              filters={{
                category: searchParams.get('category') || '',
                flavor: searchParams.get('flavor') || '',
                priceRange: searchParams.get('priceRange') || ''
              }}
              onFilterChange={handleFilterChange}
              className="sticky top-24"
            />
          </div>

          {/* Product Grid */}
          <div className="lg:col-span-3">
            <ProductGrid
              cakes={filteredCakes}
              loading={loading}
              error={error}
              onRetry={loadCakes}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Shop