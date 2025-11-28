import { MilestoneState, createDefaultMilestoneState } from './milestones';

export interface GameState {
  energy: number;
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
  speed: 0,
  rowLevel: 1,
  distance: 0,
  drag: 0.4,
  maxSPM: 16,
  strokes: [],
  milestones: createDefaultMilestoneState(),
};
