import { GameState } from '../state'
import { UpgradeConfig } from '../upgrades'

function getStrokeStrengthCost(level: number): number {
  switch (level) {
    case 0:
      return 10
    case 1:
      return 100
    default:
      return Number.MAX_SAFE_INTEGER
  }
}

const STROKE_STRENGTH_UPGRADE_TITLE = 'Stroke Strength'
const STROKE_STRENGTH_UPGRADE_DESCRIPTION =
  'Increase the strength of each stroke. Increases energy cost of rowing.'

export const STROKE_STRENGTH_UPGRADES: UpgradeConfig[] = [
  {
    id: 'stroke-strength-upgrade-1',
    title: STROKE_STRENGTH_UPGRADE_TITLE,
    description: STROKE_STRENGTH_UPGRADE_DESCRIPTION,
    level: 1,
    cost: getStrokeStrengthCost,
    discovered: function (state: GameState): boolean {
      return true
    },
    apply: function (state: GameState, level: number) {
      state.strokeStrength *= 2
    },
  },
]
