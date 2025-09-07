import React from 'react';
import { Star, Trophy, Target, TrendingUp, Award, Calendar, Book, Heart } from 'lucide-react';
import { Progress, UserData } from '../types';

interface ProgressDashboardProps {
  progress: Progress;
  user: UserData;
}

const ProgressDashboard: React.FC<ProgressDashboardProps> = ({ progress, user }) => {
  const completionRate = progress.totalScenarios > 0 ? 
    Math.round((progress.completedScenarios / progress.totalScenarios) * 100) : 0;

  const nextLevelStars = (progress.level * 10);
  const currentLevelProgress = progress.stars - ((progress.level - 1) * 10);
  const levelProgressPercent = (currentLevelProgress / 10) * 100;

  const badgeEmojis: { [key: string]: string } = {
    'Level 2': '🌟',
    'Level 3': '⭐',
    'Level 4': '🌠',
    'Level 5': '✨',
    'First Steps': '👣',
    'Social Star': '🌟',
    'Star Collector': '🎯',
    'Communication Pro': '💬',
    'Emotion Expert': '😊',
    'Helper Hero': '🦸',
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
            {user.avatar}
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">
              {user.name}'s Progress 📊
            </h1>
            <p className="text-gray-600 text-lg">
              Keep up the amazing work! You're doing great! 🎉
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Stars */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-yellow-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-yellow-600 fill-current" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-yellow-600">{progress.stars}</div>
              <div className="text-sm text-gray-600">Stars Earned</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            {10 - currentLevelProgress} more for Level {progress.level + 1}!
          </div>
        </div>

        {/* Current Level */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-purple-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
              <Trophy className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-purple-600">{progress.level}</div>
              <div className="text-sm text-gray-600">Current Level</div>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              style={{ width: `${levelProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Scenarios Completed */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-green-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
              <Book className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">{progress.completedScenarios}</div>
              <div className="text-sm text-gray-600">Scenarios Done</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            You're getting better every day! 🌟
          </div>
        </div>

        {/* Success Rate */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-200">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-blue-600">{completionRate}%</div>
              <div className="text-sm text-gray-600">Success Rate</div>
            </div>
          </div>
          <div className="text-xs text-gray-500">
            Amazing progress! Keep it up! 💪
          </div>
        </div>
      </div>

      {/* Achievements and Badges */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Badges */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100">
          <div className="flex items-center space-x-2 mb-4">
            <Award className="w-6 h-6 text-blue-600" />
            <h2 className="text-xl font-bold text-gray-800">Your Badges</h2>
          </div>
          
          {progress.badges.length > 0 ? (
            <div className="grid grid-cols-2 gap-3">
              {progress.badges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200"
                >
                  <div className="text-2xl">
                    {badgeEmojis[badge] || '🏆'}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-800">{badge}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🎯</div>
              <p className="text-gray-600">Complete scenarios to earn badges!</p>
            </div>
          )}
        </div>

        {/* Learning Stats */}
        <div className="bg-white rounded-2xl shadow-lg p-6 border-2 border-blue-100">
          <div className="flex items-center space-x-2 mb-4">
            <Target className="w-6 h-6 text-green-600" />
            <h2 className="text-xl font-bold text-gray-800">Learning Journey</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">Learning Level</span>
              </div>
              <span className="font-semibold text-green-700 capitalize">{user.learningLevel}</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
              <div className="flex items-center space-x-2">
                <Book className="w-5 h-5 text-blue-600" />
                <span className="text-gray-700">Favorite Topics</span>
              </div>
              <span className="font-semibold text-blue-700">{user.preferredThemes.length} themes</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">Streak Days</span>
              </div>
              <span className="font-semibold text-purple-700">{progress.streakDays} days</span>
            </div>
          </div>
        </div>
      </div>

      {/* Encouragement Message */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl shadow-lg p-8 text-white text-center">
        <div className="text-4xl mb-4">🌟</div>
        <h2 className="text-2xl font-bold mb-2">You're Doing Amazing, {user.name}!</h2>
        <p className="text-blue-100 text-lg mb-4">
          Every conversation makes you stronger and more confident. Keep practicing!
        </p>
        <div className="text-sm opacity-75">
          "The best way to learn social skills is to practice with kindness and patience." 💙
        </div>
      </div>
    </div>
  );
};

export default ProgressDashboard;