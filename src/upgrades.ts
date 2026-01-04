import { GameState } from './state'
import { STRENGTH_UPGRADES } from './upgrades/strength'

export type UpgradeConfig = {
  id: string
  title: string
  description: string
  level: number
  cost: (level: number) => number
  discovered: (state: GameState) => boolean
  apply: (state: GameState, level: number) => void
}

export const UPGRADES: UpgradeConfig[] = [...STRENGTH_UPGRADES]
export type UpgradeId = (typeof UPGRADES)[number]['id']

export function createDefaultUpgradeState(): Record<string, number> {
  return Object.fromEntries(UPGRADES.map(m => [m.id, 0])) as Record<string, number>
}
  
export function updateUpgrades(state: GameState) {
  for (const upgrade of UPGRADES) {
    console.log("Checking upgrade level: ", upgrade.level);
    console.log("Current player upgrade level: ", state.upgrades[upgrade.id] || 0);
    
    if (state.upgrades[upgrade.id] >= upgrade.level) continue

    const upgradeBtnId = upgrade.id + '-' + upgrade.level
    if (upgrade.discovered(state) && !document.getElementById(upgradeBtnId)) {
      const button = document.createElement('button')
      button.id = upgradeBtnId
      button.classList.add('upgrade')

      const titleSpan = document.createElement('div')
      titleSpan.innerText = upgrade.title
      const levelSpan = document.createElement('div')
      levelSpan.innerText = 'Level ' + upgrade.level
      const costSpan = document.createElement('div')
      costSpan.innerText = 'Cost:  ' + upgrade.cost(upgrade.level) + ' energy'
      button.append(titleSpan, levelSpan, costSpan)

      button.addEventListener('click', () => {
        const cost = upgrade.cost(upgrade.level)
        if (state.energy >= cost) {
          state.energy -= cost
          state.upgrades[upgrade.id] = upgrade.level
          upgrade.apply(state, upgrade.level)
          button.remove()
        }
      })
      
      const upgradeList = document.querySelector('#upgrades-section .upgrades')
      upgradeList?.append(button)
    }
  }
}
