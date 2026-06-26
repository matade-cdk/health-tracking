# 📱 ArogyaLink Mobile App

> Patient health tracking application built with React Native and Expo

## 🌟 Overview

The ArogyaLink mobile app is a beautiful, multilingual health tracking application designed for patients to monitor their health data, receive notifications from doctors, and manage their health records on the go.

## ✨ Key Features

### 🎯 Core Functionality
- **Multi-language Support** - English, Hindi (हिंदी), Marathi (मराठी) with instant switching
- **Health Records** - View health data with interactive line charts
- **Push Notifications** - Receive real-time updates from healthcare providers
- **Offline-first** - Works without internet using AsyncStorage
- **Patient Profile** - Manage personal information and settings

### 🎨 UI/UX Features
- Modern gradient-based dark theme
- 4-tab navigation (Home, Alerts, Profile, Language)
- Quick action cards for common tasks
- Smooth animations and transitions
- Responsive design for all screen sizes

### 📊 Health Tracking
- Blood Pressure monitoring
- Sugar Level tracking
- Heart Rate visualization
- Weight management
- Historical data with charts

## 🛠️ Tech Stack

### Core Technologies
- **React Native** - 0.76.5
- **Expo SDK** - 54.0.13
- **TypeScript** - 5.3.3
- **expo-router** - File-based navigation

### Key Libraries
```json
{
  "expo-linear-gradient": "^14.0.1",
  "react-native-chart-kit": "^6.12.0",
  "react-native-svg": "^15.9.0",
  "i18next": "^23.17.5",
  "react-i18next": "^15.2.0",
  "@react-native-async-storage/async-storage": "^2.1.0",
  "expo-notifications": "^0.29.12",
  "react-native-maps": "^1.18.0",
  "expo-location": "^18.0.4"
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18 or higher
- npm or yarn
- Expo CLI
- Expo Go app (for testing on device)

### Installation

1. **Navigate to mobile directory**
```bash
cd mobile/my-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Start development server**
```bash
npx expo start
```

4. **Run on device**
- Install Expo Go from App Store/Play Store
- Scan QR code from terminal
- App will load on your device

### Development Commands

```bash
# Start development server
npm start

# Start with cache cleared
npm start --clear

# Run on Android emulator
npm run android

# Run on iOS simulator (Mac only)
npm run ios

# Run on web
npm run web

# Type checking
npm run tsc

# Linting
npm run lint
```

## 📁 Project Structure

```
my-app/
├── app/                    # Screens (expo-router)
│   ├── index.tsx          # Main dashboard
│   ├── login.tsx          # Login screen
│   ├── register.tsx       # Registration screen
│   ├── records.tsx        # Health records screen
│   ├── hospitals.tsx      # Hospital finder with maps
│   └── _layout.tsx        # Root layout
├── components/            # Reusable components
│   └── LanguageSelector.tsx
├── i18n/                  # Internationalization
│   ├── index.ts          # i18next configuration
│   └── locales/          # Translation files
│       ├── en.json       # English
│       ├── hi.json       # Hindi
│       └── mr.json       # Marathi
├── config/               # Configuration
│   └── api.ts           # API endpoints
├── utils/               # Utility functions
│   └── notifications.ts # Notification helpers
└── assets/              # Images, fonts, etc.
```

## 🎨 Screens

### 1. Landing Page
- Welcome screen with ArogyaLink branding
- Sign In and Create Account buttons
- Gradient background design

### 2. Login/Register
- Phone number authentication
- Patient information collection
- Secure session management

### 3. Dashboard (Home Tab)
- Quick action cards:
  - 📊 Health Records
  - 🌐 Language Settings
  - 🏥 Find Hospital
- Recent notifications preview
- Pull-to-refresh

### 4. Alerts Tab
- Full notification list
- Read/Unread status
- Mark as read functionality
- Refresh button

### 5. Profile Tab
- Patient information display
- Personal details (ID, Name, Phone, Age, Gender)
- Registration date
- Logout option

### 6. Language Tab
- Language selection modal
- English, Hindi, Marathi options
- Instant UI update
- Persistent preference

### 7. Health Records
- Interactive line charts
- Metric selector (BP, Sugar, HR, Weight)
- Latest record card
- History list
- Empty state handling

### 8. Nearby Hospitals 🏥 NEW!
- **Interactive Map** - Real-time map with hospital markers
- **Device Location** - Uses GPS to find your current location
- **Search Radius** - Adjustable radius (2km, 5km, 10km)
- **Multiple Facility Types**:
  - 🏥 Hospitals
  - 🏥 Clinics
  - 💊 Pharmacies
  - 👨‍⚕️ Doctors
- **Detailed Information**:
  - Distance from your location
  - Facility name and type
  - Address (when available)
  - Visual markers on map
- **Turn-by-Turn Directions** - One-tap navigation using Google Maps
- **Powered by OpenStreetMap** - Using Overpass API for real-time data

## 🌐 Multi-language Implementation

### Supported Languages
1. **English** - Default
2. **हिंदी (Hindi)** - Full translation
3. **मराठी (Marathi)** - Full translation

### How It Works
```typescript
// Using translations
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

<Text>{t('dashboard.home')}</Text>
// Outputs: "Home" / "होम" / "मुख्यपृष्ठ"
```

### Adding New Translations
1. Add key to `i18n/locales/en.json`
2. Add translations to `hi.json` and `mr.json`
3. Use `t('key')` in component

## 🔔 Push Notifications

### Setup
```typescript
// Register for notifications
import { registerForPushNotificationsAsync } from './utils/notifications';

const token = await registerForPushNotificationsAsync();
```

### Notification Structure
```typescript
{
  id: string,
  title: string,
  message: string,
  createdAt: string,
  readAt: string | null
}
```

## 📊 Charts Implementation

### Health Records Chart
```typescript
import { LineChart } from 'react-native-chart-kit';

<LineChart
  data={{
    labels: dates,
    datasets: [{ data: values }]
  }}
  width={screenWidth - 32}
  height={220}
  chartConfig={chartConfig}
/>
```

## 🎨 Design System

### Colors
```typescript
{
  primary: '#00c9a7',      // Teal
  secondary: '#7b2ff2',    // Purple
  accent: '#ff6b9d',       // Pink
  warning: '#ffd700',      // Gold
  background: '#0a0a0f',   // Dark
  card: 'rgba(255,255,255,0.05)',
  text: '#ffffff'
}
```

### Typography
- **Title:** 24px, Bold
- **Heading:** 18px, Semi-bold
- **Body:** 14px, Regular
- **Caption:** 12px, Regular

## 🔐 Authentication Flow

```
User Opens App
    ↓
Check AsyncStorage for session
    ↓
[Has Session] → Dashboard
    ↓
[No Session] → Landing Page
    ↓
Login/Register
    ↓
Store credentials in AsyncStorage
    ↓
Navigate to Dashboard
```

## 📱 API Integration

### Base Configuration
```typescript
// config/api.ts
export const API_BASE_URL = 'http://192.168.1.100:4000';

export const API_ENDPOINTS = {
  LOGIN: '/api/patients/login',
  REGISTER: '/api/patients/register',
  GET_PATIENT_DATA: (id) => `/api/patients/${id}/data`,
  GET_NOTIFICATIONS: (id) => `/api/patients/${id}/notifications`
};
```

### Making API Calls
```typescript
const response = await fetch(
  `${API_BASE_URL}${API_ENDPOINTS.LOGIN}`,
  {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, password })
  }
);
```

## 🧪 Testing

### Manual Testing Checklist
- [ ] Login/Logout flow
- [ ] Language switching
- [ ] Health records display
- [ ] Notifications
- [ ] Profile information
- [ ] Chart rendering
- [ ] Offline functionality

## 🐛 Troubleshooting

### Common Issues

**1. Expo not starting**
```bash
# Clear cache and restart
npx expo start --clear
```

**2. Module not found**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

**3. Charts not rendering**
```bash
# Ensure react-native-svg is installed
npm install react-native-svg
```

**4. Language not persisting**
```bash
# Check AsyncStorage
import AsyncStorage from '@react-native-async-storage/async-storage';
const lang = await AsyncStorage.getItem('user_language');
```

**5. Maps not showing**
```bash
# Install maps dependencies
npm install react-native-maps expo-location

# Check location permissions in app.json
{
  "ios": {
    "infoPlist": {
      "NSLocationWhenInUseUsageDescription": "..."
    }
  },
  "android": {
    "permissions": ["ACCESS_FINE_LOCATION", "ACCESS_COARSE_LOCATION"]
  }
}
```

## 🗺️ Maps & Geolocation

### Hospital Finder Implementation

The hospital finder uses **OpenStreetMap** data via the **Overpass API** to fetch nearby medical facilities.

#### How It Works

1. **Get User Location**
```typescript
import * as Location from 'expo-location';

const { status } = await Location.requestForegroundPermissionsAsync();
const location = await Location.getCurrentPositionAsync({
  accuracy: Location.Accuracy.Balanced
});
```

2. **Fetch Hospitals from Overpass API**
```typescript
const query = `
  [out:json];
  (
    node["amenity"="hospital"](around:${radius},${lat},${lon});
    node["amenity"="clinic"](around:${radius},${lat},${lon});
    node["amenity"="pharmacy"](around:${radius},${lat},${lon});
    node["amenity"="doctors"](around:${radius},${lat},${lon});
  );
  out body;
`;

const response = await fetch('https://overpass-api.de/api/interpreter', {
  method: 'POST',
  body: query
});
```

3. **Calculate Distance (Haversine Formula)**
```typescript
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;
  
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};
```

4. **Display on Map**
```typescript
import MapView, { Marker, Circle } from 'react-native-maps';

<MapView
  initialRegion={{
    latitude: userLat,
    longitude: userLon,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05
  }}
>
  <Marker coordinate={{ latitude: userLat, longitude: userLon }} />
  {hospitals.map(hospital => (
    <Marker
      key={hospital.id}
      coordinate={{ latitude: hospital.lat, longitude: hospital.lon }}
      pinColor={getMarkerColor(hospital.type)}
    />
  ))}
</MapView>
```

### Marker Color Coding
- 🏥 **Red** - Hospitals
- 🏥 **Teal** - Clinics  
- 💊 **Purple** - Pharmacies
- 👨‍⚕️ **Gold** - Doctors

### Required Permissions

**iOS (app.json)**
```json
{
  "ios": {
    "infoPlist": {
      "NSLocationWhenInUseUsageDescription": "We need your location to show nearby hospitals and clinics."
    }
  }
}
```

**Android (app.json)**
```json
{
  "android": {
    "permissions": [
      "ACCESS_FINE_LOCATION",
      "ACCESS_COARSE_LOCATION"
    ]
  }
}
```

## 📈 Performance Tips

1. **Use React.memo** for expensive components
2. **Lazy load** images and heavy components
3. **Optimize charts** by limiting data points
4. **Cache translations** in memory
5. **Use FlatList** for long lists

## 🚀 Deployment

### Building for Production

**Android APK**
```bash
eas build --platform android
```

**iOS IPA**
```bash
eas build --platform ios
```

### Publishing Updates
```bash
eas update --branch production
```

## 🔮 Roadmap

- [ ] Biometric authentication
- [ ] Dark/Light theme toggle
- [ ] Medicine reminders
- [ ] Appointment booking
- [ ] Lab reports upload
- [ ] Voice-based navigation (accessibility)
- [ ] Offline data sync
- [ ] Family member profiles

## 📞 Support

For issues and questions:
- Open an issue on GitHub
- Email: support@arogyalink.com

## 📄 License

This project is part of the ArogyaLink platform.

---

**Made with ❤️ using Expo and React Native**
