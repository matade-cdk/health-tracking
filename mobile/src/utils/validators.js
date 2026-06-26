// Validation functions

export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  return phoneRegex.test(phone);
};

export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateAge = (age) => {
  const ageNum = parseInt(age);
  return !isNaN(ageNum) && ageNum > 0 && ageNum < 150;
};

export const validateName = (name) => {
  return name && name.trim().length >= 2;
};

export const validateRequired = (value) => {
  return value && value.toString().trim().length > 0;
};

export const validateNumber = (value, min = null, max = null) => {
  const num = parseFloat(value);
  if (isNaN(num)) return false;
  if (min !== null && num < min) return false;
  if (max !== null && num > max) return false;
  return true;
};

export const validateHealthReading = (type, value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return { valid: false, message: 'Please enter a valid number' };

  switch (type) {
    case 'BP':
      if (num < 50 || num > 250) {
        return { valid: false, message: 'BP should be between 50-250 mmHg' };
      }
      break;
    case 'SUGAR':
      if (num < 30 || num > 500) {
        return { valid: false, message: 'Sugar should be between 30-500 mg/dL' };
      }
      break;
    case 'HR':
      if (num < 30 || num > 200) {
        return { valid: false, message: 'Heart rate should be between 30-200 bpm' };
      }
      break;
    case 'WEIGHT':
      if (num < 10 || num > 300) {
        return { valid: false, message: 'Weight should be between 10-300 kg' };
      }
      break;
    case 'TEMP':
      if (num < 30 || num > 45) {
        return { valid: false, message: 'Temperature should be between 30-45 °C' };
      }
      break;
    case 'OXYGEN':
      if (num < 50 || num > 100) {
        return { valid: false, message: 'Oxygen level should be between 50-100 %' };
      }
      break;
  }

  return { valid: true };
};
