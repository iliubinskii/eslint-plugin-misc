import naturalCompare from "natural-compare";

/**
 * Compares two strings.
 *
 * @param x - First value.
 * @param y - Second value.
 * @returns Comparison result.
 */
export function compare(x: string, y: string): -1 | 0 | 1 {
  return naturalCompare(x, y);
}
