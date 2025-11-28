import { MilestoneState, createDefaultMilestoneState } from './milestones';

export interface GameState {
  energy: number;
  energyGain: number;
  speed: number;
  rowLevel: number;
  distance: number;
  drag: number;
  maxSPM: number;
  strokes: number[];
  milestones: MilestoneState;
}

export let state: GameState = {
  energy: 0,
  energyGain: 0.5,
  speed: 0,
  rowLevel: 1,
  distance: 0,
  drag: 0.4,
  maxSPM: 16,
  strokes: [],
  milestones: createDefaultMilestoneState(),
};

export function getCurrentSPM(): number {
    const strokesInPast20Seconds = state.strokes.filter(stroke => stroke > Date.now() - 20000);
    state.strokes = strokesInPast20Seconds;
    const currentSPM = strokesInPast20Seconds.length * 3;
    return currentSPM
}