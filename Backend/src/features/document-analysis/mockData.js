// Mock extraction data based on filename patterns
const mockExtractions = {
  'tender': {
    'nh-44': {
      project_name: 'NH-44 Highway Resurfacing - Phase 2',
      budget: '₹45,70,00,000',
      contractor: 'ABC Infrastructure Pvt. Ltd.',
      location: 'Sector 12-14, North District',
      dates: 'March 2024',
      confidence_scores: {
        project_name: 98,
        budget: 95,
        contractor: 92,
        location: 88,
        dates: 78
      }
    },
    'drainage': {
      project_name: 'Municipal Drainage System Upgrade',
      budget: '₹12,80,00,000',
      contractor: 'Urban Solutions Pvt Ltd',
      location: 'Old City Area, Kurla',
      dates: 'December 2024',
      confidence_scores: {
        project_name: 96,
        budget: 94,
        contractor: 91,
        location: 89,
        dates: 82
      }
    },
    'lighting': {
      project_name: 'LED Street Lighting Project',
      budget: '₹8,50,00,000',
      contractor: 'Green Energy Corp',
      location: 'Ward 22, South District',
      dates: 'September 2024',
      confidence_scores: {
        project_name: 97,
        budget: 93,
        contractor: 90,
        location: 87,
        dates: 79
      }
    }
  },
  'completion': {
    'highway': {
      project_name: 'NH-44 Highway Resurfacing - Phase 2',
      budget: '₹45,70,00,000',
      contractor: 'ABC Infrastructure Pvt. Ltd.',
      location: 'Sector 12-14, North District',
      dates: 'March 2024',
      completion_status: '100% Completed',
      confidence_scores: {
        project_name: 99,
        budget: 97,
        contractor: 94,
        location: 91,
        dates: 88,
        completion_status: 85
      }
    }
  },
  'budget': {
    'allocation': {
      project_name: 'Water Pipeline Network Upgrade',
      budget: '₹35,60,00,000',
      contractor: 'Aqua Systems Inc',
      location: 'Ward 12, West District',
      dates: 'October 2025',
      confidence_scores: {
        project_name: 95,
        budget: 99,
        contractor: 92,
        location: 88,
        dates: 76
      }
    }
  },
  'contract': {
    'agreement': {
      project_name: 'Community Health Center Construction',
      budget: '₹22,00,00,000',
      contractor: 'Metro Builders',
      location: 'Ward 5, East Zone',
      dates: 'August 2026',
      confidence_scores: {
        project_name: 98,
        budget: 96,
        contractor: 99,
        location: 90,
        dates: 81
      }
    }
  },
  'inspection': {
    'report': {
      project_name: 'Road Repair - Vikhroli',
      budget: '₹20,00,00,000',
      contractor: 'CityRoad Builders',
      location: 'Vikhroli, Mumbai',
      dates: 'September 2024',
      inspection_status: 'Passed with minor observations',
      confidence_scores: {
        project_name: 97,
        budget: 94,
        contractor: 91,
        location: 89,
        dates: 83,
        inspection_status: 88
      }
    }
  }
};

const getMockExtraction = (filename, documentType) => {
  const lowerFilename = filename.toLowerCase();
  
  // Try to match filename patterns
  if (lowerFilename.includes('nh-44') || lowerFilename.includes('highway')) {
    return mockExtractions[documentType]?.['nh-44'] || mockExtractions['tender']['nh-44'];
  }
  if (lowerFilename.includes('drainage') || lowerFilename.includes('drain')) {
    return mockExtractions[documentType]?.['drainage'] || mockExtractions['tender']['drainage'];
  }
  if (lowerFilename.includes('lighting') || lowerFilename.includes('led')) {
    return mockExtractions[documentType]?.['lighting'] || mockExtractions['tender']['lighting'];
  }
  if (lowerFilename.includes('completion')) {
    return mockExtractions['completion']['highway'];
  }
  if (lowerFilename.includes('budget') || lowerFilename.includes('allocation')) {
    return mockExtractions['budget']['allocation'];
  }
  if (lowerFilename.includes('contract') || lowerFilename.includes('agreement')) {
    return mockExtractions['contract']['agreement'];
  }
  if (lowerFilename.includes('inspection')) {
    return mockExtractions['inspection']['report'];
  }
  
  // Default extraction
  return mockExtractions['tender']['nh-44'];
};

module.exports = { getMockExtraction };
