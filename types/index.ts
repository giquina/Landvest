// User & Authentication Types
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'investor' | 'developer' | 'agent' | 'admin';
  subscriptionTier: 'free' | 'starter' | 'professional' | 'enterprise';
  createdAt: Date;
  updatedAt: Date;
  profile: UserProfile;
}

export interface UserProfile {
  id: string;
  userId: string;
  company?: string;
  phone?: string;
  location: string;
  investmentBudget?: number;
  investmentGoals?: string[];
  areasOfInterest?: string[];
  verified: boolean;
  profileImage?: string;
  bio?: string;
}

// Property Types
export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  size: number; // in acres
  sizeUnit: 'acres' | 'hectares' | 'sqft';
  location: PropertyLocation;
  images: string[];
  documents: PropertyDocuments;
  planning: PlanningDetails;
  investment: InvestmentMetrics;
  risks: RiskAssessment;
  status: PropertyStatus;
  createdAt: Date;
  updatedAt: Date;
  viewCount: number;
  savedCount: number;
  offerCount: number;
}

export interface PropertyLocation {
  address: string;
  postcode: string;
  city: string;
  area: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  nearbyAmenities: string[];
  transportLinks: TransportLink[];
}

export interface TransportLink {
  type: 'train' | 'bus' | 'tram' | 'hs2' | 'motorway';
  name: string;
  distance: number; // in miles
  walkingTime?: number; // in minutes
}

export interface PropertyDocuments {
  titleDeeds: boolean;
  planningDocuments: boolean;
  environmentalReport: boolean;
  surveyReport: boolean;
  legalPack: boolean;
  epc?: string;
  floorPlans?: string[];
}

export interface PlanningDetails {
  status: 'no-application' | 'pre-application' | 'pending' | 'approved' | 'rejected';
  applicationNumber?: string;
  submissionDate?: Date;
  decisionDate?: Date;
  planningAuthority: string;
  classification: string;
  restrictions?: string[];
  successProbability: number;
  nearbyApprovals: {
    total: number;
    approved: number;
    rejected: number;
  };
}

export interface InvestmentMetrics {
  roi: number;
  roiTimeframe: string;
  investmentGrade: 'A' | 'B' | 'C' | 'D' | 'F';
  pricePerAcre: number;
  marketGrowth: number;
  comparables: ComparableProperty[];
  developmentPotential: DevelopmentPotential;
}

export interface ComparableProperty {
  id: string;
  address: string;
  price: number;
  size: number;
  soldDate: Date;
  distance: number;
}

export interface DevelopmentPotential {
  type: 'residential' | 'commercial' | 'mixed-use' | 'industrial';
  units?: number;
  estimatedValue: number;
  developmentCost: number;
  timeline: string;
}

export interface RiskAssessment {
  overall: RiskLevel;
  factors: RiskFactor[];
  mitigations: string[];
  lastAssessed: Date;
}

export interface RiskFactor {
  category: string;
  level: RiskLevel;
  score: number;
  details: string;
  mitigation?: string;
}

export type RiskLevel = 'low' | 'medium' | 'high';

export interface PropertyStatus {
  isActive: boolean;
  isFeatured: boolean;
  isUrgent: boolean;
  listingType: 'sale' | 'auction' | 'tender';
  deadline?: Date;
}

// Search & Filter Types
export interface SearchFilters {
  query?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minSize?: number;
  maxSize?: number;
  propertyTypes?: string[];
  planningStatus?: string[];
  investmentGrade?: string[];
  riskLevel?: RiskLevel[];
  sortBy?: 'price' | 'size' | 'date' | 'roi' | 'views';
  sortOrder?: 'asc' | 'desc';
}

// Portfolio Types
export interface Portfolio {
  id: string;
  userId: string;
  properties: PortfolioProperty[];
  totalValue: number;
  totalInvested: number;
  totalReturn: number;
  performance: PortfolioPerformance;
}

export interface PortfolioProperty {
  propertyId: string;
  purchasePrice: number;
  purchaseDate: Date;
  currentValue: number;
  notes?: string;
  documents: string[];
  milestones: Milestone[];
}

export interface Milestone {
  id: string;
  title: string;
  date: Date;
  status: 'pending' | 'completed' | 'overdue';
  type: 'planning' | 'construction' | 'legal' | 'financial';
  description?: string;
}

export interface PortfolioPerformance {
  totalGrowth: number;
  monthlyGrowth: number;
  annualizedReturn: number;
  bestPerformer: string;
  worstPerformer: string;
  averageHoldingPeriod: number;
}

// Community Types
export interface ForumPost {
  id: string;
  title: string;
  content: string;
  author: User;
  category: ForumCategory;
  tags: string[];
  likes: number;
  replies: ForumReply[];
  views: number;
  isPinned: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ForumReply {
  id: string;
  content: string;
  author: User;
  likes: number;
  createdAt: Date;
}

export type ForumCategory = 
  | 'market-analysis'
  | 'planning'
  | 'investment-advice'
  | 'success-stories'
  | 'hs2-updates'
  | 'general';

export interface DealSyndication {
  id: string;
  property: Property;
  organizer: User;
  totalValue: number;
  minInvestment: number;
  targetInvestors: number;
  currentInvestors: number;
  deadline: Date;
  expectedReturn: number;
  description: string;
  documents: string[];
  status: 'open' | 'closed' | 'completed';
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  data?: any;
  read: boolean;
  createdAt: Date;
}

export type NotificationType = 
  | 'price-change'
  | 'new-property'
  | 'planning-update'
  | 'offer-received'
  | 'milestone-due'
  | 'market-alert'
  | 'forum-reply';

// Analytics Types
export interface MarketAnalytics {
  area: string;
  period: string;
  averagePrice: number;
  priceChange: number;
  volumeSold: number;
  averageDaysOnMarket: number;
  supplyDemandRatio: number;
  hotspots: string[];
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

// Birmingham Specific Types
export interface BirminghamArea {
  name: string;
  code: string;
  properties: number;
  averagePrice: number;
  growth: number;
  hs2Impact: 'high' | 'medium' | 'low';
  keyFeatures: string[];
  planningSucessRate: number;
  transport: TransportLink[];
}

export interface HS2Impact {
  stationName: string;
  distance: number;
  estimatedCompletion: Date;
  projectedImpact: number; // percentage increase
  currentDevelopments: number;
}
