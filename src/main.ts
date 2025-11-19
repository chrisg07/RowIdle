// --- Config / "fake physics" ------------------------------
const V_LIFTOFF = 100;    // m/s
const V_ORBIT = 8000;     // m/s
const V_ESCAPE = 12000;   // m/s
const ALT_SCALE = 0.001;

const SAVE_KEY = "orbital-rower-save-v1";

interface Milestones {
  liftoff: boolean;
  orbit: boolean;
  escape: boolean;
  firstUpgrade: boolean;
}

interface GameState {
  energy: number;
  rowLevel: number;
  milestones: Milestones;
}

function getSpeed(rowLevel: number): number {
  const baseSpeed = 1;
  return baseSpeed * Math.pow(1.25, rowLevel);
}

function getAltitude(speed: number): number {
  if (speed <= V_LIFTOFF) return 0;
  const dv = speed - V_LIFTOFF;
  return dv * dv * ALT_SCALE;
}

function getPhase(speed: number): string {
  if (speed >= V_ESCAPE) return "Escape Velocity";
  if (speed >= V_ORBIT) return "Orbit";
  if (speed >= V_LIFTOFF) return "Flight";
  return "Water";
}

function getUpgradeCost(level: number): number {
  return Math.floor(10 * Math.pow(1.8, level));
}

// --- Game state -------------------------------------------
let state: GameState = {
  energy: 0,
  rowLevel: 0,
  milestones: {
    liftoff: false,
    orbit: false,
    escape: false,
    firstUpgrade: false
  }
};

// --- DOM refs ---------------------------------------------
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

// --- Save / load ------------------------------------------
function saveGame(): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(state));
  } catch (e) {
    console.warn("Save failed:", e);
  }
}

function loadGame(): void {
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

// --- UI update --------------------------------------------
function addMilestone(text: string, key: keyof Milestones): void {
  if (state.milestones[key]) return;
  state.milestones[key] = true;
  const li = document.createElement("li");
  li.textContent = text;
  milestonesList.appendChild(li);
  milestonesSection.classList.remove("hidden");
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
}

// --- Input handlers ---------------------------------------
rowBtn.addEventListener("click", () => {
  state.energy += 1;
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
