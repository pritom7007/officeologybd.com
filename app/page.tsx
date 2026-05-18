'use client';

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Instagram, 
  ShoppingBag, 
  ArrowRight, 
  Sliders, 
  Truck, 
  Package, 
  MapPin, 
  X, 
  Inbox, 
  CheckSquare, 
  Send, 
  Bell, 
  CheckCircle,
  Copy,
  Plus,
  Minus,
  Check
} from 'lucide-react';

const PRODUCTS = [
    {
        id: "1",
        name: "The Executive Walnut Desk Mat",
        category: "mats",
        price: 1850,
        rating: "4.9",
        reviews: "122",
        badge: "Top Seller",
        image: "⌨️",
        desc: "Premium felt backing overlaid with vegan leather for high precision optical mouse tracking.",
        features: ["Water resistant", "Scratch proof", "Non-slip grip bottom"]
    },
    {
        id: "2",
        name: "Merino Wool Felt Sleeve Mat - Light Oak",
        category: "mats",
        price: 1450,
        rating: "4.8",
        reviews: "78",
        badge: "Cozy Choice",
        image: "🪵",
        desc: "Thick natural merino felt layer adding immediate sound absorption and comfortable palm cushioning.",
        features: ["100% natural felt", "Quiet acoustics", "Soft hand feel"]
    },
    {
        id: "3",
        name: "Dual-Tier Walnut Monitor Shelf Riser",
        category: "risers",
        price: 3499,
        rating: "5.0",
        reviews: "160",
        badge: "Hardwood",
        image: "🖥️",
        desc: "Ergonomically lifts screens to eye level. Stores keyboards and books directly underneath.",
        features: ["Solid 2cm walnut board", "Cast steel feet", "Supports up to 40kg"]
    },
    {
        id: "4",
        name: "Aesthetic Brass Weighted Pen Stand Block",
        category: "stationery",
        price: 950,
        rating: "4.9",
        reviews: "45",
        badge: "Accents",
        image: "✒️",
        desc: "Machined from solid brass billet. Holds your favorite ink pen standing proud.",
        features: ["Real premium brass", "Soft non-slip padding base", "Patina aging over time"]
    },
    {
        id: "5",
        name: "Undated Focus Daily Planner & Organizer",
        category: "stationery",
        price: 750,
        rating: "4.7",
        reviews: "32",
        badge: "Must-Have",
        image: "📓",
        desc: "Thick 120GSM acid-free aesthetic paper, undated lay-flat binding to structure your thoughts.",
        features: ["180 flat spread", "Habit trackers", "Task matrices"]
    },
    {
        id: "6",
        name: "Ambient Aura Desk LED Task Light Bar",
        category: "risers",
        price: 2450,
        rating: "4.9",
        reviews: "92",
        badge: "New Launch",
        image: "💡",
        desc: "Clamps safely onto back of monitors to splash dynamic warm glow downward without screen glare.",
        features: ["USB powered", "Adjustable kelvin temperature", "Touch dimming control"]
    }
];

export default function Home() {
  const [filter, setFilter] = useState('all');
  const [selectedStyleId, setSelectedStyleId] = useState('');
  const [selectedStyleName, setSelectedStyleName] = useState('');
  const [selectedFocusId, setSelectedFocusId] = useState('');
  const [selectedFocusName, setSelectedFocusName] = useState('');
  const [quizResult, setQuizResult] = useState<{title: string, prompt: string, recommendedIds: string[]} | null>(null);

  const [cartOpen, setCartOpen] = useState(false);
  const [cart, setCart] = useState<(typeof PRODUCTS[0] & {quantity: number})[]>([]);
  const [toastMessage, setToastMessage] = useState('');
  const [isCheckoutForm, setIsCheckoutForm] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [orderInfo, setOrderInfo] = useState({ ref: '', addr: '' });

  const [custForm, setCustForm] = useState({ name: '', phone: '', address: '' });

  useEffect(() => {
    if (selectedStyleId && selectedFocusId) {
       let vibeTitleText = "";
       let promptText = "";
       let recommendedIds: string[] = [];

       if (selectedStyleId === 'cozy-walnut' && selectedFocusId === 'coding') {
           vibeTitleText = "The Cozy Dark-Mode Developer Cabin";
           promptText = "A high-end cozy developer workspace featuring rich walnut woods, black leather desk pad, glowing split keyboard, dual vertical screen mounts, detailed ambient light, realistic 8k, warm cinematic photography --ar 16:9";
           recommendedIds = ["1", "3", "6"];
       } else if (selectedStyleId === 'cozy-walnut') {
           vibeTitleText = "The Creative Brass & Timber Sanctuary";
           promptText = "A warm writer study room filled with natural oak shelves, warm brass accents, leather journal on a deep brown desk pad, high quality desk organization, soft glow --ar 16:9";
           recommendedIds = ["1", "4", "5"];
       } else if (selectedStyleId === 'minimal-nordic' && selectedFocusId === 'writing') {
           vibeTitleText = "Nordic Clean Planning Studio";
           promptText = "Light oak minimalist studio workspace, warm sunlight beams, minimal grey wool felt desk mat, lay-flat undated journal with pen, aesthetic light cup, award winning architecture style --ar 16:9";
           recommendedIds = ["2", "4", "5"];
       } else if (selectedStyleId === 'minimal-nordic') {
           vibeTitleText = "The Scandinavian Executive Boardroom";
           promptText = "Ultra clean, minimal Scandinavian office workspace, white wood desk, light grey premium desk sleeve, high tech light bar, aesthetic cable routes --ar 16:9";
           recommendedIds = ["2", "3", "6"];
       } else if (selectedStyleId === 'cyberpunk-stealth') {
           vibeTitleText = "The Stealth Tech Commander Console";
           promptText = "An intense dark mode high tech workspace with matte black components, subtle purple and pink backlight led glow, deep space desk mat, metallic structures --ar 16:9";
           recommendedIds = ["1", "3", "6"];
       } else {
           vibeTitleText = "Aesthetic Creative Planning Station";
           promptText = "A beautiful creative desk setup, delicate warm light, planner with open daily spread, soft pink and light tan accents, elegant ink pen in brass dock --ar 16:9";
           recommendedIds = ["2", "4", "5"];
       }

       setQuizResult({ title: vibeTitleText, prompt: promptText, recommendedIds });
    }
  }, [selectedStyleId, selectedFocusId]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
        setToastMessage('');
    }, 3000);
  };

  const addToCart = (id: string, silent = false) => {
      const product = PRODUCTS.find(p => p.id === id);
      if (!product) return;
      
      setCart(prev => {
          const existing = prev.find(i => i.id === id);
          if (existing) {
              return prev.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i);
          }
          return [...prev, { ...product, quantity: 1 }];
      });
      if (!silent) {
          showToast("Premium workspace accessory added to basket!");
      }
  };

  const updateQuantity = (id: string, change: number) => {
      setCart(prev => {
          return prev.map(item => {
              if (item.id === id) {
                  return { ...item, quantity: item.quantity + change };
              }
              return item;
          }).filter(item => item.quantity > 0);
      });
  };

  const addBundleToCart = (ids: string[]) => {
      ids.forEach(id => addToCart(id, true));
      showToast("Setup combo added to your workspace basket!");
      setCartOpen(true);
  };

  const submitFinalOrder = () => {
      if (!custForm.name || !custForm.phone || !custForm.address) {
          showToast("Please complete delivery details!");
          return;
      }
      setOrderInfo({
          ref: `#OFC-${Math.floor(1000 + Math.random() * 9000)}`,
          addr: custForm.address
      });
      setCartOpen(false);
      setShowSuccessModal(true);
      setCart([]);
      setIsCheckoutForm(false);
      setCustForm({ name: '', phone: '', address: '' });
  };

  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const deliveryFee = subtotal > 3000 || subtotal === 0 ? 0 : 120;
  const grandTotal = subtotal + deliveryFee;
  const totalItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const filteredProducts = filter === 'all' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  return (
    <>
      <div className="bg-brand-950 text-brand-100 text-xs py-2 px-4 text-center tracking-wider font-semibold">
          ✨ FREE DELIVERY IN BANGLADESH ON ORDERS OVER ৳3,000 | Aesthetic Desk Essentials
      </div>

      <header className="sticky top-0 z-40 bg-brand-50/90 backdrop-blur-md border-b border-brand-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
              <a href="#" className="flex items-center gap-2 group">
                  <div className="w-10 h-10 rounded-xl bg-brand-900 flex items-center justify-center text-brand-100 font-serif text-xl font-bold transition-transform duration-300 group-hover:rotate-6">
                      O
                  </div>
                  <div>
                      <span className="font-serif text-2xl font-bold tracking-tight text-brand-950">officeology</span>
                      <span className="text-xs block font-bold tracking-widest text-brand-500 uppercase -mt-1">Bangladesh</span>
                  </div>
              </a>

              <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-neutral-600">
                  <a href="#shop" className="hover:text-brand-700 transition-colors">Shop Essentials</a>
                  <a href="#architect" className="hover:text-brand-700 transition-colors flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-brand-500" /> AI Desk Architect
                  </a>
                  <a href="#instagram" className="hover:text-brand-700 transition-colors">Instagram Feed</a>
                  <a href="#why-us" className="hover:text-brand-700 transition-colors">Our Standard</a>
              </nav>

              <div className="flex items-center gap-4">
                  <a href="https://www.instagram.com/officeologybd/" target="_blank" rel="noreferrer" className="p-2 text-neutral-600 hover:text-brand-600 transition-colors" title="Follow us on Instagram">
                      <Instagram className="w-5 h-5" />
                  </a>
                  
                  <button onClick={() => setCartOpen(true)} className="relative p-2.5 bg-white border border-brand-200 rounded-xl hover:border-brand-400 text-neutral-800 transition-all flex items-center justify-center shadow-sm">
                      <ShoppingBag className="w-5 h-5" />
                      <span className={`absolute -top-1.5 -right-1.5 bg-brand-600 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center transition-transform ${totalItemsCount > 0 ? 'scale-100' : 'scale-0'}`}>
                          {totalItemsCount}
                      </span>
                  </button>
              </div>
          </div>
      </header>

      <section className="relative min-h-[80vh] flex items-center hero-gradient pt-8 pb-16 overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-6 space-y-6 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-100 border border-brand-200 text-brand-800 text-xs font-semibold uppercase tracking-wider">
                      <Sparkles className="w-3.5 h-3.5" /> Curated Aesthetics for Productivity
                  </div>
                  <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-950 font-semibold leading-[1.15]">
                      Curate your workspace. <br />
                      <span className="italic text-brand-600">Elevate your mind.</span>
                  </h1>
                  <p className="text-neutral-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                      Premium desk organizers, leather felt mats, and minimalist study essentials meticulously handcrafted to turn your cluttered table into an office of absolute inspiration. Delivered all across Bangladesh.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                      <a href="#shop" className="w-full sm:w-auto px-8 py-4 bg-brand-900 hover:bg-brand-950 text-brand-50 text-center font-bold rounded-xl transition-all shadow-lg hover:shadow-brand-900/10 flex items-center justify-center gap-2">
                          Browse Desk Essentials <ArrowRight className="w-4 h-4" />
                      </a>
                      <a href="#architect" className="w-full sm:w-auto px-8 py-4 bg-white hover:bg-brand-100 text-brand-900 text-center font-bold rounded-xl transition-all border border-brand-200 flex items-center justify-center gap-2">
                          <Sliders className="w-4 h-4" /> AI Workspace Planner
                      </a>
                  </div>

                  <div className="grid grid-cols-3 gap-6 pt-8 border-t border-brand-200/60 max-w-md mx-auto lg:mx-0">
                      <div>
                          <span className="block text-2xl font-bold text-brand-950">5.0 ★</span>
                          <span className="text-xs text-neutral-500 font-medium">Customer Rating</span>
                      </div>
                      <div>
                          <span className="block text-2xl font-bold text-brand-950">15k+</span>
                          <span className="text-xs text-neutral-500 font-medium">Insta Community</span>
                      </div>
                      <div>
                          <span className="block text-2xl font-bold text-brand-950">Dhaka</span>
                          <span className="text-xs text-neutral-500 font-medium">Local Showroom Setup</span>
                      </div>
                  </div>
              </div>

              <div className="lg:col-span-6 relative flex justify-center">
                  <div className="relative w-full max-w-[500px] aspect-square bg-gradient-to-tr from-brand-100 to-brand-50 rounded-3xl p-8 border border-brand-200/80 shadow-2xl flex flex-col justify-between">
                      <div className="w-full h-full flex flex-col justify-between relative">
                          <div className="self-center w-36 h-20 border-4 border-brand-900 bg-neutral-900 rounded shadow-md flex items-center justify-center overflow-hidden">
                              <div className="text-[8px] text-brand-300 font-serif tracking-widest uppercase">Officeology</div>
                          </div>

                          <div className="flex flex-col items-center mt-auto w-full">
                              <div className="w-64 h-36 bg-neutral-900 rounded-xl p-2 shadow-xl border border-neutral-700 flex flex-col justify-between relative">
                                  <div className="w-1.5 h-1.5 rounded-full bg-red-500 absolute top-2 right-2"></div>
                                  <div className="w-full h-full bg-neutral-800 rounded-lg flex items-center justify-center p-3">
                                      <div className="space-y-1.5 w-full">
                                          <div className="h-1 bg-brand-400/20 rounded w-1/3"></div>
                                          <div className="h-2 bg-brand-300/40 rounded w-4/5"></div>
                                          <div className="h-1 bg-brand-400/20 rounded w-1/2"></div>
                                      </div>
                                  </div>
                              </div>
                              <div className="w-72 h-4 bg-brand-700 rounded shadow-md -mt-1 border-b-2 border-brand-900 flex justify-between px-8">
                                  <div className="w-2 h-4 bg-brand-800"></div>
                                  <div className="w-2 h-4 bg-brand-800"></div>
                              </div>

                              <div className="w-80 h-24 bg-neutral-700/90 rounded-t-xl mt-2 p-3 shadow-inner relative border-t border-neutral-600">
                                  <div className="w-40 h-8 bg-neutral-100 rounded mx-auto border border-neutral-300 shadow-sm p-1 grid grid-cols-12 gap-0.5">
                                      <div className="bg-brand-300 col-span-1 rounded-sm"></div>
                                      <div className="bg-neutral-200 col-span-10 rounded-sm"></div>
                                      <div className="bg-brand-500 col-span-1 rounded-sm"></div>
                                  </div>
                                  <div className="w-6 h-6 rounded-full bg-brand-900 absolute right-8 top-4 shadow border border-brand-200 flex items-center justify-center">
                                      <div className="w-4 h-4 rounded-full bg-brand-800"></div>
                                  </div>
                                  <div className="w-1 h-8 bg-brand-300 absolute left-8 top-3 transform rotate-45 rounded"></div>
                                  <div className="w-3 h-3 bg-brand-900 rounded-full absolute left-6 top-8 shadow"></div>
                              </div>
                          </div>
                      </div>

                      <div className="absolute -top-4 -left-4 bg-white p-3 rounded-2xl border border-brand-200 shadow-lg flex items-center gap-3 animate-bounce" style={{animationDuration: '3s'}}>
                          <span className="flex h-3 w-3 relative">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-600"></span>
                          </span>
                          <div className="text-xs">
                              <span className="font-bold text-brand-950 block">New Launch 🇧🇩</span>
                              <span className="text-neutral-500 text-[10px]">Solid Walnut Riser</span>
                          </div>
                      </div>
                      
                      <div className="absolute -bottom-4 -right-4 bg-brand-950 text-white p-3 rounded-2xl border border-neutral-800 shadow-lg flex items-center gap-2">
                          <Truck className="w-4 h-4 text-brand-300" />
                          <div className="text-left text-[11px]">
                              <span className="font-bold block text-brand-100">Same-Day Delivery</span>
                              <span className="text-brand-300">Within Dhaka Metro</span>
                          </div>
                      </div>
                  </div>
              </div>

          </div>
      </section>

      <section id="architect" className="py-20 bg-white border-y border-brand-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="text-center space-y-4 mb-12">
                  <span className="text-brand-600 font-bold uppercase tracking-widest text-xs block">Vibe Check & Planner</span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-brand-950 font-semibold">AI Workspace Architect</h2>
                  <p className="text-neutral-600 max-w-xl mx-auto text-sm sm:text-base">
                      Unsure which items suit your workflow? Choose your aesthetic preferences, and our tool will construct a tailored AI prompt for your dream desk space AND recommend the exact products to achieve it.
                  </p>
              </div>

              <div className="bg-brand-50 rounded-3xl p-6 sm:p-10 border border-brand-200 shadow-xl space-y-8">
                  
                  <div className="flex items-center justify-between pb-6 border-b border-brand-200">
                      <div className="flex items-center gap-2">
                          <span className="w-7 h-7 rounded-full bg-brand-900 text-brand-100 font-bold text-xs flex items-center justify-center">1</span>
                          <span className="text-xs font-bold text-neutral-800">Choose Aesthetic</span>
                      </div>
                      <div className="w-12 h-0.5 bg-brand-200"></div>
                      <div className="flex items-center gap-2">
                          <span className={`w-7 h-7 rounded-full ${selectedStyleId ? 'bg-brand-900 text-brand-100' : 'bg-white text-neutral-400 border border-brand-200'} font-bold text-xs flex items-center justify-center transition-colors`}>2</span>
                          <span className={`text-xs font-bold ${selectedStyleId ? 'text-neutral-800' : 'text-neutral-500'} transition-colors`}>Choose Focus</span>
                      </div>
                  </div>

                  <div className="space-y-4">
                      <h3 className="font-bold text-brand-950 text-base">Which aesthetic matches your mood?</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {[
                              {id: 'cozy-walnut', icon: '🪵', title: 'Cozy Warm Walnut', desc: 'Rich woods, thick dark felt, amber ambient lights, brass accent elements.'},
                              {id: 'minimal-nordic', icon: '🏔️', title: 'Minimalist Nordic', desc: 'Light oak timber, light grey felt, soft warm lighting, ultra-clean desk organizer lines.'},
                              {id: 'cyberpunk-stealth', icon: '🌌', title: 'Dark Stealth & RGB', desc: 'Full matte black components, neon backlight strip, dynamic tech widgets.'},
                              {id: 'pastel-creative', icon: '🌸', title: 'Creative Pastel Aesthetic', desc: 'Soft pinks, whites, cozy planners, elegant calligraphy pen blocks.'}
                          ].map(style => (
                              <button key={style.id} onClick={() => setSelectedStyleId(style.id)} className={`text-left p-4 rounded-xl bg-white border ${selectedStyleId === style.id ? 'border-brand-600 bg-brand-100/40' : 'border-brand-200 hover:border-brand-500'} transition-all flex items-start gap-3 group`}>
                                  <div className="w-10 h-10 shrink-0 rounded-lg bg-brand-100 flex items-center justify-center text-brand-700 font-bold group-hover:scale-110 transition-transform">{style.icon}</div>
                                  <div>
                                      <h4 className="font-bold text-brand-950 text-sm">{style.title}</h4>
                                      <p className="text-xs text-neutral-500">{style.desc}</p>
                                  </div>
                              </button>
                          ))}
                      </div>
                  </div>

                  <div className={`space-y-4 transition-all duration-300 ${!selectedStyleId ? 'opacity-50 pointer-events-none' : ''}`}>
                      <h3 className="font-bold text-brand-950 text-base">What is the primary function of your desk?</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                           {[
                              {id: 'coding', icon: '💻', title: 'Coding & Engineering', desc: 'Dual monitor, solid ergonomic wrist wrest, mechanical keycaps, cable tidy clamps.'},
                              {id: 'writing', icon: '✍️', title: 'Deep Writing & Planning', desc: 'Undated planners, solid brass tray, heavy weighted fountain pen, paperweight.'},
                              {id: 'creative', icon: '🎨', title: 'Digital Art & Illustration', desc: 'Tablet dock slant, warm color-accurate task light, multi-slot swatch block.'},
                              {id: 'minimal', icon: '👔', title: 'Corporate Leadership', desc: 'Premium dark walnut risers, wireless chargers, metal card deck, sleek leather organizers.'}
                          ].map(focus => (
                              <button key={focus.id} onClick={() => setSelectedFocusId(focus.id)} className={`text-left p-4 rounded-xl bg-white border ${selectedFocusId === focus.id ? 'border-brand-600 bg-brand-100/40' : 'border-brand-200 hover:border-brand-500'} transition-all flex items-start gap-3 group`}>
                                  <div className="w-10 h-10 shrink-0 rounded-lg bg-brand-100 flex items-center justify-center text-brand-700 font-bold group-hover:scale-110 transition-transform">{focus.icon}</div>
                                  <div>
                                      <h4 className="font-bold text-brand-950 text-sm">{focus.title}</h4>
                                      <p className="text-xs text-neutral-500">{focus.desc}</p>
                                  </div>
                              </button>
                          ))}
                      </div>
                  </div>

                  {quizResult && (
                      <div className="bg-brand-950 text-brand-50 rounded-2xl p-6 sm:p-8 border border-neutral-800 space-y-6 animate-in slide-in-from-bottom-4 fade-in">
                          <div className="flex items-center gap-3">
                              <div className="p-2 bg-brand-600 rounded-lg text-white">
                                  <Sparkles className="w-5 h-5" />
                              </div>
                              <div>
                                  <h4 className="font-bold text-sm text-brand-300">YOUR WORKSPACE REVEALED</h4>
                                  <p className="font-serif text-lg font-bold">{quizResult.title}</p>
                              </div>
                          </div>

                          <div className="space-y-2 bg-neutral-900/60 p-4 rounded-xl border border-neutral-800 flex flex-col">
                              <div className="flex items-center justify-between">
                                  <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase">AI Art Prompt (Midjourney / DALL-E)</span>
                                  <button onClick={() => {
                                      navigator.clipboard.writeText(quizResult.prompt);
                                      showToast("AI Desk Prompt copied to your clipboard!");
                                  }} className="text-brand-400 hover:text-brand-300 text-xs font-bold flex items-center gap-1.5 transition-colors">
                                      <Copy className="w-3.5 h-3.5" /> Copy Prompt
                                  </button>
                              </div>
                              <p className="text-xs text-neutral-300 italic leading-relaxed pt-2">
                                  "{quizResult.prompt}"
                              </p>
                          </div>

                          <div className="pt-4 border-t border-neutral-800 space-y-4">
                              <span className="text-xs font-bold text-brand-300 block">Recommended Setup Starters:</span>
                              <div className="space-y-3">
                                  {quizResult.recommendedIds.map(id => {
                                      const prod = PRODUCTS.find(p => p.id === id);
                                      if (!prod) return null;
                                      return (
                                          <div key={prod.id} className="flex items-center justify-between p-3 bg-neutral-900 border border-neutral-800 rounded-xl">
                                              <div className="flex items-center gap-2.5">
                                                  <span className="text-xl">{prod.image}</span>
                                                  <div>
                                                      <h5 className="text-xs font-bold text-white">{prod.name}</h5>
                                                      <span className="text-[10px] text-brand-300">৳{prod.price.toLocaleString()}</span>
                                                  </div>
                                              </div>
                                              <button onClick={() => addToCart(prod.id)} className="p-1.5 px-3 bg-neutral-800 hover:bg-neutral-700 text-brand-300 rounded-lg text-xs font-bold transition-all">
                                                  Add Single
                                              </button>
                                          </div>
                                      );
                                  })}
                              </div>
                              <div className="pt-2">
                                  <button onClick={() => addBundleToCart(quizResult.recommendedIds)} className="w-full sm:w-auto px-6 py-3 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all flex items-center justify-center gap-2 text-sm shadow-md">
                                      <ShoppingBag className="w-4 h-4" /> Add Recommended Bundle to Cart
                                  </button>
                              </div>
                          </div>
                      </div>
                  )}

              </div>
          </div>
      </section>

      <section id="shop" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-brand-200">
              <div className="space-y-2 text-center md:text-left">
                  <span className="text-brand-600 font-bold uppercase tracking-widest text-xs block">Premium Workspace Essentials</span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-brand-950 font-semibold">Curate Your Setup</h2>
              </div>
              
              <div className="flex flex-wrap items-center justify-center gap-2">
                  {[
                      {id: 'all', label: 'All Products'},
                      {id: 'mats', label: 'Felt & Leather Mats'},
                      {id: 'risers', label: 'Wood Risers'},
                      {id: 'stationery', label: 'Stationery & Organization'}
                  ].map(f => (
                      <button key={f.id} onClick={() => setFilter(f.id)} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${filter === f.id ? 'bg-brand-900 text-white shadow-sm' : 'bg-white text-neutral-600 border border-brand-200 hover:border-brand-400'}`}>
                          {f.label}
                      </button>
                  ))}
              </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-3xl p-6 border border-brand-200 shadow-md flex flex-col justify-between group hover:shadow-xl transition-all duration-300">
                      <div className="space-y-4">
                          <div className="relative w-full aspect-[4/3] bg-brand-50 rounded-2xl flex items-center justify-center text-5xl group-hover:scale-105 transition-transform duration-300 border border-brand-200/40">
                              {product.image}
                              {product.badge && <span className="absolute top-3 left-3 px-2.5 py-1 bg-brand-950 text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">{product.badge}</span>}
                          </div>

                          <div className="space-y-1.5">
                              <div className="flex items-center gap-1.5 text-xs text-brand-600 font-bold">
                                  <span>★ {product.rating}</span>
                                  <span className="text-neutral-400">({product.reviews} reviews)</span>
                              </div>
                              <h3 className="font-serif font-bold text-lg text-brand-950">{product.name}</h3>
                              <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">{product.desc}</p>
                          </div>

                          <div className="flex flex-wrap gap-1">
                              {product.features.map(f => (
                                  <span key={f} className="px-2 py-0.5 bg-brand-100 text-brand-800 text-[10px] font-semibold rounded-md">{f}</span>
                              ))}
                          </div>
                      </div>

                      <div className="flex items-center justify-between pt-6 border-t border-brand-200/50 mt-6">
                          <span className="font-serif text-lg font-bold text-brand-950">৳{product.price.toLocaleString()}</span>
                          <button onClick={() => addToCart(product.id)} className="px-4 py-2.5 bg-brand-900 hover:bg-brand-950 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-1.5">
                              <Plus className="w-3.5 h-3.5" /> Add to Cart
                          </button>
                      </div>
                  </div>
              ))}
          </div>
      </section>

      <section id="why-us" className="py-20 bg-brand-100 border-t border-brand-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 space-y-6">
                  <span className="text-brand-600 font-bold uppercase tracking-widest text-xs block">Crafting the Officeology Standard</span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-brand-950 font-semibold leading-tight">
                      Why professionals in Bangladesh love our items
                  </h2>
                  <p className="text-neutral-600 text-sm sm:text-base leading-relaxed">
                      We started Officeology BD because we believe that where you work directly impacts what you create. Every single mat is hand-cut, every wooden product is cured to withstand Bangladeshi humidity, and every accessory is curated to be functionally flawless.
                  </p>

                  <div className="space-y-4">
                      <div className="flex items-start gap-3">
                          <div className="p-1.5 bg-brand-900 rounded-lg text-brand-100 mt-0.5 shrink-0">
                              <Check className="w-4 h-4" />
                          </div>
                          <div>
                              <h4 className="font-bold text-sm text-brand-950">Water-Resistant Merino Felt</h4>
                              <p className="text-xs text-neutral-500 mt-1">Spilled your coffee during a late-night session? Simply wipe it off with a towel—no marks left.</p>
                          </div>
                      </div>
                      <div className="flex items-start gap-3">
                          <div className="p-1.5 bg-brand-900 rounded-lg text-brand-100 mt-0.5 shrink-0">
                              <Check className="w-4 h-4" />
                          </div>
                          <div>
                              <h4 className="font-bold text-sm text-brand-950">Ethically Sourced Natural Hardwood</h4>
                              <p className="text-xs text-neutral-500 mt-1">Each desk shelf supports up to 40kg of heavy screens without bowing.</p>
                          </div>
                      </div>
                  </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-brand-200/60 shadow-md space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                          <Package className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif font-bold text-lg text-brand-950">Gift-Ready Eco Packaging</h3>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                          All our accessories arrive in beautifully branded boxes wrapped in protective canvas pouches, ready to surprise colleagues, founders, or loved ones.
                      </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-brand-200/60 shadow-md space-y-4">
                      <div className="w-12 h-12 rounded-xl bg-brand-50 flex items-center justify-center text-brand-600">
                          <MapPin className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif font-bold text-lg text-brand-950">Showroom Setup Advice</h3>
                      <p className="text-xs text-neutral-500 leading-relaxed">
                          Need an office fit-out or a gorgeous setup layout for your study? Contact us with your table dimensions and we'll craft a customized floorplan.
                      </p>
                  </div>
              </div>
          </div>
      </section>

      <section id="instagram" className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
              <div className="text-center space-y-4">
                  <span className="text-brand-600 font-bold uppercase tracking-widest text-xs block">@officeologybd on Instagram</span>
                  <h2 className="font-serif text-3xl sm:text-4xl text-brand-950 font-semibold">Shop The Look</h2>
                  <p className="text-neutral-600 max-w-xl mx-auto text-sm sm:text-base">
                      Discover desk inspiration from real workspaces across Bangladesh. Tap on an image to see the featured items.
                  </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="group relative bg-brand-50 rounded-2xl overflow-hidden border border-brand-200 shadow-md">
                      <div className="aspect-square bg-gradient-to-br from-neutral-800 to-neutral-900 p-8 flex flex-col justify-between text-brand-100 relative">
                          <div className="text-center space-y-2 my-auto">
                              <span className="text-[10px] tracking-widest text-brand-400 block font-bold">STYLISH ACCENTS</span>
                              <div className="w-24 h-24 bg-brand-100/10 rounded-full mx-auto flex items-center justify-center border border-brand-200/20 text-3xl">☕⌨️🪵</div>
                              <p className="text-sm font-serif italic text-brand-200">"Cozy mechanical board vibes."</p>
                          </div>
                          <div className="flex items-center justify-between text-xs text-brand-300">
                              <span>❤️ 1,240 Likes</span>
                              <span>💬 84 Comments</span>
                          </div>
                      </div>
                      <div className="absolute inset-0 bg-brand-950/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-6 text-center space-y-4">
                          <h4 className="text-brand-100 font-bold text-sm">Featured in this Setup:</h4>
                          <div className="space-y-2">
                              <span className="block text-xs text-brand-300">Premium Felt Desk Mat - Dark Grey</span>
                              <span className="block text-xs text-brand-300">Wooden Keyboard Wrist Rest</span>
                          </div>
                          <button onClick={() => addBundleToCart(['1', '3'])} className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl transition-all">
                              Add Setup Combo to Cart
                          </button>
                      </div>
                  </div>

                  <div className="group relative bg-brand-50 rounded-2xl overflow-hidden border border-brand-200 shadow-md">
                      <div className="aspect-square bg-gradient-to-br from-neutral-700 to-neutral-800 p-8 flex flex-col justify-between text-brand-100 relative">
                          <div className="text-center space-y-2 my-auto">
                              <span className="text-[10px] tracking-widest text-brand-400 block font-bold">STUDY INSPIRATION</span>
                              <div className="w-24 h-24 bg-brand-100/10 rounded-full mx-auto flex items-center justify-center border border-brand-200/20 text-3xl">📓✒️📐</div>
                              <p className="text-sm font-serif italic text-brand-200">"The productivity layout."</p>
                          </div>
                          <div className="flex items-center justify-between text-xs text-brand-300">
                              <span>❤️ 980 Likes</span>
                              <span>💬 41 Comments</span>
                          </div>
                      </div>
                      <div className="absolute inset-0 bg-brand-950/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-6 text-center space-y-4">
                          <h4 className="text-brand-100 font-bold text-sm">Featured in this Setup:</h4>
                          <div className="space-y-2">
                              <span className="block text-xs text-brand-300">Undated Productivity Planner</span>
                              <span className="block text-xs text-brand-300">Minimalist Leather Desk Pad</span>
                          </div>
                          <button onClick={() => addBundleToCart(['5', '2'])} className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl transition-all">
                              Add Setup Combo to Cart
                          </button>
                      </div>
                  </div>

                  <div className="group relative bg-brand-50 rounded-2xl overflow-hidden border border-brand-200 shadow-md">
                      <div className="aspect-square bg-gradient-to-br from-neutral-900 to-neutral-950 p-8 flex flex-col justify-between text-brand-100 relative">
                          <div className="text-center space-y-2 my-auto">
                              <span className="text-[10px] tracking-widest text-brand-400 block font-bold">EXECUTIVE WALNUT</span>
                              <div className="w-24 h-24 bg-brand-100/10 rounded-full mx-auto flex items-center justify-center border border-brand-200/20 text-3xl">🖥️🪵🖊️</div>
                              <p className="text-sm font-serif italic text-brand-200">"Command center clean setup."</p>
                          </div>
                          <div className="flex items-center justify-between text-xs text-brand-300">
                              <span>❤️ 1,830 Likes</span>
                              <span>💬 112 Comments</span>
                          </div>
                      </div>
                      <div className="absolute inset-0 bg-brand-950/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-center items-center p-6 text-center space-y-4">
                          <h4 className="text-brand-100 font-bold text-sm">Featured in this Setup:</h4>
                          <div className="space-y-2">
                              <span className="block text-xs text-brand-300">Premium Walnut Monitor Riser</span>
                              <span className="block text-xs text-brand-300">Brass Weighted Pen Block</span>
                          </div>
                          <button onClick={() => addBundleToCart(['4', '6'])} className="px-4 py-2 bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs rounded-xl transition-all">
                              Add Setup Combo to Cart
                          </button>
                      </div>
                  </div>
              </div>

              <div className="text-center">
                  <a href="https://www.instagram.com/officeologybd/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-950 text-white font-bold text-sm rounded-xl hover:bg-neutral-800 transition-colors">
                      <Instagram className="w-4 h-4 text-brand-400" /> Follow us @officeologybd
                  </a>
              </div>
          </div>
      </section>

      <div className={`fixed inset-0 z-50 overflow-hidden ${cartOpen ? '' : 'pointer-events-none'}`}>
          <div className="absolute inset-0 overflow-hidden">
              <div onClick={() => setCartOpen(false)} className={`absolute inset-0 bg-neutral-900/50 backdrop-blur-sm transition-opacity duration-300 ${cartOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}></div>

              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-10">
                  <div className={`pointer-events-auto w-screen max-w-md transform transition-transform duration-300 ease-in-out bg-white shadow-2xl flex flex-col justify-between ${cartOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                      <div className="px-6 py-5 border-b border-brand-200 flex items-center justify-between shrink-0">
                          <div className="flex items-center gap-2">
                              <ShoppingBag className="w-5 h-5 text-brand-900" />
                              <h2 className="font-serif text-lg font-bold text-brand-950">Your Workspace Basket</h2>
                          </div>
                          <button onClick={() => setCartOpen(false)} className="p-2 text-neutral-400 hover:text-neutral-600 rounded-lg">
                              <X className="w-5 h-5" />
                          </button>
                      </div>

                      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                          {cart.length === 0 ? (
                              <div className="h-full flex flex-col items-center justify-center text-center text-neutral-500 space-y-3 py-12">
                                  <Inbox className="w-12 h-12 text-neutral-300" />
                                  <p className="text-sm font-semibold">Your basket is feeling pretty empty.</p>
                                  <button onClick={() => { setCartOpen(false); window.location.hash='#shop'; }} className="text-xs font-bold text-brand-600 hover:underline">Start browsing essentials</button>
                              </div>
                          ) : (
                              cart.map(item => (
                                  <div key={item.id} className="flex items-center justify-between p-4 bg-brand-50 rounded-2xl border border-brand-200 gap-3">
                                      <div className="flex items-center gap-3">
                                          <span className="text-3xl bg-white p-2 rounded-xl border border-brand-100 w-12 h-12 flex items-center justify-center shrink-0">{item.image}</span>
                                          <div>
                                              <h4 className="text-xs font-bold text-brand-950 leading-tight">{item.name}</h4>
                                              <span className="text-xs text-brand-600 block mt-1">৳{item.price.toLocaleString()}</span>
                                          </div>
                                      </div>
                                      <div className="flex items-center gap-2 bg-white rounded-lg border border-brand-200 p-1.5 shrink-0">
                                          <button onClick={() => updateQuantity(item.id, -1)} className="p-1 text-neutral-400 hover:text-neutral-600"><Minus className="w-3 h-3" /></button>
                                          <span className="text-xs font-bold px-1.5 min-w-[20px] text-center">{item.quantity}</span>
                                          <button onClick={() => updateQuantity(item.id, 1)} className="p-1 text-neutral-400 hover:text-neutral-600"><Plus className="w-3 h-3" /></button>
                                      </div>
                                  </div>
                              ))
                          )}
                      </div>

                      <div className="border-t border-brand-200 px-6 py-6 bg-brand-50 space-y-4 shrink-0">
                          <div className="space-y-2">
                              <div className="flex justify-between text-xs text-neutral-500">
                                  <span>Subtotal</span>
                                  <span>৳{subtotal.toLocaleString()}</span>
                              </div>
                              <div className="flex justify-between text-xs text-neutral-500">
                                  <span>Delivery Cost (Dhaka/BD)</span>
                                  <span>{deliveryFee === 0 ? 'FREE' : `৳${deliveryFee}`}</span>
                              </div>
                              <div className="flex justify-between text-sm font-bold text-brand-950 pt-2 border-t border-brand-200/80 mt-2">
                                  <span>Grand Total</span>
                                  <span>৳{grandTotal.toLocaleString()}</span>
                              </div>
                          </div>

                          {isCheckoutForm ? (
                              <div className="space-y-3 animate-in slide-in-from-bottom-4 fade-in">
                                  <input type="text" placeholder="Full Name" value={custForm.name} onChange={e => setCustForm({...custForm, name: e.target.value})} className="w-full px-3 py-3 border border-brand-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white font-medium placeholder:text-neutral-400" />
                                  <input type="text" placeholder="Phone Number (e.g. 017xxxx)" value={custForm.phone} onChange={e => setCustForm({...custForm, phone: e.target.value})} className="w-full px-3 py-3 border border-brand-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white font-medium placeholder:text-neutral-400" />
                                  <input type="text" placeholder="Delivery Address" value={custForm.address} onChange={e => setCustForm({...custForm, address: e.target.value})} className="w-full px-3 py-3 border border-brand-200 rounded-xl text-xs focus:ring-2 focus:ring-brand-500 focus:outline-none bg-white font-medium placeholder:text-neutral-400" />
                              </div>
                          ) : null}

                          <div className="space-y-2">
                              {!isCheckoutForm ? (
                                  <button onClick={() => {
                                      if (cart.length === 0) {
                                          showToast("Please add items to your cart first!");
                                      } else {
                                          setIsCheckoutForm(true);
                                      }
                                  }} className="w-full py-3.5 bg-brand-900 hover:bg-brand-950 text-brand-50 font-bold rounded-xl transition-all text-xs tracking-wider uppercase flex items-center justify-center gap-2">
                                      <CheckSquare className="w-4 h-4" /> Proceed to Order Checkout
                                  </button>
                              ) : (
                                  <button onClick={submitFinalOrder} className="w-full py-3.5 bg-brand-600 hover:bg-brand-500 text-white font-bold rounded-xl transition-all text-xs tracking-wider uppercase flex items-center justify-center gap-2">
                                      <Send className="w-4 h-4" /> Confirm via WhatsApp / Cash on Delivery
                                  </button>
                              )}
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>

      <div className={`fixed bottom-6 right-6 z-50 transform pointer-events-none bg-brand-950 text-brand-100 px-5 py-4 rounded-xl shadow-2xl flex items-center gap-3 border border-neutral-800 transition-all duration-300 ${toastMessage ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0'}`}>
          <div className="p-1 bg-brand-600 rounded text-white shrink-0">
              <Bell className="w-4 h-4" />
          </div>
          <div>
              <span className="text-xs font-semibold">{toastMessage}</span>
          </div>
      </div>

      {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-brand-950/60 backdrop-blur-md p-4 animate-in fade-in">
              <div className="bg-white max-w-md w-full rounded-3xl p-8 border border-brand-200 shadow-2xl text-center space-y-6 animate-in zoom-in-95">
                  <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto text-brand-600">
                      <CheckCircle className="w-8 h-8" />
                  </div>
                  <div className="space-y-2">
                      <h3 className="font-serif text-2xl font-bold text-brand-950">Order Received!</h3>
                      <p className="text-neutral-500 text-sm">
                          Thank you for shopping with <strong className="text-brand-900">Officeology BD</strong>. We have registered your setup order and our representative will reach out to you within an hour to confirm delivery details.
                      </p>
                  </div>
                  <div className="bg-brand-50 p-4 rounded-xl border border-brand-200 text-left text-xs space-y-1.5">
                      <div className="flex justify-between font-bold text-brand-950">
                          <span>Order Ref:</span>
                          <span>{orderInfo.ref}</span>
                      </div>
                      <div className="flex justify-between">
                          <span>Delivery Address:</span>
                          <span className="text-neutral-600 truncate ml-4 text-right">{orderInfo.addr}</span>
                      </div>
                      <div className="flex justify-between">
                          <span>Estimated Delivery:</span>
                          <span className="text-neutral-600">24-48 Hours</span>
                      </div>
                  </div>
                  <button onClick={() => setShowSuccessModal(false)} className="w-full py-3 bg-brand-900 hover:bg-brand-950 text-white font-bold rounded-xl transition-colors text-xs uppercase tracking-wider">
                      Continue Curating
                  </button>
              </div>
          </div>
      )}

      {/* Website Blueprint Prompt Copy Section */}
      <section className="py-12 bg-neutral-900 border-t border-neutral-800 text-neutral-400">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center space-y-4">
              <h4 className="text-sm font-bold text-brand-300 uppercase tracking-widest">Officeology BD Setup Companion</h4>
              <p className="text-xs max-w-xl mx-auto leading-relaxed">
                  Need to transfer this exact marketing model and aesthetic vibe to your Shopify, WooCommerce, or Custom Web stack? Click below to copy the developer prompt package.
              </p>
              <button onClick={() => {
                  const masterPrompt = `System Prompt: Build a highly aesthetic e-commerce store named Officeology BD tailored to workspace planning and premium desk accessories. Product catalog should include Felt Desk Mats, Walnut Monitor Risers, and Calligraphy accessories in Bangladesh (pricing in BDT). Feature a sleek interactive 'Desk Setup Matcher' and link seamlessly to instagram.com/officeologybd.`;
                  navigator.clipboard.writeText(masterPrompt);
                  showToast("Master Blueprint Prompt copied!");
              }} className="inline-flex items-center gap-2 px-5 py-2.5 bg-neutral-800 hover:bg-neutral-750 text-brand-100 font-semibold text-xs rounded-xl border border-neutral-700 transition-all">
                  <Copy className="w-4 h-4 text-brand-400" /> Copy Master Website Prompt
              </button>
          </div>
      </section>

      <footer className="bg-brand-950 text-brand-200 py-16 px-4 border-t border-brand-900">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
              <div className="space-y-4">
                  <span className="font-serif text-2xl font-bold tracking-tight text-white block">officeology</span>
                  <p className="text-xs text-brand-300 leading-relaxed">
                      Designed and handcrafted premium desk pads, desk organizers, and aesthetic accessories to boost daily cognitive workspace organization.
                  </p>
                  <div className="flex items-center gap-3">
                      <a href="https://www.instagram.com/officeologybd/" target="_blank" rel="noreferrer" className="p-2 rounded-lg bg-neutral-900 text-brand-300 hover:text-white transition-colors">
                          <Instagram className="w-4.5 h-4.5" />
                      </a>
                  </div>
              </div>

              <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Workspace Catalog</h4>
                  <ul className="space-y-2 text-xs text-brand-300">
                      <li><a href="#shop" className="hover:text-brand-100 transition-colors">Premium Desk Mats</a></li>
                      <li><a href="#shop" className="hover:text-brand-100 transition-colors">Walnut Monitor Shelf</a></li>
                      <li><a href="#shop" className="hover:text-brand-100 transition-colors">Calligraphy Pen Blocks</a></li>
                      <li><a href="#shop" className="hover:text-brand-100 transition-colors">Aesthetic Organizers</a></li>
                  </ul>
              </div>

              <div className="space-y-3">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">Customer Support</h4>
                  <ul className="space-y-2 text-xs text-brand-300">
                      <li><a href="#" className="hover:text-brand-100 transition-colors">Track Desk Order</a></li>
                      <li><a href="#" className="hover:text-brand-100 transition-colors">Returns & Exchanges</a></li>
                      <li><a href="#" className="hover:text-brand-100 transition-colors">Dhaka Showroom Directions</a></li>
                      <li><a href="#" className="hover:text-brand-100 transition-colors">Contact via WhatsApp</a></li>
                  </ul>
              </div>

              <div className="space-y-4">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider font-semibold">Stay Inspired</h4>
                  <p className="text-[11px] text-brand-300 leading-relaxed">
                      Drop your email below for custom desk setup inspirations and priority notifications when new stocks drop.
                  </p>
                  <div className="flex gap-2">
                      <input type="email" placeholder="Your aesthetic email" className="px-3 py-2 bg-neutral-900 border border-brand-800 rounded-lg text-xs w-full text-brand-100 focus:outline-none focus:ring-1 focus:ring-brand-500" />
                      <button onClick={() => showToast('Thank you for joining our workspace circle!')} className="p-2 bg-brand-600 rounded-lg hover:bg-brand-500 text-white transition-all shrink-0 flex items-center justify-center">
                          <ArrowRight className="w-4 h-4" />
                      </button>
                  </div>
              </div>
          </div>

          <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-neutral-900 text-center text-[10px] text-neutral-500 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p>© 2026 Officeology BD. All Rights Reserved. Curating Bangladesh's Finest Desks.</p>
              <div className="flex items-center gap-4">
                  <a href="#" className="hover:underline">Privacy Policy</a>
                  <a href="#" className="hover:underline">Terms of Service</a>
              </div>
          </div>
      </footer>
    </>
  );
}
