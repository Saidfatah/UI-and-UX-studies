/** Determines if a feature should be enabled based on a probability value */
export function shouldRolloutFeature(probability: number): boolean {
  if (probability < 0 || probability > 1) {
    console.error('Probability must be between 0 and 1');
    return true;
  }

  if (probability === 1) return true;
  if (probability === 0) return false;

  const randomValue = Math.random();
  return randomValue < probability;
}
