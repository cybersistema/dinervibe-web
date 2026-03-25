import { createContext, useContext, useState, useCallback } from 'react';
import { mockLocations as initialLocations } from '../data/mockData';

const LocationContext = createContext(null);

export function LocationProvider({ children }) {
  const [locations, setLocations] = useState(initialLocations);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const addLocation = useCallback((newLocation) => {
    setLocations((prev) => [newLocation, ...prev]);
  }, []);

  const removeLocation = useCallback((locationId) => {
    setLocations((prev) => prev.filter((loc) => loc.id !== locationId));
  }, []);

  const updateLocation = useCallback((locationId, updates) => {
    setLocations((prev) =>
      prev.map((loc) => (loc.id === locationId ? { ...loc, ...updates } : loc))
    );
  }, []);

  const openAddModal = useCallback(() => setIsAddModalOpen(true), []);
  const closeAddModal = useCallback(() => setIsAddModalOpen(false), []);

  const value = {
    locations,
    addLocation,
    removeLocation,
    updateLocation,
    isAddModalOpen,
    openAddModal,
    closeAddModal,
  };

  return (
    <LocationContext.Provider value={value}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocations() {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocations must be used within a LocationProvider');
  }
  return context;
}
