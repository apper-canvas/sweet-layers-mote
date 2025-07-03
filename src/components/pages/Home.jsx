import HeroSection from '@/components/organisms/HeroSection'
import FeaturedCakes from '@/components/organisms/FeaturedCakes'
import CategoryGrid from '@/components/organisms/CategoryGrid'

const Home = () => {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedCakes />
      <CategoryGrid />
      
      {/* Testimonials Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
              What Our <span className="gradient-text">Customers</span> Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied customers.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                text: "The birthday cake for my daughter was absolutely perfect! Beautiful design and delicious taste.",
                rating: 5
              },
              {
                name: "Michael Chen",
                text: "Best wedding cake we could have asked for. The attention to detail was incredible.",
                rating: 5
              },
              {
                name: "Emily Davis",
                text: "Custom cake exceeded all expectations. Will definitely order again for future celebrations.",
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-secondary/30 to-primary/10 rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">- {testimonial.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home