import React from 'react';
import { User, Star, Trophy, MessageCircle, BarChart3, Home, Settings } from 'lucide-react';
import { UserData, Progress } from '../types';

interface HeaderProps {
  user: UserData;
  progress: Progress;
  currentView: string;
  onViewChange: (view: 'profile' | 'scenarios' | 'conversation' | 'progress') => void;
}

const Header: React.FC<HeaderProps> = ({ user, progress, currentView, onViewChange }) => {
  const navItems = [
    { id: 'scenarios', label: 'Scenarios', icon: MessageCircle },
    { id: 'progress', label: 'Progress', icon: BarChart3 }
  ];

  return (
    <header className="bg-white shadow-sm border-b-4 border-blue-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <MessageCircle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">Social Helper</h1>
              <p className="text-sm text-gray-600">Learning together, growing together</p>
            </div>
          </div>

          {/* User Info and Stats */}
          <div className="flex items-center space-x-6">
            {/* Progress Stats */}
            <div className="hidden sm:flex items-center space-x-4">
              <div className="flex items-center space-x-1 bg-yellow-100 px-3 py-2 rounded-full">
                <Star className="w-4 h-4 text-yellow-600 fill-current" />
                <span className="text-sm font-semibold text-yellow-700">{progress.stars}</span>
              </div>
              <div className="flex items-center space-x-1 bg-purple-100 px-3 py-2 rounded-full">
                <Trophy className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-700">Level {progress.level}</span>
              </div>
            </div>

            {/* User Avatar */}
            <div className="flex items-center space-x-3">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-gray-800">Hi, {user.name}!</p>
                <p className="text-xs text-gray-600 capitalize">{user.learningLevel} level</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                {user.avatar}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-1 pb-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;