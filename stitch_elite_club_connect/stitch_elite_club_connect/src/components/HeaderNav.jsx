import React, { useState } from 'react';
import { 
  Sparkles, 
  MapPin, 
  Bell, 
  Menu, 
  X, 
  Compass, 
  Calendar, 
  ShieldCheck, 
  LayoutDashboard, 
  Building2,
  ChevronDown,
  User,
  LogOut,
  ExternalLink,
  RotateCcw
} from 'lucide-react';

export default function HeaderNav({ 
  activeRole,
  onSwitchRole,
  userAuth,
  onResetOnboarding,
  currentView, 
  setCurrentView, 
  selectedCity, 
  setIsCityModalOpen,
  notificationCount,
  onOpenNotifications 
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const userName = userAuth?.name || (userAuth?.isGuest ? 'Guest VIP' : 'VIP Member');
  const userInitials = userName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-surface/20 backdrop-blur-[40px] border-b border-white/10 flex justify-between items-center px-margin-mobile md:px-margin-desktop h-20">
        
        {/* Brand Logo & Context Header */}
        <div className="flex items-center gap-4">
          <div 
            onClick={() => {
              if (activeRole === 'customer') setCurrentView('discovery');
            }}
            className="cursor-pointer group flex items-center gap-2"
          >
            <span className="font-display text-2xl md:text-3xl font-bold tracking-tighter text-primary-fixed group-hover:text-primary transition-colors">
              Midnight Premium
            </span>

            {/* Role-specific Badge */}
            {activeRole === 'customer' && (
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-primary-container/20 text-primary-fixed border border-primary-fixed/30">
                INDIA VIP
              </span>
            )}
            {activeRole === 'owner' && (
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-secondary-container/20 text-secondary border border-secondary/40">
                PARTNER CONSOLE
              </span>
            )}
            {activeRole === 'admin' && (
              <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[10px] uppercase font-bold tracking-widest bg-error-container/30 text-error border border-error/40">
                ADMIN HQ COMMAND
              </span>
            )}
          </div>

          {/* Location Selector (Customer Portal Only) */}
          {activeRole === 'customer' && (
            <div 
              onClick={() => setIsCityModalOpen(true)}
              className="hidden lg:flex items-center gap-2 ml-6 glass-panel px-4 py-2 rounded-full cursor-pointer hover:bg-white/10 transition-all border border-white/15"
            >
              <MapPin className="w-4 h-4 text-primary-fixed" />
              <span className="font-label-md text-sm text-on-surface font-medium">{selectedCity || 'Select City'}</span>
              <ChevronDown className="w-4 h-4 text-on-surface-variant" />
            </div>
          )}
        </div>

        {/* CUSTOMER PORTAL NAVIGATION */}
        {activeRole === 'customer' && (
          <nav className="hidden md:flex items-center gap-2 bg-surface-container-lowest/40 p-1.5 rounded-full border border-white/10">
            <button
              onClick={() => setCurrentView('discovery')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-label-md text-sm transition-all duration-200 ${
                currentView === 'discovery'
                  ? 'bg-primary-container/20 text-primary-fixed font-bold border border-primary-fixed/40 neon-glow shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : 'text-on-surface-variant hover:text-white hover:bg-white/5'
              }`}
            >
              <Compass className="w-4 h-4 text-primary-fixed" />
              <span>Discover</span>
            </button>

            <button
              onClick={() => setCurrentView('club-detail')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-label-md text-sm transition-all duration-200 ${
                currentView === 'club-detail'
                  ? 'bg-primary-container/20 text-primary-fixed font-bold border border-primary-fixed/40 neon-glow shadow-[0_0_15px_rgba(0,240,255,0.2)]'
                  : 'text-on-surface-variant hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="w-4 h-4 text-primary-fixed" />
              <span>The Void Room</span>
            </button>
          </nav>
        )}

        {/* OWNER PORTAL NAVIGATION */}
        {activeRole === 'owner' && (
          <div className="hidden md:flex items-center gap-3 text-xs text-on-surface-variant">
            <span className="px-3 py-1 rounded-full bg-surface-container-high border border-white/10 text-white font-bold">
              Venue: The Void Room (BKC Annex, Mumbai)
            </span>
            <button
              onClick={() => onSwitchRole('customer')}
              className="flex items-center gap-1.5 text-primary-fixed hover:underline font-bold px-3 py-1"
            >
              <span>View Public Web Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* ADMIN PORTAL NAVIGATION */}
        {activeRole === 'admin' && (
          <div className="hidden md:flex items-center gap-3 text-xs text-on-surface-variant">
            <span className="px-3 py-1 rounded-full bg-error-container/20 border border-error/30 text-error font-bold">
              HQ System Security Clearances Active
            </span>
            <button
              onClick={() => onSwitchRole('customer')}
              className="flex items-center gap-1.5 text-primary-fixed hover:underline font-bold px-3 py-1"
            >
              <span>View Public Web Site</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Header Right Actions & Profile Badge */}
        <div className="flex items-center gap-3">
          {/* Personalized Greeting Pill (Desktop) */}
          <div className="hidden xl:flex items-center gap-2 glass-panel px-3 py-1.5 rounded-full border border-white/10 text-xs">
            <span className="w-2 h-2 rounded-full bg-primary-fixed animate-pulse"></span>
            <span className="text-on-surface font-semibold">
              Namaste, <span className="text-primary-fixed font-bold">{userName}</span>!
            </span>
          </div>

          {/* Mobile Location Button */}
          {activeRole === 'customer' && (
            <button 
              onClick={() => setIsCityModalOpen(true)}
              className="lg:hidden text-primary-fixed hover:bg-white/5 p-2 rounded-full active:scale-95 transition-all"
            >
              <MapPin className="w-5 h-5 text-primary-fixed" />
            </button>
          )}

          {/* Notifications Button */}
          <button 
            onClick={onOpenNotifications}
            className="relative text-primary-fixed hover:bg-white/5 p-2 rounded-full active:scale-95 transition-all"
          >
            <Bell className="w-5 h-5 text-primary-fixed" />
            {notificationCount > 0 && (
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-secondary-container rounded-full border-2 border-surface animate-ping"></span>
            )}
          </button>

          {/* User Profile Avatar & Persona Switcher */}
          <div className="relative">
            <div 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="h-10 w-10 rounded-full overflow-hidden border-2 border-primary-fixed/50 cursor-pointer hover:border-primary-fixed transition-colors flex items-center justify-center bg-primary-container/20 font-bold text-primary-fixed text-sm shadow-[0_0_10px_rgba(0,240,255,0.2)]"
            >
              {userInitials || 'VIP'}
            </div>

            {/* Profile & Portal Role Switcher Dropdown */}
            {isProfileMenuOpen && (
              <div className="absolute right-0 top-12 w-64 glass-card rounded-2xl p-4 border border-white/20 shadow-2xl z-50 animate-fadeIn text-xs space-y-3">
                <div className="border-b border-white/10 pb-3">
                  <p className="font-bold text-white text-sm">{userName}</p>
                  <p className="text-on-surface-variant font-medium">Location: <span className="text-primary-fixed font-bold">{selectedCity || 'Mumbai'}</span></p>
                  <p className="text-on-surface-variant text-[11px]">Role: <span className="uppercase text-primary-fixed font-bold">{userAuth?.isGuest ? 'Guest VIP' : activeRole}</span></p>
                </div>

                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-on-surface-variant tracking-wider px-2">Switch Portal Role</p>
                  
                  <button
                    onClick={() => {
                      onSwitchRole('customer');
                      setIsProfileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-colors ${
                      activeRole === 'customer' ? 'bg-primary-container/20 text-primary-fixed font-bold' : 'hover:bg-white/5 text-on-surface'
                    }`}
                  >
                    <User className="w-4 h-4 text-primary-fixed" />
                    <span>Customer Web App</span>
                  </button>

                  <button
                    onClick={() => {
                      onSwitchRole('owner');
                      setIsProfileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-colors ${
                      activeRole === 'owner' ? 'bg-secondary-container/20 text-secondary font-bold' : 'hover:bg-white/5 text-on-surface'
                    }`}
                  >
                    <Building2 className="w-4 h-4 text-secondary" />
                    <span>Club Owner Partner Portal</span>
                  </button>

                  <button
                    onClick={() => {
                      onSwitchRole('admin');
                      setIsProfileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-3 py-2 rounded-xl text-left transition-colors ${
                      activeRole === 'admin' ? 'bg-error-container/30 text-error font-bold' : 'hover:bg-white/5 text-on-surface'
                    }`}
                  >
                    <ShieldCheck className="w-4 h-4 text-error" />
                    <span>Admin Command HQ</span>
                  </button>
                </div>

                <div className="border-t border-white/10 pt-2 space-y-1">
                  <button
                    onClick={() => {
                      setIsCityModalOpen(true);
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-on-surface-variant hover:text-white hover:bg-white/5 text-left"
                  >
                    <MapPin className="w-3.5 h-3.5 text-primary-fixed" />
                    <span>Change City ({selectedCity})</span>
                  </button>

                  <button
                    onClick={() => {
                      onResetOnboarding();
                      setIsProfileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-2 px-3 py-1.5 rounded-lg text-error hover:bg-error-container/20 text-left font-bold"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-error" />
                    <span>Sign Out / Change Location</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-primary-fixed p-2 rounded-full hover:bg-white/5"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 top-20 bg-surface/95 backdrop-blur-2xl z-40 md:hidden flex flex-col p-6 space-y-4 border-b border-white/10 animate-fadeIn">
          <div className="p-3 rounded-xl bg-surface-container-high border border-white/10 text-xs mb-2">
            <p className="text-on-surface-variant">Logged in as: <span className="text-primary-fixed font-bold">{userName}</span></p>
            <p className="text-on-surface-variant">Active City: <span className="text-white font-bold">{selectedCity || 'Mumbai'}</span></p>
          </div>

          <div className="text-xs uppercase tracking-widest text-on-surface-variant font-bold mb-1">
            Switch Portal Role
          </div>

          <button
            onClick={() => {
              onSwitchRole('customer');
              setIsMobileMenuOpen(false);
            }}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl font-label-md text-base transition-all ${
              activeRole === 'customer'
                ? 'bg-primary-container/20 text-primary-fixed border border-primary-fixed/50 font-bold shadow-[0_0_15px_rgba(0,240,255,0.15)]'
                : 'text-on-surface-variant hover:bg-white/5'
            }`}
          >
            <User className="w-5 h-5" />
            <span>Customer Web Portal</span>
          </button>

          <button
            onClick={() => {
              onSwitchRole('owner');
              setIsMobileMenuOpen(false);
            }}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl font-label-md text-base transition-all ${
              activeRole === 'owner'
                ? 'bg-secondary-container/20 text-secondary border border-secondary/50 font-bold shadow-[0_0_15px_rgba(255,36,228,0.15)]'
                : 'text-on-surface-variant hover:bg-white/5'
            }`}
          >
            <Building2 className="w-5 h-5" />
            <span>Club Owner Console</span>
          </button>

          <button
            onClick={() => {
              onSwitchRole('admin');
              setIsMobileMenuOpen(false);
            }}
            className={`flex items-center gap-4 px-5 py-4 rounded-xl font-label-md text-base transition-all ${
              activeRole === 'admin'
                ? 'bg-error-container/30 text-error border border-error/50 font-bold'
                : 'text-on-surface-variant hover:bg-white/5'
            }`}
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Admin Command HQ</span>
          </button>

          <div className="pt-4 border-t border-white/10 mt-auto">
            <button
              onClick={() => {
                onResetOnboarding();
                setIsMobileMenuOpen(false);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-error-container/20 text-error border border-error/30 font-bold text-xs"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Sign Out & Change Location</span>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
