import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Car, Zap, Shield, Award, MapPin, Phone, Mail, Users, Target, Globe, ChevronRight, ArrowRight, Play, CheckCircle, Star, Battery, Gauge, Wifi } from 'lucide-react';

// Import custom components
import { CustomCursor } from './components/CustomCursor';
import { ParticleSystem } from './components/ParticleSystem';
import { ScrollProgress } from './components/ScrollProgress';
import { LoadingScreen } from './components/LoadingScreen';
import { MagneticButton } from './components/MagneticButton';
import { ThreeDCard } from './components/ThreeDCard';
import { TestDriveModal } from './components/TestDriveModal';
import { VehicleConfigurator } from './components/VehicleConfigurator';
import { AnimatedCounter } from './components/AnimatedCounter';
import { ParallaxSection } from './components/ParallaxSection';
import { SmoothScroll } from './components/SmoothScroll';
import { ThreeScene } from './components/ThreeScene';
import { TextReveal } from './components/TextReveal';
import { ImageSlideshow } from './components/ImageSlideshow';
import { TypewriterEffect } from './components/TypewriterEffect';
import { InfiniteScroll } from './components/InfiniteScroll';
import { GlitchText } from './components/GlitchText';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [isLoading, setIsLoading] = useState(true);
  const [isTestDriveOpen, setIsTestDriveOpen] = useState(false);
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState('');
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [isCarDetailsOpen, setIsCarDetailsOpen] = useState(false);
  const [selectedCarDetails, setSelectedCarDetails] = useState<any>(null);

  const heroImages = [
    'https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=1920',
    'https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=1920'
  ];

  const brandPartners = [
    'TESLA', 'BMW', 'MERCEDES', 'AUDI', 'PORSCHE', 'FERRARI', 'LAMBORGHINI', 'MCLAREN'
  ];

  const typewriterWords = [
    'INNOVATION',
    'PERFORMANCE',
    'SUSTAINABILITY',
    'LUXURY',
    'TECHNOLOGY'
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Update active section based on scroll position
      const sections = ['home', 'vehicles', 'innovation', 'sustainability', 'about'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openTestDrive = (vehicleName: string) => {
    setSelectedVehicle(vehicleName);
    setIsTestDriveOpen(true);
  };

  const openConfigurator = (vehicleName: string) => {
    setSelectedVehicle(vehicleName);
    setIsConfiguratorOpen(true);
  };

  const openCarDetails = (vehicle: any) => {
    setSelectedCarDetails(vehicle);
    setIsCarDetailsOpen(true);
  };

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <SmoothScroll>
      <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden custom-scrollbar">
        <CustomCursor />
        <ScrollProgress />
        <ParticleSystem />
        <ThreeScene />

        {/* Header */}
        <motion.header 
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={`fixed top-0 w-full z-50 transition-all duration-500 ${
            scrollY > 50 ? 'glass-morphism shadow-lg' : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <motion.div 
                className="flex items-center space-x-4"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-orange-400 to-pink-500 rounded-xl flex items-center justify-center transform rotate-12 pulse-glow">
                    <Car className="h-7 w-7 text-white transform -rotate-12" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                </div>
                <div>
                  <h1 className="text-3xl font-black holographic">
                    VelocityForge
                  </h1>
                  <p className="text-xs font-semibold text-orange-500 tracking-widest -mt-1">AUTOMOTIVE</p>
                </div>
              </motion.div>
              
              {/* Desktop Navigation */}
              <nav className="hidden lg:flex space-x-12">
                {['Home', 'Vehicles', 'Innovation', 'Sustainability', 'About'].map((item, index) => (
                  <motion.a 
                    key={item}
                    href={`#${item.toLowerCase()}`} 
                    className={`text-sm font-bold tracking-wide transition-all duration-300 relative group cursor-pointer ${
                      activeSection === item.toLowerCase() 
                        ? 'text-orange-500 neon-glow' 
                        : scrollY > 50 ? 'text-gray-700 hover:text-orange-500' : 'text-white hover:text-orange-300'
                    }`}
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item.toUpperCase()}
                    <span className={`absolute -bottom-2 left-0 h-0.5 bg-orange-500 transition-all duration-300 ${
                      activeSection === item.toLowerCase() ? 'w-full' : 'w-0 group-hover:w-full'
                    }`}></span>
                  </motion.a>
                ))}
              </nav>

              <div className="hidden lg:flex items-center space-x-6">
                <MagneticButton className="text-sm font-bold tracking-wide text-gray-600 hover:text-orange-500 transition-colors cursor-pointer" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                  SUPPORT
                </MagneticButton>
                <MagneticButton className="liquid-button bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-full font-bold text-sm tracking-wide hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer" onClick={() => openConfigurator('APEX')}>
                  CONFIGURE
                </MagneticButton>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className={`lg:hidden transition-colors cursor-pointer ${
                  scrollY > 50 ? 'text-gray-700' : 'text-white'
                }`}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
              {isMenuOpen && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="lg:hidden py-6 border-t border-gray-200"
                >
                  <nav className="flex flex-col space-y-6">
                    {['Home', 'Vehicles', 'Innovation', 'Sustainability', 'About'].map((item, index) => (
                      <motion.a 
                        key={item}
                        href={`#${item.toLowerCase()}`} 
                        className="text-sm font-bold tracking-wide text-gray-700 hover:text-orange-500 transition-colors cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {item.toUpperCase()}
                      </motion.a>
                    ))}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>

        {/* Hero Section */}
        <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden cyberpunk-grid">
          <div className="absolute inset-0 z-0">
            <ImageSlideshow 
              images={heroImages}
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
          </div>
          
          <ParallaxSection speed={0.5} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="max-w-5xl mx-auto">
              <motion.div 
                className="mb-8"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              >
                <span className="inline-block glass-morphism text-white px-6 py-2 rounded-full text-sm font-bold tracking-widest mb-6 data-stream">
                  INTRODUCING THE FUTURE
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-responsive-xl font-black mb-8 leading-none"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.7 }}
              >
                <span className="block text-white">DRIVE</span>
                <span className="block">
                  <TypewriterEffect 
                    words={typewriterWords}
                    className="holographic"
                  />
                </span>
              </motion.h1>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1 }}
              >
                <TextReveal className="text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto font-light">
                  Experience automotive excellence redefined. Where cutting-edge technology meets sustainable innovation in every mile.
                </TextReveal>
              </motion.div>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center items-center"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                <MagneticButton className="group bg-white text-gray-900 px-10 py-4 rounded-full font-bold text-lg hover:bg-gray-100 transition-all duration-300 flex items-center shadow-2xl hover:shadow-3xl hover:scale-105 cursor-pointer liquid-button"
                  onClick={() => setIsExploreOpen(true)}
                >
                  EXPLORE MODELS
                  <ArrowRight className="ml-3 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </MagneticButton>
                <MagneticButton className="group border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 flex items-center cursor-pointer" onClick={() => window.open('https://www.youtube.com/watch?v=fpMLnG-bFBs', '_blank')}>
                  <Play className="mr-3 h-5 w-5" />
                  WATCH FILM
                </MagneticButton>
              </motion.div>
            </div>
          </ParallaxSection>

          {/* Floating Stats */}
          <motion.div 
            className="absolute bottom-20 left-10 hidden lg:block"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.5 }}
          >
            <div className="glass-morphism rounded-2xl p-6 text-white hover-lift">
              <AnimatedCounter end={500} suffix="+" className="text-3xl font-black" />
              <div className="text-sm font-medium opacity-80">MILES RANGE</div>
            </div>
          </motion.div>
          
          <motion.div 
            className="absolute bottom-20 right-10 hidden lg:block"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.7 }}
          >
            <div className="glass-morphism rounded-2xl p-6 text-white hover-lift">
              <div className="text-3xl font-black">2.1s</div>
              <div className="text-sm font-medium opacity-80">0-60 MPH</div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div 
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <div className="w-8 h-14 border-2 border-white/50 rounded-full flex justify-center p-2">
              <div className="w-1 h-4 bg-white/70 rounded-full animate-bounce"></div>
            </div>
          </motion.div>
        </section>

        {/* Brand Partners Scroll */}
        <section className="py-12 bg-gray-900 neural-network">
          <div className="max-w-7xl mx-auto">
            <InfiniteScroll 
              items={brandPartners}
              speed={30}
              className="text-white/30"
            />
          </div>
        </section>

        {/* Vehicle Showcase */}
        <section id="vehicles" className="py-24 bg-gray-50 hologram-effect">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-orange-100 text-orange-600 px-6 py-2 rounded-full text-sm font-bold tracking-widest mb-6">
                OUR LINEUP
              </span>
              <h2 className="text-6xl md:text-7xl font-black mb-8 text-gray-900">
                <GlitchText>ENGINEERED</GlitchText>
                <br />
                <span className="text-gradient">
                  PERFECTION
                </span>
              </h2>
              <TextReveal className="text-xl text-gray-600 max-w-3xl mx-auto font-light">
                Every vehicle represents our commitment to innovation, performance, and sustainable luxury.
              </TextReveal>
            </motion.div>

            {/* Featured Vehicle */}
            <motion.div 
              className="mb-20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <ThreeDCard className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative overflow-hidden">
                    <motion.img 
                      src="https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800" 
                      alt="VelocityForge Apex - Flagship Electric Vehicle" 
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.7 }}
                    />
                    <div className="absolute top-6 left-6">
                      <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-sm font-bold pulse-glow">
                        FLAGSHIP
                      </span>
                    </div>
                  </div>
                  <div className="p-12 flex flex-col justify-center">
                    <motion.h3 
                      className="text-5xl font-black mb-6 text-gray-900"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.2 }}
                      viewport={{ once: true }}
                    >
                      APEX
                    </motion.h3>
                    <motion.p 
                      className="text-lg text-gray-600 mb-8 leading-relaxed"
                      initial={{ opacity: 0, x: 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: 0.4 }}
                      viewport={{ once: true }}
                    >
                      The pinnacle of automotive engineering. Experience unparalleled performance with our most advanced electric powertrain and autonomous driving capabilities.
                    </motion.p>
                    
                    <motion.div 
                      className="grid grid-cols-3 gap-6 mb-8"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.6 }}
                      viewport={{ once: true }}
                    >
                      <div className="text-center">
                        <AnimatedCounter end={520} className="text-3xl font-black text-orange-500 mb-2" />
                        <div className="text-sm font-bold text-gray-500 tracking-wide">MILES RANGE</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-black text-orange-500 mb-2">1.8s</div>
                        <div className="text-sm font-bold text-gray-500 tracking-wide">0-60 MPH</div>
                      </div>
                      <div className="text-center">
                        <AnimatedCounter end={250} className="text-3xl font-black text-orange-500 mb-2" />
                        <div className="text-sm font-bold text-gray-500 tracking-wide">TOP SPEED</div>
                      </div>
                    </motion.div>
                    
                    <motion.div 
                      className="flex gap-4"
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      viewport={{ once: true }}
                    >
                      <MagneticButton 
                        className="flex-1 bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                        onClick={() => openConfigurator('APEX')}
                      >
                        CONFIGURE
                      </MagneticButton>
                      <MagneticButton 
                        className="flex-1 border-2 border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500 py-4 rounded-full font-bold transition-all duration-300 cursor-pointer"
                        onClick={() => openTestDrive('APEX')}
                      >
                        TEST DRIVE
                      </MagneticButton>
                    </motion.div>
                  </div>
                </div>
              </ThreeDCard>
            </motion.div>

            {/* Vehicle Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                {
                  name: "PULSE",
                  type: "COMPACT SEDAN",
                  image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600",
                  price: "FROM $42,000",
                  range: "380 MI",
                  acceleration: "3.2s"
                },
                {
                  name: "SURGE",
                  type: "LUXURY SUV",
                  image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=600",
                  price: "FROM $68,000",
                  range: "420 MI",
                  acceleration: "2.9s"
                },
                {
                  name: "VOLT",
                  type: "PERFORMANCE COUPE",
                  image: "https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=600",
                  price: "FROM $85,000",
                  range: "350 MI",
                  acceleration: "2.4s"
                }
              ].map((vehicle, index) => (
                <motion.div 
                  key={index} 
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden quantum-blur"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -10 }}
                >
                  <div className="relative overflow-hidden">
                    <motion.img 
                      src={vehicle.image} 
                      alt={`VelocityForge ${vehicle.name} - ${vehicle.type}`} 
                      className="w-full h-64 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-8">
                    <div className="text-sm font-bold text-orange-500 tracking-widest mb-2">{vehicle.type}</div>
                    <h4 className="text-3xl font-black text-gray-900 mb-4">{vehicle.name}</h4>
                    <div className="flex justify-between items-center mb-6">
                      <div>
                        <div className="text-lg font-bold text-gray-900">{vehicle.range}</div>
                        <div className="text-xs text-gray-500 font-medium">RANGE</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">{vehicle.acceleration}</div>
                        <div className="text-xs text-gray-500 font-medium">0-60 MPH</div>
                      </div>
                    </div>
                    <div className="text-2xl font-black text-gray-900 mb-6">{vehicle.price}</div>
                    <MagneticButton 
                      className="w-full bg-gray-900 hover:bg-orange-500 text-white py-3 rounded-full font-bold transition-all duration-300 cursor-pointer"
                      onClick={() => openCarDetails(vehicle)}
                    >
                      LEARN MORE
                    </MagneticButton>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Innovation Section */}
        <section id="innovation" className="py-24 bg-white text-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-20">
              <span className="inline-block bg-orange-100 text-orange-600 px-6 py-2 rounded-full text-sm font-bold tracking-widest mb-6">
                INNOVATION
              </span>
              <h2 className="text-6xl md:text-7xl font-black mb-8">
                BEYOND
                <br />
                <span className="text-orange-500">
                  BOUNDARIES
                </span>
              </h2>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
              <div>
                <h3 className="text-4xl font-black mb-8 text-gray-900">AUTONOMOUS INTELLIGENCE</h3>
                <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Our neural network processes over 1 billion data points per second, enabling full self-driving capabilities that adapt and learn from every journey.
                </p>
                
                <div className="space-y-6">
                  {[
                    "360° Environmental Awareness",
                    "Predictive Path Planning",
                    "Real-time Decision Making",
                    "Continuous Learning Updates"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-4">
                      <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      <span className="text-lg font-medium text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="relative">
                <img 
                  src="https://images.pexels.com/photos/35967/mini-cooper-auto-model-vehicle.jpg?auto=compress&cs=tinysrgb&w=800" 
                  alt="Autonomous Technology Dashboard" 
                  className="rounded-3xl shadow-2xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: Battery,
                  title: "NEXT-GEN BATTERY",
                  description: "Revolutionary solid-state technology delivering 50% more energy density and 10-year lifespan."
                },
                {
                  icon: Gauge,
                  title: "PERFORMANCE MODE",
                  description: "Instant torque delivery with adaptive suspension for track-ready performance on demand."
                },
                {
                  icon: Wifi,
                  title: "CONNECTED ECOSYSTEM",
                  description: "Seamless integration with smart infrastructure and real-time traffic optimization."
                }
              ].map((feature, index) => (
                <div key={index} className="bg-gray-50 rounded-2xl p-8 hover:bg-gray-100 transition-colors duration-300">
                  <feature.icon className="h-12 w-12 text-orange-500 mb-6" />
                  <h4 className="text-xl font-bold mb-4 text-gray-900">{feature.title}</h4>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sustainability Section */}
        <section id="sustainability" className="py-24 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                className="relative"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <ThreeDCard>
                  <img 
                    src="https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg?auto=compress&cs=tinysrgb&w=800" 
                    alt="Sustainable Electric Vehicle Manufacturing" 
                    className="rounded-3xl shadow-2xl"
                  />
                </ThreeDCard>
                <motion.div 
                  className="absolute -bottom-6 -right-6 bg-white rounded-2xl p-6 shadow-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <AnimatedCounter end={100} suffix="%" className="text-3xl font-black text-green-600 mb-2" />
                  <div className="text-sm font-bold text-gray-600">CARBON NEUTRAL</div>
                </motion.div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="inline-block bg-green-100 text-green-600 px-6 py-2 rounded-full text-sm font-bold tracking-widest mb-6">
                  SUSTAINABILITY
                </span>
                <h2 className="text-6xl font-black mb-8 text-gray-900">
                  PLANET
                  <br />
                  <span className="bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
                    POSITIVE
                  </span>
                </h2>
                <TextReveal className="text-xl text-gray-600 mb-8 leading-relaxed">
                  Every VelocityForge vehicle is manufactured using 100% renewable energy and recycled materials, creating a positive environmental impact from day one.
                </TextReveal>
                
                <motion.div 
                  className="grid grid-cols-2 gap-8 mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                >
                  <div className="text-center">
                    <div className="text-4xl font-black text-green-500 mb-2">0</div>
                    <div className="text-sm font-bold text-gray-600">EMISSIONS</div>
                  </div>
                  <div className="text-center">
                    <AnimatedCounter end={85} suffix="%" className="text-4xl font-black text-blue-500 mb-2" />
                    <div className="text-sm font-bold text-gray-600">RECYCLED MATERIALS</div>
                  </div>
                  <div className="text-center">
                    <AnimatedCounter end={50} suffix="+" className="text-4xl font-black text-green-500 mb-2" />
                    <div className="text-sm font-bold text-gray-600">COUNTRIES</div>
                  </div>
                  <div className="text-center">
                    <AnimatedCounter end={2000000} suffix="+" className="text-4xl font-black text-blue-500 mb-2" />
                    <div className="text-sm font-bold text-gray-600">TREES PLANTED</div>
                  </div>
                </motion.div>

                <MagneticButton className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-10 py-4 rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer" onClick={() => document.getElementById('sustainability')?.scrollIntoView({ behavior: 'smooth' })}>
                  OUR COMMITMENT
                </MagneticButton>
              </motion.div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <span className="inline-block bg-gray-100 text-gray-600 px-6 py-2 rounded-full text-sm font-bold tracking-widest mb-6">
                ABOUT US
              </span>
              <h2 className="text-6xl md:text-7xl font-black mb-8 text-gray-900">
                FORGING THE
                <br />
                <span className="text-gradient">
                  FUTURE
                </span>
              </h2>
            </motion.div>

            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              {[
                {
                  icon: Users,
                  title: "VISIONARY TEAM",
                  description: "World-class engineers, designers, and innovators united by a shared vision of sustainable mobility."
                },
                {
                  icon: Target,
                  title: "BOLD MISSION",
                  description: "To accelerate the world's transition to sustainable transportation through breakthrough innovation."
                },
                {
                  icon: Award,
                  title: "PROVEN EXCELLENCE",
                  description: "Industry-leading safety ratings, performance benchmarks, and customer satisfaction scores."
                }
              ].map((item, index) => (
                <motion.div 
                  key={index} 
                  className="text-center group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <motion.div 
                    className="w-20 h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-8"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <item.icon className="h-10 w-10 text-white" />
                  </motion.div>
                  <h3 className="text-2xl font-black text-gray-900 mb-4">{item.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </motion.div>
              ))}
            </motion.div>

            <motion.div 
              className="bg-gradient-to-r from-gray-900 to-black rounded-3xl p-16 text-center text-white"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-5xl font-black mb-8 neon-glow">JOIN THE REVOLUTION</h3>
              <TextReveal className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                Be part of the sustainable transportation future. Experience the difference with VelocityForge.
              </TextReveal>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <MagneticButton 
                  className="bg-white text-gray-900 px-10 py-4 rounded-full font-bold hover:bg-gray-100 transition-colors cursor-pointer"
                  onClick={() => openTestDrive('VelocityForge Vehicle')}
                >
                  SCHEDULE TEST DRIVE
                </MagneticButton>
                <MagneticButton className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-4 rounded-full font-bold transition-colors cursor-pointer" onClick={() => window.open('https://www.example.com/careers', '_blank')}>
                  EXPLORE CAREERS
                </MagneticButton>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="inline-block bg-orange-100 text-orange-600 px-6 py-2 rounded-full text-sm font-bold tracking-widest mb-6">
                  CONTACT
                </span>
                <h2 className="text-5xl font-black text-gray-900 mb-8">GET IN TOUCH</h2>
                <TextReveal className="text-xl text-gray-600 mb-12 leading-relaxed">
                  Ready to experience the future of mobility? Our team is here to help you find the perfect VelocityForge vehicle.
                </TextReveal>
                
                <div className="space-y-8">
                  {[
                    {
                      icon: MapPin,
                      title: "HEADQUARTERS",
                      info: "1 Innovation Drive, Austin, TX 78701",
                      color: "from-blue-500 to-purple-500"
                    },
                    {
                      icon: Phone,
                      title: "PHONE",
                      info: "+1 (555) VELOCITY",
                      color: "from-green-500 to-teal-500"
                    },
                    {
                      icon: Mail,
                      title: "EMAIL",
                      info: "hello@velocityforge.com",
                      color: "from-orange-500 to-red-500"
                    }
                  ].map((contact, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center space-x-6"
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 10 }}
                    >
                      <div className={`w-16 h-16 bg-gradient-to-br ${contact.color} rounded-2xl flex items-center justify-center hover-lift`}>
                        <contact.icon className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 mb-1">{contact.title}</h4>
                        <p className="text-gray-600">{contact.info}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div 
                className="bg-white rounded-3xl shadow-2xl p-12"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <form className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 tracking-wide">FIRST NAME</label>
                      <input 
                        type="text" 
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-gray-900 font-medium"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-3 tracking-wide">LAST NAME</label>
                      <input 
                        type="text" 
                        className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-gray-900 font-medium"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 tracking-wide">EMAIL</label>
                    <input 
                      type="email" 
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-gray-900 font-medium"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 tracking-wide">INTEREST</label>
                    <select className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-gray-900 font-medium cursor-pointer">
                      <option>APEX</option>
                      <option>PULSE</option>
                      <option>SURGE</option>
                      <option>VOLT</option>
                      <option>GENERAL INQUIRY</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3 tracking-wide">MESSAGE</label>
                    <textarea 
                      rows={5}
                      className="w-full px-6 py-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-colors text-gray-900 font-medium resize-none"
                      placeholder="Tell us about your interest..."
                    ></textarea>
                  </div>
                  
                  <MagneticButton 
                    className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-5 rounded-xl font-bold text-lg hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer"
                    onClick={() => alert('Message sent! We will contact you soon.')}
                  >
                    SEND MESSAGE
                  </MagneticButton>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-900 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div>
                <motion.div 
                  className="flex items-center space-x-4 mb-6"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500 via-orange-400 to-pink-500 rounded-xl flex items-center justify-center pulse-glow">
                    <Car className="h-7 w-7 text-white" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-white">VelocityForge</h3>
                    <p className="text-sm font-semibold text-orange-400">AUTOMOTIVE</p>
                  </div>
                </motion.div>
                <p className="text-gray-400 leading-relaxed">
                  Forging the future of sustainable mobility through innovative electric vehicles and cutting-edge technology.
                </p>
              </div>
              
              {[
                {
                  title: "VEHICLES",
                  links: ["APEX", "PULSE", "SURGE", "VOLT", "COMPARE"]
                },
                {
                  title: "SERVICES",
                  links: ["TEST DRIVE", "FINANCING", "SERVICE", "CHARGING", "SUPPORT"]
                },
                {
                  title: "COMPANY",
                  links: ["ABOUT", "CAREERS", "NEWS", "INVESTORS", "CONTACT"]
                }
              ].map((section, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="text-lg font-bold text-white mb-6 tracking-wide">{section.title}</h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <motion.li 
                        key={linkIndex}
                        whileHover={{ x: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                      >
                        <a href="#" className="text-gray-400 hover:text-orange-400 transition-colors font-medium cursor-pointer" onClick={() => alert('Navigation coming soon!')}>
                          {link}
                        </a>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div 
              className="border-t border-gray-800 pt-8 text-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <p className="text-gray-400">
                © 2025 VelocityForge Automotive. All rights reserved. | Privacy Policy | Terms of Service
              </p>
            </motion.div>
          </div>
        </footer>

        {/* Modals */}
        <TestDriveModal 
          isOpen={isTestDriveOpen}
          onClose={() => setIsTestDriveOpen(false)}
          vehicleName={selectedVehicle}
        />

        <VehicleConfigurator 
          isOpen={isConfiguratorOpen}
          onClose={() => setIsConfiguratorOpen(false)}
          vehicleName={selectedVehicle}
        />

        {/* Explore Models Modal */}
        {isExploreOpen && (
          <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center">
            <div className="bg-white rounded-3xl p-8 max-w-5xl w-full shadow-2xl relative">
              <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100" onClick={() => setIsExploreOpen(false)}>
                <X className="h-6 w-6" />
              </button>
              <h2 className="text-3xl font-black mb-8 text-center">Explore Our Models</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    name: "APEX",
                    type: "FLAGSHIP EV",
                    image: "https://images.pexels.com/photos/3802508/pexels-photo-3802508.jpeg?auto=compress&cs=tinysrgb&w=800",
                    price: "FROM $120,000",
                    range: "520 MI",
                    acceleration: "1.8s"
                  },
                  {
                    name: "PULSE",
                    type: "COMPACT SEDAN",
                    image: "https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=600",
                    price: "FROM $42,000",
                    range: "380 MI",
                    acceleration: "3.2s"
                  },
                  {
                    name: "SURGE",
                    type: "LUXURY SUV",
                    image: "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=600",
                    price: "FROM $68,000",
                    range: "420 MI",
                    acceleration: "2.9s"
                  },
                  {
                    name: "VOLT",
                    type: "PERFORMANCE COUPE",
                    image: "https://images.pexels.com/photos/544542/pexels-photo-544542.jpeg?auto=compress&cs=tinysrgb&w=600",
                    price: "FROM $85,000",
                    range: "350 MI",
                    acceleration: "2.4s"
                  }
                ].map((vehicle, index) => (
                  <div key={index} className="bg-gray-50 rounded-2xl shadow-lg p-6 flex flex-col items-center">
                    <img src={vehicle.image} alt={vehicle.name} className="w-full h-40 object-cover rounded-xl mb-4" />
                    <div className="text-sm font-bold text-orange-500 tracking-widest mb-2">{vehicle.type}</div>
                    <h4 className="text-2xl font-black text-gray-900 mb-2">{vehicle.name}</h4>
                    <div className="flex justify-between items-center w-full mb-2">
                      <div>
                        <div className="text-lg font-bold text-gray-900">{vehicle.range}</div>
                        <div className="text-xs text-gray-500 font-medium">RANGE</div>
                      </div>
                      <div>
                        <div className="text-lg font-bold text-gray-900">{vehicle.acceleration}</div>
                        <div className="text-xs text-gray-500 font-medium">0-60 MPH</div>
                      </div>
                    </div>
                    <div className="text-xl font-black text-gray-900 mb-4">{vehicle.price}</div>
                    <MagneticButton className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 rounded-full font-bold transition-all duration-300 cursor-pointer" onClick={() => { setSelectedVehicle(vehicle.name); setIsConfiguratorOpen(true); setIsExploreOpen(false); }}>
                      CONFIGURE
                    </MagneticButton>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Car Details Modal */}
        {isCarDetailsOpen && selectedCarDetails && (
          <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center">
            <div className="bg-white rounded-3xl p-8 max-w-4xl w-full shadow-2xl relative">
              <button className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100" onClick={() => setIsCarDetailsOpen(false)}>
                <X className="h-6 w-6" />
              </button>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <img src={selectedCarDetails.image} alt={selectedCarDetails.name} className="w-full h-80 object-cover rounded-2xl" />
                </div>
                <div>
                  <div className="text-sm font-bold text-orange-500 tracking-widest mb-2">{selectedCarDetails.type}</div>
                  <h2 className="text-4xl font-black text-gray-900 mb-4">{selectedCarDetails.name}</h2>
                  <p className="text-lg text-gray-600 mb-6">
                    Experience the perfect blend of performance, luxury, and innovation. The {selectedCarDetails.name} represents the pinnacle of automotive engineering with cutting-edge technology and sustainable design.
                  </p>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-2xl font-black text-orange-500">{selectedCarDetails.range}</div>
                      <div className="text-sm font-bold text-gray-600">RANGE</div>
                    </div>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <div className="text-2xl font-black text-orange-500">{selectedCarDetails.acceleration}</div>
                      <div className="text-sm font-bold text-gray-600">0-60 MPH</div>
                    </div>
                  </div>
                  <div className="text-3xl font-black text-gray-900 mb-6">{selectedCarDetails.price}</div>
                  <div className="flex gap-4">
                    <MagneticButton className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-full font-bold hover:shadow-lg transition-all duration-300 cursor-pointer" onClick={() => { setSelectedVehicle(selectedCarDetails.name); setIsConfiguratorOpen(true); setIsCarDetailsOpen(false); }}>
                      CONFIGURE
                    </MagneticButton>
                    <MagneticButton className="flex-1 border-2 border-gray-300 text-gray-700 hover:border-orange-500 hover:text-orange-500 py-3 rounded-full font-bold transition-all duration-300 cursor-pointer" onClick={() => { openTestDrive(selectedCarDetails.name); setIsCarDetailsOpen(false); }}>
                      TEST DRIVE
                    </MagneticButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </SmoothScroll>
  );
}

export default App;