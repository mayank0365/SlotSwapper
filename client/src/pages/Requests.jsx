import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from '../components/Navbar';
import RequestCard from '../components/RequestCard';
import {
  getIncomingRequests,
  getOutgoingRequests,
} from '../redux/slices/swapSlice';

const Requests = () => {
  const dispatch = useDispatch();
  const { incomingRequests, outgoingRequests, isLoading } = useSelector(
    (state) => state.swap
  );

  useEffect(() => {
    dispatch(getIncomingRequests());
    dispatch(getOutgoingRequests());
  }, [dispatch]);

  const handleRefresh = () => {
    dispatch(getIncomingRequests());
    dispatch(getOutgoingRequests());
  };

  return (
    <>
      <Navbar />
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <h1 style={styles.title}>Swap Requests</h1>
            <p style={styles.subtitle}>
              Manage your incoming and outgoing swap requests 📬
            </p>
          </div>
          <button onClick={handleRefresh} style={styles.refreshBtn}>
            🔄 Refresh
          </button>
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            📥 Incoming Requests ({incomingRequests.length})
          </h2>
          {isLoading ? (
            <p style={styles.loading}>Loading requests...</p>
          ) : incomingRequests.length === 0 ? (
            <p style={styles.empty}>No incoming requests 📭</p>
          ) : (
            <div style={styles.requestsList}>
              {incomingRequests.map((request) => (
                <RequestCard
                  key={request._id}
                  request={request}
                  type="incoming"
                />
              ))}
            </div>
          )}
        </div>

        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>
            📤 Outgoing Requests ({outgoingRequests.length})
          </h2>
          {isLoading ? (
            <p style={styles.loading}>Loading requests...</p>
          ) : outgoingRequests.length === 0 ? (
            <p style={styles.empty}>No outgoing requests 📭</p>
          ) : (
            <div style={styles.requestsList}>
              {outgoingRequests.map((request) => (
                <RequestCard
                  key={request._id}
                  request={request}
                  type="outgoing"
                />
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
  section: {
    marginBottom: '3rem',
  },
  sectionTitle: {
    color: '#2c3e50',
    marginBottom: '1rem',
    fontSize: '1.5rem',
  },
  requestsList: {
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

export default Requests;
