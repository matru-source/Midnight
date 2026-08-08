import React, { useState } from 'react';
import HeaderNav from './components/HeaderNav';
import DiscoveryHub from './components/DiscoveryHub';
import ClubDetail from './components/ClubDetail';
import OwnerDashboard from './components/OwnerDashboard';
import AdminControlPanel from './components/AdminControlPanel';
import Footer from './components/Footer';
import { 
  TableBookingModal, 
  GuestlistModal, 
  CitySelectorModal, 
  NotificationToast 
} from './components/Modals';
import { mockClubs, initialChatMessages } from './data/mockData';
import { Compass, Calendar, LayoutDashboard, ShieldCheck, User, Building2 } from 'lucide-react';

export default function App() {
  // Role Access Control: 'customer' | 'owner' | 'admin'
  const [activeRole, setActiveRole] = useState('customer');
  const [currentView, setCurrentView] = useState('discovery'); // 'discovery' | 'club-detail'
  const [selectedClub, setSelectedClub] = useState(mockClubs[0]);
  const [selectedCity, setSelectedCity] = useState('Mumbai');
  
  // Modals & Notifications
  const [isCityModalOpen, setIsCityModalOpen] = useState(false);
  const [isTableModalOpen, setIsTableModalOpen] = useState(false);
  const [isGuestlistModalOpen, setIsGuestlistModalOpen] = useState(false);
  const [targetTable, setTargetTable] = useState(null);
  const [targetClubForGuestlist, setTargetClubForGuestlist] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  
  // Chat state
  const [chatMessages, setChatMessages] = useState(initialChatMessages);

  const showNotification = (msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 4000);
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
    showNotification(`VIP Table ${bookingData.tableId} reserved! Check-in pass sent to your profile.`);
  };

  const handleConfirmGuestlist = (guestData) => {
    showNotification(`Guestlist Pass generated for ${guestData.guestName}! Pass ID: ${guestData.passId}`);
  };

  const handleSendMessage = (messageText) => {
    const newMessage = {
      id: Date.now(),
      user: 'You (VIP)',
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

      {/* Global Context Header */}
      <HeaderNav 
        activeRole={activeRole}
        onSwitchRole={handleSwitchRole}
        currentView={currentView} 
        setCurrentView={setCurrentView}
        selectedCity={selectedCity}
        setIsCityModalOpen={setIsCityModalOpen}
        notificationCount={2}
        onOpenNotifications={() => showNotification('Notifications: Nucleya & Anyma set starts at 11:30 PM in BKC Mumbai.')}
      />

      {/* Role-Based Portal Router */}
      <div className="flex-1">
        {/* CUSTOMER PORTAL VIEWS */}
        {activeRole === 'customer' && (
          <>
            {currentView === 'discovery' && (
              <DiscoveryHub 
                clubs={mockClubs}
                onSelectClub={handleSelectClub}
                onOpenGuestlistModal={handleOpenGuestlistModal}
                selectedCity={selectedCity}
              />
            )}

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
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-surface/30 backdrop-blur-[30px] border-t border-white/10 shadow-2xl flex justify-around items-center px-4 pb-6 pt-2">
        {activeRole === 'customer' ? (
          <>
            <button
              onClick={() => {
                setCurrentView('discovery');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-150 ${
                currentView === 'discovery'
                  ? 'bg-primary-container/20 text-primary-fixed shadow-[0_0_10px_rgba(0,240,255,0.15)] font-bold'
                  : 'text-on-surface-variant hover:bg-white/10'
              }`}
            >
              <Compass className="w-5 h-5 mb-0.5" />
              <span className="font-label-sm text-[10px]">Discover</span>
            </button>

            <button
              onClick={() => {
                setCurrentView('club-detail');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-150 ${
                currentView === 'club-detail'
                  ? 'bg-primary-container/20 text-primary-fixed shadow-[0_0_10px_rgba(0,240,255,0.15)] font-bold'
                  : 'text-on-surface-variant hover:bg-white/10'
              }`}
            >
              <Calendar className="w-5 h-5 mb-0.5" />
              <span className="font-label-sm text-[10px]">The Void Room</span>
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
      />

      <CitySelectorModal 
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
        selectedCity={selectedCity}
        onSelectCity={(city) => {
          setSelectedCity(city);
          showNotification(`Switched active city to ${city}`);
        }}
      />
    </div>
  );
}
