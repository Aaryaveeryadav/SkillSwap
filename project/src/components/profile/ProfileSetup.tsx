import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { skillCategories } from '../../data/mockData';
import { Plus, X, Check, Star, TrendingUp, Award, FileText, Link as LinkIcon } from 'lucide-react';

interface SkillWithLevel {
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  hasCertification: boolean;
  certificationName?: string;
  certificationIssuer?: string;
  certificationDate?: string;
  portfolioUrl?: string;
  additionalExperience?: string;
}

const ProfileSetup: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [skillsOffered, setSkillsOffered] = useState<SkillWithLevel[]>([]);
  const [skillsWanted, setSkillsWanted] = useState<SkillWithLevel[]>([]);
  const [availability, setAvailability] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [newSkillCategory, setNewSkillCategory] = useState('General');
  const [showCertificationForm, setShowCertificationForm] = useState(false);
  const [certificationData, setCertificationData] = useState({
    hasCertification: false,
    certificationName: '',
    certificationIssuer: '',
    certificationDate: '',
    portfolioUrl: '',
    additionalExperience: ''
  });

  const availabilityOptions = ['mornings', 'afternoons', 'evenings', 'weekends'];
  const skillLevels = [
    { value: 'beginner', label: 'Beginner', description: 'Just starting out', color: 'bg-green-100 text-green-800' },
    { value: 'intermediate', label: 'Intermediate', description: 'Some experience', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'advanced', label: 'Advanced', description: 'Very experienced', color: 'bg-red-100 text-red-800' }
  ];

  const addSkill = () => {
    if (!newSkill.trim()) return;
    
    const skillWithLevel: SkillWithLevel = {
      name: newSkill.trim(),
      level: newSkillLevel,
      category: newSkillCategory,
      hasCertification: certificationData.hasCertification,
      certificationName: certificationData.certificationName || undefined,
      certificationIssuer: certificationData.certificationIssuer || undefined,
      certificationDate: certificationData.certificationDate || undefined,
      portfolioUrl: certificationData.portfolioUrl || undefined,
      additionalExperience: certificationData.additionalExperience || undefined
    };
    
    if (step === 1) {
      // Step 1 is for skills offered
      setSkillsOffered(prev => [...prev, skillWithLevel]);
    } else if (step === 2) {
      // Step 2 is for skills wanted
      setSkillsWanted(prev => [...prev, skillWithLevel]);
    }
    
    // Reset form
    setNewSkill('');
    setNewSkillLevel('beginner');
    setNewSkillCategory('General');
    setShowCertificationForm(false);
    setCertificationData({
      hasCertification: false,
      certificationName: '',
      certificationIssuer: '',
      certificationDate: '',
      portfolioUrl: '',
      additionalExperience: ''
    });
  };

  const removeSkill = (index: number, type: 'offered' | 'wanted') => {
    if (type === 'offered') {
      setSkillsOffered(prev => prev.filter((_, i) => i !== index));
    } else {
      setSkillsWanted(prev => prev.filter((_, i) => i !== index));
    }
  };

  const toggleAvailability = (time: string) => {
    setAvailability(prev => 
      prev.includes(time) 
        ? prev.filter(t => t !== time)
        : [...prev, time]
    );
  };

  const handleComplete = async () => {
    if (!currentUser) return;

    const skillsOfferedData = skillsOffered.map((skill, index) => ({
      id: `offered-${index}`,
      name: skill.name,
      category: skill.category,
      level: skill.level,
      description: `I can teach ${skill.name} at ${skill.level} level`,
      tags: [],
      hasCertification: skill.hasCertification,
      certificationName: skill.certificationName,
      certificationIssuer: skill.certificationIssuer,
      certificationDate: skill.certificationDate,
      portfolioUrl: skill.portfolioUrl,
      additionalExperience: skill.additionalExperience
    }));

    const skillsWantedData = skillsWanted.map((skill, index) => ({
      id: `wanted-${index}`,
      name: skill.name,
      category: skill.category,
      level: skill.level,
      description: `I want to learn ${skill.name} at ${skill.level} level`,
      tags: [],
      hasCertification: skill.hasCertification,
      certificationName: skill.certificationName,
      certificationIssuer: skill.certificationIssuer,
      certificationDate: skill.certificationDate,
      portfolioUrl: skill.portfolioUrl,
      additionalExperience: skill.additionalExperience
    }));

    await updateProfile({
      skillsOffered: skillsOfferedData,
      skillsWanted: skillsWantedData,
      availability
    });
  };

  const getLevelColor = (level: string) => {
    const levelObj = skillLevels.find(l => l.value === level);
    return levelObj?.color || 'bg-gray-100 text-gray-800';
  };

  if (!currentUser || (currentUser.skillsOffered.length > 0 && currentUser.skillsWanted.length > 0)) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Complete Your Profile</h2>
            <p className="text-gray-600 mt-2">Let's set up your skills and availability to find perfect matches</p>
            <div className="flex justify-center mt-4">
              <div className="flex space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      i <= step ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">What skills can you teach?</h3>
                <p className="text-gray-600 mt-2">Share your expertise with others and help them learn</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="e.g., Photoshop, Guitar, Spanish..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) => e.key === 'Enter' && !showCertificationForm && addSkill()}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Your Level</label>
                    <select
                      value={newSkillLevel}
                      onChange={(e) => setNewSkillLevel(e.target.value as any)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {skillLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label} - {level.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newSkillCategory}
                      onChange={(e) => setNewSkillCategory(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {skillCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Certification Question */}
                <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center mb-3">
                    <Award className="h-5 w-5 text-blue-600 mr-2" />
                    <h4 className="font-medium text-blue-900">Do you have any certifications or formal training in {newSkill || 'this skill'}?</h4>
                  </div>
                  <div className="flex space-x-4 mb-3">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="hasCertification"
                        checked={certificationData.hasCertification === true}
                        onChange={() => {
                          setCertificationData(prev => ({ ...prev, hasCertification: true }));
                          setShowCertificationForm(true);
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-blue-800">Yes, I have certifications/training</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="hasCertification"
                        checked={certificationData.hasCertification === false}
                        onChange={() => {
                          setCertificationData(prev => ({ ...prev, hasCertification: false }));
                          setShowCertificationForm(false);
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-blue-800">No, self-taught/experience only</span>
                    </label>
                  </div>

                  {/* Certification Details Form */}
                  {showCertificationForm && (
                    <div className="space-y-4 mt-4 p-4 bg-white rounded-lg border border-blue-200">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Certification Name</label>
                          <input
                            type="text"
                            value={certificationData.certificationName}
                            onChange={(e) => setCertificationData(prev => ({ ...prev, certificationName: e.target.value }))}
                            placeholder="e.g., Adobe Certified Expert"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Issuing Organization</label>
                          <input
                            type="text"
                            value={certificationData.certificationIssuer}
                            onChange={(e) => setCertificationData(prev => ({ ...prev, certificationIssuer: e.target.value }))}
                            placeholder="e.g., Adobe, Coursera, University"
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Date Obtained</label>
                          <input
                            type="month"
                            value={certificationData.certificationDate}
                            onChange={(e) => setCertificationData(prev => ({ ...prev, certificationDate: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Portfolio/Work URL (Optional)</label>
                          <div className="relative">
                            <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <input
                              type="url"
                              value={certificationData.portfolioUrl}
                              onChange={(e) => setCertificationData(prev => ({ ...prev, portfolioUrl: e.target.value }))}
                              placeholder="https://your-portfolio.com"
                              className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                            />
                          </div>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Additional Experience (Optional)</label>
                        <textarea
                          value={certificationData.additionalExperience}
                          onChange={(e) => setCertificationData(prev => ({ ...prev, additionalExperience: e.target.value }))}
                          placeholder="Describe any additional experience, projects, or achievements..."
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm resize-none"
                        />
                      </div>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={addSkill}
                  disabled={!newSkill.trim()}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Skill
                </button>
              </div>

              <div className="space-y-3">
                {skillsOffered.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-teal-50 border border-teal-200 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h4 className="font-medium text-teal-900">{skill.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                        <span className="text-xs text-teal-700 bg-teal-100 px-2 py-1 rounded-full">
                          {skill.category}
                        </span>
                        {skill.hasCertification && (
                          <span className="text-xs text-blue-700 bg-blue-100 px-2 py-1 rounded-full flex items-center">
                            <Award className="h-3 w-3 mr-1" />
                            Certified
                          </span>
                        )}
                      </div>
                      {skill.hasCertification && skill.certificationName && (
                        <div className="text-xs text-teal-700">
                          <p><strong>Certification:</strong> {skill.certificationName}</p>
                          {skill.certificationIssuer && <p><strong>Issuer:</strong> {skill.certificationIssuer}</p>}
                          {skill.portfolioUrl && (
                            <p>
                              <strong>Portfolio:</strong> 
                              <a href={skill.portfolioUrl} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                                View Work
                              </a>
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                    <button
                      onClick={() => removeSkill(index, 'offered')}
                      className="text-teal-600 hover:text-teal-800 p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={skillsOffered.length === 0}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">What skills do you want to learn?</h3>
                <p className="text-gray-600 mt-2">Tell us what you're excited to learn from others</p>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Skill Name</label>
                    <input
                      type="text"
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="e.g., Cooking, Photography, Web Design..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Desired Level</label>
                    <select
                      value={newSkillLevel}
                      onChange={(e) => setNewSkillLevel(e.target.value as any)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {skillLevels.map((level) => (
                        <option key={level.value} value={level.value}>
                          {level.label} - {level.description}
                        </option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={newSkillCategory}
                      onChange={(e) => setNewSkillCategory(e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {skillCategories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <button
                  onClick={addSkill}
                  disabled={!newSkill.trim()}
                  className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Add Skill
                </button>
              </div>

              <div className="space-y-3">
                {skillsWanted.map((skill, index) => (
                  <div
                    key={index}
                    className="bg-purple-50 border border-purple-200 rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium text-purple-900">{skill.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(skill.level)}`}>
                          {skill.level}
                        </span>
                        <span className="text-xs text-purple-700 bg-purple-100 px-2 py-1 rounded-full">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => removeSkill(index, 'wanted')}
                      className="text-purple-600 hover:text-purple-800 p-1"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  disabled={skillsWanted.length === 0}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900">When are you available?</h3>
                <p className="text-gray-600 mt-2">Let others know when you're free for skill exchanges</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {availabilityOptions.map((time) => (
                  <button
                    key={time}
                    onClick={() => toggleAvailability(time)}
                    className={`p-4 rounded-lg border-2 transition-all duration-200 capitalize ${
                      availability.includes(time)
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{time}</span>
                      {availability.includes(time) && (
                        <Check className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors"
                >
                  Back
                </button>
                <button
                  onClick={handleComplete}
                  disabled={availability.length === 0}
                  className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Complete Setup
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;