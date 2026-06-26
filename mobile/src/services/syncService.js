import NetInfo from '@react-native-community/netinfo';
import api from './api';
import storageService from './storageService';
import { API_CONFIG } from '../config/api.config';

class SyncService {
  constructor() {
    this.isSyncing = false;
    this.setupNetworkListener();
  }

  // Setup network listener
  setupNetworkListener() {
    NetInfo.addEventListener(state => {
      if (state.isConnected && !this.isSyncing) {
        this.syncData();
      }
    });
  }

  // Check if online
  async isOnline() {
    const state = await NetInfo.fetch();
    return state.isConnected;
  }

  // Main sync function
  async syncData() {
    if (this.isSyncing) return;
    
    const online = await this.isOnline();
    if (!online) {
      console.log('Offline - skipping sync');
      return;
    }

    this.isSyncing = true;
    console.log('Starting sync...');

    try {
      // Sync health records
      await this.syncHealthRecords();
      
      // Sync reminders
      await this.syncReminders();
      
      // Update last sync time
      await storageService.saveLastSync(new Date().toISOString());
      
      console.log('Sync completed successfully');
      return { success: true };
    } catch (error) {
      console.error('Sync error:', error);
      return { success: false, error: error.message };
    } finally {
      this.isSyncing = false;
    }
  }

  // Sync health records
  async syncHealthRecords() {
    const localRecords = await storageService.getHealthRecords();
    const recordsToSync = localRecords.filter(r => r.localOnly);

    if (recordsToSync.length === 0) {
      console.log('No health records to sync');
      return;
    }

    console.log(`Syncing ${recordsToSync.length} health records...`);
    
    for (const record of recordsToSync) {
      try {
        const response = await api.post(API_CONFIG.ENDPOINTS.ADD_READING, record);
        // Update local record with server ID
        record.id = response.data.record._id;
        record.localOnly = false;
      } catch (error) {
        console.error('Error syncing record:', error);
      }
    }

    await storageService.saveHealthRecords(localRecords);
  }

  // Sync reminders
  async syncReminders() {
    const localReminders = await storageService.getReminders();
    const remindersToSync = localReminders.filter(r => r.localOnly);

    if (remindersToSync.length === 0) {
      console.log('No reminders to sync');
      return;
    }

    console.log(`Syncing ${remindersToSync.length} reminders...`);
    
    for (const reminder of remindersToSync) {
      try {
        const response = await api.post(API_CONFIG.ENDPOINTS.ADD_REMINDER, reminder);
        // Update local reminder with server ID
        reminder.id = response.data.reminder._id;
        reminder.localOnly = false;
      } catch (error) {
        console.error('Error syncing reminder:', error);
      }
    }

    await storageService.saveReminders(localReminders);
  }

  // Pull latest data from server
  async pullData(userId) {
    try {
      const response = await api.get(`${API_CONFIG.ENDPOINTS.SYNC}/${userId}`);
      
      // Update local storage with server data
      if (response.data.healthRecords) {
        await storageService.saveHealthRecords(response.data.healthRecords);
      }
      
      if (response.data.reminders) {
        await storageService.saveReminders(response.data.reminders);
      }
      
      return response.data;
    } catch (error) {
      console.error('Error pulling data:', error);
      throw error;
    }
  }

  // Get last sync time
  async getLastSyncTime() {
    return await storageService.getLastSync();
  }
}

export default new SyncService();
