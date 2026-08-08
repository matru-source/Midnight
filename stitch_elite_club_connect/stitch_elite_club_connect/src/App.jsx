import React, { useState } from 'react';
import HeaderNav from './components/HeaderNav';
import DiscoveryHub from './components/DiscoveryHub';
import ClubDetail from './components/ClubDetail';
import OwnerDashboard from './components/OwnerDashboard';
import AdminControlPanel from './components/AdminControlPanel';
import TalkyTalki from './components/TalkyTalki';
import Footer from './components/Footer';
import { 
  TableBookingModal, 
  GuestlistModal, 
  CitySelectorModal, 
  NotificationToast,
  MandatoryLocationGateModal,
  AuthGateModal,
  AdvancedFilterModal,
  TalkyProfileSetupModal
} from './components/Modals';
import { mockClubs, initialChatMessages } from './data/mockData';
import { Compass, Calendar, LayoutDashboard, ShieldCheck, User, Building2, MessageSquare } from 'lucide-react';

export default function App() {
  // Onboarding & Mandatory Gate State
  const [hasSelectedLocation, setHasSelectedLocation] = useState(false);
  const [authStep, setAuthStep] = useState('location'); // 'location' | 'auth' | 'authenticated'
  const [selectedCity, setSelectedCity] = useState('');
  const [userAuth, setUserAuth] = useState(null); // { name, email, role, isGuest }

  // Role Access Control: 'customer' | 'owner' | 'admin'
  const [activeRole, setActiveRole] = useState('customer');
  const [currentView, setCurrentView] = useState('events'); // 'events' | 'clubs' | 'talky-talky' | 'club-detail'
  const [selectedClub, setSelectedClub] = useState(mockClubs[0]);
  
  // Talky Talky Profile State
  const [talkyProfile, setTalkyProfile] = useState(null);
  const [isTalkyProfileModalOpen, setIsTalkyProfileModalOpen] = useState(false);

  // Modals & Notifications
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isGuestlistModalOpen, setIsGuestlistModalOpen] = useState(false);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({ dates: [], locations: [], categories: [], tags: [] });
  const [targetTable, setTargetTable] = useState(null);
  const [targetClubForGuestlist, setTargetClubForGuestlist] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  
  // Chat state
  const [chatMessages, setChatMessages] = useState(initialChatMessages);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4500);
  };

  // Handle Navigation View Changes
  const handleSetCurrentView = (view) => {
    setCurrentView(view);
    if (view === 'talky-talky' && !talkyProfile) {
      setIsTalkyProfileModalOpen(true);
    }
  };

  // Onboarding Step 1: Location Gate Selection (District, State)
  const handleSelectMandatoryLocation = (locationString) => {
    setSelectedCity(locationString);
    setHasSelectedLocation(true);
    setAuthStep('auth');
  };

  // Onboarding Step 2: Completed Sign-In
  const handleCompleteAuth = (authData) => {
    setUserAuth(authData);
    setActiveRole(authData.role || 'customer');
    setAuthStep('authenticated');

    // Auto seed initial talky profile
    setTalkyProfile({
      name: authData.name,
      instaId: '@' + authData.name.toLowerCase().replace(/\s+/g, '_') + '_vip',
      designation: 'VIP Nightlife Enthusiast',
      passion: 'Melodic Techno & Single Malts',
      drinkType: 'Alcoholic',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&auto=format&fit=crop&q=80'
    });

    showNotification(`Namaste & Welcome, ${authData.name}! Exploring ${selectedCity} Nightlife ✨`);
  };

  // Onboarding Step 2: Continue as Guest
  const handleContinueAsGuest = () => {
    const guestData = { name: 'Guest VIP', email: 'guest@midnight.in', role: 'customer', isGuest: true };
    setUserAuth(guestData);
    setActiveRole('customer');
    setAuthStep('authenticated');
    showNotification(`Welcome, Guest VIP! Exploring ${selectedCity} Nightlife ✨`);
  };

  // Save Talky Profile
  const handleSaveTalkyProfile = (profileData) => {
    setTalkyProfile(profileData);
    showNotification(`Talky Talky Profile Updated for ${profileData.name}! ✨`);
  };

  // Reset Onboarding (Sign Out / Change Location)
  const handleResetOnboarding = () => {
    setHasSelectedLocation(false);
    setAuthStep('location');
    setSelectedCity('');
    setUserAuth(null);
    setTalkyProfile(null);
    setActiveRole('customer');
  };

  const handleSwitchRole = (role) => {
    setActiveRole(role);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (role === 'customer') {
      showNotification('Entered Customer Web Portal (Public View)');
    } else if (role === 'owner') {
      showNotification('Entered Club Partner Console (The Void Room BKC)');
    } else if (role === 'admin') {
      showNotification('Entered Platform Admin HQ Command Center');
    }
  };

  const handleSelectClub = (club) => {
    setSelectedClub(club);
    setCurrentView('club-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenTableModal = (table) => {
    setTargetTable(table);
    setIsTableModalOpen(true);
  };

  const handleOpenGuestlistModal = (club) => {
    setTargetClubForGuestlist(club || selectedClub);
    setIsGuestlistModalOpen(true);
  };

  const handleConfirmTableBooking = (bookingData) => {
    showNotification(`VIP Table ${bookingData.tableId} reserved for ${userAuth?.name || 'Guest'}! Check-in pass sent.`);
  };

  const handleConfirmGuestlist = (guestData) => {
    showNotification(`Guestlist Pass generated for ${guestData.guestName}! Pass ID: ${guestData.passId}`);
  };

  const handleSendMessage = (messageText) => {
    const newMessage = {
      id: Date.now(),
      user: userAuth?.name ? `${userAuth.name} (VIP)` : 'Guest (VIP)',
      color: 'text-primary-fixed font-bold',
      message: messageText
    };
    setChatMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="min-h-screen bg-background text-on-surface font-body flex flex-col relative selection:bg-primary-container selection:text-on-primary-container">
      {/* Toast Notifications */}
      <NotificationToast 
        message={toastMessage} 
        onClose={() => setToastMessage(null)} 
      />

      {/* Mandatory 2-Tier Onboarding Gate Modals */}
      <MandatoryLocationGateModal 
        isOpen={authStep === 'location'}
        onSelectLocation={handleSelectMandatoryLocation}
      />

      <AuthGateModal 
        isOpen={authStep === 'auth'}
        selectedCity={selectedCity}
        onCompleteAuth={handleCompleteAuth}
        onContinueAsGuest={handleContinueAsGuest}
      />

      {/* Talky Profile Gate Modal */}
      <TalkyProfileSetupModal 
        isOpen={isTalkyProfileModalOpen}
        onClose={() => setIsTalkyProfileModalOpen(false)}
        existingProfile={talkyProfile}
        onSaveProfile={handleSaveTalkyProfile}
      />

      {/* Global Context Header */}
      <HeaderNav 
        activeRole={activeRole}
        onSwitchRole={handleSwitchRole}
        userAuth={userAuth}
        onResetOnboarding={handleResetOnboarding}
        currentView={currentView} 
        setCurrentView={handleSetCurrentView}
        selectedCity={selectedCity}
        setIsCityModalOpen={setIsCityModalOpen}
        notificationCount={2}
        onOpenNotifications={() => showNotification(`Notifications for ${selectedCity}: Nucleya & Anyma set starts at 11:30 PM.`)}
      />

      {/* Role-Based Portal Router */}
      <div className="flex-1">
        {/* CUSTOMER PORTAL VIEWS */}
        {activeRole === 'customer' && (
          <>
            {/* Events View: All kinds of events, programs, dance parties, treks, shows */}
            {currentView === 'events' && (
              <DiscoveryHub 
                clubs={mockClubs}
                onSelectClub={handleSelectClub}
                onOpenGuestlistModal={handleOpenGuestlistModal}
                selectedCity={selectedCity}
                onOpenFilterModal={() => setIsFilterModalOpen(true)}
                selectedFilters={selectedFilters}
                onClearFilters={() => setSelectedFilters({ dates: [], locations: [], categories: [], tags: [] })}
              />
            )}

            {/* Clubs View: Exclusive Nightlife Clubs & Lounges Only */}
            {currentView === 'clubs' && (
              <DiscoveryHub 
                clubs={mockClubs.filter(c => c.vibe === 'Techno' || c.vibe === 'Speakeasy' || c.vibe === 'House' || c.vibe === 'RnB' || c.vibe === 'Bollywood Night')}
                onSelectClub={handleSelectClub}
                onOpenGuestlistModal={handleOpenGuestlistModal}
                selectedCity={selectedCity}
                onOpenFilterModal={() => setIsFilterModalOpen(true)}
                selectedFilters={selectedFilters}
                onClearFilters={() => setSelectedFilters({ dates: [], locations: [], categories: [], tags: [] })}
              />
            )}

            {/* Talky Talky View: Club-wise members joined + live chat room + profile gate */}
            {currentView === 'talky-talky' && (
              <TalkyTalki 
                selectedCity={selectedCity}
                onSelectClub={handleSelectClub}
                talkyProfile={talkyProfile}
                onOpenProfileSetup={() => setIsTalkyProfileModalOpen(true)}
              />
            )}

            {/* Club / Event Detail View */}
            {currentView === 'club-detail' && (
              <ClubDetail 
                club={selectedClub}
                onOpenGuestlistModal={handleOpenGuestlistModal}
                onOpenTableModal={handleOpenTableModal}
                chatMessages={chatMessages}
                onSendMessage={handleSendMessage}
              />
            )}

            <Footer onSwitchRole={handleSwitchRole} />
          </>
        )}

        {/* OWNER PARTNER PORTAL VIEW */}
        {activeRole === 'owner' && (
          <OwnerDashboard 
            onShowNotification={showNotification}
          />
        )}

        {/* ADMIN COMMAND HQ VIEW */}
        {activeRole === 'admin' && (
          <AdminControlPanel 
            onShowNotification={showNotification}
          />
        )}
      </div>

      {/* Bottom Navigation for Mobile Devices */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface/30 backdrop-blur-[30px] border-t border-white/10 shadow-2xl flex justify-around items-center px-2 pb-6 pt-2">
        {activeRole === 'customer' ? (
          <>
            <button
              onClick={() => {
                handleSetCurrentView('events');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-150 ${
                currentView === 'events'
                  ? 'bg-primary-container/20 text-primary-fixed shadow-[0_0_10px_rgba(0,240,255,0.15)] font-bold'
                  : 'text-on-surface-variant hover:bg-white/10'
              }`}
            >
              <Calendar className="w-5 h-5 mb-0.5" />
              <span className="font-label-sm text-[10px]">Events</span>
            </button>

            <button
              onClick={() => {
                handleSetCurrentView('clubs');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-150 ${
                currentView === 'clubs'
                  ? 'bg-primary-container/20 text-primary-fixed shadow-[0_0_10px_rgba(0,240,255,0.15)] font-bold'
                  : 'text-on-surface-variant hover:bg-white/10'
              }`}
            >
              <Building2 className="w-5 h-5 mb-0.5" />
              <span className="font-label-sm text-[10px]">Clubs</span>
            </button>

            <button
              onClick={() => {
                handleSetCurrentView('talky-talky');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-150 ${
                currentView === 'talky-talky'
                  ? 'bg-secondary-container/20 text-secondary shadow-[0_0_10px_rgba(255,36,228,0.15)] font-bold'
                  : 'text-on-surface-variant hover:bg-white/10'
              }`}
            >
              <MessageSquare className="w-5 h-5 mb-0.5" />
              <span className="font-label-sm text-[10px]">Talky Talky</span>
            </button>
          </>
        ) : (
          <button
            onClick={() => handleSwitchRole('customer')}
            className="flex items-center gap-2 px-4 py-2 rounded-full bg-primary-container/20 text-primary-fixed font-bold text-xs"
          >
            <User className="w-4 h-4" />
            <span>Return to Public Web Site</span>
          </button>
        )}
      </nav>

      {/* Dialog Modals */}
      <TableBookingModal 
        isOpen={isTableModalOpen}
        onClose={() => setIsTableModalOpen(false)}
        table={targetTable}
        onConfirm={handleConfirmTableBooking}
      />

      <GuestlistModal 
        isOpen={isGuestlistModalOpen}
        onClose={() => setIsGuestlistModalOpen(false)}
        club={targetClubForGuestlist}
        onConfirm={handleConfirmGuestlist}
        userAuth={userAuth}
      />

      <CitySelectorModal 
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={selectedCity}
        onSelectLocation={(locationString) => {
          setSelectedCity(locationString);
          showNotification(`Switched active location to ${locationString}`);
        }}
      />

      <AdvancedFilterModal 
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        selectedFilters={selectedFilters}
        onApplyFilters={(filters) => {
          setSelectedFilters(filters);
          showNotification('Filters applied successfully!');
        }}
      />
    </div>
  );
}
