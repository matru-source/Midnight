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
  ShieldCheck 
} from 'lucide-react';

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

export function GuestlistModal({ club, isOpen, onClose, onConfirm }) {
  if (!isOpen || !club) return null;

  const [guestName, setGuestName] = useState('Aarav Kapoor');
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

export function CitySelectorModal({ isOpen, onClose, selectedCity, onSelectCity }) {
  if (!isOpen) return null;

  const cities = ['Mumbai', 'Bengaluru', 'Delhi NCR', 'Goa', 'Hyderabad', 'Pune', 'Kolkata'];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn">
      <div className="glass-card rounded-2xl max-w-sm w-full p-6 border border-white/20 relative shadow-2xl">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-on-surface-variant hover:text-white p-1 rounded-full hover:bg-white/10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-primary-fixed mb-4">
          <MapPin className="w-5 h-5 text-primary-fixed" />
          <h3 className="font-headline text-xl text-white font-bold">Select Indian City</h3>
        </div>

        <div className="space-y-2">
          {cities.map((city) => (
            <button
              key={city}
              onClick={() => {
                onSelectCity(city);
                onClose();
              }}
              className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                selectedCity === city
                  ? 'bg-primary-container/20 text-primary-fixed border border-primary-fixed/50 font-bold'
                  : 'bg-surface-container-high/40 text-on-surface hover:bg-white/10'
              }`}
            >
              <span>{city}</span>
              {selectedCity === city && <CheckCircle className="w-4 h-4 text-primary-fixed" />}
            </button>
          ))}
        </div>
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
