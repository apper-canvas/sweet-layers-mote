import { useState } from 'react'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const FilterSidebar = ({ filters, onFilterChange, className = '' }) => {

  const categories = [
    { value: '', label: 'All Categories' },
    { value: 'birthday', label: 'Birthday' },
    { value: 'wedding', label: 'Wedding' },
    { value: 'custom', label: 'Custom' },
    { value: 'seasonal', label: 'Seasonal' }
  ]

  const flavors = [
    { value: '', label: 'All Flavors' },
    { value: 'vanilla', label: 'Vanilla' },
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'red-velvet', label: 'Red Velvet' },
    { value: 'carrot', label: 'Carrot' },
    { value: 'lemon', label: 'Lemon' }
  ]

  const priceRanges = [
    { value: '', label: 'Any Price' },
    { value: '0-50', label: 'Under $50' },
    { value: '50-100', label: '$50 - $100' },
    { value: '100-200', label: '$100 - $200' },
    { value: '200+', label: '$200+' }
]

  const allergenOptions = [
    { value: 'gluten', label: 'Gluten-Free' },
    { value: 'dairy', label: 'Dairy-Free' },
    { value: 'nuts', label: 'Nut-Free' },
    { value: 'eggs', label: 'Egg-Free' },
    { value: 'soy', label: 'Soy-Free' }
  ]

const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters, [filterType]: value }
    onFilterChange(newFilters)
  }

  const handleAllergenChange = (allergen) => {
    const newAllergens = filters.allergens.includes(allergen)
      ? filters.allergens.filter(a => a !== allergen)
      : [...filters.allergens, allergen]
    
    const newFilters = { ...filters, allergens: newAllergens }
    onFilterChange(newFilters)
  }

  const clearFilters = () => {
    onFilterChange({ category: '', flavor: '', priceRange: '', allergens: [] })
  }

  return (
    <div className={`bg-white rounded-lg shadow-md p-6 ${className}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-lg font-semibold text-gray-900">
          Filter Cakes
        </h3>
        <Button
          onClick={clearFilters}
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-gray-700"
        >
          Clear All
        </Button>
      </div>

      <div className="space-y-6">
        {/* Category Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Category</h4>
          <div className="space-y-2">
            {categories.map((category) => (
              <label
                key={category.value}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
<input
                  type="radio"
                  name="category"
                  value={category.value}
                  checked={filters.category === category.value}
                  onChange={(e) => handleFilterChange('category', e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-700">{category.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Flavor Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Flavor</h4>
          <div className="space-y-2">
            {flavors.map((flavor) => (
              <label
                key={flavor.value}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
<input
                  type="radio"
                  name="flavor"
                  value={flavor.value}
                  checked={filters.flavor === flavor.value}
                  onChange={(e) => handleFilterChange('flavor', e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-700">{flavor.label}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Price Range Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Price Range</h4>
          <div className="space-y-2">
            {priceRanges.map((range) => (
              <label
                key={range.value}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
<input
                  type="radio"
                  name="priceRange"
                  value={range.value}
                  checked={filters.priceRange === range.value}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-700">{range.label}</span>
              </label>
            ))}
          </div>
</div>

        {/* Allergen Filter */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3">Dietary Restrictions</h4>
          <div className="space-y-2">
            {allergenOptions.map((allergen) => (
              <label
                key={allergen.value}
                className="flex items-center cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors"
              >
<input
                  type="checkbox"
                  value={allergen.value}
                  checked={filters.allergens.includes(allergen.value)}
                  onChange={() => handleAllergenChange(allergen.value)}
                  className="text-primary focus:ring-primary"
                />
                <span className="ml-2 text-sm text-gray-700">{allergen.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default FilterSidebar