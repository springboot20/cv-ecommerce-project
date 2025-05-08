import { Fragment, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/redux/redux.hooks";
import { RootState } from "../../app/store";
import { formatPrice } from "../../helpers";
import { 
  ArrowRightIcon, 
  ShoppingBagIcon, 
  ChevronRightIcon,
  StarIcon,
  MagnifyingGlassIcon
} from "@heroicons/react/24/outline";
import Slider from "react-slick";
import { productCarouselSettings } from "../../util/slickSlider.config";

// Placeholder images (replace with your actual imports)
import HeroBanner from "../../assets/hero-banner.png";
import CategoryMen from "../../assets/category-men.jpg";
import CategoryWomen from "../../assets/category-women.jpg";
import CategoryKids from "../../assets/category-kids.jpg";
import BrandLogo1 from "../../assets/brand-logo-1.png";
import BrandLogo2 from "../../assets/brand-logo-2.png";
import BrandLogo3 from "../../assets/brand-logo-3.png";
import BrandLogo4 from "../../assets/brand-logo-4.png";
import BrandLogo5 from "../../assets/brand-logo-5.png";
import PromoImage1 from "../../assets/promo-1.jpg";
import PromoImage2 from "../../assets/promo-2.jpg";

const Home = () => {
  const { products } = useAppSelector((state: RootState) => state.product);
  const navigate = useNavigate();
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    // In a real application, you would filter these based on product attributes
    // For demo purposes, we'll just slice the products array
    if (products?.length) {
      setFeaturedProducts(products.slice(0, 4));
      setBestSellers(products.slice(4, 8));
      setNewArrivals(products.slice(0, 8));
    }
  }, [products]);

  // Settings for the feature category slider
  const featureCategorySettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  // Settings for the brands slider
  const brandSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };

  const ProductCard = ({ product, index }) => (
    <div className="group" key={`${product._id}-${index}`}>
      <div className="relative overflow-hidden rounded-lg">
        <div className="relative h-64 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:h-80">
          <img
            src={product?.imageSrc?.url}
            alt={product.name}
            className="h-full w-full object-cover object-center group-hover:scale-110 transition-all duration-300"
          />
        </div>
        <div className="absolute top-0 right-0 m-2">
          <div className="flex flex-col gap-2">
            <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all">
              <StarIcon className="h-5 w-5 text-gray-600" strokeWidth={1.5} />
            </button>
            <button 
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-all"
              onClick={() => navigate(`/collections/${product._id}`)}
            >
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-600" strokeWidth={1.5} />
            </button>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-40 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <button 
            className="w-full py-2 flex items-center justify-center gap-2 bg-white text-black font-medium rounded hover:bg-gray-100"
            onClick={() => navigate(`/collections/${product._id}`)}
          >
            <ShoppingBagIcon className="h-5 w-5" />
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900">{product.name}</h3>
          <p className="mt-1 text-sm text-gray-500">{product.category?.name}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{formatPrice(product.price)}</p>
      </div>
    </div>
  );

  return (
    <Fragment>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={HeroBanner} 
            alt="Hero Banner" 
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 sm:py-40 lg:py-48">
          <div className="max-w-lg">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Summer Collection 2025
            </h1>
            <p className="mt-4 text-xl text-white">
              Discover the latest fashion trends and elevate your style with our exclusive summer collection.
            </p>
            <div className="mt-8 flex">
              <Link 
                to="/collections" 
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-black bg-white hover:bg-gray-100"
              >
                Shop Now
                <ChevronRightIcon className="ml-2 -mr-1 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">Shop by Category</h2>
            <p className="mt-4 max-w-2xl mx-auto text-base text-gray-500">
              Explore our wide range of products across different categories.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
            <div className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-3 sm:h-auto">
                <img
                  src={CategoryMen}
                  alt="Men's Collection"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black to-transparent">
                <div>
                  <h3 className="text-xl font-medium text-white">Men</h3>
                  <p className="mt-1 text-sm text-gray-300">Shop the collection</p>
                </div>
              </div>
              <Link to="/collections?category=men" className="absolute inset-0 focus:outline-none">
                <span className="sr-only">View Men's Collection</span>
              </Link>
            </div>

            <div className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-3 sm:h-auto">
                <img
                  src={CategoryWomen}
                  alt="Women's Collection"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black to-transparent">
                <div>
                  <h3 className="text-xl font-medium text-white">Women</h3>
                  <p className="mt-1 text-sm text-gray-300">Shop the collection</p>
                </div>
              </div>
              <Link to="/collections?category=women" className="absolute inset-0 focus:outline-none">
                <span className="sr-only">View Women's Collection</span>
              </Link>
            </div>

            <div className="group relative">
              <div className="relative h-80 w-full overflow-hidden rounded-lg bg-white group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-3 sm:h-auto">
                <img
                  src={CategoryKids}
                  alt="Kids Collection"
                  className="h-full w-full object-cover object-center"
                />
              </div>
              <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black to-transparent">
                <div>
                  <h3 className="text-xl font-medium text-white">Kids</h3>
                  <p className="mt-1 text-sm text-gray-300">Shop the collection</p>
                </div>
              </div>
              <Link to="/collections?category=kids" className="absolute inset-0 focus:outline-none">
                <span className="sr-only">View Kids Collection</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-gray-50 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Featured Products</h2>
            <Link to="/collections" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center">
              View all
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {featuredProducts.map((product, idx) => (
              <ProductCard product={product} index={idx} key={`featured-${product._id}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Banner Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src={PromoImage1} 
                alt="Special Offer" 
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-indigo-900 opacity-70"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-start p-8">
                <h3 className="text-white text-2xl sm:text-3xl font-bold mb-2">Summer Sale</h3>
                <p className="text-white text-lg mb-4">Up to 50% off selected items</p>
                <Link 
                  to="/collections?sale=true" 
                  className="bg-white text-indigo-700 px-4 py-2 rounded-md font-medium hover:bg-gray-100"
                >
                  Shop Now
                </Link>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-lg">
              <img 
                src={PromoImage2} 
                alt="New Collection" 
                className="w-full h-64 sm:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-amber-600 to-amber-900 opacity-70"></div>
              <div className="absolute inset-0 flex flex-col justify-center items-start p-8">
                <h3 className="text-white text-2xl sm:text-3xl font-bold mb-2">New Arrivals</h3>
                <p className="text-white text-lg mb-4">Discover our latest collection</p>
                <Link 
                  to="/collections?new=true" 
                  className="bg-white text-amber-700 px-4 py-2 rounded-md font-medium hover:bg-gray-100"
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">Best Sellers</h2>
            <Link to="/collections?bestsellers=true" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center">
              View all
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {bestSellers.map((product, idx) => (
              <ProductCard product={product} index={idx} key={`bestseller-${product._id}`} />
            ))}
          </div>
        </div>
      </section>

      {/* Brand Logos */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Our Brands</h2>
          <Slider {...brandSettings} className="brand-slider">
            {[BrandLogo1, BrandLogo2, BrandLogo3, BrandLogo4, BrandLogo5].map((logo, index) => (
              <div key={`brand-${index}`} className="px-4">
                <div className="h-16 flex items-center justify-center">
                  <img src={logo} alt={`Brand ${index + 1}`} className="max-h-full max-w-full object-contain" />
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="bg-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight text-gray-900">New Arrivals</h2>
            <Link to="/collections?new=true" className="text-sm font-medium text-indigo-600 hover:text-indigo-500 flex items-center">
              View all
              <ArrowRightIcon className="ml-1 h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6">
            <Slider {...productCarouselSettings}>
              {newArrivals.map((product, idx) => (
                <div className="px-2" key={`arrival-${product._id}`}>
                  <ProductCard product={product} index={idx} />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-gray-800 py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
              Subscribe to our newsletter
            </h2>
            <p className="mt-4 text-lg leading-6 text-gray-300">
              Get the latest updates, offers and special announcements delivered straight to your inbox.
            </p>
            <div className="mt-8 flex justify-center">
              <div className="inline-flex rounded-md shadow">
                <div className="flex max-w-md w-full">
                  <div className="min-w-0 flex-1">
                    <label htmlFor="email-address" className="sr-only">Email address</label>
                    <input
                      id="email-address"
                      type="email"
                      className="block w-full rounded-l-md border-0 px-4 py-3 text-base text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:border-indigo-600"
                      placeholder="Enter your email"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center rounded-r-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
                  >
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-y-8 sm:grid-cols-2 lg:grid-cols-4 gap-x-6">
            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
                </svg>
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">Free Shipping</h3>
              <p className="mt-2 text-base text-gray-500">On all orders over $50</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">Money Back Guarantee</h3>
              <p className="mt-2 text-base text-gray-500">30-day return policy</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">24/7 Support</h3>
              <p className="mt-2 text-base text-gray-500">Always here to help</p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
                </svg>
              </div>
              <h3 className="mt-3 text-lg font-medium text-gray-900">Secure Payments</h3>
              <p className="mt-2 text-base text-gray-500">100% protected payments</p>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default Home;