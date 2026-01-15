// Temporary in-memory dataset (mock)
const issues = [
  {
    id: 1,
    infrastructureType: "road",
    status: "verified",
    severity: "high",
    location: { lat: 19.076, lng: 72.877 },
    description: "Large pothole near signal"
  },
  {
    id: 2,
    infrastructureType: "sanitation",
    status: "disputed",
    severity: "medium",
    location: { lat: 19.08, lng: 72.86 },
    description: "Overflowing drainage"
  },
  {
    id: 3,
    infrastructureType: "public_works",
    status: "verified",
    severity: "low",
    location: { lat: 19.09, lng: 72.88 },
    description: "Unfinished footpath"
  }
];

exports.applyFilters = (filters) => {
  let result = issues;

  if (filters.infrastructureType) {
    const types = filters.infrastructureType.split(",");
    result = result.filter(issue =>
      types.includes(issue.infrastructureType)
    );
  }

  if (filters.status) {
    const statuses = filters.status.split(",");
    result = result.filter(issue =>
      statuses.includes(issue.status)
    );
  }

  return result;
};
