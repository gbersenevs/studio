/**
 * Utility function to merge class names
 * Simple implementation that doesn't require external dependencies
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}
