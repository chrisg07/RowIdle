export const V_LIFTOFF = 100; // m/s
export const V_ORBIT = 8000; // m/s
export const V_ESCAPE = 12000; // m/s
export const ALT_SCALE = 0.001;

export function getSpeed(rowLevel: number): number {
  const baseSpeed = 1;
  return baseSpeed * Math.pow(1.25, rowLevel);
}

export function getAltitude(speed: number): number {
  if (speed <= V_LIFTOFF) return 0;
  const dv = speed - V_LIFTOFF;
  return dv * dv * ALT_SCALE;
}

export function getPhase(speed: number): string {
  if (speed >= V_ESCAPE) return "Escape Velocity";
  if (speed >= V_ORBIT) return "Orbit";
  if (speed >= V_LIFTOFF) return "Flight";
  return "Water";
}

export function getUpgradeCost(level: number): number {
  return Math.floor(10 * Math.pow(1.8, level));
}
