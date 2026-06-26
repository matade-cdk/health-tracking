import React, { createContext, useState, useEffect, useContext } from 'react';
import { IntlProvider } from 'react-intl';
import storageService from '../services/storageService';
import { LANGUAGES } from '../config/constants';
import en from '../locales/en.json';
import hi from '../locales/hi.json';

const LanguageContext = createContext({});

const messages = {
  [LANGUAGES.EN]: en,
  [LANGUAGES.HI]: hi,
};

export const LanguageProvider = ({ children }) => {
  const [locale, setLocale] = useState(LANGUAGES.EN);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLanguage();
  }, []);

  const loadLanguage = async () => {
    try {
      const savedLanguage = await storageService.getLanguage();
      if (savedLanguage) {
        setLocale(savedLanguage);
      }
    } catch (error) {
      console.error('Error loading language:', error);
    } finally {
      setLoading(false);
    }
  };

  const changeLanguage = async (newLocale) => {
    try {
      await storageService.saveLanguage(newLocale);
      setLocale(newLocale);
      return true;
    } catch (error) {
      console.error('Error changing language:', error);
      return false;
    }
  };

  if (loading) {
    return null;
  }

  return (
    <LanguageContext.Provider value={{ locale, changeLanguage }}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export default LanguageContext;
