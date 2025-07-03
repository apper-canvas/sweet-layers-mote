import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Error = ({ message = 'Something went wrong', onRetry, className = '' }) => {
  return (
    <div className={`text-center py-12 ${className}`}>
      <div className="bg-white rounded-xl shadow-md p-8 max-w-md mx-auto">
        <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <ApperIcon name="AlertCircle" size={32} className="text-error" />
        </div>
        
        <h3 className="font-display text-xl font-semibold text-gray-900 mb-2">
          Oops! Something went wrong
        </h3>
        
        <p className="text-gray-600 mb-6">
          {message}
        </p>
        
        {onRetry && (
          <Button
            onClick={onRetry}
            variant="primary"
            className="flex items-center gap-2 mx-auto"
          >
            <ApperIcon name="RefreshCw" size={16} />
            Try Again
          </Button>
        )}
      </div>
    </div>
  )
}

export default Error