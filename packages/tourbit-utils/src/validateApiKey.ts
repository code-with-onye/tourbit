export const validateApiKey = (apiKey: string): boolean => {
  return /^[A-Za-z0-9_-]{20,}$/.test(apiKey);
};
