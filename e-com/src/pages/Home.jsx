import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hero from '../components/Hero';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Star, Heart, Zap, Sparkles, Truck, ShoppingBag } from 'lucide-react';
import { useAppContext } from '../context/AppContext.jsx';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Home = () => {
  const { allProduct } = useAppContext();

  const [hotSales, setHotSales] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    if (allProduct) {
      const shuffledProducts = [...allProduct].sort(() => 0.5 - Math.random());
      setHotSales(shuffledProducts.slice(0, 8));
      setNewArrivals(allProduct.slice(0, 8));
    }
  }, [allProduct]);

  const categories = [
    {
      id: '1',
      name: 'Electronics',
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400',
      productCount: 25,
      description: 'Latest gadgets and tech',
      itemCount: '200+ items'
    },
    {
      id: '2',
      name: 'Fashion',
      image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
      productCount: 18,
      description: 'Trendy clothing & accessories',
      itemCount: '150+ items'
    },
    {
      id: '3',
      name: 'Home & Garden',
      image: 'https://images.pexels.com/photos/1080721/pexels-photo-1080721.jpeg?auto=compress&cs=tinysrgb&w=400',
      productCount: 12,
      description: 'Trendy clothing & accessories',
      itemCount: '150+ items'
    },
    {
      id: '4',
      name: 'Sports',
      image: 'https://images.pexels.com/photos/863988/pexels-photo-863988.jpeg?auto=compress&cs=tinysrgb&w=400',
      productCount: 15,
      description: 'Trendy clothing & accessories',
      itemCount: '150+ items'
    },
    {
      id: '5',
      name: 'Books',
      image: 'https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=400',
      productCount: 8,
      description: 'Trendy clothing & accessories',
      itemCount: '150+ items'
    },
    {
      id: '6',
      name: 'Beauty',
      image: 'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=400',
      productCount: 20,
      description: 'Trendy clothing & accessories',
      itemCount: '150+ items'
    }
  ];

  const featuredCollections = [
    {
      name: "Spring Collection",
      description: "Light & vibrant looks for the new season.",
      image: "https://images.pexels.com/photos/1192609/pexels-photo-1192609.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/collection/spring"
    },
    {
      name: "Handcrafted Jewelry",
      description: "Unique pieces for every occasion.",
      image: "https://images.pexels.com/photos/1453005/pexels-photo-1453005.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/collection/jewelry"
    },
    {
      name: "Ethical Beauty",
      description: "Cruelty-free products you can trust.",
      image: "https://images.pexels.com/photos/4042803/pexels-photo-4042803.jpeg?auto=compress&cs=tinysrgb&w=800",
      link: "/collection/beauty"
    }
  ];

  const testimonials = [
    {
      name: "Priya S.",
      quote: "The craftsmanship is unparalleled. I feel so elegant wearing their pieces. A true legacy of quality.",
      image: "https://randomuser.me/api/portraits/women/48.jpg"
    },
    {
      name: "Meera K.",
      quote: "Every product tells a story. I appreciate the attention to detail and the beautiful, rich colors. Absolutely stunning!",
      image: "https://randomuser.me/api/portraits/women/62.jpg"
    },
    {
      name: "Anjali G.",
      quote: "Darsh has captured the essence of Indian elegance. The quality and service are exceptional. Highly recommend!",
      image: "https://randomuser.me/api/portraits/women/71.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-inter">
      <Hero />

      {/* Categories Section */}
      <section className="py-16 bg-white rounded-b-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Shop by Category</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our wide range of products across different categories.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat, idx) => (
              <Link
                key={idx}
                to={`/category/${cat.name}`}
                className="group relative block rounded-lg overflow-hidden shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-200 hover:border-blue-500"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="text-xl font-bold mb-2">{cat.name}</h3>
                  <p className="text-gray-200 text-sm mb-2">{cat.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-300">{cat.itemCount}</span>
                    <div className="flex items-center space-x-1 text-sm font-medium group-hover:text-blue-300 transition-colors">
                      <span>Shop Now</span>
                      <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                    </div>
                  </div>
                </div>
                <div className="absolute inset-0 bg-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Hot Sales Section */}
      <section className="py-16 bg-white rounded-xl my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 text-center sm:text-left">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">🔥 Hot Sales</h2>
              <p className="text-gray-600">Don't miss out on these amazing deals!</p>
            </div>
            <Link
              to="/hotsales"
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium mt-4 sm:mt-0"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
          {hotSales.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {hotSales.slice(0, 4).map(product => (
                <ProductCard
                  key={product._id}
                  product={{
                    id: product._id,
                    name: product.productName,
                    image: product.images?.[0] ? `http://localhost:8000/img/${product.images[0]}` : "",
                    price: product.price
                  }}
                  onAddToCart={() => {}}
                  onToggleWishlist={() => {}}
                  isCompactMobile={true}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No hot deals available.</p>
          )}
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-16 bg-white rounded-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-12 text-center sm:text-left">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">✨ New Arrivals</h2>
              <p className="text-gray-600">Check out our latest products</p>
            </div>
            <Link
              to="/newarrivals"
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium mt-4 sm:mt-0"
            >
              View All
              <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
          {newArrivals.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {newArrivals.slice(0, 4).map(product => (
                <ProductCard
                  key={product._id}
                  product={{
                    id: product._id,
                    name: product.productName,
                    image: product.images?.[0] ? `http://localhost:8000/img/${product.images[0]}` : "",
                    price: product.price
                  }}
                  onAddToCart={() => {}}
                  onToggleWishlist={() => {}}
                  isCompactMobile={true}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-center">No new products available.</p>
          )}
        </div>
      </section>
      
      {/* Why Choose Darsh (Indian-inspired design) - Now a Swiper */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl whitespace-nowrap sm:text-3xl lg:text-4xl font-extrabold text-maroon-800 mb-4 font-serif">
  The ShopHub Legacy
</h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-16 font-body">
            We are dedicated to a heritage of quality and style, blending traditional craftsmanship with modern design.
          </p>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 4 },
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className="mySwiper why-choose-swiper"
          >
            <SwiperSlide>
              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-amber-200 transition-transform duration-300 hover:scale-105">
                <div className="mb-4 text-center">
                  <Heart className="h-16 w-16 text-red-600 mx-auto animate-icon-pulse" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl whitespace-nowrap font-bold text-gray-800 mb-2">Artisanal Craftsmanship</h3>
                <p className="text-gray-600 font-light">Each piece is lovingly handcrafted with attention to every detail.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-amber-200 transition-transform duration-300 hover:scale-105">
                <div className="mb-4 text-center">
                  <Sparkles className="h-16 w-16 text-pink-600 mx-auto animate-icon-pulse" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Sustainable Elegance</h3>
                <p className="text-gray-600 font-light">We use ethically sourced materials to create timeless, eco-conscious fashion.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-amber-200 transition-transform duration-300 hover:scale-105">
                <div className="mb-4 text-center">
                  <Truck className="h-16 w-16 text-indigo-600 mx-auto animate-icon-pulse" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Seamless Shopping</h3>
                <p className="text-gray-600 font-light">Enjoy swift and secure delivery right to your doorstep, anywhere.</p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-white p-8 rounded-2xl shadow-lg border-2 border-amber-200 transition-transform duration-300 hover:scale-105">
                <div className="mb-4 text-center">
                  <ShoppingBag className="h-16 w-16 text-teal-600 mx-auto animate-icon-pulse" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Assured Quality</h3>
                <p className="text-gray-600 font-light">We guarantee the finest quality, with a promise of complete satisfaction.</p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </section>

      {/* Featured Collections - Now a Swiper */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-maroon-800 mb-4 font-serif">
            A Tapestry of Style</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our exquisite, handcrafted collections, each with a unique story to tell.
            </p>
          </div>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="mySwiper featured-collection-swiper"
          >
            {featuredCollections.map((collection, index) => (
              <SwiperSlide key={index}>
                <Link to={collection.link} className="block rounded-lg overflow-hidden shadow-lg group hover:shadow-xl transition-shadow duration-300">
                  <div className="relative">
                    <img
                      src={collection.image}
                      alt={collection.name}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-maroon-800 to-transparent flex items-end p-6">
                      <div className="text-white">
                        <h3 className="text-2xl font-bold mb-1">{collection.name}</h3>
                        <p className="text-sm">{collection.description}</p>
                      </div>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Testimonials - Now a Swiper */}
      <section className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl whitespace-nowrap sm:text-3xl lg:text-4xl font-extrabold text-maroon-800 mb-4 font-serif">
          Our Community</h2>
          <p className="text-gray-700 max-w-2xl mx-auto mb-12 font-body">
            Stories from our happy customers who are part of the Darsh family.
          </p>
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className="mySwiper testimonial-swiper"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-amber-200 transform hover:scale-105 transition-transform duration-300 animate-slide-in">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-maroon-800 animate-profile-pop"
                  />
                  <p className="text-gray-700 italic mb-4 font-body">"{testimonial.quote}"</p>
                  <div className="flex items-center justify-center text-yellow-500">
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                  <span className="mt-2 font-semibold text-gray-900">- {testimonial.name}</span>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Call to Action Banner with animations */}
      <section className="py-20 my-8 bg-gradient-to-r from-yellow-200 via-amber-200 to-yellow-300 rounded-lg shadow-xl text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8
        relative overflow-hidden animation-pulse-subtle">
        <div className="relative z-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 font-serif text-maroon-800 animate-fade-in">
            Discover Your Signature Style
          </h2>
          <p className="text-gray-700 mb-8 max-w-2xl mx-auto font-body animate-fade-in delay-200">
            Explore our full collection and find the perfect piece to celebrate your unique identity.
          </p>
          <Link
            to="/hotsales"
            className="inline-flex items-center px-8 py-3 border-4 border-transparent text-base font-medium rounded-full shadow-lg text-white bg-maroon-800 transition-all duration-300 hover:bg-maroon-900 hover:shadow-2xl hover:scale-105"
          >
            Begin Your Journey
            <ArrowRight className="ml-2 h-5 w-5 transform group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;