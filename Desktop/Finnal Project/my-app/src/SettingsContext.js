import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch on mount
  useEffect(() => {
    axios.get("http://localhost:5001/api/settings")
      .then(res => setSettings(res.data))
      .catch(() => setSettings(null))
      .finally(() => setLoading(false));
  }, []);

  // Provide state and updater
  return (
    <SettingsContext.Provider value={{ settings, setSettings, loading }}>
      {children}
    </SettingsContext.Provider>
  );
};
