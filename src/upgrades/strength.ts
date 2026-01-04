import { GameState } from '../state'
import { UpgradeConfig } from '../upgrades'

function getStrengthCost(level: number): number {
  switch (level) {
    case 1:
      return 10
    case 2:
      return 50
    case 3:
      return 200
    case 4:
      return 1000
    case 5:
      return 5000
    default:
      return Number.MAX_SAFE_INTEGER
  }
}

const STRENGTH_UPGRADE_ID = 'strength-upgrade'
const STRENGTH_UPGRADE_TITLE = 'Strength'
const STRENGTH_UPGRADE_DESCRIPTION =
  'Increase your strength, enabling you row further with each row. Increases energy cost of rowing.'

export const STRENGTH_UPGRADES: UpgradeConfig[] = [
  {
    id: STRENGTH_UPGRADE_ID,
    title: STRENGTH_UPGRADE_TITLE,
    description: STRENGTH_UPGRADE_DESCRIPTION,
    level: 1,
    cost: getStrengthCost,
    discovered: function (state: GameState): boolean {
      return true
    },
    apply: function (state: GameState, level: number) {
      state.strength *= 2
    },
  },
]
