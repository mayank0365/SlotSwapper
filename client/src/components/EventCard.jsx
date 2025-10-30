import { useDispatch } from 'react-redux';
import { deleteEvent, updateEvent } from '../redux/slices/eventSlice';

const EventCard = ({ event, showActions = true }) => {
  const dispatch = useDispatch();

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      dispatch(deleteEvent(event._id));
    }
  };

  const handleToggleSwappable = () => {
    const newStatus = event.status === 'SWAPPABLE' ? 'BUSY' : 'SWAPPABLE';
    dispatch(updateEvent({ id: event._id, eventData: { status: newStatus } }));
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
      case 'BUSY':
        return '#95a5a6';
      case 'SWAPPABLE':
        return '#27ae60';
      case 'SWAP_PENDING':
        return '#f39c12';
      default:
        return '#bdc3c7';
    }
  };

  return (
    <div style={{ ...styles.card, borderLeft: `4px solid ${getStatusColor(event.status)}` }}>
      <div style={styles.header}>
        <h3 style={styles.title}>{event.title}</h3>
        <span style={{ ...styles.badge, backgroundColor: getStatusColor(event.status) }}>
          {event.status}
        </span>
      </div>
      <div style={styles.time}>
        <span>📅 {formatDate(event.startTime)}</span>
        <span>→</span>
        <span>{formatDate(event.endTime)}</span>
      </div>
      {event.userId?.name && (
        <div style={styles.owner}>
          <span>👤 {event.userId.name}</span>
        </div>
      )}
      {showActions && event.status !== 'SWAP_PENDING' && (
        <div style={styles.actions}>
          <button onClick={handleToggleSwappable} style={styles.swapBtn}>
            {event.status === 'SWAPPABLE' ? '🔒 Mark Busy' : '🔄 Mark Swappable'}
          </button>
          <button onClick={handleDelete} style={styles.deleteBtn}>
            🗑️ Delete
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
  title: {
    margin: 0,
    fontSize: '1.2rem',
    color: '#2c3e50',
  },
  badge: {
    padding: '0.25rem 0.75rem',
    borderRadius: '12px',
    color: '#fff',
    fontSize: '0.8rem',
    fontWeight: 'bold',
  },
  time: {
    display: 'flex',
    gap: '0.5rem',
    color: '#7f8c8d',
    fontSize: '0.9rem',
    marginBottom: '0.5rem',
  },
  owner: {
    color: '#3498db',
    fontSize: '0.9rem',
    marginBottom: '1rem',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
    marginTop: '1rem',
  },
  swapBtn: {
    flex: 1,
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
  deleteBtn: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '0.9rem',
  },
};

export default EventCard;
