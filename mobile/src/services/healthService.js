import api from './api';
import { API_CONFIG } from '../config/api.config';
import storageService from './storageService';

class HealthService {
  // Get all health records for user
  async getHealthRecords(userId) {
    try {
      const response = await api.get(`${API_CONFIG.ENDPOINTS.GET_READINGS}/${userId}`);
      // Save to local storage
      await storageService.saveHealthRecords(response.data.records);
      return response.data.records;
    } catch (error) {
      // If offline, return local data
      console.log('Fetching from local storage...');
      return await storageService.getHealthRecords();
    }
  }

  // Add new health reading
  async addHealthReading(reading) {
    try {
      const response = await api.post(API_CONFIG.ENDPOINTS.ADD_READING, reading);
      // Update local storage
      const records = await storageService.getHealthRecords();
      records.push(response.data.record);
      await storageService.saveHealthRecords(records);
      return response.data.record;
    } catch (error) {
      // If offline, save locally
      console.log('Saving locally for later sync...');
      await storageService.addHealthRecord(reading);
      throw new Error('Saved locally. Will sync when online.');
    }
  }

  // Get readings by type
  async getReadingsByType(type) {
    const records = await storageService.getHealthRecords();
    return records.filter(record => record.type === type);
  }

  // Get latest reading
  async getLatestReading(type) {
    const records = await this.getReadingsByType(type);
    return records.length > 0 ? records[records.length - 1] : null;
  }

  // Get readings for chart (last N days)
  async getReadingsForChart(type, days = 7) {
    const records = await this.getReadingsByType(type);
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - days);
    
    return records.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate >= cutoffDate;
    }).sort((a, b) => new Date(a.date) - new Date(b.date));
  }
}

export default new HealthService();
