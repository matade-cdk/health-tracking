import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '../config/constants';

class StorageService {
  // Save data
  async save(key, data) {
    try {
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem(key, jsonData);
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  }

  // Get data
  async get(key) {
    try {
      const jsonData = await AsyncStorage.getItem(key);
      return jsonData ? JSON.parse(jsonData) : null;
    } catch (error) {
      console.error('Error getting data:', error);
      return null;
    }
  }

  // Remove data
  async remove(key) {
    try {
      await AsyncStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Error removing data:', error);
      return false;
    }
  }

  // Clear all data
  async clearAll() {
    try {
      await AsyncStorage.clear();
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }

  // Health Records
  async saveHealthRecords(records) {
    return await this.save(STORAGE_KEYS.HEALTH_RECORDS, records);
  }

  async getHealthRecords() {
    return await this.get(STORAGE_KEYS.HEALTH_RECORDS) || [];
  }

  async addHealthRecord(record) {
    const records = await this.getHealthRecords();
    records.push({ ...record, id: Date.now().toString(), localOnly: true });
    return await this.saveHealthRecords(records);
  }

  // Reminders
  async saveReminders(reminders) {
    return await this.save(STORAGE_KEYS.REMINDERS, reminders);
  }

  async getReminders() {
    return await this.get(STORAGE_KEYS.REMINDERS) || [];
  }

  async addReminder(reminder) {
    const reminders = await this.getReminders();
    reminders.push({ ...reminder, id: Date.now().toString(), localOnly: true });
    return await this.saveReminders(reminders);
  }

  // Language
  async saveLanguage(language) {
    return await this.save(STORAGE_KEYS.LANGUAGE, language);
  }

  async getLanguage() {
    return await this.get(STORAGE_KEYS.LANGUAGE) || 'en';
  }

  // Last Sync
  async saveLastSync(timestamp) {
    return await this.save(STORAGE_KEYS.LAST_SYNC, timestamp);
  }

  async getLastSync() {
    return await this.get(STORAGE_KEYS.LAST_SYNC);
  }
}

export default new StorageService();
