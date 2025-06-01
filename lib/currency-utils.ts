/**
 * Format a number as Indian Rupees
 * @param amount The amount to format
 * @param includeCurrency Whether to include the ₹ symbol
 * @returns Formatted price string
 */
export function formatIndianPrice(amount: number, includeCurrency = true): string {
  const formattedAmount = amount.toLocaleString("en-IN")
  return includeCurrency ? `₹${formattedAmount}` : formattedAmount
}

/**
 * Convert a price range to a human-readable string
 * @param min Minimum price
 * @param max Maximum price
 * @returns Formatted price range string
 */
export function formatPriceRange(min: number, max: number): string {
  return `₹${formatIndianPrice(min, false)} - ₹${formatIndianPrice(max, false)}`
}
