const Loading = ({ className = '' }) => {
  return (
    <div className={`space-y-6 ${className}`}>
      {/* Hero Section Skeleton */}
      <div className="bg-gray-200 rounded-xl h-64 shimmer"></div>
      
      {/* Product Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="bg-gray-200 h-48 shimmer"></div>
            <div className="p-4 space-y-3">
              <div className="bg-gray-200 h-4 rounded shimmer"></div>
              <div className="bg-gray-200 h-3 rounded shimmer w-3/4"></div>
              <div className="bg-gray-200 h-3 rounded shimmer w-1/2"></div>
              <div className="flex justify-between items-center">
                <div className="bg-gray-200 h-6 rounded shimmer w-16"></div>
                <div className="bg-gray-200 h-8 rounded shimmer w-20"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Loading