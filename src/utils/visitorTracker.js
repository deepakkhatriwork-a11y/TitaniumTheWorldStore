import { database } from '../firebase/firebaseConfig';
import { ref, set, onDisconnect, serverTimestamp, onValue, query, orderByChild, startAt, endAt } from 'firebase/database';

// Generate a unique visitor ID
const generateVisitorId = () => {
  return 'visitor_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Track visitor in Realtime Database
export const trackVisitor = () => {
  try {
    const db = database; // Use direct reference instead of calling as function
    const visitorId = generateVisitorId();
    const visitorRef = ref(db, 'visitors/' + visitorId);
    
    // Set visitor data with timestamp
    set(visitorRef, {
      timestamp: serverTimestamp(),
      lastActive: serverTimestamp()
    });
    
    // Remove visitor when they disconnect
    onDisconnect(visitorRef).remove();
    
    return visitorId;
  } catch (error) {
    console.error('Error tracking visitor:', error);
    return null;
  }
};

// Get real-time visitor count
export const getVisitorCount = (callback) => {
  try {
    const db = database; // Use direct reference instead of calling as function
    const visitorsRef = ref(db, 'visitors');
    
    // Listen for changes in visitors
    onValue(visitorsRef, (snapshot) => {
      const visitors = snapshot.val();
      const count = visitors ? Object.keys(visitors).length : 0;
      callback(count);
    });
    
    return visitorsRef;
  } catch (error) {
    console.error('Error getting visitor count:', error);
    return null;
  }
};

// Update visitor activity timestamp
export const updateVisitorActivity = (visitorId) => {
  try {
    if (!visitorId) return;
    
    const db = database; // Use direct reference instead of calling as function
    const visitorRef = ref(db, 'visitors/' + visitorId);
    set(visitorRef, {
      timestamp: serverTimestamp(),
      lastActive: serverTimestamp()
    });
  } catch (error) {
    console.error('Error updating visitor activity:', error);
  }
};

// Get active visitors (within last 5 minutes)
export const getActiveVisitors = (callback) => {
  try {
    const db = database; // Use direct reference instead of calling as function
    const fiveMinutesAgo = Date.now() - (5 * 60 * 1000);
    const visitorsRef = ref(db, 'visitors');
    const activeQuery = query(
      visitorsRef,
      orderByChild('lastActive'),
      startAt(fiveMinutesAgo)
    );
    
    onValue(activeQuery, (snapshot) => {
      const visitors = snapshot.val();
      const count = visitors ? Object.keys(visitors).length : 0;
      callback(count);
    });
  } catch (error) {
    console.error('Error getting active visitors:', error);
  }
};