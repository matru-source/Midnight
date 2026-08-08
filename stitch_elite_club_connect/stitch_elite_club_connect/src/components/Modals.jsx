import React, { useState } from 'react';
import { 
  X, 
  MapPin, 
  QrCode, 
  CheckCircle, 
  Calendar, 
  Users, 
  Wine, 
  Sparkles, 
  ShieldCheck,
  Building2,
  UserCheck,
  User,
  ArrowRight,
  Lock,
  Search,
  ChevronRight,
  ArrowLeft
} from 'lucide-react';
import { INDIAN_STATES_AND_DISTRICTS } from '../data/mockData';

/* Mandatory 2-Tier Location Gate Modal (State Selection -> District Selection) */
export function MandatoryLocationGateModal({ isOpen, onSelectLocation }) {
  if (!isOpen) return null;

  const [selectedStateObj, setSelectedStateObj] = useState(null); // null = selecting state; object = selecting district
  const [searchQuery, setSearchQuery] = useState('');

  // Filter states or districts based on query
  const filteredStates = INDIAN_STATES_AND_DISTRICTS.filter((s) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      s.state.toLowerCase().includes(q) ||
      s.districts.some(d => d.name.toLowerCase().includes(q) || d.tag.toLowerCase().includes(q))
    );
  });

  const handleStateClick = (stateObj) => {
    setSelectedStateObj(stateObj);
    setSearchQuery('');
  };

  const handleDistrictClick = (districtName, stateName) => {
    onSelectLocation(`${districtName}, ${stateName}`);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="glass-card rounded-3xl max-w-3xl w-full p-6 sm:p-8 border border-white/20 relative shadow-2xl my-auto">
        
        {/* Header Breadcrumb */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-fixed/30 bg-primary-fixed/10 text-primary-fixed text-xs font-bold uppercase tracking-widest mb-3">
            <Lock className="w-3.5 h-3.5" />
            {selectedStateObj ? `Step 1b: Select District in ${selectedStateObj.state}` : 'Step 1a: Select Indian State'}
          </div>

          <h1 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight mb-1">
            {selectedStateObj ? `Districts in ${selectedStateObj.state}` : 'Select Indian State / Region'}
          </h1>
          <p className="text-xs text-on-surface-variant max-w-md mx-auto">
            {selectedStateObj 
              ? `Choose your specific district or city in ${selectedStateObj.state} to unlock localized nightlife.`
              : 'Select your state first, then choose your district or major city.'}
          </p>
        </div>

        {/* Back Button if in District Mode */}
        {selectedStateObj && (
          <button 
            onClick={() => {
              setSelectedStateObj(null);
              setSearchQuery('');
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-primary-fixed hover:underline mb-4 bg-primary-container/10 px-3 py-1.5 rounded-lg border border-primary-fixed/30"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All States</span>
          </button>
        )}

        {/* Search Bar Automation */}
        <div className="relative mb-5 max-w-xl mx-auto">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-fixed" />
          <input
            type="text"
            placeholder={selectedStateObj ? `Search district in ${selectedStateObj.state}...` : "Search Indian State or District (e.g. Maharashtra, Goa, Bengaluru)..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-high/80 border border-white/20 focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed rounded-2xl pl-11 pr-10 py-3 text-xs sm:text-sm text-white placeholder-on-surface-variant/60 shadow-inner transition-all"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* VIEW 1: STATE SELECTION */}
        {!selectedStateObj && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[340px] overflow-y-auto custom-scrollbar pr-1 mb-6">
            {filteredStates.map((s) => (
              <div
                key={s.state}
                onClick={() => handleStateClick(s)}
                className="glass-card rounded-2xl p-4 border border-white/10 hover:border-primary-fixed cursor-pointer transition-all duration-200 hover:scale-[1.02] group flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{s.icon || '📍'}</span>
                    <span className="font-headline text-base font-bold text-white group-hover:text-primary-fixed transition-colors">
                      {s.state}
                    </span>
                  </div>
                  <p className="text-[10px] text-on-surface-variant mt-0.5">
                    {s.districts.length} District(s) / Cities
                  </p>
                </div>
                <ChevronRight className="w-4 h-4 text-on-surface-variant group-hover:text-primary-fixed transition-colors" />
              </div>
            ))}
          </div>
        )}

        {/* VIEW 2: DISTRICT SELECTION */}
        {selectedStateObj && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[340px] overflow-y-auto custom-scrollbar pr-1 mb-6">
            {selectedStateObj.districts
              .filter(d => {
                const q = searchQuery.toLowerCase().trim();
                return !q || d.name.toLowerCase().includes(q) || d.tag.toLowerCase().includes(q);
              })
              .map((d) => (
                <div
                  key={d.name}
                  onClick={() => handleDistrictClick(d.name, selectedStateObj.state)}
                  className="glass-card rounded-2xl p-4 border border-white/10 hover:border-primary-fixed cursor-pointer transition-all duration-200 hover:scale-[1.02] group flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-0.5">
                      <MapPin className="w-4 h-4 text-primary-fixed" />
                      <span className="font-headline text-base font-bold text-white group-hover:text-primary-fixed transition-colors">
                        {d.name}
                      </span>
                    </div>
                    <p className="text-[10px] text-on-surface-variant">{d.tag}</p>
                  </div>
                  <span className="text-[10px] uppercase font-bold text-primary-fixed bg-primary-container/20 px-2 py-1 rounded border border-primary-fixed/30">
                    Select
                  </span>
                </div>
              ))}
          </div>
        )}

        <div className="text-center border-t border-white/10 pt-4">
          <p className="text-[11px] text-on-surface-variant">
            🔒 2-Tier Selection Required. Pick State first, then select your District/City.
          </p>
        </div>
      </div>
    </div>
  );
}

/* Mandatory Step 2: Auth Gate Modal (Sign In vs Guest Entry) */
export function AuthGateModal({ isOpen, selectedCity, onCompleteAuth, onContinueAsGuest }) {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('customer'); // 'customer' | 'owner' | 'admin'

  const handleSignInSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;
    onCompleteAuth({
      name: name.trim(),
      email: email.trim() || `${name.toLowerCase().replace(/\s+/g, '')}@vip.midnight.in`,
      role,
      isGuest: false
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-2xl flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      <div className="glass-card rounded-3xl max-w-lg w-full p-8 border border-white/20 relative shadow-2xl my-auto">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-secondary/40 bg-secondary/10 text-secondary text-xs font-bold uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            Step 2 of 2 • Welcome to {selectedCity}
          </div>
          
          <h2 className="font-headline text-3xl font-bold text-white tracking-tight">
            Sign In or Access as Guest
          </h2>
          <p className="text-xs text-on-surface-variant mt-1">
            Choose how you would like to experience Midnight Premium in <span className="text-primary-fixed font-bold">{selectedCity}</span>.
          </p>
        </div>

        {/* Sign In Form */}
        <form onSubmit={handleSignInSubmit} className="space-y-4 mb-6">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Your Full Name</label>
            <input 
              type="text" 
              placeholder="e.g. Rohan Sharma"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-surface-container-high/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary-fixed focus:ring-0 placeholder-on-surface-variant/50"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Email / Mobile (Optional)</label>
            <input 
              type="text" 
              placeholder="e.g. rohan@gmail.com or +91 9876543210"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-surface-container-high/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary-fixed focus:ring-0 placeholder-on-surface-variant/50"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1.5">Select Account Role</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setRole('customer')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                  role === 'customer'
                    ? 'bg-primary-container/20 border-primary-fixed text-primary-fixed font-bold shadow-[0_0_10px_rgba(0,240,255,0.2)]'
                    : 'bg-surface-container-high/40 border-white/10 text-on-surface-variant hover:bg-white/5'
                }`}
              >
                <User className="w-4 h-4" />
                <span className="text-[11px]">VIP Guest</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('owner')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                  role === 'owner'
                    ? 'bg-secondary-container/20 border-secondary text-secondary font-bold shadow-[0_0_10px_rgba(255,36,228,0.2)]'
                    : 'bg-surface-container-high/40 border-white/10 text-on-surface-variant hover:bg-white/5'
                }`}
              >
                <Building2 className="w-4 h-4" />
                <span className="text-[11px]">Club Owner</span>
              </button>

              <button
                type="button"
                onClick={() => setRole('admin')}
                className={`p-2.5 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                  role === 'admin'
                    ? 'bg-error-container/30 border-error text-error font-bold'
                    : 'bg-surface-container-high/40 border-white/10 text-on-surface-variant hover:bg-white/5'
                }`}
              >
                <ShieldCheck className="w-4 h-4" />
                <span className="text-[11px]">Super Admin</span>
              </button>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full gradient-btn py-3.5 rounded-xl font-label-md text-sm font-bold shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
          >
            <span>Sign In & Unlock Nightlife</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold text-on-surface-variant">
            <span className="bg-surface px-3">Or Continue Without Signing In</span>
          </div>
        </div>

        <button 
          onClick={onContinueAsGuest}
          className="w-full py-3 rounded-xl border border-white/20 text-on-surface hover:bg-white/10 transition-colors font-label-md text-xs font-bold"
        >
          Continue as Guest VIP (Limited Privileges)
        </button>
      </div>
    </div>
  );
}

export function TableBookingModal({ table, isOpen, onClose, onConfirm }) {
  if (!isOpen || !table) return null;

  const [guestCount, setGuestCount] = useState(table.capacity || 4);
  const [selectedPackage, setSelectedPackage] = useState('Premium Single Malt & Champagne Package');

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      tableId: table.id,
      tableName: table.name,
      guestCount,
      minSpend: table.minSpend,
      package: selectedPackage
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="glass-card rounded-2xl max-w-lg w-full p-6 border border-white/20 relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-white p-1 rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-primary-fixed mb-1 font-label-sm text-xs font-bold uppercase tracking-widest">
          <Sparkles className="w-4 h-4 text-primary-fixed" />
          VIP Reservation • India
        </div>

        <h2 className="font-headline text-2xl font-bold text-white mb-1">
          Reserve {table.name}
        </h2>
        <p className="text-xs text-on-surface-variant mb-6">
          {table.zone} • Minimum Spend: <span className="text-primary-fixed font-bold">₹{table.minSpend.toLocaleString()}</span>
        </p>

        <form onSubmit={handleBookingSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Guest Headcount</label>
            <input 
              type="number" 
              min="1" 
              max={table.capacity || 10} 
              value={guestCount}
              onChange={(e) => setGuestCount(Number(e.target.value))}
              className="w-full bg-surface-container-high/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary-fixed focus:ring-0"
            />
            <p className="text-[11px] text-on-surface-variant mt-1">Maximum table capacity: {table.capacity} guests</p>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Included Bottle Service Package</label>
            <select 
              value={selectedPackage}
              onChange={(e) => setSelectedPackage(e.target.value)}
              className="w-full bg-surface-container-high/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary-fixed focus:ring-0 [color-scheme:dark]"
            >
              <option value="Premium Single Malt & Champagne Package">Dom Pérignon + Rampur Single Malt (₹45,000)</option>
              <option value="Clase Azul Tequila Experience">Clase Azul Reposado + Mixer Carafes (₹55,000)</option>
              <option value="Custom Bottle Selection">Custom Bottle Service on Arrival</option>
            </select>
          </div>

          <div className="p-4 rounded-xl bg-surface-container-lowest/60 border border-white/10 text-xs space-y-1">
            <div className="flex justify-between text-on-surface-variant">
              <span>Advance Booking Deposit Required:</span>
              <span className="text-white font-bold">₹5,000</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Minimum Spend Balance:</span>
              <span className="text-primary-fixed font-bold">₹{(table.minSpend - 5000).toLocaleString()} (Due at Venue)</span>
            </div>
          </div>

          <button 
            type="submit"
            className="w-full gradient-btn py-3.5 rounded-xl font-label-md text-sm font-bold shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:opacity-90 transition-opacity mt-2"
          >
            Confirm VIP Table Booking
          </button>
        </form>
      </div>
    </div>
  );
}

export function GuestlistModal({ club, isOpen, onClose, onConfirm, userAuth }) {
  if (!isOpen || !club) return null;

  const [guestName, setGuestName] = useState(userAuth?.name || 'Aarav Kapoor');
  const [ticketCount, setTicketCount] = useState(1);

  const handleGuestlistSubmit = (e) => {
    e.preventDefault();
    onConfirm({
      clubName: club.name,
      guestName,
      ticketCount,
      passId: `MID-IND-${Math.floor(100000 + Math.random() * 900000)}`
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="glass-card rounded-2xl max-w-md w-full p-6 border border-white/20 relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-white p-1 rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-primary-container/20 border border-primary-fixed/40 flex items-center justify-center mx-auto mb-3 text-primary-fixed">
            <QrCode className="w-6 h-6" />
          </div>
          <h2 className="font-headline text-2xl font-bold text-white">Join Free VIP Guestlist</h2>
          <p className="text-xs text-on-surface-variant mt-1">{club.name} • VIP Entry Pass</p>
        </div>

        <form onSubmit={handleGuestlistSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Primary Guest Name</label>
            <input 
              type="text" 
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              className="w-full bg-surface-container-high/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary-fixed focus:ring-0"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Number of Passes</label>
            <select 
              value={ticketCount}
              onChange={(e) => setTicketCount(Number(e.target.value))}
              className="w-full bg-surface-container-high/60 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:border-primary-fixed focus:ring-0 [color-scheme:dark]"
            >
              <option value="1">1 Pass (Single VIP Entry)</option>
              <option value="2">2 Passes (+1 Couple Entry)</option>
              <option value="4">4 Passes (VIP Group)</option>
            </select>
          </div>

          <div className="p-3.5 rounded-xl bg-surface-container-lowest/60 border border-white/10 text-xs text-on-surface-variant">
            ⚡ Entry before <span className="text-white font-bold">11:00 PM</span> includes express priority line bypass.
          </div>

          <button 
            type="submit"
            className="w-full gradient-btn py-3.5 rounded-xl font-label-md text-sm font-bold shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:opacity-90 transition-opacity"
          >
            Generate Fast-Pass QR Code
          </button>
        </form>
      </div>
    </div>
  );
}

/* 2-Tier City Selector Modal (State -> District) */
export function CitySelectorModal({ isOpen, onClose, selectedCity, onSelectLocation }) {
  if (!isOpen) return null;

  const [selectedStateObj, setSelectedStateObj] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="glass-card rounded-3xl max-w-lg w-full p-6 border border-white/20 relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-white p-1 rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-primary-fixed">
            <MapPin className="w-5 h-5 text-primary-fixed" />
            <h3 className="font-headline text-xl text-white font-bold">
              {selectedStateObj ? `Districts in ${selectedStateObj.state}` : 'Select Indian State'}
            </h3>
          </div>
          {selectedStateObj && (
            <button 
              onClick={() => setSelectedStateObj(null)}
              className="text-xs text-primary-fixed hover:underline font-bold"
            >
              ← Change State
            </button>
          )}
        </div>

        {/* Search Bar Input */}
        <div className="relative mb-3">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-on-surface-variant" />
          <input
            type="text"
            placeholder={selectedStateObj ? `Search district in ${selectedStateObj.state}...` : "Search State or District..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-high/80 border border-white/10 focus:border-primary-fixed focus:ring-1 focus:ring-primary-fixed rounded-xl pl-10 pr-8 py-2.5 text-xs text-white placeholder-on-surface-variant/50"
          />
        </div>

        {/* STATE LEVEL VIEW */}
        {!selectedStateObj && (
          <div className="space-y-1.5 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
            {INDIAN_STATES_AND_DISTRICTS
              .filter(s => !searchQuery || s.state.toLowerCase().includes(searchQuery.toLowerCase()) || s.districts.some(d => d.name.toLowerCase().includes(searchQuery.toLowerCase())))
              .map((s) => (
                <button
                  key={s.state}
                  onClick={() => {
                    setSelectedStateObj(s);
                    setSearchQuery('');
                  }}
                  className="w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold bg-surface-container-high/40 text-on-surface hover:bg-white/10 transition-all"
                >
                  <div className="flex items-center gap-2">
                    <span>{s.icon || '📍'}</span>
                    <span className="font-bold">{s.state}</span>
                    <span className="text-[10px] text-on-surface-variant">({s.districts.length} Districts)</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-on-surface-variant" />
                </button>
              ))}
          </div>
        )}

        {/* DISTRICT LEVEL VIEW */}
        {selectedStateObj && (
          <div className="space-y-1.5 max-h-[300px] overflow-y-auto custom-scrollbar pr-1">
            {selectedStateObj.districts
              .filter(d => !searchQuery || d.name.toLowerCase().includes(searchQuery.toLowerCase()) || d.tag.toLowerCase().includes(searchQuery.toLowerCase()))
              .map((d) => {
                const fullLoc = `${d.name}, ${selectedStateObj.state}`;
                const isSelected = selectedCity === fullLoc || selectedCity === d.name;

                return (
                  <button
                    key={d.name}
                    onClick={() => {
                      onSelectLocation(fullLoc);
                      onClose();
                    }}
                    className={`w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      isSelected
                        ? 'bg-primary-container/20 text-primary-fixed border border-primary-fixed/50 font-bold'
                        : 'bg-surface-container-high/40 text-on-surface hover:bg-white/10'
                    }`}
                  >
                    <div className="text-left">
                      <p className="font-bold">{d.name}</p>
                      <p className="text-[10px] text-on-surface-variant font-normal">{d.tag}</p>
                    </div>
                    {isSelected && <CheckCircle className="w-4 h-4 text-primary-fixed shrink-0" />}
                  </button>
                );
              })}
          </div>
        )}
      </div>
    </div>
  );
}

export function NotificationToast({ message, onClose }) {
  if (!message) return null;

  return (
    <div className="fixed top-24 right-6 z-50 glass-card px-5 py-3.5 rounded-xl border border-primary-fixed/40 neon-glow text-white text-xs font-semibold flex items-center gap-3 shadow-2xl animate-bounce">
      <Sparkles className="w-4 h-4 text-primary-fixed shrink-0" />
      <span>{message}</span>
      <button onClick={onClose} className="text-on-surface-variant hover:text-white ml-2">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
