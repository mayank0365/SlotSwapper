import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSwapRequest } from '../redux/slices/swapSlice';
import { getMyEvents } from '../redux/slices/eventSlice';

const SwapModal = ({ show, onClose, theirSlot }) => {
  const dispatch = useDispatch();
  const { events } = useSelector((state) => state.events);
  const [selectedSlot, setSelectedSlot] = useState('');

  useEffect(() => {
    if (show) {
      dispatch(getMyEvents());
    }
  }, [show, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedSlot) {
      alert('Please select one of your slots');
      return;
    }
    dispatch(
      createSwapRequest({
        mySlotId: selectedSlot,
        theirSlotId: theirSlot._id,
      })
    );
    onClose();
  };

  if (!show) return null;

  const mySwappableSlots = events.filter((e) => e.status === 'SWAPPABLE');

  return (
    <div style={styles.overlay} onClick={onClose}>
      <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div style={styles.header}>
          <h2 style={styles.title}>Request Swap</h2>
          <button onClick={onClose} style={styles.closeBtn}>
            ✕
          </button>
        </div>
        <div style={styles.body}>
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>Their Slot:</h3>
            <div style={styles.slotInfo}>
              <p><strong>{theirSlot.title}</strong></p>
              <p>{new Date(theirSlot.startTime).toLocaleString()}</p>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div style={styles.section}>
              <h3 style={styles.sectionTitle}>Select Your Slot:</h3>
              {mySwappableSlots.length === 0 ? (
                <p style={styles.noSlots}>
                  You don't have any swappable slots. Mark a slot as swappable first.
                </p>
              ) : (
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  style={styles.select}
                  required
                >
                  <option value="">-- Choose a slot --</option>
                  {mySwappableSlots.map((slot) => (
                    <option key={slot._id} value={slot._id}>
                      {slot.title} - {new Date(slot.startTime).toLocaleString()}
                    </option>
                  ))}
                </select>
              )}
            </div>
            <div style={styles.actions}>
              <button type="button" onClick={onClose} style={styles.cancelBtn}>
                Cancel
              </button>
              <button
                type="submit"
                style={styles.submitBtn}
                disabled={mySwappableSlots.length === 0}
              >
                Send Request
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    width: '90%',
    maxWidth: '500px',
    maxHeight: '80vh',
    overflow: 'auto',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1.5rem',
    borderBottom: '1px solid #ecf0f1',
  },
  title: {
    margin: 0,
    color: '#2c3e50',
  },
  closeBtn: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '1.5rem',
    cursor: 'pointer',
    color: '#7f8c8d',
  },
  body: {
    padding: '1.5rem',
  },
  section: {
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    marginBottom: '0.5rem',
    color: '#34495e',
  },
  slotInfo: {
    backgroundColor: '#ecf0f1',
    padding: '1rem',
    borderRadius: '4px',
  },
  noSlots: {
    color: '#e74c3c',
    fontStyle: 'italic',
  },
  select: {
    width: '100%',
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #bdc3c7',
    fontSize: '1rem',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
    justifyContent: 'flex-end',
  },
  cancelBtn: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#95a5a6',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  submitBtn: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default SwapModal;
