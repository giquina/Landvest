import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// Utility for merging Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format currency
export function formatCurrency(value: number, currency: string = 'GBP'): string {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0
  }).format(value);
}

// Format number with commas
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-GB').format(value);
}

// Format date
export function formatDate(date: Date | string, format: 'short' | 'long' | 'relative' = 'short'): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  
  if (format === 'relative') {
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    if (days < 7) return `${days} days ago`;
    if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
    if (days < 365) return `${Math.floor(days / 30)} months ago`;
    return `${Math.floor(days / 365)} years ago`;
  }
  
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: format === 'long' ? 'long' : 'medium'
  }).format(d);
}

// Calculate distance between two coordinates
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 3959; // Earth's radius in miles
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(deg: number): number {
  return deg * (Math.PI / 180);
}

// Format file size
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Debounce function
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Validate email
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Validate UK postcode
export function isValidUKPostcode(postcode: string): boolean {
  const postcodeRegex = /^[A-Z]{1,2}[0-9]{1,2}[A-Z]?\s?[0-9][A-Z]{2}$/i;
  return postcodeRegex.test(postcode);
}

// Generate unique ID
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

// Birmingham area data
export const BIRMINGHAM_AREAS = [
  { value: 'digbeth', label: 'Digbeth', properties: 47 },
  { value: 'jewellery-quarter', label: 'Jewellery Quarter', properties: 23 },
  { value: 'eastside', label: 'Eastside', properties: 31 },
  { value: 'edgbaston', label: 'Edgbaston', properties: 28 },
  { value: 'selly-oak', label: 'Selly Oak', properties: 19 },
  { value: 'harborne', label: 'Harborne', properties: 15 },
  { value: 'moseley', label: 'Moseley', properties: 12 },
  { value: 'kings-heath', label: 'Kings Heath', properties: 18 }
];

// Planning status options
export const PLANNING_STATUS = [
  { value: 'no-application', label: 'No Application' },
  { value: 'pre-application', label: 'Pre-Application' },
  { value: 'pending', label: 'Application Pending' },
  { value: 'approved', label: 'Planning Approved' },
  { value: 'rejected', label: 'Planning Rejected' }
];

// Property type options
export const PROPERTY_TYPES = [
  { value: 'residential', label: 'Residential Development' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'mixed-use', label: 'Mixed Use' },
  { value: 'industrial', label: 'Industrial' },
  { value: 'agricultural', label: 'Agricultural' },
  { value: 'brownfield', label: 'Brownfield' },
  { value: 'greenfield', label: 'Greenfield' }
];

// Investment grade descriptions
export const INVESTMENT_GRADES = {
  A: { label: 'Excellent', description: 'Exceptional opportunity with minimal risk' },
  B: { label: 'Good', description: 'Strong potential with manageable risks' },
  C: { label: 'Fair', description: 'Moderate opportunity requiring careful consideration' },
  D: { label: 'Poor', description: 'High risk with limited potential' },
  F: { label: 'Avoid', description: 'Not recommended for investment' }
};

// Subscription tiers
export const SUBSCRIPTION_TIERS = {
  free: {
    name: 'Explorer',
    price: 0,
    features: ['3 searches per month', 'Basic property details', '1 planning report/month']
  },
  starter: {
    name: 'Starter',
    price: 49,
    features: ['15 searches per month', 'Advanced filters', '5 planning reports/month', 'Email alerts']
  },
  professional: {
    name: 'Professional',
    price: 199,
    features: ['Unlimited searches', 'Planning Intelligence AI', 'Full analytics', 'API access']
  },
  enterprise: {
    name: 'Enterprise',
    price: 499,
    features: ['Everything in Professional', 'White-label options', 'Dedicated support', 'Custom integrations']
  }
};
