export const cleanText = (text) => {
  if (!text) return "";

  return text
    // Remove excessive new lines
    .replace(/\n{2,}/g, "\n")

    // Remove page numbers like "Page 1", "page 2"
    .replace(/page\s*\d+/gi, "")

    // Remove multiple spaces
    .replace(/\s{2,}/g, " ")

    // Trim start and end
    .trim();
};
