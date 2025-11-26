import { loadGame, saveGame } from './storage'
import { getSpeed, getAltitude, getUpgradeCost } from './physics'
import { MilestoneState, createDefaultMilestoneState, updateMilestones } from './milestones'

export const SAVE_KEY = 'orbital-rower-save-v1'

export interface GameState {
  energy: number
  rowLevel: number
  distance: number
  milestones: MilestoneState
}

export let state: GameState = {
  energy: 0,
  rowLevel: 0,
  distance: 0,
  milestones: createDefaultMilestoneState(),
}

const energyEl = document.getElementById('energy-display') as HTMLSpanElement
const rowLevelEl = document.getElementById('row-level-display') as HTMLSpanElement
const speedEl = document.getElementById('speed-display') as HTMLSpanElement
const distanceEl = document.getElementById('distance-display') as HTMLSpanElement
const altitudeEl = document.getElementById('altitude-display') as HTMLSpanElement

const rowBtn = document.getElementById('row-button') as HTMLButtonElement
const upgradesSection = document.getElementById('upgrades-section') as HTMLDivElement
const upgradeBtn = document.getElementById('upgrade-strength-button') as HTMLButtonElement
const upgradeCostEl = document.getElementById('upgrade-strength-cost') as HTMLSpanElement

export const milestonesSection = document.getElementById('milestones-section') as HTMLDivElement
export const milestonesList = document.getElementById('milestones-list') as HTMLUListElement

const rowerVisualEl = document.getElementById('rower-visual') as HTMLPreElement | null

const ROW_FRAMES = ['~~~ \\o/ ~~~', '~~~ -o- ~~~', '~~~ /o\\ ~~~', '~~~ -o- ~~~']
let rowFrameIndex = 0

function updateRowerVisual(speed: number): void {
  if (!rowerVisualEl) return

  if (speed < 1) {
    rowerVisualEl.textContent = '~~~ |o| ~~~'
    return
  }

  rowFrameIndex = (rowFrameIndex + 1) % ROW_FRAMES.length
  rowerVisualEl.textContent = ROW_FRAMES[rowFrameIndex]
}

function updateUI(): void {
  const speed = getSpeed(state.rowLevel)
  const distance = state.distance
  const altitude = getAltitude(speed)

  energyEl.textContent = state.energy.toFixed(0)
  rowLevelEl.textContent = state.rowLevel.toString()
  speedEl.textContent = speed.toFixed(2)
  distanceEl.textContent = distance.toFixed(2)
  altitudeEl.textContent = altitude.toFixed(0)

  if (state.energy >= 5 || state.rowLevel > 0) {
    upgradesSection.classList.remove('hidden')
  }

  const cost = getUpgradeCost(state.rowLevel)
  upgradeCostEl.textContent = cost.toString()
  upgradeBtn.disabled = state.energy < cost

  updateMilestones(speed, distance)
  updateRowerVisual(speed)
}

// --- Input handlers ---------------------------------------
rowBtn.addEventListener('click', () => {
  state.energy += 1 + state.rowLevel
  updateUI()
})

upgradeBtn.addEventListener('click', () => {
  const cost = getUpgradeCost(state.rowLevel)
  if (state.energy >= cost) {
    state.energy -= cost
    state.rowLevel += 1
    updateUI()
  }
})

// --- Passive tick (optional progress) ---------------------
function tick(): void {
  const passiveEnergy = state.rowLevel * 0.1
  state.energy += passiveEnergy
  state.distance += getSpeed(state.rowLevel)
  updateUI()
}

// --- Init -------------------------------------------------
loadGame()
updateUI()

setInterval(() => {
  tick()
}, 1000)

setInterval(() => {
  saveGame()
}, 1000 * 60)
