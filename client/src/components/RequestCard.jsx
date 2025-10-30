import { useDispatch } from 'react-redux';
import { respondToSwapRequest } from '../redux/slices/swapSlice';
import { getMyEvents } from '../redux/slices/eventSlice';

const RequestCard = ({ request, type }) => {
  const dispatch = useDispatch();

  const handleRespond = async (accepted) => {
    await dispatch(respondToSwapRequest({ id: request._id, accepted }));
    // Refresh events after swap
    dispatch(getMyEvents());
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'PENDING':
        return '#f39c12';
      case 'ACCEPTED':
        return '#27ae60';
      case 'REJECTED':
        return '#e74c3c';
      default:
        return '#95a5a6';
    }
  };

  return (
    <div style={{ ...styles.card, borderLeft: `4px solid ${getStatusColor(request.status)}` }}>
      <div style={styles.header}>
        <span style={{ ...styles.badge, backgroundColor: getStatusColor(request.status) }}>
          {request.status}
        </span>
        <span style={styles.type}>{type === 'incoming' ? '📥 Incoming' : '📤 Outgoing'}</span>
      </div>

      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>
          {type === 'incoming' ? '🔹 Their Slot:' : '🔹 Your Slot:'}
        </h4>
        <div style={styles.slotInfo}>
          <p><strong>{request.mySlotId?.title || 'Deleted Event'}</strong></p>
          {request.mySlotId && <p>{formatDate(request.mySlotId.startTime)}</p>}
        </div>
      </div>

      <div style={styles.section}>
        <h4 style={styles.sectionTitle}>
          {type === 'incoming' ? '🔸 Your Slot:' : '🔸 Their Slot:'}
        </h4>
        <div style={styles.slotInfo}>
          <p><strong>{request.theirSlotId?.title || 'Deleted Event'}</strong></p>
          {request.theirSlotId && <p>{formatDate(request.theirSlotId.startTime)}</p>}
        </div>
      </div>

      <div style={styles.userInfo}>
        <span>
          {type === 'incoming' ? '👤 From: ' : '👤 To: '}
          {type === 'incoming' ? request.requesterId?.name : request.receiverId?.name}
        </span>
      </div>

      {type === 'incoming' && request.status === 'PENDING' && (
        <div style={styles.actions}>
          <button onClick={() => handleRespond(true)} style={styles.acceptBtn}>
            ✅ Accept
          </button>
          <button onClick={() => handleRespond(false)} style={styles.rejectBtn}>
            ❌ Reject
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '1rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  badge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
  type: {
    color: '#7f8c8d',
    fontSize: '0.9rem',
    fontWeight: '500',
  },
  section: {
    marginBottom: '1rem',
  },
  sectionTitle: {
    margin: '0 0 0.5rem 0',
    color: '#34495e',
    fontSize: '0.9rem',
  },
  slotInfo: {
    backgroundColor: '#ecf0f1',
    padding: '0.75rem',
    borderRadius: '4px',
  },
  userInfo: {
    color: '#3498db',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  acceptBtn: {
    flex: 1,
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
  rejectBtn: {
    flex: 1,
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '0.75rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: 'bold',
  },
};

export default RequestCard;
