/**
 * Only content the reader has not reached yet may be held back for a scroll reveal. Anything on
 * screen or above it when the page hydrates stays exactly as the server rendered it: visible.
 */
export function shouldHoldBack(rect: { top: number }, viewportHeight: number, reducedMotion: boolean): boolean {
  if (reducedMotion) return false
  return rect.top >= viewportHeight
}
