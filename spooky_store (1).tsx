import React, { useState, useEffect, useRef } from 'react';
import { ShoppingCart, Ghost, Skull, Candy, AlertTriangle, Eye, Menu, Search, User, Heart } from 'lucide-react';

export default function HalloweenStore() {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [showJumpscare, setShowJumpscare] = useState(false);
  const [showJobApp, setShowJobApp] = useState(false);
  const [showInvertedMouse, setShowInvertedMouse] = useState(false);
  const [mouseInverted, setMouseInverted] = useState(false);
  const [buttonsDisabled, setButtonsDisabled] = useState(false);
  const [glitchText, setGlitchText] = useState(false);
  const [cart, setCart] = useState(0);
  const [cartItems, setCartItems] = useState([]);
  const [showCartPage, setShowCartPage] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [buttonPositions, setButtonPositions] = useState({});
  const [showSearch, setShowSearch] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [actualSearch, setActualSearch] = useState('');
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const audioRef = useRef(null);

  const randomAddresses = [
    "Walmart parking lot",
    "The park past the 3rd tree",
    "Behind the gas station",
    "That bench near the library",
    "The alley between the pizza place and dry cleaners",
    "Under the overpass on Route 22",
    "McDonald's dumpster area",
    "The blue mailbox on Main Street",
    "Corner of somewhere and something",
    "By the big rock near the creek",
    "The abandoned lot with the broken fence",
    "Where we met that one time",
    "Next to the guy selling hot dogs",
    "Third door in the strip mall",
    "Behind the CVS, you know the one",
    "The sketchy part of the parking garage",
    "Near the water fountain that doesn't work",
    "By the tree that fell over last year",
    "That weird spot behind Target",
    "The loading dock nobody uses",
    "In front of the closed Blockbuster",
    "By the broken swing set",
    "Next to the suspicious van",
    "The picnic table with graffiti",
    "Behind the 7-Eleven at 2am"
  ];

  const products = [
    { 
      id: 1, 
      name: 'Two-Person Stretch Dog Duo Costume', 
      price: 119.99, 
      emoji: '🐕',
      description: 'Celebrate teamwork, friendship, and mild claustrophobia with this absurd two-person dog costume! Perfect for couples who enjoy physical comedy and questionable decisions.',
      includes: ['Two body suits + shared dog torso', 'Springy midsection for max flexibility', 'Unspoken emotional bond requirement'],
      details: ['Perfect for couples, besties, and enemies forced to share a costume', 'Adjustable straps', 'Machine washable']
    },
    { 
      id: 2, 
      name: 'Dog Banana Costume', 
      price: 29.99, 
      emoji: '🍌',
      description: 'Dress your good boy as a potassium-packed superstar! This banana costume transforms any dog into the world\'s happiest fruit.',
      includes: ['Soft plush peel', 'Velcro fasteners', 'Guaranteed smiles'],
      details: ['Perfect for dogs who can tolerate nonsense', 'Available in sizes XS-XL', 'Yellow never looked so good']
    },
    { 
      id: 3, 
      name: '"Screaming Gourd" Halloween Decoration', 
      price: 34.99, 
      emoji: '🥒',
      description: 'Hand-carved from a real striped gourd, this wild-eyed "screaming" creation is a one-of-a-kind addition to your Halloween décor! With matchstick teeth and tiny gourd eyes, it\'s both creepy and hilarious.',
      includes: ['Hand-carved gourd', 'Matchstick teeth', 'Tiny gourd eyes'],
      details: ['Each piece is hand-carved', '10-12 inches tall', 'Naturally terrifying']
    },
    { 
      id: 4, 
      name: 'Pixel Skeleton Archer Costume', 
      price: 44.99, 
      emoji: '💀',
      description: 'Step straight out of a blocky video game and into real life! This pixelated skeleton costume lets you look like a low-resolution menace with a bow and an existential crisis.',
      includes: ['Boxy skull mask', 'Foam pixel bow', 'Zero stealth skills'],
      details: ['Perfect for gamers who haven\'t touched grass since 2012', 'One size fits most', 'Not actual armor']
    },
    { 
      id: 5, 
      name: 'Glowing Witch Head Yard Stakes (Set of 3)', 
      price: 74.99, 
      emoji: '🧙',
      description: 'Bring eerie enchantment to your yard with these three wicked witch heads! Their glowing blue LED eyes and sinister smiles will cast a spell on your neighborhood.',
      includes: ['3 spooky witch heads', 'Glowing LED eyes', 'Weatherproof ground stakes'],
      details: ['Dusk-to-dawn auto-lighting', 'Outdoor safe', 'Instant Halloween ambiance']
    },
    { 
      id: 6, 
      name: 'Inflatable Giant Squid Costume', 
      price: 89.99, 
      emoji: '🐙',
      description: 'Go full deep-sea drama with this massive inflatable squid costume! You\'ll tower over the competition and mildly terrify everyone in a 10-foot radius.',
      includes: ['Inflatable body + 8 wiggly tentacles', 'Battery-powered air pump', 'Deep sense of aquatic dominance'],
      details: ['Not responsible for chaos at aquariums', 'Batteries not included', 'May cause fear in children']
    },
    { 
      id: 7, 
      name: 'AN ACTUAL DUCK', 
      price: 49.99, 
      emoji: '🦆',
      description: 'Why settle for pretending to be a duck when you can own an actual duck? This isn\'t a toy. This isn\'t a costume. This is a living, breathing waterfowl ready to waddle into your life.',
      includes: ['1 (ONE) genuine adult duck', 'Dark voodoo incantation scroll', 'Three loose feathers (for the incantation)'],
      details: ['Beak (installed)', 'Webbed feet (two, attached)', 'Feathers (approximately 12,000)']
    },
    { 
      id: 8, 
      name: '"Sexy Clippy" Costume', 
      price: 59.99, 
      emoji: '🔦',
      description: 'It looks like you\'re trying to win Halloween! Transform into the sassiest office assistant ever with this hilarious and bold costume. Perfect for meme lovers and retro geeks.',
      includes: ['Oversized Clippy frame', 'Foam notepad page', 'Built-in regret'],
      details: ['Sizes: XL-XXXXL', 'Not endorsed by Microsoft', 'May cause HR complaints']
    },
  ];

  const jumpscare = () => {
    setShowJumpscare(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.7;
      audioRef.current.play().catch(() => {});
    }
    setTimeout(() => setShowJumpscare(false), 800);
  };

  const showJobApplication = () => {
    setShowJobApp(true);
    if (audioRef.current) {
      audioRef.current.volume = 0.9;
      audioRef.current.play().catch(() => {});
    }
    setTimeout(() => setShowJobApp(false), 2000);
  };

  const invertMouse = () => {
    setShowInvertedMouse(true);
    setMouseInverted(true);
    setTimeout(() => {
      setShowInvertedMouse(false);
      setMouseInverted(false);
    }, 15000);
  };

  const caesarShiftChar = (char) => {
    if (char.match(/[a-z]/i)) {
      const code = char.charCodeAt(0);
      const isUpperCase = char === char.toUpperCase();
      const base = isUpperCase ? 65 : 97;
      const shifted = ((code - base + 3) % 26) + base;
      return String.fromCharCode(shifted);
    }
    return char;
  };

  const handleSearchChange = (e) => {
    const input = e.target.value;
    const prevLength = searchValue.length;
    const newLength = input.length;
    
    if (newLength > prevLength) {
      // New character(s) added - shift only the new ones
      const newChars = input.slice(prevLength);
      const shiftedNewChars = newChars.split('').map(caesarShiftChar).join('');
      setSearchValue(searchValue + shiftedNewChars);
      setActualSearch(actualSearch + newChars);
    } else {
      // Characters deleted - just update normally
      setSearchValue(input);
      setActualSearch(input);
    }
  };

  const resetSearch = () => {
    setShowSearch(false);
    setSearchValue('');
    setActualSearch('');
    setShowCartPage(false);
  };

  const filteredProducts = searchValue 
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchValue.toLowerCase())
      )
    : products;

  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleInteraction = () => {
    if (Math.random() < 0.2) {
      jumpscare();
    }
    
    if (Math.random() < 0.3) {
      setButtonsDisabled(true);
      setTimeout(() => setButtonsDisabled(false), 2000);
    }
    
    if (Math.random() < 0.4) {
      setGlitchText(true);
      setTimeout(() => setGlitchText(false), 500);
    }
  };

  const moveButton = (id) => {
    const newX = Math.random() * 60 + 20;
    const newY = Math.random() * 40 + 10;
    setButtonPositions(prev => ({
      ...prev,
      [id]: { x: newX, y: newY }
    }));
  };

  const addToCart = (product, buttonId) => {
    // Reset button position
    setButtonPositions(prev => {
      const newPos = { ...prev };
      delete newPos[buttonId];
      return newPos;
    });
    
    setCart(cart + 1);
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    handleInteraction();
  };

  const removeFromCart = (productId) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === productId);
      if (existing && existing.quantity > 1) {
        return prev.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        );
      }
      return prev.filter(item => item.id !== productId);
    });
    setCart(Math.max(0, cart - 1));
    handleInteraction();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (mouseInverted) {
        // Invert mouse movement
        const invertedX = window.innerWidth - e.clientX;
        const invertedY = window.innerHeight - e.clientY;
        setCursorPos({ x: invertedX, y: invertedY });
      } else {
        setCursorPos({ x: e.clientX, y: e.clientY });
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseInverted]);

  useEffect(() => {
    const interval = setInterval(() => {
      const rand = Math.random();
      if (rand < 0.1) {
        jumpscare();
      } else if (rand < 0.3) {
        showJobApplication();
      } else if (rand < 0.35) {
        invertMouse();
      }
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  const getButtonStyle = (id) => {
    const pos = buttonPositions[id];
    if (!pos) return {};
    return {
      position: 'fixed',
      left: `${pos.x}%`,
      top: `${pos.y}%`,
      zIndex: 50,
      transition: 'all 0.3s ease'
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-600 via-purple-900 to-black text-white">
      <audio ref={audioRef} src="data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAAAAAAAA" />
      
      {/* Spooky cursor */}
      <div 
        className="fixed pointer-events-none z-50"
        style={{
          left: cursorPos.x - 20,
          top: cursorPos.y - 20,
          transition: 'all 0.3s ease'
        }}
      >
        <Eye className="text-red-600 animate-pulse" size={30} />
      </div>

      {/* Jumpscare */}
      {showJumpscare && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-red-900">
          <div className="text-9xl animate-pulse">
            <AlertTriangle className="text-yellow-400" size={300} />
          </div>
          <div className="absolute inset-0 bg-black opacity-60 animate-ping" />
        </div>
      )}

      {/* Inverted Mouse Warning */}
      {showInvertedMouse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80 pointer-events-none">
          <div className="bg-orange-600 border-4 border-yellow-400 p-8 rounded-lg text-center animate-pulse">
            <h2 className="text-4xl font-bold text-white mb-2">⚠️ INVERTED MOUSE ⚠️</h2>
            <p className="text-xl text-yellow-200">Mouse controls reversed for 15 seconds!</p>
          </div>
        </div>
      )}

      {/* Job Application Popup */}
      {showJobApp && (
        <div className="fixed inset-0 z-50 bg-white flex items-center justify-center p-4">
          <div className="max-w-3xl w-full bg-white border-4 border-gray-800 p-8 overflow-y-auto max-h-screen">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">EMPLOYMENT APPLICATION</h1>
              <p className="text-sm text-gray-600">Please complete all fields</p>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">First Name *</label>
                  <input type="text" className="w-full border-2 border-gray-400 p-2" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Last Name *</label>
                  <input type="text" className="w-full border-2 border-gray-400 p-2" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Address *</label>
                <input type="text" className="w-full border-2 border-gray-400 p-2" />
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">City *</label>
                  <input type="text" className="w-full border-2 border-gray-400 p-2" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">State *</label>
                  <input type="text" className="w-full border-2 border-gray-400 p-2" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">ZIP *</label>
                  <input type="text" className="w-full border-2 border-gray-400 p-2" />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Phone Number *</label>
                  <input type="tel" className="w-full border-2 border-gray-400 p-2" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Email *</label>
                  <input type="email" className="w-full border-2 border-gray-400 p-2" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Position Applying For *</label>
                <input type="text" className="w-full border-2 border-gray-400 p-2" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Available Start Date *</label>
                <input type="date" className="w-full border-2 border-gray-400 p-2" />
              </div>
              
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Work Experience</label>
                <textarea className="w-full border-2 border-gray-400 p-2 h-24"></textarea>
              </div>
              
              <div className="flex items-center gap-2">
                <input type="checkbox" className="w-4 h-4" />
                <label className="text-sm text-gray-700">I certify that all information provided is accurate</label>
              </div>
              
              <div className="flex gap-4 pt-4">
                <button className="flex-1 bg-blue-600 text-white py-3 font-bold">SUBMIT APPLICATION</button>
                <button className="flex-1 bg-gray-400 text-white py-3 font-bold">CANCEL</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-black bg-opacity-80 border-b-4 border-orange-500 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={resetSearch} className="cursor-pointer">
                <h1 className={`text-3xl font-bold flex items-center gap-2 ${glitchText ? 'animate-pulse blur-sm' : ''}`}>
                  <Ghost className="animate-bounce" />
                  SPOOKY SHOP
                </h1>
              </button>
            </div>
            
            <div className="flex items-center gap-6">
              <button onClick={() => {
                setShowSearch(!showSearch);
                handleInteraction();
              }} className="hover:text-orange-500">
                <Search size={24} />
              </button>
              <div 
                className="relative"
                onMouseEnter={() => setShowUserDropdown(true)}
                onMouseLeave={() => setShowUserDropdown(false)}
              >
                <button className="hover:text-orange-500">
                  <User size={24} />
                </button>
                
                {showUserDropdown && (
                  <div 
                    className="absolute right-0 top-full pt-2 z-50"
                  >
                    <div className="w-48 bg-gray-900 border-2 border-orange-500 rounded-lg shadow-2xl">
                      <button
                        onClick={() => window.open('https://www.indeed.com', '_blank')}
                        className="w-full px-4 py-3 text-left hover:bg-orange-600 transition flex items-center gap-2 rounded-lg"
                      >
                        <span>🚪</span>
                        <span>Leave</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
              <button 
                onClick={() => {
                  setShowCartPage(true);
                  setDeliveryAddress(randomAddresses[Math.floor(Math.random() * randomAddresses.length)]);
                  handleInteraction();
                }} 
                className="relative hover:text-orange-500"
              >
                <ShoppingCart size={24} />
                {cart > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Search Bar */}
          {showSearch && (
            <div className="mt-4 pb-4">
              <div className="max-w-2xl mx-auto">
                <input
                  type="text"
                  value={searchValue}
                  onChange={handleSearchChange}
                  placeholder="Search for spooky items..."
                  className="w-full bg-gray-900 border-2 border-orange-500 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400"
                />
                <p className="text-xs text-gray-400 mt-2 text-center">
                  🔒 Encrypted search for your security
                </p>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Cart Page */}
      {showCartPage ? (
        <div className="container mx-auto px-4 py-12 min-h-screen">
          <h2 className="text-4xl font-bold mb-8 flex items-center gap-2">
            <ShoppingCart />
            Your Shopping Cart
          </h2>

          {cartItems.length === 0 ? (
            <div className="text-center py-16">
              <Ghost className="mx-auto mb-4 text-gray-600" size={80} />
              <p className="text-2xl text-gray-400">Your cart is empty! 👻</p>
              <button 
                onClick={resetSearch}
                className="mt-6 bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-lg font-bold"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div 
                    key={item.id}
                    className="bg-gray-900 border-2 border-orange-500 rounded-lg p-6 flex items-center gap-6"
                  >
                    <div className="text-5xl">{item.emoji}</div>
                    <div className="flex-1">
                      <h3 className={`text-xl font-bold mb-2 ${glitchText ? 'blur-sm' : ''}`}>
                        {item.name}
                      </h3>
                      <p className="text-orange-400 text-lg">${item.price}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => removeFromCart(item.id)}
                        disabled={buttonsDisabled}
                        className="bg-red-600 hover:bg-red-700 text-white w-8 h-8 rounded disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="text-xl font-bold w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => addToCart(item, null)}
                        disabled={buttonsDisabled}
                        className="bg-green-600 hover:bg-green-700 text-white w-8 h-8 rounded disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-xl font-bold text-orange-400">
                      ${(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="lg:col-span-1">
                <div className="bg-gray-900 border-2 border-orange-500 rounded-lg p-6 sticky top-24">
                  <h3 className="text-2xl font-bold mb-6">Order Summary</h3>
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div>
                      <div className="flex justify-between">
                        <span>Delivery Fee:</span>
                        <span>${(cartTotal * 1.5).toFixed(2)}</span>
                      </div>
                      <div className="text-xs text-gray-400 ml-4 mt-1">
                        Location: {deliveryAddress}
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax:</span>
                      <span>${(cartTotal * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-orange-500 pt-3 flex justify-between text-xl font-bold">
                      <span>Total:</span>
                      <span className="text-orange-400">${(cartTotal + (cartTotal * 1.5) + cartTotal * 0.08).toFixed(2)}</span>
                    </div>
                  </div>
                  <button
                    onClick={handleInteraction}
                    disabled={buttonsDisabled}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-3 rounded-lg font-bold mb-3 disabled:opacity-50"
                  >
                    {buttonsDisabled ? '⏳ LOCKED...' : 'Proceed to Checkout'}
                  </button>
                  <button
                    onClick={resetSearch}
                    className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-bold"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          {/* Hero Banner - Only show when not searching */}
          {!searchValue && (
        <div className="bg-gradient-to-r from-orange-700 to-purple-800 py-16 px-4 text-center border-b-4 border-orange-500">
          <h2 className={`text-5xl font-bold mb-4 ${glitchText ? 'blur-sm' : ''}`}>
            🎃 HALLOWEEN SALE 🎃
          </h2>
          <p className="text-xl mb-6">Up to 50% OFF Spooky Essentials!</p>
          <button 
            onClick={handleInteraction}
            disabled={buttonsDisabled}
            className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg font-bold rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {buttonsDisabled ? '⏳ LOCKED...' : 'SHOP NOW'}
          </button>
        </div>
      )}

      {/* Products Grid */}
      <div className="container mx-auto px-4 py-12">
        <h3 className="text-3xl font-bold mb-8 flex items-center gap-2">
          <Candy />
          {searchValue ? `Search Results for "${searchValue}"` : 'Featured Products'}
        </h3>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Ghost className="mx-auto mb-4 text-gray-600" size={80} />
            <p className="text-2xl text-gray-400">No spooky items found! 👻</p>
            <p className="text-gray-500 mt-2">Try a different search term</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div 
                key={product.id}
                className="bg-gray-900 border-2 border-orange-500 rounded-lg p-6 hover:shadow-2xl hover:shadow-orange-500/50 transition"
                onClick={handleInteraction}
              >
                <div className="text-6xl text-center mb-4">{product.emoji}</div>
                <h4 className={`text-xl font-bold mb-2 ${glitchText ? 'blur-sm' : ''}`}>
                  {product.name}
                </h4>
                <p className="text-2xl text-orange-400 mb-4">${product.price}</p>
                
                <div className="space-y-2">
                  <button
                    onMouseEnter={() => {
                      if (Math.random() < 0.5) moveButton(`add-${product.id}`);
                    }}
                    onClick={() => addToCart(product, `add-${product.id}`)}
                    disabled={buttonsDisabled}
                    style={buttonPositions[`add-${product.id}`] ? getButtonStyle(`add-${product.id}`) : {}}
                    className="w-full bg-orange-600 hover:bg-orange-700 text-white py-2 px-4 rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {buttonsDisabled ? '🔒 LOCKED' : 'Add to Cart'}
                  </button>
                  
                  <button
                    onClick={handleInteraction}
                    disabled={buttonsDisabled}
                    className="w-full bg-purple-700 hover:bg-purple-800 text-white py-2 px-4 rounded font-bold flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Heart size={16} />
                    Wishlist
                  </button>
                  
                  <div className="text-xs text-gray-400 mt-3 space-y-2">
                    <p className="leading-relaxed">
                      {product.description}
                    </p>
                    
                    <div>
                      <p className="font-semibold text-gray-300">Includes:</p>
                      <ul className="list-disc list-inside ml-2 space-y-1">
                        {product.includes.map((item, idx) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <p className="font-semibold text-gray-300">Details:</p>
                      <ul className="list-disc list-inside ml-2 space-y-1">
                        {product.details.map((detail, idx) => (
                          <li key={idx}>{detail}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-black bg-opacity-80 py-16 px-4 border-y-4 border-orange-500">
        <div className="container mx-auto max-w-2xl text-center">
          <h3 className={`text-3xl font-bold mb-4 ${glitchText ? 'blur-sm' : ''}`}>
            👻 Join Our Haunted Newsletter 👻
          </h3>
          <p className="mb-6">Get exclusive spooky deals and updates!</p>
          
          <div className="flex gap-4">
            <input
              type="email"
              placeholder={buttonsDisabled ? "LOCKED..." : "Enter your email..."}
              onClick={handleInteraction}
              onFocus={handleInteraction}
              disabled={buttonsDisabled}
              className="flex-1 bg-gray-900 border-2 border-orange-500 rounded px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-orange-400"
            />
            <button
              onClick={handleInteraction}
              disabled={buttonsDisabled}
              className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {buttonsDisabled ? '⏳' : 'Subscribe'}
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-black py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Skull />
                About Us
              </h4>
              <p className="text-gray-400 text-sm">
                Your #1 destination for all things spooky and Halloween!
              </p>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Shop</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" onClick={handleInteraction} className="hover:text-orange-500">Costumes</a></li>
                <li><a href="#" onClick={handleInteraction} className="hover:text-orange-500">Decorations</a></li>
                <li><a href="#" onClick={handleInteraction} className="hover:text-orange-500">Candy</a></li>
                <li><a href="#" onClick={handleInteraction} className="hover:text-orange-500">Accessories</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Customer Service</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" onClick={handleInteraction} className="hover:text-orange-500">Contact Us</a></li>
                <li><a href="#" onClick={handleInteraction} className="hover:text-orange-500">Shipping Info</a></li>
                <li><a href="#" onClick={handleInteraction} className="hover:text-orange-500">Returns</a></li>
                <li><a href="#" onClick={handleInteraction} className="hover:text-orange-500">FAQ</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-xl font-bold mb-4">Follow Us</h4>
              <ul className="space-y-2 text-gray-400 text-sm">
                <li><a href="#" onClick={handleInteraction} className="hover:text-orange-500">Instagram</a></li>
                <li><a href="#" onClick={handleInteraction} className="hover:text-orange-500">Facebook</a></li>
                <li><a href="#" onClick={handleInteraction} className="hover:text-orange-500">Twitter</a></li>
                <li><a href="#" onClick={handleInteraction} className="hover:text-orange-500">TikTok</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>© 2025 Spooky Shop. All rights reserved. 👻</p>
          </div>
        </div>
      </footer>
        </>
      )}
    </div>
  );
}