export const V_LIFTOFF = 100 // m/s
export const V_ORBIT = 8000 // m/s
export const V_ESCAPE = 12000 // m/s
export const ALT_SCALE = 0.0

export function getUpgradeCost(level: number): number {
  return Math.floor(10 * Math.pow(1.8, level))
}
