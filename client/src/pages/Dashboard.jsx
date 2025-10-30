import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import EventCard from '../components/EventCard';
import { createEvent, getMyEvents } from '../redux/slices/eventSlice';

const Dashboard = () => {
  const dispatch = useDispatch();
  const { events, isLoading } = useSelector((state) => state.events);
  const { user } = useSelector((state) => state.auth);

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    startTime: '',
    endTime: '',
    status: 'BUSY',
  });

  useEffect(() => {
    dispatch(getMyEvents());
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(createEvent(formData));
    setFormData({
      title: '',
      startTime: '',
      endTime: '',
      status: 'BUSY',
    });
    setShowForm(false);
    dispatch(getMyEvents());
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>My Dashboard</h1>
            <p style={styles.subtitle}>Welcome back, {user?.name}! 👋</p>
          </div>
          <button onClick={() => setShowForm(!showForm)} style={styles.addBtn}>
            {showForm ? '❌ Cancel' : '➕ Add Event'}
          </button>
        </div>

        {showForm && (
          <div style={styles.formCard}>
            <h2 style={styles.formTitle}>Create New Event</h2>
            <form onSubmit={handleSubmit} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Event Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                  style={styles.input}
                  placeholder="e.g., Team Meeting"
                />
              </div>
              <div style={styles.row}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Start Time</label>
                  <input
                    type="datetime-local"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>End Time</label>
                  <input
                    type="datetime-local"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleChange}
                    required
                    style={styles.input}
                  />
                </div>
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  style={styles.input}
                >
                  <option value="BUSY">Busy</option>
                  <option value="SWAPPABLE">Swappable</option>
                </select>
              </div>
              <button type="submit" style={styles.submitBtn}>
                Create Event
              </button>
            </form>
          </div>
        )}

        <div style={styles.eventsSection}>
          <h2 style={styles.sectionTitle}>My Events ({events.length})</h2>
          {isLoading ? (
            <p style={styles.loading}>Loading events...</p>
          ) : events.length === 0 ? (
            <p style={styles.empty}>
              No events yet. Create your first event to get started! 🚀
            </p>
          ) : (
            <div style={styles.eventsList}>
              {events.map((event) => (
                <EventCard key={event._id} event={event} showActions={true} />
              ))}
            </div>
          )}
        </div>
      </div>
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
  addBtn: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3498db',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  formCard: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    padding: '1.5rem',
    marginBottom: '2rem',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  },
  formTitle: {
    margin: '0 0 1.5rem 0',
    color: '#2c3e50',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  row: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  label: {
    color: '#2c3e50',
    fontWeight: '500',
  },
  input: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: '1px solid #bdc3c7',
    fontSize: '1rem',
  },
  submitBtn: {
    padding: '0.75rem',
    backgroundColor: '#27ae60',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '0.5rem',
  },
  eventsSection: {
    marginTop: '2rem',
  },
  sectionTitle: {
    color: '#2c3e50',
    marginBottom: '1rem',
  },
  eventsList: {
    display: 'flex',
    flexDirection: 'column',
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

export default Dashboard;
