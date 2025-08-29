'use client';

import { useEffect, useState } from 'react';
import { MapPin, Home, TrendingUp, Info } from 'lucide-react';

// Mock property data for Birmingham
const birminghamProperties = [
  { id: 1, lat: 52.4862, lng: -1.8904, title: 'Digbeth Development Site', price: '£450,000', status: 'Approved' },
  { id: 2, lat: 52.4751, lng: -1.8988, title: 'Jewellery Quarter Plot', price: '£280,000', status: 'Pending' },
  { id: 3, lat: 52.4897, lng: -1.8876, title: 'Business Park Land', price: '£750,000', status: 'Full Permission' },
  { id: 4, lat: 52.4829, lng: -1.9089, title: 'Edgbaston Investment', price: '£520,000', status: 'Outline' },
  { id: 5, lat: 52.4941, lng: -1.8684, title: 'Aston Regeneration', price: '£380,000', status: 'Pre-Application' },
];

export default function MapSearch() {
  const [selectedProperty, setSelectedProperty] = useState<any>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    // Simulate map loading
    setTimeout(() => setMapLoaded(true), 1000);
  }, []);

  return (
    <div className="relative h-full w-full rounded-2xl overflow-hidden">
      {/* Map Background (Placeholder - would be real Leaflet map) */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-green-800 to-emerald-900">
        {/* Grid overlay for map effect */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }}></div>
        
        {/* Birmingham Center Marker */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-400 blur-xl opacity-50 animate-pulse"></div>
            <div className="relative bg-gradient-to-br from-yellow-400 to-amber-600 text-black font-bold px-4 py-2 rounded-lg shadow-2xl">
              Birmingham City Center
            </div>
          </div>
        </div>
        {/* Property Markers */}
        {mapLoaded && birminghamProperties.map((property, index) => (
          <div
            key={property.id}
            className="absolute cursor-pointer transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
            style={{
              top: `${45 + (property.lat - 52.4862) * 500}%`,
              left: `${50 + (property.lng + 1.8904) * 500}%`,
              animationDelay: `${index * 0.1}s`
            }}
            onClick={() => setSelectedProperty(property)}
          >
            <div className="relative animate-slide-up">
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur-md opacity-60 animate-pulse"></div>
              <div className="relative bg-white rounded-full p-2 shadow-lg">
                <MapPin className="w-5 h-5 text-green-600" />
              </div>
              <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                <span className="text-xs bg-black/80 text-white px-2 py-1 rounded">
                  {property.price}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Map Controls */}
      <div className="absolute top-4 right-4 space-y-2 z-10">
        <button className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-lg hover:bg-white transition">
          <TrendingUp className="w-5 h-5 text-gray-700" />
        </button>
        <button className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-lg hover:bg-white transition">
          <Home className="w-5 h-5 text-gray-700" />
        </button>
        <button className="p-2 bg-white/90 backdrop-blur rounded-lg shadow-lg hover:bg-white transition">
          <Info className="w-5 h-5 text-gray-700" />
        </button>
      </div>
      {/* Property Details Popup */}
      {selectedProperty && (
        <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-lg rounded-xl p-4 shadow-2xl z-20 animate-slide-up">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="font-bold text-gray-900">{selectedProperty.title}</h3>
              <p className="text-2xl font-bold text-green-600 mt-1">{selectedProperty.price}</p>
            </div>
            <button 
              onClick={() => setSelectedProperty(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
              selectedProperty.status === 'Approved' || selectedProperty.status === 'Full Permission' 
                ? 'bg-green-100 text-green-700' 
                : selectedProperty.status === 'Pending' 
                ? 'bg-yellow-100 text-yellow-700'
                : 'bg-gray-100 text-gray-700'
            }`}>
              {selectedProperty.status}
            </span>
            <button className="text-blue-600 hover:text-blue-700 font-medium">
              View Details →
            </button>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {!mapLoaded && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-white font-medium">Loading Birmingham Properties...</p>
          </div>
        </div>
      )}
    </div>
  );
}