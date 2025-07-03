import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  title = 'No items found', 
  description = 'Try adjusting your search or filters',
  actionLabel = 'Browse All',
  onAction,
  icon = 'Search',
  className = ''
}) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
        <div className="w-16 h-16 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name={icon} size={32} className="text-primary" />
        </div>
        
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-6">
          {description}
        </p>
        
        {onAction && (
          <Button
            onClick={onAction}
            variant="primary"
            className="flex items-center gap-2 mx-auto"
          >
            <ApperIcon name="ArrowRight" size={16} />
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

export default Empty