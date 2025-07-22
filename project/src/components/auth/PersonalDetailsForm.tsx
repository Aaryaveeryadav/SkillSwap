import React, { useState } from 'react';
import { User, PersonalDetails } from '../../types';
import { Shield, Phone, MapPin, CreditCard, Users, Calendar, AlertCircle } from 'lucide-react';

interface PersonalDetailsFormProps {
  onComplete: (details: PersonalDetails, learningMode: 'online' | 'offline' | 'both') => void;
  onSkip: () => void;
}

const PersonalDetailsForm: React.FC<PersonalDetailsFormProps> = ({ onComplete, onSkip }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<PersonalDetails>({
    fullName: '',
    dateOfBirth: '',
    phoneNumber: '',
    address: '',
    idType: 'drivers_license',
    idNumber: '',
    emergencyContact: {
      name: '',
      phone: '',
      relationship: ''
    }
  });
  const [learningMode, setLearningMode] = useState<'online' | 'offline' | 'both'>('both');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    
    if (name.startsWith('emergency.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        emergencyContact: {
          ...prev.emergencyContact,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData, learningMode);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto transition-colors duration-200">
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Become a Verified User</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              Complete your verification to build trust and unlock premium features
            </p>
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      i <= step ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Personal Information</h3>
                  <p className="text-gray-600 dark:text-gray-400">Help us verify your identity</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Enter your full legal name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      ID Type *
                    </label>
                    <select
                      name="idType"
                      value={formData.idType}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    >
                      <option value="drivers_license">Driver's License</option>
                      <option value="passport">Passport</option>
                      <option value="national_id">National ID</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    ID Number *
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                    <input
                      type="text"
                      name="idNumber"
                      value={formData.idNumber}
                      onChange={handleChange}
                      required
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Enter your ID number"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Address *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3 text-gray-400 dark:text-gray-500 h-5 w-5" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={3}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                      placeholder="Enter your full address"
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    disabled={!formData.fullName || !formData.dateOfBirth || !formData.phoneNumber || !formData.idNumber || !formData.address}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Emergency Contact</h3>
                  <p className="text-gray-600 dark:text-gray-400">For your safety and security</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contact Name *
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                      <input
                        type="text"
                        name="emergency.name"
                        value={formData.emergencyContact.name}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="Emergency contact name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Contact Phone *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                      <input
                        type="tel"
                        name="emergency.phone"
                        value={formData.emergencyContact.phone}
                        onChange={handleChange}
                        required
                        className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Relationship *
                  </label>
                  <select
                    name="emergency.relationship"
                    value={formData.emergencyContact.relationship}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                  >
                    <option value="">Select relationship</option>
                    <option value="parent">Parent</option>
                    <option value="sibling">Sibling</option>
                    <option value="spouse">Spouse/Partner</option>
                    <option value="friend">Friend</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={!formData.emergencyContact.name || !formData.emergencyContact.phone || !formData.emergencyContact.relationship}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Learning Preferences</h3>
                  <p className="text-gray-600 dark:text-gray-400">How would you like to learn and teach?</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div
                    onClick={() => setLearningMode('online')}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      learningMode === 'online'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        learningMode === 'online' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'
                      }`} />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">Online Only</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Learn through video calls and online sessions</p>
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">✓ Video chat links provided automatically</p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setLearningMode('offline')}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      learningMode === 'offline'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        learningMode === 'offline' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'
                      }`} />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">In-Person Only</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Meet face-to-face in your local area</p>
                        <p className="text-xs text-green-600 dark:text-green-400 mt-1">✓ Enhanced safety features for meetups</p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setLearningMode('both')}
                    className={`p-6 rounded-lg border-2 cursor-pointer transition-all ${
                      learningMode === 'both'
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-4 h-4 rounded-full border-2 ${
                        learningMode === 'both' ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'
                      }`} />
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-gray-100">Both Online & In-Person</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Flexible learning options based on preference</p>
                        <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">✓ Maximum flexibility and opportunities</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                  <div className="flex items-start">
                    <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-900 dark:text-yellow-100">Verification Benefits</h4>
                      <ul className="text-sm text-yellow-800 dark:text-yellow-200 mt-1 space-y-1">
                        <li>• Verified badge on your profile</li>
                        <li>• Higher trust score and better matches</li>
                        <li>• Access to premium features</li>
                        <li>• Priority customer support</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-400 dark:hover:bg-gray-500 transition-colors"
                  >
                    Back
                  </button>
                  <div className="space-x-3">
                    <button
                      type="button"
                      onClick={onSkip}
                      className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      Skip for Now
                    </button>
                    <button
                      type="submit"
                      className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Complete Verification
                    </button>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default PersonalDetailsForm;