import React, { useState, useEffect } from 'react';
import { User, Star, Trophy, Heart, MessageCircle, Settings, Home, Book, Users } from 'lucide-react';
import UserProfile from './components/UserProfile';
import ConversationScenario from './components/ConversationScenario';
import ProgressDashboard from './components/ProgressDashboard';
import ScenarioSelector from './components/ScenarioSelector';
import Header from './components/Header';
import { UserData, Scenario, Progress } from './types';
import { scenarios } from './data/scenarios';

function App() {
  const [currentView, setCurrentView] = useState<'profile' | 'scenarios' | 'conversation' | 'progress'>('profile');
  const [user, setUser] = useState<UserData | null>(null);
  const [currentScenario, setCurrentScenario] = useState<Scenario | null>(null);
  const [progress, setProgress] = useState<Progress>({
    totalScenarios: 0,
    completedScenarios: 0,
    stars: 0,
    badges: [],
    level: 1,
    streakDays: 0
  });

  // Load user data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('asd-tool-user');
    const savedProgress = localStorage.getItem('asd-tool-progress');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  // Save user data to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('asd-tool-user', JSON.stringify(user));
    }
  }, [user]);

  useEffect(() => {
    localStorage.setItem('asd-tool-progress', JSON.stringify(progress));
  }, [progress]);

  const handleUserSetup = (userData: UserData) => {
    setUser(userData);
    setCurrentView('scenarios');
  };

  const handleScenarioSelect = (scenario: Scenario) => {
    setCurrentScenario(scenario);
    setCurrentView('conversation');
  };

  const handleScenarioComplete = (stars: number) => {
    setProgress(prev => {
      const newProgress = {
        ...prev,
        totalScenarios: prev.totalScenarios + 1,
        completedScenarios: prev.completedScenarios + 1,
        stars: prev.stars + stars
      };

      // Level progression
      const newLevel = Math.floor(newProgress.stars / 10) + 1;
      if (newLevel > prev.level) {
        newProgress.level = newLevel;
        // Add level badge
        if (!newProgress.badges.includes(`Level ${newLevel}`)) {
          newProgress.badges = [...newProgress.badges, `Level ${newLevel}`];
        }
      }

      // Milestone badges
      if (newProgress.completedScenarios === 5 && !newProgress.badges.includes('First Steps')) {
        newProgress.badges = [...newProgress.badges, 'First Steps'];
      }
      if (newProgress.completedScenarios === 20 && !newProgress.badges.includes('Social Star')) {
        newProgress.badges = [...newProgress.badges, 'Social Star'];
      }
      if (newProgress.stars >= 50 && !newProgress.badges.includes('Star Collector')) {
        newProgress.badges = [...newProgress.badges, 'Star Collector'];
      }

      return newProgress;
    });

    setCurrentView('scenarios');
    setCurrentScenario(null);
  };

  const handleBackToScenarios = () => {
    setCurrentView('scenarios');
    setCurrentScenario(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <UserProfile onComplete={handleUserSetup} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Header 
        user={user} 
        progress={progress}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      <main className="container mx-auto px-4 py-6">
        {currentView === 'scenarios' && (
          <ScenarioSelector 
            scenarios={scenarios}
            user={user}
            onScenarioSelect={handleScenarioSelect}
          />
        )}

        {currentView === 'conversation' && currentScenario && (
          <ConversationScenario 
            scenario={currentScenario}
            user={user}
            onComplete={handleScenarioComplete}
            onBack={handleBackToScenarios}
          />
        )}

        {currentView === 'progress' && (
          <ProgressDashboard 
            progress={progress}
            user={user}
          />
        )}
      </main>
    </div>
  );
}

export default App;