import React, { useState } from 'react';
import { X, Check, Star, Zap, Users, Video, Shield, Crown } from 'lucide-react';
import { SubscriptionPlan } from '../../types';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubscribe: (planId: string) => void;
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({ isOpen, onClose, onSubscribe }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>('premium-monthly');

  const plans: SubscriptionPlan[] = [
    {
      id: 'free',
      name: 'Free',
      price: 0,
      duration: 'monthly',
      features: [
        'Basic skill matching',
        'Up to 5 matches per month',
        'Standard messaging',
        'Community access',
        'Basic profile features'
      ],
      maxMatches: 5,
      prioritySupport: false,
      advancedFilters: false,
      videoCallMinutes: 0
    },
    {
      id: 'premium-monthly',
      name: 'Premium',
      price: 9.99,
      duration: 'monthly',
      features: [
        'Unlimited skill matching',
        'Advanced matching algorithm',
        'Priority in search results',
        'Video call integration (100 min/month)',
        'Advanced filters & search',
        'Priority customer support',
        'Verified badge boost',
        'Analytics dashboard'
      ],
      maxMatches: -1, // unlimited
      prioritySupport: true,
      advancedFilters: true,
      videoCallMinutes: 100
    },
    {
      id: 'premium-yearly',
      name: 'Premium Annual',
      price: 99.99,
      duration: 'yearly',
      features: [
        'Everything in Premium Monthly',
        'Save 17% with annual billing',
        'Video call integration (150 min/month)',
        'Exclusive community events',
        'Early access to new features',
        'Personal skill consultant',
        'Custom skill recommendations'
      ],
      maxMatches: -1,
      prioritySupport: true,
      advancedFilters: true,
      videoCallMinutes: 150
    }
  ];

  if (!isOpen) return null;

  const handleSubscribe = () => {
    onSubscribe(selectedPlan);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transition-colors duration-200">
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Choose Your Plan</h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">Unlock advanced features and find more skill matches</p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => setSelectedPlan(plan.id)}
                className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all ${
                  selectedPlan === plan.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 shadow-lg'
                    : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                } ${plan.name === 'Premium' ? 'ring-2 ring-blue-200 dark:ring-blue-800' : ''}`}
              >
                {plan.name === 'Premium' && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                      MOST POPULAR
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                    plan.id === 'free' ? 'bg-gray-100 dark:bg-gray-700' :
                    plan.id === 'premium-monthly' ? 'bg-blue-100 dark:bg-blue-900/30' : 'bg-purple-100 dark:bg-purple-900/30'
                  }`}>
                    {plan.id === 'free' ? (
                      <Users className={`h-8 w-8 text-gray-600 dark:text-gray-400`} />
                    ) : plan.id === 'premium-monthly' ? (
                      <Star className={`h-8 w-8 text-blue-600 dark:text-blue-400`} />
                    ) : (
                      <Crown className={`h-8 w-8 text-purple-600 dark:text-purple-400`} />
                    )}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100">{plan.name}</h3>
                  <div className="mt-2">
                    <span className="text-3xl font-bold text-gray-900 dark:text-gray-100">${plan.price}</span>
                    <span className="text-gray-600 dark:text-gray-400">/{plan.duration === 'monthly' ? 'month' : 'year'}</span>
                  </div>
                  {plan.duration === 'yearly' && (
                    <div className="mt-1">
                      <span className="text-sm text-green-600 dark:text-green-400 font-medium">Save 17%</span>
                    </div>
                  )}
                </div>

                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className={`w-4 h-4 rounded-full border-2 mx-auto ${
                  selectedPlan === plan.id ? 'border-blue-500 bg-blue-500' : 'border-gray-300 dark:border-gray-600'
                }`} />
              </div>
            ))}
          </div>

          <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Premium Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Advanced matching algorithm</span>
              </div>
              <div className="flex items-center">
                <Video className="h-5 w-5 text-purple-600 dark:text-purple-400 mr-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Integrated video calling</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-5 w-5 text-green-600 dark:text-green-400 mr-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Enhanced verification</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 text-orange-600 dark:text-orange-400 mr-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">Priority support</span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <button
              onClick={handleSubscribe}
              disabled={selectedPlan === 'free'}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {selectedPlan === 'free' ? 'Current Plan' : 'Subscribe Now'}
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 dark:text-gray-400 mt-4">
            Cancel anytime. No hidden fees. 30-day money-back guarantee.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionModal;