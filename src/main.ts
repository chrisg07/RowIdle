import { loadGame, saveGame } from './storage'
import { getUpgradeCost } from './physics'
import { MilestoneState, createDefaultMilestoneState, updateMilestones } from './milestones'
import { StatDisplay } from './interface'

export const SAVE_KEY = 'orbital-rower-save-v1'

export interface GameState {
  energy: number
  speed: number
  rowLevel: number
  distance: number
  drag: number
  maxSPM: number
  strokes: number[]
  milestones: MilestoneState
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
}

const energyDisplay = new StatDisplay('energy-display', "Energy", "kcal", () => state.energy.toFixed(0))

const rowLevelEl = document.getElementById('row-level-display') as HTMLSpanElement
const maxSPMEl = document.getElementById('max-spm-display') as HTMLSpanElement
const currentSPMEl = document.getElementById('current-spm-display') as HTMLSpanElement
const speedEl = document.getElementById('speed-display') as HTMLSpanElement
const dragEl = document.getElementById('drag-display') as HTMLSpanElement
const distanceEl = document.getElementById('distance-display') as HTMLSpanElement

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
  energyDisplay.update()
  rowLevelEl.textContent = state.rowLevel.toString()
  maxSPMEl.textContent = state.maxSPM.toFixed(0)
  speedEl.textContent = state.speed.toFixed(2)
  dragEl.textContent = (state.drag * 100).toFixed(0)
  distanceEl.textContent = state.distance.toFixed(2)

  if (state.energy >= 5 || state.rowLevel > 0) {
    upgradesSection.classList.remove('hidden')
  }

  const cost = getUpgradeCost(state.rowLevel)
  upgradeCostEl.textContent = cost.toString()
  upgradeBtn.disabled = state.energy < cost

  updateMilestones(state.speed, state.distance)
  updateRowerVisual(state.speed)
}

rowBtn.addEventListener('click', () => {
  const rowCost = state.rowLevel
  const rowDate = Date.now()
  state.strokes.push(rowDate)

  if (state.energy > rowCost) {
    state.energy -= rowCost
    state.speed += 3 * state.rowLevel
  }
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

function tick(): void {
  const passiveEnergy = state.rowLevel * 0.5
  state.energy += passiveEnergy
  state.distance += state.speed
  state.speed = state.speed * state.drag

  const strokesInPast20Seconds = state.strokes.filter(stroke => stroke > Date.now() - 20_000)
  state.strokes = strokesInPast20Seconds
  const currentSPM = strokesInPast20Seconds.length * 3
  currentSPMEl.textContent = currentSPM.toFixed(0)

  if (currentSPM > state.maxSPM) {
    rowBtn.disabled = true
  } else {
    rowBtn.disabled = false
  }

  updateUI()
}

function initialize(): void {
  loadGame()
  updateUI()

  setInterval(() => {
    tick()
  }, 1000)

  setInterval(() => {
    saveGame()
  }, 1000 * 60)
}

initialize()
