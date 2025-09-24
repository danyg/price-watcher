export const toPrice = (s: string) => {
  s = s.replace(/[^\d.,\s]/g, "").trim();
  // European format: 1.234,56 or 1 234,56
  if (/[,]/.test(s)) {
    // If ends with comma (no decimals), treat as integer
    if (/[,][^\d]*$/.test(s)) {
      return parseFloat(s.replace(/[.\s,]/g, ""));
    }
    // If ends with comma and decimals
    if (/\d[.,\s]*,\d{1,2}$/.test(s)) {
      const normalized = s.replace(/[.\s]/g, "").replace(/,/, ".");
      return parseFloat(normalized);
    }
  }
  // US format: 1,234.56 or 1234.56
  if (/[.]/.test(s)) {
    // Remove thousands separators (comma), keep decimal dot
    const normalized = s.replace(/,/g, "");
    return parseFloat(normalized);
  }
  // Only integer part
  return parseFloat(s.replace(/[.,\s]/g, ""));
};
