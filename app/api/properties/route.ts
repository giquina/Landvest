import { NextRequest, NextResponse } from 'next/server';

// Mock properties data - replace with database queries
const mockProperties = [
  {
    id: '1',
    title: 'Prime Development Land - Birmingham Eastside',
    price: 450000,
    size: 2.5,
    location: 'Birmingham Eastside',
    postcode: 'B9 4AA',
    latitude: 52.4862,
    longitude: -1.8904,
    landType: 'mixed',
    planningStatus: 'pre-app',
    planningScore: 82,
    roi: 3.2,
    investmentGrade: 'A',
    description: 'Exceptional development opportunity in Birmingham\'s fastest-growing district.',
    hs2Impact: true,
    transportLinks: ['HS2 Curzon Street (0.8 miles)', 'A38(M) (0.3 miles)'],
    floodRisk: 'low',
    contaminationRisk: 'medium',
    accessRisk: 'low',
    viewers: 234,
    savedBy: 47,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-20'
  },
  // Add more mock properties...
];

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters
    const location = searchParams.get('location');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const landType = searchParams.get('landType');
    const planningStatus = searchParams.get('planningStatus');
    const hs2Only = searchParams.get('hs2Only') === 'true';
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '12');

    // Filter properties based on parameters
    let filteredProperties = [...mockProperties];

    if (location) {
      filteredProperties = filteredProperties.filter(p => 
        p.location.toLowerCase().includes(location.toLowerCase()) ||
        p.postcode.toLowerCase().includes(location.toLowerCase())
      );
    }

    if (minPrice) {
      filteredProperties = filteredProperties.filter(p => p.price >= parseInt(minPrice));
    }

    if (maxPrice) {
      filteredProperties = filteredProperties.filter(p => p.price <= parseInt(maxPrice));
    }

    if (landType) {
      filteredProperties = filteredProperties.filter(p => p.landType === landType);
    }

    if (planningStatus) {
      filteredProperties = filteredProperties.filter(p => p.planningStatus === planningStatus);
    }

    if (hs2Only) {
      filteredProperties = filteredProperties.filter(p => p.hs2Impact);
    }

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const paginatedProperties = filteredProperties.slice(startIndex, endIndex);

    return NextResponse.json({
      properties: paginatedProperties,
      total: filteredProperties.length,
      page,
      totalPages: Math.ceil(filteredProperties.length / limit)
    });
  } catch (error) {
    console.error('Properties API error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

// Create new property listing (admin only)
export async function POST(request: NextRequest) {
  try {
    // Check authentication and admin role
    // const authToken = request.cookies.get('auth-token');
    // if (!authToken || !isAdmin(authToken)) {
    //   return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    // }

    const body = await request.json();
    
    // Validate required fields
    const requiredFields = ['title', 'price', 'size', 'location', 'postcode'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Create new property (mock - replace with database insert)
    const newProperty = {
      id: Date.now().toString(),
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      viewers: 0,
      savedBy: 0
    };

    return NextResponse.json(
      { success: true, property: newProperty },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create property error:', error);
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
}