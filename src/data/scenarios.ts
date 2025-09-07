import { Scenario } from '../types';

export const scenarios: Scenario[] = [
  {
    id: 'meeting-new-friend',
    title: 'Meeting a New Friend',
    description: 'Practice introducing yourself and starting a conversation with someone new.',
    theme: 'friends',
    difficulty: 'beginner',
    emoji: '👋',
    situation: 'You see someone new at school who looks friendly. You want to introduce yourself and maybe become friends.',
    steps: [
      {
        id: 'intro',
        type: 'prompt',
        content: 'The new student is sitting alone at lunch. What should you do first?',
        emotion: 'encouraging'
      },
      {
        id: 'approach',
        type: 'choice',
        content: 'How would you like to introduce yourself?',
        choices: [
          {
            id: 'polite',
            text: 'Hi! I\'m [name]. I noticed you\'re new here. Would you like to sit with me?',
            isCorrect: true,
            feedback: 'Perfect! You were polite, introduced yourself, and offered help. That\'s a great way to make friends! 🌟',
            stars: 3
          },
          {
            id: 'shy',
            text: 'Um... hi...',
            isCorrect: false,
            feedback: 'That\'s a good start! Next time, try introducing yourself by name and asking a friendly question. 😊',
            stars: 1
          },
          {
            id: 'too-forward',
            text: 'Hey! Want to be best friends forever?',
            isCorrect: false,
            feedback: 'You\'re enthusiastic, which is nice! But friendships grow slowly. Try starting with a simple introduction first. 💙',
            stars: 1
          }
        ]
      },
      {
        id: 'conversation',
        type: 'input',
        content: 'Great! The new student smiles and says "Thank you! I\'d love to sit with you." What would you talk about to keep the conversation going?',
        emotion: 'happy',
        hint: 'Try asking about their interests, where they came from, or sharing something about yourself!'
      },
      {
        id: 'closing',
        type: 'choice',
        content: 'Lunch is almost over. How should you end this nice conversation?',
        choices: [
          {
            id: 'friend-offer',
            text: 'This was really fun! Would you like to hang out again tomorrow?',
            isCorrect: true,
            feedback: 'Excellent! You showed you enjoyed the conversation and offered to continue the friendship. Well done! 🎉',
            stars: 3
          },
          {
            id: 'goodbye',
            text: 'Okay, bye!',
            isCorrect: false,
            feedback: 'A simple goodbye works, but showing you enjoyed talking and suggesting to meet again makes stronger friendships! 😊',
            stars: 1
          }
        ]
      }
    ]
  },
  {
    id: 'classroom-conflict',
    title: 'Handling Classroom Disagreement',
    description: 'Learn how to resolve conflicts peacefully when working with classmates.',
    theme: 'school',
    difficulty: 'intermediate',
    emoji: '🏫',
    situation: 'You and your project partner disagree about which topic to choose for your presentation.',
    steps: [
      {
        id: 'problem',
        type: 'prompt',
        content: 'Your partner wants to do the project about dinosaurs, but you want to do it about space. You both feel strongly about your choice.',
        emotion: 'confused'
      },
      {
        id: 'response',
        type: 'choice',
        content: 'What\'s the best way to handle this disagreement?',
        choices: [
          {
            id: 'compromise',
            text: 'I understand you really like dinosaurs. Could we find a way to combine both topics, like space dinosaurs or dinosaurs from other planets?',
            isCorrect: true,
            feedback: 'Amazing! You listened to your partner, showed understanding, and suggested a creative compromise. That\'s excellent problem-solving! ⭐',
            stars: 3
          },
          {
            id: 'insist',
            text: 'No, we have to do space. It\'s way better than dinosaurs.',
            isCorrect: false,
            feedback: 'It\'s good to have preferences, but working together means considering your partner\'s ideas too. Try finding a middle ground! 💙',
            stars: 1
          },
          {
            id: 'give-up',
            text: 'Fine, we\'ll do dinosaurs then...',
            isCorrect: false,
            feedback: 'It\'s kind to let your partner choose, but good partnerships involve both people being happy. Try discussing it more! 😊',
            stars: 1
          }
        ]
      },
      {
        id: 'discussion',
        type: 'input',
        content: 'Your partner loves your space dinosaurs idea! Now you need to decide who does what part. What would you say to organize the work fairly?',
        emotion: 'excited',
        hint: 'Think about dividing tasks based on what each person enjoys or is good at!'
      },
      {
        id: 'teamwork',
        type: 'choice',
        content: 'While working together, your partner makes a mistake on their part. How do you respond?',
        choices: [
          {
            id: 'helpful',
            text: 'No worries! Mistakes happen. Let me help you fix it, or we can figure it out together.',
            isCorrect: true,
            feedback: 'Perfect! You were understanding, supportive, and offered to help. That\'s what great teammates do! 🌟',
            stars: 3
          },
          {
            id: 'critical',
            text: 'Ugh, you messed it up! Now we have to start over!',
            isCorrect: false,
            feedback: 'Everyone makes mistakes. Being patient and helpful makes your partnership stronger. Try being more understanding! 💙',
            stars: 1
          }
        ]
      }
    ]
  },
  {
    id: 'sharing-feelings',
    title: 'Sharing Your Feelings',
    description: 'Practice expressing emotions in healthy ways when something makes you upset.',
    theme: 'emotions',
    difficulty: 'beginner',
    emoji: '😊',
    situation: 'A friend borrowed your favorite book and returned it with some pages torn. You feel upset.',
    steps: [
      {
        id: 'emotion-recognition',
        type: 'choice',
        content: 'How are you feeling right now about your torn book?',
        choices: [
          {
            id: 'sad-angry',
            text: 'I feel sad and a little angry because this book is special to me.',
            isCorrect: true,
            feedback: 'Great job identifying your feelings! It\'s normal to feel sad and angry when something important to you gets damaged. 💙',
            stars: 3
          },
          {
            id: 'fine',
            text: 'I\'m fine, it doesn\'t matter.',
            isCorrect: false,
            feedback: 'Your feelings matter! It\'s okay to feel upset when something special gets damaged. Try recognizing your true feelings. 😊',
            stars: 1
          },
          {
            id: 'very-angry',
            text: 'I\'m so mad I want to yell at them!',
            isCorrect: false,
            feedback: 'Anger is a normal feeling, but let\'s think about calm ways to express it. What other feelings might you have too? 💙',
            stars: 1
          }
        ]
      },
      {
        id: 'approach-friend',
        type: 'choice',
        content: 'You want to talk to your friend about what happened. When and where should you do this?',
        choices: [
          {
            id: 'private-calm',
            text: 'I\'ll wait until I feel calmer, then talk to them privately when we\'re not with other people.',
            isCorrect: true,
            feedback: 'Excellent thinking! Waiting until you\'re calm and talking privately helps conversations go much better! 🌟',
            stars: 3
          },
          {
            id: 'immediately',
            text: 'I\'ll talk to them right now while I\'m upset so they know how I feel.',
            isCorrect: false,
            feedback: 'It\'s good that you want to share your feelings, but waiting until you\'re calmer usually works better! 💙',
            stars: 1
          }
        ]
      },
      {
        id: 'conversation',
        type: 'input',
        content: 'You\'re feeling calmer now and you\'re alone with your friend. What would you say to explain how you feel?',
        emotion: 'gentle',
        hint: 'Try using "I feel..." statements and explain why the book is important to you!'
      },
      {
        id: 'friend-response',
        type: 'choice',
        content: 'Your friend says "I\'m so sorry! I didn\'t mean to tear it. I feel terrible." How do you respond?',
        choices: [
          {
            id: 'forgive',
            text: 'Thank you for apologizing. I can see you feel bad too. Accidents happen, and our friendship is more important than the book.',
            isCorrect: true,
            feedback: 'Beautiful! You accepted their apology, showed empathy, and focused on what\'s most important. That\'s true friendship! 🎉',
            stars: 3
          },
          {
            id: 'still-upset',
            text: 'Well, you should feel bad! That was my favorite book!',
            isCorrect: false,
            feedback: 'Your feelings are valid, but when someone sincerely apologizes, showing forgiveness helps friendships grow stronger. 😊',
            stars: 1
          }
        ]
      }
    ]
  },
  {
    id: 'playground-inclusion',
    title: 'Including Everyone',
    description: 'Learn how to include others who might feel left out during playground time.',
    theme: 'playground',
    difficulty: 'intermediate',
    emoji: '🛝',
    situation: 'You and your friends are playing a fun game, but you notice someone sitting alone watching and looking sad.',
    steps: [
      {
        id: 'notice',
        type: 'choice',
        content: 'You see the person sitting alone. What\'s the first thing you should do?',
        choices: [
          {
            id: 'observe',
            text: 'I\'ll pay attention to how they\'re feeling and think about whether they might want to join us.',
            isCorrect: true,
            feedback: 'Great awareness! Noticing how others feel and thinking about their needs shows real kindness! 🌟',
            stars: 3
          },
          {
            id: 'ignore',
            text: 'I\'ll keep playing. They probably want to be alone.',
            isCorrect: false,
            feedback: 'Sometimes people who look alone actually want to join in but don\'t know how. It\'s kind to check! 💙',
            stars: 1
          },
          {
            id: 'assume',
            text: 'I\'ll tell them to come play with us right away.',
            isCorrect: false,
            feedback: 'It\'s nice that you want to include them! But first, try to understand if they want to join. Some people need a gentler approach. 😊',
            stars: 1
          }
        ]
      },
      {
        id: 'approach',
        type: 'input',
        content: 'You decide to go talk to them. They look a bit nervous. What would you say to make them feel comfortable?',
        emotion: 'gentle',
        hint: 'Try introducing yourself if you don\'t know them, and ask how they\'re feeling or if they\'d like to play!'
      },
      {
        id: 'invitation',
        type: 'choice',
        content: 'They seem interested but say "I don\'t know how to play your game." What\'s your response?',
        choices: [
          {
            id: 'teach',
            text: 'No problem! It\'s easy to learn. I\'ll teach you, and we can all help you get started.',
            isCorrect: true,
            feedback: 'Perfect! You made them feel welcome and offered to help them learn. That\'s true leadership and kindness! ⭐',
            stars: 3
          },
          {
            id: 'simple-game',
            text: 'Oh, then maybe you should just watch us play.',
            isCorrect: false,
            feedback: 'You could help them feel more included by teaching them or finding a game everyone can enjoy together! 💙',
            stars: 1
          }
        ]
      },
      {
        id: 'group-reaction',
        type: 'choice',
        content: 'One of your friends complains, "Why do we have to change our game for someone new?" How do you handle this?',
        choices: [
          {
            id: 'explain-kindness',
            text: 'Because including everyone makes our games more fun! Plus, how would you feel if you were sitting alone?',
            isCorrect: true,
            feedback: 'Excellent! You stood up for kindness and helped your friend understand by asking them to imagine how it feels. Great leadership! 🌟',
            stars: 3
          },
          {
            id: 'give-in',
            text: 'You\'re right, let\'s just keep playing our original game.',
            isCorrect: false,
            feedback: 'Standing up for what\'s right, even with friends, shows real character. Try helping everyone understand why inclusion matters! 😊',
            stars: 1
          }
        ]
      }
    ]
  },
  {
    id: 'asking-for-help',
    title: 'Asking for Help',
    description: 'Practice asking for help when you don\'t understand something in class.',
    theme: 'school',
    difficulty: 'beginner',
    emoji: '🙋',
    situation: 'You\'re in math class and everyone seems to understand the lesson, but you\'re confused and don\'t know what to do.',
    steps: [
      {
        id: 'recognize-need',
        type: 'choice',
        content: 'You realize you don\'t understand the math problem. What should you do?',
        choices: [
          {
            id: 'ask-help',
            text: 'I should ask for help because it\'s okay not to understand everything.',
            isCorrect: true,
            feedback: 'Exactly right! Asking for help is brave and smart. Everyone learns at different speeds! 🌟',
            stars: 3
          },
          {
            id: 'pretend',
            text: 'I\'ll pretend I understand so I don\'t look silly.',
            isCorrect: false,
            feedback: 'It\'s natural to worry about looking silly, but asking questions actually shows you\'re a good learner! 💙',
            stars: 1
          },
          {
            id: 'give-up',
            text: 'I\'ll just give up. Math is too hard for me.',
            isCorrect: false,
            feedback: 'Don\'t give up! Everyone can learn with the right help and practice. You\'re braver than you think! 😊',
            stars: 1
          }
        ]
      },
      {
        id: 'timing',
        type: 'choice',
        content: 'When is the best time to ask for help?',
        choices: [
          {
            id: 'appropriate-time',
            text: 'I\'ll raise my hand and wait for the teacher to call on me, or ask after the lesson.',
            isCorrect: true,
            feedback: 'Perfect! You\'re being respectful of the class and the teacher while still getting the help you need! ⭐',
            stars: 3
          },
          {
            id: 'interrupt',
            text: 'I\'ll shout out my question right now so I don\'t forget.',
            isCorrect: false,
            feedback: 'It\'s good that you want to ask! But waiting your turn or raising your hand shows respect for others. 💙',
            stars: 1
          }
        ]
      },
      {
        id: 'ask-question',
        type: 'input',
        content: 'The teacher calls on you. What would you say to ask for help clearly?',
        emotion: 'encouraging',
        hint: 'Be specific about what you don\'t understand, like "I don\'t understand step 2" instead of just "I\'m confused."'
      },
      {
        id: 'follow-up',
        type: 'choice',
        content: 'The teacher explains, but you\'re still a bit confused about one part. What do you do?',
        choices: [
          {
            id: 'polite-follow-up',
            text: 'Thank you for explaining! I understand most of it now, but could you help me with just one more part?',
            isCorrect: true,
            feedback: 'Excellent! You thanked them, showed what you did understand, and politely asked for more help. Perfect! 🎉',
            stars: 3
          },
          {
            id: 'stay-quiet',
            text: 'I\'ll just say "thank you" and figure it out later.',
            isCorrect: false,
            feedback: 'It\'s kind to say thank you, but teachers want to help you fully understand! It\'s okay to ask follow-up questions. 😊',
            stars: 1
          }
        ]
      }
    ]
  },
  {
    id: 'family-chores',
    title: 'Helping at Home',
    description: 'Learn how to communicate with family about responsibilities and help around the house.',
    theme: 'family',
    difficulty: 'beginner',
    emoji: '🏠',
    situation: 'Your parent asks you to clean your room, but you really want to finish watching your favorite show first.',
    steps: [
      {
        id: 'request',
        type: 'choice',
        content: 'Your parent says "Please clean your room now." How should you respond?',
        choices: [
          {
            id: 'negotiate-politely',
            text: 'Could I please finish this episode first? It has 10 minutes left, then I\'ll clean my room right away.',
            isCorrect: true,
            feedback: 'Great! You asked politely, gave a specific time frame, and promised to do the task. That shows respect and responsibility! 🌟',
            stars: 3
          },
          {
            id: 'refuse',
            text: 'I don\'t want to! I\'m watching TV!',
            isCorrect: false,
            feedback: 'It\'s normal to want to finish your show, but speaking respectfully to family members is important. Try asking nicely! 💙',
            stars: 1
          },
          {
            id: 'whine',
            text: 'Aww, do I have to? This is my favorite show!',
            isCorrect: false,
            feedback: 'Your feelings are understandable! But try expressing them more maturely and offering a compromise. 😊',
            stars: 1
          }
        ]
      },
      {
        id: 'parent-response',
        type: 'choice',
        content: 'Your parent says "Okay, 10 minutes, but then straight to room cleaning!" What\'s the best response?',
        choices: [
          {
            id: 'grateful',
            text: 'Thank you! I really appreciate it. I promise I\'ll start cleaning right when this ends.',
            isCorrect: true,
            feedback: 'Perfect! You showed gratitude and confirmed your commitment. That builds trust with your family! ⭐',
            stars: 3
          },
          {
            id: 'push-luck',
            text: 'Great! Can I watch one more episode after this one?',
            isCorrect: false,
            feedback: 'Your parent already made a compromise. Pushing for more might make them less willing to compromise next time! 💙',
            stars: 1
          }
        ]
      },
      {
        id: 'follow-through',
        type: 'input',
        content: '10 minutes later, your show ends. What do you do to show you keep your promises?',
        emotion: 'encouraging',
        hint: 'Think about actions that show you remember your promise and are responsible!'
      },
      {
        id: 'help-more',
        type: 'choice',
        content: 'While cleaning your room, you notice your parent looks tired from doing housework. What could you do?',
        choices: [
          {
            id: 'offer-help',
            text: 'After I finish my room, would you like help with anything else? You look like you\'ve been working hard.',
            isCorrect: true,
            feedback: 'Wonderful! You noticed someone else\'s needs and offered to help. That\'s true caring and teamwork! 🎉',
            stars: 3
          },
          {
            id: 'just-room',
            text: 'I\'ll just clean my room like they asked and then relax.',
            isCorrect: false,
            feedback: 'Following through on your commitment is good! Offering extra help shows even more care for your family. 😊',
            stars: 1
          }
        ]
      }
    ]
  }
];