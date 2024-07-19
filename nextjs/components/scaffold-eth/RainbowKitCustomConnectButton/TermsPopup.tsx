import React, { useState } from 'react';

interface TermsPopupProps {
  onAccept: () => void;
  onClose: () => void;
}

const TermsPopup: React.FC<TermsPopupProps> = ({ onAccept, onClose }) => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-gray-900 p-6 rounded-lg max-w-md w-full text-white">
        <h2 className="text-xl font-bold mb-4">Welcome to Scaffold-ETH</h2>
        <p className="mb-4">Please confirm your agreement to our Terms of Use and Privacy Policy:</p>
        <div className="mb-4">
          <p>
            I have read and understand, and agree to be bound by the Terms of Use and
            Privacy Policy, including all future amendments. This agreement applies to all my uses of
            Scaffold-ETH's services.
          </p>
        </div>
        <label className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
            className="mr-2"
          />
          I agree to the Terms of Use and Privacy Policy
        </label>
        <div className="flex justify-end">
          <button 
            onClick={onClose} 
            className="mr-2 px-4 py-2 bg-gray-700 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button 
            onClick={onAccept} 
            disabled={!isChecked}
            className={`px-4 py-2 rounded ${isChecked ? 'bg-blue-500 text-white hover:bg-blue-600' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
          >
            Accept & Connect
          </button>
        </div>
      </div>
    </div>
  );
};

export default TermsPopup;