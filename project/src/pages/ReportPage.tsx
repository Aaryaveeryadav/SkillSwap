import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Flag, AlertTriangle, Shield, User, Mail, MessageCircle, Calendar, FileText, Send, ArrowLeft } from 'lucide-react';

const ReportPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [formData, setFormData] = useState({
    reportedUserName: searchParams.get('user') || '',
    reportedUserEmail: searchParams.get('email') || '',
    reportType: '',
    category: '',
    description: '',
    incidentDate: '',
    evidence: '',
    contactMethod: 'email',
    urgency: 'medium',
    anonymous: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const reportTypes = [
    { id: 'harassment', name: 'Harassment or Bullying', icon: '😠', description: 'Threatening, intimidating, or abusive behavior' },
    { id: 'inappropriate', name: 'Inappropriate Behavior', icon: '⚠️', description: 'Unprofessional or inappropriate conduct' },
    { id: 'safety', name: 'Safety Concerns', icon: '🚨', description: 'Behavior that makes you feel unsafe' },
    { id: 'fake', name: 'Fake Profile', icon: '🎭', description: 'Suspicious or fraudulent account' },
    { id: 'spam', name: 'Spam or Scam', icon: '📧', description: 'Unwanted promotional content or fraudulent activity' },
    { id: 'content', name: 'Inappropriate Content', icon: '🚫', description: 'Offensive, explicit, or harmful content' },
    { id: 'violation', name: 'Terms Violation', icon: '📋', description: 'Breaking SkillSwap community guidelines' },
    { id: 'other', name: 'Other', icon: '❓', description: 'Something else not covered above' }
  ];

  const urgencyLevels = [
    { id: 'low', name: 'Low', color: 'text-green-600 dark:text-green-400 bg-green-100 dark:bg-green-900/30', description: 'Non-urgent issue' },
    { id: 'medium', name: 'Medium', color: 'text-yellow-600 dark:text-yellow-400 bg-yellow-100 dark:bg-yellow-900/30', description: 'Needs attention' },
    { id: 'high', name: 'High', color: 'text-orange-600 dark:text-orange-400 bg-orange-100 dark:bg-orange-900/30', description: 'Urgent issue' },
    { id: 'critical', name: 'Critical', color: 'text-red-600 dark:text-red-400 bg-red-100 dark:bg-red-900/30', description: 'Immediate safety concern' }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log('Report submitted:', formData);
    setSubmitted(true);
    setIsSubmitting(false);
  };

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Report Submitted Successfully</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
            Thank you for helping keep our community safe. We take all reports seriously and will investigate this matter promptly.
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-6 max-w-2xl mx-auto mb-8">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">What happens next?</h3>
            <ul className="text-left text-blue-800 dark:text-blue-200 space-y-2">
              <li>• Our safety team will review your report within 24 hours</li>
              <li>• We may contact you for additional information if needed</li>
              <li>• Appropriate action will be taken based on our investigation</li>
              <li>• You'll receive an update on the status of your report</li>
            </ul>
          </div>

          <div className="space-x-4">
            <button
              onClick={() => navigate('/safety')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View Safety Guidelines
            </button>
            <button
              onClick={() => navigate('/')}
              className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 mb-4 transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>
        
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
            <Flag className="h-8 w-8 text-red-600 dark:text-red-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Report a User</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Help us maintain a safe and respectful community by reporting inappropriate behavior or safety concerns.
          </p>
        </div>
      </div>

      {/* Emergency Notice */}
      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mb-8">
        <div className="flex items-start">
          <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400 mr-3 mt-1" />
          <div>
            <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">🚨 Emergency Situations</h3>
            <p className="text-red-800 dark:text-red-200 text-sm mb-3">
              If you're in immediate danger or experiencing an emergency, please contact local authorities first:
            </p>
            <div className="space-y-1 text-red-800 dark:text-red-200 text-sm">
              <p><strong>Emergency Services:</strong> 911</p>
              <p><strong>Crisis Text Line:</strong> Text HOME to 741741</p>
              <p><strong>National Suicide Prevention Lifeline:</strong> 988</p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* User Information */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
            <User className="h-5 w-5 mr-2" />
            User Information
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Person you want to report *
              </label>
              <input
                type="text"
                name="reportedUserName"
                value={formData.reportedUserName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Enter their name or username"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Their email address (if known)
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                <input
                  type="email"
                  name="reportedUserEmail"
                  value={formData.reportedUserEmail}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  placeholder="their.email@example.com"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Report Type */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
            <Flag className="h-5 w-5 mr-2" />
            What are you reporting? *
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((type) => (
              <div
                key={type.id}
                onClick={() => setFormData(prev => ({ ...prev, reportType: type.id }))}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                  formData.reportType === type.id
                    ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                    : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <span className="text-2xl">{type.icon}</span>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">{type.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{type.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Incident Details */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Incident Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                When did this happen? *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
                <input
                  type="datetime-local"
                  name="incidentDate"
                  value={formData.incidentDate}
                  onChange={handleChange}
                  required
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Please describe what happened *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Please provide as much detail as possible about the incident, including what was said or done, where it happened, and any other relevant information..."
              />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                Be specific and factual. Include quotes if applicable.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Evidence (optional)
              </label>
              <textarea
                name="evidence"
                value={formData.evidence}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                placeholder="Describe any screenshots, messages, or other evidence you have. Note: Do not include actual screenshots or files in this form - our team will contact you if needed."
              />
            </div>
          </div>
        </div>

        {/* Urgency and Contact */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6 transition-colors duration-200">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-6 flex items-center">
            <MessageCircle className="h-5 w-5 mr-2" />
            Priority and Contact
          </h2>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                How urgent is this issue? *
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {urgencyLevels.map((level) => (
                  <div
                    key={level.id}
                    onClick={() => setFormData(prev => ({ ...prev, urgency: level.id }))}
                    className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
                      formData.urgency === level.id
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${level.color}`}>
                          {level.name}
                        </span>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{level.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                How should we contact you for follow-up?
              </label>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="email"
                    checked={formData.contactMethod === 'email'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Email (recommended)</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="platform"
                    checked={formData.contactMethod === 'platform'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">Through SkillSwap platform</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="contactMethod"
                    value="none"
                    checked={formData.contactMethod === 'none'}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">No follow-up needed</span>
                </label>
              </div>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="anonymous"
                  checked={formData.anonymous}
                  onChange={handleChange}
                  className="mr-2"
                />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Submit this report anonymously (we won't share your identity with the reported user)
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Important Information */}
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
          <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-3">📋 Important Information</h3>
          <ul className="text-sm text-yellow-800 dark:text-yellow-200 space-y-2">
            <li>• All reports are taken seriously and investigated thoroughly</li>
            <li>• False reports may result in action against your account</li>
            <li>• We may contact you for additional information during our investigation</li>
            <li>• Reports are handled confidentially by our safety team</li>
            <li>• You'll receive updates on the status of your report</li>
          </ul>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            disabled={isSubmitting || !formData.reportedUserName || !formData.reportType || !formData.description || !formData.incidentDate}
            className="bg-red-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center mx-auto"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Submitting Report...
              </>
            ) : (
              <>
                <Send className="h-5 w-5 mr-2" />
                Submit Report
              </>
            )}
          </button>
          
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
            By submitting this report, you confirm that the information provided is accurate to the best of your knowledge.
          </p>
        </div>
      </form>
    </div>
  );
};

export default ReportPage;