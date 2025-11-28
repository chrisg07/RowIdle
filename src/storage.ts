import { SAVE_KEY } from './main'
import { state, GameState } from './state'
import { createDefaultMilestoneState, MilestoneState } from './milestones'

export function saveGame(): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state))
  } catch (e) {
    console.warn('Save failed:', e)
  }
}

export function loadGame(): void {
  try {
    const raw = localStorage.getItem(SAVE_KEY)
    if (!raw) return
    const data = JSON.parse(raw) as Partial<GameState>
    if (typeof data.energy === 'number') state.energy = data.energy
    if (typeof data.rowLevel === 'number') state.rowLevel = data.rowLevel
    if (typeof data.distance === 'number') state.distance = data.distance

    const loadedMilestones = (data.milestones ?? {}) as Partial<MilestoneState>
    state.milestones = { ...createDefaultMilestoneState(), ...loadedMilestones }
  } catch (e) {
    console.warn('Load failed:', e)
  }
}
