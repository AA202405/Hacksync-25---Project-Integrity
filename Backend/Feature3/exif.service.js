export const extractMetadata = () => {
  return {
    timestamp: new Date().toISOString(),
    location: {
      latitude: null,
      longitude: null
    }
  };
};
