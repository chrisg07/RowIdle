import { SAVE_KEY, state, GameState } from "./main";

export function saveGame(): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Save failed:", e);
  }
}
export function loadGame(): void {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    const data = JSON.parse(raw) as Partial<GameState>;
    if (typeof data.energy === "number") state.energy = data.energy;
    if (typeof data.rowLevel === "number") state.rowLevel = data.rowLevel;
    if (data.milestones) {
      state.milestones = { ...state.milestones, ...data.milestones };
    }
  } catch (e) {
    console.warn("Load failed:", e);
  }
}
