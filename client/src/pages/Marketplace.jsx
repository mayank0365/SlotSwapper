import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import SwapModal from '../components/SwapModal';
import { getSwappableSlots } from '../redux/slices/swapSlice';

const Marketplace = () => {
  const dispatch = useDispatch();
  const { swappableSlots, isLoading } = useSelector((state) => state.swap);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    dispatch(getSwappableSlots());
  }, [dispatch]);

  const handleRequestSwap = (slot) => {
    setSelectedSlot(slot);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedSlot(null);
    // Refresh marketplace
    dispatch(getSwappableSlots());
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Marketplace</h1>
            <p style={styles.subtitle}>
              Browse and request swaps from other users' available slots 🔄
            </p>
          </div>
          <button
            onClick={() => dispatch(getSwappableSlots())}
            style={styles.refreshBtn}
          >
            🔄 Refresh
          </button>
        </div>

        <div style={styles.slotsSection}>
          {isLoading ? (
            <p style={styles.loading}>Loading available slots...</p>
          ) : swappableSlots.length === 0 ? (
            <p style={styles.empty}>
              No swappable slots available at the moment. Check back later! 📭
            </p>
          ) : (
            <div style={styles.slotsList}>
              {swappableSlots.map((slot) => (
                <div key={slot._id} style={styles.slotCard}>
                  <EventCard event={slot} showActions={false} />
                  <button
                    onClick={() => handleRequestSwap(slot)}
                    style={styles.requestBtn}
                  >
                    🔄 Request Swap
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {selectedSlot && (
        <SwapModal
          show={showModal}
          onClose={handleCloseModal}
          theirSlot={selectedSlot}
        />
      )}
    </>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  title: {
    margin: 0,
    color: '#2c3e50',
    fontSize: '2rem',
  },
  subtitle: {
    margin: '0.5rem 0 0 0',
    color: '#7f8c8d',
  },
  refreshBtn: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  slotsSection: {
    marginTop: '2rem',
  },
  slotsList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '1.5rem',
  },
  slotCard: {
    position: 'relative',
  },
  requestBtn: {
    width: '100%',
    padding: '0.75rem',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
    marginTop: '0.5rem',
  },
  loading: {
    textAlign: 'center',
    color: '#7f8c8d',
    padding: '2rem',
  },
  empty: {
    textAlign: 'center',
    color: '#7f8c8d',
    padding: '2rem',
    backgroundColor: '#fff',
    borderRadius: '8px',
  },
};

export default Marketplace;
