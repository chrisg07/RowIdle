import { UpgradeState } from "./upgrades"

export interface GameState {
  energy: number
  energyGain: number
  speed: number
  strength: number
  distance: number
  drag: number
  maxSPM: number
  strokes: number[]
  achievements: Record<string, boolean>
  upgrades: Record<string, number>
}

export let state: GameState = {
  energy: 0,
  energyGain: 0.5,
  speed: 0,
  strength: 1,
  distance: 0,
  drag: 0.4,
  maxSPM: 16,
  strokes: [],
  achievements: {},
  upgrades: {},
}

export function getCurrentSPM(): number {
  const strokesInPast20Seconds = state.strokes.filter(stroke => stroke > Date.now() - 20000)
  state.strokes = strokesInPast20Seconds
  const currentSPM = strokesInPast20Seconds.length * 3
  return currentSPM
}
