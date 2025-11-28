import { loadGame, saveGame } from './storage'
import { getUpgradeCost } from './physics'
import { StatDisplay } from './interface'
import { createStatDisplays } from './stats'
import { getCurrentSPM, state } from './state'
import { createDefaultAchievementState, updateAchievements } from './achievements'

export const SAVE_KEY = 'orbital-rower-save-v1'

export let statDisplays: { [key: string]: StatDisplay } = {}
// export let upgradeDisplays: { [key: string]: UpgradeDisplay}

createStatDisplays()

const rowBtn = document.getElementById('row-button') as HTMLButtonElement
const upgradesSection = document.getElementById('upgrades-section') as HTMLDivElement
const upgradeBtn = document.getElementById('upgrade-strength-button') as HTMLButtonElement
const upgradeCostEl = document.getElementById('upgrade-strength-cost') as HTMLSpanElement


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
  for (const display of Object.values(statDisplays)) {
    display.update()
  }

  if (state.energy >= 5 || state.rowLevel > 0) {
    upgradesSection.classList.remove('hidden')
  }

  const cost = getUpgradeCost(state.rowLevel)
  upgradeCostEl.textContent = cost.toString()
  upgradeBtn.disabled = state.energy < cost

  updateAchievements(state.speed, state.distance)
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
  state.energyGain = state.rowLevel * 0.5
  state.energy += state.energyGain
  state.distance += state.speed
  state.speed = state.speed * state.drag

  if (getCurrentSPM() > state.maxSPM) {
    rowBtn.disabled = true
  } else {
    rowBtn.disabled = false
  }

  updateUI()
}

function initialize(): void {
  state.achievements = createDefaultAchievementState()
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
