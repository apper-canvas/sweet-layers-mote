import { forwardRef } from 'react'

const Select = forwardRef(({ 
  label, 
  error, 
  className = '', 
  id,
  children,
  ...props 
}, ref) => {
  const selectId = id || label?.toLowerCase().replace(/\s+/g, '-')
  
  return (
    <div className="space-y-1">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        className={`
          w-full px-3 py-2 border rounded-lg form-input
          transition-all duration-200 bg-white
          ${error 
            ? 'border-error focus:border-error focus:ring-error/20' 
            : 'border-gray-300 focus:border-primary focus:ring-primary/20'
          }
          ${className}
        `}
        {...props}
      >
        {children}
      </select>
      {error && (
        <p className="text-sm text-error">{error}</p>
      )}
    </div>
  )
})

Select.displayName = 'Select'

export default Select