// User Types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'admin' | 'mentor';
  points: number;
  rank: number;
  avatar?: string;
  createdAt: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// Task Types
export interface Task {
  id: string;
  title: string;
  description: string;
  category: string;
  points: number;
  status: 'pending' | 'in-progress' | 'completed' | 'approved';
  createdBy: string;
  assignedTo?: string;
  dueDate?: string;
  createdAt: string;
  attachments?: string[];
}

export interface TaskSubmission {
  taskId: string;
  userId: string;
  submission: string;
  attachments?: File[];
}

// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  points: number;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  createdBy: string;
  createdAt: string;
}

export interface EventApplication {
  eventId: string;
  userId: string;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
}

// Badge Types
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  pointsRequired: number;
}

export interface UserBadge {
  badgeId: string;
  userId: string;
  earnedAt: string;
  badge: Badge;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: string;
  link?: string;
}

// Leaderboard Types
export interface LeaderboardEntry {
  userId: string;
  user: User;
  points: number;
  rank: number;
  badgesCount: number;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}



