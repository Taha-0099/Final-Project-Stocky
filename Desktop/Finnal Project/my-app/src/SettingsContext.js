import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch on mount
  useEffect(() => {
    fetchSettings();
    // eslint-disable-next-line
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5001/api/settings");
      setSettings(res.data);
    } catch (error) {
      setSettings(null);
    }
    setLoading(false);
  };

  return (
    <SettingsContext.Provider value={{ settings, setSettings, loading, fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
};
