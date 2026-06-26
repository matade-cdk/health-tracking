import React, { createContext, useState, useEffect, useContext } from 'react';
import NetInfo from '@react-native-community/netinfo';
import syncService from '../services/syncService';
import { useAuth } from './AuthContext';

const SyncContext = createContext({});

export const SyncProvider = ({ children }) => {
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSync, setLastSync] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    // Setup network listener
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsOnline(state.isConnected);
    });

    // Load last sync time
    loadLastSync();

    return () => unsubscribe();
  }, []);

  const loadLastSync = async () => {
    const lastSyncTime = await syncService.getLastSyncTime();
    setLastSync(lastSyncTime);
  };

  const sync = async () => {
    if (!isOnline || isSyncing || !user) {
      return { success: false, message: 'Cannot sync now' };
    }

    setIsSyncing(true);
    try {
      const result = await syncService.syncData();
      if (result.success) {
        await loadLastSync();
      }
      return result;
    } catch (error) {
      return { success: false, error: error.message };
    } finally {
      setIsSyncing(false);
    }
  };

  const pullData = async () => {
    if (!isOnline || !user) {
      return { success: false, message: 'Cannot pull data now' };
    }

    try {
      const data = await syncService.pullData(user.id);
      await loadLastSync();
      return { success: true, data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <SyncContext.Provider
      value={{
        isOnline,
        isSyncing,
        lastSync,
        sync,
        pullData,
      }}
    >
      {children}
    </SyncContext.Provider>
  );
};

export const useSync = () => {
  const context = useContext(SyncContext);
  if (!context) {
    throw new Error('useSync must be used within SyncProvider');
  }
  return context;
};

export default SyncContext;
