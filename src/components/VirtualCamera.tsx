import React, { useState } from 'react';
import axios from 'axios';

const VirtualCamera: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleVirtualCamera = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = isEnabled ? '/api/virtual-camera/stop' : '/api/virtual-camera/start';
      const response = await axios.post(`http://localhost:3000${endpoint}`);

      if (response.data.status === 'success') {
        setIsEnabled(!isEnabled);
      } else {
        setError(response.data.message || 'Failed to toggle virtual camera');
      }
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Error connecting to server');
      console.error('Virtual camera error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Virtual Camera</h2>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">
            {isEnabled ? 'Virtual camera is active' : 'Virtual camera is inactive'}
          </span>
          <button
            onClick={toggleVirtualCamera}
            disabled={isLoading}
            className={`px-4 py-2 rounded-md text-white transition-colors ${
              isEnabled
                ? 'bg-red-500 hover:bg-red-600'
                : 'bg-blue-500 hover:bg-blue-600'
            } ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
          >
            {isLoading
              ? 'Processing...'
              : isEnabled
              ? 'Stop Virtual Camera'
              : 'Start Virtual Camera'}
          </button>
        </div>
        {error && (
          <div className="text-red-500 text-sm mt-2">{error}</div>
        )}
        <div className="text-sm text-gray-600">
          <p>When enabled, the virtual camera will process your screen with privacy protection.</p>
          <p>You can select this virtual camera in your video conferencing apps.</p>
        </div>
      </div>
    </div>
  );
};

export default VirtualCamera;
