// Simple authentication and caching utilities
export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: string;
  profession: string;
  location: string;
  bio?: string;
  createdAt: string;
  lastLogin?: string;
  // EQ and progress data
  eqScore: number;
  streakDays: number;
  totalEmotionsLogged: number;
  totalExercisesCompleted: number;
  totalAssessmentsCompleted: number;
  // Emotional patterns
  emotionalPatterns: {
    happy: number;
    calm: number;
    focused: number;
    anxious: number;
    sad: number;
  };
  // Goals and achievements
  currentGoals: Array<{
    id: string;
    title: string;
    description: string;
    target: number;
    current: number;
    category: string;
    createdAt: string;
  }>;
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    earnedAt: string;
    icon: string;
  }>;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

// Cache keys
const CACHE_KEYS = {
  USERS: 'eq_users',
  CURRENT_USER: 'eq_current_user',
  AUTH_STATE: 'eq_auth_state'
};

// Generate a simple ID
const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Get all users from cache
export const getUsers = (): User[] => {
  if (typeof window === 'undefined') return [];
  try {
    const users = localStorage.getItem(CACHE_KEYS.USERS);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error('Error getting users from cache:', error);
    return [];
  }
};

// Save users to cache
export const saveUsers = (users: User[]): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CACHE_KEYS.USERS, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users to cache:', error);
  }
};

// Register a new user
export const registerUser = (userData: Omit<User, 'id' | 'createdAt' | 'lastLogin' | 'eqScore' | 'streakDays' | 'totalEmotionsLogged' | 'totalExercisesCompleted' | 'totalAssessmentsCompleted' | 'emotionalPatterns' | 'currentGoals' | 'achievements'>): User => {
  const users = getUsers();
  
  // Check if user already exists
  const existingUser = users.find(user => user.email === userData.email);
  if (existingUser) {
    throw new Error('User with this email already exists');
  }

  const newUser: User = {
    ...userData,
    id: generateId(),
    createdAt: new Date().toISOString(),
    // Initialize with default values
    eqScore: 65,
    streakDays: 0,
    totalEmotionsLogged: 0,
    totalExercisesCompleted: 0,
    totalAssessmentsCompleted: 0,
    emotionalPatterns: {
      happy: 0,
      calm: 0,
      focused: 0,
      anxious: 0,
      sad: 0,
    },
    currentGoals: [
      {
        id: generateId(),
        title: "Daily Emotional Check-in",
        description: "Log your emotions every day for a week",
        target: 7,
        current: 0,
        category: "Mindfulness",
        createdAt: new Date().toISOString(),
      },
      {
        id: generateId(),
        title: "Complete EQ Assessment",
        description: "Take your first emotional intelligence assessment",
        target: 1,
        current: 0,
        category: "Assessment",
        createdAt: new Date().toISOString(),
      },
    ],
    achievements: [],
  };

  users.push(newUser);
  saveUsers(users);
  
  return newUser;
};

// Login user
export const loginUser = (email: string, password: string): User => {
  const users = getUsers();
  const user = users.find(u => u.email === email);
  
  if (!user) {
    throw new Error('User not found');
  }

  // In a real app, you would verify the password hash
  // For demo purposes, we'll just check if password exists
  if (!password) {
    throw new Error('Invalid password');
  }

  // Update last login
  user.lastLogin = new Date().toISOString();
  saveUsers(users);

  return user;
};

// Set current user in cache
export const setCurrentUser = (user: User): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CACHE_KEYS.CURRENT_USER, JSON.stringify(user));
    localStorage.setItem(CACHE_KEYS.AUTH_STATE, JSON.stringify({
      isAuthenticated: true,
      user
    }));
  } catch (error) {
    console.error('Error setting current user:', error);
  }
};

// Get current user from cache
export const getCurrentUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  try {
    const user = localStorage.getItem(CACHE_KEYS.CURRENT_USER);
    if (!user) return null;

    const parsedUser = JSON.parse(user);
    
    // Migrate old user data to new format if needed
    if (!parsedUser.emotionalPatterns || !parsedUser.currentGoals || parsedUser.eqScore === undefined) {
      const migratedUser = {
        ...parsedUser,
        eqScore: parsedUser.eqScore || 65,
        streakDays: parsedUser.streakDays || 0,
        totalEmotionsLogged: parsedUser.totalEmotionsLogged || 0,
        totalExercisesCompleted: parsedUser.totalExercisesCompleted || 0,
        totalAssessmentsCompleted: parsedUser.totalAssessmentsCompleted || 0,
        emotionalPatterns: parsedUser.emotionalPatterns || {
          happy: 0,
          calm: 0,
          focused: 0,
          anxious: 0,
          sad: 0,
        },
        currentGoals: parsedUser.currentGoals || [
          {
            id: generateId(),
            title: "Daily Emotional Check-in",
            description: "Log your emotions every day for a week",
            target: 7,
            current: 0,
            category: "Mindfulness",
            createdAt: new Date().toISOString(),
          },
          {
            id: generateId(),
            title: "Complete EQ Assessment",
            description: "Take your first emotional intelligence assessment",
            target: 1,
            current: 0,
            category: "Assessment",
            createdAt: new Date().toISOString(),
          },
        ],
        achievements: parsedUser.achievements || [],
      };

      // Update the user in storage
      localStorage.setItem(CACHE_KEYS.CURRENT_USER, JSON.stringify(migratedUser));
      return migratedUser;
    }

    return parsedUser;
  } catch (error) {
    console.error('Error getting current user:', error);
    return null;
  }
};

// Get auth state
export const getAuthState = (): AuthState => {
  if (typeof window === 'undefined') return { isAuthenticated: false, user: null };
  try {
    const authState = localStorage.getItem(CACHE_KEYS.AUTH_STATE);
    return authState ? JSON.parse(authState) : { isAuthenticated: false, user: null };
  } catch (error) {
    console.error('Error getting auth state:', error);
    return { isAuthenticated: false, user: null };
  }
};

// Logout user
export const logoutUser = (): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(CACHE_KEYS.CURRENT_USER);
    localStorage.setItem(CACHE_KEYS.AUTH_STATE, JSON.stringify({
      isAuthenticated: false,
      user: null
    }));
  } catch (error) {
    console.error('Error logging out user:', error);
  }
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  const authState = getAuthState();
  return authState.isAuthenticated && authState.user !== null;
};

// Update user data
export const updateUserData = (userId: string, updates: Partial<User>): User | null => {
  const users = getUsers();
  const userIndex = users.findIndex(user => user.id === userId);
  
  if (userIndex === -1) {
    return null;
  }

  users[userIndex] = { ...users[userIndex], ...updates };
  saveUsers(users);

  // Update current user if it's the same user
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    setCurrentUser(users[userIndex]);
  }

  return users[userIndex];
};

// Add emotion log
export const logEmotion = (emotion: 'happy' | 'calm' | 'focused' | 'anxious' | 'sad'): User | null => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  const currentPatterns = currentUser.emotionalPatterns || {
    happy: 0,
    calm: 0,
    focused: 0,
    anxious: 0,
    sad: 0,
  };

  const updatedUser = updateUserData(currentUser.id, {
    totalEmotionsLogged: (currentUser.totalEmotionsLogged || 0) + 1,
    emotionalPatterns: {
      ...currentPatterns,
      [emotion]: (currentPatterns[emotion] || 0) + 1,
    },
  });

  return updatedUser;
};

// Complete exercise
export const completeExercise = (): User | null => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  return updateUserData(currentUser.id, {
    totalExercisesCompleted: (currentUser.totalExercisesCompleted || 0) + 1,
  });
};

// Complete assessment
export const completeAssessment = (newEQScore: number): User | null => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  return updateUserData(currentUser.id, {
    totalAssessmentsCompleted: (currentUser.totalAssessmentsCompleted || 0) + 1,
    eqScore: newEQScore,
  });
};

// Update streak
export const updateStreak = (days: number): User | null => {
  const currentUser = getCurrentUser();
  if (!currentUser) return null;

  return updateUserData(currentUser.id, {
    streakDays: days,
  });
};
