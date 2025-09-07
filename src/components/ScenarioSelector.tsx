import React, { useState } from 'react';
import { Search, Filter, Star, Clock, Users, BookOpen } from 'lucide-react';
import { Scenario, UserData } from '../types';

interface ScenarioSelectorProps {
  scenarios: Scenario[];
  user: UserData;
  onScenarioSelect: (scenario: Scenario) => void;
}

const ScenarioSelector: React.FC<ScenarioSelectorProps> = ({ scenarios, user, onScenarioSelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTheme, setSelectedTheme] = useState('all');

  // Filter scenarios based on user preferences and search
  const filteredScenarios = scenarios.filter(scenario => {
    const matchesSearch = scenario.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         scenario.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTheme = selectedTheme === 'all' || scenario.theme === selectedTheme;
    const matchesLevel = scenario.difficulty === user.learningLevel || user.learningLevel === 'advanced';
    const matchesPreferences = user.preferredThemes.includes(scenario.theme);
    
    return matchesSearch && matchesTheme && (matchesLevel || matchesPreferences);
  });

  const themes = [...new Set(scenarios.map(s => s.theme))];
  const difficultyColors = {
    beginner: 'bg-green-100 text-green-700',
    intermediate: 'bg-yellow-100 text-yellow-700',
    advanced: 'bg-red-100 text-red-700'
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Welcome Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Ready to practice, {user.name}? 🌟
            </h1>
            <p className="text-gray-600 text-lg">
              Choose a scenario to practice your social skills!
            </p>
          </div>
          <div className="hidden md:block">
            <div className="text-6xl opacity-50">💬</div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border-2 border-blue-100">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search scenarios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
          </div>

          {/* Theme Filter */}
          <div className="relative">
            <Filter className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="pl-10 pr-8 py-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 min-w-[150px]"
            >
              <option value="all">All Themes</option>
              {themes.map(theme => (
                <option key={theme} value={theme}>
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Scenarios Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredScenarios.map(scenario => (
          <div
            key={scenario.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 border-blue-100 hover:border-blue-300"
            onClick={() => onScenarioSelect(scenario)}
          >
            {/* Scenario Header */}
            <div className="p-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="text-4xl">{scenario.emoji}</div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${difficultyColors[scenario.difficulty]}`}>
                  {scenario.difficulty}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-2">{scenario.title}</h3>
              <p className="text-gray-600 text-sm mb-4">{scenario.description}</p>
              
              <div className="flex items-center justify-between text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <BookOpen className="w-4 h-4" />
                  <span className="capitalize">{scenario.theme}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{scenario.steps.length} steps</span>
                </div>
              </div>
            </div>

            {/* Scenario Footer */}
            <div className="px-6 pb-6">
              <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg transition-all duration-200">
                Start Scenario ✨
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredScenarios.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No scenarios found</h3>
          <p className="text-gray-500">Try adjusting your search or filter options</p>
        </div>
      )}
    </div>
  );
};

export default ScenarioSelector;