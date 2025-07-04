import React, { useState } from 'react';
import { X, Palette, Settings, Zap } from 'lucide-react';

interface VehicleConfiguratorProps {
  isOpen: boolean;
  onClose: () => void;
  vehicleName: string;
}

export const VehicleConfigurator: React.FC<VehicleConfiguratorProps> = ({
  isOpen,
  onClose,
  vehicleName
}) => {
  const [selectedColor, setSelectedColor] = useState('midnight-black');
  const [selectedInterior, setSelectedInterior] = useState('premium-leather');
  const [selectedWheels, setSelectedWheels] = useState('21-inch-sport');
  const [selectedPerformance, setSelectedPerformance] = useState('dual-motor');
  const [orderSuccess, setOrderSuccess] = useState(false);

  const colors = [
    { id: 'midnight-black', name: 'Midnight Black', color: '#1a1a1a', price: 0 },
    { id: 'pearl-white', name: 'Pearl White', color: '#f8f8ff', price: 1500 },
    { id: 'metallic-silver', name: 'Metallic Silver', color: '#c0c0c0', price: 1000 },
    { id: 'deep-blue', name: 'Deep Blue', color: '#1e3a8a', price: 1500 },
    { id: 'crimson-red', name: 'Crimson Red', color: '#dc2626', price: 2000 }
  ];

  const interiors = [
    { id: 'premium-leather', name: 'Premium Leather', price: 0 },
    { id: 'vegan-leather', name: 'Vegan Leather', price: 500 },
    { id: 'alcantara', name: 'Alcantara Sport', price: 2500 }
  ];

  const wheels = [
    { id: '19-inch-aero', name: '19" Aero Wheels', price: 0 },
    { id: '21-inch-sport', name: '21" Sport Wheels', price: 2500 },
    { id: '22-inch-performance', name: '22" Performance', price: 4500 }
  ];

  const performance = [
    { id: 'single-motor', name: 'Single Motor', price: 0, range: '350 mi', acceleration: '5.8s' },
    { id: 'dual-motor', name: 'Dual Motor AWD', price: 10000, range: '405 mi', acceleration: '3.1s' },
    { id: 'plaid', name: 'Plaid Performance', price: 20000, range: '390 mi', acceleration: '1.9s' }
  ];

  const calculateTotal = () => {
    const basePrice = 75000;
    const colorPrice = colors.find(c => c.id === selectedColor)?.price || 0;
    const interiorPrice = interiors.find(i => i.id === selectedInterior)?.price || 0;
    const wheelPrice = wheels.find(w => w.id === selectedWheels)?.price || 0;
    const performancePrice = performance.find(p => p.id === selectedPerformance)?.price || 0;
    
    return basePrice + colorPrice + interiorPrice + wheelPrice + performancePrice;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Order Success Modal */}
      {orderSuccess && (
        <div className="fixed inset-0 z-60 bg-black/70 flex items-center justify-center">
          <div className="bg-white rounded-3xl p-12 max-w-md w-full text-center shadow-2xl">
            <div className="text-5xl mb-4 text-green-500">✔️</div>
            <h2 className="text-2xl font-black mb-2">Order Successful!</h2>
            <p className="mb-6">Thank you for your order. We will contact you soon with more details.</p>
            <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-bold hover:shadow-lg transition-all duration-300" onClick={() => { setOrderSuccess(false); onClose(); }}>
              Close
            </button>
          </div>
        </div>
      )}
      <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-center rounded-t-3xl">
            <h2 className="text-3xl font-black text-gray-900">Configure Your {vehicleName}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6">
            {/* Vehicle Preview */}
            <div className="space-y-6">
              <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center relative overflow-hidden">
                <img
                  src={`/car-${selectedColor}.png`}
                  alt="Car Preview"
                  className="w-80 h-40 object-contain rounded-2xl shadow-2xl transform rotate-12 hover:rotate-6 transition-transform duration-500"
                  style={{ backgroundColor: colors.find(c => c.id === selectedColor)?.color }}
                />
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3">
                  <div className="text-sm font-bold text-gray-900">
                    {colors.find(c => c.id === selectedColor)?.name}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Performance Specs</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-black text-orange-500">
                      {performance.find(p => p.id === selectedPerformance)?.range}
                    </div>
                    <div className="text-sm text-gray-600">Range</div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-orange-500">
                      {performance.find(p => p.id === selectedPerformance)?.acceleration}
                    </div>
                    <div className="text-sm text-gray-600">0-60 MPH</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Configuration Options */}
            <div className="space-y-8">
              {/* Color Selection */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Palette className="h-5 w-5 text-orange-500" />
                  <h3 className="text-xl font-bold text-gray-900">Exterior Color</h3>
                </div>
                <div className="grid grid-cols-5 gap-3">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`aspect-square rounded-xl border-4 transition-all duration-300 ${
                        selectedColor === color.id 
                          ? 'border-orange-500 scale-110' 
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                      style={{ backgroundColor: color.color }}
                    >
                      <span className="sr-only">{color.name}</span>
                    </button>
                  ))}
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  {colors.find(c => c.id === selectedColor)?.name} 
                  {colors.find(c => c.id === selectedColor)?.price ? 
                    ` (+$${colors.find(c => c.id === selectedColor)?.price?.toLocaleString()})` : 
                    ' (Included)'
                  }
                </div>
              </div>

              {/* Performance Selection */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Zap className="h-5 w-5 text-orange-500" />
                  <h3 className="text-xl font-bold text-gray-900">Performance</h3>
                </div>
                <div className="space-y-3">
                  {performance.map((perf) => (
                    <button
                      key={perf.id}
                      onClick={() => setSelectedPerformance(perf.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                        selectedPerformance === perf.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <div className="font-bold text-gray-900">{perf.name}</div>
                          <div className="text-sm text-gray-600">
                            {perf.range} range • {perf.acceleration} 0-60
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-gray-900">
                            {perf.price ? `+$${perf.price.toLocaleString()}` : 'Included'}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Interior Selection */}
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <Settings className="h-5 w-5 text-orange-500" />
                  <h3 className="text-xl font-bold text-gray-900">Interior</h3>
                </div>
                <div className="space-y-3">
                  {interiors.map((interior) => (
                    <button
                      key={interior.id}
                      onClick={() => setSelectedInterior(interior.id)}
                      className={`w-full p-4 rounded-xl border-2 text-left transition-all duration-300 ${
                        selectedInterior === interior.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="font-bold text-gray-900">{interior.name}</div>
                        <div className="font-bold text-gray-900">
                          {interior.price ? `+$${interior.price.toLocaleString()}` : 'Included'}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Summary and Order */}
          <div className="sticky bottom-0 bg-white border-t border-gray-200 p-6 rounded-b-3xl">
            <div className="flex justify-between items-center mb-6">
              <div>
                <div className="text-3xl font-black text-gray-900">
                  ${calculateTotal().toLocaleString()}
                </div>
                <div className="text-sm text-gray-600">Total Price</div>
              </div>
              <div className="flex gap-4">
                <button className="px-8 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-bold hover:border-orange-500 hover:text-orange-500 transition-colors">
                  Save Configuration
                </button>
                <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-bold hover:shadow-lg hover:scale-105 transition-all duration-300" onClick={() => setOrderSuccess(true)}>
                  Order Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};