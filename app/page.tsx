"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex justify-center gap-1 mb-4">
    {[...Array(5)].map((_, i) => (
      <span
        key={i}
        className={
          i < rating ? "text-yellow-400 text-xl" : "text-gray-300 text-xl"
        }
      >
        ★
      </span>
    ))}
  </div>
);

export default function Home() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const testimonials = [
    {
      name: "John D.",
      rating: 5,
      image: "uifaces-human-avatar.jpg",
      text: "Wrapping my car with Ocean Spray® Drink ads was a fantastic experience. The process was smooth, and I earned great money while driving around town. Highly recommend!",
    },
    {
      name: "Sarah K.",
      rating: 5,
      image: "uifaces-human-avatar(1).jpg",
      text: "I was a bit hesitant at first, but the team at Ocean Spray® made everything easy. The wrap looked amazing, and I didn't experience any issues with my car's paint. Plus, the extra income was a nice bonus!",
    },
    {
      name: "Marcus T.",
      rating: 5,
      image: "uifaces-popular-avatar(1).jpg",
      text: "Best decision I made! The wrap installation was professional and quick. I've been earning consistent income just by driving to work. The quality of the wrap is outstanding and still looks brand new after 3 months.",
    },
    {
      name: "Jennifer L.",
      rating: 4,
      image: "uifaces-popular-avatar.jpg",
      text: "Great experience overall. The wrapping process was straightforward and the support team was very helpful. I'm making good money and my car has never looked better!",
    },
    {
      name: "David P.",
      rating: 5,
      image: "uifaces-popular-avatar(3).jpg",
      text: "This is an incredible opportunity! The payment is reliable and on time. My car turns heads everywhere I go. I've already recommended this to several friends who are now participating.",
    },
    {
      name: "Michelle R.",
      rating: 5,
      image: "uifaces-popular-avatar(2).jpg",
      text: "Absolutely love being part of this program. The team handles everything professionally from installation to removal. It's the easiest money I've made, and I'm loving the constant compliments on my wrapped car!",
    },
    {
      name: "James W.",
      rating: 4,
      image: "uifaces-popular-avatar(5).jpg",
      text: "Very impressed with how professional everything is run. The wrap quality exceeded my expectations. Getting paid to drive around is a win-win situation. Already on my second contract!",
    },
    {
      name: "Amanda H.",
      rating: 5,
      image: "uifaces-popular-avatar(4).jpg",
      text: "My family thought I was crazy at first, but after seeing the results and hearing about the earnings, they're impressed. The Ocean Spray team is transparent and keeps you informed every step of the way.",
    },
    {
      name: "Christopher M.",
      rating: 4,
      image: "uifaces-popular-avatar(6).jpg",
      text: "Been wrapped for 2 months now and couldn't be happier. The installation team was punctual and respectful. No damage whatsoever to my paint, just like they promised. Worth every penny!",
    },
    {
      name: "Lisa G.",
      rating: 3,
      image: "uifaces-popular-avatar(7).jpg",
      text: "Good opportunity overall. The wrap looks nice and the payment is decent. Wish the selection process was a bit faster, but once approved, everything moved smoothly. Solid side income.",
    },
    {
      name: "Robert K.",
      rating: 5,
      image: "default-avatar.png",
      text: "This program has been life-changing for me. I'm earning passive income just by driving! The Ocean Spray team is responsive, professional, and truly cares about their participants.",
    },
    {
      name: "Victoria S.",
      rating: 5,
      image: "human-avatar(1).jpg",
      text: "One of the best decisions I've made. The entire process from application to receiving payment was seamless. I love the brand and love earning money at the same time. Definitely recommend!",
    },
    {
      name: "Nathan B.",
      rating: 4,
      image: "human-avatar(2).jpg",
      text: "Great way to make some extra cash. The wrap is durable and looks fantastic on my car. The Ocean Spray team is professional and everything has been exactly as promised.",
    },
    {
      name: "Sophie E.",
      rating: 5,
      image: "human-avatar.jpg",
      text: "I've been with Ocean Spray for over 6 months now. Best passive income stream I could ask for! The team is supportive, responsive, and the compensation is fair. Highly satisfied!",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const goToPrevious = () => {
    setCurrentTestimonial(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  const goToNext = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <>
      {/* {<body className="min-h-screen relative">} */}
      <style>{`
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes pulse-glow {
    0%, 100% {
      box-shadow: 0 0 20px rgba(59, 130, 246, 0.5);
    }
    50% {
      box-shadow: 0 0 40px rgba(59, 130, 246, 0.8);
    }
  }
  
  /* New navbar animations */
  @keyframes logoFloat {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-10px);
    }
  }
  
  @keyframes navSlideIn {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  html {
    scroll-behavior: smooth;
  }
  
  .animate-slide-in-left {
    animation: slideInLeft 0.8s ease-out;
  }
  .animate-slide-in-right {
    animation: slideInRight 0.8s ease-out;
  }
  .animate-fade-in-up {
    animation: fadeInUp 0.8s ease-out;
  }
  .animate-pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }
  .logo-float {
    animation: logoFloat 3s ease-in-out infinite;
  }
  .nav-item {
    animation: navSlideIn 0.6s ease-out forwards;
    position: relative;
    cursor: pointer;
  }
  .nav-item::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 3px;
    background: linear-gradient(to right, #06b6d4, #3b82f6);
    transition: width 0.3s ease;
  }
  .nav-item:hover::after {
    width: 100%;
  }
`}</style>

      {/* Navigation */}
      <nav className="bg-white py-3 sm:py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center shadow-md sticky top-0 z-50">
        <img
          src="New Ocean logo.jpg"
          alt="Ocean Car Wraps Logo"
          className="h-12 sm:h-16 lg:h-20 logo-float"
        />

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden text-blue-600 text-3xl focus:outline-none"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center">
          <li className="nav-item inline-block mx-2 xl:mx-4 font-bold text-base xl:text-lg bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 transition-all duration-300">
            <a href="#about">About</a>
          </li>
          <li className="nav-item inline-block mx-2 xl:mx-4 font-bold text-base xl:text-lg bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 transition-all duration-300">
            <a href="/form">Join Us</a>
          </li>
          <li className="nav-item inline-block mx-2 xl:mx-4 font-bold text-base xl:text-lg bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 transition-all duration-300">
            <a href="#services">Services</a>
          </li>
          <li className="nav-item inline-block mx-2 xl:mx-4 font-bold text-base xl:text-lg bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 transition-all duration-300">
            <a href="#footer">Contact Us</a>
          </li>
          <li className="nav-item inline-block mx-2 xl:mx-4 font-bold text-base xl:text-lg bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-500 hover:from-cyan-500 hover:to-blue-600 transition-all duration-300">
            <a href="#testimonials">Testimonials</a>
          </li>
        </ul>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4">
            <ul className="flex flex-col items-center space-y-4">
              <li className="font-bold text-lg bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-500">
                <a href="#about" onClick={() => setMobileMenuOpen(false)}>
                  About
                </a>
              </li>
              <li className="font-bold text-lg bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-500">
                <a href="/form" onClick={() => setMobileMenuOpen(false)}>
                  Join Us
                </a>
              </li>
              <li className="font-bold text-lg bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-500">
                <a href="#services" onClick={() => setMobileMenuOpen(false)}>
                  Services
                </a>
              </li>
              <li className="font-bold text-lg bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-500">
                <a href="#footer" onClick={() => setMobileMenuOpen(false)}>
                  Contact Us
                </a>
              </li>
              <li className="font-bold text-lg bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-500">
                <a
                  href="#testimonials"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Testimonials
                </a>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Header */}
      <header
        id="home"
        className="bg-linear-to-r from-blue-600 via-blue-500 to-cyan-500 text-white py-10 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-10"
      >
        <style>{` @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes softZoom {
    from {
      opacity: 0;
      transform: scale(0.96);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-6px);
    }
  }

  .animate-fade-up {
    animation: fadeUp 0.8s ease-out forwards;
  }

  .animate-soft-zoom {
    animation: softZoom 1s ease-out forwards;
  }

  .delay-200 { animation-delay: 0.2s; }
  .delay-400 { animation-delay: 0.4s; }
  .delay-600 { animation-delay: 0.6s; }
  .delay-800 { animation-delay: 0.8s; }

  .animate-float {
    animation: float 3s ease-in-out infinite;
  }
`}</style>

        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 sm:gap-8 lg:gap-12 max-w-7xl mx-auto">
          <div className="w-full lg:flex-1 animate-soft-zoom">
            <img
              src="left-homepage.jpg"
              className="h-48 sm:h-64 lg:h-96 w-full object-cover rounded-xl shadow-xl"
              alt="Ocean Car Wraps Image"
            />
          </div>

          <div className="w-full lg:flex-1 text-center lg:text-left">
            <h1 className="opacity-0 animate-fade-up text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-black mb-3 bg-clip-text text-transparent bg-linear-to-r from-white to-cyan-200">
              Ocean Spray
            </h1>

            <h2 className="opacity-0 animate-fade-up delay-200 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-2 text-white">
              Wrap your car in style.
            </h2>

            <h2 className="opacity-0 animate-fade-up delay-400 text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-linear-to-r from-cyan-200 to-white">
              Get Paid to Drive!
            </h2>

            <p className="opacity-0 animate-fade-up delay-600 text-sm sm:text-base lg:text-lg mb-6 leading-relaxed text-gray-100 max-w-lg mx-auto lg:mx-0">
              Join our exciting program and earn money by wrapping your car with
              vibrant Ocean Spray® Drink advertisements. Drive around town,
              promote our brand, and get paid for it! It's simple, fun, and
              rewarding.
            </p>

            <Link
              href="/form"
              className="inline-block bg-linear-to-r from-cyan-400 to-blue-500 text-white border-2 border-cyan-300 hover:from-cyan-500 hover:to-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold text-base sm:text-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-cyan-500/50 animate-pulse-glow"
            >
              🚀 Apply Here Now
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* About Section */}
        <section
          id="about"
          className="bg-linear-to-b from-gray-50 via-blue-50 to-cyan-50 px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-8 sm:mb-12 text-center bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">
            About Ocean Spray
          </h2>
          <div className="max-w-4xl mx-auto">
            <p className="text-base sm:text-lg mb-6 sm:mb-8 leading-relaxed text-gray-700 font-medium">
              We are agents assigned by Ocean Spray® Drink to employ individuals
              worldwide. This is one of the strategies designed to create
              awareness for the upcoming Ocean Spray® Drink, which will launch
              by March. Would you like to make money by simply driving your car
              while advertising for Ocean Spray®? If yes, then you are at the
              right place.
            </p>

            <div className="space-y-4 sm:space-y-6">
              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 text-blue-600">
                  ❓ How it works?
                </h2>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700">
                  Here's the basic premise of the "paid to drive" concept: Ocean
                  Spray® Drink seeks regular citizens and professional drivers
                  to go about their normal routines as they usually do, only
                  with a big advert for "Ocean Spray® Drink" plastered on your
                  car.
                </p>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 text-blue-600">
                  🏍️ Don't have a car?
                </h2>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700">
                  If you don't have a car, you can also participate if you have
                  a bike. We have a similar program for bike owners. You can
                  earn money by wrapping your bike with Ocean Spray® Drink
                  advertisements and riding around your city.
                </p>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 text-blue-600">
                  📢 What does the company get out of this type of ad strategy?
                </h2>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700">
                  Lots of exposure and awareness. The auto wraps tend to be
                  colorful, eye-catching, and attract a lot of attention. Plus,
                  it's a form of advertising with a captive audience.
                </p>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 text-blue-600">
                  📅 What is the Contract Duration?
                </h2>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700">
                  Once the wrap has been installed, the minimum term is 2 weeks,
                  and the maximum is 20 weeks. You can choose the duration that
                  works best for you during the application process.
                </p>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 text-blue-600">
                  🛡️ Would the wrap/decal damage the paint of my car?
                </h2>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700">
                  The decal doesn't damage the paint of your car, and it will be
                  removed by our representative once the contract expires. We
                  will be responsible for the installation and removal of the
                  wrap.
                </p>
              </div>

              <div>
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-2 sm:mb-3 text-blue-600">
                  🚗 Does it cover the whole car?
                </h2>
                <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700">
                  No, the decal is only installed on the car trunk and doors. It
                  doesn't cover the windows or roof of the car.
                </p>
              </div>

              <div className="bg-linear-to-r from-blue-500 to-cyan-500 rounded-lg p-6 sm:p-8 text-white mt-6 sm:mt-8">
                <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
                  💰 Compensation:
                </h2>
                <p className="text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                  You will be compensated with{" "}
                  <span className="font-bold text-lg sm:text-xl">
                    $750.00 per week
                  </span>
                  , which is essentially a "rental" payment for letting our
                  company use the space. No fee is required from you. We shall
                  provide experts who will handle the advert placement on your
                  car.
                </p>
                <Link
                  href="/form"
                  className="inline-block bg-white text-blue-600 px-6 sm:px-8 py-2 sm:py-3 rounded-lg font-bold hover:bg-cyan-100 transition-all duration-300 hover:scale-105 text-sm sm:text-base"
                >
                  Get Started Today
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section
          id="services"
          className="bg-linear-to-b from-white to-gray-100 px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-8 sm:mb-12 text-center bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">
            Our Services
          </h2>

          <div className="max-w-5xl mx-auto flex flex-col items-center text-center gap-6 sm:gap-8">
            <div className="group bg-linear-to-br from-blue-50 to-cyan-50 rounded-2xl shadow-lg outline-none cursor-pointer hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 w-full">
              <h2 className="text-xl sm:text-2xl font-bold mt-4 sm:mt-6 text-cyan-600">
                FULL VEHICLE WRAPS
              </h2>
              <div className="flex flex-col items-center justify-center p-4 sm:p-6 mb-6 sm:mb-8 w-full">
                <img
                  src="full-wrap.png"
                  alt="Full Vehicle Wrap"
                  className="max-w-full sm:max-w-md lg:max-w-lg h-auto mb-3 sm:mb-4 rounded-lg shadow-md"
                />
                <p className="text-sm sm:text-base text-gray-700 px-2 sm:px-4">
                  A full vehicle wrap covers the entire surface of your car,
                  including doors, hood, trunk, and sides, providing maximum
                  visibility for the Ocean Spray® Drink brand. This premium
                  option ensures your vehicle becomes a moving billboard seen by
                  thousands of potential customers daily.
                </p>
              </div>
            </div>

            <div className="group bg-linear-to-br from-cyan-50 to-blue-50 rounded-2xl outline-none cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 w-full">
              <h2 className="text-xl sm:text-2xl font-bold mt-4 sm:mt-6 text-cyan-600">
                PARTIAL WRAPS
              </h2>
              <div className="flex flex-col items-center justify-center p-4 sm:p-6 mb-6 sm:mb-8 w-full">
                <img
                  src="car-partial.png"
                  alt="Partial Wraps"
                  className="max-w-full sm:max-w-md lg:max-w-lg h-auto mb-3 sm:mb-4 rounded-lg shadow-md"
                />
                <p className="text-sm sm:text-base text-gray-700 px-2 sm:px-4">
                  Partial wraps strategically cover high-visibility areas like
                  doors, hood, or trunk, showcasing the Ocean Spray® Drink
                  advertisement where eyes naturally focus. This cost-effective
                  option is perfect for participants looking for a balance
                  between exposure and flexibility.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section
          id="testimonials"
          className="bg-linear-to-b from-gray-100 to-white px-4 sm:px-6 lg:px-10 py-12 sm:py-16 lg:py-20"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-8 sm:mb-12 text-center bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">
            Testimonials
          </h2>
          <div className="max-w-2xl mx-auto">
            <div className="relative flex items-center justify-center">
              <button
                onClick={goToPrevious}
                className="absolute left-0 sm:-left-7 z-10 cursor-pointer bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-full w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-lg sm:text-2xl font-bold"
              >
                ←
              </button>

              <div className="flex flex-col items-center text-center px-8 sm:px-12 lg:px-20 py-8 sm:py-12 bg-linear-to-br from-white to-blue-50 rounded-2xl shadow-lg border border-cyan-200 w-full mx-4 sm:mx-0">
                <div className="mb-4 sm:mb-6 relative">
                  <div className="w-16 h-16 sm:w-24 sm:h-24 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg overflow-hidden">
                    <img
                      src={
                        testimonials[currentTestimonial].image ||
                        "default-avatar.png"
                      }
                      alt={testimonials[currentTestimonial].name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 sm:-bottom-2 sm:-right-2 bg-linear-to-r from-blue-400 to-cyan-400 text-white rounded-full w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm font-bold">
                    ★
                  </div>
                </div>

                <StarRating rating={testimonials[currentTestimonial].rating} />

                <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 bg-clip-text text-transparent bg-linear-to-r from-blue-600 to-cyan-600">
                  {testimonials[currentTestimonial].name}
                </h3>

                <p className="text-sm sm:text-base lg:text-lg leading-relaxed text-gray-700 italic mb-3 sm:mb-4 max-w-xl">
                  "{testimonials[currentTestimonial].text}"
                </p>

                <div className="flex gap-2 justify-center mt-4 sm:mt-6">
                  {testimonials.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentTestimonial(idx)}
                      className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                        idx === currentTestimonial
                          ? "bg-linear-to-r from-blue-500 to-cyan-500 w-6 sm:w-8"
                          : "bg-gray-300 hover:bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <button
                onClick={goToNext}
                className="absolute right-0 sm:-right-7 z-10 cursor-pointer bg-linear-to-r from-blue-500 to-cyan-500 text-white rounded-full w-10 h-10 sm:w-14 sm:h-14 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 text-lg sm:text-2xl font-bold"
              >
                →
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer id="footer">
        <div className="bg-blue-950">
          <div className="py-6 sm:py-8 px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row justify-between gap-6 sm:gap-8 lg:gap-12">
            <div className="flex justify-center sm:justify-start">
              <img
                src="new small logo.jpg"
                alt="Ocean Spray Logo"
                className="h-16 sm:h-20 rounded-2xl"
              />
            </div>
            <div>
              <ul className="flex flex-col space-y-3 sm:space-y-4 text-white font-semibold text-center sm:text-left text-sm sm:text-base">
                <li className="hover:text-cyan-400 cursor-pointer">
                  <a href="#home">Home</a>
                </li>
                <li className="hover:text-cyan-400 cursor-pointer">
                  <a href="#about">About Ocean Spray</a>
                </li>
                <li className="hover:text-cyan-400 cursor-pointer">
                  <a href="#services">Our Services</a>
                </li>
                <li className="hover:text-cyan-400 cursor-pointer">
                  <a href="#testimonials">Testimonials</a>
                </li>
              </ul>
            </div>
            <div className="text-center sm:text-left">
              <h3 className="text-white font-bold mb-3 sm:mb-4 text-base sm:text-lg">
                Contact Us
              </h3>
              <p className="text-white py-1 text-sm sm:text-base">
                Email:
                <a
                  href="mailto:info@oceanspraycarwrap.com"
                  className="text-white hover:text-cyan-400"
                >
                  {" "}
                  info@oceanspraycarwrap.com
                </a>
              </p>
              <p className="text-white py-1 text-sm sm:text-base">
                Phone: +1 (413) 216-0819
              </p>
              <p className="text-white py-1 text-sm sm:text-base">
                Address: 1 Ocean Spray Drive, <br />
                Lakeville-Middleboro, MA 02349, USA
              </p>
            </div>
          </div>
          <p className="text-sm sm:text-base lg:text-lg text-center text-white py-3 sm:py-4 px-4">
            &copy; {new Date().getFullYear()} Ocean Spray. All rights reserved.
          </p>
        </div>
      </footer>
      {/* {</body>} */}
    </>
  );
}
