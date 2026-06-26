// Formatter functions

export const formatPhoneNumber = (phone) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) {
    return `${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  }
  return phone;
};

export const formatHealthValue = (type, value) => {
  const num = parseFloat(value);
  if (isNaN(num)) return value;

  switch (type) {
    case 'BP':
      return `${num} mmHg`;
    case 'SUGAR':
      return `${num} mg/dL`;
    case 'HR':
      return `${num} bpm`;
    case 'WEIGHT':
      return `${num.toFixed(1)} kg`;
    case 'TEMP':
      return `${num.toFixed(1)} °C`;
    case 'OXYGEN':
      return `${num.toFixed(0)} %`;
    default:
      return num.toString();
  }
};

export const formatCurrency = (amount) => {
  return `₹${amount.toLocaleString('en-IN')}`;
};

export const capitalize = (str) => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncate = (str, length = 50) => {
  if (!str) return '';
  if (str.length <= length) return str;
  return `${str.substring(0, length)}...`;
};

export const getInitials = (name) => {
  if (!name) return '';
  const parts = name.trim().split(' ');
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase();
};
