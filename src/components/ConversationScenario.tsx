import React, { useState, useEffect } from 'react';
import { ArrowLeft, Volume2, Lightbulb, Star, RotateCcw, CheckCircle } from 'lucide-react';
import { Scenario, UserData, Message } from '../types';

interface ConversationScenarioProps {
  scenario: Scenario;
  user: UserData;
  onComplete: (stars: number) => void;
  onBack: () => void;
}

const ConversationScenario: React.FC<ConversationScenarioProps> = ({ 
  scenario, 
  user, 
  onComplete, 
  onBack 
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showHint, setShowHint] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [earnedStars, setEarnedStars] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [feedback, setFeedback] = useState<string>('');

  const currentStep = scenario.steps[currentStepIndex];
  const isLastStep = currentStepIndex === scenario.steps.length - 1;

  // Initialize with scenario setup
  useEffect(() => {
    setMessages([
      {
        id: '0',
        type: 'bot',
        content: `Hi ${user.name}! ${scenario.situation}`,
        timestamp: new Date()
      }
    ]);
  }, [scenario, user.name]);

  const speak = (text: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.8;
      utterance.pitch = 1.1;
      speechSynthesis.speak(utterance);
    }
  };

  const addMessage = (content: string, type: 'bot' | 'user', emotion?: string) => {
    const message: Message = {
      id: Date.now().toString(),
      type,
      content,
      emotion,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, message]);
  };

  const handleChoiceSelect = (choiceId: string) => {
    const choice = currentStep.choices?.find(c => c.id === choiceId);
    if (!choice) return;

    // Add user message
    addMessage(choice.text, 'user');

    // Add feedback
    setTimeout(() => {
      addMessage(choice.feedback, 'bot', choice.isCorrect ? 'happy' : 'gentle');
      setFeedback(choice.feedback);
      
      if (choice.isCorrect) {
        setEarnedStars(prev => prev + choice.stars);
      }

      // Move to next step or complete
      setTimeout(() => {
        if (isLastStep) {
          setIsComplete(true);
        } else {
          nextStep();
        }
      }, 2000);
    }, 1000);
  };

  const handleTextInput = () => {
    if (!userInput.trim()) return;

    addMessage(userInput, 'user');
    
    // Simple response evaluation (in real app, this would use ML/NLP)
    const isGoodResponse = userInput.length > 10 && 
                          (userInput.includes('please') || 
                           userInput.includes('thank you') || 
                           userInput.includes('sorry') ||
                           userInput.toLowerCase().includes('feel'));

    const stars = isGoodResponse ? 3 : 1;
    const feedbackText = isGoodResponse 
      ? "Great response! You used polite words and showed understanding. Well done! ⭐" 
      : "Good try! Next time, try to be more polite or show how you understand the other person's feelings. 💙";

    setTimeout(() => {
      addMessage(feedbackText, 'bot', isGoodResponse ? 'happy' : 'encouraging');
      setFeedback(feedbackText);
      setEarnedStars(prev => prev + stars);
      
      setTimeout(() => {
        if (isLastStep) {
          setIsComplete(true);
        } else {
          nextStep();
        }
      }, 2000);
    }, 1000);

    setUserInput('');
  };

  const nextStep = () => {
    if (currentStepIndex < scenario.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setShowHint(false);
      
      // Add next step prompt
      setTimeout(() => {
        const nextStepContent = scenario.steps[currentStepIndex + 1];
        addMessage(nextStepContent.content, 'bot', nextStepContent.emotion);
      }, 500);
    }
  };

  const handleComplete = () => {
    onComplete(earnedStars);
  };

  const handleRestart = () => {
    setCurrentStepIndex(0);
    setMessages([]);
    setShowHint(false);
    setUserInput('');
    setEarnedStars(0);
    setIsComplete(false);
    setFeedback('');
    
    setTimeout(() => {
      setMessages([
        {
          id: '0',
          type: 'bot',
          content: `Hi ${user.name}! ${scenario.situation}`,
          timestamp: new Date()
        }
      ]);
    }, 100);
  };

  if (isComplete) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center border-4 border-green-200">
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Congratulations, {user.name}!</h2>
          <p className="text-lg text-gray-600 mb-6">
            You completed the "{scenario.title}" scenario!
          </p>
          
          <div className="flex justify-center items-center space-x-2 mb-6">
            <div className="text-2xl">⭐</div>
            <span className="text-2xl font-bold text-yellow-600">{earnedStars}</span>
            <span className="text-lg text-gray-600">stars earned!</span>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={handleRestart}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 border-2 border-blue-300 text-blue-700 font-semibold rounded-xl hover:bg-blue-50 transition-all"
            >
              <RotateCcw className="w-5 h-5" />
              <span>Try Again</span>
            </button>
            <button
              onClick={handleComplete}
              className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Continue</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-6 border-2 border-blue-100">
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Scenarios</span>
          </button>
          
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800">{scenario.title}</h1>
            <p className="text-gray-600">Step {currentStepIndex + 1} of {scenario.steps.length}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            <span className="font-bold text-yellow-600">{earnedStars}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStepIndex + 1) / scenario.steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Chat Interface */}
      <div className="bg-white rounded-2xl shadow-lg border-2 border-blue-100 overflow-hidden">
        {/* Messages */}
        <div className="h-96 overflow-y-auto p-6 space-y-4">
          {messages.map(message => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.type === 'user'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                {message.emotion && (
                  <div className="text-2xl mb-1">
                    {message.emotion === 'happy' && '😊'}
                    {message.emotion === 'sad' && '😢'}
                    {message.emotion === 'confused' && '😕'}
                    {message.emotion === 'excited' && '🎉'}
                    {message.emotion === 'gentle' && '💙'}
                    {message.emotion === 'encouraging' && '👍'}
                  </div>
                )}
                <p className="text-sm">{message.content}</p>
                <button
                  onClick={() => speak(message.content)}
                  className="mt-2 text-xs opacity-50 hover:opacity-100 flex items-center space-x-1"
                >
                  <Volume2 className="w-3 h-3" />
                  <span>Listen</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Current Step Interface */}
        {currentStep && !isComplete && (
          <div className="border-t border-gray-200 p-6">
            {/* Current Step Content */}
            <div className="mb-4">
              <div className="flex items-center space-x-2 mb-2">
                <div className="text-2xl">{scenario.emoji}</div>
                <p className="font-medium text-gray-800">{currentStep.content}</p>
              </div>
              
              {currentStep.hint && (
                <button
                  onClick={() => setShowHint(!showHint)}
                  className="flex items-center space-x-1 text-sm text-blue-600 hover:text-blue-800"
                >
                  <Lightbulb className="w-4 h-4" />
                  <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
                </button>
              )}
              
              {showHint && currentStep.hint && (
                <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <p className="text-sm text-yellow-800">💡 {currentStep.hint}</p>
                </div>
              )}
            </div>

            {/* Choice-based Step */}
            {currentStep.type === 'choice' && currentStep.choices && (
              <div className="space-y-2">
                {currentStep.choices.map(choice => (
                  <button
                    key={choice.id}
                    onClick={() => handleChoiceSelect(choice.id)}
                    className="w-full p-3 text-left border-2 border-blue-200 rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-all"
                  >
                    {choice.text}
                  </button>
                ))}
              </div>
            )}

            {/* Input-based Step */}
            {currentStep.type === 'input' && (
              <div className="space-y-3">
                <textarea
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Type your response here..."
                  className="w-full p-3 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 resize-none"
                  rows={3}
                />
                <button
                  onClick={handleTextInput}
                  disabled={!userInput.trim()}
                  className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all"
                >
                  Send Response
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationScenario;