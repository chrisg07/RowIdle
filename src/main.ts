import { loadGame, saveGame } from "./storage";
import {
  V_LIFTOFF,
  V_ORBIT,
  V_ESCAPE,
  getSpeed,
  getAltitude,
  getPhase,
  getUpgradeCost
} from "./physics";

export const SAVE_KEY = "orbital-rower-save-v1";

interface Milestones {
  liftoff: boolean;
  orbit: boolean;
  escape: boolean;
  firstUpgrade: boolean;
}

export interface GameState {
  energy: number;
  rowLevel: number;
  milestones: Milestones;
}

export let state: GameState = {
  energy: 0,
  rowLevel: 0,
  milestones: {
    liftoff: false,
    orbit: false,
    escape: false,
    firstUpgrade: false
  }
};

const energyEl = document.getElementById("energy-display") as HTMLSpanElement;
const rowLevelEl = document.getElementById("row-level-display") as HTMLSpanElement;
const speedEl = document.getElementById("speed-display") as HTMLSpanElement;
const altitudeEl = document.getElementById("altitude-display") as HTMLSpanElement;
const phaseEl = document.getElementById("phase-display") as HTMLSpanElement;

const rowBtn = document.getElementById("row-button") as HTMLButtonElement;
const upgradesSection = document.getElementById("upgrades-section") as HTMLDivElement;
const upgradeBtn = document.getElementById("upgrade-strength-button") as HTMLButtonElement;
const upgradeCostEl = document.getElementById("upgrade-strength-cost") as HTMLSpanElement;

const milestonesSection = document.getElementById("milestones-section") as HTMLDivElement;
const milestonesList = document.getElementById("milestones-list") as HTMLUListElement;

const rowerVisualEl = document.getElementById("rower-visual") as HTMLPreElement | null;

function addMilestone(text: string, key: keyof Milestones): void {
  if (state.milestones[key]) return;
  state.milestones[key] = true;
  const li = document.createElement("li");
  li.textContent = text;
  milestonesList.appendChild(li);
  milestonesSection.classList.remove("hidden");
}

const ROW_FRAMES = [
  "~~~ \\o/ ~~~",
  "~~~ -o- ~~~",
  "~~~ /o\\ ~~~",
  "~~~ -o- ~~~"
];
let rowFrameIndex = 0;

function updateRowerVisual(speed: number): void {
  if (!rowerVisualEl) return;

  if (speed < 1) {
    // "Idle" pose when you're basically not moving
    rowerVisualEl.textContent = "|o   ~~~";
    return;
  }

  // Advance one frame per update when moving
  rowFrameIndex = (rowFrameIndex + 1) % ROW_FRAMES.length;
  rowerVisualEl.textContent = ROW_FRAMES[rowFrameIndex];
}


function updateUI(): void {
  const speed = getSpeed(state.rowLevel);
  const altitude = getAltitude(speed);
  const phase = getPhase(speed);

  energyEl.textContent = state.energy.toFixed(0);
  rowLevelEl.textContent = state.rowLevel.toString();
  speedEl.textContent = speed.toFixed(2);
  altitudeEl.textContent = altitude.toFixed(0);
  phaseEl.textContent = phase;

  // Show upgrades section after first bit of progress
  if (state.energy >= 5 || state.rowLevel > 0) {
    upgradesSection.classList.remove("hidden");
  }

  // Update upgrade button
  const cost = getUpgradeCost(state.rowLevel);
  upgradeCostEl.textContent = cost.toString();
  upgradeBtn.disabled = state.energy < cost;

  // Milestones
  if (speed >= V_LIFTOFF && !state.milestones.liftoff) {
    addMilestone(
      "You tear free of the water spray. You are now flying.",
      "liftoff"
    );
  }
  if (speed >= V_ORBIT && !state.milestones.orbit) {
    addMilestone(
      "You stabilize into a shaky orbit, still rowing in vacuum.",
      "orbit"
    );
  }
  if (speed >= V_ESCAPE && !state.milestones.escape) {
    addMilestone(
      "Your strokes no longer belong to Earth. You have reached escape velocity.",
      "escape"
    );
  }
  if (state.rowLevel > 0 && !state.milestones.firstUpgrade) {
    addMilestone(
      "Your arms burn, but the stroke is cleaner. First upgrade purchased.",
      "firstUpgrade"
    );
  }

  updateRowerVisual(speed);
}

// --- Input handlers ---------------------------------------
rowBtn.addEventListener("click", () => {
  state.energy += 1 + state.rowLevel;
  updateUI();
});

upgradeBtn.addEventListener("click", () => {
  const cost = getUpgradeCost(state.rowLevel);
  if (state.energy >= cost) {
    state.energy -= cost;
    state.rowLevel += 1;
    updateUI();
  }
});

// --- Passive tick (optional progress) ---------------------
function tick(): void {
  const passiveEnergy = state.rowLevel * 0.1;
  state.energy += passiveEnergy;
  updateUI();
}

// --- Init -------------------------------------------------
loadGame();
updateUI();

setInterval(() => {
  tick();
  saveGame();
}, 1000);
