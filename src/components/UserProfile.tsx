import React, { useState } from 'react';
import { User, Heart, Star, Sparkles } from 'lucide-react';
import { UserData } from '../types';

interface UserProfileProps {
  onComplete: (user: UserData) => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    age: 6,
    learningLevel: 'beginner' as const,
    preferredThemes: [] as string[],
    avatar: '😊'
  });

  const avatarOptions = ['😊', '🌟', '🦄', '🌈', '🎈', '🎨', '🚀', '🌸', '🐱', '🦋', '🌞', '🎯'];
  const themes = [
    { id: 'school', name: 'School', emoji: '🏫' },
    { id: 'friends', name: 'Friends', emoji: '👫' },
    { id: 'family', name: 'Family', emoji: '👨‍👩‍👧‍👦' },
    { id: 'emotions', name: 'Emotions', emoji: '😊' },
    { id: 'playground', name: 'Playground', emoji: '🛝' },
    { id: 'shopping', name: 'Shopping', emoji: '🛒' }
  ];

  const handleThemeToggle = (themeId: string) => {
    setFormData(prev => ({
      ...prev,
      preferredThemes: prev.preferredThemes.includes(themeId)
        ? prev.preferredThemes.filter(t => t !== themeId)
        : [...prev.preferredThemes, themeId]
    }));
  };

  const handleSubmit = () => {
    if (formData.name && formData.preferredThemes.length > 0) {
      onComplete(formData);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-lg w-full border-4 border-blue-100">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome to Social Helper!</h1>
          <p className="text-gray-600">Let's set up your learning adventure</p>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">What's your name?</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full px-4 py-3 text-lg border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                placeholder="Enter your name..."
              />
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">How old are you?</label>
              <select
                value={formData.age}
                onChange={(e) => setFormData(prev => ({ ...prev, age: parseInt(e.target.value) }))}
                className="w-full px-4 py-3 text-lg border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                {Array.from({ length: 13 }, (_, i) => i + 4).map(age => (
                  <option key={age} value={age}>{age} years old</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">Learning Level</label>
              <div className="space-y-2">
                {[
                  { value: 'beginner', label: 'Just Starting', description: 'Learning the basics' },
                  { value: 'intermediate', label: 'Getting Better', description: 'I know some social skills' },
                  { value: 'advanced', label: 'Almost Expert', description: 'I want to practice more' }
                ].map(level => (
                  <button
                    key={level.value}
                    onClick={() => setFormData(prev => ({ ...prev, learningLevel: level.value as any }))}
                    className={`w-full p-3 text-left rounded-xl border-2 transition-all ${
                      formData.learningLevel === level.value
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    <div className="font-semibold">{level.label}</div>
                    <div className="text-sm text-gray-600">{level.description}</div>
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              disabled={!formData.name}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105 transition-all"
            >
              Next Step ✨
            </button>
          </div>
        )}

        {/* Step 2: Avatar and Themes */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">Choose your avatar</label>
              <div className="grid grid-cols-6 gap-2">
                {avatarOptions.map(avatar => (
                  <button
                    key={avatar}
                    onClick={() => setFormData(prev => ({ ...prev, avatar }))}
                    className={`w-12 h-12 text-2xl rounded-xl border-2 transition-all hover:scale-110 ${
                      formData.avatar === avatar
                        ? 'border-blue-500 bg-blue-50 shadow-md'
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {avatar}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-lg font-semibold text-gray-700 mb-3">
                What topics interest you? (Choose at least one)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {themes.map(theme => (
                  <button
                    key={theme.id}
                    onClick={() => handleThemeToggle(theme.id)}
                    className={`p-4 rounded-xl border-2 text-center transition-all hover:scale-105 ${
                      formData.preferredThemes.includes(theme.id)
                        ? 'border-green-500 bg-green-50'
                        : 'border-gray-200 hover:border-green-300'
                    }`}
                  >
                    <div className="text-2xl mb-1">{theme.emoji}</div>
                    <div className="font-semibold text-sm">{theme.name}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={formData.preferredThemes.length === 0}
                className="flex-2 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-bold rounded-xl text-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transform hover:scale-105 transition-all"
              >
                Start Learning! 🚀
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;