import NetInfo from '@react-native-community/netinfo';

// Check if device is online
export const isOnline = async () => {
  const state = await NetInfo.fetch();
  return state.isConnected;
};

// Get network state
export const getNetworkState = async () => {
  return await NetInfo.fetch();
};

// Listen to network state changes
export const subscribeToNetworkState = (callback) => {
  return NetInfo.addEventListener(callback);
};

// Check if connection is strong enough for sync
export const canSync = async () => {
  const state = await NetInfo.fetch();
  
  if (!state.isConnected) return false;
  
  // Check connection type
  if (state.type === 'wifi') return true;
  if (state.type === 'cellular') {
    // Only sync on cellular if it's not too slow
    return state.details?.cellularGeneration !== '2g';
  }
  
  return true;
};

export default {
  isOnline,
  getNetworkState,
  subscribeToNetworkState,
  canSync,
};
