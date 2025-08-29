import { Property, SearchFilters, PaginatedResponse } from '@/types';

// Mock data for development
const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Digbeth Creative Quarter Development',
    description: 'Prime development opportunity in Birmingham\'s creative quarter',
    price: 485000,
    size: 0.8,
    sizeUnit: 'acres',
    location: {
      address: 'Digbeth High Street',
      postcode: 'B5 6DY',
      city: 'Birmingham',
      area: 'Digbeth',
      coordinates: { lat: 52.4862, lng: -1.8904 },
      nearbyAmenities: ['Bullring Shopping Centre', 'New Street Station'],
      transportLinks: [
        { type: 'hs2', name: 'Curzon Street', distance: 0.3, walkingTime: 5 },
        { type: 'train', name: 'New Street', distance: 0.8, walkingTime: 12 }
      ]
    },
    images: ['/images/property1.jpg'],
    documents: {
      titleDeeds: true,
      planningDocuments: true,
      environmentalReport: true,
      surveyReport: false,
      legalPack: true
    },
    planning: {
      status: 'pre-application',
      planningAuthority: 'Birmingham City Council',
      classification: 'Mixed Use',
      successProbability: 82,
      nearbyApprovals: { total: 23, approved: 19, rejected: 4 }
    },
    investment: {
      roi: 32,
      roiTimeframe: '24 months',
      investmentGrade: 'A',
      pricePerAcre: 606250,
      marketGrowth: 26.4,
      comparables: [],
      developmentPotential: {
        type: 'mixed-use',
        units: 45,
        estimatedValue: 2400000,
        developmentCost: 1200000,
        timeline: '18-24 months'
      }
    },
    risks: {
      overall: 'low',
      factors: [],
      mitigations: [],
      lastAssessed: new Date()
    },
    status: {
      isActive: true,
      isFeatured: true,
      isUrgent: false,
      listingType: 'sale'
    },
    createdAt: new Date(),
    updatedAt: new Date(),
    viewCount: 147,
    savedCount: 23,
    offerCount: 4
  }
];

export class PropertyService {
  // Fetch all properties with filtering and pagination
  static async getProperties(
    filters?: SearchFilters,
    page: number = 1,
    pageSize: number = 12
  ): Promise<PaginatedResponse<Property>> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let filtered = [...mockProperties];
    
    // Apply filters
    if (filters) {
      if (filters.query) {
        filtered = filtered.filter(p => 
          p.title.toLowerCase().includes(filters.query!.toLowerCase()) ||
          p.description.toLowerCase().includes(filters.query!.toLowerCase())
        );
      }
      
      if (filters.minPrice) {
        filtered = filtered.filter(p => p.price >= filters.minPrice!);
      }
      
      if (filters.maxPrice) {
        filtered = filtered.filter(p => p.price <= filters.maxPrice!);
      }
      
      if (filters.location) {
        filtered = filtered.filter(p => 
          p.location.area.toLowerCase().includes(filters.location!.toLowerCase())
        );
      }
    }
    
    // Sort
    if (filters?.sortBy) {
      filtered.sort((a, b) => {
        const order = filters.sortOrder === 'desc' ? -1 : 1;
        switch (filters.sortBy) {
          case 'price':
            return (a.price - b.price) * order;
          case 'size':
            return (a.size - b.size) * order;
          case 'roi':
            return (a.investment.roi - b.investment.roi) * order;
          case 'views':
            return (a.viewCount - b.viewCount) * order;
          default:
            return 0;
        }
      });
    }
    
    // Paginate
    const start = (page - 1) * pageSize;
    const paginatedItems = filtered.slice(start, start + pageSize);
    
    return {
      items: paginatedItems,
      total: filtered.length,
      page,
      pageSize,
      hasMore: start + pageSize < filtered.length
    };
  }
  
  // Get single property by ID
  static async getPropertyById(id: string): Promise<Property | null> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProperties.find(p => p.id === id) || null;
  }
  
  // Save property to user's saved list
  static async saveProperty(propertyId: string, userId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200));
    // In real app, this would update database
    return true;
  }
  
  // Get featured properties
  static async getFeaturedProperties(): Promise<Property[]> {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockProperties.filter(p => p.status.isFeatured);
  }
  
  // Get Birmingham area statistics
  static async getAreaStatistics(area: string) {
    await new Promise(resolve => setTimeout(resolve, 400));
    
    return {
      area,
      totalProperties: 47,
      averagePrice: 425000,
      priceChange: 26.4,
      planningSuccessRate: 73,
      averageDaysOnMarket: 21,
      hs2Impact: 'high' as const,
      keyMetrics: {
        residential: { count: 23, avgPrice: 380000 },
        commercial: { count: 15, avgPrice: 520000 },
        mixedUse: { count: 9, avgPrice: 480000 }
      }
    };
  }
  
  // Calculate ROI
  static calculateROI(
    purchasePrice: number,
    developmentCost: number,
    expectedValue: number,
    timeframe: number
  ) {
    const totalInvestment = purchasePrice + developmentCost;
    const profit = expectedValue - totalInvestment;
    const roi = (profit / totalInvestment) * 100;
    const annualizedReturn = (Math.pow(expectedValue / totalInvestment, 12 / timeframe) - 1) * 100;
    
    return {
      totalInvestment,
      expectedValue,
      profit,
      roi,
      annualizedReturn,
      investmentGrade: roi > 50 ? 'A' : roi > 30 ? 'B' : roi > 15 ? 'C' : 'D'
    };
  }
}
