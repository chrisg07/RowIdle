import { GameState } from './state'
import { STROKE_STRENGTH_UPGRADES } from './upgrades/strokeStrength'

export type UpgradeConfig = {
  id: string
  title: string
  description: string
  level: number
  cost: (level: number) => number
  discovered: (state: GameState) => boolean
  apply: (state: GameState, level: number) => void
}

export const UPGRADES: UpgradeConfig[] = [...STROKE_STRENGTH_UPGRADES]

export function updateUpgrades(state: GameState) {
  for (const upgrade of UPGRADES) {
    if (state.upgrades[upgrade.id]) continue

    if (upgrade.discovered(state) && !document.getElementById(upgrade.id)) {
      const button = document.createElement('button')
      button.id = upgrade.id
      button.classList.add('upgrade')
      const titleSpan = document.createElement('div')
      titleSpan.innerText = upgrade.title
      const levelSpan = document.createElement('div')
      levelSpan.innerText = 'Level ' + upgrade.level
      button.append(titleSpan, levelSpan)
      const upgradeList = document.querySelector('#upgrades-section .upgrades')
      upgradeList?.append(button)
    }
  }
}
