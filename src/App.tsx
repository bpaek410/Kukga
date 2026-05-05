/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  Phone, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  Globe, 
  ChevronRight, 
  Star, 
  Flame, 
  UtensilsCrossed, 
  Leaf,
  Heart,
  Menu as MenuIcon,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// --- Types ---

interface MenuItem {
  id: number;
  nameEn: string;
  nameKo: string;
  description: string;
  isFavorite?: boolean;
  isVegan?: boolean;
  image?: string;
  emoji: string;
}

// --- Data ---

const MENU_ITEMS: MenuItem[] = [
  {
    id: 1,
    nameEn: "Rosé Topokki",
    nameKo: "로제 떡볶이",
    description: "Creamy, spicy rice cakes in a silky rose cream sauce. A modern twist on a classic.",
    isFavorite: true,
    emoji: "🥘",
    image: "https://kukgatopokki.com/wp-content/uploads/rose-topokki.jpg"
  },
  {
    id: 2,
    nameEn: "Original Spicy Topokki",
    nameKo: "오리지날 떡볶이",
    description: "Classic Korean street-style rice cakes in bold, authentic gochujang sauce.",
    isFavorite: true,
    emoji: "🌶️",
    image: "https://kukgatopokki.com/wp-content/uploads/original-topokki.jpg"
  },
  {
    id: 3,
    nameEn: "Seafood Topokki",
    nameKo: "해물 떡볶이",
    description: "Chewy rice cakes with a rich variety of seafood in our signature spicy sauce.",
    emoji: "🦑",
    image: "https://kukgatopokki.com/wp-content/uploads/seafood-topokki.jpg"
  },
  {
    id: 4,
    nameEn: "Kimbap",
    nameKo: "김밥",
    description: "Perfectly seasoned seaweed rice rolls with fresh vegetables and fillings.",
    emoji: "🍱",
    image: "https://kukgatopokki.com/wp-content/uploads/kimbap.jpg"
  },
  {
    id: 5,
    nameEn: "Fish Cake Skewers",
    nameKo: "어묵",
    description: "Soft, savory fish cakes on skewers served in a warm, comforting broth.",
    emoji: "🍢",
    image: "https://kukgatopokki.com/wp-content/uploads/fish-cake.jpg"
  },
  {
    id: 6,
    nameEn: "Ramen",
    nameKo: "라면",
    description: "Savory, satisfying Korean-style noodle soup with custom toppings.",
    emoji: "🍜",
    image: "https://kukgatopokki.com/wp-content/uploads/ramen.jpg"
  },
  {
    id: 7,
    nameEn: "Fried Rice",
    nameKo: "볶음밥",
    description: "Flavorful Korean-style stir-fried rice, perfect as a side or main.",
    emoji: "🍚",
    image: "https://kukgatopokki.com/wp-content/uploads/fried-rice.jpg"
  },
  {
    id: 8,
    nameEn: "Sweet Potato Fries",
    nameKo: "고구마 튀김",
    description: "Golden crispy fries with a natural sweetness and light crunch.",
    emoji: "🍠",
    image: "https://kukgatopokki.com/wp-content/uploads/sweet-potato-fries.jpg"
  },
  {
    id: 9,
    nameEn: "Squid Fries",
    nameKo: "오징어 튀김",
    description: "Lightly battered crispy squid served with our special dipping sauce.",
    emoji: "🦑",
    image: "https://kukgatopokki.com/wp-content/uploads/squid-fries.jpg"
  },
  {
    id: 10,
    nameEn: "Stuffed Clear Noodles",
    nameKo: "당면 김말이",
    description: "Glass noodles wrapped in seaweed and deep-fried to perfection.",
    emoji: "🥢",
    image: "https://kukgatopokki.com/wp-content/uploads/gim-mari.jpg"
  },
  {
    id: 11,
    nameEn: "Sundae",
    nameKo: "순대",
    description: "Traditional Korean blood sausage, a beloved street food delicacy.",
    emoji: "🍘",
    image: "https://kukgatopokki.com/wp-content/uploads/sundae.jpg"
  },
  {
    id: 12,
    nameEn: "Dumpling / Mandu",
    nameKo: "만두",
    description: "Crispy fried or soft steamed dumplings. (Vegetarian options available)",
    isVegan: true,
    emoji: "🥟",
    image: "https://kukgatopokki.com/wp-content/uploads/mandu.jpg"
  }
];

const REVIEWS = [
  {
    text: "Absolutely the best tteokbokki I've ever had in my life! The texture is perfectly chewy and bouncy. The rosé flavor is just the right balance of creamy and spicy.",
    author: "Google Review",
    rating: 5
  },
  {
    text: "The rosé topokki — you MUST get the rosé version. My friend was eating it like crack. The portions are out of this world!",
    author: "Yelp Review",
    rating: 5
  },
  {
    text: "As good as it gets for Topokki. The lunch box has soondae, tempura, and kimbap alongside the topokki — great deal and amazing variety!",
    author: "Google Review",
    rating: 5
  }
];

// --- Components ---

const LazyImage = ({ src, alt, emoji, className }: { src?: string; alt: string; emoji: string; className?: string }) => {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-cream-100 ${className} flex items-center justify-center`}>
      {(!loaded || error) && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 text-6xl">
          <span>{emoji}</span>
          <span className="text-[10px] uppercase tracking-widest text-red-300 mt-2 font-bold">Kukga Topokki</span>
        </div>
      )}
      {!error && (
        <img
          src={src}
          alt={alt}
          className={`h-full w-full object-cover transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
        />
      )}
    </div>
  );
};

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Menu", href: "#menu" },
    { name: "Locations", href: "#locations" },
    { name: "Hours", href: "#locations" },
    { name: "Social", href: "#social" }
  ];

  return (
    <nav className={`fixed top-0 z-50 w-full transition-all duration-300 ${isScrolled ? "bg-white/95 py-3 shadow-md backdrop-blur-sm" : "bg-transparent py-5"}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4">
        <a href="#home" className="flex flex-col items-start">
          <span className={`text-xl font-black uppercase tracking-tighter ${isScrolled ? "text-red-600" : "text-white"}`}>
            Kukga Topokki
          </span>
          <span className={`text-[10px] font-bold tracking-widest uppercase ${isScrolled ? "text-red-400" : "text-red-200"}`}>
            국가대표 떡볶이
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden items-center space-x-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className={`text-sm font-bold uppercase tracking-widest transition-colors ${isScrolled ? "text-gray-800 hover:text-red-600" : "text-white hover:text-red-300"}`}
            >
              {link.name}
            </a>
          ))}
          <a
            href="#order"
            className="rounded-full bg-red-600 px-6 py-2 text-xs font-black uppercase tracking-widest text-white transition-transform hover:scale-105 active:scale-95"
          >
            Order Now
          </a>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={`md:hidden ${isScrolled ? "text-gray-800" : "text-white"}`}
        >
          {isMobileMenuOpen ? <X size={28} /> : <MenuIcon size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 flex flex-col bg-red-600 px-6 pt-24 md:hidden"
          >
            <div className="flex flex-col space-y-8 text-center text-2xl font-black uppercase tracking-widest text-white">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#order"
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-4 rounded-full border-2 border-white bg-white px-8 py-4 text-red-600"
              >
                Order Now
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default function App() {
  return (
    <div className="min-h-screen bg-app-bg font-sans text-secondary selection:bg-accent/30">
      <Nav />

      {/* Hero Section */}
      <section id="home" className="relative h-screen overflow-hidden">
        {/* Background Overlay */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-secondary/95 to-app-bg z-10" />
          <img 
            src="https://images.unsplash.com/photo-1585032226651-759b368d7246?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80" 
            alt="Korean Food" 
            className="h-full w-full object-cover scale-110 motion-safe:animate-[pulse_10s_ease-in-out_infinite]"
          />
        </div>

        <div className="relative z-20 flex h-full flex-col items-center justify-center px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <span className="mb-4 inline-block rounded-full bg-primary px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] text-white">
              Authentic Korean Street Food
            </span>
            <h1 className="mb-2 text-6xl font-display font-black uppercase tracking-tighter text-white sm:text-8xl md:text-9xl">
              Kukga Topokki
            </h1>
            <h2 className="mb-8 text-2xl font-bold tracking-[0.5em] text-accent sm:text-4xl">
              국가대표 떡볶이
            </h2>
            <p className="mx-auto mb-12 max-w-2xl text-lg font-medium text-gray-100 sm:text-xl">
              Atlanta's #1 Korean Street Food Experience. Bold flavors, fresh ingredients, and the addictive taste of Seoul.
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="tel:4703593963"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-primary px-8 py-5 text-sm font-black uppercase tracking-widest text-white transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(210,43,43,0.5)] sm:w-auto"
              >
                <Phone size={18} />
                <span>Duluth: (470) 359-3963</span>
              </a>
              <a
                href="tel:6783733617"
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-white px-8 py-5 text-sm font-black uppercase tracking-widest text-primary transition-all hover:bg-cream hover:scale-105 hover:shadow-[0_4px_10px_rgba(0,0,0,0.05)] sm:w-auto"
              >
                <Phone size={18} />
                <span>Suwanee: (678) 373-3617</span>
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          animate={{ y: [0, 10, 0] }} 
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 text-white opacity-50"
        >
          <div className="h-10 w-6 rounded-full border-2 border-white flex justify-center pt-2">
            <div className="h-2 w-1 bg-white rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* Brand Story Section */}
      <section className="bg-white py-24 px-4 overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-16 md:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="mb-6 text-4xl font-display font-black uppercase tracking-tighter sm:text-5xl lg:text-6xl text-gray-900">
                The Taste of Korea, <br />
                <span className="text-red-600">Right Here in Georgia</span>
              </h2>
              <p className="mb-10 text-xl leading-relaxed text-gray-600">
                Kukga Topokki — <span className="font-bold text-red-600">국가대표 떡볶이</span> — is one of Atlanta's best-loved Korean street food spots. We serve authentic Tteokbokki, Kimbap, Fish Cake Skewers, Ramen, Fried Rice, and so much more.
              </p>
              <p className="mb-12 text-xl leading-relaxed text-gray-600">
                Made with only the finest ingredients using original Korean street food techniques. Come experience the addictive sweet and spicy flavors at our Duluth or Suwanee locations.
              </p>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
                {[
                  { icon: <Flame className="text-primary" />, title: "Authentic Flavors" },
                  { icon: <UtensilsCrossed className="text-primary" />, title: "Fresh Ingredients" },
                  { icon: <Heart className="text-primary" />, title: "Family Friendly" }
                ].map((badge, idx) => (
                  <div key={idx} className="flex flex-col items-start gap-3 rounded-2xl bg-cream p-6 border border-black/5 transition-hover hover:border-primary/20">
                    {badge.icon}
                    <span className="text-xs font-black uppercase tracking-widest text-secondary">{badge.title}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-square overflow-hidden rounded-3xl shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Restaurant Interior" 
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 h-32 w-32 rounded-full bg-primary flex items-center justify-center text-white border-8 border-white shadow-xl animate-bounce md:flex hidden">
                <span className="text-xs font-black uppercase tracking-widest text-center">Since<br/>2019</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="bg-app-bg py-24 px-4 text-secondary">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">Our Favorites</span>
            <h2 className="mt-2 text-5xl font-display font-black uppercase tracking-tighter text-secondary sm:text-6xl">
              Menu Highlights
            </h2>
            <div className="mx-auto mt-4 h-1 w-24 bg-primary" />
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {MENU_ITEMS.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.05 }}
                className="group relative flex flex-col overflow-hidden rounded-[16px] bg-white shadow-[0_4px_10px_rgba(0,0,0,0.03)] transition-all hover:-translate-y-2 hover:shadow-xl border border-black/5"
              >
                <div className="relative aspect-[4/3]">
                  <LazyImage 
                    src={item.image} 
                    alt={item.nameEn} 
                    emoji={item.emoji}
                    className="h-full w-full"
                  />
                  {item.isFavorite && (
                    <div className="absolute left-4 top-4 rounded-full bg-accent px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg flex items-center gap-1">
                      <Flame size={12} />
                      Favorite
                    </div>
                  )}
                  {item.isVegan && (
                    <div className="absolute right-4 top-4 rounded-full bg-green-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white shadow-lg flex items-center gap-1">
                      <Leaf size={12} />
                      Vegan
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6 text-center bg-cream/30">
                  <h3 className="text-xl font-black text-secondary uppercase tracking-tight">
                    {item.nameEn}
                  </h3>
                  <p className="mt-1 text-xs font-bold text-primary uppercase tracking-widest">
                    {item.nameKo}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-stone-500">
                    {item.description}
                  </p>
                </div>
                <div className="mt-auto border-t border-black/5 p-4 bg-white">
                   <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-secondary py-3 text-[10px] font-black uppercase tracking-widest text-white transition-all hover:bg-primary group-hover:bg-primary">
                     View Details <ChevronRight size={14} />
                   </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Order Now Call to Action */}
      <section id="order" className="relative overflow-hidden bg-primary py-24 px-4 text-white">
        <div className="absolute right-0 top-0 -translate-y-1/4 translate-x-1/4 opacity-10">
          <UtensilsCrossed size={600} />
        </div>
        
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-display font-black uppercase tracking-tighter sm:text-6xl">
            READY TO ORDER? <br />
            <span className="text-secondary/40">Give Us a Call!</span>
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-xl font-medium text-cream/90">
            Fastest delivery via direct call! For takeout, delivery, or dine-in reservations — just call your nearest location. 
          </p>

          <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
            {[
              { loc: "Duluth", phone: "(470) 359-3963", raw: "4703593963" },
              { loc: "Suwanee", phone: "(678) 373-3617", raw: "6783733617" }
            ].map((btn, idx) => (
              <a
                key={idx}
                href={`tel:${btn.raw}`}
                className="group flex w-full items-center justify-center gap-4 rounded-[16px] bg-white px-10 py-6 text-left text-primary transition-all hover:scale-105 active:scale-95 shadow-xl sm:w-auto"
              >
                <div className="rounded-full bg-cream p-4 transition-colors group-hover:bg-primary/10">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-accent">📍 {btn.loc} Location</p>
                  <p className="text-xl font-black tracking-tight">{btn.phone}</p>
                </div>
              </a>
            ))}
          </div>
          <p className="mt-12 text-sm font-bold uppercase tracking-[0.2em] text-cream/70">
            Takeout • Delivery • Reservations
          </p>
        </div>
      </section>

      {/* Locations & Hours Section */}
      <section id="locations" className="bg-white py-24 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16">
            <h2 className="text-5xl font-display font-black uppercase tracking-tighter text-gray-900 sm:text-6xl">
              Visit Us
            </h2>
            <p className="mt-2 text-xl text-gray-500">Two convenient locations in Georgia to serve you the best street food.</p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            {/* Duluth Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col overflow-hidden rounded-[16px] bg-white border border-black/5 p-8 sm:p-12 shadow-[0_4px_10px_rgba(0,0,0,0.03)]"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-10">
                <div>
                  <h3 className="text-4xl font-black uppercase tracking-tight text-primary">Duluth</h3>
                  <p className="mt-4 text-lg font-medium text-stone-600">
                    2570 Pleasant Hill Rd #107, <br />
                    Duluth, GA 30096
                  </p>
                  <a href="tel:4703593963" className="mt-4 inline-flex items-center gap-2 text-xl font-black tracking-tight text-secondary group">
                    <Phone className="text-primary group-hover:animate-shake" size={20} /> (470) 359-3963
                  </a>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2">
                  <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest">
                    <Clock size={16} /> Business Hours
                  </div>
                  <ul className="text-right text-sm font-medium text-stone-400 space-y-1">
                    <li className="flex justify-between gap-4 w-full"><span>Mon - Sat</span> <span>11:00 AM - 8:30 PM</span></li>
                    <li className="flex justify-between gap-4 w-full"><span>Sun</span> <span>11:30 AM - 8:00 PM</span></li>
                  </ul>
                </div>
              </div>
              <div className="aspect-video w-full overflow-hidden rounded-[16px] bg-cream grayscale hover:grayscale-0 transition-all duration-700 mb-8">
                <iframe
                  title="Duluth Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3310.2319024344445!2d-84.14154942428867!3d33.951554973194095!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88f5a34ec8b3a0b5%3A0xe54d318e2689c16c!2s2570%20Pleasant%20Hill%20Rd%20%23107%2C%20Duluth%2C%20GA%2030096!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                ></iframe>
              </div>
              <a 
                href="https://maps.google.com/?q=2570+Pleasant+Hill+Rd+#107+Duluth+GA+30096"
                target="_blank"
                rel="no-referrer"
                className="flex items-center justify-center gap-3 rounded-xl bg-secondary py-6 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-primary"
              >
                Get Directions <MapPin size={18} />
              </a>
            </motion.div>

            {/* Suwanee Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="flex flex-col overflow-hidden rounded-[16px] bg-white border border-black/5 p-8 sm:p-12 shadow-[0_4px_10px_rgba(0,0,0,0.03)]"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 mb-10">
                <div>
                  <h3 className="text-4xl font-black uppercase tracking-tight text-primary">Suwanee</h3>
                  <p className="mt-4 text-lg font-medium text-stone-600">
                    1291 Old Peachtree Rd NW #207, <br />
                    Suwanee, GA 30024
                  </p>
                  <a href="tel:6783733617" className="mt-4 inline-flex items-center gap-2 text-xl font-black tracking-tight text-secondary group">
                    <Phone className="text-primary group-hover:animate-shake" size={20} /> (678) 373-3617
                  </a>
                </div>
                <div className="flex flex-col items-start sm:items-end gap-2">
                  <div className="flex items-center gap-2 text-primary font-black text-xs uppercase tracking-widest">
                    <Clock size={16} /> Business Hours
                  </div>
                  <ul className="text-right text-sm font-medium text-stone-400 space-y-1">
                    <li className="flex justify-between gap-4 w-full"><span>Mon - Sat</span> <span>11:00 AM - 9:00 PM</span></li>
                    <li className="flex justify-between gap-4 w-full"><span>Sun</span> <span>11:00 AM - 8:00 PM</span></li>
                  </ul>
                </div>
              </div>
              <div className="aspect-video w-full overflow-hidden rounded-[16px] bg-cream grayscale hover:grayscale-0 transition-all duration-700 mb-8">
                <iframe
                  title="Suwanee Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.8111956149454!2d-84.0624021242838!3d34.01255567316712!2m3!1f0!2f0!3f0!3m2!i1024!2i768!4f13.1!3m3!1m2!1s0x88f5bd0a647d6d7b%3A0x6e2c88f7b57b98d!2s1291%20Old%20Peachtree%20Rd%20NW%20Suite%20207%2C%20Suwanee%2C%20GA%2030024!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                ></iframe>
              </div>
              <a 
                href="https://maps.google.com/?q=1291+Old+Peachtree+Rd+NW+Suite+207+Suwanee+GA+30024"
                target="_blank"
                rel="no-referrer"
                className="flex items-center justify-center gap-3 rounded-xl bg-secondary py-6 text-sm font-black uppercase tracking-widest text-white transition-all hover:bg-primary"
              >
                Get Directions <MapPin size={18} />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section id="social" className="bg-stone-900 py-24 px-4 text-white overflow-hidden">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 text-center">
            <h2 className="text-5xl font-display font-black uppercase tracking-tighter sm:text-6xl">
              Follow Our Food Journey <span className="inline-block animate-bounce">🍜</span>
            </h2>
            <p className="mt-4 text-xl text-stone-400">See the latest dishes, specials, and more on our social channels.</p>
          </div>

          <div className="flex flex-wrap justify-center gap-6 mb-20">
            {[
              { 
                icon: <Instagram size={20} />, 
                name: "Instagram", 
                href: "https://www.instagram.com/kukgatopokki_official/",
                color: "bg-[#E1306C]"
              },
              { 
                icon: <Facebook size={20} />, 
                name: "Facebook", 
                href: "https://www.facebook.com/kukgatopokki",
                color: "bg-[#1877F2]"
              },
              { 
                icon: <Globe size={20} />, 
                name: "Official Website", 
                href: "https://kukgatopokki.com",
                color: "bg-primary"
              }
            ].map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="no-referrer"
                className={`flex items-center gap-3 rounded-full ${social.color} px-8 py-4 text-sm font-black uppercase tracking-widest text-white transition-transform hover:scale-110 active:scale-95 shadow-lg`}
              >
                {social.icon} {social.name}
              </a>
            ))}
          </div>

          {/* Social Mockup */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="group relative aspect-square overflow-hidden rounded-2xl bg-stone-800">
                <div className="absolute inset-0 z-10 bg-black/40 opacity-0 transition-opacity group-hover:opacity-100 flex items-center justify-center">
                   <Instagram className="text-white" size={32} />
                </div>
                <div className="h-full w-full bg-gradient-to-br from-stone-800 to-stone-700 animate-pulse" />
              </div>
            ))}
          </div>
          <p className="mt-8 text-center text-sm font-bold uppercase tracking-[0.3em] text-stone-500">
            @kukgatopokki_official — Follow us for daily food photos!
          </p>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-white py-24 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 flex flex-col items-center justify-between gap-6 md:flex-row md:items-end">
            <div>
              <span className="text-xs font-black uppercase tracking-widest text-red-600">Loved by Locals</span>
              <h2 className="mt-2 text-5xl font-display font-black uppercase tracking-tighter text-gray-900 sm:text-6xl">
                What Our Fans Say
              </h2>
            </div>
            <div className="flex items-center gap-2 rounded-2xl bg-stone-50 p-6 border border-stone-100">
              <div className="flex text-orange-400">
               {[1, 2, 3, 4, 5].map((s) => <Star key={s} size={20} fill="currentColor" />)}
              </div>
              <span className="text-lg font-black text-gray-900">4.8 / 5.0</span>
            </div>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {REVIEWS.map((review, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative flex flex-col rounded-[16px] bg-white p-10 shadow-[0_4px_10px_rgba(0,0,0,0.03)] border border-black/5 hover:border-primary/20 transition-colors"
              >
                <div className="absolute -top-4 -left-2 text-8xl font-serif text-primary/10 select-none">“</div>
                <div className="relative z-10 flex flex-col h-full text-secondary">
                  <div className="mb-6 flex">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#F4A261" className="text-accent" />
                    ))}
                  </div>
                  <p className="mb-8 text-sm font-medium leading-relaxed italic text-stone-600">
                    "{review.text}"
                  </p>
                  <p className="mt-auto text-xs font-black uppercase tracking-widest text-primary">
                    — {review.author}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-50 py-12 px-4 border-t border-stone-200">
        <div className="mx-auto max-w-7xl flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center md:items-start">
            <span className="text-xl font-black uppercase tracking-tighter text-red-600">
              Kukga Topokki
            </span>
            <span className="text-[10px] font-bold tracking-widest uppercase text-red-400">
              국가대표 떡볶이
            </span>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-xs font-black uppercase tracking-[0.2em] text-gray-500">
            <a href="#home" className="hover:text-red-600">Home</a>
            <a href="#menu" className="hover:text-red-600">Menu</a>
            <a href="#locations" className="hover:text-red-600">Locations</a>
            <a href="#social" className="hover:text-red-600">Social</a>
          </div>

          <div className="text-center text-[10px] font-bold uppercase tracking-widest text-gray-400">
            © {new Date().getFullYear()} Kukga Topokki. <br className="sm:hidden" /> All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
